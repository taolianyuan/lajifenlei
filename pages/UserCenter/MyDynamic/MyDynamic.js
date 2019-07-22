import{
  getMyDynamic
} from '../../../api/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgDomain: getApp().globalData.imgDomain,
    dishList: [],
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
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getMyDynamic(1);
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
      that.getMyDynamic(page);
    }
  },




  goReleaseMenu: function (e) {
    wx.navigateTo({
      url: '../../Release/ReleaseMenu/ReleaseMenu'
    });
  },


  getMyDynamic: function (page) {
    var that = this;
    getMyDynamic({
      data: {
        "currentPage": page,
        "size": that.data.pageSize
      },
      success: function (res) {

        if (res.data.code == 1) {

          that.data.totalPage = res.data.data.pages;
          var status;
          var list = that.data.dishList;
    
          if (res.data.data.total == 0) {
            status = 2;
            that.setData({
              showLoading: false,
              noMoreData: false
            })
            setTimeout(() => {
              wx.showToast({
                title: '暂无菜谱',
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
              that.data.currentPage = page;
              that.setData({
                showLoading: false,
                noMoreData: false
              })
            }

            if (page == 1) {
              list = res.data.data.data;
            } else {
              list.concat(res.data.data.data);
            }
          }

          that.setData({
            status: status,
            dishList: list
          })
        } else {
          setTimeout(() => {
            wx.showToast({
              title: '网络繁忙,稍后再试~',
              icon: 'none',
            })
          }, 200);
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
      }
    }) 
  },


  goDishDetail: function (e) {
    console.log(e);
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + id + '&objectType=dish' + '&isFrom=normal'
    })

  },


  confirmEvent: function () {
    this.getMyDynamic(1);
  },































})