import axiso from '../lib/axiso.requeset.js'

/**
 * 微信用户登录以及系统账号绑定
 */
module.exports = {
  login: function(code, domain) {
    return axiso.request({
      url: "/wechat/login?code=" + code + "&domain=" + domain,
      method: "post",
    });
  },
  logout: function (code, domain) {
    return axiso.request({
      url: "/mini/logout",
      method: "post",
    });

  },
  bindUser: function({
    username,
    password,
    domain
  }) {
    return axiso.request({
      url: "/mini/bindUser",
      method: "post",
      data: {
        username: username,
        password: password,
        domain: domain
      }
    });
  }, 
  getOrgUser: function() {
    return axiso.request({
      url: "/getUserInfo",
      method: "get"
    });
  },
  getUserInfo: function() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function(res) {
                resolve(res.userInfo)
              },
              fail: function(err) {
                reject(err);
              }
            })
          }
        },
        fail: function(err) {
          reject(err);
        }
      })
    });
  }, 
  getUserMenu:function(){
    return axiso.request({
      url: "/wx/org/user/getUserMenu",
      method: "post"
    });
  },
  loadUnit: function (id, model, async){
    return axiso.request({
      url: '/org/company/getCompanyTreeOnly?id=' + id + "&model=" + model + "&async=" + async,
      method: 'get'
    })
  },
  loadUserPage: function({
    name,
    mobile,
    companyId,
    roleId,
  }) {
    // /org/user/page
    const data = {
      name: name,
      mobile: mobile,
      companyId: companyId,
      roleId: roleId,
      id: roleId,
    }
    if(data.roleId == 5){
      return axiso.request({
        url: "wx/org/user/pageRole", 
        method: "post",
        data
      });
    }else{
      return axiso.request({
        url: "/wx/org/user/page?pageSize=10000",
        method: "post",
        data
      });
    }
  }
}