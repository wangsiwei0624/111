// pages/report/index.js
var publicReport = require("../../api/publicReport.js")
import { $startWuxRefresher,$stopWuxRefresher, $stopWuxLoader } from '../../components/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:'0',
    rscrollTop:0,
    dscrollTop:0,
    dangerList:[],// 隐患点列表
    dangerPage:1,
    showReportNoData:true,
    showDangerNoData:true,
    reportList: [],// 公众上报列表
    reportPage: 1,
    types: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'center'],
    colorIndex: 4,
    dirIndex: 0,
    sAngle: 0,
    eAngle: 360,
    spaceBetween: 10,
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
  onShow: function () {
    // if(this.data.currentTab === '0') {
    //   $startWuxRefresher("#reportList");
    // } else {
    //   $startWuxRefresher("#dangerList");
    // }  
    $startWuxRefresher("#reportList");
    $startWuxRefresher("#dangerList");
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
  onReportScroll(e) {
    this.setData({
      rscrollTop: e.detail.scrollTop
    })
  },
  onDangerScroll(e) {
    this.setData({
      dscrollTop: e.detail.scrollTop
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  goReportDetail:function(e){
    wx.navigateTo({
      url: '/pages/report/public/detail?id='+e.currentTarget.dataset.id,
    })
  },
  onReportRefresh: function () {
    this.setData({
      reportPage: 1,
      reportList:[],
    })
    this.loadReportList();
  },
  onReportLoadmore: function () {
    this.setData({
      reportPage: this.data.reportPage + 1
    })
    this.loadReportList();
  },
  loadReportList: function () {
    publicReport.reportList({
      pageNo: this.data.reportPage
    }).then(res => {
      console.log(res)
      if (res.code === 200) {
        let list = res.data.list;
        // 结束刷新
        this.stopLoading("report",list.length <= 0);
        if (list.length > 0) {
          let tplist = [];
          this.setData({
            reportList: tplist.concat(this.data.reportList,list)
          })
        }
      } else {
        // 结束刷新
        this.stopLoading("report", true);
        wx.showToast({
          icon:"none",
          title: res.msg || '服务繁忙',
        })
      }
    }).catch(err => {
      this.stopLoading("report", true);
    })
  },
  // 隐患点列表
  goDangerDetail: function (e) {
    wx.navigateTo({
      url: '/pages/report/danger/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  onDangerRefresh:function(){
    this.setData({
      dangerPage:1,
      dangerList: []
    })
    this.loadDangerList();
  },
  onDangerLoadmore:function(){
    this.setData({
      dangerPage: this.data.dangerPage+1
    })
    this.loadDangerList();
  },
  loadDangerList:function() {
    publicReport.dangerList({
      pageNo: this.data.dangerPage
    }).then(res => {
      if(res.code === 200) {
        let list = res.data.list;
        // 结束刷新
        this.stopLoading("danger", list.length <= 0);
        if (list.length > 0) {
          let tplist = [];
          this.setData({
            dangerList: tplist.concat(this.data.dangerList,list)
          })
        }
      } else {
        // 结束刷新
        this.stopLoading("danger", true);
        wx.showToast({
          icon: "none",
          title: res.msg || '服务繁忙',
        })
      }
    }).catch(err => {
      this.stopLoading("danger", true);
    })
  },
  stopLoading:function(type,noData){
    if (this.data[type+'Page'] === 1) {
      $stopWuxRefresher("#" + type+"List");
      let showNoData = "show" + (type.substring(0, 1).toUpperCase() + type.substring(1))+"NoData";
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
        $stopWuxLoader("#" + type + "List");
      }
    }
  },
  onTabsChange(e) {
    console.log('onTabsChange', e)
    const { key } = e.detail
    this.setData({
      currentTab: key,
    })
  },
  onSwiperChange(e) {
    console.log('onSwiperChange', e)
    const { current: index, source } = e.detail

    if (source) {
      this.setData({
        currentTab: index,
      })
    }
  },
  goReport:function(e) {
    if (parseInt(this.data.currentTab) === 0) {
      // 灾害上报
      wx.navigateTo({
        url: '/pages/report/public/report',
      })
    } else {
      // 隐患点上报
      wx.navigateTo({
        url: '/pages/report/danger/report',
      })
    }
  }
})