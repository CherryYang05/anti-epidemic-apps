// pages/mine/mine.js
const { $Message } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{
      name:null,
      avatar_url:'/assets/mine/avatar.png',
      language: "cn",
      phone:""
    },
    notice:'',
  },
  handletoast () {
    var toast='点击昵称和手机号试试看吧';
    wx.showToast({
      title: toast,
      mask:true,
      icon:'none'
    })
},
  changename(e){
    console.log(e)
      var name=e.detail.value;
      var token = wx.getStorageSync('token')
      var that = this;
      var userinfo=this.data.userinfo;
      userinfo.name=name;
      wx.request({
        url: 'https://blog.csxjh.vip:8004/user/updateInfo',
        method:'POST',
        header:{
          'Content-Type': 'application/json',
          token
          },
        data:{
          name
        },
        success(res){
          console.log(res)
          if(res.data.code==0){
            wx.showToast({
              title: '更新成功',
            })
            that.setData({
              userinfo
            })
          }
        },
      })
    
  },
  changephone(e){
    console.log(e)
      var phone=e.detail.value;
      var token = wx.getStorageSync('token')
      var that = this;
      var userinfo=this.data.userinfo;
      userinfo.phone=phone;
      wx.request({
        url: 'https://blog.csxjh.vip:8004/user/updateInfo',
        method:'POST',
        header:{
          'Content-Type': 'application/json',
          token
          },
        data:{
          phone
        },
        success(res){
          console.log(res)
          if(res.data.code==0){
            wx.showToast({
              title: '更新成功',
            })
            that.setData({
              userinfo
            })
          }
        },
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token =wx.getStorageSync('token')
    var that=this;
    wx.request({
      url: 'https://blog.csxjh.vip:8004/user/getInfoByToken',
      header:{
        token
      },
      success(res){
        if(!res.data.code){
          if(res.data.data.phone==''){
            res.data.data.phone='点击填写手机号码'
          }
          that.setData({
            userinfo:res.data.data
          })
          wx.setStorageSync('userinfo', res.data.data);
        }
        console.log(res.data.data)
      }
    })
    
   
    var that = this

    /**还不可用 **/
    //获取单位公告
    // wx.request({
    //   url: 'https://blog.csxjh.vip:8004/unit/notice/{unit_id}',
    //   method:'GET',
    //   header:{
    //     'Content-Type': 'application/json',
    //     token
    //   },
    //   success(res){
    //     console.log(res)
    //     that.setData({
    //       notice:res.data.content
    //     })
    //   }
    // })
  },
  /******** 修改昵称部分 *********/
  //点击昵称处
  clickname:function(){
    this.setData({
      showModala:true
    })
  },


  /******** 修改手机部分 *********/
  //点击邦定手机处
  clickphone:function(){
    this.setData({
      showModalb:true
    })
  },
  // //保存按钮
  // savephone:function(){
  //   var token = wx.getStorageSync('token')
  //   var that = this;
  //   var phone=that.data.userinfo.phone
  //   if(!(/^1[3456789]\d{9}$/.test(phone))){ 
  //     wx.showToast({
  //       title: '手机号码有误，请重填',
  //       icon: 'none',
  //       duration: 2000
  //     })
      
  // } else {
  //   wx.request({
  //     url: 'https://blog.csxjh.vip:8004/user/updateInfo',
  //     method:'POST',
  //     header:{
  //       'Content-Type': 'application/json',
  //       token
  //       },
  //     data:{
  //       phone
  //     },
  //     success(res){
  //       console.log(res)
  //       wx.showToast({
  //         title: res.data.data,
  //       })
  //       that.setData({
  //         phonechangehidden:true
  //       })
  //     },
  //   })
  // }
  // },
  //上传头像部分
  uploaduserpic:function(){
    //取token
    var token =wx.getStorageSync('token')
    var that =this;
    wx.chooseImage({
      count:1,
      sizeType:['compressed'],
      sourceType:["album"],
      success(res){
        const tempimagepath = res.tempFilePaths;
        console.log(tempimagepath)
        that.setData({
          avatar_url:tempimagepath
        })
        wx.uploadFile({
          url:'https://blog.csxjh.vip:8004/user/upload',
          filePath: tempimagepath[0],
          name: 'img',
          method:'POST',
          header:{
            'Content-Type': 'application/json',
            token
          },
          formData: {
            'type': 'avatar'
          },
          complete(res){
            console.log(res)
            var res=JSON.parse(res.data);
            var userinfo=this.data.userinfo;
            userinfo.avatar_url=res.data;
            if(res.code==0){
              wx.showToast({
                title: '更新成功',
              })
              that.setData({
                userinfo
              })
            }
          }
          
        })
        // wx.request({
        //   url: 'https://blog.csxjh.vip:8004/user/updateInfo',
        //   method:'POST',
        //   header:{
        //     'Content-Type': 'application/json',
        //     token
        //     },
        //   data:{
        //     'avatar_url':tempimagepath
        //   }
        // })
      },
      complete: (res) => {

      },
    })
  },
  exitlogin:function(){
    wx.clearStorage({
      complete: (res) => {
        wx.redirectTo({
          url: '/pages/login/login',
        })
      },
    })
  },
  showcontact:function(){
    wx.navigateTo({
      url: '/pages/mine/contact/contact',
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