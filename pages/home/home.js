import dataFormate from "../../js/data.js";
import {
  initChart
} from "../../js/chart.js";
import utils from "../../js/utils.js";
// import dailyData from '../../data/daily.js'
// import dataDaily from '../../data/data.js'
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputtip: '',
    ec: {},
    canvasDom: "",
    mapData: [],
    dailyTextContent: {},
    num: '',
    noticeText: "今日美国新感染肺炎重症患者5万例，超过其他国家总和的三倍！！！",
    //轮播图数据
    banner_list: [{
        index: 0,
        src: "/assets/banner_test/001.png",
        id: 1,
        url: "/pages/news/onepagenews/onepagenews?newsid=1"
      },
      {
        index: 1,
        src: "/assets/banner_test/002.png",
        id: 2,
        url: "/pages/news/onepagenews/onepagenews?newsid=2"
      },
      {
        index: 2,
        src: "/assets/banner_test/003.png",
        id: 3,
        url: "/pages/news/onepagenews/onepagenews?newsid=3"
      }
    ],
    //单位管理专区内容
    manage_list: [{
        id: 1,
        text: '健康码',
        color: '#20c2cf',
        url: ''
      },
      {
        id: 2,
        text: '我的单位',
        color: '#20c2cf',
        url: ''
      },
      {
        id: 3,
        text: '加入单位',
        color: '#20c2cf',
        url: ''
      }
    ],
    //今日疫情数据
    epidemic_data: [{
        id: 1,
        num: 703592,
        color: '#009933',
        text: '国外确诊'
      },
      {
        id: 2,
        num: 80868,
        color: '#ffcc36',
        text: '国内确诊'
      },
      {
        id: 3,
        num: 8,
        color: '#ff0909',
        text: '境外输入'
      },
    ],
    currentIndex: 0,
    chinadata: null
  },

  /**
   * Banner 3D 效果
   */
  handleBanner: function(e) {
    this.setData({
      currentIndex: e.detail.current
    })
    // console.log(e.detail.current)
  },
  gothisnew(e) {
    console.log(e.currentTarget.id)
  },
  /**
   * 单位管理三个按钮点击事件
   */
  tapTo: function(event) {
    var that = this;
    var item = event.currentTarget.dataset.para;
    console.log(item)
    if (item == 1) {
      wx.navigateTo({
        url: '../company/healthycode/heathycode',
      })
    } else if (item == 2) {
      wx.navigateTo({
        url: '../company/mycompany/mycompany',
      })
    } else if (item == 3) {
      wx.navigateTo({
        url: '../company/joincompany/joincompany',
      })
    }
  },

  /**
   * Toast 封装
   */
  showToast: function(msg) {
    wx.showToast({
      title: msg,
      icon: 'none'
    })
  },

  /**
   * 行程查询输入框
   */
  travelInput: function(e) {
    this.setData({
      num: e.detail.value
    })
    console.log(e.detail.value)
  },

  /**
   * 根据航班号/列车号进行查询
   */
  search: function() {
    this.showToast('查询已发送')
    var inputnum = this.data.num;
    var that = this;
    wx.request({
      url: 'https://2019ncov.nosugartech.com/data.json',
      success(res) {
        console.log(res)
        console.log(inputnum)
        if (!res.data.code) {
          var data = res.data.data;
          var i = 0;
          for (; i < data.length; i++) {
            if (data[i].t_no == inputnum) {
              console.log(data[i])
              break;
            }
          }
          if (i < data.length) {
            var it = data[i];
            var inputtip = it.t_start + '~' + it.t_end + '\n' + '从' + it.t_pos_start + '~' + it.t_pos_end + '有患者乘坐';
            that.setData({
              inputtip
            })

          } else {
            that.setData({
              inputtip: '暂未有患者在此列车/航班'
            })
          }
        }
      }
    })


  },

  more: function() {
    var that = this;
    wx.navigateTo({
      url: '/pages/home/map/map',
      success: function(res) {
        var data = that.data.chinadata;
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('epidemic', {
          data: data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */


  /**
   * 绘制地图
   */
  onLoad() {
    let token = wx.getStorageSync('token')
    var that = this;
    console.log('token = ' + token)
    wx.request({
      url: 'https://blog.csxjh.vip:8004/info/getArea',
      method: 'GET',
      success(res) {
        console.log(res)
        var china = res.data.data.china;
        var world = res.data.data.country;
        app.globalData.china = china;
        app.globalData.world = world;
        console.log(app.globalData)
        that.seechange()
      }
    })

    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // })
    // let tableName = "92807";
    // let mapData = null
    // let dailyTextContent = dailyData.data[0]
    // // 处理 mapData
    // mapData = utils.handleData(dataDaily, dataFormate);
    // this.setData({
    //   ec: {
    //     onInit: initChart,
    //     lazyLoad: true
    //   },
    //   dailyTextContent: dailyTextContent,
    //   mapData: mapData
    // });

    // // 调用 ec-cavans 的内部方法
    // let canvasDom = this.selectComponent("#mychart-dom-area");

    // // 设置地图数据 mapData为异步请求的结果
    // canvasDom.setSeriesData(mapData);

    // // 绘制页面
    // canvasDom.init();
    // console.log('OK')
    // wx.hideLoading()
  },

  seechange() {
    var token = wx.getStorageSync('token');
    var epidemic_data = this.data.epidemic_data;
    var that = this;
    wx.request({
      url: 'https://blog.csxjh.vip:8004/info/getChange',
      header: {
        token
      },
      success(res) {
        console.log(res)
        if (res.data.code == 0) {
          var data = res.data.data;
          epidemic_data[0].num = data.foreign_change.currentConfirmedCount;
          epidemic_data[1].num = data.china_change.currentConfirmedCount;
          epidemic_data[2].num = data.china_change.suspectedCount;
          that.setData({
            epidemic_data,
            chinadata: data.china_change
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    setTimeout(function() {
      var tableName = "92807";
      var mapData = app.globalData.china;
      if (mapData == null) {
        wx.showToast({
          title: '网络不良，无法显示疫情地图',
          icon: 'none'
        })
      }

      console.log(mapData)
      // let dailyTextContent = dailyData.data[0]
      mapData = utils.handleData(mapData, dataFormate);
      that.setData({
        ec: {
          onInit: initChart,
          lazyLoad: true
        },
        // dailyTextContent: dailyTextContent,
        mapData
      });

      // 调用 ec-cavans 的内部方法
      let canvasDom = that.selectComponent("#mychart-dom-area");

      // 设置地图数据 mapData为异步请求的结果
      canvasDom.setSeriesData(mapData);

      // 绘制页面
      canvasDom.init();
      wx.hideLoading()

    }, 2000) //延迟时间 这里是1秒
    // 处理 mapData



  },
  handleClickItem1({
    detail
  }) {
    let name = this.data.actions1[detail.index].name
    if (this.data.mapTitle === name) return this.handleCancel1()
    this.setDomVisable('#mychart-dom-area', '疫情地图', name)
    this.setDomVisable('#currentMap', '当地地图', name)
    this.setData({
      mapTitle: this.data.actions1[detail.index].name,
      visible1: false
    })
  },

  setDomVisable(domName, flag, name) {
    if (this.data.mapTitle === flag) {
      let dom = this.selectComponent(domName)
      dom.setVisable(true)
    } else if (name === flag) {
      let dom = this.selectComponent(domName)
      dom.setVisable(false)
      this.routerOnload(flag, dom)
    }
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
    this.setData({
      showView: true, //这个是我判断提醒语的显示，我在page里设置变量是true
    })
    wx.showToast({
      icon: 'loading',
      title: '刷新中~',
    })
    //this.onLoad();
    setTimeout(() => {
      this.setData({
        showView: false,
      })
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
      wx.showToast({
        icon: 'success',
        title: '刷新成功',
        duration: 1000
      })
    }, 1000)
    
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