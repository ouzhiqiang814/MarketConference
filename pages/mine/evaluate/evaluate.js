// pages/mine/evaluate/evaluate.js
var app = getApp();
var common = require('../../../utils/common.js')
Page({
  /**
   * 页面的初始数据
   */
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
    footCode: {
      placeholder: '请提出您的建议或评价',
      src: '../../../image/ok_signed.png'
    },
    items: [],
    consultInput: '',
    add: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that = this;
    common.fnTopBar(that, '我的评价', '../../../image/back.png', 'fnGoBack')

    // 获取评价列表
    var dataArr = {
      cstId: wx.getStorageSync('cstId')
    }
    var that = this
    common.fnCommonRequest('/am/marketconference/wxapi/cfProductMgr/findCFPdAssInfList', dataArr, function (res) { that.fnInitData(res) })

  },
  // 写追评
  fnTer: function (e) {
    console.log(e)
    if (this.data.items[e.currentTarget.dataset.index].addTerFlag == false) {
      let itemsArr = this.data.items;
      itemsArr[e.currentTarget.dataset.index].addTerFlag = true;
      this.setData({
        items: itemsArr
      })

    }
    else {
      let itemsArr = this.data.items;
      itemsArr[e.currentTarget.dataset.index].addTerFlag = false;
      this.setData({
        items: itemsArr
      })
    }
  },
  //监听追评
  fnAddeEvent: function (e) {
    console.log(e)
    this.setData({
      add: e.detail.value
    })
  },
  // 提交追评
  fnTerSub: function (e) {
    var add = this.data.add;
    console.log(add)
    if (add == '' || add == ' ') {
      wx.showModal({
        title: '提示',
        content: '请填写评论内容',
        showCancel: false,
        confirmColor: '#587BFD'
      })
      return;
    }
    var dataArr = {
      pdId: e.currentTarget.dataset.pdid,
      cstId: wx.getStorageSync('cstId'),
      assCntnt: add
    }
    console.log(e)
    var that = this
    common.fnCommonRequest('/am/marketconference/wxapi/cfProductMgr/createCFPdAssInf', dataArr, function (res) { that.fnSubmitEval(res) })
  },
  // 取消追评
  fnTerEsc: function (e) {
    let itemsArr = this.data.items;
    itemsArr[e.currentTarget.dataset.index].addTerFlag = false;
    this.setData({
      items: itemsArr,
      add: ''
    })
  },

  // 评论内容
  consultInputEvent: function (e) {
    this.setData({
      consultInput: e.detail.value
    })
  },

  // 加载评价列表
  fnInitData: function (res) {
    wx.hideLoading()
    var that = this;
    var itemsArr = [];
    if (res.data.status == '200') {
      console.log(res)
      for (let i = 0, len = res.data.data.length; i < len; i++) {
        itemsArr.push({
          src: '../../../image/tpt.jpg',
          phoneNum: res.data.data[i].cstId.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
          time: res.data.data[i].crtTm,
          content: res.data.data[i].assCntnt,
          reply: '天阳回复：感谢您对我们产品的认可，您的支持将是我们最大的追求，祝您生活愉快！',
          terFlag: res.data.data[i].cstId == wx.getStorageSync('cstId') ? true : false,
          addTerFlag: false,
          index: i,
          pkId: res.data.data[i].pkId,
          pdSmy: res.data.data[i].pdSmy,
          pdNm: res.data.data[i].pdNm,
          pdId: res.data.data[i].pdId,
          pdIcn: that.fnIfPic(res.data.data[i].pdIcn),
          
        })
      }
      console.log(itemsArr)
      this.setData({
        items: itemsArr
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '获取产品评价失败，请退出后重试！',
        showCancel: false,
        confirmColor: '#587BFD'
      })
    }
  },
  // 图片判断
  fnIfPic: function (pic) {
    var ipStr = app.globalData.ip + '/am/'
    var kong = ''
    if (pic) {
      return ipStr + pic;
    }
    return kong
  },
  // 刷新评论
  fnSubmitEval: function (res) {
    wx.hideLoading()
    console.log(res)
    if (res.data.status == '200') {
      this.setData({
        consultInput: ''
      })
      var dataArr = {
        cstId: wx.getStorageSync('cstId')
      }
      var that = this
      common.fnCommonRequest('/am/marketconference/wxapi/cfProductMgr/findCFPdAssInfList', dataArr, function (res) { that.fnInitData(res) })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '获取产品评价失败，请稍后重试！',
        showCancel: false,
        confirmColor: '#587BFD'
      })
    }
  },
  // 删除评论
  fnDel: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除该条评论？',
      confirmColor: '#587BFD',
      success: function (res) {
        if (res.confirm) {
          var dataArr = {
            pdId: e.currentTarget.dataset.pdid,
            cstId: wx.getStorageSync('cstId'),
            pkId: e.currentTarget.dataset.pkid
          }
          common.fnCommonRequest('/am/marketconference/wxapi/cfProductMgr/delMyCFPdAssInf', dataArr, function (res) { that.fnSubmitEval(res) })
        }
      }
    })

  },
  // 返回函数
  fnGoBack: function() {
    wx.navigateBack({
      url: '../../aboutUs/aboutUs'
    })
  }
})