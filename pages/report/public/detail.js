// pages/report/public/detail.js
var publicReport = require("../../../api/publicReport.js")
var env = require("../../../config/host.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    attrUrls: [
    ],
    indicatorDots: true,
    duration: 800,
    description:'',
    location:'',
    id:'',
    lat: 0,
    lon: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
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
    this.loadDetail(this.data.id)
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

  },
  loadDetail(id) {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    publicReport.reportDetail(id).then(res => {
      wx.hideLoading();
      console.log(res)
      if(res.code === 200) {
        let attrUrls = [];
        if(res.data.attachId){
          res.data.attachId.split(",").forEach(item => {
            attrUrls.push({type:'img',src:env.domain + 'sys/file/download?id=' + item + '&token=' + app.globalData.token})
          })
        }
        if (res.data.videoId) {
          res.data.videoId.split(",").forEach(item => {
            attrUrls.push({ type: 'video', src: env.domain + 'sys/file/download?t=max&id=' + item + '&token=' + app.globalData.token })
          })
        }
        this.setData({
          description: res.data.remarks,
          location: res.data.location,
          attrUrls: attrUrls,
          lat: res.data.lat,
          lon: res.data.lon,
        })
      } else {
        wx.showToast({
          title: res.msg || '服务繁忙',
        })
      }
    }).catch(err => {
      wx.hideLoading();
      wx.showToast({
        title: '服务异常，请稍后重试',
      })
    })
  },
  onMap: function (e) {
    wx.openLocation({
      latitude: this.data.lat,
      longitude: this.data.lon,
      address: this.data.location,
      scale: 18
    })
  }
})