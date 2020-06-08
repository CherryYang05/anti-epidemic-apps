// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newscontent_list:[],
    news_list: [],
    newsid: '',
    page:1
  },

  //跳转页面，点击并传值newsid
  gotonewspage: function(res) {
    wx.navigateTo({
      url: '/pages/news/onepagenews/onepagenews?newsid=' + res.currentTarget.dataset.newsid,
    })
    console.log("newsid=" + res.currentTarget.dataset.newsid)
    var that = this
    // that.setData({
    //   newsid: res.currentTarget.dataset.newsid
    // })
    // wx.setStorageSync('newsid', res.currentTarget.dataset.newsid)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取news brief 列表
    var that = this
    wx.request({
      url: 'https://blog.csxjh.vip:8004/news/getNewsBrief',
      method: 'GET',
      data:{
        'page': 1,
        'size': 10
      },
      success(res) {
        that.setData({
          news_list: res.data.data.data,
          page:1
        })
        console.log(that.data.news_list)
      }
    })
    // //请求新闻列表获取首张图
    // wx.request({
    //   url: 'https://blog.csxjh.vip:8004/news/getNewsContent',
    //   method: 'GET',
    //   data: {
    //     'page': 1,
    //     'size': 100
    //   },
    //   success(res) {
    //     that.setData({
    //       newscontent_list: res.data.data.data
    //     })
    //     console.log(that.data.newscontent_list)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading();
    wx.showToast({
      icon:'loading',
      title: '刷新中~',
    })
    this.onLoad();
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
  //获取下一页news brief 列表
  var that = this
  that.setData({
    page:that.data.page + 1
  })
  wx.request({
    url: 'https://blog.csxjh.vip:8004/news/getNewsBrief',
    method: 'GET',
    data:{
      'page': that.data.page,
      'size': 10
    },
    success(res) {
      if(newslist==null){
        wx.showToast({
          title: '已经是最后一页了喔',
        })
      }
      else{
        wx.showToast({
          title: '下一页新闻加载中',
        })
        var newslist = that.data.news_list
        newslist = newslist.concat(res.data.data.data)
        that.setData({
          news_list: newslist,
        })
        console.log(that.data.news_list)
      }
    }
  })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})