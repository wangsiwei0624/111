// pages/web/auth.js
const app = getApp();
var webApi = require("../../api/web.js");
var utils = require("../../lib/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAuthBtn:false,
    showLogin:false,
    code:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let code = '';
    if (options && options.q) {
      var url = decodeURIComponent(options.q);
      code = utils.getParam(url, "code");
      if (code){
        code = code.substr(3)
      }
    } else {
      code = options.code;
    }
    this.setData({
      code: code
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
    console.log('aaaa')
    // linx 如果已经有token则直接跳转
    if (app.globalData.token) {
      console.log('token')
      this.scanQr();
      return;
    }
    // 等待登录成功
    app.hasAuthReadyCallback = () => {
      console.log('callback')
      this.scanQr();
    }
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
  scanQr:function(){
    // 未登录则提示需要先登录账号
    if(!app.isBind()) {
      this.doBind();
      return;
    }

    console.log('scanQr')
    webApi.scan(this.data.code).then(res => {
      console.log(res);
      if(res.code !== 200) {
        return;
      }
      this.setData({
        showAuthBtn: true
      })
    }).catch(err => {
      console.error(err);
    });
  },
  authWeb:function(){
    webApi.auth(this.data.code,"").then(res => {
      if (res.code !== 200) {
        wx.showToast({
          title: res.msg || '授权失败',
          duration: 3000,
          mask: true,
          complete: () => {
            this.onIgnore();
          }
        })
        return;
      }
      wx.showToast({
        title: '授权成功',
        duration:3000,
        mask:true,
        complete:() => {
          this.onIgnore();
        }
      })
    }).catch(err => {
      wx.showToast({
        title: '服务繁忙',
        mask: true,
        complete: () => {
          this.onIgnore();
        }
      })
    })
  },
  doBind:function(){
    wx.redirectTo({
      url: '/pages/mine/bind/index?webAuth=true',
    })
  },
  onIgnore:function(){
    wx.redirectTo({
      url: '/pages/login/login',
    })
  }
})