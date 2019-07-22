// pages/Home/NewYearDinner/NewYearDinner.js
import {
  Activity
} from '../../../api/api.js';

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.imgDomain,
    dinnerList: [],
    isShow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.Activity();
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

  Activity: function(){

    wx.showLoading({
      title: '加载中~',
      icon: 'none'
    })

    var that = this;

    Activity({
      success: function(res){

        if(res.data.code === 1){
          // console.log(res.data.data)
          var data = res.data.data;
          console.log(data)

          var list = {
            one: {
              title: data.one[0].title,
              list: data.one
            },
            two: {
              title: data.two[0].title,
              list: data.two
            },
            three: {
              title: data.three[0].title,
              list: data.three
            },
            four: {
              title: data.four[0].title,
              list: data.four
            },
            five: {
              title: data.five[0].title,
              list: data.five
            },
            six: {
              title: data.six[0].title,
              list: data.six
            },
            seven: {
              title: data.seven[0].title,
              list: data.seven
            }
          }


          console.log(list,'list列表')

          var newList = [];


          newList.push(list.one, list.two, list.three, list.four, list.five, list.six, list.seven)         

          // console.log(data.one)

          that.setData({
            dinnerList: newList
          })

          setTimeout(function(){
            that.setData({
              isShow: false
            })
          },500)

          wx.hideLoading();
        }
      }
    })
  },

  goToDetail: function (e){
    // console.log(e.currentTarget.dataset.index)

    var that = this;
    
    var index = e.currentTarget.dataset.index;
    var section = e.currentTarget.dataset.section;

    console.log(e)
    var item = that.data.dinnerList[index];


    var list = item.list[section];

    console.log(item,'-----------------------')
   
    if (list.status === 1){
      wx.navigateTo({
        url: '../DynamicDetail/DynamicDetail?subtaskId=' + list.dish.dishId + '&objectType=dish',
      })
    }else{
      wx.showToast({
        title: '敬请期待~',
        icon: 'none',
        duration: 1500
      })
    }
  }
})