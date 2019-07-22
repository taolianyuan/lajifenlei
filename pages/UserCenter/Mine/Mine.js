import {
  getUserInfo,
  uploadUserInfo
} from '../../../api/api.js';

var globalData = getApp().globalData;

Page({

  /**
   * 组件的初始数据
   */
  data: {
    userId: 0,
    isLogin: false,
    status: 0,
    userInfo: null,
    user: {},
    postCount: 0,
    dishCount: 0,
    imgDomain: globalData.imgDomain,
    tags: '', //'白羊座, 金牛座, 双子座, 巨蟹座, 狮子座, 处女座, 天秤座, 天蝎座, 射手座, 摩羯座, 水瓶座, 双鱼座',
    menuList: [{
        title: '我的发布',
        badge: 0,
        router: '../MyProduct/MyProduct',
        id: 0,
        // checked: true,
      },
      {
        title: '菜谱',
        badge: 0,
        router: '../MyDynamic/MyDynamic',
        id: 1,
        // checked: false,
      },
      {
        title: '酱汁',
        badge: 0,
        router: '../MySauce/MySauce',
        id: 2,
        // checked: false,
      }
    ],

    selectionList: [
      // {
      //   icon: '../../../img/mine_friends.png',
      //   title: '好友动态',
      //   router: '../Friends/Friends',
      //   id: 0
      // },
      {
        icon: '../../../img/mine_collection.png',
        title: '我的收藏',
        router: '../MyFavorite/MyFavorite',
        id: 1
      },
      {
        icon: '../../../img/mine_history.png',
        title: '最近浏览',
        router: '../History/History',
        id: 2
      },
      // {
      //   icon: '../../../img/mine_level.png',
      //   title: '我的等级',
      //   router: '../MyLevel/MyLevel',
      //   id: 3
      // },
      {
        icon: '../../../img/mine_invite.png',
        title: '邀请好友',
        router: '../../sharePage/sharePage?isfrom=mine',  
        id: 4
      },
      // {
      //   icon: '../../../img/mine_drafts.png',
      //   title: '草稿箱',
      //   router: '../Drafts/Drafts',
      //   id: 5
      // },
      {
        icon: '../../../img/setting.png',
        title: '设置',
        router: '',
        id: 6
      }
    ],
		// ../Setting/Setting
  },


  getUserInfo: function(e) {

    var that = this;

    getUserInfo({
      success: function(e) {

        if (e.data.code == 1) {
          var userInfo = e.data.data;
          var list = that.data.menuList;

          globalData.experence = userInfo.integral;
          list[0].badge = userInfo.postCount;
          list[1].badge = userInfo.dishCount;
          list[2].badge = userInfo.sauceCount;

          if (userInfo.user.userId == '35298452253442048' || userInfo.user.userId == 35298452253442048) {
            var selectionList = that.data.selectionList;
            var item = {
                icon: '../../../img/mine_help.png',
                title: '数据中心',
                router: '../DataCenter/DataCenter',
                id: 6
              };
            selectionList.push(item);

            that.setData({
              selectionList
            })
          }


          that.setData({
            menuList: list,
            userInfo: userInfo,
            status: 1,
            userId: userInfo.user.userId,
            
          })
        }
      },
      fail: function(res) {
        that.setData({
          status: 3
        })
      },
      complete: function() {
        wx.hideNavigationBarLoading({
          success: function () {
            wx.hideLoading();
          }
        }) //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },


  goMessage: function() {
    console.log(11111)
    wx.navigateTo({
      url: '../Message/Message'
    });
  },


  clickList: function(e) {
    var router = e.currentTarget.dataset.router;
    var id = e.currentTarget.dataset.id;
    var that = this;

    var userInfo = wx.getStorageSync('userInfo');
      console.log(userInfo,"++++++++++")

    if (userInfo == '' || userInfo == null) {
      this.showDialog();
      this.setData({
        isLogin: false
      })
    } else {

      if (router != null && router != '') {

        if(id == 4){

          if (that.data.userInfo.userLevel.levelId == 999){
            //KOL达人
            wx.navigateTo({
              url: `../../sharePage/sharePage?isfrom=KOL&userId=${that.data.userInfo.userId}`,
            })

          }else{
            //普通用户
            wx.navigateTo({
              url: `../../sharePage/sharePage?isfrom=normal&userId=${that.data.userInfo.userId}`,
            })
          }

        }else{
          wx.navigateTo({
            url: router
          });
        }

        

        this.setData({
          isLogin: true
        })
      } else {


      }

    }


  },


  clickMenu: function(e) {
    var index = e.currentTarget.dataset.id;
    var router = this.data.menuList[index].router;
    var userInfo = wx.getStorageSync('userInfo');

    if (userInfo == '' || userInfo == null) {
      this.showDialog();
      this.setData({
        isLogin: false
      })
    } else {
      if (router != null && router != '') {
        wx.navigateTo({
          url: router
        });
      }

      this.setData({
        isLogin: false
      })
    }

  },

  skipLogin: function() {
    var userInfo = this.data.userInfo;

    if (userInfo == '' || userInfo == null) {
      this.showDialog();
      this.setData({
        isLogin: false
      })
    } else {
      this.setData({
        isLogin: true
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  bindGetUserInfo: function() {

  },




  // 点击头像进入个人资料页
  goUserInfo: function() {

    var userInfo = this.data.userInfo;

    if (userInfo == '' || userInfo == null) {

      return true;
    } else {
      wx.navigateTo({
        url: '../UserInfo/UserInfo'
      });
    }

  },

  goMyAttention: function() {
    wx.navigateTo({
      url: '../MyAttention/MyAttention?isFrom=myself'
    });
  },

  goMyFans: function() {
    wx.navigateTo({
      url: '../MyFans/MyFans?isFrom=myself'
    });
  },

  goMyExp: function() {
    wx.navigateTo({
      url: '../MyExperence/MyExperence'
    });
  },


  confirmEvent: function() {
    this.getUserInfo();
  },




  /*-------------------------------------------生命周期-------------------------------------------*/


  onLoad: function(options) {

    var that = this;
    // var userInfo = wx.getStorageSync('userInfo', userInfo);

    this.dialog = this.selectComponent("#dialog");
    // this.scroll = this.selectComponent("#scroll");

    var userInfo = wx.getStorageSync('userInfo');

    if (userInfo == null || userInfo == "") {
      this.showDialog();
      this.setData({
        isLogin: false,
        status: 1
      })
    } else {
      this.setData({
        isLogin: true
      })
    }
  },

  showDialog: function() {
    this.dialog.showDialog();
  },

  confirmEvent: function() {
    this.dialog.hideDialog();
		// this.getUserInfo();
  },

  cancleEvent: function() {
    this.dialog.hideDialog();
  },

  onShow: function () {

    var userInfo = wx.getStorageSync('userInfo');

    if (userInfo == null || userInfo == "") {
      return;
    } else {
      this.getUserInfo();
      this.setData({
        isLogin: true
      })
    }
  },

  showAction: function() {

    var userInfo = wx.getStorageSync('userInfo');
    var that = this;

    if (userInfo == '' || userInfo == null) {
      this.showDialog();
      this.setData({
        isLogin: false
      })
    } else {
      wx.showActionSheet({
        itemList: ['发布菜谱', '发酱汁', '发动态'],
        success: function(e) {
          wx.setStorageSync('isBackFrom', '');
          var index = e.tapIndex;
          var router = ['../../Release/ReleaseMenu/ReleaseMenu', '../../Release/ReleaseSauce/ReleaseSauce', '../../Release/ReleaseProduct/ReleaseProduct'];

          wx.navigateTo({
            url: router[index]
          });
          that.setData({
            isLogin: true
          })

        }
      })
    }

  },


  onPullDownRefresh: function() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.showNavigationBarLoading();
    this.getUserInfo();
  },















})