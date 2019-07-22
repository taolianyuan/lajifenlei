// pages/Home/Activity/Activity.js



var app = getApp();



Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImage: 'http://img.jishantech.com/common/activity_img/shishenzhaomu.png',
    status: 0,
    hidden: true,
    url : 'http://img.jishantech.com/common/activity_img/%E5%90%83%E5%BA%93%E8%AE%A2%E9%98%85%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.jpg',
    imgDomain: getApp().globalData.imgDomain,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var activity = options.activity;

   


    // var picName = this.formatTime(new Date());


    // console.log(picName);
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  formatTime: function (date) {  
    var year = date.getFullYear()  
    var month = date.getMonth() + 1  
    var day = date.getDate()  
    
    var picName = 'activity' + year + '-' + month + '-' + day;   
    
    return picName;
  },

  urlLoad: function (e) {
    console.log(e)

    // setTimeout(() => {
      this.setData({
        status: 1,
        hidden: false
      })
    // },1000)
    
  },

  urlError: function (e) {
    console.log(e)
    setTimeout(() => {
      this.setData({
        status: 3,
        hidden: true
      })
    },1000)
 
  },

  confirmEvent: function () {
    this.setData({
      status: 0,
      url: ''
    })

    setTimeout(() => {
      this.setData({
        status: 0,
        url:'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzg3MzA2MjE4MA==&scene=124#wechat_redirect',
      })
    },500)
  },


  previewImage: function (e) {

    var current = this.data.url;

    wx.previewImage({
      current: current, // 当前显示图片的http链接   
      urls: [current] // 需要预览的图片http链接列表   
    })  


  },


















})