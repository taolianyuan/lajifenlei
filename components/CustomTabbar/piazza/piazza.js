
import{
  getFeedPage,
  follow,
  unFollow,
  likeSomething,
  getRecommend
} from '../../../api/api.js';


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
    imgDomain: getApp().globalData.imgDomain,
    // businessKey: wx.getStorageSync('businessKey'),
    newsList: [],
    recommendList:[],
    star: false,
    fansId: 0,
    current: 0,
    isIphoneX: getApp().globalData.isIphoneX,
    status_pia: 0,
    status_rec: 0,
  },
  
  /**
   * 组件的方法列表
   */
  methods: {


    goMessage: function () {
      console.log(22222)
      wx.navigateTo({
        url: '../Message/Message'
      })
    },

    starSomeOne: function (e) {
      // var index = e.currentTarget.dataset.index;
      // var list = this.data.newsList
      // var star = list[index].star
      // list[index].star = !star;
      // this.setData({
      //   newsList: list
      // })
      console.log(index)
    },


/*---------------------------------------------------------------------------------------------------------------------*/

    goOthersCenter: function (e) {
      var section = e.currentTarget.dataset.section;
      var userId = this.data.newsList[section].feed.userId;
      console.log(userId);
      wx.navigateTo({
        url: '../../Piazza/OthersUserCenter/OthersUserCenter?userId=' + userId
      })
    },


    goNewsDetail: function (e) {

      var section = e.currentTarget.dataset.section;
      var objectType = this.data.newsList[section].feed.objectType;
      var objectId = this.data.newsList[section].feed.objectId;
       
      if (objectType == 'dish') {
        wx.navigateTo({
          url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + objectId + '&objectType=' + objectType + '&isFrom=normal'
        })
      } else if (objectType == 'post') {
        wx.navigateTo({
          url: '../../Piazza/PostDetail/PostDetail?objectId=' + objectId + '&objectType=' + objectType
        })
      }
      
    },

    changeStatus: function (e) {

      var that = this;
      var index = e.currentTarget.dataset.index;
      var user = that.data.newsList[index];
      var data = { followedUser: user.feed.fansId };

      wx.showLoading({
        title:'操作中...',
        icon: 'none',
        mask: 'true'
      })

      if (user.status == 0) {

        follow({
          data: data,
            success: function (res) {
              console.log('follow')
              console.log(res)
              if (res.data.code == 1) {
                that.data.newsList[index].status == 2
                setTimeout(() => {
                  wx.showToast({
                    title: '已关注',
                    icon: 'success',
                  })
                   wx.hideLoading();
                }, 100);
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
                that.data.newsList[index].status == 0

                setTimeout(() => {
                  wx.showToast({
                    title: '已取消关注',
                    icon: 'success',
                  })
                   wx.hideLoading();
                }, 100);
              }
            }
        })
      }
    },

    getFeedList: function () {

      var that = this;

      getFeedPage({
        data: {
          currentPage: 1,
          size: 20
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.code == 1) {
            console.log('getFeedPage')
            var list = res.data.data.feedAndUser;
            var time = '';
            var timeList = [];
            for (var i = 0; i < list.length; i++) {
              var content = JSON.parse(list[i].feed.content);
              list[i].feed.content = content;
            }
            var status_pia = res.data.data.length == 0 ? 2 : 1;
            that.setData({
              newsList: list,
              status_pia: status_pia,
            })
          }
        },
        fail: function (res) {
          that.setData({
            status_pia: 3
          })
        }
      })
    },


    // share: function

    likeSomething: function (e) {
      var that = this;
      var index = e.currentTarget.dataset.index;
      var objectId = that.data.newsList[index].feed.objectId;
      var objectType = that.data.newsList[index].feed.objectType;
      var list = that.data.newsList;
      var likeCount = list[index].count.likeCount;

      console.log(index)
      console.log(objectId)
      console.log(objectType)
      likeSomething({
        data: {
          objectType: objectType,
          objectId: objectId
        },
        success: function (res) {
          console.log(res)
          if (res.data.code == 1) {
            list[index].count.likeCount = likeCount + 1;
            that.setData({
              newsList: list
            })
          }
        }
      })
    },


    segment: function(e) {
      var current = e.currentTarget.dataset.index;
      
      this.setData({
        current: current
      })
    },

    bindchange: function (e) {

      if (e.detail.source == 'touch') {
        var current = e.detail.current;
        this.setData({
          currentPage: current,
        })
      }
    },


    getRecommend: function () {
      var that = this;
      getRecommend({
        data: {
          currentPage: 1,
          size: 20
        },
        success: function (res) {
          
          if (res.data.code == 1) {

            var status_rec = res.data.data.length == 0 ? 2 : 1;
            that.setData({
              status_rec: status_rec,
              recommendList: res.data.data
            })
            
            console.log(that.data.recommendList)
          }
        },
        fail: function (res) {
          that.setData({
            status_rec: 3
          })
        }
      })
    },


    swiperDidEndScroll: function (e) {
      var current = e.detail.current;

      this.setData({
        current: current
      })
    },


    goPreview: function (e) {

      var section = e.currentTarget.dataset.section;
      var list = this.data.newsList[section].feed.content.photoList;
      var current = e.target.dataset.src;

      var urls = [];
     
      for (var i = 0; i < list.length; i++) {
        var url = list[i];
        urls.push(this.data.imgDomain + url);
      }
        
      wx.previewImage({
          current: current, // 当前显示图片的http链接
          urls: urls // 需要预览的图片http链接列表
      })
    },

    confirmEvent: function () {
      if (this.currentPage == 0) {
        this.getFeedList();
      } else {
        this.getRecommend();
      }
    },


    goDetail: function (e) {
      var index = e.currentTarget.dataset.index;
      var dish = this.data.recommendList[index];

        wx.navigateTo({
          url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + dish.dishId + '&objectType=dish' + '&isFrom=normal'
        })
    },







  },






  attached: function (){
    this.getRecommend();
    this.getFeedList();
  }

    
  // }




})















