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
    consultFlag:'true',
    footCode:{
      placeholder:'请描述您的问题',
      src:'../../../image/ok_signed.png'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that = this;
    common.fnTopBar(that, '咨询', '../../../image/back.png', 'fnGoBack');
      this.setData({
        pdId:option.id
      })

  },
  // 查看问题答案
  fnGoAnsewr:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../reply/reply?id=' + id,
    })
  },
  // 咨询预约
  fnGoConsultDel:function(){
    wx.navigateTo({
      url: '../order/order?id=' + this.data.pdId,
    })
  },
  // 返回函数
  fnGoBack: function () {
    wx.navigateBack({
      url: '../detil/detil'
    })
  }
})