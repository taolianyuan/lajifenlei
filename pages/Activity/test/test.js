// pages/Activity/test/test.js

import {
  ImgSingleGuoChaoUser
} from '../../../api/api.js'

var app = getApp();

var value = '';

var actId = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc: '',
    userImage: '',
    // code: 'http://img.jishantech.com/guochao/template_img/erweima.png',
    value: '',
    width: 0,
    height: 0,
    lastImage: '',
    width1: 0,
    height1: 0,
    btnIsShow: true,
    actId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    actId = options.actId;
    this.setData({
      actId
    })

    var that = this;

    this.setData({
      imageSrc: app.globalData.imgUrl,
      userImage: app.globalData.userImage,
      value: app.globalData.usersText
    })

    // console.log(app.globalData.imgUrl,'why???????????')
    // console.log(app.globalData.userImage)



   
    if (Number(actId) === 3){
      that.activity();
    } else if (Number(actId) === 7){
      that.valentineActivity();

    }
    
  },

  valentineActivity: function(){
    var that = this;
    const ctx = wx.createCanvasContext('canvas')

    if (app.globalData.userCurrent === 0){

      wx.getImageInfo({
        src: app.globalData.userImage,
        success: function (res) {
          console.log(res, 'app.globalData.userImage的res信息')
          var width1 = res.width;
          var height1 = res.height;
          var ratio = width1 / height1;
          var showWidth = 300;
          var showHeight = 400;
          that.setData({
            width1: showWidth,
            height1: showHeight
          })
        }
      })


      wx.showLoading({
        title: '正在生成图片~',
        icon: 'none'
      })

      ctx.beginPath();


      // console.log(app.globalData.imgUrl,'-----------')


      var promise1 = new Promise(function (resolve, reject) {
        wx.downloadFile({
          url: app.globalData.imgUrl,
          success(res) {
            console.log(res, '------------------')
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              resolve(res)
            }
          }
        })
      })


      promise1.then(res => {
        ctx.beginPath();
        console.log(res.tempFilePath, '-----------')
        ctx.drawImage(app.globalData.userImage, 0, 0, that.data.width1, that.data.height1);
        ctx.save();

        ctx.drawImage(res.tempFilePath, 0, 0, 300, 533);
        ctx.save();
        // ctx.draw(true);

       
        // 设置字体颜色
        ctx.setFillStyle("#F3409D");

        if (app.globalData.usersText.length === 1){
          ctx.setFontSize(16);
          that.drawTextVertical(ctx, app.globalData.usersText, 252, 480)
         
        }else{
          ctx.setFontSize(15);
          that.drawTextVertical(ctx, app.globalData.usersText, 252, 470)
          
        }
        
        ctx.save();
        ctx.draw(true);

        return new Promise(function (resolve, reject) {
          wx.downloadFile({
            url: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/activity/Valentine-activity/lover.jpg?sign=65a5caf4aa87cdeb398d80f748d692c9&t=1549890970',
            success: function (res) {
              resolve(res);
            }
          })
        })
      }).then(res => {
        ctx.beginPath();
        ctx.drawImage(res.tempFilePath, 20, 435, 60, 60);
        ctx.save();
        ctx.draw(true);


        setTimeout(function () {
          wx.hideLoading();
          that.setData({
            btnIsShow: false
          })
        }, 100)

      })

    } else if (app.globalData.userCurrent === 1){

      wx.getImageInfo({
        src: app.globalData.userImage,
        success: function (res) {
          console.log(res, 'app.globalData.userImage的res信息')
          var width1 = res.width;
          var height1 = res.height;
          var ratio = width1 / height1;

          if (width1 > height1) {
            var viewWidth = 215,
              viewHeight = 215 / ratio;
              that.setData({
                width1: viewWidth,
                height1: viewHeight
              })
          } else {
            var viewHeight = 215,
              viewWidth = 215;
            that.setData({
              width1: viewWidth,
              height1: viewHeight
            })
          }

          // var showWidth = 300;
          // var showHeight = 300 / ratio;
         
        }
      })


      wx.showLoading({
        title: '正在生成图片~',
        icon: 'none'
      })

      ctx.beginPath();
      ctx.rotate(335 * Math.PI / 180)
      // ctx.transform(0,0,0,0,0,0);
      ctx.drawImage(app.globalData.userImage, -65, 115, 215, 215);
      ctx.rotate(25 * Math.PI / 180)


      var promise1 = new Promise(function (resolve, reject) {
        wx.downloadFile({
          url: app.globalData.imgUrl,
          success(res) {
            console.log(res, '------------------')
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              resolve(res)
            }
          }
        })
      })

      promise1.then(res => {
        ctx.beginPath();
        console.log(res.tempFilePath, '-----------')
        ctx.drawImage(res.tempFilePath, 0, 0, 300, 533);
        ctx.save();
        ctx.draw(true);

        // 设置字号
       
        // 设置字体颜色
        ctx.setFillStyle("#F3409D");

        if (app.globalData.usersText.length === 1){
          ctx.setFontSize(17);
          that.drawTextVertical(ctx, app.globalData.usersText, 273, 470)
        }else{
          ctx.setFontSize(15);
          
          that.drawTextVertical(ctx, app.globalData.usersText, 273, 463)
        }
        
        ctx.draw(true);

        return new Promise(function (resolve, reject) {
          wx.downloadFile({
            url: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/activity/Valentine-activity/lover.jpg?sign=65a5caf4aa87cdeb398d80f748d692c9&t=1549890970',
            success: function (res) {
              resolve(res);
            }
          })
        })
      }).then(res => {
        ctx.drawImage(res.tempFilePath, 13, 436, 60, 60);
        ctx.draw(true);
        setTimeout(function () {
          wx.hideLoading();
          that.setData({
            btnIsShow: false
          })
        }, 100)
      })

      
    } else if (app.globalData.userCurrent === 2){
      wx.showLoading({
        title: '正在生成图片~',
        icon: 'none'
      })

      ctx.beginPath();
      ctx.rotate(345 * Math.PI / 180)
      // ctx.transform(0,0,0,0,0,0);
      ctx.drawImage(app.globalData.userImage, 0, 120, 230, 230);
      ctx.rotate(15 * Math.PI / 180)


      var promise1 = new Promise(function (resolve, reject) {
        wx.downloadFile({
          url: app.globalData.imgUrl,
          success(res) {
            console.log(res, '------------------')
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              resolve(res)
            }
          }
        })
      })

      promise1.then(res => {
        ctx.beginPath();
        console.log(res.tempFilePath, '-----------')
        ctx.drawImage(res.tempFilePath, 0, 0, 300, 533);
        ctx.save();
        ctx.draw(true);

        // 设置字号
        
        // 设置字体颜色
        ctx.setFillStyle("#F3409D");
        if (app.globalData.usersText.length === 1){
          ctx.setFontSize(19);
          ctx.fillText(app.globalData.usersText, 168, 70)
        }else{
          ctx.setFontSize(17);
          ctx.fillText(app.globalData.usersText, 160, 70)
        }

       

        // if (app.globalData.usersText.length === 1) {
        //   ctx.setFontSize(17);
        //   that.drawTextVertical(ctx, app.globalData.usersText, 273, 470)
        // } else {
        //   ctx.setFontSize(15);

        //   that.drawTextVertical(ctx, app.globalData.usersText, 273, 463)
        // }

        ctx.draw(true);

        return new Promise(function (resolve, reject) {
          wx.downloadFile({
            url: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/activity/Valentine-activity/lover.jpg?sign=65a5caf4aa87cdeb398d80f748d692c9&t=1549890970',
            success: function (res) {
              resolve(res);
            }
          })
        })
      }).then(res => {
        ctx.drawImage(res.tempFilePath, 122, 450, 55, 55);
        ctx.draw(true);
        setTimeout(function () {
          wx.hideLoading();
          that.setData({
            btnIsShow: false
          })
        }, 100)
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindblur: function(e){
    value = e.detail.value;
  },

  handleClick: function(){

    var that = this;

    // wx.showLoading({
    //   title: '生成图片中……',
    //   icon: 'loading',
    //   duration: 1000
    // })

    setTimeout(function(){
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 300,
        height: 533,
        destWidth: 750,
        destHeight: 1334,
        fileType: 'jpg',
        quality: 1,
        canvasId: 'canvas',
        success: function (res) {

          console.log(res, '生成图片成功的回调')


          // app.globalData.userImage = res.tempFilePath
          // wx.hideLoading();
          // 成功获得地址的地方
          // wx.previewImage({
          //   current: '', // 当前显示图片的http链接
          //   urls: [res.tempFilePath] // 需要预览的图片http链接列表
          // })

          console.log(res.tempFilePath, '===========')
          var path = res.tempFilePath;
          ImgSingleGuoChaoUser({
            filePath: path,
            success: function (res){
              var data = JSON.parse(res.data)
              if(data.code ===1){
                that.setData({
                  lastImage: path
                })
              }else{
                wx.showToast({
                  title: '图片不符合规定，请重试~',
                  icon: 'none'
                })
              }
              // console.log(res,'ImgSingleGuoChaoUser')
            }
          })
     
          // wx.navigateBack({
          //   delta: 1
          // })
        }
      })
    },100)
 
  },


  drawTextVertical: function (context, text, x, y) {
    
    var arrText = text.split('');
    var arrWidth = arrText.map(function (letter) {
      return 20;
      // 这里为了找到那个空格的 bug 做了许多努力，不过似乎是白费力了
      // const metrics = context.measureText(letter);
      // console.log(metrics);
      // const width = metrics.width;
      // return width;
    });

    var align = context.textAlign;
    var baseline = context.textBaseline;

    if(align == 'left') {
  x = x + Math.max.apply(null, arrWidth) / 2;
} else if (align == 'right') {
  x = x - Math.max.apply(null, arrWidth) / 2;
}
if (baseline == 'bottom' || baseline == 'alphabetic' || baseline == 'ideographic') {
  y = y - arrWidth[0] / 2;
} else if (baseline == 'top' || baseline == 'hanging') {
  y = y + arrWidth[0] / 2;
}

context.textAlign = 'center';
context.textBaseline = 'middle';

// 开始逐字绘制
arrText.forEach(function (letter, index) {
  // 确定下一个字符的纵坐标位置
  var letterWidth = arrWidth[index];
  // 是否需要旋转判断
  var code = letter.charCodeAt(0);
  if (code <= 256) {
    context.translate(x, y);
    // 英文字符，旋转90°
    context.rotate(0 * Math.PI / 180);
    context.translate(-x, -y);
  } else if (index > 0 && text.charCodeAt(index - 1) < 256) {
    // y修正
    y = y + arrWidth[index - 1] / 2;
  }
  context.fillText(letter, x, y);
  // 旋转坐标系还原成初始态
  context.setTransform(1, 0, 0, 1, 0, 0);
  // 确定下一个字符的纵坐标位置
  var letterWidth = arrWidth[index];
  y = y + letterWidth;
});
// 水平垂直对齐方式还原
context.textAlign = align;
context.textBaseline = baseline;
},


  shareToFriend: function(){
    var that = this;
    // const wxSaveImageToPhotosAlbum = promisify(wx.saveImageToPhotosAlbum);
    var promise = new Promise(function(resolve,reject){
      wx.saveImageToPhotosAlbum({
        filePath: that.data.lastImage,
        success: function(res){
          wx.showToast({
            title: '已保存到相册',
            icon: 'none',
            success: function(){
              setTimeout(function(){
                wx.navigateBack({
                  delta: 2
                })
              },500)
            }
          })
        }
      })
    })
    // promise.then(res =>{
    //   wx.showToast({
    //     title: '已保存到相册'
    //   })
    // })
  },

  activity: function(){
    var that = this;

    const ctx = wx.createCanvasContext('canvas')

    if (app.globalData.userCurrent === 0) {

      wx.getImageInfo({
        src: app.globalData.userImage,
        success: function (res) {
          console.log(res, 'app.globalData.userImage的res信息')
          var width1 = res.width;
          var height1 = res.height;
          var ratio = width1 / height1;
          var showWidth = 300;
          var showHeight = 300 / ratio;
          that.setData({
            width1: showWidth,
            height1: showHeight
          })
        }
      })


      wx.showLoading({
        title: '正在生成图片~',
        icon: 'none'
      })

      ctx.beginPath();


      // console.log(app.globalData.imgUrl,'-----------')


      var promise1 = new Promise(function (resolve, reject) {
        wx.downloadFile({
          url: app.globalData.imgUrl,
          success(res) {
            console.log(res, '------------------')
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              resolve(res)
            }
          }
        })
      })


      promise1.then(res => {
        ctx.beginPath();
        console.log(res.tempFilePath, '-----------')
        ctx.drawImage(app.globalData.userImage, 0, 0, that.data.width1, that.data.height1);
        ctx.save();

        ctx.drawImage(res.tempFilePath, 0, 0, 300, 533);
        ctx.save();
        // ctx.draw(true);

        ctx.setFontSize(15);
        // 设置字体颜色
        ctx.setFillStyle("#333333");

        that.drawTextVertical(ctx, app.globalData.usersText, 40, 300)
        ctx.save();
        ctx.draw(true);

        return new Promise(function (resolve, reject) {
          wx.downloadFile({
            url: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/activity/erweima.jpg?sign=43bc437f8d88819dffcc3d896e6ae4d5&t=1549017275',
            success: function (res) {
              resolve(res);
            }
          })
        })
      }).then(res => {
        ctx.beginPath();
        ctx.drawImage(res.tempFilePath, 217, 450, 60, 60);
        ctx.save();
        ctx.draw(true);


        setTimeout(function () {
          wx.hideLoading();
          that.setData({
            btnIsShow: false
          })
        }, 100)

      })
    } else if (app.globalData.userCurrent === 1) {

      wx.getImageInfo({
        src: app.globalData.userImage,
        success: function (res) {
          console.log(res, 'app.globalData.userImage的res信息')
          var width1 = res.width;
          var height1 = res.height;
          var ratio = width1 / height1;
          var showWidth = 300;
          var showHeight = 300 / ratio;
          that.setData({
            width1: showWidth,
            height1: showHeight
          })
        }
      })


      wx.showLoading({
        title: '正在生成图片~',
        icon: 'none'
      })

      ctx.beginPath();
      ctx.rotate(345 * Math.PI / 180)
      // ctx.transform(0,0,0,0,0,0);
      ctx.drawImage(app.globalData.userImage, -75, 100, 300, 300);
      ctx.rotate(15 * Math.PI / 180)


      var promise1 = new Promise(function (resolve, reject) {
        wx.downloadFile({
          url: app.globalData.imgUrl,
          success(res) {
            console.log(res, '------------------')
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              resolve(res)
            }
          }
        })
      })

      promise1.then(res => {
        ctx.beginPath();
        console.log(res.tempFilePath, '-----------')
        ctx.drawImage(res.tempFilePath, 0, 0, 300, 533);
        ctx.save();
        ctx.draw(true);

        // 设置字号
        ctx.setFontSize(15);
        // 设置字体颜色
        ctx.setFillStyle("#9a1d36");

        that.drawTextVertical(ctx, app.globalData.usersText, 279, 205)
        ctx.draw(true);

        return new Promise(function (resolve, reject) {

          wx.downloadFile({
            url: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/activity/second-logo.png?sign=c226604c5df2ac66990d8172eb442be9&t=1548746082',
            success(res) {
              console.log(res, '------------------')
              // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
              if (res.statusCode === 200) {
                resolve(res)
              }
            }
          })
        })
      }).then(res => {
        ctx.beginPath();
        console.log(res.tempFilePath, '-----------')
        ctx.drawImage(res.tempFilePath, 120, 305, 60, 140);
        ctx.save();
        ctx.draw(true);

        return new Promise(function (resolve, reject) {
          wx.downloadFile({
            url: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/activity/erweima.jpg?sign=43bc437f8d88819dffcc3d896e6ae4d5&t=1549017275',
            success: function (res) {
              resolve(res);
            }
          })
        })
      }).then(res => {
        ctx.drawImage(res.tempFilePath, 120, 445, 60, 60);
        ctx.draw(true);
        setTimeout(function () {
          wx.hideLoading();
          that.setData({
            btnIsShow: false
          })
        }, 100)
      })


    } else if (app.globalData.userCurrent === 2) {

      wx.showLoading({
        title: '正在生成图片~',
        icon: 'none'
      })

      ctx.beginPath();


      var promise1 = new Promise(function (resolve, reject) {
        wx.downloadFile({
          url: app.globalData.imgUrl,
          success(res) {
            console.log(res, '------------------')
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              resolve(res);
            }
          }
        })
      })

      promise1.then(res => {
        ctx.beginPath();

        ctx.drawImage(app.globalData.userImage, 50, 120, 210, 210);
        ctx.save();

        console.log(res.tempFilePath, '-----------')
        ctx.drawImage(res.tempFilePath, 0, 0, 300, 533);
        ctx.save();
        ctx.draw(true);
        // 设置字号
        ctx.setFontSize(11);
        // 设置字体颜色
        ctx.setFillStyle("#C88749");

        that.drawTextVertical(ctx, app.globalData.usersText, 123, 347)
        ctx.draw(true);

        return new Promise(function (resolve, reject) {
          wx.downloadFile({
            url: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/activity/erweima.jpg?sign=43bc437f8d88819dffcc3d896e6ae4d5&t=1549017275',
            success(res) {
              console.log(res, '------------------')
              // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
              if (res.statusCode === 200) {
                resolve(res);
              }
            }
          })
        })

      }).then(res => {
        ctx.drawImage(res.tempFilePath, 237, 443, 60, 60);
        ctx.draw(true);

        setTimeout(function () {
          wx.hideLoading();
          that.setData({
            btnIsShow: false
          })
        }, 100)
      })
    }
    ctx.closePath();
  }

})