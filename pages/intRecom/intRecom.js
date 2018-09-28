// pages/intPredic/intPredic.js

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
    shade:true,
    name: '',
    phoneNum: '',
    position: '',
    companyName: '',
    startPart:true,
    recomed: false,
    list: null,
    listArr:[], 
    slectArr:[], 
    recomedQues: true,
    recomedEnd:false,
    multiArrayObj: common.fnIndustryPosition(),
    multiValue: {
      industry: '',
      position: ''
    }
    
  },
  // 初始化加载
  onLoad: function (options) {
    var that = this;
    common.fnTopBar(that, '智能推荐')

    var userDel = wx.getStorageSync("userDel");
    if (userDel) {
      this.setData({
        shade: false
      })
    }

    var getStorQues = wx.getStorageSync('questionInfo');
    if (getStorQues){
      this.setData({
        listArr: getStorQues
      })
    }
    this.setData({      
      pageNum: 1,
      listLength: this.data.listArr.length
    })


  },
  onShow:function(){
    var userDel = wx.getStorageSync("userDel");
    if (!userDel) {
      this.setData({
        shade: true
      })
    }

    var questionInfo = wx.getStorageSync('questionInfo')
    if (questionInfo){
      this.setData({
        startPart:false,
        recomed:true,
        recomedEnd:true,
        recomedQues:false
      })
    }
  },
  onHide:function(){
    var userDel = wx.getStorageSync("userDel");
    if (!userDel) {
      this.setData({
        shade: true
      })
    }
  },
  // 选择答案
  fnClick:function(e){
    console.log(e)
    var selectFlag = e.currentTarget.dataset.flag;
    var listArrSp = this.data.listArr;
    var idx = e.currentTarget.dataset.idx;
    var id = e.currentTarget.dataset.id
    var slectArrPaus = this.data.slectArr;
    // var questionInfo = wx.getStorageSync('questionInfo') || []
    if (!selectFlag){
      listArrSp.answer[idx].selectFlag = true;
      slectArrPaus.push(id)
    }
    else{
      listArrSp.answer[idx].selectFlag = false;
      for (let i = 0, len = slectArrPaus.length;i<len;i++){
        if (slectArrPaus[i] == id){
          slectArrPaus.splice(i, 1)
        }
      }      
    }
    this.setData({
      listArr: listArrSp,
      slectArr: slectArrPaus
    })


  },

  // 授权并填写详细信息
  fnNameEvent: common.fnNameEvent,
  fnPhoneNumEvent: common.fnPhoneNumEvent,
  fnCompanyEvent: common.fnCompanyEvent,
  fnPositionEvent: common.fnPositionEvent,
  userInfoHandler: function(e){
    var that = this;
    common.userInfoHandler(e,that,false)
  },
  

  //点击填写
  fnGoInput: function () {
    var that = this;
      that.setData({
        startPart:false,
        recomed: true
      })
      // 获取题目
    var dataArr = '';
    common.fnCommonRequest('/am/marketconference/wxapi/cfProductMgr/findCFRecomAnswerInfoList', dataArr, function (res) { that.fnInitData(res) })  
  },
  fnRestart:function(){
    this.setData({
      recomedQues: true,
      recomedEnd: false,
    })
    var questionInfo = wx.getStorageSync('questionInfo')
    this.setData({
      listArr: questionInfo
    })
    this.setData({
      list: this.data.listArr[0],
      pageNum: 1
    })
  },
  // 提交答案
  fnClickAns:function(e){
    var type = e.currentTarget.dataset.type;
    console.log(e)
    wx.navigateTo({
      url: '../intRecomReport/intRecomReport?type=' + type
    })
  },
  //跳过填写信息
  fnCancelBtn: function () {
    var that = this;
    var fn = function () {
      wx.switchTab({
        url: '../aboutUs/aboutUs'
      })
    }
    common.fnCancel(that, fn);
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
  // 加载题目
  fnInitData:function(res){
    wx.hideLoading();
    console.log(res);
    var listArrPaus = {
      question : '',
      answer : [],
    };
    if (res.data.status == '200') {
      listArrPaus.question = res.data.data[0].rmQuestion
      for(let i=0, len=res.data.data.length; i<len; i++) {
        listArrPaus.answer.push({
          answer: res.data.data[i].rmAnswer,
          id: res.data.data[i].rmId,
          selectFlag:false
        })
      }
      this.setData({
        listArr: listArrPaus,
      })
      
    }
  },
  // 下一题
  fnNext:function(){
    var pageNumPaus = this.data.pageNum;
    pageNumPaus++;
    var that =this;
    that.setData({
      pageNum: pageNumPaus
    })
    // 获取题目
    var dataArr = {
      "rmIds":[['80015'], ['80009']]
    };
    common.fnCommonRequest('/am/marketconference/wxapi/cfProductMgr/findCFProdByRecomInfoList', dataArr, function (res) { that.aaa(res) }) 
  },
  aaa:function(res){
    console.log(res)
  }
  
})