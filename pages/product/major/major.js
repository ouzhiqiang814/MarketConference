// pages/product/major/major.js
const app = getApp()
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
    items: null
  },
  onLoad: function(option) {
    var that = this;
    common.fnTopBar(that, option.type + '产品介绍', '../../../image/back.png', 'fnGoBack');
    this.setData({
      type: option.type
    })
    console.log(this.data.items)

    // 获取产品列表
    var that = this;
    var dataArr = {
      blngPdLnId: option.id
    }
    common.fnCommonRequest('/am/marketconference/wxapi/cfProductMgr/findCFPdBaseInfList', dataArr, function (res) { that.fnInitData(res) })   
  },
  // 加载数据
  fnInitData:function(res){
    var resArr = []
    wx.hideLoading()
    if (res.data.status == '200') {
      console.log(res)
      for (let i = 0, len = res.data.data.length;i<len;i++){
        resArr.push({
          pdId: res.data.data[i].pdId,
          pdNm: res.data.data[i].pdNm,
          pdSmy: res.data.data[i].pdSmy,
          picIcon:'',
          picDel:[]   
        })
        if (res.data.data[i].cfPdPicInfVOS){
          for (let j = 0, lenth = res.data.data[i].cfPdPicInfVOS.length; j < lenth;j++){
            if (res.data.data[i].cfPdPicInfVOS[j].picTp == 'icon'){
              resArr[i].picIcon = app.globalData.ip + '/am/' + res.data.data[i].cfPdPicInfVOS[j].picAdr
            }
            else{
              resArr[i].picDel.push({
                cfPdPicInfVOS: app.globalData.ip + '/am/' + res.data.data[i].cfPdPicInfVOS[j].picAdr
              })
            }
          }
        }
      }
      console.log(resArr)

      this.setData({
        items: resArr
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
  // 返回关于我们
  fnGoBack: function() {
    wx.switchTab({
      url: '../../aboutUs/aboutUs'
    })
  },
  // 查看详情
  fnGoDetils: function(e) {
    console.log('查看详情')
    console.log(e)
    var id = e.currentTarget.dataset.id;
    var type_kind = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../detil/detil?type=' + this.data.type + '&type_kind=' + type_kind + '&id=' + id
    })
  }

})