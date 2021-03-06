"use strict";
var _baseComponent = _interopRequireDefault(require("../helpers/baseComponent")),
  _classNames2 = _interopRequireDefault(require("../helpers/classNames")),
  _eventsMixin = _interopRequireDefault(require("../helpers/eventsMixin")),
  _styleToCssString = _interopRequireDefault(require("../helpers/styleToCssString"));

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}

function _defineProperty(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e
}
var defaultEvents = {
  onChange: function () { },
  onFocus: function () { },
  onBlur: function () { },
  onConfirm: function () { },
  onClear: function () { },
  onError: function () { },
  onLineChange: function () { }
};

(0, _baseComponent.default)({
  behaviors: [(0, _eventsMixin.default)({
    defaultEvents: defaultEvents
  })],
  relations: {
    "../field/index": {
      type: "ancestor"
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    rows:{
      type:Number,
      value:5
    },
    placeholder:{
      type:String,
      value:''
    },
    value: {
      type: String,
      value: "",
      observer: function (e) {
        this.data.controlled && this.updated(e)
      }
    },
    defaultValue: {
      type: String,
      value: ""
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    showMask:false,
    inputValue:'',
    showOrigin:false,
    controlled:false
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    updated: function (e) {
      this.hasFieldDecorator || this.data.inputValue !== e && this.setData({
        inputValue: e
      })
    },
    onBlur:function(e){
      this.setData({
        showOrigin: false
      })
    },
    onFouce:function(e){
      this.setData({
        showOrigin:true
      })
    },
    onChange:function(e){
      var t = e.detail.value;
      this.data.controlled || this.updated(t), this.triggerEvent("change", e.detail)
    }
  },
  attached: function () {
    var e = this.data,
      t = e.defaultValue,
      n = e.value,
      a = e.controlled ? n : t;
    this.updated(a)
  },
});