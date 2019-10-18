import axiso from '../lib/axiso.requeset.js'

module.exports = {
  report: function ({
    phone,
    sms,
    domain
  }) {
    const data = {
      phone: phone,
      sms: sms,
      domain: domain,
    };
    return axiso.request({
      url: "/mini/bindUser",
      method: "post",
      data,
    });
  }
}