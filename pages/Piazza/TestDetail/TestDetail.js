
import {
  addEvaluateLike
} from '../../../api/api.js'


const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgDomain: app.globalData.imgDomain,
    evaluate: {},
    current: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var evaluate = app.globalData.evaluate;

    this.setData({
      evaluate: evaluate,
    })
    console.log(this.data.evaluate);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindanimationfinish(e){
    // console.log(e.detail.current,'--')
    this.setData({
      current: e.detail.current
    })
  },


  goPreview: function (e) {

    var index = e.currentTarget.dataset.index;
    var current = e.currentTarget.dataset.src;
    var list = this.data.evaluate.evaluatePhotos;
    var urls = [];
   
    for (var i = 0; i < list.length; i++) {
      var url = list[i];
      urls.push(this.data.imgDomain + url);
    }
      
    wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: urls // 需要预览的图片http链接列表
    })
  },

  addEvaluateLike: function () {

		wx.showLoading({
		  mask: true
		})
    var that = this;
    var evaluateId = that.data.evaluate.evaluateId + '';
    addEvaluateLike({
      data: {
        evaluateId: evaluateId 
      },
      success: function (res) {
        if (res.data.code == 1) {
					setTimeout(() =>{
						wx.hideLoading();
					},100)
          var likeCount = that.data.evaluate.likeCount + 1;
          var evaluate = that.data.evaluate;
          evaluate.likeCount = likeCount;

          that.setData({
            evaluate: evaluate
          })

        } else {
          wx.showToast({
            title: '系统繁忙,稍后再试...',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }



})