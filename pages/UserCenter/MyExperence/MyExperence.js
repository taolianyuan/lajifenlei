// pages/UserCenter/MyExperence/MyExperence.js
import {
  getUserIntegral
} from '../../../api/api.js';

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    expList:[],
    experence: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserIntegral();

    this.setData({
      experence: app.globalData.experence
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  //跳转
  getMoreExperence: function(){
    wx.navigateTo({
      url: '../MyLevel/MyLevel',
    })
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

  //请求列表
  getUserIntegral: function (){
    var that = this;
    getUserIntegral({
      success: function(res){
        console.log(res,'--------')
        if(res.data.code === 1){
          
          var expList = res.data.data;

          for(let i=0; i<expList.length; i++){
            var item = expList[i].source;
            if(item == 1){
              expList[i].title = '上传菜谱'
            }else if(item == 2){
              expList[i].title = '上传酱汁'
            }else if(item == 3){
              expList[i].title = '分享'
            }else{
              expList[i].title = '首次登录'
            }
          }

          that.setData({
            expList: expList
          })
        }
      }
    })
  }
})