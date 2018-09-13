// pages/product/order/order.js
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
    type_kind: '',
    length:0,
    order:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that = this;
    common.fnTopBar(that,'预约咨询', '../../../image/back.png', 'fnGoBack');
  //  判断是否存在用户信息
    var phoneNum = wx.getStorageSync('cstId');
    var phone = '';
    if (phoneNum){
      phone = phoneNum
    }
    this.setData({
      pdId:option.id,
      phone: phone
    })
  
  },
  // 返回函数
  fnGoBack: function () {
    wx.navigateBack({
      url: '../consult/consult'
    })
  },
  // 统计字数 + 咨询内容
  fnLength:function(e){
    console.log(e.detail.value)
    this.setData({
      length: e.detail.cursor,
      order: e.detail.value
    })
  },
  // 电话号码
  fnPhoneEvent: function(e){
    console.log(e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },
  // 提交
  fnSubmit:function(){
    if (this.data.phone == '' || this.data.phone == '  ') {
        wx.showModal({
          title: '提示',
          content: '请填写您的联系方式！',
          showCancel: false,
          confirmColor: '#587BFD'
        })
        return;
    }
    if (this.data.order == '' || this.data.order == ' ') {
      wx.showModal({
        title: '提示',
        content: '请填写您需要预约咨询的内容！',
        showCancel: false,
        confirmColor: '#587BFD'
      })
      return;
    }

    // 获取产品列表
    var that = this;
    var dataArr = {
      cstId: this.data.phone,
      pdId: this.data.pdId,
      cnsltCntnt: this.data.order
    }
    common.fnCommonRequest('/am/marketconference/wxapi/cfProductMgr/createCFPdCnsltInf', dataArr, function (res) { that.fnInitData(res) })   
  },
  // 加载数据
  fnInitData:function(res){
    wx.hideLoading()
    if (res.data.status == '200') {
      console.log(res)
      wx.showToast({
        title: '预约成功',
        icon: 'success',
        duration: 2000
      })
      setTimeout(function () {
        wx.navigateBack({
          url: '../consult/consult'
        })
      }, 2000)
    }
    else {
      wx.showModal({
        title: '提示',
        content: '提价预约失败，请稍后重试！',
        showCancel: false,
        confirmColor: '#587BFD'
      })
    }
  }
})