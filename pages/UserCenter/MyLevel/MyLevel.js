// pages/UserCenter/MyLevel/MyLevel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  skipToCollege: function(){
    wx.navigateToMiniProgram({
      appId: 'wx51c9801fd5d21a71',
      path: 'pages/Home/home/home',
      extraData: {
        // foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
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