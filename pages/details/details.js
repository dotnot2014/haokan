//details.js
//获取应用实例
var app = getApp()
Page({
  data: {
    articles:[],
    articleUrl:'',
    title:''
  },
  // 应用启动时加载数据
  onLoad: function (options) {
    var that = this

    if(options.pagemore == 'yes'){
      that.setData({
        articles:wx.getStorageSync('articles_more')
      })
    }else{
      that.setData({
        articles:wx.getStorageSync('articles')
      })
    }

    var _id = options.id
    var _title = that.data.articles[_id].title
    var _url = that.data.articles[_id].articleUrl

    that.setData({
      articleUrl:_url,
      title:_title
    })
  }
})
