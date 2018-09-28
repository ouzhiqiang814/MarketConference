// pages/product/consult/consult.js
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
    footCode: {
      placeholder: '请描述您的问题',
      src: '../../../image/ok_signed.png'
    },
    arrList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    var that = this;
    common.fnTopBar(that, '咨询', '../../../image/back.png', 'fnGoBack');
    this.setData({
      pdId: option.id
    })

    var dataArr = {
      pdId: option.id
    }
    console.log(option.id)
    common.fnCommonRequest('/am/marketconference/wxapi/cfProductMgr/findCFAnswerInfoList', dataArr, function(res) {
      that.fnInitData(res)
    })
  },
  // 查看问题答案
  fnGoAnsewr: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../reply/reply?id=' + id,
    })
  },
  // 咨询预约
  fnGoConsultDel: function() {
    wx.navigateTo({
      url: '../order/order?id=' + this.data.pdId,
    })
  },
  // 返回函数
  fnGoBack: function() {
    wx.navigateBack({
      url: '../detil/detil'
    })
  },
  HandleEvent: function(e) {
    console.log(e)
    this.setData({
      ll: e.target.offsetTop - 19
    })
  },
  // 加载数据
  fnInitData: function(res) {
    wx.hideLoading()
    console.log(res)
    var arr = [];
    if (res.data.status == '200') {
      if (res.data.data.length != 0) {
        for (let i = 0, len = res.data.data.length; i < len; i++) {
          arr.push({
            pdQuestion: res.data.data[i].pdQuestion,
            num : i
          })
        }
      }
      this.setData({
        arrList : arr
      })
      wx.setStorageSync('arrList', res.data.data)
    }

  }
})