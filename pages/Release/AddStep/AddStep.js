import{
  addDishStep,
  uploadSinglePic,
  addSauceStep,
  deleteStep
} from '../../../api/api.js';

var app = getApp();
var isfrom = '';


Page({

  /**
   * 页面的初始数据
   */
  data: { 
    imgDomain: app.globalData.imgDomain,
    stepItem: {
      createTime: "",
      dishId: 0,
      sauceId: 0,
      stepId: 0,
      stepTime: 0,
      steptDec: "",
      steptOrder: 0,
      steptPhoto: "",
      updateTime: "",
    },
    index: 0,
    objectType: '',
    isClick: true,
    isEdit: false ,
    cursor: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    app.globalData.finalImage = '';  // 初始化全局中的图片
    app.globalData.isClick = true;


    wx.setStorageSync('isBackFrom', 'dishStep');

    var index = Number(options.index) == 0 ? 1 : Number(options.index) ;

    var fun = options.fun;

    isfrom = fun;

    console.log(fun,'-----')
    if (fun == 'edit') {
      
      var stepItem = app.globalData.stepItem;
      if (stepItem.steptPhoto.indexOf('https://img.jishantech.com') !== 0){
        stepItem.steptPhoto = app.globalData.imgDomain + stepItem.steptPhoto;
      }
      this.data.objectType = (stepItem.dishId == null || stepItem.dishId == 0) ? 'sauce' : 'dish';

      this.setData({
        stepItem: stepItem,
        isClick: app.globalData.isClick
      })


    } else {

      // console.log(options,'AddStep的options')

      var objectType = options.objectType;
      var stepItem = this.data.stepItem;

      this.data.objectType = objectType;
      this.data.stepItem.steptOrder = index + 1;

      if (objectType == 'dish') { 
        stepItem.dishId = Number(options.objectId);
      } else if (objectType == 'sauce') {
        stepItem.sauceId = Number(options.objectId);
      }


      this.setData({
        stepItem: stepItem,
        isClick: app.globalData.isClick
      })
    }
    this.setData({
      stepItem,
      index
    })
  },


  onShow: function(){
    if (app.globalData.finalImage !== ''){
      let stepItem = this.data.stepItem
      stepItem.steptPhoto = app.globalData.finalImage;
      this.setData({
        stepItem: stepItem,
        isClick: app.globalData.isClick
      })
    }
   
  },

  textareaVal: function (e) {
    var text = e.detail.value;
    var cursor = e.detail.cursor;
    let that = this;
    if (cursor != that.data.cursor) {
      var stepItem = that.data.stepItem;
      stepItem.steptDec = text;
      console.log(text);
      // that.setData({
      //   stepItem: stepItem
      // })
    }
    
    that.data.cursor = cursor;
  },


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------


  // /上传图片
  showAction: function (){
    var that = this
    wx.showActionSheet({
      itemList: ['拍照', '从手机相册选择'],
      success: function (e) {
        that.sourceTypeChange((e.tapIndex))
      }
    })
  },  

// 上传图片
  sourceTypeChange: function (index) {

    var sourceTypeIndex;
    if (index == 0) {
      sourceTypeIndex = ['camera']
    } else {
      sourceTypeIndex = ['album']
    }
    var that = this
    wx.chooseImage({
      sourceType:sourceTypeIndex,
      sizeType: "压缩",
      count: 1,
      success: function (res) {
        var imageList = res.tempFilePaths;
        var src = imageList[0];
        console.log('success')

        app.globalData.coverImage = src;

        wx.navigateTo({
          url: '../../cropping/cropping?isform=addstep',
        })

      },
      fail: function (res) {
        console.log('fail')
      }
    })
  },

  //图片加载
  discernDish: function(){
    var that = this;

    if (isfrom == 'edit' && that.data.isClick){
      return;
    }


    console.log('-------load----')

    uploadSinglePic({
      filePath: app.globalData.finalImage,
      success: function (e) {
        if (e.statusCode == 200) {
          console.log('结构化热闹呢')
          console.log(e)
          var jsonStr = e.data;

          if (jsonStr != null && '' != jsonStr) {

            jsonStr = jsonStr.replace(" ", "");

            if (typeof jsonStr != 'object') {

              jsonStr = jsonStr.replace(/\ufeff/g, "");

              var obj = JSON.parse(jsonStr);

              console.log(obj);

              if (obj.data != null) {
                var stepItem = that.data.stepItem;
                stepItem.steptPhoto = obj.data;
                // that.setData({
                //   stepItem: stepItem
                // })

              } else {

              }
            }
          }
        }
      }
    })

  },


  addStep: function () {

    var title = '';
    if (this.data.stepItem.steptDec == '') {
      title = '请填写步骤';
    } else if (this.data.stepItem.steptPhoto == '') {
      title = '请添加照片';
    } else {

    } 

    if (title != '') {
      wx.showToast({
        title: title,
        icon: 'none',
        duration: 2000
      })
      return;
    }
    


    var that = this;

    let arr = getCurrentPages();

    console.log(arr,'getCurrentPages')
    let page = arr[arr.length - 2];

     // let stepItem = that.data.stepItem

      // stepItem.
    
    if (that.data.objectType == 'dish') {

      console.log(that.data.stepItem, 'stepItemstepItemstepItemstepItem')
      // that.discernDish();
      addDishStep({
      data: that.data.stepItem,
        success: function (res) {

          if (res.data.code == 1) {
            that.data.isEdit = true;
            page.setData({
              isEdit: that.data.isEdit
            })

            setTimeout(() => {
              wx.showToast({
                title: '已保存',
                icon: 'none',
                duration: 2000
              })
              wx.navigateBack();
            },500)
            
          } else {
            wx.showToast({
              title: '系统繁忙,稍后再试~',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    } else if (that.data.objectType == 'sauce') {

   

      addSauceStep({
        data: that.data.stepItem,
          success: function (res) {

            console.log(res, 'resresresres')

            if (res.data.code == 1) {
              that.data.isEdit = true;
              page.setData({
                isEdit: that.data.isEdit,
              })
              setTimeout(() => {
                wx.showToast({
                  title: '已保存',
                  icon: 'none',
                  duration: 2000
                })
                wx.navigateBack();
              },500)
            } else {
              wx.showToast({
                title: '系统繁忙,稍后再试~',
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      }
  },


  deleteStep: function () {
    var that = this;
    wx.showModal({
      title: "提示",
      content: '要删除该步骤吗?',
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#666",
      confirmText: "确定",
      confirmColor: "#ff5173",
      success: function (res) {
        console.log(res)
        if (res.confirm) {
          
          let arr = getCurrentPages();
          let page = arr[arr.length - 2];

          deleteStep({
            data: that.data.stepItem,
            success: function (res) {
              if (res.data.code == 1) {
                page.setData({
                  isEdit: true,
                })
                setTimeout(() => {
                  wx.showToast({
                    title: '已删除',
                    icon: 'none',
                    duration: 2000
                  })
                  wx.navigateBack();
                },500)
              } else {
                wx.showToast({
                  title: '系统繁忙,稍后再试~',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
          
        }
      }
    })


    
  }
  




















})