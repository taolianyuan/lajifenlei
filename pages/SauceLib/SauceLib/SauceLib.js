  

import{
 getSauceByCookId
} from '../../../api/api.js';

var leftList = new Array();//左侧集合
var rightList = new Array();//右侧集合
var leftHight = 0, rightHight = 0, itemWidth = 0, maxHeight = 0;

Page({


  /**
   * 组件的初始数据
   */
  data: {
    animation: {},
    number: 0,
    imgDomain: getApp().globalData.imgDomain,
    loadingCount: 0,
    sauceList: [],
    current: 0,
    srcs:[],
    cookId: 1,
    menuList: [
      {title: '凉拌', isChecked:  true, cookId: 1 },
      {title: '热烹', isChecked: false, cookId: 2 },
      {title: '蘸料', isChecked: false, cookId: 3 },
      {title: '腌制', isChecked: false, cookId: 4 },
      {title: '配菜', isChecked: false, cookId: 5 },
    ],
    status: 0,

    noMoreData: false,
    showLoading: false,
    currentPage: 1,
    pageSize: 10,
    totalPage: 0,
    isLogin: false
  },

  /**
   * 组件的方法列表
   */
    
    didSelectedItem: function (e) {
      var oid = e.currentTarget.dataset.oid;
      var userInfo = wx.getStorageSync('userInfo');

      if(userInfo =='' || userInfo == null){
        this.showDialog();
        this.setData({
          isLogin: false
        })
      }else{
        wx.navigateTo({
          url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + oid + '&objectType=sauce' + '&isFrom=normal'
        })

        this.setData({
          isLogin: true
        })
      }
     

    },

    menuClicked: function (e) {

      var current = e.currentTarget.dataset.index;
      var menuList = this.data.menuList;
      var cookId = menuList[current].cookId;


      menuList[current].isChecked = true;

      for (var i = 0; i < menuList.length; i++) {
        if (i != current) {
          menuList[i].isChecked = false;
        }
      }

      this.setData({
        status: 0,
        cookId: cookId,
        menuList: menuList,
        current: current
      })

      wx.startPullDownRefresh()
    },

  
  onLoad: function (options) {
    // this.getSauceByCookId(this.data.current, 1);

  },

  onShow: function(){
    this.dialog = this.selectComponent("#dialog");

    var userInfo = wx.getStorageSync('userInfo');

    if (userInfo == null || userInfo == "") {
      console.log('userInfo');
      console.log(userInfo);
      this.showDialog();
      this.setData({
        isLogin: false
      })
    } else {
      this.setData({
        isLogin: true
      })
    }
		this.getSauceByCookId(this.data.current, 1);
  },

  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {

  },


  showDialog: function () {
    this.dialog.showDialog();
  },

  hiddenToast: function () {
    this.dialog.hideDialog();
  },

  cancleEvent: function () {
    this.dialog.hideDialog();
  },


  onPullDownRefresh: function () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.showNavigationBarLoading();
    this.getSauceByCookId(this.data.current, 1);
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
		
		wx.showLoading({
			title:'加载中...',
			mask:true
		})

    this.setData({
      showLoading: true,
      noMoreData: false
    })

    let that = this;
    if (!that.data.noMoreData && that.data.showLoading) {
      var page = this.data.currentPage + 1;
      this.getSauceByCookId(this.data.current, page);
    }
  },

  getSauceByCookId: function (cookId, page) {

    var that = this;

    getSauceByCookId({
      data: {
        cookId: that.data.cookId,
        currentPage: page,
        size: that.data.pageSize
      },
      success: function (res) {

        if (res.data.code == 1) {

          var status = 0;
          that.data.totalPage = res.data.data.pages;
          that.data.currentPage = page;
          if (res.data.data.total == 0) {
            status = 2;
            that.setData({
              status: status,
              showLoading: false,
              noMoreData: false,
            })
          } else {

            if (page == 1) {
              var list = res.data.data.records;
              that.setData({
                sauceList: list
              })
            } else {
              var list = that.data.sauceList;
              var arr = res.data.data.records;

              if (list.length == res.data.data.total) { 
                return;
              }
              list = list.concat(arr);

              that.setData({
                sauceList: list
              })
            }

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
            
            that.setData({
              status: status,
            })
          }
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
        setTimeout(() => {
          wx.hideLoading();
        }, 100);  
        wx.hideNavigationBarLoading({
          success: function () {
            wx.hideLoading();
          }
        }) //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },


  confirmEvent: function () {
    this.getSauceByCookId();
  },

  showAction: function () {
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
        success: function (e) {
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
    













})
