var monitorApi = require("../../../api/monitor.js")
const app = getApp()
Page({
  data: {
    areaData: [{
      "label": "全部",
      "value": "0",
      active: true
    },{
      "label": "光明区",
      "value": "440311"
    }, {
      "label": "市辖区",
      "value": "440301"
    }, {
      "label": "罗湖区",
      "value": "440303"
    }, {
      "label": "福田区",
      "value": "440304"
    }, {
      "label": "南山区",
      "value": "440305"
    }, {
      "label": "宝安区",
      "value": "440306"
    }, {
      "label": "龙岗区",
      "value": "440307"
    }, {
      "label": "平山区",
      "value": "440310"
    }, {
      "label": "龙华区",
      "value": "440309"
    }, {
      "label": "盐田区",
      "value": "440308"
    }],
    itemList: [],
    showList: [],
    visiblePop: false,
    curCity: [],
    optionsData: [],
    backData: [],
    visibleSelect: false,
    addressLabel: '广东省深圳市',
    addressValue: '440000|440300',
    allHeight: '',
    headHeight: '',
    areaHeight: '',
    itemId: ''
  },
  onLoad: function() {
    // this.queryAreaList('')
    // this.queryProject(this.data.addressValue, '')

  },
  onShow: function() {
    this.queryAreaList('')
    this.queryProject(this.data.addressValue, '')
    this.getSwiperHeight()
  },
  // 获取swiper高度
  getSwiperHeight() {
    var that = this
    var query = wx.createSelectorQuery();
    query.select('.head').boundingClientRect(function(rect) {
      that.setData({
        headHeight: rect.height,
      })
    }).exec();
    query.select('.area').boundingClientRect(function (rect) {
      that.setData({
        areaHeight: rect.height,
      })
    }).exec();
    wx.getSystemInfo({
      success: function(res, rect) {
        that.setData({
          allHeight: res.windowHeight
        })
      }
    })
  },
  // 滑动swiper时触发
  changeSwiper(e) {
    const cur = e.detail.current
    console.log(cur)
    this.setData({
      itemId: 'item' + cur
    })
    this.data.areaData.forEach((item, index) => {
      const str = 'areaData[' + index + '].active'
      if (cur == index) {
        this.setData({
          [str]: true
        })

        let param = item.value == 0 ? this.data.addressValue : this.data.addressValue + '|' + item.value
        this.queryProject(param, '')
      } else {
        this.setData({
          [str]: false
        })
      }
    })
  },
  // 每列数据选择后的回调
  onValueChange(e) {
    console.log(e.detail.value)
  },
  // 打开弹窗
  openPop() {
    this.setData({
      visibleSelect: true,
    })
  },
  // 关闭弹窗
  onClose() {
    this.setData({
      visibleSelect: false,
    })
  },
  // 项目名称搜索
  confirmSearch(e) {
    const val = e.detail.value
    let arr = []
    this.data.itemList.forEach(n => {
      if (n.projectName.indexOf(val) > -1) {
        arr.push(n)
      }
    })
    this.setData({
      showList: arr
    })
  },
  // 选择区
  clickArea(e) {
    const cur = e.currentTarget.dataset.value
    let arr = this.data.areaData
    let addVal = this.data.addressValue
    for (var i = 0; i < arr.length; i++) {
      if (cur == arr[i].value) {
        arr[i].active = true
      } else {
        arr[i].active = false
      }
    }
    if (addVal.length > 13) {
      addVal = addVal.substring(0, 13)
    }
    if (cur != 0) {
      addVal += '|' + cur
    }
    this.setData({
      areaData: arr,
      addressValue: addVal
    })
    console.log(this.data.addressValue)
    this.queryProject(this.data.addressValue, '')
  },
  gotoDetail(e) {
    const id = e.currentTarget.dataset.id
    const name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/monitor/data/data?id=' + id + '&name=' + name,
    })
  },
  // 查询项目工程
  queryProject(area, name) {
    const param = {
      area
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    monitorApi.getProject(param).then(res => {
      wx.hideLoading()
      if (res.code == 200) {
        this.setData({
          itemList: res.data,
          showList: res.data
        })
      }
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  // 根据code请求行政区域
  queryAreaList(code) {
    monitorApi.getAreaList(code).then(res => {
      if (res.code === 200) {
        if (code == '') {
          res.data.forEach(n => {
            n.isLeaf = false
          })
        }
        this.setData({
          optionsData: res.data
        })
        console.log(this.data.optionsData)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  onCloseSelect() {

  },
  //选择完成后的回调操作
  onChangeSelect(e) {
    console.log('onChange2', e.detail)
    if (e.detail.options.length === 2) {
      this.setData({
        addressLabel: e.detail.options[0].label + e.detail.options[1].label,
        addressValue: e.detail.options[0].value + '|' + e.detail.options[1].value
      })
      const code = e.detail.value[1]
      monitorApi.getAreaList(code).then(res => {
        if (res.code === 200) {
          res.data.forEach(n => {
            n.active = false
          })
          res.data.unshift({
            label: '全部',
            value: '0',
            active: true
          })
          this.setData({
            areaData: res.data
          })
          console.log(this.data.addressValue)
          this.queryProject(this.data.addressValue, '')
        }
      })
    }
  },
  // 选择非子节点之后请求数据
  onLoadOptions(e) {
    console.log('onLoadOptions', e.detail)
    const {
      value
    } = e.detail
    const code = e.detail.value[0]
    var options2 = this.data.optionsData
    console.log(code, options2)
    wx.showLoading({
      mask: true
    })
    // 请求市
    monitorApi.getAreaList(code).then(res => {
      if (res.code === 200) {
        options2.forEach(n => {
          if (n.value == code) {
            n.children = res.data
          }
        })
        wx.hideLoading()
        this.setData({
          curCity: value,
          optionsData: options2
        })
        console.log(options2)
      }
    })
  }
})