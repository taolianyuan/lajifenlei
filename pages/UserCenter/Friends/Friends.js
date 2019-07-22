import{
  getFriendDynamic,
  follow,
  unFollow,
  likeSomething,
  shareSomething
} from '../../../api/api.js';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgDomain: getApp().globalData.imgDomain,
    businessKey: wx.getStorageSync('businessKey'),
    newsList: [],
    star: false,
    dishId: 0,
    fansId: 0,
    status: 0,

    noMoreData: false,
    showLoading: false,
    currentPage: 1,
    pageSize: 10,
    totalPage: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFriendDynamic(1);
  },

  onPullDownRefresh: function () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.showNavigationBarLoading();
    this.getFriendDynamic(1);
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
      that.getFriendDynamic(page);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function( options ){

　　 var that = this;

    var section = options.target.dataset.section;
    var objectType = that.data.newsList[section].feedAndUserVO.feed.objectType;
    var objectId = that.data.newsList[section].feedAndUserVO.feed.objectId;

　　 var shareObj = {
　　　　title: "吃库料理",       
　　　　path: '',        
　　　　imageUrl: '',     
　　　　success: function(res){
　　　　　　// 转发成功之后的回调
　　　　　　if(res.errMsg == 'shareAppMessage:ok'){
            shareSomething({
              data: {
                objectType: objectType,
                objectId: objectId
              },
              success: function (res) {
                if (res.data.code == 1) {
                  
                }
              },

            })

　　　　　　}
　　　　},
　　　　fail: function(){
　　　　　　// 转发失败之后的回调
　　　　　　if(res.errMsg == 'shareAppMessage:fail cancel'){
　　　　　　　　// 用户取消转发
　　　　　　}else if(res.errMsg == 'shareAppMessage:fail'){
　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
　　　　　　}
　　　　},
　　　　complete: function(){
　　　　　　// 转发结束之后的回调（转发成不成功都会执行）
　　　　}
　　 };

　　if( options.from == 'button' ){
　　  

    var nickName = that.data.newsList[section].feedAndUserVO.nickName;
    var content = that.data.newsList[section].feedAndUserVO.feed.content.postText;
    var imageUrl = that.data.imgDomain + that.data.newsList[section].feedAndUserVO.feed.content.photoList[0];

     if (objectType == 'dish' || objectType == 'sauce') {
        shareObj.path = 'pages/Piazza/DynamicDetail/DynamicDetail?objectId=' + objectId + '&objectType=' + objectType + '&isFrom=normal';
        shareObj.title = nickName + '  大神的  ' + content + '  分享给你~  ';
        shareObj.imageUrl = imageUrl;
      } else if (objectType == 'post') {
        shareObj.path = 'pages/Piazza/PostDetail/PostDetail?objectId=' + objectId + '&objectType=' + objectType;
        shareObj.title = ' 快来围观 ' + nickName + '  的状态  ' + content;
        shareObj.imageUrl = imageUrl;
      }
　　} 

　　return shareObj;
  },

  shareFriends: function(e){ 
    var section = e.currentTarget.dataset.section;
    var objectType = this.data.newsList[section].feedAndUserVO.feed.objectType;
    var objectId = this.data.newsList[section].feedAndUserVO.feed.objectId;

    wx.navigateTo({
      url: `../../sharePage/sharePage?isfrom=${objectType}&objectId=${objectId}`,
    })
  },

  shareSomething: function () {
  },

/*-----------------------------自定义方法----------------------------------------------*/

   goOthersCenter: function (e) {
      var index = e.currentTarget.dataset.index;
      var userId = this.data.newsList[index].userId;
      console.log(userId);
      wx.navigateTo({
        url: '../../Piazza/OthersUserCenter/OthersUserCenter?userId=' + userId
      })
    },


    goNewsDetail: function (e) {

      var section = e.currentTarget.dataset.section;
      var objectType = this.data.newsList[section].feedAndUserVO.feed.objectType;
      var objectId = this.data.newsList[section].feedAndUserVO.feed.objectId;
      // console.log(section,objectType,objectId,'-----')
      
      if (objectType == 'dish' || objectType == 'sauce') {
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
      var data = { businessKey: that.data.businessKey, followedUser: user.feedAndUserVO.feed.fansId };

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

    getFriendDynamic: function (page) {

      var that = this;

      getFriendDynamic({
        data: {
          currentPage: page,
          size: that.data.pageSize
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.code == 1) {
            that.data.totalPage = res.data.data.pages;
            that.data.currentPage = page;

            var status = 0;
            var list = that.data.newsList;

            if (res.data.data.pages == 0) {
              status = 2;
              that.setData({
                showLoading: false,
                noMoreData: false
              })
              
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
                list = res.data.data.feedAndUser;
              } else {
                list = list.concat(res.data.data.feedAndUser);
              }

              for (var i = 0; i < list.length; i++) {          

                var jsonStr = list[i].feedAndUserVO.feed.content;

                if (jsonStr != null && '' != jsonStr) {

                  if (typeof jsonStr != 'object') {

                    jsonStr = jsonStr.replace(/\ufeff/g, "");

                    var obj = JSON.parse(jsonStr);

                    if (obj != null) {
                      list[i].feedAndUserVO.feed.content = obj;
                    }

                  } else {

                  }
                }
              }
            }
            that.setData({
              status: status,
              newsList: list
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


    // share: function

    likeSomething: function (e) {
			
			wx.showLoading({
			  mask: true
			})
      var that = this;
      var section = e.currentTarget.dataset.section;
      var objectId = that.data.newsList[section].feedAndUserVO.feed.objectId;
      var objectType = that.data.newsList[section].feedAndUserVO.feed.objectType;
      var list = that.data.newsList;
      var likeCount;

      if (list[section].feedAndUserVO.count) {
        likeCount = list[section].feedAndUserVO.count.likeCount;
      } else {
        list[section].feedAndUserVO.count = {};
        likeCount = 0;
      }

      likeSomething({
        data: {
          objectType: objectType,
          objectId: objectId
        },
        success: function (res) {
          console.log(res)
          if (res.data.code == 1) {
						
						setTimeout(() => {
							wx.hideLoading()
						},100)
						
            likeCount ++;
            list[section].feedAndUserVO.count.likeCount = likeCount;
            that.setData({
              newsList: list
            })
          } else {
						wx.showToast({
							title: '系统繁忙,稍后再试~',
							icon: 'none',
							duration: 2000
						})
					}
        }
      })
    },

    confirmEvent: function () {
      wx.startPullDownRefresh();
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

    goOthersCenter: function (e) {
      var userId = e.currentTarget.dataset.id;
  
      wx.navigateTo({
        url: '../../Piazza/OthersUserCenter/OthersUserCenter?userId=' + userId
      })
    },




  
})