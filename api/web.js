import axiso from '../lib/axiso.requeset.js'

/**
 * 微信用户登录以及系统账号绑定
 */
module.exports = {
  scan: function (code) {
    return axiso.request({
      url: "/qr/scan?qr=" + code,
      method: "get",
    });
  },
  auth: function (code, sign) {
    return axiso.request({
      url: "/qr/auth?qr=" + code+"&sign="+sign,
      method: "get",
    });
  },
}