// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Carousel_list: [],
    currentTab:0,
    producticon_list:[],
    sort_list:[],
    product1_list:[],
    page1:1,
    product2_list:[],
    page2:1,
    product3_list:[],
    page3:1,
    product4_list:[],
    page4:1,
    product5_list:[],
    page5:1,
    searchkey:'',
    producthidden:true,
    clickid:''
  },
  
  //tab部分
  clicktab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }, 

///////////单个页面modal
  //前往单个商品界面
  gotoproduct:function(e){
    var that =this
    console.log(e.currentTarget.dataset.id)
    that.setData({
      clickid:e.currentTarget.dataset.id,
      word:e.currentTarget.dataset.word
    })
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
  // //返回按键
  // cancel:function(){
  //   var that = this
  //   that.setData({
  //     clickid:'',
  //     producthidden:!that.data.producthidden
  //   })
  // },
  // //复制按钮
  // copy:function(){
  //   var that = this
  //   wx.setClipboardData({
  //     data: that.data.word,
  //     success(res){
  //       wx.showToast({
  //         title: '复制成功',
  //       })
  //     }
  //   })
  // },


  //绑定的input confirm事件，跳转至搜索页面
  search:function(e){
    if(e.detail.value==''){
      this.setData({
        searchkey:'口罩'
      })
    }else{
      this.setData({
        searchkey:e.detail.value
      })
    }
    
    // console.log(this.data.searchkey=='')
    wx.setStorageSync('searchkey', this.data.searchkey)
    wx.navigateTo({
      url: '/pages/shop/search/search',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this

  //请求获取轮播图
  wx.request({
    url: 'https://blog.csxjh.vip:8004/product/listCarousel',
    method:'GET',
    success(res){
      that.setData({
        Carousel_list:res.data.data
      })
      console.log(that.data.Carousel_list)
    }
  }),

  //请求获取商品icon
  wx.request({
    url: 'https://blog.csxjh.vip:8004/product/listIcon',
    method:'GET',
    success(res){
      that.setData({
        producticon_list:res.data.data
      })
      console.log(that.data.producticon_list)
    }
  }),

  //请求商品分类
  wx.request({
    url: 'https://blog.csxjh.vip:8004/category/list',
    method:'GET',
    success(res){
      that.setData({
        sort_list:res.data.data
      })
      console.log(that.data.sort_list)
    }
  })
  
  //请求根据分类1商品列表
  wx.request({
    url: 'https://blog.csxjh.vip:8004/product/listByCategoryId',
    method:'GET',
    data:{
      'category_id':'1',
      'page':1,
      'size':10
    },
    success(res){
      var productlist = res.data.data
      that.setData({
        product1_list:productlist,
        page1:1
      })
      console.log(that.data.product1_list)
    },
  }),

  //请求根据分类2商品列表
  wx.request({
    url: 'https://blog.csxjh.vip:8004/product/listByCategoryId',
    method:'GET',
    data:{
      'category_id':'2',
      'page':1,
      'size':10
    },
    success(res){
      var productlist = res.data.data
      that.setData({
        product2_list:productlist,
        page2:1
      })
      console.log(that.data.product2_list)
    },
  }),

  //请求根据分类3商品列表
  wx.request({
    url: 'https://blog.csxjh.vip:8004/product/listByCategoryId',
    method:'GET',
    data:{
      'category_id':'3',
      'page':1,
      'size':10
    },
    success(res){
      var productlist = res.data.data
      that.setData({
        product3_list:productlist,
        page3:1
      })
      console.log(that.data.product3_list)
    },
  }),

  //请求根据分类4商品列表
  wx.request({
    url: 'https://blog.csxjh.vip:8004/product/listByCategoryId',
    method:'GET',
    data:{
      'category_id':'4',
      'page':1,
      'size':10
    },
    success(res){
      var productlist = res.data.data
      that.setData({
        product4_list:productlist,
        page4:1
      })
      console.log(that.data.product4_list)
    },
  }),

  //请求根据分类5商品列表
  wx.request({
    url: 'https://blog.csxjh.vip:8004/product/listByCategoryId',
    method:'GET',
    data:{
      'category_id':'5',
      'page':that.data.page5,
      'size':10
    },
    success(res){
      var productlist = res.data.data
      that.setData({
        product5_list:productlist,
        page5:1
      })
      console.log(that.data.product5_list)
    },
  })
  
  },

  //请求根据分类商品列表
  

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
    });
    this.onLoad();
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  var that = this;
    //请求根据分类1商品列表
    if(that.data.currentTab==0){
      that.setData({
        page1:that.data.page1 + 1
      })
      wx.request({
        url: 'https://blog.csxjh.vip:8004/product/listByCategoryId',
        method:'GET',
        data:{
          'category_id':'1',
          'page':that.data.page1,
          'size':10
        },
        success(res){
          var productlist = that.data.product1_list
          productlist = productlist.concat(res.data.data)
          that.setData({
            product1_list:productlist,
          })
          console.log(that.data.product1_list)
        },
      })
    }

  //请求根据分类2商品列表
  if(that.data.currentTab==1){
    that.setData({
      page2:that.data.page2 + 1
    })
    wx.request({
      url: 'https://blog.csxjh.vip:8004/product/listByCategoryId',
      method:'GET',
      data:{
        'category_id':'2',
        'page':that.data.page2,
        'size':10
      },
      success(res){
        var productlist = that.data.product2_list
        productlist = productlist.concat(res.data.data)
        that.setData({
          product2_list:productlist
        })
        console.log(that.data.product2_list)
      },
    })
  }
  
  //请求根据分类3商品列表
  if(that.data.currentTab==2){
    that.setData({
      page3:that.data.page3 + 1
    })
    wx.request({
      url: 'https://blog.csxjh.vip:8004/product/listByCategoryId',
      method:'GET',
      data:{
        'category_id':'3',
        'page':that.data.page3,
        'size':10
      },
      success(res){
        var productlist = that.data.product3_list
        productlist = productlist.concat(res.data.data)
        that.setData({
          product3_list:productlist
        })
        console.log(that.data.product3_list)
      },
    })
  }

  //请求根据分类4商品列表
  if(that.data.currentTab==3){
    that.setData({
      page4:that.data.page4 + 1
    })
    wx.request({
      url: 'https://blog.csxjh.vip:8004/product/listByCategoryId',
      method:'GET',
      data:{
        'category_id':'4',
        'page':that.data.page4,
        'size':10
      },
      success(res){
        var productlist = that.data.product4_list
        productlist = productlist.concat(res.data.data)
        that.setData({
          product4_list:productlist
        })
        console.log(that.data.product4_list)
      },
    })
  }

  //请求根据分类5商品列表
  if(that.data.currentTab==4){
    that.setData({
      page5:that.data.page5 + 1
    })
    wx.request({
      url: 'https://blog.csxjh.vip:8004/product/listByCategoryId',
      method:'GET',
      data:{
        'category_id':'5',
        'page':that.data.page5,
        'size':10
      },
      success(res){
        var productlist = that.data.product5_list
        productlist = productlist.concat(res.data.data)
        that.setData({
          product5_list:productlist
        })
        console.log(that.data.product5_list)
      },
    })
  }
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})