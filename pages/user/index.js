var warnListApi = require("../../api/warning.js")
var patrolListApi = require("../../api/patrol.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    layoutonoff:true,
    imgonoff: true,

    scrollTop: '',
    layoutScrollTop: 0,

    opacity:0,
    listMessage: '',
    patrolMessage: '',
    listonoff: true,
    patrolonoff: true,

    hiddenWarning: false, // linx 菜单权限控制
    hiddenPatrol: false, // linx 菜单权限控制
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // linx 权限检查
    this.setData({
      hiddenPatrol: !app.checkPermission("patrolTaskManager"),
      hiddenWarning: !app.checkPermission("watchhallManager||expertjudgedManager||historyalarmManager")
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
    var that = this
    warnListApi.homePageToDo({pageNo:1, pageSize:5}).then(res => {
      console.log(res)
      for (var i = 0; i < res.data.length; i++) {
        switch (res.data[i].warningGrade) {
          case '1':
            res.data[i].color = '#CE5B5B'
            break;
          case '2':
            res.data[i].color = '#E78839'
            break;
          case '3':
            res.data[i].color = '#F4C93C'
            break;
          case '4':
            res.data[i].color = '#108EE9'
            break;
        }
      }
      that.setData({
        listMessage: res.data,
      })
      if (res.data.length != 0) {
        that.setData({
          listonoff: false,
        })
      }
    })
    patrolListApi.patrolList({ pageNo: 1, pageSize: 5, taskStatus: 0}).then(res => {
      console.log(res)
      that.setData({
        patrolMessage: res.data.list,
      })
      if (res.data.list.length != 0) {
        that.setData({
          patrolonoff: false,
        })
      }
    })
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
  onPageScroll:function(e){
    console.log(e)
  },
  scroll:function(e) {
    var x = e.detail.scrollTop
    // console.log(x)
    //淡入淡出
    this.setData({
      opacity: (((x - 85) / 240)).toFixed(1)
    })
    //改变样式
    if (x >= 240) {
      this.setData({
        layoutonoff: false,
      })
    } else {
      this.setData({
        layoutonoff: true,
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //页面跳转
  onMoreList:function () {
    wx.navigateTo({
      url: '/pages/warning/list/index',
    })
  },
  onMorePatrol:function () {
    wx.navigateTo({
      url: '/pages/patrol/index',
    })
  },
  goDetail:function (e) {
    const id = e.currentTarget.dataset.id
    let type = e.currentTarget.dataset.type
    // 0新警情，1专家研判，2被派遣，3响应人，4派遣+响应
    if (type === "0" || type === "2" || type === "3" || type === "4") {
      // 待办警情和被派遣警情
      type = "1"
    } else {
      // 专家研判
      type = "2"
    }
    wx.navigateTo({
      url: '/pages/warning/info/info?id=' + id + '&type=' + type,// linx 默认都是待办警情
    })
  },
  goPatrolDetail: function(e) {
    console.log(e)
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/patrol/detail/index?id=' + id,
    })
  },
  goPage: function (e) {
    // linx 检查权限
    if (e.currentTarget.dataset.permission && !app.checkPermission(e.currentTarget.dataset.permission,true)) {
      return;
    }
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  }
})


