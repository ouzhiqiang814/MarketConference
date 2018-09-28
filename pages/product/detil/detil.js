// pages/product/detil/detil.js
var common = require('../../../utils/common.js')
const app = getApp();
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
    type_kind:'',
    name: '',
    phoneNum: '',
    position: '',
    companyName: '',
    shade: false,
    navigateToUrl: '',
    collectionImage:'../../../image/love-1.png',
    collectionFlag:false,
    num :0,
    clctCnt:0,

    multiArrayObj: common.fnIndustryPosition(),
    multiValue: {
      industry: '',
      position: ''
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {

    var that = this;
    common.fnTopBar(that, option.type_kind + option.type, '../../../image/back.png', 'fnGoBack');
    this.setData({
      type_kind: option.type_kind,
      type: option.type,
      pdId: option.id
    })

    // 保存最近浏览数据
    var recView = wx.getStorageSync('recView');
    var recViewArr = [];
    var o = {};
    console.log(recView)
    if (recView){
      recView.unshift(option.id)
      for (var i = 0; i < recView.length; i++) {
        var k = recView[i];
        if (!o[k]) {
          o[k] = true;
          recViewArr.push(k);
        }
      }
      console.log(recViewArr)
    }
    else{
      recViewArr.push(option.id)
      
    }
    wx.setStorageSync('recView', recViewArr)


    // 获取产品详情
    var cstId = wx.getStorageSync('cstId');
    var userId = '';
    if (cstId){
      userId = cstId;
    }
    var that = this;

    var dataArr = {
      pdId: option.id,
      cstId: userId
    }
    
    common.fnCommonRequest('/am/marketconference/wxapi/cfProductMgr/findOneCFPdBaseInf', dataArr, function (res) { that.fnInitData(res) }) 
  },
  // 加载数据
  fnInitData:function(res){
    wx.hideLoading()
    if (res.data.status == '200') {
      console.log(res)
      var titleArr = []; 
      var pdDscArr = [];
      var picArr = [];

      titleArr = res.data.data.pdDsc.split('/t');
      pdDscArr = titleArr[0].split('/n');
      if (res.data.data.cfPdPicInfVOS != ''){
        for (let i = 0, len = res.data.data.cfPdPicInfVOS.length; i < len; i++){
          if (res.data.data.cfPdPicInfVOS[i].picTp == 'detail'){
            picArr.push(app.globalData.ip + '/am/' + res.data.data.cfPdPicInfVOS[i].picAdr)
          }
        }
      }

      var detilArr = [];
      for (let i = 0, len = pdDscArr.length; i<len; i++){
        detilArr.push({
          title: titleArr[i+1],
          ifTitle:true,
          img:'',
          ifImg:false,
          dsc: pdDscArr[i],
          ifDsc:true
        })
      }
      console.log(picArr)
      for (let i = 0, len = picArr.length; i<len; i++){
        
        if(detilArr[i] == undefined){
          detilArr.push({
            ifTitle: false,
            img: picArr[i],
            ifDsc: false
          })
          detilArr[i].ifImg = true;
        }else{
          detilArr[i].img = picArr[i];
          detilArr[i].ifImg = true;
        }
      }
      console.log(detilArr)
      var clctCntString = 0;
      if (res.data.data.clctCnt){
        clctCntString = res.data.data.clctCnt
      }
      this.setData({
        lists: detilArr,
        num: res.data.data.brwsCnt,
        clctCnt: clctCntString,
        picArr: picArr
      })
        
      if (res.data.data.wthrClct == 1) {
        this.setData({
          collectionImage: '../../../image/love-1-se.png',
          collectionFlag: true
        })
      }

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

  // 查看案例
  fnGoCase:function(){
    wx.navigateTo({
      url: '../case/case?id=' + this.data.pdId,
    })
  },
  // 咨询
  fnConsult: function(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.url + '?id=' + this.data.pdId
    })
  },
  // 收藏
  fnCollection: common.fnBoolAutDelGoWithCollection,
  // 评价
  fnEvaluate: common.fnBoolAutDelGoWithKind,
  // 返回函数
  fnGoBack:function(){
    wx.navigateBack({
      url:'../major/major'
    })
  },

  // fnNameEvent: common.fnNameEvent,
  fnPhoneNumEvent: common.fnPhoneNumEvent,
  fnCompanyEvent: common.fnCompanyEvent,
  // fnPositionEvent: common.fnPositionEvent,
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
  },
  // 查看大图
  previewImage:function(e){
    console.log(e)
    var current = e.target.dataset.info;
    wx.previewImage({
      current: current,
      urls: this.data.picArr
    })
  }

})