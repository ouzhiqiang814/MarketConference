var app = getApp();
// 头部高度
function fnTopBar(that, barTitle, image,fn){
   var control = wx.getStorageSync("control");
   console.log(control)
   var topNum = 0;
   if (control == 'iPhone') {
     topNum = 64;
   }
   else if (control == 'iPhoneX') {
     topNum = 88;
   }
   else {
     topNum = 68;
   }
   that.setData({
     topBar: {
       control: control,
       barTitle: barTitle,
       topNum: topNum,
       image: image,
       fn: fn
     }
   })
 }
// 保存用户昵称
function fnNameEvent(e) {
  this.setData({
    name: e.detail.value
  })
}
// 保存用户手机号码
function fnPhoneNumEvent(e) {
  this.setData({
    phoneNum: e.detail.value
  })
}

// 保存用户公司名称
function fnCompanyEvent(e) {
  this.setData({
    companyName: e.detail.value
  })
}

// 保存用户职位
function fnPositionEvent(e) {
  this.setData({
    position: e.detail.value
  })
}
// 授权请求
/*
  e:点击事件内容
  those:指代this
  flag：是否关闭遮罩层
  urlSrt:后端交互的url
  ifCollection：是否为收藏按钮
 */
function userInfoHandler(e, those, flag, urlSrt, ifCollection) {
  var that = those;
  if (e.detail.errMsg == 'getUserInfo:ok') {
    wx.setStorageSync('userInfo', e.detail.userInfo);
    // if (that.data.name == '' || that.data.name == ' ') {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请填写您的称呼！',
    //     showCancel: false
    //   })
    //   return;
    // }
    if (that.data.phoneNum == '' || that.data.phoneNum == ' ') {
      wx.showModal({
        title: '提示',
        content: '请填写您的手机号码！',
        showCancel: false,
        confirmColor: '#587BFD'
      })
      return;
    }
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!reg.test(that.data.phoneNum)){
      wx.showModal({
        title: '提示',
        content: '请填写正确的手机号码！',
        showCancel: false,
        confirmColor: '#587BFD'
      })
      return;
    }
    if (that.data.multiValue.industry == '' || that.data.multiValue.position == '') {
      wx.showModal({
        title: '提示',
        content: '请选择您的行业以及职位！',
        showCancel: false,
        confirmColor: '#587BFD'
      })
      return;
    }
    // if (that.data.position == '' || that.data.position == ' ') {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请填写您的职位！',
    //     showCancel: false
    //   })
    //   return;
    // }

    var userDel = {
      // name: that.data.name,
      phoneNum: that.data.phoneNum,
      companyName: that.data.companyName,
      // position: that.data.position
    }

    that.setData({
      topImage: e.detail.userInfo.avatarUrl
    })
    wx.setStorageSync('userDel', userDel);

    if (urlSrt) {
      wx.showLoading({
        title: '请稍等',
      })
      wx.request({
        url: urlSrt,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'Accept': 'application/json'
        },
        data: {
          cstNm: e.detail.userInfo.nickName,
          mblPh: that.data.phoneNum,
          dept: that.data.multiValue.position,
          idy: that.data.multiValue.industry
        },
        success: function (res) {
          console.log(res)
          wx.hideLoading()
          if (res.data.status == '200') {
            console.log(res)
            wx.setStorageSync('cstId', res.data.data.cstId);
              if (that.data.navigateToUrl){
                wx.navigateTo({
                  url: that.data.navigateToUrl,
                })
              }
          }
          else {
              wx.showModal({
                title: '提示',
                content: '签到失败了，请重新提交信息，或者点击左上角按钮进入小程序！',
                showCancel: false,
                confirmColor: '#587BFD'
              })
          }
        }
      })
    }
    else {
      if (ifCollection == true) {
        if (that.data.collectionFlag == false) {
          that.setData({
            collectionImage: '../../../image/love-1-se.png',
            collectionFlag: true
          })
        }
        else {
          that.setData({
            collectionImage: '../../../image/love-1.png',
            collectionFlag: false
          })
        }
        console.log('收藏成功啦！')
      }
    }
    wx.setStorageSync('cstId', that.data.phoneNum)
    that.setData({
      shade: false
    })
  }
  else {
    if (flag == true) {
      that.setData({
        shade: false
      })
    }
    else {
      that.setData({
        shade: true
      })
    }
  }

}

// 多列选择框
function bindMultiPickerColumnChange(e,that){
  console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
  var data = {
    multiArray: that.data.multiArrayObj.multiArray,
    multiIndex: that.data.multiArrayObj.multiIndex
  };
  data.multiIndex[e.detail.column] = e.detail.value;
  switch (e.detail.column) {
    case 0:
      switch (data.multiIndex[0]) {
        case 0:
          data.multiArray[1] = ['-请选择-','可持续金融部', '投资银行部', '现金管理部', '营销管理部', '机构业务部', '贸易金融部', '企金业务管理部', '风险管理部', '金融市场部'];
          break;
        case 1:
          data.multiArray[1] = ['-请选择-','电销部', '信贷部', '服务营业部客户','销售营业部产品'];
          break;
        case 2:
          data.multiArray[1] = ['其他'];
          break;
      }
      data.multiIndex[1] = 0;
    break;
  }
  data.multiValue = data.multiArray[0][data.multiIndex[0]] + ' - ' + data.multiArray[1][data.multiIndex[1]]
  that.setData({
    multiArrayObj:data
  });
}
// 行业职位
function fnIndustryPosition(){
  var data = {
    multiArray: [['银行', '公司', '其他'], ['-请选择-','可持续金融部', '投资银行部', '现金管理部', '营销管理部', '机构业务部', '贸易金融部','企金业务管理部','风险管理部','金融市场部']],
      multiIndex: [0, 0],
      multiValue: '',
    }
    return data
}

