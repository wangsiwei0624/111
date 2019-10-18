var patrolReportApi = require("../../../api/patrol.js")
var warningApi = require("../../../api/warning.js")
var env = require("../../../config/host.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    patrolDetail:{},
    token: '',
    domain: '',
    patrolMessage: '',
    ownImg: '',
    ownVideo: '',
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      domain: env.domain,
      token: app.globalData.token,
    })
    console.log(options.id)
    patrolReportApi.patrolDetail(this.data.id).then((res) => {
      wx.showLoading({
        title: '加载中',
        success: (res) => {
          wx.hideLoading();
        }
      })
      
      console.log(res)
      for (var i in res.data) {
        if (res.data[i] == null) {
          res.data[i] = ''
        }
      }
      this.setData({
        patrolMessage: res.data,
      })

      // var imgAttachId = res.data.imgAttachId
      // var videoAttachId = res.data.videoAttachId
      // imgAttachId = (res.data.imgAttachId || '').split(',')
      // videoAttachId = (res.data.videoAttachId || '').split(',')
      // for (var i = 0; i < imgAttachId.length; i++) {
      //   imgAttachId[i] = env.domain + 'sys/file/download?id=' + imgAttachId[i] + '&token=' + app.globalData.token
      // }
      // for (var i = 0; i < videoAttachId.length; i++) {
      //   videoAttachId[i] = env.domain + 'sys/file/download?id=' + videoAttachId[i] + '&token=' + app.globalData.token
      // }
      // console.log(imgAttachId)
      // console.log(videoAttachId) 
      // this.setData({
      //   // patrolMessage:res.data,
      //   ownImg:imgAttachId,
      //   ownVideo: videoAttachId,
      // })

    })
    // //获取附件方法
    // warningApi.queryFileApi(id,token).then((res) => {
    //   console.log(res.data)
    // })
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
  onFeedback:function (e){
    console.log(e)
    const id = e.currentTarget.dataset.id
    // console.log(id)
    wx.navigateTo({
      url: '/pages/patrol/feedback/index?id=' + id +'?',
    })
  },
  onMap:function (e) {
    console.log(e)
    let lat = Number(e.currentTarget.dataset.lat)
    let lon = Number(e.currentTarget.dataset.lon)
    let name = e.currentTarget.dataset.name
    let projectName = e.currentTarget.dataset.projectname
    wx.openLocation({
      latitude: lat,
      longitude: lon,
      name: projectName,
      address: name,
      scale: 18
    })
  },

  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },

})