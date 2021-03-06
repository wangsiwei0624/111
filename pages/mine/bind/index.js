// 绑定系统用户
var userApi = require("../../../api/user.js");
var utils = require("../../../lib/utils.js");
var app = getApp();

import {
  $wuxForm
} from '../../../components/index'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: 'password',
    eye: true,
    iconState: false,
    width: '85%',
    fromAuth:false
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      fromAuth: options.webAuth
    })
  },
  onSubmit() {
    wx.showLoading({
      title: '登录中',
      mask:true
    })
    const {
      getFieldsValue,
      getFieldValue,
      setFieldsValue
    } = $wuxForm()
    var value = getFieldsValue()
    value.domain = app.globalData.domain;
    // debugger
    userApi.bindUser(value).then(res => {
      wx.hideLoading()
      if (res.code === 200) {
        // debugger
        app.doGetOrgUserInfo().then(res => {
          // debugger
          // web授权未登录
          if (this.data.fromAuth){
            // 跳转到扫一扫
            wx.scanCode({
              onlyFromCamera:true,
              scanType: ['qrCode'],
              success:(res)=>{
                if (res.result) {
                  let code = utils.getParam(res.result, "code");
                  code = code.substr(3);
                  wx.redirectTo({
                    url: '/pages/web/auth?code='+code,
                  })
                }
              },fail:()=>{
                wx.redirectTo({
                  url: '/pages/login/login',
                })
              }
            })
          } else {
            wx.reLaunch({
              url: '/pages/login/login',
            })
          }
        }).catch(err => {
          wx.showToast({
            title: '认证失败，请稍后重试',
            icon:'error'
          })
        });
      } else {
        wx.showToast({
          title: res.msg || '账号或密码错误',
          icon:'none'
        })
      }
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: '服务繁忙',
        icon: 'none'
      })
    });
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
  onInput:function (e) {
    console.log(e)
    if (e.detail.cursor != 0){
      this.setData({
        iconState: true,
        width: '75%',
      })
    }else{
      this.setData({
        iconState: false,
        width: '85%',
      })
    }
  },
  onDisplay:function() {
    this.setData({
      eye: false,
    })
  },
  onHide:function() {
    this.setData({
      eye: true,
    })
  },
  toPhone: function () {
    wx.navigateTo({
      url: '/pages/mine/bind/phone/index?webAuth=' + this.data.fromAuth,
    })
  }
})