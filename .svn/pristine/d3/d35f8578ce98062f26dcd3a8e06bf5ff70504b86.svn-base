import axiso from '../lib/axiso.requeset.js'

module.exports = {
  //首页巡查数据接口，巡查任务-数据接口
  patrolList: ({
    pageNo,
    pageSize,
    taskStatus
  }) => {
    return axiso.request({
      url: 'wx/patrolTask/page?pageNo=' + pageNo + "&pageSize=" + (pageSize || 10),
      method: 'post',
      data: {
        taskStatus: taskStatus
      }
    })
  },

  //巡查任务-新建警情
  patrolReport: function ({
    remarks,
    // attachId,
    warningGrade,
    projectId,
    planType,
    taskstatus,
    imgAttachId,
    videoAttachId
  }) {
    const data = {
      remarks: remarks,
      // attachId: attachId,
      imgAttachId: imgAttachId,
      warningGrade: warningGrade,
      projectId: projectId,
      taskstatus: taskstatus,
      planType: planType,
      videoAttachId: videoAttachId,
    };
    return axiso.request({
      url: "wx/patrolTask/saveTempTask",
      method: "post",
      data,
    });
  },

  //巡查任务-详情接口
  patrolDetail: (id) => {
    return axiso.request({
      url: 'wx/patrolTask/detail?id=' + id,
      method: "get"
    })
  },

  //巡查任务-反馈
  patrolDetalFeed: function ({
    remarks,
    // attachId,
    id,
    videoAttachId,
    imgAttachId
    // projectId,
  }) {
    const data = {
      remarks: remarks,
      imgAttachId: imgAttachId,
      videoAttachId: videoAttachId,
      id: id,
      // projectId: projectId,

    };
    return axiso.request({
      url: "wx/patrolTask/save",
      method: "post",
      data,
    });
  }
}