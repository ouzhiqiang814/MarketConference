// pages/product/case/case.js
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
    type_kind: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    var that = this;
    common.fnTopBar(that, '相关案例', '../../../image/back.png', 'fnGoBack');
    this.setData({
      type_kind: option.type_kind
    })
  },
  // 返回函数
  fnGoBack: function() {
    wx.navigateBack({
      url: '../major/major'
    })
  }
})