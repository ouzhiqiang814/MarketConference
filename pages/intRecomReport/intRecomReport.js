// pages/intRecomReport/intRecomReport.js
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
    reportDetil: ['应用于数据分析驱动能力不足应用于数据分析驱动能力不足应用', '转筒业务转型困难', '智能数据收集混乱，无法使用'],
    items: [{
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
      {
        id: '信贷储蓄',
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
        id: '信贷储蓄',
        src: '../../image/tpt.jpg',
        title: '标题一',
        text: '标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一'
      }, {
        id: '信贷储蓄',
        src: '../../image/tpt.jpg',
        title: '标题一',
        text: '标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一'
      }, {
        id: '信贷储蓄',
        src: '../../image/tpt.jpg',
        title: '标题一',
        text: '标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一'
      }, {
        id: '信贷储蓄',
        src: '../../image/tpt.jpg',
        title: '标题一',
        text: '标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一'
      }, {
        id: '信贷储蓄',
        src: '../../image/tpt.jpg',
        title: '标题一',
        text: '标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一'
      }
    ],
    userImg:'',
    userName:'张某某',
    time:'2018-08-27 23:59'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    common.fnTopBar(that, '请查收您的调查报告', '../../image/back.png', 'fnGoBack')

    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userImg: userInfo.avatarUrl
    })
    // var scene = decodeURIComponent(options.scene)
    // console.log(scene)

    // wx.showShareMenu({
    //   withShareTicket:true
    // })
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
      },
    })

    // 获取窗口信息
    console.log(wx.getSystemInfoSync())
    this.setData({
      canvasWidth: wx.getSystemInfoSync().windowWidth - 80,
      canvasHeight: wx.getSystemInfoSync().windowHeight - 250
    })
  },
  // 返回上一页
  fnGoBack:function(){
    wx.switchTab({
      url: '../intRecom/intRecom'
    })
  },
  // 查看详情
  fnGoDetils: function (e) {
    console.log('查看详情')
    console.log(e)
    var type_kind = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../product/detil/detil?type=' + this.data.type + '&type_kind=' + type_kind
    })
  },
// 生成图片
  fnSharePic:function(){
    var that =this;
    const ctx = wx.createCanvasContext('shareCanvas');
    var imgPath = '../../image/qcode.png';
    var bgImgPath = '../../image/ho.png';
    var posterHeight = 0
    var posterWidth = 0
    var avatarPadding = 0 //距离边界
    var avatarRadiu = 0 //头像半径
    var textScale = 0 //文字比例
    wx.getSystemInfo({
      success: function (res) {
        posterWidth = wx.getSystemInfoSync().windowWidth - 60, 
        posterHeight = wx.getSystemInfoSync().windowHeight - 250
      }
    })

    // 下载头像到本地
    // wx.downloadFile({
    //   url: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTItqgQbKXGUoIog5f2sZYuArnESdowhSZIwAVic0eqHlkQPjkVzSVsAYo1ickTnBiahIgK9wCTm3Jgicg/132',
    //   success:function(res){
    //     if (res.statusCode === 200){
    //       that.setData({
    //         filePath: res.tempFilePath
    //       })
    //     }
    //   }
    // })

    // 绘制头像
    ctx.save();
    ctx.beginPath(); //开始绘制
    ctx.arc((posterWidth * 0.17) / 2 + (posterWidth * 0.417), (posterWidth * 0.17) / 2 + (posterHeight*0.064), (posterWidth * 0.17) / 2, 0, Math.PI * 2, false);
    ctx.clip();
    ctx.drawImage(bgImgPath, posterWidth * 0.417, posterHeight * 0.064, posterWidth * 0.17, posterWidth * 0.17); 
    ctx.restore(); 

    // 添加用户信息
    ctx.setFontSize(16);
    ctx.setFillStyle('#333333');
    ctx.fillText(that.data.userName, (posterWidth - ctx.measureText(that.data.userName).width) / 2,posterHeight*0.23);
    
    ctx.setFontSize(12);
    ctx.setFillStyle('#999999');
    ctx.fillText(that.data.time, (posterWidth - ctx.measureText(that.data.time).width) / 2, posterHeight * 0.27);

    // 添加报告
    ctx.setFontSize(18);
    ctx.setFillStyle('#5b93f3');
    ctx.fillText('您的调查情况：', posterWidth*0.1, posterHeight * 0.38);
    var a =0;
    for (var j = 0, len = that.data.reportDetil.length;j<len;j++){
      for (var i = 1; that.getTrueLength(that.data.reportDetil[j]) > 0; i++) {
        ctx.beginPath()
        ctx.arc((posterWidth * 0.02) / 2 + (posterWidth * 0.16), (posterWidth * 0.02) / 2 + (posterHeight * 0.44) + 30*j, (posterWidth * 0.02) / 2, 0, Math.PI * 2, false)
        ctx.setFillStyle('#5b93f3')
        ctx.fill()
        var he = posterHeight * 0.415 + 22 * i 
        console.log(a)
        console.log(he  + j * 10)
        console.log(that.data.reportDetil[j])
        
        ctx.setFontSize(14);
        ctx.setFillStyle('#666666');
        var tl = that.cutString(that.data.reportDetil[j], posterWidth * 0.1);
        ctx.fillText(that.data.reportDetil[j].substr(0, tl), posterWidth * 0.2, he + j*10);// 把文字添加到canvas上
        that.data.reportDetil[j] = that.data.reportDetil[j].substr(tl);
        a++;
      }
      
    }








    ctx.draw(); //可将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中

      // wx.canvasToTempFilePath({
      //   x: 0,
      //   y: 0,
      //   width: 600,
      //   height: 450,
      //   destWidth: 600,
      //   destHeight: 450,
      //   canvasId: 'shareCanvas',
      //   success: function (res) {
      //     console.log(res.tempFilePath);
      //     that.setData({
      //       shareImgSrc: res.tempFilePath
      //     })

      //   },
      //   fail: function (res) {
      //     console.log(res)
      //   }
      // })
  },

