/**
 * 新闻资讯
 */
import axiso from '../lib/axiso.requeset.js'

/**
 * 微信用户登录以及系统账号绑定
 */
module.exports = {
  page: function ({name,pageNo,pageSize}) {
    return axiso.request({
      url: "articles/getArticlesList", 
      method: "post",
      data: {
        name: name,
        pageNo: pageNo,
        pageSize: pageSize
      },
    });
  },
  detail: function(id){
    return axiso.request({
      url: "articles/getArticles?id="+id,
      method: "get"
    });
  }
}