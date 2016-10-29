//details.js
//获取应用实例
var util = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
Page({
  data: {
    articles:[],
    articleUrl:"",
    title:"",
    content:"这是图文正文部分",
    author:"",
    url:"http://wxedit.yead.net/collect",
    wxParseData:[]
  },
  // 应用启动时加载数据
  onLoad: function (options) {
    var that = this

    that.setData({
      articles:wx.getStorageSync('articles')
    })

    var _id = options.id
    var _title = that.data.articles[_id].title
    var _url = that.data.articles[_id].articleUrl
    var _author = that.data.articles[_id].author

    // 根据图文链接获取图文内容--后台服务待提供
    wx.request({
      url: that.data.url,
      data: {
          url:_url
      },
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
            that.setData({
                title:_title,
                wxParseData:WxParse('html',res.data),
                author:_author
            })
        },
        fail:function(err){
          console.log(err)
        }
      })
  }
})
