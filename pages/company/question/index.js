// pages/news/onepagenews/onepagenews.js
const plugin = requirePlugin('WechatSI');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   question:{
    // id: 1,
    // name: "每天疫情收集表",
    // content: "名字 手机号 性别 家庭住址",
    // created_at: "2020-05-02 17:50:40"
},
   inputValue:'',
   
   memcontent:[
    // {
    //   name:'上官张三',
    //   time:'2020-05-02 17:50:40',
    //   id:1,
    //   phone:'13355898876',
    //   avatar_url:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIoV7zcdIUNNqe6TbDmH3DMPsfVulY9Oglj1kxeIqGFkwVQOVIthJ5zibFkQDNsRicE8nrAhHicMSwcA/132',
    //   content:[
    //     '姓名：上官张三',
    //     '手机号：13355898876',
    //     '性别：男',
    //     '今日温度：37.5°'
    //   ]
    // }
   ]
  },
  submitform(e){
    console.log(e.detail.value)
    var that=this;
    var content = JSON.stringify(e.detail.value);
    var unit_id=this.data.info.unit_id;
    var table_id=this.data.question.id;
    wx.request({
      url: 'https://blog.csxjh.vip:8004/unit/comment/create',
      method:'POST',
      header:{
        token:wx.getStorageSync('token')
      },
      data:{
        content,unit_id,table_id
      },
      success(res){
        console.log(res)
        if(res.data.code==0){
          that.getcomment();
          wx.showToast({
            title: '提交成功',
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
  formSubmit(e){
    var that=this;
    var e=e;
    wx.showModal({
      title: '提示',
      content: '内容提交后不可修改删除，确认无误点击确认即可提交',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.submitform(e)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  formReset(e){
    this.setData({
      chosen: ''
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  getcomment(){
    var that=this;
    var table_id=this.data.question.id;
    var unit_id=this.data.info.unit_id;
    wx.request({
      url: 'https://blog.csxjh.vip:8004/unit/table/info/'+unit_id+'/'+table_id,
      
      header:{
        token:wx.getStorageSync('token')
      },
      
      success(res){
        console.log(res)
        if(res.data.code==0){
          that.setData({
            memcontent:res.data.data
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
  onLoad: function(options) {
    var that=this;
    const eventChannel = this.getOpenerEventChannel();
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('info', function(data) {
      var data=data;
      console.log(data)
      var question= data.query;
      if(typeof(question.content)=='string'){
        question.content= question.content.split(' ');
      }
      console.log(question)
      that.setData({
        question,
        info:data.data
      })
      setTimeout(function(){ that.getcomment(); }, 1000);
      
    })
    
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
  this.onLoad()
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