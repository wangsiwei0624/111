import axios from '../lib/axiso.requeset.js'

module.exports = {

  /**
   * 人员派遣、移交专家
   */
  saveDispatcher: (data) => {
    return axios.request({
      url: '/wx/warningDispatch/saveDispatcher',
      data,
      method: 'post'
    })
  },

  /**
   * 反馈
   */
  saveFeedback: (data) => {
    return axios.request({
      url: '/wx/warningFeedback/save',
      data,
      method: 'post'
    })
  },



  /**
   * 升级、降级
   */
  saveGradeChanged: (data) => {
    return axios.request({
      url: '/wx/warningGradeChanged/save',
      data,
      method: 'post'
    })
  },



  /**
   * 发送短信
   */
  saveSmRecord: (data) => {
    return axios.request({
      url: '/wx/warningSmRecord/save',
      data,
      method: 'post'
    })
  },



  /**
   * 发表意见
   */
  saveOpinion: (data) => {
    return axios.request({
      url: '/wx/warningOpinion/save',
      data,
      method: 'post'
    })
  },

  /**
   * 完结
   */
  warningFinish: (data) => {
    return axios.request({
      url: '/wx/warning/finish?warningId=' + data.warningId + '&content=' + data.content,
      method: 'post'
    })
  },


  /**
   * 研判-下结论、发表意见
   */
  judgedWarning: (data) => {
    return axios.request({
      url: '/wx/warningJudged/save',
      data,
      method: 'post'
    })
  },


  /**
   * 移交专家时获取已派遣专家人员列表
   */
  findExpertList: (id) => {
    return axios.request({
      url: '/wx/warningDispatch/findExpertList?warningId=' + id,
      method: 'post'
    })
  },


  warningDetail: function(data) {
    return axios.request({
      url: 'wx/warning/warningDetail',
      method: 'post'
    })
  },
  /**
   * 根据警情ID获取警情短信内容模板
   */
  getSmsTemplateContent: function(id) {
    return axios.request({
      url: 'wx/warning/getSmsTemplateContent?warningId=' + id,
      method: 'get'
    })
  }
}