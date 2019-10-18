// pages/components/dict-selector/index.js
const commonApi = require("../../../api/commonApi.js")

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: '请选择'
    },
    options: {
      type: Array,
      value: []
    },
    dict:{
      type:String,
      value:''
    },
    url: {
      type: String,
      value: ''
    },
    requestType: {
      type: String,
      value: 'get'
    },
    parserData:{
      type:Function,
      value:null
    },
    defaultValue: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    innerOptions: [],
    showDialog: false,
    label: '',
    value: '',
    selectValue: '',
    selectLabel: '',
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function() {
      if(this.data.dict) {
        this.loadOptions('/sys/dict/load?type=' + this.data.dict +'&tree=false');
      }
      else if (this.data.url) {
        // 需要异步加载的
        this.loadOptions(this.data.url,this.data.requestType);
      } else {
        // 直接传入选项的
        const tempOptions = [];
        let first = true;
        this.data.options.forEach(item => {
          if (!this.data.defaultValue) {
            first && this.setData({
              selectValue: item.value,
              selectLabel: item.label
            });
            first = false;
          }
          else if (item.value === this.data.defaultValue) {
            this.setData({
              selectValue: item.value,
              selectLabel: item.label,
              label: item.label,
              value: item.value,
            })
          } 
          tempOptions.push(item)
        })
        this.setData({
          innerOptions: tempOptions
        })
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showSelectDialog: function() {
      // 如果为空值，则需要打开选择框的时候，默认选中第一个
      if (!this.data.defaultValue && this.data.innerOptions.lenght > 0) {
        this.setData({
          selectValue: this.data.innerOptions[0].value,
          selectLabel: this.data.innerOptions[0].label
        })
      }
      this.setData({
        showDialog: true
      })
    },
    onValueChange(e) {
      this.setData({
        selectValue: e.detail.selectedValue,
        selectLabel: e.detail.displayValue
      })
    },
    onOk: function(e) {
      this.setData({
        value: this.data.selectValue,
        label: this.data.selectLabel || this.data.placehoder
      })
      this.triggerEvent('change', {
        value: this.data.selectValue
      })
      this.setData({
        showDialog: false
      })
    },
    onCancel: function(e) {
      this.setData({
        showDialog: false
      })
    },
    loadOptions:function(url,type,data){
      wx.showLoading({
        title: '加载中',
        mask:true
      })
      // 加载中
      commonApi.getDataFromUrl(url, type, data).then(res => {
        if(res.code == 200) {
          var data = res.data;
          if (this.data.parserData) {
            data = this.data.parserData(data);
          }
          let first = true;
          data.forEach(item => {
            if (!this.data.defaultValue) {
              first && this.setData({
                selectValue: item.value,
                selectLabel: item.label
              });
              first = false;
            }
            else if (item.value === this.data.defaultValue) {
              this.setData({
                selectValue: item.value,
                selectLabel: item.label,
                label: item.label,
                value: item.value,
              })
            } 
          })
          this.setData({
            innerOptions:data
          })
          wx.hideLoading();
        } else {
          // 加载异常
          wx.hideLoading();
          // wx.showToast({
          //   title: '字典加载异常' || res.msg,
          // })
        }
      }).catch(err => {

      })
    }
  }
})