// pages/product/case/case.js
var common = require('../../../utils/common.js');
var app = getApp();
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
    type_kind: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    var that = this;
    common.fnTopBar(that, '相关案例', '../../../image/back.png', 'fnGoBack');
    var that = this;
    var dataArr = {
      pdId: option.id
    }

    common.fnCommonRequest('/am/marketconference/wxapi/cfProductMgr/findCFPdCaseInfoList', dataArr, function (res) { that.fnInitData(res) }) 
    this.setData({
      pdId: option.id
    })
  },
  // 加载数据
  fnInitData:function(res){
    wx.hideLoading()
    if (res.data.status == '200') {
      console.log(res)
      this.setData({
        list: res.data.data
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
  // 返回函数
  fnGoBack: function() {
    wx.navigateBack({
      url: '../major/major'
    })
  }
})