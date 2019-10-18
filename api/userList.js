import axiso from '../lib/axiso.requeset.js'

module.exports = {
  
  warningPatrolTask: (id) => {
    return axiso.request({
      url: 'wx/warning/warningDetail?warningId=' + id,
    })
  },
  // //监测工程接口
  monitoringWorks: (data) => {
    return axiso.request({
      url: 'engineeringProject/findListForSelect',
      // method: 'post'
    })
  },
}