// pages/meetingReport/meetingReport.js
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
    common.fnTopBar(that, '会议报告', '../../image/back.png', 'fnGoBack')
  },
  fnGoBack: function () {
    wx.switchTab({
      url: '../aboutUs/aboutUs'
    })
  }
})