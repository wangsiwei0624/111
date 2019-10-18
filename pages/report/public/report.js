// pages/submit/submit.js
import {
  $wuxForm,
  $wuxToptips
} from '../../../components/index'
var env = require("../../../config/host.js")

var publicReportApi = require("../../../api/publicReport.js")
var userUtils = require("../../../lib/user.utils.js")
var commonUtils = require("../../../lib/utils.js")

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authAndSumbit:true,
    showUploadMask: false,
    showUploadStatus: 'uploading',
    remarks: '', // 描述信息
    location: '', // 位置信息
    lat: 0,
    lon: 0,
    createBy: '',
    fileList: [],
    fileListImg: [],
    uploadServer: env.domain + 'sys/file/upload?token=' + app.globalData.token,
    loading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      authAndSumbit:!app.isBind(),
      uploadServer: env.domain + 'sys/file/upload?token=' + app.globalData.token
    })
    // 获取位置权限
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: res => {
        console.log(res);
        this.setData({
          lon: res.longitude,
          lat: res.latitude
        })
      }
    })
    userUtils.getUserInfo().then(res => {
      this.setData({
        createBy: res.nickName
      })
    }).catch(err => {
      // TODO linx 未授权，后续统一处理，在未授权访问时，增加授权弹框
    })
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
  
  //图片
  onImgChange(e) {
    console.log(e)
    // const {
    //   fileImg,
    //   fileListImg
    // } = e.detail
    const fileImg = e.detail.file
    const fileListImg = e.detail.fileList
    if (fileImg.status === 'remove') {
      this.setData({
        fileListImg: fileListImg.filter((n) => n.uid !== file.uid),
      })
    }
  },
  onImgSuccess(e) {
    // const {
    //   fileImg,
    //   fileListImg
    // } = e.detail
    const fileImg = e.detail.file
    const fileListImg = e.detail.fileList

    this.setData({
      showUploadStatus: 'success'
    });
    var serverFileImg = JSON.parse(fileImg.res.data);
    if (serverFileImg.code === 200) {
      fileListImg.forEach(item => {
        if (item.uid === fileImg.uid) {
          item.sid = serverFileImg.data.id;
          item.type = serverFileImg.data.type;
        }
      })
      this.setData({
        fileListImg: fileListImg
      })
    };
  },
  onImgFail(e) {
    this.setData({
      showUploadStatus: 'error'
    });

  },
  onImgComplete(e) {
    setTimeout(() => {
      this.setData({
        showUploadMask: false
      })
    }, 2000)
  },
  onImgProgress(e) {
    this.setData({
      showUploadMask: true,
      showUploadStatus: 'uploading'
    })
  },
  onImgPreview(e) {
    console.log('onPreview', e)
    // const {
    //   fileImg,
    //   fileListImg
    // } = e.detail
    const fileImg = e.detail.file
    const fileListImg = e.detail.fileList
    wx.previewImage({
      current: fileImg.url,
      urls: fileListImg.map((n) => n.url),
    })
  },

  //视频
  onChange(e) {
    const {
      file,
      fileList
    } = e.detail
    if (file.status === 'remove') {
      this.setData({
        fileList: fileList.filter((n) => n.uid !== file.uid),
      })
    }
  },
  onSuccess(e) {
    const {
      file,
      fileList
    } = e.detail
    this.setData({
      showUploadStatus: 'success'
    });
    var serverFile = JSON.parse(file.res.data);
    if (serverFile.code === 200) {
      fileList.forEach(item => {
        if(item.uid === file.uid){
          item.sid = serverFile.data.id;
          item.type = serverFile.data.type;
        }
      })
      this.setData({
        fileList: fileList
      })
    };
  },
  onFail(e) {
    this.setData({
      showUploadStatus: 'error'
    });

  },
  onComplete(e) {
    setTimeout(() => {
      this.setData({
        showUploadMask: false
      })
    }, 2000)
  },
  onProgress(e) {
    this.setData({
      showUploadMask: true,
      showUploadStatus: 'uploading'
    })
  },
  onPreview(e) {
    console.log('onPreview', e)
    const {
      file,
      fileList
    } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  /**
   * 提交数据
   */
  onSubmit() {
    const {
      getFieldsValue,
      getFieldValue,
      setFieldsValue
    } = $wuxForm()
    const value = getFieldsValue()
    if (!value.remarks) {
      $wuxToptips().error({
        hidden: false,
        text: '描述信息不能为空',
        duration: 3000,
        success() {},
      })
      return;
    }
    if (!value.location) {
      $wuxToptips().error({
        hidden: false,
        text: '位置信息不能为空',
        duration: 3000,
        success() {},
      })
      return;
    }

    let ids = this.data.fileListImg.map((n) => n.sid);
    let videoIds = this.data.fileList.map((n) => n.sid);
    if (ids.length <= 0 && videoIds.length <= 0) {
      $wuxToptips().error({
        hidden: false,
        text: '图片或视频不能为空',
        duration: 3000,
        success() {},
      })
      return;
    }
    
    // if (videoIds.length <= 0) {
    //   $wuxToptips().error({
    //     hidden: false,
    //     text: '视频不能为空',
    //     duration: 3000,
    //     success() { },
    //   })
    //   return;
    // }
    wx.showLoading({
      title: '正在上报',
      mask: true,
    })
    const data = {
      remarks: value.remarks,
      location: value.location,
      lat: this.data.lat,
      lon: this.data.lon,
      createBy: this.data.createBy || app.globalData.user.name,
      attachId: ids.join(","),
      videoId: videoIds.join(",")
    };
    this.setData({
      loading: true,
    })
    publicReportApi.report(data).then(res => {
      console.log(res)
      wx.hideLoading();
      wx.showToast({
        title: '上报成功',
      })
      setTimeout(() => {
        wx.navigateBack()
        this.setData({
          loading: false,
        })
      }, 1000)
    }).catch(err => {
      wx.hideLoading();
      console.log(err)
    })
  },  
  /**
   * 获取用户信息信息
   */
  doLogin: function (e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      app.globalData.hasAuth = true;
      this.setData({
        createBy: app.globalData.userInfo.nickName
      })
      // 提交数据
      this.onSubmit();
    } else {
      // 拒绝
    }
  }
})