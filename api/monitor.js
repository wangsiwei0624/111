import axiso from '../lib/axiso.requeset.js'


module.exports = {
  // 获取行政区域
  getAreaList: function (code) {
    return axiso.request({
      url: "sys/area/getAreaList?parentCode=" + code,
      method: "post"
    });
  },
  // 查找项目
  getProject: function (data) {
    return axiso.request({
      url: "/monitoringProject/getMonProjectList",
      method: "post",
      data
    });
  },
  // 获取默认数据
  getDefaultCurveData: function (id) {
    return axiso.request({
      url: "wx/monitor/monData/defaultCurveParams?projectId=" + id,
      method: "post"
    });
  },
  // 获取检测内容下面的测点和成果值
  getCurvePoint: function (id, no) {
    return axiso.request({
      url: "wx/monitor/monData/getContentResults?projectId=" + id + "&contentNo=" + no,
      method: "post"
    });
  },
  // 查询曲线成果数据-深部位移剖面
  getSSWEChartData: function(data) {
    return axiso.request({
      url: "wx/monitor/monData/getSSWEChartData",
      method: "post",
      data
    });
  },
  // 查询曲线成果数据-深部位移ST曲线类
  getSSWSTEChartData: function (data) {
    return axiso.request({
      url: "wx/monitor/monData/getSSWSTEChartData",
      method: "post",
      data
    });
  },
  // 查询曲线成果数据-雨量类
  getJYEChartData: function (data) {
    return axiso.request({
      url: "wx/monitor/monData/getJYEChartData",
      method: "post",
      data
    });
  },
  // 查询曲线成果数据-表面位移类
  getBSWModelEChartData: function (data) {
    return axiso.request({
      url: "wx/monitor/monData/getBSWModelEChartData",
      method: "post",
      data
    });
  },
}