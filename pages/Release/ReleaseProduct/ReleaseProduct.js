

import{
  uploadSeveralPic,
  releaseMode,
  insertEvaluate,
  imgSingleSauceEvaluate
}from '../../../api/api.js'

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgDomain: app.globalData.imgDomain,
    postImages: [],
    // businessKey: wx.getStorageSync('businessKey'),
    text: '',
    objectType: '',
    focus: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var objectType = options.objectType;
    
    var title = '';
    if (objectType) {
      var objectId = options.objectId;
      title = '发评测';
      this.setData({
        objectType: objectType,
        objectId: Number(objectId)
      })
    } else {
      title = '发动态';
    }
    
    wx.setNavigationBarTitle({
      title: title
    })
  },

  deleteImage:function(e){
    var index = e.currentTarget.dataset.index
    var arr = this.data.postImages;
    console.log("删除索引"+ index);
    arr.splice(index,1);
    // this.data.imageUrlList.splice(index, 1);
    this.setData({
      postImages:arr
    })
  },

  clickImage:function(e){
   var imageIndex = e.currentTarget.dataset.index;
   var arr = this.data.postImages;

   wx.previewImage({
     current: this.data.postImages[e.currentTarget.dataset.index], // 当前显示图片的http链接
     urls: arr // 需要预览的图片http链接列表
   })

  },

  showAction: function () {
    var that = this
    wx.showActionSheet({
      itemList: ['拍照', '从手机相册选择'],
      success: function (e) {
        console.log(e.tapIndex)
        that.sourceTypeChange((e.tapIndex))
      }
    })
  },

   previewImage: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.postImages
    })
  },


  sourceTypeChange: function (index) {

    var sourceTypeIndex;
    var that = this;
    if (index == 0) {
      sourceTypeIndex = ['camera']
    } else {
      sourceTypeIndex = ['album']
    }
    var that = this
    var imageList = that.data.postImages;
    wx.chooseImage({
      sourceType:sourceTypeIndex,
      sizeType: "压缩",
      count: 9 - imageList.length,
      success: function (res) {
        var successUp = 0; //成功个数
        var failUp = 0; //失败个数
        var length = res.tempFilePaths.length; //总共个数
        var i = 0; //第几个
        that.upLoadPic(res.tempFilePaths,successUp,failUp,i,length);

        
      },
      fail: function (res) {
        console.log('fail')
      }
    })
  },


  
  textareaVal: function(e){
    
    this.setData({
      text: e.detail.value
    })
  },

/* 函数描述：作为上传文件时递归上传的函数体体；
   * 参数描述： 
   * filePaths是文件路径数组
   * successUp是成功上传的个数
   * failUp是上传失败的个数
   * i是文件路径数组的指标
   * length是文件路径数组的长度
   */      
    upLoadPic(filePaths,successUp,failUp,i,length){

     var that = this;

      imgSingleSauceEvaluate({

          filePath: filePaths[i],

          success: function (e) {
            
            if (e.statusCode == 200) {
              // console.log(e)
              var jsonStr = e.data;
              successUp++;

              if (jsonStr != null && '' != jsonStr) {

                jsonStr = jsonStr.replace(" ", "");

                if (typeof jsonStr != 'object') {

                  jsonStr = jsonStr.replace(/\ufeff/g, "");

                  var obj = JSON.parse(jsonStr);

                  if (obj.data != null) {
                      // console.log(e);
                      var urls = obj.data;
                      that.setData({
                        postImages: that.data.postImages.concat(urls)
                      })

                      console.log(that.data.postImages);
                  }

                  } else {

                  }
                }
              }         
          },
          fail: function(e){
            failUp ++;
          },
          complete: function(e) {
            wx.hideLoading();
              i ++;                        
              if(i == length)
              {                      
                // that.showToast('总共'+successUp+'张上传成功,'+failUp+'张上传失败！');
              }
              else
              {  //递归调用uploadDIY函数
                that.upLoadPic(filePaths,successUp,failUp,i,length);
              }
          },
      })
  },


  save: function (){
    var that = this;
    that.setData({
      focus: false
    })
    var text = that.data.text;
    text = text.replace(/\s+/g,""); 
    console.log(text)

    if (that.data.postImages.length != 0 && text != '') {
       if (that.data.objectType == "sauce") {
          insertEvaluate({
            data: {
              "content": that.data.text,
              "evaluatePhotos": that.data.postImages,
              "objectId": that.data.objectId,
              "objectType": that.data.objectType
            },
            success: function (res) {
              if (res.data.code == 1) {

                let arr = getCurrentPages();
                let page = arr[arr.length - 2];
                page.setData({
                  evaluate: res.data.data
                })
                setTimeout(() => {
                  wx.showToast({
                    title: '发布成功',
                    icon: 'success',
                  })
                }, 200);
                
                wx.navigateBack();
              }
            }
          })

        } else {

         releaseMode({
            data: {
                "photolist": that.data.postImages,
                "postText": that.data.text
            },
            success: function (res) {
              if (res.data.code == 1) {
                setTimeout(() => {
                  wx.showToast({
                    title: '发布成功',
                    icon: 'success',
                  })
                }, 200);
                
                wx.navigateBack();
              }
            }
          })
        }
    } else {
        setTimeout(() => {
          wx.showToast({
            title: '请补全信息',
            icon: 'none',
          })
        }, 200);
    }

    
    


  }




})