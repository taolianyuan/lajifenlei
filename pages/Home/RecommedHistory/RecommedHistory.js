

import{
 getRecommend
} from '../../../api/api.js';

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendList:[],
    imgDomain: app.globalData.imgDomain,
    noMoreData: false,  //全部加载
    showLoading: false,  //加载中
    currentPage: 1,
    pageSize: 10,
    totalPage: 0,
    status: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecommend(1);
  },

 

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.showNavigationBarLoading();
    this.getRecommend(1);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.totalPage == this.data.currentPage) {
      this.setData({
         noMoreData: true
       });
      const that = this;
      setTimeout(function () {
        that.setData({
          noMoreData: false
        });
      }, 1500);
       return;
     }

     wx.showLoading({
       title: '加载中...',
       mask: true
     })

    this.setData({
      showLoading: true,
      noMoreData: false
    })

    let that = this;
    if (!that.data.noMoreData && that.data.showLoading) {
      var page = this.data.currentPage + 1;
      this.getRecommend(page);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },



  goDetail: function (e) {
    var oid = e.currentTarget.dataset.oid;

    

    // if (userInfo ==){

    // }

      wx.navigateTo({
        url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + oid + '&objectType=dish' + '&isFrom=normal'
      })
  },


  getRecommend: function (currentPage) {
    var that = this;
    getRecommend({
      data: {
        currentPage: currentPage,
        size: 10
      },
      success: function (res) {
        
        if (res.data.code == 1) {

          var status = res.data.data.pages == 0 ? 2 : 1;
          that.data.totalPage = res.data.data.pages;
          that.data.currentPage = currentPage;

          var list = that.data.recommendList;

          if (that.data.currentPage == 1) {
            list = res.data.data.records;
          } else {
            var arr = res.data.data.records;

            if (list.length == res.data.data.total) {
              return;
            }
            list = list.concat(arr);
          }
          if (res.data.data.pages == currentPage) {
            that.setData({
              showLoading: false,
              noMoreData: true
            })
          } else {

            that.setData({
              showLoading: false,
              noMoreData: false
            })
          }

          that.setData({
            recommendList: list,
            status: status
          })
          wx.hideLoading();
        } else {
          that.setData({
            status: 3
          })
        }
      },
      fail: function (res) {
        that.setData({
          status: 3
        })
      },
      complete: function () {
        setTimeout(() => {
          wx.hideLoading();
        }, 100); 
        wx.hideNavigationBarLoading({
          success: function(){
            wx.hideLoading();
          }
        }) //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },


  confirmEvent: function () {
    this.getRecommend(1);
  },
  










})