

import{
  getMyFansList,
  getUserFansList,
  unFollow,
  follow,
} from '../../../api/api.js';

const app = getApp();
var Options = null;
let userId = '';


Page({

  /**
   * 页面的初始数据
   */
  data: {

    businessKey: wx.getStorageSync('businessKey'),
    imgDomain: getApp().globalData.imgDomain,
    fansList: [],
    status: 0,
    isFrom: '',
    noMoreData: false,
    showLoading: false,
    currentPage: 1,
    pageSize: 10,
    totalPage: 0,
  },

  onLoad: function (options) {
    console.log(options,'---options----')
    var isFrom = options.isFrom;
    this.data.isFrom = isFrom;
    Options = options
     this.getFansList(1);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
   
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
    this.getFansList(1);
  },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {

    if (this.data.totalPage == this.data.currentPage) {
      const that = this;
      
      that.setData({
        noMoreData: true
      });

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
      var page = that.data.currentPage + 1;
      that.getFansList(page);
    }
  },

  goOthersCenter: function (e) {
    var index = e.currentTarget.dataset.index;
    userId = this.data.fansList[index].follower
    wx.navigateTo({
      url: '../../Piazza/OthersUserCenter/OthersUserCenter?userId=' + userId
    })
  },


  changeStatus: function (e) {

    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.fansList;
    var followedUser = list[index];
    var data = { businessKey: that.data.businessKey, followedUser: followedUser.follower };

    wx.showLoading({
      title:'操作中...',
      icon: 'none',
      mask: 'true'
    })

    if (followedUser.fansUser.status == 1) {

      follow({
        data: data,
        success: function (res) {
          console.log('follow')
          console.log(res)
          if (res.data.code == 1) {

            list[index].fansUser.status = 2
            
            setTimeout(() => {
              wx.showToast({
                title: '已关注',
                icon: 'success',
              })
               wx.hideLoading();
            }, 100);

            that.setData({
              fansList: list
            })
          }
        }
      })
    } else {

      unFollow({
        data: data,
          success: function (res) {
            console.log('unFollow')
            console.log(res)
            if (res.data.code == 1) {

              list[index].fansUser.status = 1

              setTimeout(() => {
                wx.showToast({
                  title: '已取消关注',
                  icon: 'success',
                })
                 wx.hideLoading();
              }, 100);

              that.setData({
                fansList: list
              })
            }
          }
      })
    }
  },


  confirmEvent: function () {
    var isFrom = this.data.isFrom;
    this.getFansList(isFrom);
  },


  getFansList: function (page) {
    var that = this;
    
    var data = {};

    if (that.data.isFrom == 'myself') {

      data = {currentPage: page, size: that.data.pageSize}

      getMyFansList({
        data: data,
        success: function (res) {
          if (res.data.code == 1) {

            that.data.totalPage = res.data.data.pages;
            var status = 0;
            var list = that.data.fansList;

            if (res.data.data.pages == 0) {
              status = 2;
              that.setData({
                showLoading: false,
                noMoreData: false
              })

              setTimeout(() => {
                wx.showToast({
                  title: '暂无粉丝',
                  icon: 'none',
                })
              }, 200);
            } else {

              status = 1;
              that.data.currentPage = page;
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

              if (page == 1) {
                list = res.data.data.followAndUser;
              } else {
                list.concat(res.data.data.followAndUser);
              }
            }
            that.setData({
              status: status,
              fansList: list
            })
            wx.hideLoading();
          } else {
            that.setData({
              status: 3
            })
          }
        },
        fail: function (res) {
          wx.hideNavigationBarLoading({
            success: function(){
              wx.hideLoading();
            }
          }) //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
          that.setData({
            status: 3
          })
        },
        complete: function () {
          wx.hideNavigationBarLoading({
            success: function () {
              wx.hideLoading();
            }
          }) //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }
      })
    } else if (that.data.isFrom == 'others') {


      data = { userId: Options.userId, currentPage: page, size: that.data.pageSize}

      getUserFansList({
        data: data,
        success: function (res) {
          if (res.data.code == 1) {
            var status = 0;
            var list = that.data.fansList;
            that.data.totalPage = res.data.data.pages;
            if (res.data.data.pages == 0) {
              status = 2;
              that.setData({
                showLoading: false,
                noMoreData: false
              })

              setTimeout(() => {
                wx.showToast({
                  title: '暂无粉丝',
                  icon: 'none',
                })
              }, 200);
            } else {

              status = 1;
              that.data.currentPage = page;

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

              if (page == 1) {
                list = res.data.data.followAndUser;
              } else {
                list = list.concat(res.data.data.followAndUser);
              }
            }
            that.setData({
              status: status,
              fansList: list,
            })
            wx.hideLoading();
          } else {
            that.setData({
              status: 3
            })
          }
        },
        fail: function (res) {
          wx.hideNavigationBarLoading({
            success: function () {
              wx.hideLoading();
            }
          }) //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
          that.setData({
            status: 3
          })
        },
        complete: function () {
          wx.hideNavigationBarLoading({
            success: function () {
              wx.hideLoading();
            }
          }) //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }
      })
    }

    
  }

})























