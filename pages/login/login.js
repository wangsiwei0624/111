/**
 *  用户登录入口，所有都先进入此目录
 */
var userApi = require("../../api/user.js");
import {
  $wuxLoading
} from '../../components/index'
const app = getApp();

Page({
  data: {
    showError: false,
    errorMsg: '',
    showAuth: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad:function(options) {
    if (options && options.relogin) {
      app.login();
    }
  },
  onShow: function(options) {
    app.hasAuthReadyCallback = hasAuth => {
      // this.setData({
      //   showAuth: !hasAuth
      // })
      this.goIndex()
    }
    // linx 如果已经有token则直接跳转
    if (app.globalData.token) {
      this.goIndex()
      return;
    }
  },
  getUserInfo: function(e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        hasUserInfo: true,
        showGetPhone: true,
      })
      this.goIndex()
    } else {

    }
  },
  goIndex() {
    // linx 判断用户是进入游客模式，还是登录认证后的模式
    if (app.isBind()) {
      wx.redirectTo({
        url: '/pages/user/index',
      })
    } else {
      wx.redirectTo({
        url: '/pages/visitor/index',
        // url: '/pages/login/login',
      })
    }
  }
})