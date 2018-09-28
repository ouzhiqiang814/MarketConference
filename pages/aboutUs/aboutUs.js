//index.js
//获取应用实例
const app = getApp()
var common = require('../../utils/common.js')
Page({
  data: {
    topBar:{
      control:'',
      barTitle:'',
      topNum:''
    },
    name: '',
    phoneNum: '',
    position: '',
    companyName: '',
    shade:false,
    navigateToUrl:'',
    topImage:'../../image/tcp.png',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    proList:null,
    multiArrayObj: common.fnIndustryPosition(),
    multiValue: {
      industry: '',
      position: ''
    },
    imageArr:['1.png','2.png','3.png','4.png']
  },
  onLoad: function () {
    var that = this;
    // 判断状态栏高度
    common.fnTopBar(that)

    // 判断头像
    var userInfo = wx.getStorageSync('userInfo')
    if (userInfo){   
      this.setData({
        topImage: userInfo.avatarUrl
      })
    }


    // 获取产品列表
    var that = this;
    var dataArr = '';
    common.fnCommonRequest('/am/marketconference/wxapi/cfProductMgr/findCFPdLnInfList', dataArr, function (res) { that.fnInitData(res) })   
  },
  // 加载数据
  fnInitData:function(res){
    wx.hideLoading()
    if (res.data.status == '200') {
      console.log(res)
      let proListArr = [];
      for (let i = 0, len = res.data.data.length;i<len;i++){
        proListArr.push({
          crtEmpId: res.data.data[i].crtEmpId,
          crtInsId: res.data.data[i].crtInsId,
          crtTm: res.data.data[i].crtTm,
          lastUdtDtTm: res.data.data[i].lastUdtDtTm,
          lastUdtEmpId: res.data.data[i].lastUdtEmpId,
          lastUdtInsId: res.data.data[i].lastUdtInsId,
          pdLnDsc: res.data.data[i].pdLnDsc,
          pdLnId: res.data.data[i].pdLnId,
          pdLnNm: res.data.data[i].pdLnNm,
          image:''
        })
      }
      for (let i = 0; i < 4; i++) {
        proListArr[i].image = '../../image/' + this.data.imageArr[i]
      }
      this.setData({
        proList: proListArr
      })

    }
    else {
      wx.showModal({
        title: '提示',
        content: '获取产品失败，请退出后重试！',
        showCancel: false,
        confirmColor: '#587BFD'
      })
    }
  },

  // 跳转到公司介绍页面
  fnGoIntCom:function(){
    wx.navigateTo({
      url: '../intComy/intComy'
    })
  },
  // 跳转到市场大会介绍页面
  fnGoIntMark: function () {
    wx.navigateTo({
      url: '../intMark/intMark'
    })
  },
  // 跳转到会议报告
  fnGoMeetingReport:function(){
    wx.navigateTo({
      url: '../meetingReport/meetingReport'
    })
  },
  // 查看产品列表
  fnGoProList:function(e){
    console.log(e)
    var type = e.currentTarget.dataset.type;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../product/major/major?type='+type + '&id=' + id
    })
  },
  // 查看我的评价
  fnGoMineEval: common.fnBoolAutDelGo,
  //查看我的收藏
  fnGoMineColl: common.fnBoolAutDelGo,
  // 查看我的浏览
  fnGoMineBrow: common.fnBoolAutDelGo,
  // 查看历史预约
  fnGoMineOrder: common.fnBoolAutDelGo,
  
  fnPhoneNumEvent: common.fnPhoneNumEvent,
  fnCompanyEvent: common.fnCompanyEvent,
  userInfoHandler: function (e) {
    var url = app.globalData.ip + '/am/marketconference/wxapi/cfCstMgr/createCFCstBscInf';
    var that = this;
    common.userInfoHandler(e, that, true, url)
  },
  //跳过填写信息
  fnCancelBtn: function () {
    var that = this;
    common.fnCancel(that);
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
  bindMultiPickerColumnChange: function (e) {
    var that = this;
    common.bindMultiPickerColumnChange(e, that)
  }
})
