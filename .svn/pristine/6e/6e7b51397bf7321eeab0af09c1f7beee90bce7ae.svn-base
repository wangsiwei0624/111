var warningApi = require("../../../api/warning.js")
var env = require("../../../config/host.js")
const app = getApp()
Component({
  properties: {
    warningId: {
      type: String,
      value: '0'
    },
    showBtn: {
      type: Boolean,
      value: false
    },
    status: {
      type: String,
      value: '0'
    }
  },
  data: {
    originArr: [],
    showBtnArr: ['0', '0', '0', '0'],
    warningRecord: {},
    token: '',
    domain: '',
    fileArr: [],
    marginTop: '',
    itemHeight: ''
  },
  attached: function(options) {
    this.setData({
      domain: env.domain,
      token: app.globalData.token
    })
    // this.queryWarningRecord(this.properties.warningId)
  },
  observers: {
    'status': function (status) {
      console.log(status)
      let arr = []
      status == '3' ? arr = ['0', '0', '0', '0', '0'] : arr = ['0', '0', '0', '0']
      this.setData({
        originArr: arr
      })
    }
  },
  methods: {
    // 点开右侧按钮
    onclickBtn() {
      this.setData({
        showBtn: !this.data.showBtn,
        showBtnArr: this.data.originArr
      })
    },
    // 点击右侧按钮
    scrollTo(e) {
      const selector = e.currentTarget.dataset.text
      const index = e.currentTarget.dataset.index
      var arr = this.data.showBtnArr
      for (var i = 0; i < this.data.showBtnArr.length; i++) {
        if (i == index) {
          arr[i] = '1'
        } else {
          arr[i] = '0'
        }
      }
      this.setData({
        showBtnArr: arr
      })
      // 获取指定元素距离顶部的高度，并滚动到指定位置
      const that = this
      const query = wx.createSelectorQuery()
      query.select('.' + selector).boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function(res) {
        var miss = res[0].top + res[1].scrollTop - 45;
        wx.pageScrollTo({
          scrollTop: miss,
          duration: 300
        });
      })
    },
    // 点击最外层view收起按钮
    clickOuter() {
      this.setData({
        showBtn: false
      })
    }
  }
})