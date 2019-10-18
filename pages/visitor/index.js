var userApi = require("../../api/user.js");
var newsApi = require("../../api/news.js")
var env = require("../../config/host.js")
var userUtils = require("../../lib/user.utils.js");
const app = getApp()
Page({
  data: {
    nickname: '',
    current: '1',
    yn: false,
    hdif: false,
  },
  onLoad: function (options) {
    // linx 如果是首次登录，则显示向导
    userUtils.getUserInfo().then(res => {
      this.setData({
        yn: res.first,
      })
    })
    var that = this
    userApi.getUserInfo().then(res => {
      // console.log(res)
      that.setData({
        nickname: res.nickName
      })  
    }).catch(err => {
        // console.log(err)
    });



    // 数据获取
    newsApi.page({}).then(res => {
      console.log(res)
      if (res.data.length == 0) {
        that.setData({
          hdif: true,
        })
      }
      res.data.forEach(item => {
        item.cover = env.domain+'sys/file/download?token=' + app.globalData.token+"&id="+item.cover+"&t=max"
      })
      this.setData({
        message: res.data
      })
    }).catch(err => {

    }) 
  },

  onChange(e) {
    console.log('onChange', e)
    this.setData({
      current: e.detail.key,
    })
  },
  
  detail: function(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/visitor/detail/index?id='+id,
    })
  },
  
  changeModel: function() {
    this.setData({
      yn: false
    })
  },

  tp:function() {
    this.setData({
      sy: false,
    })
  }
})