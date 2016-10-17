//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    articles:[],
    morearticles:[],
    hidden:true,
    moredata:true,
    url1:'url1',
    url2:'url2'
  },
  // 数据加载通用函数
  loadData: function(json_url,moredata){
      var that = this
      wx.request({
      url: json_url,
      data: {},
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        if(moredata){
          that.setData({
              morearticles: res.data.rows
            })
        }
        else{
          that.setData({
              articles: res.data.rows
            })
        }
      }
    })
  },
  // 应用首次进入加载
  firstLoad: function(){
    var that = this
    var json_url = that.data.url1
    that.loadData(json_url)
  },
  // 到页面底部，加载更多数据
  loadMore: function(){
    var that = this
    var json_url = that.data.url2

    that.setData({hidden: false})

    setTimeout(function () {
          that.loadData(json_url,true)
          that.setData({hidden: true})
          console.log('数据加载执行完毕！')
          that.setData({loadmore: false})
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
      url: '../details/details?id='+e.currentTarget.id+'&pagemore=no'
    })
  },
    //Tap事件，更多数据页面调整处理（seedetailsmore）
  seedetailsmore: function(e) {
    wx.setStorageSync('articles_more', this.data.morearticles)
    wx.navigateTo({
      url: '../details/details?id='+e.currentTarget.id+'&pagemore=yes'
    })
  },
  // 下拉刷新处理
  onPullDownRefresh: function() {
    var that = this
    that.setData({hidden: false})
    setTimeout(function () {
          that.firstLoad()
          that.setData({hidden: true})
          console.log('数据加载执行完毕！')
          wx.stopPullDownRefresh()
        }, 650)
  },
  // 应用启动时加载数据
  onLoad: function () {
    this.firstLoad()
  }
})
