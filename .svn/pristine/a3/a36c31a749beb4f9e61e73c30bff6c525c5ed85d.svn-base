import axiso from '../lib/axiso.requeset.js'

/**
 * 公众上报
 */
module.exports = {
  report: function ({
    content,
    // attachId,
    attachId,
  }) {
    const data = {
      content: content,
      attachId: attachId,
    };
    return axiso.request({
      url: "wx/user/suggestion",
      method: "post",
      data,
    });
  }
}