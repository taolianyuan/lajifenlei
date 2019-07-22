
import {
  potatoActivity
} from '../../../api/api.js';

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImage: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/potato/potato_bg.png?sign=c03c4c66ba735ba8b92ed8d162b0a181&t=1552289840',
    currentDish: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/potato/potato_center.png?sign=02caf505a67a8c58ed486d179e9a39b1&t=1552295156',
    button: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/potato/potato_button.png?sign=e899337bed5c9705ee59ccee61fa0f80&t=1552297801',
    more: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/potato/more_diary.png?sign=abcf79e032d2750a61b5080016b34f84&t=1552298313',
    share: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/potato/potato_share.png?sign=57f9408ace7916cae318e383c0ad838a&t=1552298393',
    potatoDate: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/potato/potato_0315.png?sign=b8018addb73c2d38788d83ab307cb839&t=1552299093',
    potato: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/potato/potato.png?sign=1b3001da5baa916cbe5b8b7bdc2394f0&t=1552300221',
    add: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/potato/potato_add.png?sign=b04bbb7f8286fdfd4eae43c9ab6695f1&t=1552361046',
    dishList: [],
    imgDomain: app.globalData.imgDomain,
    cartoonUrl: '',
    photoUrl: '',
    currentId: '',
    currentIndex: 0,
    placeholder: '../../../img/placeholder_img_m.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var now = this.formatTime();

    this.potatoActivity();

    this.setData({
      now
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  goShare: function () {
		
    wx.navigateTo({
      url: '../../sharePage/sharePage?isfrom=potato&index=' + this.data.currentIndex
    })
  },

  goDetail: function(e) {
    var id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../../Piazza/DynamicDetail/DynamicDetail?objectType=dish&objectId=' + id
    })
  },

  goCenterDetail: function() {

    
    wx.navigateTo({
      url: '../../Piazza/DynamicDetail/DynamicDetail?objectType=dish&objectId=' + this.data.currentId
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  potatoActivity: function () {
    var that = this;
    potatoActivity({
      success: function (res) {

        if (res.data.code == 1) {
					
					var dishList = res.data.data.dishList;
					that.setData({
					  dishList ,
					  photoUrl: res.data.data.photoUrl,
					  cartoonUrl: res.data.data.cartoonUrl
					})
					
					for (var i = 0; i < dishList.length; i++) {
					  if (dishList[i].aboutInfo.status == 1) {
					    that.setData({
					      currentId: dishList[i].dishId,
					      currentIndex: i
					    })
					  }
					}

         
        }
      }
    })
  },

  //生成时间戳
  formatTime: function () {
    var date = new Date();
    var month = date.getMonth() + 1
    var day = date.getDate()

    var picName = 'potato' + '-' + month + '-' + day;

    return picName;
  },


})