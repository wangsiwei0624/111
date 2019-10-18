import axiso from '../lib/axiso.requeset.js'

/**
 * 公众上报
 */
module.exports = {
  report: function({
    remarks,
    location,
    lon,
    lat,
    createBy,
    attachId,
    videoId
  }) {
    const data = {
      remarks:remarks,
      location:location,
      lon:lon,
      lat:lat,
      createBy: createBy,
      attachId: attachId,
      videoId: videoId
    };
    return axiso.request({
      url: "wx/massesReport/save",
      method: "post",
      data,
    });
  },
  dangerReport: function ({
    dangerName,
    dangerNo,
    dangerStatus,
    remarks,
    location,
    lon,
    lat,
    attachId
  }) {
    const data = {
      dangerName: dangerName,
      dangerNo: dangerNo,
      dangerStatus: dangerStatus,
      remarks: remarks,
      location: location,
      lon: lon,
      lat: lat,
      attachId: attachId
    };
    return axiso.request({
      url: "wx/hiddenDangers/save",
      method: "post",
      data,
    });
  },
  dangerList: function ({pageNo}) {
    const data = {}
    return axiso.request({
      url: "/wx/hiddenDangers/page?pageNo="+pageNo+"&pageSize=10",
      method: "post",
      data,
    });
  },
  dangerDetail: function (id) {
    return axiso.request({
      url: "/wx/hiddenDangers/detail?id=" + id,
      method: "get",
    });
  },
  reportList: function ({ pageNo }) {
    const data = {}
    return axiso.request({
      url: "/wx/massesReport/page?pageNo=" + pageNo + "&pageSize=10",
      method: "post",
      data,
    });
  },
  reportDetail: function (id) {
    return axiso.request({
      url: "/wx/massesReport/detail?id=" + id,
      method: "get",
    });
  }
}