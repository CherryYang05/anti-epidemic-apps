// pages/company/show/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unit_id:null,
    current_scroll: '1',
    carinfo:null,
    faceinfo: [
      // {
      //     id: 1,
      //     name: '测试员A',
      //     face_url: '/assets/logo.png'
      // },
      // {
      //     id: 2,
      //     name: '测试员B',
      //     face_url: '/assets/logo.png'
      // }
  ]
  },
  handleChangeScroll ({ detail }) {
    this.setData({
        current_scroll: detail.key
    });
},
deleteit(){
  wx.showToast({
    title: '该成员离开单位时记录自动删除或者重新上传可以替换旧记录',
    icon:'none',
    duration:3000
  })
},
getcar(){
  var that =this;
  var unit_id=this.data.unit_id;
    wx.request({
      url: 'https://blog.csxjh.vip:8004/unit/db/license/'+unit_id,
      header:{
        token:wx.getStorageSync('token')
      },
      success(res){
        console.log(res)
        if(res.data.code==0){
          //信息分类
          that.setData({
            carinfo:res.data.data
          })
        }else{
          wx.showToast({
            title: '获取车辆库失败',
            icon:'none'
          })
        }
      }
    })
},
getface(){
  var that =this;
  var unit_id=this.data.unit_id;
    wx.request({
      url: 'https://blog.csxjh.vip:8004/unit/db/face/'+unit_id,
      header:{
        token:wx.getStorageSync('token')
      },
      success(res){
        console.log(res)
        if(res.data.code==0){
          //信息分类
          that.setData({
            faceinfo:res.data.data
          })
        }else{
          wx.showToast({
            title: '获取人脸库失败',
            icon:'none'
          })
        }
      }
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    const eventChannel = this.getOpenerEventChannel();
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('unionid', function(data) {
      console.log(data)
      var data=data.data;
      that.setData({
        unit_id:data
      })
      that.getcar();
      that.getface();
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