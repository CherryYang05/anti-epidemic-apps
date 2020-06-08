// pages/news/onepagenews/onepagenews.js
const plugin = requirePlugin('WechatSI');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: {
      id: 1,
      title: "",
      img: [],
      content: "",
      date: '',
    },
    src: '',
    newsid: '',
    audio: '语音播报',
    audioflag: 0 //不播放
  },

  // 文字转语音  
  wordYun: function(e) {
    var that = this;
    var newsid = that.data.newsid
    //console.log("newsid=" + newsid)
    var content = this.data.news.content;
    console.log(content)
    if (this.data.audioflag) {
      this.end();
      this.setData({
        audio: '语音播报',
        audioflag: 0
      })
    } else {
      plugin.textToSpeech({
        lang: "zh_CN",
        tts: true,
        content: content,
        success: function(res) {
          console.log(res);
          console.log("succ tts", res.filename);
          that.setData({
            src: res.filename,
            audio: '点击暂停',
            audioflag: 1
          })
          that.yuyinPlay();
        },
        fail: function(res) {
          console.log("fail tts", res)
        }
      })
    }
  },

  //播放语音  
  yuyinPlay: function(e) {
    if (this.data.src == '') {
      console.log(暂无语音);
      return;
    }
    this.innerAudioContext.src = this.data.src //设置音频地址    
    this.innerAudioContext.play(); //播放音频  
  },

  // 结束语音
  end: function(e) {
    this.innerAudioContext.pause(); //暂停音频
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //var newsid = wx.getStorageSync('newsid')
    let that = this;
    var newsid = options.newsid;
    console.log(options.newsid)
    this.setData({
      newsid: newsid
    })
    console.log("newsid=" + newsid)
    wx.request({
      url: 'https://blog.csxjh.vip:8004/news/getNewsById/' + newsid,
      method: 'GET',
      success(res) {
        that.setData({
          news: res.data.data
        })
        console.log(that.data.news)
      }
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //创建内部 audio 上下文 InnerAudioContext 对象。    
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError(function(res) {
      console.log(res);
      wx.showToast({
        title: '语音播放失败',
        icon: 'none',
      })
    })

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
    this.onLoad()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})