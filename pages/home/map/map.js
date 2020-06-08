const app = getApp();
import dataFormate from "../../../js/data.js";
import {
  initChart
} from "../../../js/chart.js";
import utils from "../../../js/utils.js";
// import dailyData from '../../../data/daily.js'
// import dataDaily from '../../../data/data.js'

Page({
  onShareAppMessage: function(res) {
    return {
      title: "新型肺炎疫情地图！",
      path: "/pages/index/index",
      success: function() {},
      fail: function() {}
    };
  },

  data: {
    ec: {},
    canvasDom: "",
    mapData: [],
    worldData:[],
    dailyTextContent: {},
    visible1: false,
    actions1: [{
        name: "疫情地图",
        key: 'map'
      },
      {
        name: "各地详细数据",
        key: 'data'
      },
      
      {
        name: "世界详细数据",
        key: 'worlddata'
      }
    ],
    mapTitle: '疫情地图'
  },

  async onLoad() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that=this;
    let tableName = "92807";
    let mapData = app.globalData.china;
    let worldData=app.globalData.world;
    var  dailyTextContent;
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('epidemic', function(data) {
      console.log(data.data)
      that.setData({
        dailyTextContent:data.data
      })
    })
    // 处理 mapData
    mapData = utils.handleData(mapData, dataFormate);
    worldData = utils.handleworldData(worldData, dataFormate);
    this.setData({
      ec: {
        onInit: initChart,
        lazyLoad: true
      },
      
      mapData,
      worldData
    });
    console.log(worldData)
    // 调用 ec-cavans 的内部方法
    let canvasDom = this.selectComponent("#mychart-dom-area");

    // 设置地图数据 mapData为异步请求的结果
    canvasDom.setSeriesData(mapData);

    // 绘制页面
    canvasDom.init();
    wx.hideLoading()
    
  },
  
  menuClick: function() {
    this.setData({
      visible1: true
    });
  },

  handleCancel1() {
    this.setData({
      visible1: false
    });
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

  // 显示 component 之后 执行
  routerOnload(flag, dom) {
    if (flag === '当地地图') {
      dom.httpGetMapJson()
    }
  }
});