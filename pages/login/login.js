// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onGotUserInfo: function (e) {
    //console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    //console.log(e.detail.rawData)
    var userinfo =e.detail.userInfo;
    wx.setStorageSync('userinfo', userinfo);
    var name=userinfo.nickName;
    var avatar_url=userinfo.avatarUrl;
      wx.login({
        success (res) {
          if (res.code) {
            //发起网络请求
            // wx.request({
            //   url: 'https://test.com/onLogin',
            //   data: {
            //     code: res.code
            //   }
            // })
            console.log(res.code)
            var code = res.code;
            wx.request({
              url: 'https://blog.csxjh.vip:8004/user/wxLogin',
              method:'POST',
              data:{
                code
              },
              success(res){
                console.log(res)
                if(res.data.code=='0'&&res.data.data.is_register==false){
                  var wx_id=res.data.data.wx_id;
                  wx.request({
                    url: 'https://blog.csxjh.vip:8004/user/register',
                    method:'POST',
                    data:{
                      wx_id,
                      name,
                      avatar_url
                    },
                    success(res){
                      console.log(res)
                      wx.setStorageSync('token', res.data.data.token);
                      wx.setStorageSync('flag', "1")
                      wx.switchTab({
                        url: '../mine/mine',
                      })
                    }
                  })
                }
                else if(res.data.code=='0'&&res.data.data.is_register==true){
                  wx.setStorageSync('token', res.data.data.token);
                  wx.setStorageSync('id', res.data.data.wx_id);
                  wx.setStorageSync('flag', "1")
                      wx.switchTab({
                        url: '../home/home',
                      })
                }
              }
            })
            
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(wx.getStorageSync('flag')=="1"){
      wx.switchTab({
        url: '../home/home',
      })
    }
     
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})