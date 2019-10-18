import axiso from '../lib/axiso.requeset.js'

module.exports = {
  report: function ({
    phone
  }) {
    const data = {
      phone: phone,
    };
    return axiso.request({
      url: "/sms/send",
      method: "get",
      data,
    });
  }
}