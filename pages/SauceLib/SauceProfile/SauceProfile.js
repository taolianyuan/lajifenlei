

import{
 getEvaluates
} from '../../../api/api.js';

var app = getApp();

Page({

  /**
   * 组件的初始数据
   */
  data: {
    imgDomain: getApp().globalData.imgDomain,
    loadingCount: 0,
    testList: [],
    current: 0,
    srcs:[],
    objectId: 0,
    status: 0
  },

  onLoad: function (options) {
    var objectId = options.objectId;
    this.data.objectId = Number(objectId);
    this.getEvaluates();
  },

    
  didSelectedItem: function (e) {
    var index = e.currentTarget.dataset.index;
    var evaluate = this.data.testList[index];

    
    if (evaluate.status == 1) {
      app.globalData.evaluate = evaluate;

      wx.navigateTo({
        url: '../../Piazza/TestDetail/TestDetail'
      }) 
    } else {
      wx.showToast({
        title: '评测审核中...',
        icon: 'none',
        duration:2000,
      })
    }
  },

  confirmEvent: function () {
    this.getEvaluates();
  },
   
  catchTouchMove: function (res) {
    return false
  },




  getEvaluates: function () {

    var that = this;
    getEvaluates({
      data: {
        "currentPage": 1,
        "objectId": this.data.objectId,
        "objectType": "sauce",
        "size": 10
      },
      success: function (res) {
            console.log(res)

        if (res.data.code == 1) {

          var testList = res.data.data.comment;
          var status = testList == null ? 2 : 1;

          for(let i=0;i<testList.length;i++){
            var item = testList[i];
            item.evaluatePhotos = JSON.parse(item.evaluatePhotos)
          }

          that.setData({
            status: status,
            testList: testList
          })
           
        }
      },
      fail: function () {
        that.setData({
          status: 3
        })
      }
    })
  },

  confirmEvent: function () {
    this.getEvaluates();
  }

  












})
