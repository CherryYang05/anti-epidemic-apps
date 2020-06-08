// pages/company/joincompany/joincompany.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    remarks: ''
  },

  /**
   * 获取单位ID输入框内容
   */
  input_id: function(e) {
    var id = e.detail.value
    this.setData({
      id: id
    })
  },

  /**
   * 获取备注输入框内容
   */
  input_remarks: function(e) {
    var remarks = e.detail.value
    this.setData({
      remarks: remarks
    })
  },

  /**
   * 申请按钮
   */
  register: function(e) {
    if (this.data.id == '' || this.data.remarks == '') {
      wx.showToast({
        title: '请填写完整相关信息',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.request({
      url: 'https://blog.csxjh.vip:8004/unit/setApplication',
      method: 'POST',
      data: {
        unit_id: this.data.id,
        remarks: this.data.remarks,
      },
      header: {
        token: wx.getStorageSync('token')
      },
      success(res) {
        console.log(res)
        if (res.data.code == '0') {
          wx.showToast({
            title: '申请成功！',
            icon: 'none',
            duration: 1500,
            mask: true,
            success: () => {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 2000)
            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
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