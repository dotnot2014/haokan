// //subscribe.js
// //获取应用实例
// var util = require('../../utils/util.js')
// var app = getApp()
// Page({
//   data: {
//       title:"订阅图文",
//       content:"",
//   },
//   // 应用启动时加载数据
//   onLoad: function () {
//     // do something
//   }
// })


var app = getApp()
Page({
  data: {
    hasUserInfo: false
  },
  getUserInfo: function () {
    var that = this

    if (app.globalData.hasLogin === false) {
      wx.login({
        success: _getUserInfo
      })
    } else {
      _getUserInfo()
    }

    function _getUserInfo() {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            hasUserInfo: true,
            userInfo: res.userInfo
          })
          that.update()
        }
      })
    }
  },
   onLoad: function () {
    var that = this
    that.getUserInfo()
  },
  clear: function () {
    this.setData({
      hasUserInfo: false,
      userInfo: {}
    })
  }
})
