

import{
  getMyFollowList,
  getUserFollowList,
  unFollow,
  follow
} from '../../../api/api.js';

const app = getApp();
let userId = ''


Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgDomain: getApp().globalData.imgDomain,
    followerList: [],
    businessKey: wx.getStorageSync('businessKey'),
    isFrom: '',
    status: 0,
    noMoreData: false,
    showLoading: false,
    currentPage: 1,
    pageSize: 10,
    totalPage: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'---options----')
    var isFrom = options.isFrom;
    this.data.isFrom = isFrom;

    if (isFrom == 'others') {
      var userId = options.userId;  
      this.data.userId = userId;
    }
    this.getFollowList(1);
  },

  
  /**
   * 生命周期函数--监听页面显示
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
    this.getFollowList(1);
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
      that.getFollowList(page);
    }
  },


  getFollowList: function (page) {
    var that = this;
    var data = {};

    if (that.data.isFrom == 'myself') {

      data = {currentPage: page, size: that.data.pageSize}

      getMyFollowList({
        data: data,
        success: function (res) {
          console.log('getFollowList')
          console.log(res)
          if (res.data.code == 1) {

            that.data.totalPage = res.data.data.pages;
            that.data.currentPage = page;

            var status = 0;
            var list = that.data.followerList;

            if (res.data.data.pages == 0) {
              status = 2;
              that.setData({
                showLoading: false,
                noMoreData: false
              })

              setTimeout(() => {
                wx.showToast({
                  title: '暂未关注任何人',
                  icon: 'none',
                })
              }, 200);
            } else {
              status = 1;
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
              followerList: list
            })
            wx.hideLoading();
          } else {
            wx.hideNavigationBarLoading({
              success: function(){
                wx.hideLoading();
              }
            }) //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
            that.setData({
              status: 3
            })
          }
        },
        fail: function (res) {
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
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
    } else if (that.data.isFrom == 'others') {

      data = {userId: that.data.userId,currentPage: page,size: that.data.pageSize}

      getUserFollowList({
      data: data,
        success: function (res) {
          if (res.data.code == 1) {
            var status = 0;
            var list = that.data.followerList;

            if (res.data.data.pages == 0) {
              status = 2;
              that.setData({
                showLoading: false,
                noMoreData: false
              })
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
              followerList: list,
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
    }
  },


  goOthersCenter: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    userId = this.data.followerList[index].followedUser

    console.log(userId,'关注者的userid')
    
    wx.navigateTo({
      url: '../../Piazza/OthersUserCenter/OthersUserCenter?userId=' + userId
    })
  },

  changeStatus: function (e) {
    var that = this;
    var list = that.data.followerList;
    var index = e.currentTarget.dataset.index;
    var followedUser = list[index];
    var data = { businessKey: that.data.businessKey, followedUser: followedUser.followedUser };

    console.log(followedUser.followUser.status, 'status')

    wx.showLoading({
      title:'操作中...',
      icon: 'none',
      mask: 'true'
    })

    if (followedUser.followUser.status == 1) {

      follow({
        data: data,
          success: function (res) {
            console.log('follow')
            console.log(res)
            if (res.data.code == 1) {
              
              list[index].followUser.status = 0;
              
              setTimeout(() => {
                wx.showToast({
                  title: '已关注',
                  icon: 'success',
                })
                 wx.hideLoading();
              }, 100);

              that.setData({
                followerList: list
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

              list[index].followUser.status = 1;
              
              setTimeout(() => {
                wx.showToast({
                  title: '已取消关注',
                  icon: 'success',
                })
                 wx.hideLoading();
              }, 100);

              that.setData({
                followerList: list
              })
            }
          }
      })
    }
  },

  confirmEvent: function () {
    var isFrom = this.data.isFrom;
    this.getFollowList(isFrom);
  },




















})