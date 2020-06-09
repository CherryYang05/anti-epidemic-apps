// pages/campaign/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenscore:true,
    info:['D','D','D','D'],
    score:0,
    text:'新型冠状病毒是指以前从未发现的冠状病毒新毒株。世界卫生组织在2020年2月11日宣布，将新型冠状病毒命名为“COVID-19”。'+
    '很多野生动物都可能携带病原体，成为某些传染病的传播媒介。果子狸、竹鼠、蝙蝠、獾是冠状病毒常见的宿主。不要吃未经检疫的野生动物、生鲜等食品，比如路边摊售卖的肉食，不要为了“尝鲜”而冒险。'+'用过的口罩，不要直接放入包里或兜里，以免造成持续污染。正确的做法是：将口罩由内向外折叠后，装进塑料垃圾袋或保鲜袋密封。'+'发现身体有不适应立即前往医院就诊。'
  },
  formSubmit(e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var info =this.data.info;
    var that=this;
    wx.request({
      url:'https://blog.csxjh.vip:8004/activity/countGrade',
      method:'POST',
      data:{
        options:info
      },
      success(res){
        console.log(res)
        if(res.data.code==0){
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            score:res.data.data,
            hiddenscore:false
          })
        }else{
          wx.showToast({
            icon:'none',
            title:'错误error'
          })
        }
      }
    })
  },
  setchange(e){
    console.log(e)
    var value= e.detail.value;
    var info =this.data.info;
    if(e.currentTarget.id=='1'){
      info[0]=value;
    }
    else  if(e.currentTarget.id=='2'){
      info[1]=value;
    }
    else  if(e.currentTarget.id=='3'){
      info[2]=value;
    }
    else  if(e.currentTarget.id=='4'){
      info[3]=value;
    }
    this.setData({
      info
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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