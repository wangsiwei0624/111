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
    showUploadMask: false,
    showUploadStatus: 'uploading',
    dangerName:'',
    dangerNo:'',
    dangerStatus:'',
    remarks: '', // 描述信息
    location: '', // 位置信息
    lat: 0,
    lon: 0,
    attachId: '',
    fileList: [],
    uploadServer: env.domain + 'sys/file/upload?token=' + app.globalData.token,
    loading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
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

  },
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
        if (item.uid === file.uid) {
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
  onDangerTypeChange:function(e) {
    console.log(e)
    this.setData({
      dangerStatus:e.detail.value
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
    if (!value.dangerName) {
      $wuxToptips().error({
        hidden: false,
        text: '隐患点名称不能为空',
        duration: 3000,
        success() { },
      })
      return;
    }
    if (!value.dangerNo) {
      $wuxToptips().error({
        hidden: false,
        text: '隐患点编号不能为空',
        duration: 3000,
        success() { },
      })
      return;
    }
    if (!this.data.dangerStatus) {
      $wuxToptips().error({
        hidden: false,
        text: '隐患点类型不能为空',
        duration: 3000,
        success() { },
      })
      return;
    }
    if (!value.remarks) {
      $wuxToptips().error({
        hidden: false,
        text: '描述信息不能为空',
        duration: 3000,
        success() { },
      })
      return;
    }
    if (!value.location) {
      $wuxToptips().error({
        hidden: false,
        text: '位置信息不能为空',
        duration: 3000,
        success() { },
      })
      return;
    }
    let ids = this.data.fileList.filter((n) => {return commonUtils.isImage(n.type)});
    ids = ids.map((n) => {return n.sid });
    if (ids.length <= 0) {
      $wuxToptips().error({
        hidden: false,
        text: '图片不能为空',
        duration: 3000,
        success() { },
      })
      return;
    }
    wx.showLoading({
      title: '正在上报',
      mask: true,
    })
    const data = {
      dangerName: value.dangerName,
      dangerNo: value.dangerNo,
      dangerStatus: this.data.dangerStatus,
      remarks: value.remarks,
      location: value.location,
      lat: this.data.lat,
      lon: this.data.lon,
      attachId: ids.join(",")
    };
    this.setData({
      loading: true
    })
    publicReportApi.dangerReport(data).then(res => {
      console.log(res)
      wx.hideLoading();
      if(res.code === 200){
        wx.showToast({
          title: '上报成功',
        })
        setTimeout(() => {
          wx.navigateBack()
          this.setData({
            loading: false,
          })
        }, 1000)
      } else {
        wx.showToast({
          title: res.msg || '上报失败，请稍后重试',
        })
        this.setData({
          loading: false,
        })
      }
    }).catch(err => {
      wx.hideLoading();
      wx.showToast({
        title: res.msg || '服务繁忙，请稍后重试',
      })
    })
  }
})