// pages/Home/Classes/details/details.js


// https://img.jishantech.com/common/homePage/youhui.png
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgDomain: getApp().globalData.imgDomain,
    banners:[
      'https://img.jishantech.com/common/waste_temporary/主图6.jpg',
      'https://img.jishantech.com/common/waste_temporary/主图.jpg',
      'https://img.jishantech.com/common/waste_temporary/主图2.jpg',
      'https://img.jishantech.com/common/waste_temporary/主图3.jpg',
      'https://img.jishantech.com/common/waste_temporary/主图5.jpg',
    ],
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(options,'+++++++++++')
    var that = this
    that.setData({
      discountAmount: options.discountAmount
    })
  },

 
  goplay: function () {
    var that = this
    wx.navigateTo({
      url: `../Order/Order?discountAmount=${that.data.discountAmount}`
    })
  },


  goShare: function () {
    wx.navigateTo({
      url: `../../India/IndiaShare/IndiaShare`
    })
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  }
})