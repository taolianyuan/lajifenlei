

import{
 browerHistory
} from '../../../api/api.js';

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dishes:[],
    sauces:[],
    imgDomain: app.globalData.imgDomain,
    menuList: [
      {
        title: '菜谱',
        isChecked: true
      },
      {
        title: '酱汁',
        isChecked: false
      }
    ],
    current: 0,
    status_dish: 0,
    status_sauce: 0,
    status_all: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.browerHistory();
  },

  bindchange: function (e) {

    if (e.detail.source == 'touch') {
      var current = e.detail.current;
      var menuList = this.data.menuList;

      menuList[current].isChecked = true;

      for (var i = 0; i < menuList.length; i++) {
        if (i != current) {
          menuList[i].isChecked = false;
        }
      }

      this.setData({
        current: current,
        menuList: menuList
      })
    }
  },

 

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  browerHistory: function () {
    var that = this;
    browerHistory({
      data: {
        businessKey: wx.getStorageSync('businessKey'),
      },
      success: function (res) {
        
        if (res.data.code == 1) {

          var dishes = res.data.data.dish;
          var sauces = res.data.data.sauce;

          if (dishes.length > 30) {
            dishes = dishes.slice(0, 30);
          } else if (sauces.length > 30) {
            sauces = sauces.slice(0, 30);
          }

          var status_sauce = res.data.data.sauce.length == 0 ? 2 : 1;
          var status_dish = res.data.data.dish.length == 0 ? 2 : 1;

          that.setData({
            status_all: 1,
            status_sauce: status_sauce,
            status_dish: status_dish,
            dishes: dishes,
            sauces: sauces
          })

        } else {
          that.setData({
            status_all: 3
          })
        } 
      },
      fail: function (res) {
        that.setData({
          status_all: 3,
        })
      }
    })
  },



  goDetail: function (e) {

    console.log(e.currentTarget.dataset,'set')
    var index = e.currentTarget.dataset.index;
    var type = e.currentTarget.dataset.type;
    var id = e.currentTarget.dataset.id;
    // var dish = this.data.recommendList[index];
    var dish = '';

    if(type == 'dish'){
      dish = this.data.dishes[index];
    }else{
      dish = this.data.sauces[index];
    }
    wx.navigateTo({
      url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + id + '&objectType=' + type
    })

      
  },

  confirmEvent: function () {
    this.browerHistory();
  },


  swiperChange: function (e){

    var index = e.currentTarget.dataset.index;
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
  },


  















})