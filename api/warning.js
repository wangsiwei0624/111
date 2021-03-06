import axiso from '../lib/axiso.requeset.js'


module.exports = {
  //首页首页警情数据接口
  homePageToDo: ({
    pageNo,
    pageSize,
  }) =>{
    return axiso.request({
      url: 'wx/warningInfo/homePageToDo?pageNo=' + pageNo + "&pageSize=" + pageSize,
      method: 'post',
      data: {}
    })
  },
  //监测预警-待办事项
  warningList: ({
    pageNo,
    pageSize,
  }) => {
    return axiso.request({
      url: 'wx/warningInfo/unfinishedPage?pageNo=' + pageNo + "&pageSize=" + pageSize,
      method: 'post',
      data: {}
    })
  },

  //监测警情-专家研判
  warningJudged: ({
    pageNo,
    pageSize
  }) => {
    return axiso.request({
      url: 'wx/warningJudged/judgedPage?pageNo=' + pageNo + "&pageSize=" + (pageSize || 10),
      method: 'post',
      data: {}
    })
  },

  //监测警情-历史
  warningHistory: ({
    pageNo,
    pageSize
  }) => {
    return axiso.request({
      url: 'wx/warningInfo/historyPage?pageNo=' + pageNo + "&pageSize=" + (pageSize || 10),
      method: 'post',
      data: {}
    })
  },
  //监测预警-人工报警
  warningReport: function ({
    description,
    imgAttachId,
    videoAttachId,
    warningGrade,
    preWarningGrade,
    projectId,
  }) {
    const data = {
      description: description,
      imgAttachId: imgAttachId,
      videoAttachId: videoAttachId,
      warningGrade: warningGrade,
      preWarningGrade: preWarningGrade,
      projectId: projectId,
    };
    return axiso.request({
      url: "wx/warningInfo/save",
      method: "post",
      data,
    });
  },

  // 获取警情详情
  getWarningDetail: function (id) {
    return axiso.request({
      url: "wx/warning/warningDetail?warningId="+id,
      method: "post"
    });
  },
  // 获取警情处理记录
  getWarningDealRecord: function (id){
    return axiso.request({
      url: "wx/warning/warningOperationRecord?warningId=" + id,
      method: "post"
    });
  },
  // 完结警情
  controlButton: function (id) {
    const data = {}
    return axiso.request({
      url: "wx/warning/getOperationControl?warningId=" + id,
      method: "post",
      data
    })
  },
  // 获取附件
  queryFileApi: function (id, token) {
    return axiso.request({
      url: "sys/file/download?id="+ id + "&token=" + token,
      method: "get"
    })
  },
  // 历史警情列表
  queryHistoryList: function (id) {
    return axiso.request({
      url: "wx/warningInfo/historyPage",
      method: "post",
      data: {
        projectId: id
      }
    })
  },
  // 项目详情
  queryProjectDetail: function (id) {
    return axiso.request({
      url: "monitoringProject/detail?projectId=" + id,
      method: "get"
    })
  },
  // 警情详情当前打开人加入到map
  openWarningDetail: function (data) {
    return axiso.request({
      url: "wx/warning/openWarningDetail",
      method: "post",
      data
    })
  },
  // 更新警情详情Map
  updateDetailMap: function (data) {
    return axiso.request({
      url: "wx/warning/updateDetailMap",
      method: "post",
      data
    })
  }
}