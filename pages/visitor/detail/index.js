// pages/detail/detail.js
var newsApi = require("../../../api/news.js")
var env = require("../../../config/host.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    newsApi.detail(options.id).then(res => {
      console.log(res)
      var data = res.data;
      wx.setNavigationBarTitle({
        title: data.title,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
      data.cover = env.domain + 'sys/file/download?token=' + app.globalData.token + "&id=" + data.cover + "&t=max"
      this.setData({
        article: data
      })

    }).catch(err => {

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})