// 分享
  fnShare:function(){
    var that= this
    // wx.request({
    //   url: 'https://api.weixin.qq.com/cgi-bin/token',
    //   success:function (res){
    //     this.setData({
    //       access_token: res.access_token
    //     })
    //   }
    // })

    wx.showLoading({
      title: '正在生成图片...',
      mask: true,
    });
    
    var imgPath = '../../image/qcode.png'
    var bgImgPath = '../../image/tpt.jpg';
    ctx.drawImage(imgPath, 0, 0, 100, 100);

    // ctx.setFillStyle('white')
    // ctx.fillRect(0, 520, 600, 280);

    ctx.drawImage(imgPath, 200 ,0, 60, 60);
    ctx.drawImage(bgImgPath, 0, 0, 200, 220);
    ctx.drawImage(imgPath, 410, 610, 160, 160);

    ctx.setFontSize(28)
    ctx.setFillStyle('#6F6F6F')
    ctx.fillText('妖妖灵', 20, 50)

    // ctx.setFontSize(30)
    // ctx.setFillStyle('#111111')
    // ctx.fillText('宠友们快来围观萌宠靓照', 30, 110)
    // ctx.fillText('我在萌爪幼稚园', 30, 120)

    // ctx.setFontSize(24)
    // ctx.fillText('长按扫码查看详情', 30, 120)
    ctx.draw()
    setTimeout(function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 600,
        height: 450,
        destWidth: 600,
        destHeight: 450,
        canvasId: 'shareCanvas',
        success: function (res) {
          console.log(res.tempFilePath);
          that.setData({
            shareImgSrc: res.tempFilePath
          })

        },
        fail: function (res) {
          console.log(res)
        }
      })

      wx.saveImageToPhotosAlbum({
        filePath: that.data.shareImgSrc,
        success(res) {
          wx.showModal({
            title: '存图成功',
            content: '图片成功保存到相册了，去发圈噻~',
            showCancel: false,
            confirmText: '好哒',
            confirmColor: '#72B9C3',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定');
              }
              // that.hideShareImg()
            }
          })
        }
      })
      wx.hideLoading();
    },2000)
    
  }
  ,       
   //获取字符串的真实长度（字节长度）
  getTrueLength:function(str){
    var len = str.length, truelen = 0;
    for(var x = 0; x<len; x++){
  if (str.charCodeAt(x) > 128) {
    truelen += 2;
  } else {
    truelen += 1;
  }
}
return truelen;
},


//按字节长度截取字符串，返回substr截取位置  
cutString:function(str, leng) {
  var len = str.length, tlen = len, nlen = 0;
  for (var x = 0; x < len; x++) {
    if (str.charCodeAt(x) > 128) {
      if (nlen + 2 < leng) {
        nlen += 2;
      } else {
        tlen = x;
        break;
      }
    } else {
      if (nlen + 1 < leng) {
        nlen += 1;
      } else {
        tlen = x;
        break;
      }
    }
  }
  return tlen;
}
})