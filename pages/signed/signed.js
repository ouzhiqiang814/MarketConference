const app = getApp()
var common = require('../../utils/common.js')
Page({
  data: {
    topBar: {
      control: '',
      barTitle: '',
      topNum: '',
      image: '',
      fn: ''
    },
    second:3,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    var that = this;
    common.fnTopBar(that, '天阳科技有限公司', '../../image/back.png', 'fnGoIndex')
    // 计时器
    var n = 3;
    var i = setInterval(function () {
      n = n - 1;
      this.setData({
        second: n
      });
    }.bind(this), 1000);      
    setTimeout(function(){
      clearInterval(i);
      wx.switchTab({
        url:'../aboutUs/aboutUs'
      })
    },3000)
  },
  fnGoIndex: function () {
    console.log(1)
  }
})