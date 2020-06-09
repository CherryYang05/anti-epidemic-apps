// pages/company/showcar/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current_scroll: '2',
    current_page:1,
    total_page:1,
    carData:[
      {"num":"01","time":"2020-06-03 18:14:54","carnum":"京999888"},
      {"num":"01","time":"2020-06-03 18:14:54","carnum":"京999888"},
    ],
    topstatus:false
  },
    // 获取滚动条当前位置
    onPageScroll: function (e) {
      console.log(e)
      if (e.scrollTop > 100) {
        this.setData({
          topstatus: true
        });
      } else {
        this.setData({
          topstatus: false
        });
      }
    },
  
    //回到顶部
    gotop: function (e) {  // 一键回到顶部
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
    },
  
  handleChangeScroll ({ detail }) {
    this.setData({
        current_scroll: detail.key
    });
},
goout(){
  var unit_id=this.data.unit_id
  wx.downloadFile({
    url: 'https://blog.csxjh.vip:8004/unit/log/export/car/'+unit_id,
    header: {
      token:wx.getStorageSync('token')
    },
    success: function(res) {
        var filePath = res.tempFilePath;
        console.log(filePath);
        wx.openDocument({
            filePath: filePath,
            success: function(res) {
                console.log('打开文档成功')
            },
            fail: function(res) {
                console.log(res);
            },
            complete: function(res) {
                console.log(res);
            }
        })
    },
    fail: function(res) {
        console.log('文件下载失败');
    },
    complete: function(res) {},
})

},
goleft(){
var current_page=this.data.current_page;
if(current_page>1){
  current_page--;
  this.setData({
    current_page
  })
  this.getpage()
}else{
  wx.showToast({
    title: '已经是第一页',
    icon: 'none',
    duration: 2000
  })
}
},
goright(){
  var current_page=this.data.current_page;
  var total_page=this.data.total_page;
  if(current_page<total_page){
    current_page++;
    this.setData({
      current_page
    })
    this.getpage()
  }else{
    wx.showToast({
      title: '已经是最后一页',
      icon: 'none',
      duration: 2000
    })
  }
},
goinput(e){
  console.log(e.detail.value)
  if(e.detail.value>1&&e.detail.value<=this.data.total_page)
  {
    this.setData({
      current_page:e.detail.value
    })
    this.getpage()
  }else{
    wx.showToast({
      title: '输入非法',
      icon:'none'
    })
  }
 
},
getpage(){
  var unit_id=this.data.unit_id;
  var current=this.data.current_page;
  
  wx.request({
    url: 'https://blog.csxjh.vip:8004/unit/log/car?unit_id='+unit_id+'&page='+current+'&size=30 ',
    header:{
      token:wx.getStorageSync('token')
    },
    success(res){
      console.log(res)
      if(res.data.code==0){
        //信息分类
        that.setData({
          total_page:res.data.data.pages,
          exData:res.data.data.ex,
          inData:res.data.data.in
        })
      }else{
        wx.showToast({
          title: res.data.message,
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
    })
   
  },
getcar(){
  var that=this;
  var unit_id=this.data.unit_id;
  wx.request({
    url: 'https://blog.csxjh.vip:8004/unit/log/car?unit_id='+unit_id+'&page=1&size=30',
    header:{
      token:wx.getStorageSync('token')
    },
    success(res){
      console.log(res)
      if(res.data.code==0){
        //信息分类
        that.setData({
          total_page:res.data.data.pages,
          exData:res.data.data.ex,
          inData:res.data.data.in
        })
      }else{
        wx.showToast({
          title: res.data.message,
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