// pages/wws/wws.js


var windowWidth = 0
var windowHeight = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    windowWidth:0,
    windowHeight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth)
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        })
      },
    })
   
    this.setData({
    
      aa: "1111111111111111"
    })
  

    let promise1 = new Promise(function (resolve, reject) {
      console.log("11")
      wx.getImageInfo({
        src: 'https://csdnimg.cn/pubfooter/images/edu-QR.png',
        success: function (res) {
          console.log(res)
          resolve(res);
        }
      })
    });
    let promise2 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/bgs.png?sign=c762c2903686f6ab1afacd187d140f4a&t=1561370186',
        success: function (res) {
          console.log(res)
          resolve(res);
        }
      })
    });
    Promise.all([
      promise1, promise2
    ]).then(res => {
      console.log(res)
      const ctx = wx.createCanvasContext('shareImg')
        
      //主要就是计算好各个图文的位置

      ctx.drawImage(res[1].path, 0, 0, windowWidth, windowHeight)

      ctx.drawImage(res[0].path, 158, 190, 210, 210)



  
      ctx.setTextAlign('center')
      ctx.setFillStyle('#ffffff')
      ctx.setFontSize(22)
      ctx.fillText(this.data.aa, 545 / 2, 130)
      ctx.fillText('分享文字描述2', 545 / 2, 160)

      ctx.stroke()
      ctx.draw()
    })
  },


  /**
   * 生成分享图
  */
  share: function () {
    var that = this
    wx.showLoading({
      title: '努力生成中...'
    })
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 545,
      height: 771,
      destWidth: 545,
      destHeight: 771,
      canvasId: 'shareImg',
      success: function (res) {
        console.log(res.tempFilePath);
        that.setData({
          prurl: res.tempFilePath,
          hidden: false
        })
        wx.hideLoading()
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },


  /**
   * 保存到相册
  */
  save: function () {
    var that = this
    //生产环境时 记得这里要加入获取相册授权的代码
    wx.saveImageToPhotosAlbum({
      filePath: that.data.prurl,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好哒',
          confirmColor: '#72B9C3',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              that.setData({
                hidden: true
              })
            }
          }
        })
      }
    })

  }
})