// pages/intComy/intComy.js
var common = require('../../utils/common.js')
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
    }
  },
  onLoad: function () {
    var that = this;
    common.fnTopBar(that, '公司介绍', '../../image/back.png', 'fnGoBack')
  },
  fnGoBack: function () {
    wx.switchTab({
      url: '../aboutUs/aboutUs'
    })
  }
})