//index.js
//获取应用实例
const app = getApp()
var common = require('../../utils/common.js')
Page({
  data: {
    topBar: {
      control: '',
      barTitle: '',
      topNum: '',
      image:'',
      fn:''
    },
    name:'',
    phoneNum:'',
    position:'',
    companyName:'',
    navigateToUrl:"../signed/signed",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    multiArrayObj: common.fnIndustryPosition(),
    multiValue:{
      industry:'',
      position:''
    }
    
    
  },
  onLoad:function(){
    var that = this;
    common.fnTopBar(that, '天阳科技有限公司', '../../image/home.png','fnGoIndex')

  },
  onShow:function(){

    var userInfo = wx.getStorageSync('userInfo')
    var userDel = wx.getStorageSync('userDel')
    if (userInfo && userDel) {
      wx.switchTab({
        url: '../aboutUs/aboutUs'
      })
    }
  },
  
  // 直接跳转到首页
  fnGoIndex: function(){
    wx.switchTab({
      url: '../aboutUs/aboutUs'
    })

  },
  // fnNameEvent: common.fnNameEvent,
  fnPhoneNumEvent: common.fnPhoneNumEvent,
  fnCompanyEvent: common.fnCompanyEvent,
  // fnPositionEvent: common.fnPositionEvent,
  userInfoHandler: function (e) {
    var url = app.globalData.ip + '/am/marketconference/wxapi/cfCstMgr/createCFCstBscInf';
    var that = this;
    common.userInfoHandler(e, that, false, url)
  },
  //跳过填写信息
  fnCancelBtn:function(){
    var that = this;
    var fn = function(){
      wx.switchTab({
        url: '../aboutUs/aboutUs'
      })
    }
    common.fnCancel(that,fn);
  }, 
  // 行业以及职位选择
  bindMultiPickerChange: function (e) {
    var that = this;
    this.setData({
      multiValue: {
        industry: that.data.multiArrayObj.multiArray[0][that.data.multiArrayObj.multiIndex[0]],
        position: that.data.multiArrayObj.multiArray[1][that.data.multiArrayObj.multiIndex[1]]
      }
    })
  },
  bindMultiPickerColumnChange: function(e){
    var that = this;
    common.bindMultiPickerColumnChange(e,that)
  }

})
