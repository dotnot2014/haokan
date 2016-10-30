//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    articles:[],
    eachdatas:[],
    hidden:true,
    hasmore:true,
    moredata:0
  },
  // 数据加载通用函数
  loadData: function(howmore){
      var that = this
      wx.request({
      url: 'http://app.admin.weijuju.com/mobile/article/getRecommendArticleList',
      data: {
        order:"asc",
        limit:10,
        offset:howmore
      },
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {

        for(var i=0;i<res.data.rows.length;i++){
          res.data.rows[i].postTime = res.data.rows[i].postTime.split(" ")[0]
        }

        if(howmore){
          that.setData({
            articles: that.data.articles.concat(res.data.rows)
          })
        }else{
          that.setData({
            articles: res.data.rows
          })
        }
      }
    })
  },
  // 到页面底部，加载更多数据
  loadMore: function(){
    var that = this

    that.setData({
      hasmore: false,
      moredata: that.data.moredata + 10
    })

    setTimeout(function () {
          that.loadData(that.data.moredata)
          that.setData({hasmore: true})
          console.log('数据已加载！！！...')
        }, 650)
  },
  // loading变化后处理
  loadingChange: function(){
    this.setData({
      hidden: true
    })
  },
  //Tap事件，初始页面调整处理（seedetails）
  seedetails: function(e) {
    wx.setStorageSync('articles', this.data.articles)
    wx.navigateTo({
      url: '../details/details?id='+e.currentTarget.id
    })
  },
  // 下拉刷新处理
  onPullDownRefresh: function() {
    var that = this
    that.setData({hidden: false})
    setTimeout(function () {
          that.loadData(0)
          that.setData({hidden: true})
          console.log('数据已加载...')
          wx.stopPullDownRefresh()
        }, 650)
  },
  // 应用启动时加载数据
  onLoad: function () {
    var that = this
    that.loadData(0)
  }
})
