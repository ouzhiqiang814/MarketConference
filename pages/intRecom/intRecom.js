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
    listArr:[
      {
        id:'3',
        question:'您的公司是否有以下的几种烦恼？',
        answer:[
          {
            content: 'A、获客渠道不足'
          },
          {
            content: 'B、营销活动无法统一管理'
          },
          {
            content: 'C、无法轻松的管理客户关系'
          },
          {
            content: 'D、营销规则混乱'
          }
        ]
      },
      {
        id: '4',
        question: '您对大数据营销产品的大概预算是多少？',
        answer: [
            {
            content: 'A、10万-30万'
            },
            {
              content: 'B、30万-50万'
            },
            {
              content: 'C、50万-70万'
            },
            {
              content: 'D、80万-100万'
            },
            {
              content: 'E、100万以上'
            }
        ]
      },
      {
        id: '1',
        question: '您对大数据营销产品的大概预算是多少？',
        answer: [
          {
            content: 'A、10万-30万'
          },
          {
            content: 'B、30万-50万'
          },
          {
            content: 'C、50万-70万'
          },
          {
            content: 'D、80万-100万'
          }
        ]
      }
    ], 
     
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
      list: this.data.listArr[0],
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
    var pageNum = e.currentTarget.dataset.pagenum;
    var listArrSp = this.data.listArr;
    var questionInfo = wx.getStorageSync('questionInfo') || []
    for (var i = 0; i < listArrSp[pageNum-1].answer.length;i++){
      listArrSp[pageNum - 1].answer[i].selectFlag = false;
    }

    if (pageNum < this.data.listArr.length){
      listArrSp[pageNum - 1].answer[e.currentTarget.dataset.id].selectFlag = true;
   
      this.setData({
        listArr: listArrSp
      })
      this.setData({
        list: this.data.listArr[pageNum-1],
        pageNum: pageNum 
      })

      if (questionInfo[pageNum - 1]) {
        questionInfo[pageNum - 1] = this.data.list
      }
      else{
        questionInfo.push(this.data.list)
      }
      wx.setStorageSync('questionInfo', questionInfo)
      
      var that = this;
      setTimeout(function (){
        that.setData({
          list: that.data.listArr[pageNum],
          pageNum: pageNum + 1
        })
      },500)
    }
    else if (pageNum = this.data.listArr.length){
      console.log('完成答卷啦');
      listArrSp[pageNum - 1].answer[e.currentTarget.dataset.id].selectFlag = true;

      this.setData({
        listArr: listArrSp
      })
      this.setData({
        list: this.data.listArr[pageNum - 1],
        pageNum: pageNum
      })
      if (questionInfo[pageNum - 1]) {
        questionInfo[pageNum - 1] = this.data.list
      }
      else {
        questionInfo.push(this.data.list)
      }
      wx.setStorageSync('questionInfo', questionInfo);
      var that = this;
      setTimeout(function () {
        that.setData({
          recomedQues: false,
          recomedEnd: true,
        })
      }, 500)
    }


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
  }
  
})