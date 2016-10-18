//details.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    articles:[],
    articleUrl:"",
    title:"",
    content:"",
    author:"",
    url:"url2"
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

    // 根据图文链接获取图文内容
    wx.request({
      url: that.data.url,
      data: {
          url:_url
      },
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
          var _text = util.getHtmlText(res.data.data.res_content)
          that.setData({
              title:_title,
              content:_text,
              author:_author
          })
        }
      })
  }
})
