// pages/company/mycompany/createcompany/createcompany.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    type: '',
    tip: ''
  },

  /**
   * 获取单位名称输入框内容
   */
  input_name: function(e) {
    var name = e.detail.value
    this.setData({
      name: name
    })
  },

  /**
   * 获取单位类型输入框内容
   */
  input_type: function(e) {
    var type = e.detail.value
    this.setData({
      type: type
    })
  },

  /**
   * 获取说明输入框内容
   */
  input_tip: function(e) {
    var tip = e.detail.value
    this.setData({
      tip: tip
    })
  },

  /**
   * 申请按钮
   */
  register: function(e) {
    if (this.data.name == '' || this.data.type== '' || this.data.tip == '') {
      wx.showToast({
        title: '请填写完整相关信息',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.request({
      url: 'https://blog.csxjh.vip:8004/unit/create',
      method: 'POST',
      data: {
        name: this.data.name,
        type: this.data.type,
        profile: this.data.tip
      },
      header: {
        token: wx.getStorageSync('token')
      },
      success(res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: '申请成功！',
            icon: 'none',
            duration: 1500,
            mask: true,
            success: () => {
              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/company/mycompany/mycompany',
                })
              },2000)
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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