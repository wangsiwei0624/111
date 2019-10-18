var env = require("../../../config/host.js")
var attachApi = require("../../../api/attachApi.js")
const app = getApp()
Component({
  properties: {
    attachId: {
      type: String,
      value: ''
    },
    imgAttachId: {
      type: String,
      value: ''
    },
    videoAttachId: {
      type: String,
      value: ''
    }
  },
  data: {
    imgUrlArr: [],
    videoUrlArr: [],
    arrType:[],
    totalArr: []
  },
  observers: {
    'attachId': function(attachId) {
      if (this.data.attachId != '') {
        this.attachHander(this.data.attachId)
      }
    }
  },
  methods: {
    attachHander(id) {
      this.setData({
        token: app.globalData.token,
        domain: env.domain
      })
      const arr = id.split(',')
      let imgUrlArr = []
      let videoUrlArr = []
      // 删除最后一个空元素
      if (arr[arr.length - 1] == '') {
        arr.pop()
      }
      var totalArr = []
      for (let i = 0; i < arr.length; i++) {
        totalArr.push({
          id: arr[i]
        })
        this.queryAttachType(arr[i], i)
      }
      this.setData({
        totalArr: totalArr
      })
      // setTimeout(() => {
      //   console.log(this.data.totalArr)
      // })
    },

    // 处理数据，将类型和id放在一起
    queryAttachType(id, i) {
      let type = ''
      attachApi.queryAttachType(id).then(res => {
        if (res.code == 200) {
          if (res.data.mimeType.split('/')[0] == 'image') {
            type = 'img'
          } else if (res.data.mimeType.split('/')[0] == 'video') {
            type = 'video'
          } else if (res.data.mimeType == 'application/pdf') {
            type = 'pdf'
          } else if (res.data.mimeType == 'application/msword') {
            type = 'word'
          } else if (res.data.mimeType == 'application/vnd.ms-excel') {
            type = 'excel'
          } else if (res.data.mimeType == 'text/plain') {
            type = 'txt'
          } else if (res.data.mimeType == 'application/zip') {
            type = 'zip'
          } else {
            type = 'other'
          }
          let str = 'totalArr' + '[' + i + '].type'
          this.setData({
            [str]: type
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 全屏查看图片
    zoomImage(e) {
      const current = e.currentTarget.dataset.current
      let arr = []
      this.data.totalArr.forEach(n => {
        if (n.type == 'img') {
          arr.push(env.domain + 'sys/file/download?id=' + n.id + '&token=' + app.globalData.token + '&t=max')
        }
      })
      wx.previewImage({
        current: env.domain + 'sys/file/download?id=' + current.id + '&token=' + app.globalData.token + '&t=max',
        urls: arr
      })
    },
    // 全屏查看视频
    zoomVideo(e) {
      const index = e.currentTarget.dataset.index
      const context = wx.createVideoContext('vid' + index)
      context.requestFullScreen()
      context.play()
    },
    // 打开其他类型文件
    openOtherFile(e) {
      const current = e.currentTarget.dataset.current
      if (current.type == 'word' || current.type == 'xls' || current.type == 'pdf') {
        wx.downloadFile({
          url: env.domain + 'sys/file/download?id=' + current.id + '&token=' + app.globalData.token,
          success: function (res) {
            const filePath = res.tempFilePath
            wx.openDocument({
              filePath: filePath,
              success: function (res) {
                console.log('打开文档成功')
              }
            })
          }
        })
      } else {
        wx.showToast({
          title: '该文件不支持在小程序中预览',
          icon: 'none',
          duration: 2000
        })
      }
    }
  }
})