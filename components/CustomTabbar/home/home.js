import{
 getRecommend,
 getTodayBoard,
 getActivity,
 getBanner,

} from '../../../api/api.js';

var app = getApp();
const localData = require('../../../utils/localData');

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
    banners: [],
    imgDomain: getApp().globalData.imgDomain,
    // businessKey: wx.getStorageSync('businessKey'),
    recommendList: [],
    todayMeal:{},

    headerImg: '/dish/ff213de1f7a149b289556000dba86e256933484993625663575.png',
    more: ['../BoardHistory/BoardHistory','../RecommedHistory/RecommedHistory'],
    activities: [],
    isIphoneX : app.globalData.isIphoneX
  },

  /**
   * 组件的方法列表
   */
  methods: {

    

    goLaboratory: function () {
      // wx.navigateTo({
      //   url: 
      // })
    },

    goCollege: function () {
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

    clickMore: function (e) {
      var index = e.currentTarget.dataset.index;
      console.log(index);
      wx.navigateTo({
        url: this.data.more[index-1],
      })
    },

    goActivities: function (e) {
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
          url : '../../../pages/Activity/activity/activity'
        })
      } else if (actId == 2) {
        wx.navigateTo({
          url : '../../../pages/Home/Activity/Activity'
        })
      } else if (actId == 1) {
        wx.navigateTo({
          url: '../../../pages/Activity/NewYearDinner/NewYearDinner'
        })
      }else if(actId == 6){
        
        var userInfo = this.data.activities[index].dishIds;


        // console.log(userInfo)
        // var ParseDishIds = JSON.parse(userInfo)

        // console.log(ParseDishIds)
        // var userId = ParseDishIds.userId
        // console.log(userId)

        var userId = userInfo.split(',')[0].split(':')[1]
        console.log(userId)
        wx.navigateTo({
          url: '../../../pages/Piazza/OthersUserCenter/OthersUserCenter?userId=' + userId
        })
      } else if (actId == 8) {
        wx.navigateTo({
          url: '../../../pages/SauceLib/SauceLib/SauceLib'
        })
      }

      


      // if (actUrl != '' && actUrl != null) {
        // wx.navigateTo({
        //   url: '../../../pages/Home/Activity/Activity?activity=' + actUrl 
        // })
      // } else {
      //   wx.showToast({
      //     title: '敬请期待!',
      //   })
      // }
    },

    getBanner: function () {
      var that = this;
      getBanner({
        success: function (res) {
          if (res.data.code == 1) {
            
            that.setData({
              banners: res.data.data
            })
            console.log(that.data.banners);
          }
        }
      })
    },

    getActivity: function (){
      var that = this;
      getActivity({
        success: function(res) {
          if (res.data.code == 1) {
            that.setData({
              activities: res.data.data
            })
            console.log(that.data.activities)
          }
        }
      })
    },


    getTodayBoard: function () {

      var that = this;
      getTodayBoard({
        success: function(res) {
          if (res.data.code == 1) {
            that.setData({
              todayMeal: res.data.data
            })
          }
        }
      })
    },

    getRecommend: function () {
      var that = this;
      getRecommend({
        data: {
          currentPage: 1,
          size: 3
        },
        success: function (res) {
          
          if (res.data.code == 1) {
            // console.log('getRecommend')
            var list = [];
            if (res.data.data.length > 3) {
              for (var i = 0; i < 3; i++) {
                list.push(res.data.data[i])
              }
            } else {
              list = res.data.data;
            }
            that.setData({
                recommendList: list
            })
            
            console.log(that.data.recommendList)
          }
        }
      })
    },

    bannerClick: function (e) {

      var index = e.currentTarget.dataset.index;
      var dishId = this.data.banners[index].dishId;

      console.log(e);
        wx.navigateTo({
          url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + dishId + '&objectType=dish' + '&isFrom=normal'
        })

    },

    goDetail: function (e) {

      var dishId = e.currentTarget.dataset.index;

      console.log(e);
        wx.navigateTo({
          url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + dishId + '&objectType=dish' + '&isFrom=normal'
        })

    },

    goTodayMealDetail: function (){

      var dishId = this.data.todayMeal.dishId;
      wx.navigateTo({
         url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + dishId + '&objectType=dish' + '&isFrom=normal'
      })
    },



  
  },




  attached: function () {
    this.refreshView = this.selectComponent("#refreshView");
    this.getBanner();
    this.getRecommend();
    this.getTodayBoard();
    this.getActivity();

  },

  moved: function () {
    console.log('move');
  },

  ready: function () {
    console.log('ready');
  },














})
