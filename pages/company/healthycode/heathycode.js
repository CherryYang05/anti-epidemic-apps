// pages/company/healthycode/heathycode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:null,
  },


  /**
   * 更改健康码按钮
   */
  change_code: function(e) {
    var token = wx.getStorageSync('token');
    var that=this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(res)
        wx.uploadFile({
          url: 'https://blog.csxjh.vip:8004/user/upload', //后端接口
          filePath: tempFilePaths[0],
          name: 'img',
          header: {
            token
          },
          formData: {
            'type': 'health_code'
          },
          success(res) {
            console.log(res)
            if (res.statusCode != 200) {
              wx.showModal({
                title: '提示', 
                content: '图片上传失败', 
                showCancel: false
              });
              return;
            } else {
             that.onLoad()
              console.log(res);
            }
            var url = JSON.parse(res.data).data;
            console.log(url);
            },
          fail(e) {
                wx.showModal({
                title: '提示', 
                content: '图片上传失败', 
                showCancel: false
                });
           },
              complete(res) {
                wx.hideToast(); //隐藏Toast
                //console.log(res)
              }
            })
        }
      })
    },

  /**
   * 快速登记按钮
   */
  register: function(e) {
    var token = wx.getStorageSync('token');
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [ 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(res)
        wx.uploadFile({
          url: 'https://blog.csxjh.vip:8004/user/upload', //后端接口
          filePath: tempFilePaths[0],
          name: 'img',
          header: {
            token
          },
          formData: {
            'type': 'face_identity'
          },
          success(res) {
            console.log(res)
            if (res.statusCode != 200) {
              wx.showModal({
                title: '提示', 
                content: '人脸上传失败', 
                showCancel: false
              });
              return;
            } else {
              console.log('人脸上传成功！');
              console.log(res);
            }
            var url = JSON.parse(res.data).data;
            console.log(url);
            },
          fail(e) {
                wx.showModal({
                title: '提示', 
                content: '人脸上传失败', 
                showCancel: false
                });
           },
              complete(res) {
                wx.hideToast(); //隐藏Toast
                //console.log(res)
              }
            })
        }
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    wx.request({
      url: 'https://blog.csxjh.vip:8004/user/healthyCode',
      header:{
        token:wx.getStorageSync('token')
      },
      success(res){
        console.log(res)
        if(res.data.code==0){
          that.setData({
            img:res.data.data
          })
        }
        else{
          wx.showToast({
            title: '获取失败',
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