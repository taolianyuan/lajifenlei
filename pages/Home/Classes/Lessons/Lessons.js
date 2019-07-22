import {
  getRemaining

} from '../../../../api/api.js';

var globalData = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    signUp: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/lesson/bm.png?sign=179f2979c9fb69c293f2b7f5b53fcd0f&t=1558681641',
    elephant: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/lesson/xiang.png?sign=845b7fd1a23ae4ffd6ed6a314f31cf55&t=1558681662',
    content: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/lesson/title.png?sign=d79382a0222f48717285e79e64130ca8&t=1558681706',
    peopleDes: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/lesson/icon.png?sign=f98125a8a9acfe0bb74362bc1ea48896&t=1558682757',
    peopleSel: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/lesson/icons.png?sign=8dcec053abce1f766102df00b6be3af9&t=1558682702',
    share: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/lesson/lesson_share.png?sign=31a524cb7c01484d8ab20391383863dc&t=1558685007',
    peopleArr: [],

    perPrice: 0,
    oneMorningCount: 0,
    oneEveningCount: 0,
    twoMorningCount: 0,
    twoEveningCount: 0,
    imgDomain: getApp().globalData.imgDomain,
    
  },
   
  //  拨打电话
  phone:function(){
    wx.makePhoneCall({
      phoneNumber: '13501624424' 
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // this.getRemaining();
    // var peopleArr = this.data.peopleArr;
    // for (let i = 0; i < 8; i++) {
    //   peopleArr.push(0);
    // }
    // this.setData({
    //   peopleArr
    // })

    this.dialog = this.selectComponent("#dialog");
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo == null || userInfo == "") {
      this.showDialog();
      this.setData({
        isLogin: false,
      })
    } else {
      this.setData({
        isLogin: true
      })
    }
  },


  showDialog: function () {
    this.dialog.showDialog();
  },

  confirmEvent: function () {
    this.dialog.hideDialog();
  },

  cancleEvent: function () {
    this.dialog.hideDialog();
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var userInfo = wx.getStorageSync('userInfo');

    if (userInfo == null || userInfo == "") {
      return;
    } else {
     // this.getUserInfo();
      this.setData({
        isLogin: true
      })
    }
  },

 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  goSignUp: function () {
    // wx.navigateTo({
    //   url: `../Order/Order?perPrice=${this.data.perPrice}`
    // })
    var userInfo = wx.getStorageSync('userInfo');
     var that = this
    if (userInfo == '' || userInfo == null) {
      this.showDialog();
      this.setData({
        isLogin: false
      })
    } else {
      this.setData({
        isLogin: true
      })
      wx.navigateTo({
        url: `../Order/Order`
      })
    }
    
  },


  getRemaining: function () {

    var that = this;

    getRemaining({
      success: function (res) {
        console.log(res);
        if (res.data.code == 1) {

          var arr = res.data.data;
          var oneMorningCount = arr[0].productBuyCount;
          var oneEveningCount = arr[1].productBuyCount;
          var twoMorningCount = arr[2].productBuyCount;
          var twoEveningCount = arr[3].productBuyCount;
          var perPrice = arr[0].paymentAmount;
          that.setData({
            oneMorningCount,
            oneEveningCount,
            twoMorningCount,
            twoEveningCount,
            perPrice
          })
        }
      }
    })
  },

  goShare: function () {
    var userInfo = wx.getStorageSync('userInfo');
    var that = this
    if (userInfo == '' || userInfo == null) {
      this.showDialog();
      this.setData({
        isLogin: false
      })
    } else{
      this.setData({
        isLogin: true
      })
      wx.navigateTo({
        url: `../../India/IndiaShare/IndiaShare?index=1`
      })
    }
  }

})