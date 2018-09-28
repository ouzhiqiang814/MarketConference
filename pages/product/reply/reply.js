// pages/product/reply/reply.js
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
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    var that = this;
    common.fnTopBar(that, '问题回复', '../../../image/back.png', 'fnGoBack');
    var arrList = wx.getStorageSync('arrList');
    this.setData({
      id: option.id,
      replay: arrList[option.id].pdQuestion,
      arr: arrList[option.id].pdAnswers
    })






  },
  // 返回函数
  fnGoBack: function() {
    wx.navigateBack({
      url: '../detil/detil'
    })
  }
})