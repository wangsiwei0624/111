import axiso from '../lib/axiso.requeset.js'
var env = require("../config/host.js")
const app = getApp()
/**
 * 判断图片还是视频
 */
module.exports = {
  queryAttachType: function (id) {
    return axiso.request({
      url: 'sys/file/info/' + id + '?token=' + app.globalData.token,
      method: "get"
    });
  }
}