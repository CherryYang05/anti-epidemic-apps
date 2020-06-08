// pages/company/mycompany/mycompany.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    company_list: [
      { title: 'A单位(200人)', label: '您是超级管理员',id:'11'},
      { title: 'B单位(50人)', label: '您是普通用户' ,id:'05'}
    ]
  },

  /**
   * 创建单位
   */
  create: function(e) {
    wx.navigateTo({
      url: '/pages/company/mycompany/createcompany/createcompany',
    })
  },
  enterunion(e){
   
    var id=e.currentTarget.dataset.i;
    console.log(e)
    wx.navigateTo({
      url: '/pages/company/tabs/tabs',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('unionid', { data:id })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'https://blog.csxjh.vip:8004/unit/getMyUnit',
      header:{
        token:wx.getStorageSync('token')
      },
      success(res){
        console.log(res)
        if(res.data.code==0){
          var company_list=res.data.data;
          that.setData({
            company_list
          })
        }else{
          wx.showToast({
            title: '获取信息失败',
            icon:'none'
          })
        }
      }
    })
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