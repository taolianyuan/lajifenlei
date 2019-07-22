import {
  getRemaining,
  addUserCoupon,
  getCoupon,
  getUserCoupon
} from '../../../../api/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    peopleArr: [],

    perPrice: 0,
    oneMorningCount: 0,
    oneEveningCount: 0,
    twoMorningCount: 0,
    twoEveningCount: 0,
    imgDomain: getApp().globalData.imgDomain,
    status:1
  },



  // handleContact: function (e){
  //   console.log(e)
  // },



  goShare: function () {
    wx.navigateTo({
      url: `../../India/IndiaShare/IndiaShare`
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var businessKey = wx.getStorageSync('businessKey');
    // console.log(businessKey)

    this.getRemaining();
   
    this.getCoupon()
    
  
    var peopleArr = this.data.peopleArr;
    for (let i = 0; i < 8; i++) {
      peopleArr.push(0);
    }
    this.setData({
      peopleArr,
      businessKey
    })
 

    //this.getUserCoupon()

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

  
  goAssistant:function(){
    wx.navigateTo({
      url: "/pages/Home/Assistant/Assistant",
    })
    // wx.navigateBack({
    //   delta:1
    // })
  },




  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var that = this
     
     return{
       title:"干湿分离双层垃圾桶优惠券",
       path:"pages/Home/Classes/Lesson/Lesson",
       imgUrl:"https://img.jishantech.com/common/homePage/youhui.png"
     }
 
  },

  // 查询优惠
  getCoupon:function(){
    var that =this
    getCoupon({
      success:function(res){
        //console.log(res,"++++++++++++")
        if (res.data.code == 1){
          that.setData({
            couponCode: res.data.data.couponCode,
            discountAmount: res.data.data.discountAmount
          })
        }
      }
    })
  },


  // 领取优惠券
  receive:function(){
    var that = this
    var couponCode = that.data.couponCode
    var discountAmount = that.data.discountAmount
    var businessKey = wx.getStorageSync('businessKey');
    //var businessKey = that.data.businessKey
    //console.log(businessKey,'————————————————————————————————————')
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo == '' || userInfo == null) {
      this.showDialog();
      this.setData({
        isLogin: false
      })
    } else {
      this.setData({
        isLogin: true
      })
      addUserCoupon({
        data: {
          businessKey: businessKey,
          couponCode: couponCode,
          discountAmount: discountAmount,
        },
        success: function (res) {
          console.log(res)
          if(res.data.code ==1){
             if( res.data.data == 1){
              //  wx.showToast({
              //    title: '领取成功',
              //    icon: "none",
              //    duration: 1500
              //  })
               wx.navigateTo({
                 url: `../details/details?discountAmount=${that.data.discountAmount}`
               })
             } else if (res.data.data == 2){
               wx.showToast({
                 title: '亲，您已领取过优惠券哦~~~',
                 icon: "none",
                 duration: 3000
               })
               setTimeout(function () {
                 wx.navigateTo({
                   url: `../details/details?discountAmount=${that.data.discountAmount}`
                 })
               }, 1000)
             }else{
               wx.showToast({
                 title: '领取失败',
                 icon: "none",
                 duration: 1500
               })
             }
            // that.setData({
            //   status:2
            // })
          }else{
            wx.showToast({
              title: '领取失败',
              icon: "none",
              duration: 1500
            })
          }
        }
      })
    }
  },


  // getUserCoupon:function(){
  //   var that = this
  //   getUserCoupon({
  //     data:{
  //       businessKey: that.data.businessKey
  //     },
  //     success:function(res){
  //       console.log(res,"++++11")
  //     }
  //   })
  // },


 

  goSignUp: function() {
    // wx.navigateTo({
    //   url: `../Order/Order?perPrice=${this.data.perPrice}`
    // })

      wx.navigateTo({
      url: `../Order/Order`
     })
  },



  getRemaining: function() {

    var that = this;

    getRemaining({
      success: function(res) {
       // console.log(res);
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

  goShare: function() {
    wx.navigateTo({
      url: `../../India/IndiaShare/IndiaShare`
    })
  }


})