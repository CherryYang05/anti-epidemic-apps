// pages/shop/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'tab1',
    search_list:[],
    search_list_up:[],
    search_listdown:[],
    producthidden:true,
    clickid:'',
    page:1,
    result:[
      {price:1,name:'中国银行'},
      {price:3,name:'北京银行'},
      {price:2,name:'河北银行'},
      {price:10,name:'保定银行'},
      {price:7,name:'涞水银行'}
    ]
  },
  handleChange ({ detail }) {
    this.setData({
        current: detail.key
    });
    if(detail.key=='tab2'){
      this.setData({
        search_listdown:this.data.search_list.sort(this.sortpricedown)
      })
    }
    if(detail.key=='tab3'){
      this.setData({
        search_list_up:this.data.search_list.sort(this.sortpriceup)
      })
    }
  },
      
 //获取商品降序升序列表排序
 sortpriceup:function(a,b){
   return a.price - b.price
 },
 sortpricedown:function(a,b){
  return b.price - a.price
},
//  compare : function (property,desc) {
//   return function (a, b) {
//     var value1 = a[property];
//     var value2 = b[property];
//     if(desc==true){
//       if(value1==value2){
//         return value2 + value1
//       }
//       // 升序排列
//       return value1 - value2;
//     }else{
//     // 降序排列
//       return value2 - value1;
//     }
//   }
// },


///////////单个页面modal
  //前往单个商品界面
  gotoproduct:function(e){
    var that =this
    console.log(e.currentTarget.dataset.id)
    that.setData({
      clickid:e.currentTarget.dataset.id,
      word:e.currentTarget.dataset.word
    })
    var that = this
    wx.setClipboardData({
      data: that.data.word,
      success(res){
        wx.showToast({
          title: '口令复制成功',
          duration:2000,
          icon:'success'
        })
      }
    })
  },
  //返回按键
  cancel:function(){
    var that = this
    that.setData({
      clickid:'',
      producthidden:!that.data.producthidden
    })
  },
  //复制按钮
  copy:function(){
    var that = this
    wx.setClipboardData({
      data: that.data.word,
      success(res){
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var searchkey = wx.getStorageSync('searchkey')
    var that=this
    wx.request({
      url: 'https://blog.csxjh.vip:8004/product/search',
      method:'GET',
      data:{
        'page':1,
        'size':10,
        'query':searchkey
      },
      success(res){
        console.log(res.data.data)
        var list=res.data.data;
        if(list.length==0){
          wx.showToast({
            title: '没有类似商品',
            duration:2000,
            icon:'none'
          })
        }else{
          that.setData({
            search_list:list,
            page:1
          })
          // var listup = list.sort(that.sortpriceup)
          // var listdown = new Array()
          // listdown = listup.reverse()
          // console.log(listdown)
          // that.setData({
          //   search_list:list,
          //   search_list_up:listup,
          //   search_listdown:listdown
          // })
          // console.log(list)  
          
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
  onReachBottom: function () {
    var that=this
    that.setData({
      page:that.data.page + 1
    })
    wx.request({
      url: 'https://blog.csxjh.vip:8004/product/search',
      method:'GET',
      data:{
        'page':that.data.page,
        'size':10,
        'query':searchkey
      },
      success(res){
        console.log(res.data.data)
        var list = that.data.search_list;
        list = list.concat(res.data.data)
        that.setData({
          search_list:list
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})