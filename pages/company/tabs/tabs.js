Page({

  /**
   * 页面的初始数据
   */
  data: {

    current_scroll: '1',
    info:null,
    notice:[{content:'空空如也,快让管理员发一条吧~',created_at:'疫管家团队：'}],
    thisnotice:null,
    thisname:null,
    member:null,
    user_id:null,
    questionaire:[{name:'空空如也',created_at:'快让管理员发一条吧~'}],
    application:[{name:'上官张三',id:1,phone:'13355898876',avatar_url:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIoV7zcdIUNNqe6TbDmH3DMPsfVulY9Oglj1kxeIqGFkwVQOVIthJ5zibFkQDNsRicE8nrAhHicMSwcA/132'}],
    hideAdd:1,
    img_url:[],
    profile:null,
    writeitem:[{label: '输入收集表名称', name: 'name',length:100},{label: '输入表项名称，以逗号隔开', name: 'form',length:1000}],
    writehidden:false,
    searchmem:null,
},
write:function(){
  this.setData({
    writehidden:true
  })
},
search(e){
  console.log(e)
  var that=this;
  var token=wx.getStorageSync('token')
  var id=this.data.info.unit_id;
  var  query=e.detail.value;
  wx.request({
    url: 'https://blog.csxjh.vip:8004/unit/searchMember?unit_id='+id+'&query='+query,
    header:
    {token},
    success(res){
      console.log(res)
      if(res.data.code==0){
        that.setData({
          searchmem:res.data.data
        })
      }
      
    }
  })
},
onCompletewrite(e){
  console.log(e)
  if(e.detail.confirm==false){
      this.setData({
        writehidden:false
      })
  }else{
    
    var unit_id=this.data.info.unit_id;
    var name=e.detail.formData.name;
    var content=e.detail.formData.form;
    var token = wx.getStorageSync('token')
    var that = this;
    wx.request({
      url: 'https://blog.csxjh.vip:8004/unit/table/create',
      method:'POST',
      header:{
        'Content-Type': 'application/json',
        token
        },
      data:{
        unit_id,
        name,
        content
      },
      success(res){
        console.log(res)
        if(res.data.code==0){
          wx.showToast({
            title: '创建成功，该表ID为'+res.data.data,
          })
          that.setData({
            writehidde:false
        })
          that.getquestionaire();
        }
      },
    })
  }
},
chooseimage:function(){
  var that = this;
  wx.chooseImage({
    count: 9, // 默认9  
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
    success: function (res) {
      console.log(res.tempFilePaths.length)
      
      if (res.tempFilePaths.length>0){

        //把每次选择的图push进数组
        var img_url = that.data.img_url;
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          img_url.push(res.tempFilePaths[i])
          //图如果满了21张，不显示加图
          if (img_url.length >= 21){
            that.setData({
              hideAdd:0
            })
            break;
          }else{
            that.setData({
              hideAdd: 1
            })
            continue;
          }
        }

        that.setData({
          img_url: img_url
        })
        
      }
      
    }
  })  
},
showbigpic(e){
  console.log(e.currentTarget.id);
  var id=Number(e.currentTarget.id);
  var img=this.data.img_url;
  wx.previewImage({
    urls: img,// 需要预览的图片http链接列表
    current: img[id], // 当前显示图片的http链接
  })
},
deletepic(e){
  console.log(e.currentTarget.id);
  var id=Number(e.currentTarget.id);
  var img=this.data.img_url;
  img.splice(id,1);
  this.setData({
    img_url:img
  })
},
//发布按钮事件
send:function(){
  var that = this;
  var user_id = wx.getStorageSync('userid')
  wx.showLoading({
    title: '上传中',
  })
  that.img_upload()
},
//图片上传
img_upload: function () {
  let that = this;
  let img_url = that.data.img_url;
  let img_url_ok = [];
  var token =wx.getStorageSync('token')
  wx.showLoading({
    title: '加载中',
  })
  //由于图片只能一张一张地上传，所以用循环
  for (let i = img_url.length-1; i >=0; i--) {
    wx.uploadFile({
      url: 'https://blog.csxjh.vip:8004/user/upload',
      filePath: img_url[i],
      name: 'img',
      header:{
        token
      },
      formData: {
        type:'license_identity'
      },
      success: function (res) {
        console.log('上传成功');
        //把上传成功的图片的地址放入数组中
        // img_url_ok.push(res.data)
        img_url.pop();
        
      },
      fail: function (res) {
        console.log('上传失败')
      }
    })
    wx.hideLoading({
      complete: (res) => {

      },
    })
  }
},
handleChangeScroll ({ detail }) {
    this.setData({
        current_scroll: detail.key
    });
},
setadmin(){
  var token=wx.getStorageSync('token');
  var that=this;
  var info=this.data.info;
  var user_id=this.data.user_id;
  wx.request({
    url: 'https://blog.csxjh.vip:8004/unit/createAdmin',
    method:'POST',
    header:{
      token
    },
    data:{
      unit_id:info.unit_id,
      user_id
    },
    success(res){
      console.log(res);
      if(res.data.code==0){
        wx.showToast({
          title: '设置成功',
        })
        that.getmember();
      }else{
        wx.showToast({
          title: '该用户不在本单位',
          icon:'none'
        })
      }
    }
  })
},
deleteadmin(){
  var token=wx.getStorageSync('token');
  var that=this;
  var info=this.data.info;
  var user_id=this.data.user_id;
  wx.request({
    url: 'https://blog.csxjh.vip:8004/unit/delAdmin',
    method:'POST',
    header:{
      token
    },
    data:{
      unit_id:info.unit_id,
      user_id
    },
    success(res){
      console.log(res);
      if(res.data.code==0){
        wx.showToast({
          title: '设置成功',
        })
        that.getmember()
      }else{
        wx.showToast({
          title: '设置失败',
          icon:'none'
        })
      }
    }
  })
},
deletemem(e){
  console.log(e.currentTarget.id)
  var token=wx.getStorageSync('token');
  var that=this;
  var info=this.data.info;
  var user_id=e.currentTarget.id;
  wx.request({
    url: 'https://blog.csxjh.vip:8004/unit/kickMember',
    method:'POST',
    header:{
      token
    },
    data:{
      unit_id:info.unit_id,
      user_id
    },
    success(res){
      console.log(res);
      if(res.data.code==0){
        wx.showToast({
          title: '已移除该成员',
        })
        that.getmember();
      }else{
        wx.showToast({
          title: '移除失败，请检查访问权限',
          icon:'none'
        })
      }
    }
  })
},
allowmem(e){
  var token=wx.getStorageSync('token');
  var that=this;
  var info=this.data.info;
  var application_id=e.currentTarget.id;
  wx.request({
    url: 'https://blog.csxjh.vip:8004/unit/finishApplication',
    method:'POST',
    header:{
      token
    },
    data:{
      status:1,
      application_id
    },
    success(res){
      console.log(res);
      if(res.data.code==0){
        wx.showToast({
          title: '已同意该成员加入单位',
        })
        that.getmember();
      }else{
        wx.showToast({
          title: '操作失败',
          icon:'none'
        })
      }
    }
  })
},
cinuser_id(e){
  console.log(e.detail.value)
  this.setData({
    user_id:e.detail.value
  })
},
cinname(e){
  console.log(e.detail.value)
  this.setData({
    thisname:e.detail.value
  })
},
confirmname(){
  var token=wx.getStorageSync('token');
  var that=this;
  var id=this.data.info.unit_id;
  var name=this.data.thisname;
  wx.request({
    url: 'https://blog.csxjh.vip:8004/unit/update/'+id,
    method:'PUT',
    header:{
      token
    },
    data:{
      name
    },
    success(res){
      console.log(res);
      if(res.data.code==0){
        wx.showToast({
          title: '修改成功',
        })
        wx.setNavigationBarTitle({
          title: name
        })
      }else{
        wx.showToast({
          title: '修改失败',
          icon:'none'
        })
      }
    }
  })
},
cinnotice(e){
  console.log(e.detail.value)
  this.setData({
    thisnotice:e.detail.value
  })
},
confirmnotice(){
  var token=wx.getStorageSync('token');
  var that=this;
  var info=this.data.info;
  var content=this.data.thisnotice;
  wx.request({
    url: 'https://blog.csxjh.vip:8004/unit/publishNotice',
    method:'POST',
    header:{
      token
    },
    data:{
      unit_id:info.unit_id,
      content
    },
    success(res){
      console.log(res);
      if(res.data.code==0){
        wx.showToast({
          title: '发布成功',
        })
        that.getnotice();
      }else{
        wx.showToast({
          title: '发布失败',
          icon:'none'
        })
      }
    }
  })
},
getnotice(){
  var token = wx.getStorageSync('token');
  var id=this.data.info.unit_id;
  var that= this;
  wx.request({
    url: 'https://blog.csxjh.vip:8004/unit/notice/'+id,
    header:{
      token
    },
    success(res){
      console.log(res)
      if(res.data.code==0&&res.data.data!=null){
        that.setData({
          notice:res.data.data
        })
      }
    }
  })
},
getquestionaire(){
  var token = wx.getStorageSync('token');
  var id=this.data.info.unit_id;
  var that= this;
  wx.request({
    url: 'https://blog.csxjh.vip:8004/unit/table/list/'+id,
    header:{
      token
    },
    success(res){
      console.log(res)
      if(res.data.code==0&&res.data.data!=null){
        that.setData({
          questionaire:res.data.data
        })
      }
    }
  })
},
getmember(){
  var token = wx.getStorageSync('token');
  var id=this.data.info.unit_id;
  var that= this;
  wx.request({
    url: 'https://blog.csxjh.vip:8004/unit/member/'+id,
    header:{
      token
    },
    success(res){
      console.log(res)
      if(res.data.code==0){
        that.setData({
          member:res.data.data
        })
      }
    }
  })
},
getprofile(){
  var token = wx.getStorageSync('token');
  var id=this.data.info.unit_id;
  var that= this;
  wx.request({
    url: 'https://blog.csxjh.vip:8004/unit/info/'+id,
    header:{
      token
    },
    success(res){
      console.log(res)
      if(res.data.code==0){
        that.setData({
          profile:res.data.data
        })
      }
    }
  })
},
getapply(){
  var token = wx.getStorageSync('token');
  var id=this.data.info.unit_id;
  var that= this;
  wx.request({
    url: 'https://blog.csxjh.vip:8004/unit/getApplication/'+id,
    header:{
      token
    },
    success(res){
      console.log(res)
      if(res.data.code==0){
        that.setData({
          application:res.data.data
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
      var data=data.data;
      that.setData({
        info:data
      })
      wx.setNavigationBarTitle({
        title: that.data.info.name
      })
    })
    
    this.getnotice();
    this.getmember();
    this.getprofile();
    this.getquestionaire();
    // wx.request({
    //   url: 'https://blog.csxjh.vip:8004/unit/info/'+that.data.id,
    //   header:{
    //     token:wx.getStorageSync('token')
    //   },
    //   success(res){
    //     console.log(res)
    //     if(res.data.code==0){
    //       var info=res.data.data;
    //       that.setData({
    //         info
    //       })
    //       wx.setNavigationBarTitle({
    //         title: info.name
    //       })
    //     }else{
    //       wx.showToast({
    //         title: '获取失败',
    //         icon:'none'
    //       })
    //     }
    //   }
    // })
    
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
