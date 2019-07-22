// pages/Home/Dinner/Choice/Choice.js
const app = getApp();
var globalData = getApp().globalData;

import {
  getrestaurant
} from '../../../../api/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // list: [{
    //     id: "0",
    //     name: "龙虾"
    //   },
    //   {
    //     id: "1",
    //     name: "烧烤"
    //   },  
    //   {
    //     id: "2",
    //     name: "火锅店"
    //   },
    //   {
    //     id: "3",
    //     name: "牛排店"
    //   }
    // ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    // 授权
    this.dialog = this.selectComponent("#dialog");
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo == null || userInfo == "") {
      this.showDialog();
      this.setData({
        isLogin: false,
      })
    } else {
      this.setData({
        isLogin: true
      })
    }
    that.getrestaurant()
  },

  // getActivity: function () {
  //   var that = this;
  //   getActivity({
  //     success: function (res) {
  //       if (res.data.code == 1) {
  //         that.getRecommend()
  //         that.setData({
  //           status: 1
  //         })
  //         that.setData({
  //           activities: res.data.data
  //         })
  //       } else {
  //         that.setData({
  //           status: 3
  //         })
  //       }
  //     },
  //     fail: function (res) {
  //       that.setData({
  //         status: 3
  //       })
  //     }
  //   })
  // },


  getrestaurant: function() {
    var that = this;
    getrestaurant({
      success: function(res) {
        if (res.data.code == 1) {
          // console.log(res.data.data)
          that.setData({
            list: res.data.data
          })
        }
        console.log(res, "11111111111111111111111111")
      }
    })
  },



  showDialog: function() {
    this.dialog.showDialog();
  },

  confirmEvent: function() {
    this.dialog.hideDialog();
  },

  cancleEvent: function() {
    this.dialog.hideDialog();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },


  choice: function(e) {
    //console.log(e)
    var that = this
    var id = e.currentTarget.dataset.id

    // var indexs = e.currentTarget.dataset.index
    // console.log(indexs)
    wx.navigateTo({
      url: '/pages/Home/Dinner/Details/Details?goodaid=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var userInfo = wx.getStorageSync('userInfo');

    if (userInfo == null || userInfo == "") {
      return;
    } else {
      // this.getUserInfo();
      this.setData({
        isLogin: true
      })
    }


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})