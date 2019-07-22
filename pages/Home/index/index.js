const app = getApp();
// const db = wx.cloud.database();
import {
  getRecommend,
  getTodayBoard,
  getActivity,
  getBanner,
  getHomeBanner,
  getUserByBusinessKey,


  test

} from '../../../api/api.js';

const localData = require('../../../utils/localData');

Page({
  data: {
    banners: [],
    imgDomain: getApp().globalData.imgDomain,
    status: 0,
    recommendList: [],
    todayMeal: {},
    number: 0.5,
    headerImg: '/dish/ff213de1f7a149b289556000dba86e256933484993625663575.png',
    more: ['../BoardHistory/BoardHistory', '../RecommedHistory/RecommedHistory'],
    activities: [],
    // isIphoneX : app.globalData.isIphoneX,
    isLogin: false,
    isfirst: false,
    isTop: false,
  },

  // 	onPageScroll: function(res) {
  // 		console.log(res)
  // 		var that = this;
  // 		if (res.scrollTop == 0) {
  // 			that.setData({
  // 				isTop: false
  // 			})
  // 		} else {
  // 			that.setData({
  // 				isTop: true
  // 			})
  // 		}
  // 	},

  onLoad: function() {
    // var aa = getApp().globalData.isopenApp
    //   console.log(aa,"___________________________")
    // var businessKey = wx.getStorageSync('businessKey');
    // console.log(businessKey)
    // //  获取微信步数
    // wx.getWeRunData({
    //   success(res) {
    //     //  console.log(res,"++++")
    //     // 拿 encryptedData 到开发者后台解密开放数据
    //     // const encryptedData = res.encryptedData
    //     wx.getSetting({
    //       success: function(res) {
    //         console.log(res, "++++")
    //         if (res.authSetting['scope.werun'] === false) {
    //           wx.showModal({
    //             title: '提示',
    //             content: '请开启获取微信步数权限',
    //             showCancel: false,
    //             confirmText: "确定"
    //           })
    //         } else {
    //           wx.authorize({
    //             scope: 'scope.werun',
    //             success() {
    //               wx.getWeRunData({
    //                 success: function(res) {
    //                   console.log(res)
    //                 }
    //               })
    //             },
    //             fail: function(res) {
    //               wx.showModal({
    //                 title: '提示',
    //                 content: '请先关注“微信运动”公众号，以获取并提供微信步数数据',
    //                 showCancel: false,
    //                 confirmText: '确定'
    //               })
    //             }
    //           })
    //         }
    //       },
    //       fail() {
    //         wx.showModal({
    //           title: '提示',
    //           content: '请开启获取微信步数权限',
    //           showCancel: false,
    //           confirmText: '确定'
    //         })
    //       }
    //     })

    //   }
    // })

    // wx.setStorageSync('isfirst',true)

    this.dialog = this.selectComponent("#dialog");

    var userInfo = wx.getStorageSync('userInfo');

    if (userInfo == null || userInfo == "") {

      wx.setStorageSync('isfirst', true)

      var isfirst = wx.getStorageSync('isfirst')

      this.setData({
        isfirst
      })
    } else {
      this.setData({
        isLogin: true
      })
    }

  },

  onShow: function() {
    this.getBanner();
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        isLogin: true
      })
    }
  },


  bindInputName:function(e){
    console.log(e)
    var ss = e.detail.value
    this.setData({
      asd:ss
    })
  },

  asd:function(e){
    var tt = this.data.asd
    console.log(tt)
    test({
      data:{
        garbageName:tt
      },
      success:function(res){
       console.log()
      }
    })
  },




  hiddenMark: function() {
    wx.setStorageSync('isfirst', false)

    var isfirst = wx.getStorageSync('isfirst')
    var userInfo = wx.getStorageSync('userInfo');

    this.setData({
      isfirst
    })

    if ((userInfo == '' || userInfo == null) && !isfirst) {
      this.showDialog();
      this.setData({
        isLogin: false
      })
    }
  },


  onPullDownRefresh: function() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.showNavigationBarLoading();
    this.getBanner();
  },

  goTest: function() {

  },

  goAcademy: function() {

  },


  dianji: function() {
    wx.navigateTo({
      url: "/pages/Home/Dinner/Choice/Choice",
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },


  showDialog: function() {
    this.dialog.showDialog();
  },

  confirmEvent: function() {
    this.dialog.hideDialog();
  },

  cancleEvent: function() {
    this.dialog.hideDialog();
  },

  bindGetUserInfo: function() {

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
          var router = ['../../Release/ReleaseMenu/ReleaseMenu', '../../Release/ReleaseSauce/ReleaseSauce',
            '../../Release/ReleaseProduct/ReleaseProduct'
          ];

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



  goLaboratory: function() {
    // wx.navigateTo({
    //   url: 
    // })
  },

  // 打开另外一个小程序
  goCollege: function() {
    wx.navigateToMiniProgram({
      appId: 'wx51c9801fd5d21a71',
      path: 'pages/Home/home/home',
      extraData: {
        // foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })
  },



  // goCollege:function(){
  //   wx.navigateTo({
  //     url: '/pages/Home/Classes/Lesson/Lesson',
  //   })
  // },


  discount:function(){
    wx.navigateTo({
      url: '/pages/Home/Classes/Lesson/Lesson',
    })
  },


// 跳转垃圾助手
  goAssitant: function() {
    wx.navigateTo({
      url: '/pages/Home/Assistant/Assistant',
    })
  },



  clickMore: function(e) {
    var index = e.currentTarget.dataset.index;

    var userInfo = wx.getStorageSync('userInfo');

    if (userInfo == '' || userInfo == null) {
      this.showDialog();
      this.setData({
        isLogin: false
      })
    } else {
      wx.navigateTo({
        url: this.data.more[index - 1],
      })
      this.setData({
        isLogin: true
      })
    }
  },

  goActivities: function(e) {
    var index = e.currentTarget.dataset.index;
    var actUrl = this.data.activities[index].actUrl;
    var url = '';
    var actId = this.data.activities[index].actId;
    var isClick = this.data.activities[index].isClick;

    if (isClick == 0) {
      wx.showToast({
        title: '敬请期待~',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    if (actId == 3) {
      wx.navigateTo({
        url: '../../../pages/Activity/activity/activity?actId=' + actId
      })
    } else if (actId == 7) {
      wx.navigateTo({
        url: '../../../pages/Activity/activity/activity?actId=' + actId
      })
    }
    if (actId == 2) {
      wx.navigateTo({
        url: '../../../pages/Home/Activity/Activity'
      })
    } else if (actId == 1) {
      wx.navigateTo({
        url: '../../../pages/Activity/NewYearDinner/NewYearDinner'
      })
    } else if (actId == 6 || actId == 16) {

      var userInfo = this.data.activities[index].dishIds;


      // console.log(userInfo)
      // var ParseDishIds = JSON.parse(userInfo)

      // console.log(ParseDishIds)
      // var userId = ParseDishIds.userId
      // console.log(userId)

      var userId = userInfo.split(',')[0].split(':')[1]
      //console.log(userId)
      wx.navigateTo({
        url: '../../../pages/Piazza/OthersUserCenter/OthersUserCenter?userId=' + userId
      })
    } else if (actId == 8) {
      wx.switchTab({
        url: '../../SauceLib/SauceLib/SauceLib'
      })
    } else if (actId == 10) {
      wx.navigateTo({
        url: '../loverLandingPage/loverLandingPage'
      })
    } else if (actId == 11) {
      wx.navigateTo({
        url: '../PotatoFactory/PotatoFactory'
      })
    } else if (actId == 12) {
      wx.navigateTo({
        url: `../voteActivity/voteActivity?actId=${actId}`
      })
    } else if (actId == 13) {
      wx.navigateTo({
        url: `../GeneratedBills/GeneratedBills`
      })
    } else if (actId == 14) {
      wx.navigateTo({
        url: `../Rice/Rice?actId=` + actId
      })
    } else if (actId == 15) {
      var photos = this.data.activities[index].dishIds;
      wx.navigateTo({
        url: `../India/AboutIndia/AboutIndia`
      })
    } else if (actId == 17) {
      wx.navigateTo({
        url: `../Classes/Lesson/Lesson`
      })
    } else if (actId == 18){
      wx.navigateTo({
        url: `../Assistant/Assistant`
      }) 
    }
  },

  getBanner: function() {
    var that = this;
    getHomeBanner({
      success: function(res) {
        if (res.data.code == 1) {
          that.getTodayBoard();

          that.setData({
            banners: res.data.data
          })
        } else {
          that.setData({
            status: 3
          })
        }
      },
      fail: function(res) {
        that.setData({
          status: 3
        })
      }
    })
  },

  getActivity: function() {
    var that = this;
    getActivity({
      success: function(res) {
        if (res.data.code == 1) {
          that.getRecommend()
          that.setData({
            status: 1
          })
          that.setData({
            activities: res.data.data
          })
        } else {
          that.setData({
            status: 3
          })
        }
      },
      fail: function(res) {
        that.setData({
          status: 3
        })
      }
    })
  },


  getTodayBoard: function() {

    var that = this;
    getTodayBoard({
      success: function(res) {
        if (res.data.code == 1) {
          that.getActivity();
          that.setData({
            todayMeal: res.data.data
          })
        } else {
          that.setData({
            status: 3
          })
        }
      },
      fail: function(res) {
        that.setData({
          status: 3
        })
      }
    })
  },

  getRecommend: function() {
    var that = this;
    getRecommend({
      data: {
        currentPage: 1,
        size: 10
      },
      success: function(res) {

        if (res.data.code == 1) {
          that.setData({
            recommendList: res.data.data.records
          })
        }
      },
      fail: function(res) {
        that.setData({
          status: 3
        })
      },
      complete: function() {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh({
          success: function() {
            wx.hideLoading();
          }
        }) //停止下拉刷新
      }
    })
  },

  bannerClick: function(e) {

    var index = e.currentTarget.dataset.index;
    var item = this.data.banners[index];
    var dishId = this.data.banners[index].dishId;
    var userInfo = wx.getStorageSync('userInfo');
    console.log(item)
    console.log(dishId,"+++++++++++++++")
    
    if (userInfo == '' || userInfo == null) {
      this.showDialog();
      this.setData({
        isLogin: false
      })
    } else {
      if (item.type == 'user') {
        wx.navigateTo({
          url: `../../Piazza/OthersUserCenter/OthersUserCenter?userId=${item.sence}`,
        })
      } else if (item.type == 'college') {
        wx.navigateToMiniProgram({
          appId: 'wx51c9801fd5d21a71',
          path: 'pages/Home/home/home',
          extraData: {},
          envVersion: 'release',
          success(res) {
            // 打开成功
          }
        })
      } else if (item.type == 'activity') {
        if (item.sence == 2) {
          wx.navigateTo({
            url: '../../../pages/Home/Activity/Activity'
          })
        } else if (item.sence == 11) {
          wx.navigateTo({
            url: '../PotatoFactory/PotatoFactory'
          })
        } else if (item.sence == 12) {
          wx.navigateTo({
            url: `../voteActivity/voteActivity?actId=${item.sence}`
          })
        } else if (item.sence == 14) {
          wx.navigateTo({
            url: `../Rice/Rice?actId=${item.sence}`
          })
        } else if (item.sence == 15) {
          wx.navigateTo({
            url: `../India/AboutIndia/AboutIndia`
          })
        } else if (item.sence == 17) {
          wx.navigateTo({
            url: `../Classes/Lessons/Lessons`
          })
        } else if (item.sence == 18){
          wx.navigateTo({
            url: `../Assistant/Assistant`
          }) 
        } 
        else if (item.sence == 19) {
          wx.navigateTo({
            url: `../Classes/Lesson/Lesson`
          })
        } 
      } else if (item.type == 'dish') {
        wx.navigateTo({
          url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + dishId + '&objectType=dish' + '&isFrom=normal'
        })
      }
      this.setData({
        isLogin: true
      })
    }
  },

  goDetail: function(e) {

    var dishId = e.currentTarget.dataset.index;
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo == '' || userInfo == null) {
      this.showDialog();
      this.setData({
        isLogin: false
      })
    } else {
      wx.navigateTo({
        url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + dishId + '&objectType=dish' + '&isFrom=normal'
      })
      this.setData({
        isLogin: false
      })
    }
  },

  goTodayMealDetail: function() {

    var dishId = this.data.todayMeal.dishId;
    var userInfo = wx.getStorageSync('userInfo');

    if (userInfo == '' || userInfo == null) {
      this.showDialog();
      this.setData({
        isLogin: false
      })
    } else {
      wx.navigateTo({
        url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + dishId + '&objectType=dish' + '&isFrom=normal'
      })
      this.setData({
        isLogin: true
      })
    }
  },


  testArea: function() {
    wx.navigateTo({
      url: '../../Release/CookingType/CookingType'
    })
  },
})