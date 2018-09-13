// pages/product/consult/consult.js
const app = getApp();
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
    type: '',
    control: '',
    type_kind: '',
    consultFlag: 'true',
    list:[],
    srcImage:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    common.fnTopBar(that, '我的预约', '../../../image/back.png', 'fnGoBack')

    this.setData({
      srcImage: wx.getStorageSync('userInfo').avatarUrl
    })

    // 获取产品列表
    var that = this;
    var dataArr = {
      cstId: wx.getStorageSync('cstId')
    }
    common.fnCommonRequest('/am/marketconference/wxapi/cfProductMgr/findMyCFPdCnsltInf', dataArr, function (res) { that.fnInitData(res) })
  },
  // 数据加载
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
  fnGoBack: function () {
    wx.navigateBack({
      url: '../../aboutUs/aboutUs'
    })
  }
})