// pages/Activity/createPic/createPic.js


import {
  ImgSingleGuoChao,
  CheckContent
} from '../../../api/api.js'

var app = getApp();

var actId = 0;

var usersText = '';

var url = 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/activity/'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.photo,
    imgDomain: 'http://img.jishantech.com',
    url: url,
    imgwidth: 0,
    imgheight: 0,
    imgwidth1: 0,
    imgheight: 0,
    imgwidth2:0,
    imgheight2:0,
    imgwidth3: 0,
    imgheight3: 0,
    userImageUrl: '',
    current: '',
    iconUrl: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/activity/short.jpg?sign=3784a0236a824f209337b3420d8f53d0&t=1548744511',
    usersText: '',
    code: '',
    lastImage: '',
    isShow: false,
    actId: 0,
    maxlength: 0
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    actId = options.actId;

    this.setData({
      actId
    })

    app.globalData.userImage = '';
    app.globalData.usersText = '';
    

    var photo = app.globalData.photo;

    var imgUrl = url + photo;

    // console.log(imgUrl,'00000')

    this.setData({
      imgUrl,
      current: app.globalData.userCurrent
    })

    app.globalData.imgUrl = imgUrl;


    var that = this;
    
    if (Number(actId) === 3){
    if (this.data.current == 1) {
      this.setData({
        iconUrl: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/activity/second-logo.png?sign=c226604c5df2ac66990d8172eb442be9&t=1548746082'
      })
    }

    if (this.data.current == 2) {
      this.setData({
        iconUrl: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/activity/logo_03.png?sign=67f1f44f2e85c353d5fc155edbc326da&t=1548744577'
      })
    }

    this.setData({
      code: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/activity/erweima.jpg?sign=e92a7a01255b0d6b2b2598a7f0f6fb69&t=1549684611',
      maxlength: 8
    })

    } else if (Number(actId) === 7){
      this.setData({
        code: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/activity/Valentine-activity/lover.jpg?sign=dc082522e5e10a9625ffd5376787cfc7&t=1549684801',
        maxlength: 2
      })
  }
    
    

  },
  //失去焦点后，更新usersText的值
  bindinput: function(e){
    // console.log(e)
    usersText = e.detail.value;
  },

  confirm: function () {
    // app.globalData.usersText = '';
    if (usersText === '') {
      wx.showToast({
        title: '输入不能为空~',
        icon: 'none'
      })
      return;
    }
  
    var that = this;
    wx.showToast({
      title: '校验中~',
      icon: 'none'
    })
    CheckContent({
      data:{
        content: usersText
      },
      success: function(res){
        if(res.data.code === 1){
          that.setData({
            usersText
          })
      
      app.globalData.usersText = that.data.usersText;
      usersText = '';
        }else{
          wx.showToast({
            title: res.data.data,
            icon: 'none',
            duration: 2000
          })
        }
        
      }
    })

    

  },

  imageLoad: function (e) {

    var _this = this;
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;
    var viewWidth = 600,           //设置图片显示宽度，
      viewHeight = 600 / ratio;
    this.setData({
      imgwidth: viewWidth,
      imgheight: viewHeight,
      isShow: true
    })
  },

  imageLoad1: function (e) {
    var _this = this;
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;
    var viewWidth = 100,           //设置图片显示宽度，
      viewHeight = 100 / ratio;
    this.setData({
      imgwidth1: viewWidth,
      imgheight1: viewHeight
    })
  },
  

  imageLoad2: function (e) {
    var _this = this;
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;
      if(actId == 3){
        if (this.data.current === 0 || this.data.current === 1){
      
          var viewWidth = 600,           //设置图片显示宽度，
            viewHeight = 600 / ratio;
          this.setData({
            imgwidth2: viewWidth,
            imgheight2: viewHeight
          })
        }else{
          // var viewWidth = 430,           //设置图片显示宽度，
          //   viewHeight = 430/ ratio;
          this.setData({
            imgwidth2: 420,
            imgheight2: 420
          })
        }
      }else if(actId == 7){
        if(this.data.current === 0){
            var viewHeight = 800;
            this.setData({
              imgwidth2: 600,
              imgheight2: viewHeight
            })
        } else if (this.data.current === 1 ){
          if ($width > $height){
            var viewWidth = 430,
              viewHeight = 430 / ratio;
            this.setData({
              imgwidth2: viewWidth,
              imgheight2: viewHeight
            })
          }else{
            var viewHeight = 430,
              viewWidth = 430;
            this.setData({
              imgwidth2: viewWidth,
              imgheight2: viewHeight
            })
          }
        } else if (this.data.current === 2){
          if ($width > $height) {
            var viewWidth = 350,
              viewHeight = 350 / ratio;
            this.setData({
              imgwidth2: viewWidth,
              imgheight2: viewHeight
            })
          } else {
            var viewHeight = 430,
              viewWidth = 430;
            this.setData({
              imgwidth2: viewWidth,
              imgheight2: viewHeight
            })
          }
        }
      }
  },

  imageLoad3: function (e) {
    var _this = this;
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;
    var viewWidth = 100,           //设置图片显示宽度，
      viewHeight = 100 / ratio;
    this.setData({
      imgwidth3: viewWidth,
      imgheight3: viewHeight
    })
  },

  

  showAction: function (e) {
    var type = e.currentTarget.dataset.type;

    // console.log(type)
    var that = this
    wx.showActionSheet({
      itemList: ['拍照', '从手机相册选择'],
      success: function (e) {
        // console.log(e.tapIndex)
        // if (type == "single") {
        //   that.getDishName(e.tapIndex)
        // } else {
        //   that.chooseSeveralPics(e.tapIndex)
        // }
        that.addPhotos(e.tapIndex);
      }
    })
  },

  createImage: function(){
    if (!this.data.userImageUrl){
      wx.showToast({
        title: '请选择一张你的图片~',
        icon: 'none'
      })
    }else{
      wx.navigateTo({
        url: '../test/test?actId='+actId,
      })
    }
  },


  /* 上传图片 */
  addPhotos: function (index) {

    var sourceTypeIndex;
    var that = this;

    if (index == 0) {
      sourceTypeIndex = ['camera']
    } else {
      sourceTypeIndex = ['album']
    }

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: sourceTypeIndex, // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res.tempFilePaths[0],'--00-----11111---11--')
        var path = res.tempFilePaths[0];
        ImgSingleGuoChao({
          filePath: path,
          success: function(res){
            // wx.showToast({
            //   title: '校验中',
            //   icon: 'none',
            //   duration: 1000
            // })

            console.log(res,'ImgSingleGuoChao')

            var data = JSON.parse(res.data)
            console.log(data,'解析后的data')

            if(data.code === 1){

              if (Number(actId) === 3){
                if (that.data.current === 0 || that.data.current === 1) {

                  // console.log('imgDomain')
                  that.setData({
                    userImageUrl: path
                  })
                }
                app.globalData.userImage = path;
                if (that.data.current === 2) {
                  wx.navigateTo({
                    url: '../cropper/cropper'
                  })
                }
              } else if (Number(actId) === 7){
                that.setData({
                  userImageUrl: path
                })
                app.globalData.userImage = path;
              } 
            }else {
              wx.showToast({
                title: data.data,
                icon: 'none'
              })
            }
            // console.log(res,'000-000--1111111------')
          },
          fail: function(res){
            wx.showToast({
              title: '请求超时',
            })
          }
        })

      },
    })
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
    if (Number(actId) === 3){
      if (this.data.current === 2) {
        this.setData({
          userImageUrl: app.globalData.userImage
        })
      }
    } else if (Number(actId) === 7){
      app.globalData.usersText = '';
    }
    

    // app.globalData.userImage = '';
    // app.globalData.usersText = '';
    // this.setData({
    //   userImageUrl: ''
    // })
  
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

  }
})