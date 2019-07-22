// pages/Home/loverLandingPage/loverLandingPage.js
import {
  getValentinesDay
} from '../../../api/api.js';

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList: [],
    imgDomain: app.globalData.imgDomain,
    isLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dialog = this.selectComponent("#dialog");
    this.getValentinesDay();

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
    this.getValentinesDay();
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
  
  getValentinesDay: function(){
    var that = this;
    getValentinesDay({
      success: function(res){
        if(res.data.code === 1){
          that.setData({
            activityList: res.data.data
          })
        }
      }
    })
  },

  showDialog: function () {
    this.dialog.showDialog();
  },

  confirmEvent: function () {
    this.dialog.hideDialog();
  },

  cancleEvent: function () {
    this.dialog.hideDialog();
  },

  //跳转菜谱详情
  goDetails: function(e){
    var index = e.currentTarget.dataset.index;
    var userInfo = wx.getStorageSync('userInfo');
    var activityList = this.data.activityList;

    if(userInfo == '' || userInfo == null){
      this.showDialog();
      this.setData({
        isLogin: false
      })
    }else{
      wx.navigateTo({
        url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + activityList[index].dishId + '&objectType=dish'
      })
      this.setData({
        isLogin: true
      })
    }
 
  }
})