// pages/intPredic/intPredic.js
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
    },
    name: '',
    phoneNum: '',
    position: '',
    companyName: '',
    shade: true,
    intPreList: false,
    intPreBtn: true,
    inRecFlag_1: 'inRec-hide',
    inRecFlag_2: 'inRec-hide',
    inRecFlag_3: 'inRec-hide',
    items: [{
      type: '操作组商品',
      list: [{
          id: '商业银行',
          src: '../../image/tpt.jpg',
          title: '标题一',
          text: '标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一'
        },
        {
          id: '信贷储蓄',
          src: '../../image/tpt.jpg',
          title: '标题一',
          text: '标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一'
        }, {
          id: '商业银行',
          src: '../../image/tpt.jpg',
          title: '标题一',
          text: '标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一'
        },
        {
          id: '信贷储蓄',
          src: '../../image/tpt.jpg',
          title: '标题一',
          text: '标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一'
        },
      ]
    }, {
      type: '分析组产品',
      list: [{
          id: '商业银行',
          src: '../../image/tpt.jpg',
          title: '标题一',
          text: '标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一'
        },
        {
          id: '信贷储蓄',
          src: '../../image/tpt.jpg',
          title: '标题一',
          text: '标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一'
        }, {
          id: '商业银行',
          src: '../../image/tpt.jpg',
          title: '标题一',
          text: '标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一'
        },
        {
          id: '信贷储蓄',
          src: '../../image/tpt.jpg',
          title: '标题一',
          text: '标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一'
        },
      ]
    }, {
      type: '操作组商品',
      list: [{
          id: '商业银行',
          src: '../../image/tpt.jpg',
          title: '标题一',
          text: '标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一'
        },
        {
          id: '信贷储蓄',
          src: '../../image/tpt.jpg',
          title: '标题一',
          text: '标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一'
        }, {
          id: '商业银行',
          src: '../../image/tpt.jpg',
          title: '标题一',
          text: '标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一'
        },
        {
          id: '信贷储蓄',
          src: '../../image/tpt.jpg',
          title: '标题一',
          text: '标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一'
        },
      ]
    }],
    multiArrayObj: common.fnIndustryPosition(),
    multiValue: {
      industry: '',
      position: ''
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    common.fnTopBar(that, '智能预测')
    var userDel = wx.getStorageSync("userDel");
    console.log(userDel)
    if (userDel) {
      this.setData({
        shade: false
      })
    }
  },

  onShow: function() {
    var userDel = wx.getStorageSync("userDel");
    if (!userDel) {
      this.setData({
        shade: true
      })
    }
    var that = this
    var opacity_1 = 0;
    var opacity_2 = 0;
    var opacity_3 = 0;
    setTimeout(function() {
      that.setData({
        inRecFlag_1: 'inRecFlag_1'
      })
      setTimeout(function() {
        that.setData({
          inRecFlag_2: 'inRecFlag_1'
        })
        setTimeout(function() {
          that.setData({
            inRecFlag_3: 'inRecFlag_1'
          })

        }, 1000)
      }, 1000)
    }, 1000);


  },
  onHide: function() {
    var userDel = wx.getStorageSync("userDel");
    if (!userDel) {
      this.setData({
        shade: true,
        inRecFlag_1: 'opacity:0',
        inRecFlag_2: 'opacity:0',
        inRecFlag_3: 'opacity:0'
      })
    }
  },
  //跳过填写信息
  fnCancelBtn: function() {
    var that = this;
    var fn = function() {
      wx.switchTab({
        url: '../aboutUs/aboutUs'
      })
    }
    common.fnCancel(that, fn);
  },
  // 授权并填写详细信息
  fnNameEvent: common.fnNameEvent,
  fnPhoneNumEvent: common.fnPhoneNumEvent,
  fnCompanyEvent: common.fnCompanyEvent,
  fnPositionEvent: common.fnPositionEvent,
  userInfoHandler: function(e) {
    var that = this;
    common.userInfoHandler(e, that, false)
  },
  // 预测结果
  fnGoList: function() {
    var control = wx.getStorageSync("control");
    console.log(control)
    var topNum = 0;
    if (control == 'iPhone') {
      topNum = 64;
    } else if (control == 'iPhoneX') {
      topNum = 88;
    } else {
      topNum = 68;
    }
    this.setData({
      topBar: {
        control: control,
        barTitle: '预测结果',
        topNum: topNum,
        image: '../../image/back.png',
        fn: 'fnGoback'
      },
      intPreList: true,
      intPreBtn: false,
    })
  },

  // 返回预测界面
  fnGoback: function() {
    var control = wx.getStorageSync("control");
    console.log(control)
    var topNum = 0;
    if (control == 'iPhone') {
      topNum = 64;
    } else if (control == 'iPhoneX') {
      topNum = 88;
    } else {
      topNum = 68;
    }
    this.setData({
      topBar: {
        control: control,
        barTitle: '智能预测',
        topNum: topNum,
        image: '',
        fn: ''
      },
      intPreList: false,
      intPreBtn: true
    })
  },
  fnGoDetils: function(e) {
    console.log('查看详情')
    console.log(e)
    var type_kind = e.currentTarget.dataset.id;
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../product/detil/detil?type=' + type + '&type_kind=' + type_kind
    })
  },
  // 行业以及职位选择
  bindMultiPickerChange: function(e) {
    var that = this;
    this.setData({
      multiValue: {
        industry: that.data.multiArrayObj.multiArray[0][that.data.multiArrayObj.multiIndex[0]],
        position: that.data.multiArrayObj.multiArray[1][that.data.multiArrayObj.multiIndex[1]]
      }
    })
  },
  bindMultiPickerColumnChange: function(e) {
    var that = this;
    common.bindMultiPickerColumnChange(e, that)
  }
})