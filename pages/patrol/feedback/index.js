import {
  $wuxForm,
  $wuxToptips
} from '../../../components/index'
var env = require("../../../config/host.js")

var patrolDetalFeedApi = require("../../../api/patrol.js")
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
    remarks: '', // 反馈内容
    // location: '', 
    // warningGrade:'',
    lat: 0,
    lon: 0,
    createBy: '',
    attachId: '',
    videoId: '',
    imgFileList: [],
    videoFileList: [],
    projectId: '',
    id: '',
    loading: false,
    uploadServer: env.domain + 'sys/file/upload?token=' + app.globalData.token,
    // operType: -1,
    // warningId: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id:options.id,
      projectId:options.projectId,
      uploadServer: env.domain + 'sys/file/upload?token=' + app.globalData.token
    })
    // 获取位置权限
    // wx.getLocation({
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //   success: res => {
    //     this.setData({
    //       lon: res.longitude,
    //       lat: res.latitude
    //     })
    //   }
    // })
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
  onShow: function (options) {

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

  // onRadioChange(e) {
  //   console.log(e)
  //   this.setData({
  //     projectId: e.detail.value,
  //   })
  // },
  // onRadioChangeType(e) {
  //   console.log(e)
  //   this.setData({
  //     planType: e.detail.value,
  //   })
  // },
  onChange(e) {
    const {
      file,
      fileList
    } = e.detail
    let key = e.currentTarget.dataset.type + 'FileList';
    if (file.status === 'remove') {
      this.setData({
        [key]: fileList.filter((n) => n.uid !== file.uid),
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
    let key = e.currentTarget.dataset.type +'FileList';
    var serverFile = JSON.parse(file.res.data);
    if (serverFile.code === 200) {
      fileList.forEach(item => {
        if (item.uid === file.uid) {
          item.sid = serverFile.data.id;
          item.type = serverFile.data.type;
        }
      })

      this.setData({
        [key]: fileList
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
    console.log(this.data.projectId)
    const {
      getFieldsValue,
      getFieldValue,
      setFieldsValue
    } = $wuxForm()
    const value = getFieldsValue()
    if (!value.location) {
      $wuxToptips().error({
        hidden: false,
        text: '反馈信息不能为空',
        duration: 3000,
        success() { },
      })
      return;
    }
    let ids = this.data.imgFileList.map((n) => n.sid);
    if (ids.length <= 0 ) {
      $wuxToptips().error({
        hidden: false,
        text: '图片不能为空',
        duration: 3000,
        success() { },
      })
      return;
    }

    let videoIds = this.data.videoFileList.map((n) => n.sid);
    if (videoIds.length <= 0) {
      $wuxToptips().error({
        hidden: false,
        text: '视频不能为空',
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
      remarks: value.location,
      imgAttachId: ids.join(","),
      videoAttachId: videoIds.join(","),
      id: this.data.id
    };
    this.setData({
      loading: true,
    })
    patrolDetalFeedApi.patrolDetalFeed(data).then(res => {
      console.log(res)
      wx.hideLoading();
      if (res.code == 200) {
        wx.showToast({
          title: '上报成功',
        })
        setTimeout(() => {
          wx.navigateBack({ delta: 2 })
          this.setData({
            loading: false,
          })
        }, 1000)
      } else {
        wx.showToast({
          title: '上报失败',
        })
        this.setData({
          loading: false,
        })
      }

    }).catch(err => {
      wx.hideLoading();
      console.log(err)
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})