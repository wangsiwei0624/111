// pages/components/fab-button/index.js
Component({
  properties: {
    color:{
      type:String,
      value:''
    },
    boxShadow:{
      type: String,
      value: ''
    },
    icon: {
      type: String,
      value: ''
    },
    position:{
      type:String,
      value:'bottom-rigth'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    backgrounColor:'#2A7AD7',
    shadow:'0px 5px 12px 0px rgba(42,122,215,0.5);',
    fabStyle: 'bottom: 183rpx;right: 30rpx;',
    positionStyle:{
      'bottom-center':'bottom: 183rpx;right: calc(50% + 15rpx);',
      'bottom-left':'bottom: 183rpx;left: 30rpx;',
      'bottom-rigth': 'bottom: 183rpx;right: 30rpx;',
    }
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      if(this.data.color) {
        this.setData({
          backgrounColor:this.data.color
        })
      }
      if (this.data.boxShadow) {
        this.setData({
          shadow: this.data.boxShadow
        })
      }
      let style = this.data.positionStyle[this.data.position];
      if(style) {
        this.setData({
          fabStyle:style
        })
      } else {
        this.setData({
          fabStyle:this.data.position
        })
      }
    }
  }
})