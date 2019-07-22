
import {
  getComment,
  getCommentReply
} from '../../../api/api.js';


var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList: [],
    objectId: 0,
    objectType: '',
    status: 0,

    noMoreData: false,
    showLoading: false,
    currentPage: 1,
    pageSize: 10,
    totalPage: 0,
    imgDomain: app.globalData.imgDomain
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.data.objectType = options.objectType;
    this.data.objectId = Number(options.objectId)
    
    // this.getComment(1);

    wx.startPullDownRefresh()
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.getComment(1);
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

    this.setData({
      showLoading: true,
      noMoreData: false
    })

    let that = this;
    if (!that.data.noMoreData && that.data.showLoading) {
      var page = this.data.currentPage + 1;
      this.getComment(page);
    }
  },

  getComment: function (page) {

    var that = this;

    getCommentReply({
      data:  {
        "currentPage": page,
        "commentReply":{
          "objectId": that.data.objectId,
          "objectType": that.data.objectType,
        },
        "size": that.data.pageSize
      },
      success: function (res) {

        console.log(res,'commentList--res')
        if (res.data.code == 1) {
          var status = 0;
          that.data.totalPage = res.data.data.pages;
          that.data.currentPage = page;
          if (res.data.code.total == 0) {
            status = 2;
            that.setData({
              status: status,
              showLoading: false,
              noMoreData: false,
            })
          } else {
            status = 1;
            var commentList = that.data.commentList;

            if (page == 1) {
              commentList = res.data.data.commentReply;
            } else {

              var arr = res.data.data.commentReply;

              if (commentList.length == res.data.data.total) { 
                return;
              }
              commentList = commentList.concat(arr);
            }


            if (res.data.data.pages == page) {
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
              status: status,
              commentList: commentList
            })
          }

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
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  }



})