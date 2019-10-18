import {
  $wuxForm,
  $wuxToptips
} from '../../../components/index'
var app = getApp()
var env = require("../../../config/host.js")
var operApi = require("../../../api/warnOper.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // operType: -1,
    // warningId: -1,
    // uploadServer: env.domain + 'sys/file/upload?token=' + app.globalData.token,
    showUploadMask: false,
    showUploadStatus: 'uploading',
    formField: [],
    showUserPage:true,
    phone: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {

  },
  // initForm: function () {
  //       this.setData({
  //         formField: [{
  //           name: 'leader',
  //           title: '专家长',
  //           value: '',
  //           required: true,
  //           msg: '请选择专家长',
  //           max: 1,
  //           placeholder: '专家长',
  //           type: 'user',
  //         },
  //         ]
  //       })
  // },
  // /**
  //  * 用户选择框变化
  //  */
  // onUserChange(e) {
  //   console.log(e)
  //   let ix = -1;
  //   for (var i = 0; i < this.data.formField.length; i++) {
  //     if (this.data.formField[i].name === e.target.dataset.name) {
  //       ix = i;
  //     }
  //   }
  //   if (ix > -1) {
  //     let key = 'formField[' + ix + '].value'
  //     this.setData({
  //       [key]: e.detail.users,
  //       phone:e.detail.users.mobile
  //     })
  //   }
  // },
  // /**
  //  * 单选框值变化
  //  */
  // onRadioChange(e) {
  //   console.log(e.detail.users.mobile)
  //   let ix = -1;
  //   for (var i = 0; i < this.data.formField.length; i++) {
  //     if (this.data.formField[i].name === e.target.dataset.name) {
  //       ix = i;
  //     }
  //   }
  //   if (ix > -1) {
  //     let key = 'formField[' + ix + '].value'
  //     this.setData({
  //       [key]: e.detail.value,
        
  //     })
  //   }
  // },
  
  
})