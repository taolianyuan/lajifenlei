import{
 getHistoryBoard
} from '../../../api/api.js';

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgDomain: app.globalData.imgDomain,
    currentPage: 1,
    pageSize: 10,
    totalPage: 0,
    noMoreData: false,
    showLoading: false,
    status: 0,

    boardHistory: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHistoryBoard(1);
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
    this.getHistoryBoard(1);
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
      that.getHistoryBoard(page);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },



  getHistoryBoard: function(currentPage) {

    var that = this
    // var pageSize = ;
    getHistoryBoard({
      data: {
        currentPage: currentPage,
        size: that.data.pageSize
      },
      success: function (res) {
        
        if (res.data.code == 1) {

          that.data.totalPage = res.data.data.pages;
          that.data.currentPage = currentPage;
          var list = that.data.boardHistory || [];  

          if (currentPage == 1) {
            list = res.data.data.data;

          } else {
            var arr = res.data.data.data;
            var index = list.length - 1;

            //当年份相同时，就插入到list数组里  不需要在展示相同的年份了

            if(arr.length == 1){
              if (arr[0].year == list[index].year) {
                list[index].info = list[index].info.concat(arr[0].info);
              } else {
                list = list.concat(arr);
              }
            }else{
              if (arr[0].year == list[index].year) {
                list[index].info = list[index].info.concat(arr[0].info);
              } else {
                list = list.concat(arr);
              }
            }
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

          var status = list == null ? 2 : 1;
          
          that.setData({
            showLoading: false,
            boardHistory: list,
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
        wx.hideNavigationBarLoading({
          success: function(){
            wx.hideLoading();
          }
        }) //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },

  goDetail: function (e) {

    var oid = e.currentTarget.dataset.oid;
    
    wx.navigateTo({
      url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + oid + '&objectType=dish' + '&isFrom=normal'
    })
  },


  confirmEvent: function () {
    this.getHistoryBoard(1);
  },

})