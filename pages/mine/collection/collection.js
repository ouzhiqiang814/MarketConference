// pages/mine/collection/collection.js
const app = getApp();
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
    flag: true,
    collectionText:'管理收藏',
    items: [],
    delpkId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    common.fnTopBar(that, '我的收藏', '../../../image/back.png', 'fnGoBack')

    // 获取产品列表
    var that = this;
    var dataArr = {
      cstId: wx.getStorageSync('cstId')
    }
    common.fnCommonRequest('/am/marketconference/wxapi/cfProductMgr/findMyCFPdClctInf', dataArr, function (res) { that.fnInitData(res) });   

  },
  // 加载数据
  fnInitData:function(res){
    var itemsArr = [];
    wx.hideLoading()
    if (res.data.status == '200') {
      console.log(res)
      for (let i = 0, len = res.data.data.length; i < len; i++) {
        itemsArr.push({
          pdId: res.data.data[i].pdId,
          pdNm: res.data.data[i].pdNm,
          pdSmy: res.data.data[i].pdSmy,
          pkId: res.data.data[i].pkId
        })
      }
      this.setData({
        items: itemsArr
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
  // 返回函数
  fnGoBack: function () {
    wx.navigateBack({
      url: '../../aboutUs/aboutUs'
    })
  },
  // 查看详情
  fnGoDetils: function (e) {
    var id = e.currentTarget.dataset.id
    var type_kind = e.currentTarget.dataset.name;
    var type = '';
    wx.navigateTo({
      url: '../../product/detil/detil?type=' + type + '&type_kind=' + type_kind + '&id=' + id,
    })
  },
  // 管理收藏
  fnGoDel:function(){
    if (this.data.flag == true){ 
      this.setData({
        flag: false,
        collectionText: '完成'
      })
    }
    else{
      this.setData({
        flag: true,
        collectionText:'管理收藏'
      }) 
    }

  },
  // 删除
  fnDel:function(e){
    var that = this;

    var urlStr = app.globalData.ip + '/am/marketconference/wxapi/cfProductMgr/delMyCFPdClctInf';
    this.setData({
      delpkId: e.currentTarget.dataset.id
    })
    wx.showModal({
      title: '提示',
      content: '确定要删除该条收藏？',
      confirmColor:'#587BFD',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var dataArr = {
            pkId: e.currentTarget.dataset.id
          }
          common.fnCommonRequest('/am/marketconference/wxapi/cfProductMgr/delMyCFPdClctInf', dataArr, function (res) { that.fnDelData(res) })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    }) 
  },
  // 删除回调
  fnDelData:function(res){
    var itemsArr = [];
    var len = this.data.items.length
    wx.hideLoading()
    if (res.data.status == '200') {
      console.log(res)
      var that = this;
      var dataArr = {
        cstId: wx.getStorageSync('cstId')
      }
      common.fnCommonRequest('/am/marketconference/wxapi/cfProductMgr/findMyCFPdClctInf', dataArr, function (res) { that.fnInitData(res) }); 
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
  // 页面展示时
  onShow:function(){
    var that = this;
    var dataArr = {
      cstId: wx.getStorageSync('cstId')
    }
    common.fnCommonRequest('/am/marketconference/wxapi/cfProductMgr/findMyCFPdClctInf', dataArr, function (res) { that.fnInitData(res) }); 
  }
})