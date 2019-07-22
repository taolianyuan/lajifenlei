// pages/Home/Dinner/Result/Result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    console.log(options,"++++++++++++++")
    var arry = JSON.parse(options.markes)
    console.log(arry)
   
    var restaurantId = arry["0"].restaurantId
    console.log(restaurantId,"++++++++++++++")

    that.setData({
      lists: arry,
      restaurantId:arry["0"].restaurantId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


// 返回主页
  bthome:function(){
    wx.navigateTo({
      url: "/pages/Home/Dinner/Choice/Choice",
    })
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
  onShareAppMessage: function (res) {
     var that = this
    // var aa = this.data.restaurantId
    // console.log(aa, "________________")
    if (res.from === 'button') {
      that.data.shareBtn = true;
    } else {
      //来自右上角转发
      that.data.shareBtn = false;
    } 
    return {
      title: '自定义转发标题',
      path: '/pages/Home/Dinner/Details/Details?id=' + 1 + "&goodaid=" + this.data.restaurantId,
    }
  }
})