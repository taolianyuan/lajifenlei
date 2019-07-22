

import{
  getMyPost,
  getMePost
} from '../../../api/api.js';

var current = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgDomain: getApp().globalData.imgDomain,
    postList: [],
    status: 0,
    noMoreData: false,
    showLoading: false,
    currentPage: 1,
    pageSize: 10,
    totalPage: 0,
    menuList: [
      {
        title: '已发布',
        isChecked: true
      },
      {
        title: '待审核',
        isChecked: false
      },
      {
        title: '未通过',
        isChecked: false
      }
    ],
    current: 0,
    passList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getMePost(0);
    // this.getMePost(0, 1);
  },

 

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      passList: []
    })
    this.getMePost(current,1);
  },

  swiperChange: function (e) {

    var index = e.currentTarget.dataset.index;
    
    current = index;

    var menuList = this.data.menuList;

    menuList[index].isChecked = true;

    for (var i = 0; i < menuList.length; i++) {
      if (i != index) {
        menuList[i].isChecked = false;
      }
    }

    this.setData({
      current: index,
      menuList: menuList
    })

    this.getMePost(index, this.data.currentPage);
  },

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
      that.getMePost(current,page);
    }
  },


/*------------------------------------------------------------------------------------------------------------*/

  goReleaseMode: function () {
    wx.navigateTo({
      url: '../../Release/ReleaseProduct/ReleaseProduct'
    });
  },

  getMePost: function(index,page){
    var that = this;
    //status： 1是审核通过的  0是未审核的 2是审核未通过的
    var status = 1;
    if(index === 1){
      status = 0;
    }else if(index === 2){
      status = 2;
    }

    getMePost({
      data:{
        "currentPage": that.data.currentPage,
        "size": that.data.pageSize,
        "status": status
      },
      success: function(res){
        if(res.data.code === 1){
          
          that.data.totalPage = res.data.data.pages;
          var status;
          var list = that.data.passList;

          if (res.data.data.pages == 0) {
            status = 2;
            that.setData({
              showLoading: false,
              noMoreData: false
            })
            setTimeout(() => {
              wx.showToast({
                title: '暂无数据',
                icon: 'none',
              })
            }, 100);
          } else {

            status = 1;
            if (res.data.data.pages == page) {
              that.setData({
                showLoading: false,
                noMoreData: true
              })
            } else {
              that.data.currentPage = page;
              that.setData({
                showLoading: false,
                noMoreData: false
              })
            }

            if (page == 1) {
              list = res.data.data.records;
            } else {
              list.concat(res.data.data.postAndUser);
            }

            for (var i = 0; i < list.length; i++) {
                var postContent = JSON.parse(list[i].postContent);
                var photoList = postContent.photoList;
                var showPic = [];
                if (photoList.length > 4) {
                  showPic = photoList.slice(0,4);
                } else if (photoList.length == 3) {
                  showPic = photoList.slice(0,2);
                } else {
                  showPic = photoList;
                }

                postContent.photoList = showPic;
                list[i].postContent = postContent;
            }
          } 


          console.log(list,'listlist')

          that.setData({
            status: status,
            passList: list
          })
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
        that.stopLoading()
      }
    }) 
  },



  // getMyPost: function (page) {
  //   var that = this;
  //   getMyPost({
  //     data: {
  //       "currentPage": page,
  //       "size": that.data.pageSize
  //     },
  //     success: function (res) {

  //       if (res.data.code == 1) {

  //         that.data.totalPage = res.data.data.pages;
  //         var status;
  //         var list = that.data.postList;

  //         if (res.data.data.pages == 0) {
  //           status = 2;
  //           that.setData({
  //             showLoading: false,
  //             noMoreData: false
  //           })
  //           setTimeout(() => {
  //             wx.showToast({
  //               title: '暂无动态',
  //               icon: 'none',
  //             })
  //           }, 2000);
  //         } else {

  //           status = 1;
  //           if (res.data.data.pages == page) {
  //             that.setData({
  //               showLoading: false,
  //               noMoreData: true
  //             })
  //           } else {
  //             that.data.currentPage = page;
  //             that.setData({
  //               showLoading: false,
  //               noMoreData: false
  //             })
  //           }

  //           if (page == 1) {
  //             list = res.data.data.postAndUser;
  //           } else {
  //             list.concat(res.data.data.postAndUser);
  //           }

  //           for (var i = 0; i < list.length; i++) {
  //               var postContent = JSON.parse(list[i].post.postContent);
  //               var photoList = postContent.photoList;
  //               var showPic = [];
  //               if (photoList.length > 4) {
  //                 showPic = photoList.slice(0,4);
  //               } else if (photoList.length == 3) {
  //                 showPic = photoList.slice(0,2);
  //               } else {
  //                 showPic = photoList;
  //               }

  //               postContent.photoList = showPic;
  //               list[i].post.postContent = postContent;
  //           }
  //         } 
          
  //         that.setData({
  //           status: status,
  //           postList: list
  //         })
  //       } else {
  //         that.setData({
  //           status: 3
  //         })
  //       }
  //     },
  //     fail: function (res) {
  //       that.setData({
  //         status: 3
  //       })
  //     },
  //     complete: function () {
  //       that.stopLoading()
  //     }
  //   }) 
  // },


  goPostDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../Piazza/PostDetail/PostDetail?objectId=' + id
    })
  },


  confirmEvent: function () {
    this.getMePost(current,1);
  },
  


  stopLoading: function () {
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  }

















})