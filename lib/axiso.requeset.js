/**
 * 封装请求方法
 * 
 * @auther linx
 */
var env = require("../config/host.js")

const printServerError = (err, url) => {
  console.error("error at api : " + url)
  console.error("code:" + err.code);
  console.error("message:" + err.msg)
  console.error(err.data);
}

const axiso = {
  request: ({
    url,
    data,
    method,
    header
  }) => {
    // 统一添加token
    header = header || {};
    header["Authorization"] = getApp().globalData.token;

    return new Promise((resolve, reject) => {
      wx.request({
        url: env.domain + url,
        data: data,
        header: header,
        method: method || 'GET',
        dataType: 'json',
        responseType: 'application/json',
        success: function(res) {
          // linx 如果检测到未登录，则存储当前url及参数，跳转到登录界面，重新认证后跳回
          var data = res.data || {
            code: 404
          };
          if (data.code === 401) {
            let msg = data.msg;
            if (msg.indexOf("need login") >= 0 && !getApp().globalData.alreadyShowModal) {
              wx.navigateTo({
                url: '/pages/login/login?relogin=true',
              });
              return;
            } else {
              if (getApp().globalData.alreadyShowModal) {
                return;
              }
              getApp().globalData.alreadyShowModal = true;
              wx.showModal({
                title: '提示',
                content: data.msg,
                showCancel: false,
                success(res) {
                  getApp().globalData.alreadyShowModal = false;
                  wx.navigateTo({
                    url: '/pages/login/login?relogin=true',
                  });
                }
              })
              return;
            }
          } else if ((data.code / 100) == 4 || (data.code / 100) == 5) {
            printServerError(data, url)
          }
          resolve(data);
        },
        fail: function(err) {
          if (err && err.response && err.response.data) {
            printServerError(err.response.data, url)
          } else {
            console.error("error at api : " + url)
            console.error(err)
          }
          reject(err);
        },
        complete: function(res) {},
      });
    });
  }
}

module.exports = axiso;