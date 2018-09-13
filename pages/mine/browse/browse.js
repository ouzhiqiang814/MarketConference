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
    console.log(res)
    wx.hideLoading();
    if (res.data.status == '200'){
      this.setData({
        items: res.data.data
      })
    }
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