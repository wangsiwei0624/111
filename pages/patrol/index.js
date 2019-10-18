var patrolListApi = require("../../api/patrol.js")

import { $startWuxRefresher, $stopWuxRefresher, $stopWuxLoader } from '../../components/index'

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    items: [],
    count: 0,
    scrollTop: 0,
    currentTab: '',
    patrolMessage: '',
    current: 'tab1',

    iscrollTop: 0,
    ingList: [],
    ingPage: 1,

    nscrollTop: 0,
    notList: [],
    notPage: 1,

    fscrollTop: 0,
    finishList: [],
    finishPage: 1,
 
    tabs: [
      {
        key: 'tab1',
        title: '进行中',
      },
      {
        key: 'tab2',
        title: '未开始',
      },
      {
        key: 'tab3',
        title: '已完成',
      },
    ],
    showIngNoData: false,
    showNotNoData: false,
    showFinishNoData: false,
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
    $startWuxRefresher("#ingList");
    $startWuxRefresher("#notList");
    $startWuxRefresher("#finishList");
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
  onIngListScroll(e) {
    console.log(e)
    this.setData({
      iscrollTop: e.detail.scrollTop
    })
  },
  onNotlistScroll(e) {
    console.log(e)
    this.setData({
      nscrollTop: e.detail.scrollTop
    })
  },
  onFinishlistScroll(e) {
    this.setData({
      fscrollTop: e.detail.scrollTop
    })
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

  //列表swiper效果
  onChange(e) {
    this.setData({
      currentTab: e.detail.key,
    })
  },

  onDetail:function (e){
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/patrol/detail/index?id=' + id,
    })
  },

  onNewBuilt:function (){
    wx.navigateTo({
      url: '/pages/patrol/report/index',
    })
  },

  onChange(e) {
    console.log('onChange', e)
    this.setData({
      current: e.detail.key,
    })
  },
  onTabsChange(e) {
    console.log('onTabsChange', e)
    const { key } = e.detail
    const index = this.data.tabs.map((n) => n.key).indexOf(key)

    this.setData({
      key,
      index,
    })
  },
  onSwiperChange(e) {
    console.log('onSwiperChange', e)
    const { current: index, source } = e.detail
    const { key } = this.data.tabs[index]

    if (!!source) {
      this.setData({
        key,
        index,
      })
    }
  },
  //列表swiper效果结尾
  
  // 进行中
  onIngRefresh: function () {
    this.setData({
      ingPage: 1,
      ingList: [],
    })
    this.loadIngList();
  },
  onIngLoadmore: function () {
    this.setData({
      ingPage: this.data.ingPage + 1
    })
    this.loadIngList();
  },
  loadIngList: function () {
    patrolListApi.patrolList({
      pageNo: this.data.ingPage,
      pageSize: 10,
      taskStatus: "0"
    }).then(res => {
      console.log(res)
      if (this.data.ingPage == 1 && res.data.list.length == 0) {
        this.setData({
          showIngNoData: true,
        })
      }
      if (res.code === 200) {
        let list = res.data.list;
        // 结束刷新
        this.stopLoading("ing", list.length <= 0);
        if (list.length > 0) {
          let tplist = [];
          this.setData({
            ingList: tplist.concat(this.data.ingList,list)
          })
        }
      } else {
        // 结束刷新
        this.stopLoading("ing", true);
        wx.showToast({
          icon: "none",
          title: res.msg || '服务繁忙',
        })
      }
    }).catch(err => {
      this.stopLoading("ing", true);
    })
  },

  //未开始
  onNotRefresh: function () {
    this.setData({
      notPage: 1,
      notList: [],
    })
    this.loadNotList();
  },
  onNotLoadmore: function () {
    this.setData({
      notPage: this.data.notPage + 1
    })
    this.loadNotList();
  },
  loadNotList: function () {
    patrolListApi.patrolList({
      pageNo: this.data.notPage,
      pageSize: 10,
      taskStatus: "1"
    }).then(res => {
      if (this.data.notPage == 1 && res.data.list.length == 0) {
        this.setData({
          showNotNoData: true,
        })
      }
      if (res.code === 200) {
        let list = res.data.list;
        // 结束刷新
        this.stopLoading("not", list.length <= 0);
        if (list.length > 0) {
          let tplist = [];
          this.setData({
            notList: tplist.concat(this.data.notList,list)
          })
        }
      } else {
        // 结束刷新
        this.stopLoading("not", true);
        wx.showToast({
          icon: "none",
          title: res.msg || '服务繁忙',
        })
      }
    }).catch(err => {
      this.stopLoading("not", true);
    })
  },
  stopLoading: function (type, noData) {
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
        $stopWuxLoader("#" + type + "List");
      }
    }
  },
  //已完成
  onFinishRefresh: function () {
    this.setData({
      finishPage: 1,
      finishList: [],
    })
    this.loadFinishList();
  },
  onFinishLoadmore: function () {
    this.setData({
      finishPage: this.data.finishPage + 1
    })
    this.loadFinishList();
  },
  loadFinishList: function () {
    patrolListApi.patrolList({
      pageNo: this.data.finishPage,
      pageSize: 10,
      taskStatus: "2"
    }).then(res => {
      if (this.data.finishPage == 1 && res.data.list.length == 0) {
        this.setData({
          showFinishNoData: true,
        })
      }
      if (res.code === 200) {
        let list = res.data.list;
        // 结束刷新
        this.stopLoading("finish", list.length <= 0);
        if (list.length > 0) {
          let tplist = [];
          this.setData({
            finishList: tplist.concat(this.data.finishList,list)
          })
        }
      } else {
        // 结束刷新
        this.stopLoading("finish", true);
        wx.showToast({
          icon: "none",
          title: res.msg || '服务繁忙',
        })
      }
    }).catch(err => {
      this.stopLoading("finish", true);
    })
  }
})