import axiso from '../lib/axiso.requeset.js'


module.exports = {
  getDataFromUrl: function (url,type,data) {
    return axiso.request({
      url: url,
      method: (type || "get"),
      data: (data || {} )
    });
  },
}