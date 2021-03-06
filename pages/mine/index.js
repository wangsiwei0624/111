// pages/mine/miine.js
var userUtils = require("../../lib/user.utils.js");
var userApi = require("../../api/user.js");
var utils = require("../../lib/utils.js");

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "", //用户头像
    nickName: "", //用户昵称
    showBind: !app.isBind()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //获取用户头像和昵称
    userUtils.getUserInfo().then(res => {
      this.setData({
        avatarUrl: res.avatarUrl,
        nickName: res.nickName,
      })
      // 进入该页面，若未授权 && 未登录(账号认证)，清空头像和昵称
      if (!app.globalData.hasAuth && !app.globalData.user.name) {
        this.setData({
          nickName: '',
          avatarUrl: ''
        })
      }
    }).catch(err => {
      this.setData({
        nickName: "点击授权",
      })
    })
    this.setData({
      showBind: !app.isBind()
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 获取用户信息信息
   */
  doLogin: function(e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      app.globalData.hasAuth = true;
      this.setData({
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName
      })
    } else {
      // 拒绝
    }
  },
  /**
   * 退出
   */
  doLogout: function() {
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    userApi.logout().then(res => {
      if (res.code === 200) {
        // 重新登录，清空orguser
        app.globalData.user = undefined;
        wx.reLaunch({
          url: '/pages/login/login?relogin=true',
        })
      } else {
        wx.showToast({
          title: res.msg || '账号或密码错误',
          icon: 'none'
        })
      }
    }).catch(err => {
      wx.showToast({
        title: res.msg || '账号或密码错误',
        icon: 'none'
      })
    })
  },
  doScan:function(){
    // 跳转到扫一扫
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success: (res) => {
        if (res.result) {
          let code = utils.getParam(res.result, "code");
          code = code.substr(3);
          wx.redirectTo({
            url: '/pages/web/auth?code=' + code,
          })
        }
      }, fail: () => {
        
      }
    })
  }
})