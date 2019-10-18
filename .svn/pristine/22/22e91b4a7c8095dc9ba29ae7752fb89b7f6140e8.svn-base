var warnListApi = require("../../../api/warning.js")
const app = getApp()

import {
  $startWuxRefresher,
  $stopWuxRefresher,
  $stopWuxLoader
} from '../../../components/index'
// const getList = (count = 10, step = 0) => [...new Array(count)].map((n, i) => ({
//   title: `Pull down ${i + step}`,
//   content: 'Wux Weapp'
// }))

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    color: '',
    items: [],
    count: 0,
    scrollTop: 0,

    listonoff2: false,

    waitscrollTop: 0,
    showWaitNoData: false,
    waitList: [],
    waitPage: 1,

    judgedscrollTop: 0,
    judgedList: [],
    judgedPage: 1,

    historyscrollTop: 0,
    showHistoryNoData: false,
    historyList: [],
    historyPage: 1,
    tabs:[],
    // linx 权限控制
    // showWarning: false,
    // showJudge: false,
    // showHistory: false,
    showWarning: true,
    showJudge: true,
    showHistory: true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let showWarning = app.checkPermission("watchhallManager"),
      showJudge = app.checkPermission("expertjudgedManager"),
      showHistory = app.checkPermission("historyalarmManager");
    let tabs = [];
    if (showWarning) {
      tabs.push("待办警情")
    }
    if (showJudge) {
      tabs.push("专家研判")
    }
    if (showHistory) {
      tabs.push("历史警情")
    }
    this.setData({
      showWarning,
      showJudge,
      showHistory,
      tabs
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
    this.data.showWarning && $startWuxRefresher('#waitList');
    this.data.showJudge && $startWuxRefresher("#judgedList");
    this.data.showHistory && $startWuxRefresher("#historyList");
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  onWaitListScroll(e) {
    this.setData({
      waitscrollTop: e.detail.scrollTop
    })
  },
  onJudgedListScroll(e) {
    console.log(e)
    this.setData({
      judgedscrollTop: e.detail.scrollTop
    })
  },
  onHistoryListScroll(e) {
    this.setData({
      historyscrollTop: e.detail.scrollTop
    })
  },

  //页面swiper效果开始
  onTabsChange(e) {
    const {
      key
    } = e.detail
    this.setData({
      currentTab: key
    })
  },
  onSwiperChange(e) {
    const {
      current: index,
      source
    } = e.detail
    if (source) {
      this.setData({
        currentTab:index,
      })
    }
  },
  //页面swiper效果结束


  //待办警情
  onWaitRefresh: function() {
    this.setData({
      waitPage: 1,
      waitList: [],
    })
    this.loadWaitList();
  },
  onWaitLoadmore: function() {
    this.setData({
      waitPage: this.data.waitPage + 1
    })
    this.loadWaitList();
  },
  loadWaitList: function() {
    warnListApi.warningList({
      pageNo: this.data.waitPage,
      pageSize: 10,
    }).then(res => {
      console.log(res)
      if (this.data.waitPage == 1 && res.data.list.length == 0) {
        this.setData({
          listonoff1: true,
        })
      }
      let color;
      for (var i = 0; i < res.data.list.length; i++) {
        switch (res.data.list[i].warningGrade) {
          case '1':
            res.data.list[i].color = '#CE5B5B'
            break;
          case '2':
            res.data.list[i].color = '#E78839'
            break;
          case '3':
            res.data.list[i].color = '#F4C93C'
            break;
          case '4':
            res.data.list[i].color = '#108EE9'
            break;
        }
      }
      if (res.code === 200) {
        let list = res.data.list;
        // 结束刷新
        this.stopLoading("wait", list.length <= 0);
        if (list.length > 0) {
          let tplist = [];
          this.setData({
            waitList: tplist.concat(this.data.waitList, list)
          })
        }
      } else {
        this.stopLoading("wait", false);
        wx.showToast({
          icon: "none",
          title: res.msg || '服务繁忙',
        })
      }
    }).catch(err => {
      this.stopLoading("wait", false);
    })
  },

  //专家研判
  onJudgedRefresh: function() {
    this.setData({
      judgedPage: 1,
      judgedList: [],
    })
    this.loadJudgedList();
  },
  onJudgedLoadmore: function() {
    this.setData({
      judgedPage: this.data.judgedPage + 1
    })
    this.loadJudgedList();
  },
  loadJudgedList: function() {
    warnListApi.warningJudged({
      pageNo: this.data.judgedPage,
      pageSize: 10
    }).then(res => {
      if (this.data.judgedPage == 1 && res.data.list.length == 0) {
        this.setData({
          listonoff2: true,
        })
      }
      let color;
      for (var i = 0; i < res.data.list.length; i++) {
        switch (res.data.list[i].warningGrade) {
          case '1':
            res.data.list[i].color = '#CE5B5B'
            break;
          case '2':
            res.data.list[i].color = '#E78839'
            break;
          case '3':
            res.data.list[i].color = '#F4C93C'
            break;
          case '4':
            res.data.list[i].color = '#108EE9'
            break;
        }
      }
      if (res.code === 200) {
        let list = res.data.list;
        // 结束刷新
        this.stopLoading("judged", list.length <= 0);
        if (list.length > 0) {
          let tplist = [];
          this.setData({
            judgedList: tplist.concat(this.data.judgedList, list)
          })
        }
      } else {
        this.stopLoading("judged", false);
        wx.showToast({
          icon: "none",
          title: res.msg || '服务繁忙',
        })
      }
    }).catch(err => {
      this.stopLoading("judged", false);
    })
  },

  //历史警情
  onHistoryRefresh: function() {
    this.setData({
      historyPage: 1,
      historyList: [],
    })
    this.loadHistoryList();
  },
  onHistoryLoadmore: function() {
    this.setData({
      historyPage: this.data.historyPage + 1
    })
    this.loadHistoryList();
  },
  loadHistoryList: function() {
    warnListApi.warningHistory({
      pageNo: this.data.historyPage,
      pageSize: 10,
    }).then(res => {
      if (res.code === 200) {
        let list = res.data.list;
        // 结束刷新
        this.stopLoading("history", list.length <= 0);
        if (list.length > 0) {
          let tplist = [];
          this.setData({
            historyList: tplist.concat(this.data.historyList, list)
          })
        }
      } else {
        this.stopLoading("history", false);
        wx.showToast({
          icon: "none",
          title: res.msg || '服务繁忙',
        })
      }
    }).catch(err => {
      this.stopLoading("history", false);
    })
  },
  stopLoading: function(type, noData) {
    if (this.data[type + 'Page'] === 1) {
      $stopWuxRefresher("#" + type + "List");
      let showNoData = "show" + (type.substring(0, 1).toUpperCase() + type.substring(1)) + "NoData";
      if (noData) {
        this.setData({
          [showNoData]: true
        })
      } else {
        this.setData({
          [showNoData]: false
        })
      }
    } else {
      if (noData) {
        $stopWuxLoader("#" + type + "List", this, true);
      } else {
        $stopWuxLoader("#" + type + "List", this, false);
      }
    }
  },
  //跳转
  goDetail: function(e) {
    const id = e.currentTarget.dataset.id
    const type = e.currentTarget.dataset.type
    const leader = e.currentTarget.dataset.leader
    wx.navigateTo({
      url: '/pages/warning/info/info?id=' + id + '&type=' + type + '&leader=' + leader,
    })
  },
  goHistory: function(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/warning/history/history?id=' + id,
    })
  },

  onNewBuilt: function() {
    wx.navigateTo({
      url: '/pages/warning/report/index',
    })
  }
})