// 判断授权以及详细信息并进入对应页面
function fnBoolAutDelGo(e) {
  console.log(e)
  var userInfo = wx.getStorageSync('userInfo')
  var userDel = wx.getStorageSync('userDel')

  if (userInfo && userDel) {
    console.log(e.currentTarget.dataset.url)
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  }
  else {
    this.setData({
      shade: true,
      navigateToUrl: e.currentTarget.dataset.url
    })
  }
}

// 判断授权以及详细信息并进入对应页面
function fnBoolAutDelGoWithKind(e) {
  console.log(e)
  var userInfo = wx.getStorageSync('userInfo')
  var userDel = wx.getStorageSync('userDel')

  if (userInfo && userDel) {
    console.log(e.currentTarget.dataset.url)
    wx.navigateTo({
      url: e.currentTarget.dataset.url + '?' + this.data.type + '=' + this.data.type + '&id=' + this.data.pdId + '&num=' + this.data.num + '&clctCnt=' + this.data.clctCnt
    })
  }
  else {
    this.setData({
      shade: true,
      navigateToUrl: e.currentTarget.dataset.url + '?' + this.data.type + '=' + this.data.type + '&id=' + this.data.pdId + '&num=' + this.data.num + '&clctCnt=' + this.data.clctCnt
    })
  }
}

//收藏判断
function fnBoolAutDelGoWithCollection() {
  var userInfo = wx.getStorageSync('userInfo')
  var userDel = wx.getStorageSync('userDel')
  var userId = wx.getStorageSync('cstId')
  var that = this;
  if (userInfo && userDel) {
    if (this.data.collectionFlag == false) {
      wx.showLoading({
        title: '请稍等',
      })
      wx.request({
        url: app.globalData.ip + '/am/marketconference/wxapi/cfProductMgr/createCFPdClctInf',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'Accept': 'application/json'
        },
        data: {
          pdId: that.data.pdId,
          cstId: userId
        },
        success: function (res) {
          wx.hideLoading()
          if (res.data.status == '200') {
            that.setData({
              collectionImage: '../../../image/love-1-se.png',
              collectionFlag: true
            })
          }
          else {
            wx.showModal({
              title: '提示',
              content: '收藏产品失败，请稍后重试！',
              showCancel: false,
              confirmColor: '#587BFD'
            })
          }

        }
      })  
    }
    else {
      wx.showLoading({
        title: '请稍等',
      })
      wx.request({
        url: app.globalData.ip + '/am/marketconference/wxapi/cfProductMgr/delMyCFPdClctInf',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'Accept': 'application/json'
        },
        data: {
          pdId: that.data.pdId,
          cstId: userId
        },
        success: function (res) {
          wx.hideLoading()
          if (res.data.status == '200') {
            that.setData({
              collectionImage: '../../../image/love-1.png',
              collectionFlag: false
            })
          }
          else {
            wx.showModal({
              title: '提示',
              content: '收藏产品失败，请稍后重试！',
              showCancel: false,
              confirmColor: '#587BFD'
            })
          }

        }
      }) 
    }
    console.log('收藏成功啦！')
  }
  else {
    this.setData({
      shade: true,
      navigateToUrl: ''
    })
  }
}

//跳过填写详情
function fnCancel(that, success) {
  wx.showModal({
    title: '提示',
    content: '跳过该选项您后续将无法使用 “我的”、“推荐”、“预测”等相关功能',
    showCancel: false,
    confirmColor: '#587BFD',
    success: function () {
      that.setData({
        shade: false
      });
      if (success) {
        success()
      }
    }
  })
}


/**
 * urlStr 请求地址
 * data 参数
 * callback 回调函数
 */
function fnCommonRequest(urlStr, data, callback) {
  var that = this;
  var urlStr = app.globalData.ip + urlStr
  wx.showLoading({
    title: '请稍等',
  })
  wx.request({
    url: urlStr,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded', // 默认值
      'Accept': 'application/json'
    },
    data: data,
    success: callback
  })
}


module.exports = {
  fnTopBar: fnTopBar,
  fnNameEvent: fnNameEvent,
  fnPhoneNumEvent: fnPhoneNumEvent,
  fnCompanyEvent: fnCompanyEvent,
  fnPositionEvent: fnPositionEvent,
  userInfoHandler: userInfoHandler,
  fnBoolAutDelGo: fnBoolAutDelGo,
  fnBoolAutDelGoWithKind: fnBoolAutDelGoWithKind,
  fnCancel: fnCancel,
  fnBoolAutDelGoWithCollection: fnBoolAutDelGoWithCollection,
  fnCommonRequest: fnCommonRequest,
  bindMultiPickerColumnChange: bindMultiPickerColumnChange,
  fnIndustryPosition: fnIndustryPosition
}
