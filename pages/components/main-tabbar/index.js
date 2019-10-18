// pages/components/main-tabbar/main-babbar.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentTabIndex: Number
  },
  /**
   * 页面的初始数据
   */
  data: {
    login: false,
    beforeReady:true,
    opacity:0,
    buttons: [{
      icon:'',
      title:'巡查任务',
      url:'/pages/patrol/report/index',
      // permission:'patrolTaskManager'
    },
    {
      icon: '',
      title: '人工预警',
      url: '/pages/warning/report/index',
      permission:'watchhallManager'
    },
    {
      icon: '',
      title: '隐患点',
      style: 'padding: 30rpx 5rpx;',
      url: '/pages/report/danger/report'
    }
    ],
    sAngle: -120,
    eAngle: -240,
    spaceBetween: 40
  },
  lifetimes: {
    ready: function () {
      // 在组件实例进入页面节点树时执行
      this.setData({
        beforeReady: false
      });
    }
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function() {
      this.animatShow();
      this.setData({
        login: app.isBind()
      })
      if (this.data.currentTabIndex == 1) {
        this.setData({
          currentTabIndex:0
        })
      }
    },
    hide: function() {},
    resize: function() {},
  },
  methods: {
    animatShow(){
      this.setData({
        opacity: this.data.opacity+0.1
      })
      if(this.data.opacity >= 1){
        return;
      }
      setTimeout(()=>{
        this.animatShow()
      },100)
    },
    goMine: function() {
      if (this.data.currentTabIndex == 2) {
        return;
      }
      wx.redirectTo({
        url: '/pages/mine/index',
      })
    },
    goReport: function() {
      wx.navigateTo({
        url: '/pages/report/index',
      })
    },
    goHome: function() {
      if (this.data.currentTabIndex == 0) {
        return;
      }
      if (getApp().isBind()) {
        wx.redirectTo({
          url: '/pages/user/index',
        })
      } else {
        wx.redirectTo({
          url: '/pages/visitor/index',
        })
      }
    },
    onClick:function(e) {
      if(this.data.login){
        // linx 检查权限
        if (e.detail.value.permission && !app.checkPermission(e.detail.value.permission, true)) {
          return;
        }
        wx.navigateTo({
          url: e.detail.value.url,
        })
      } else {
        // 未登录的直接跳转到公众上报
        wx.navigateTo({
          url: '/pages/report/public/report',
        })
      }
    }
  }
})