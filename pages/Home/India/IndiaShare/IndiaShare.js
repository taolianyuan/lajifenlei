const app = getApp();

Page({
   
  /**
   * 页面的初始数据   
   */


  data: {
    imgDomain: getApp().globalData.imgDomain,
    // bgImage: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/India/india_bg.png?sign=fb70fe797a07a60830f32c063edecef3&t=1557227046',

    // bgImage: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/food.png?sign=cb5f8d6a16386b020fcd48a571dcc31e&t=1558694016',
   
    wechat: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/India/india_wechat.png?sign=42a7b7d6811fc5b79fedecba2a414fb9&t=1557226005',
    
    save: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/pyq.png?sign=bebc2b210250540e3751a8785a0e8298&t=1558695470',

    saves: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/pyq.png?sign=bebc2b210250540e3751a8785a0e8298&t=1558695470',

    shareBg: 'https://img.jishantech.com/common/waste_temporary/分享.png',


    QCR: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/India/350c1ac052b1eb566f735118d13c142.jpg?sign=d7ffe94511677e7fcd3946d0c814d145&t=1558776602',
    photoUrl: '',
    saveImgUrl: '',
    index:2
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
     var photoUrl = options.photoUrl;
    this.setData({
      photoUrl,
      index :options.index
    })
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function(options) {
  //   console.log()
  //   const that = this;
  //   var index= that.data.index
   
  //   var encodeURL = encodeURI(URL);
  //   var shareImage = encodeURL;
  //   // console.log(shareImage, 'shareImage')
  //   if (options.from == 'button') {
  //     //点击按钮分享
  //     const isfrom = that.data.isfrom;
  //      var shareObject = {};
  //     // if (index == 1) {
  //       shareObject.title = "干湿分离双层垃圾桶";
  //       shareObject.imageUrl ="https://img.jishantech.com/common/waste_temporary/分享.png";
  //       shareObject.path = "/pages/Home/Classes/Lesson/Lesson";
  //     // }

  //     // else{
  //     //   shareObject.title = "印度美食线下课程";
  //     //   shareObject.imageUrl = "https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/food.png?sign=cb5f8d6a16386b020fcd48a571dcc31e&t=1558694016";
  //     //   shareObject.path = "/pages/Home/Classes/Lesson/Lesson";
  //     // } 
  //   }
  //   return shareObject;
  // },
  onShareAppMessage: function (options){
    return {
      title: "干湿分离双层垃圾桶",
      path: 'pages/Home/Classes/Lesson/Lesson',
      success: function (res) {
        //console.log(res, "123")
      }
    }
  },



  saves:function(){
    var _this = this;
    const downloadTask = wx.downloadFile({
      //url: wx.getStorageSync('indiaSaveImg'),
      url: "https://img.jishantech.com/common/waste_temporary/分享.png",
      success: function (res) {
        console.log(res)
        if (res.statusCode === 200) {
          _this.saveToPhotosAlbum(res.tempFilePath)
        }
      }
    })
  },

  // save: function() {
  //   var _this = this;
  //   const downloadTask = wx.downloadFile({
  //     //url: wx.getStorageSync('indiaSaveImg'),
  //     url:"https://7465-test-9cd88e-1258312722.tcb.qcloud.la/India/fx.jpg?sign=1c9a0d419d66cb46e16f36f113145614&t=1558777642",
  //     success: function(res) {
  //       console.log(res)
  //       if (res.statusCode === 200) {
  //         _this.saveToPhotosAlbum(res.tempFilePath)
  //       }
  //     }
  //   })
  // },


  saveToPhotosAlbum: function(tempFilePath) {
    var that = this;
    if (!this.data.isDown) {
      that.setData({
        isDown: true
      })
      wx.saveImageToPhotosAlbum({
        filePath: tempFilePath,
        success(res) {
          wx.showToast({
            title: '保存图片成功',
            icon: 'success',
            success: function() {
              setTimeout(() => {
                wx.navigateBack();
              }, 1500)
            }
          })
        },
        fail: function(res) {
          wx.hideLoading();
          if (res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                // 授权成功
                wx.saveImageToPhotosAlbum({
                  filePath: that.data.tempFilePath,
                  success() {
                    app.func.setMask({
                      message: '图片保存成功',
                      bg: 'success'
                    }, that)
                    return
                  }
                })
              },
              fail: function() {
                // 授权失败
                wx.showModal({
                  title: '警告',
                  content: '您点击了拒绝授权,将无法正常保存图片,点击确定重新获取授权。',
                  success: function(res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success: (res) => {
                          console.log('授权成功')
                        }
                      })
                    }
                  }
                })
              }
            })
          }

        }
      })
    }
    // wx.previewImage({
    //   urls: [this.data.shareImage]
    // })
  },
})