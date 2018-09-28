// pages/mine/browse/browse.js
var app = getApp();
var common = require('../../../utils/common.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topBar: {
      control: '',
      barTitle: '',
      topNum: '',
      image: '',
      fn: ''
    },
    items: [],
    type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this;
    common.fnTopBar(that, '最近浏览', '../../../image/back.png', 'fnGoBack')
    
    var dataArr = {
      cstId: wx.getStorageSync('cstId')
    }
    var that = this
    common.fnCommonRequest('/am/marketconference/wxapi/cfProductMgr/findCFPdBrwsRcrdInfList', dataArr, function (res) { that.fnInitData(res) })

  },
  // 初始化产品列表
  fnInitData:function(res){
    var that = this;
    console.log(res)
    wx.hideLoading()
    var resArr = []
    wx.hideLoading()
    if (res.data.status == '200') {
      console.log(res)
      for (let i = 0, len = res.data.data.length; i < len; i++) {
        resArr.push({
          pdId: res.data.data[i].pdId,
          pdNm: res.data.data[i].pdNm,
          pdSmy: res.data.data[i].pdSmy,
          picIcon: that.fnIfPic(res.data.data[i].pdIcn),
        })
      }
      console.log(resArr)

      this.setData({
        items: resArr
      })

    }
    else {
      wx.showModal({
        title: '提示',
        content: '获取产品失败，请退出后重试！',
        showCancel: false,
        confirmColor: '#587BFD'
      })
    }
  },
  // 图片判断
  fnIfPic : function(pic){
    var ipStr = app.globalData.ip + '/am/'
    var kong = ''
    if(pic){
      return ipStr + pic;
    }
    return kong
  },
  // 返回函数
  fnGoBack: function() {
    wx.navigateBack({
      url: '../../aboutUs/aboutUs'
    })
  },
  // 查看详情
  fnGoDetils:function(e){
    var id = e.currentTarget.dataset.id;
    var type_kind = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../../product/detil/detil?type=' + this.data.type + '&type_kind=' + type_kind + '&id=' + id
    })
  }
})