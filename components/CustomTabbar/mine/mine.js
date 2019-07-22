import {
  getUserInfo,
  uploadUserInfo  
} from '../../../api/api.js';

var globalData = getApp().globalData;

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    status: 0,
    userInfo: {},
    user: {},
    postCount: 0,
    dishCount: 0,
    imgDomain: globalData.imgDomain,
    tags: '',//'白羊座, 金牛座, 双子座, 巨蟹座, 狮子座, 处女座, 天秤座, 天蝎座, 射手座, 摩羯座, 水瓶座, 双鱼座',
    menuList: [
      {
        title: '动态',
        badge: 0,
        router: '../../UserCenter/MyProduct/MyProduct',
        id: 0,
        // checked: true,
      },
      {
        title: '菜谱',
        badge: 0,
        router: '../../UserCenter/MyDynamic/MyDynamic',
        id: 1,
        // checked: false,
      },
      {
        title: '收藏',
        badge: '',
        router: '../../UserCenter/MyFavorite/MyFavorite',
        id: 2,
        // checked: false,
      }
    ],

    selectionList: [
      {
        icon: '../../../img/mine_friends.png',
        title: '好友动态',
        router: '../../UserCenter/Friends/Friends',
        id: 0
      },
      {
        icon: '../../../img/mine_score.png',
        title: '我的积分',
        router: '',
        id: 1
      },
      {
        icon: '../../../img/mine_history.png',
        title: '最近浏览',
        router: '../../UserCenter/History/History',
        id: 2
      },
      {
        icon: '../../../img/mine_drafts.png',
        title: '草稿箱',
        router: '../../UserCenter/Drafts/Drafts',
        id: 3
      },
      {
        icon: '../../../img/mine_invite.png',
        title: '邀请TA一起来玩',
        router: '',
        id: 4
      },
      {
        icon: '../../../img/mine_help.png',
        title: '意见反馈',
        router: '',
        id: 5
      }
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    getUserInfo: function (e) {

      var that = this;
      
        getUserInfo({
          success: function (e) {
            console.log('getUserInfo')
            console.log(e)

            if (e.data.code == 1) {
              var userInfo = e.data.data;
              var user = {
                avatarUrl: userInfo.avatarUrl,
                nickName: userInfo.nickName
              };
              
              var list = that.data.menuList;
              list[0].badge = userInfo.postCount;
              list[1].badge = userInfo.dishCount;

              that.setData({
                menuList: list,
                userInfo: userInfo,
                status: 1,
              })

              if (user.avatarUrl == null || user.avatarUrl == '') {
                that.uploadUserInfo();
              } else {

                var userInfo = wx.getStorageSync('userInfo');

                if (userInfo != null && userInfo != '') {
                  that.setData({
                    user: userInfo
                  })
                } 
              }
            }
          },
          fail: function (res) {
            that.setData({
              status: 3
            })
          }
        })
    },


    goMessage: function () {
      console.log(11111)
      wx.navigateTo({
        url: '../../UserCenter/Message/Message'
      });
    },

 
    clickList: function (e) {
      var index = e.currentTarget.dataset.id;
      var router = this.data.selectionList[index].router; 
      
      if (router != null && router!= '') {
        wx.navigateTo({
          url : router
        });
      } else {

        if (index >= 4) return;
        wx.showToast({
          title: '敬请期待...',
          icon: 'none',
          duration: 2000,
          mask: true
        })
      }
    },


    clickMenu: function (e) {
      var index = e.currentTarget.dataset.id;
      var router = this.data.menuList[index].router; 

      if (router != null && router!= '') {
        wx.navigateTo({
          url : router
        });
      }
    },

   

    // 点击头像进入个人资料页
    goUserInfo: function () {
      wx.navigateTo({
        url: '../../UserCenter/UserInfo/UserInfo'
      });
    },

    goMyAttention: function () {
      wx.navigateTo({
        url: '../../UserCenter/MyAttention/MyAttention?isFrom=myself'
      });
    },

    goMyFans: function (){
      wx.navigateTo({
        url: '../../UserCenter/MyFans/MyFans?isFrom=myself'
      });
    },

    uploadUserInfo: function () {

      var userInfo = wx.getStorageSync('userInfo');
      var that = this;

      console.log('updateUserInfo');
      uploadUserInfo({
        data: {
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
          // gender: userInfo.gender,
          // businessKey: wx.getStorageSync('businessKey')
        },
        success: function (e) {
          if (e.data.code == 1) {
            wx.setStorageSync('userInfo', userInfo);
          }
        }
      })
    },

    confirmEvent: function () {
      this.getUserInfo();
    }

  },


/*-------------------------------------------生命周期-------------------------------------------*/


  attached: function () {

    var userInfo = wx.getStorageSync('userInfo');

    if (userInfo != null && userInfo != '') {
        this.setData({
          user: userInfo,
          status: 1
        })
    } 

    this.getUserInfo();

  },

  
















})
