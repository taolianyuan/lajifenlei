
import {
	getPuzzleImg
} from '../../../../api/api.js';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
		imgDomain: getApp().globalData.imgDomain,
		imageUrl: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/India/about_india.png?sign=860b6b186aec747125d61fca8c2a0f76&t=1557052362',
		start: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/India/start_game.png?sign=03bae42dce7e006dee3a63b223611498&t=1557108728',
		interval: '',
		status: '',
		photoUrl: '',
		isLogin: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  
	  this.dialog = this.selectComponent("#dialog");
	  
	  
	  this.ifLogin()
	  
	  
  },
  
  onShow(){
	  var userInfo = wx.getStorageSync('userInfo');
	  if (userInfo) {
	  	this.setData({
	  		isLogin: true
	  	})
	  }
  },
  
  showDialog: function () {
    this.dialog.showDialog();
  },
  
  confirmEvent: function() {
  	this.dialog.hideDialog();
  },
  
  cancleEvent: function() {
  	this.dialog.hideDialog();
  },
  
  ifLogin() {
	  
	  var userInfo = wx.getStorageSync('userInfo');
	  if (userInfo == null || userInfo == "") {
	  
	  	this.showDialog();
	  	this.setData({
	  		isLogin: false
	  	})
		
	  } else {
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
  
  startGame: function () {
	  
		var userInfo = wx.getStorageSync('userInfo');
		if (userInfo == null || userInfo == "") {
		
			this.showDialog();
			this.setData({
				isLogin: false
			})
			return;
		} else {
			this.setData({
				isLogin: true
			})
		}
	  
	  this.getPuzzleImg();
	  
	  
  },
  
	getPuzzleImg: function () {
		var that = this;
		getPuzzleImg({
			success: function (res) {
				console.log(res)
				if (res.data.code == 1) {
					
					wx.setStorageSync('indiaDishId',res.data.data.dishId);
					wx.setStorageSync('indiaSaveImg',res.data.data.wechatUrl);
					that.setData({
						status: res.data.data.status,
						photoUrl: res.data.data.photoUrl,
					})
					
					if (res.data.data.status == 1) {
						 wx.navigateTo({
							url: `../IndiaDish/IndiaDish?photoUrl=${that.data.photoUrl}`
						})
					} else{
						wx.showToast({
							title: '  活动已结束~',
							icon: 'none',
							duration: 2000
						})
					}
					
				} else{
					wx.showToast({
						title: ' 网络繁忙,请稍后再试~',
						icon: 'none',
						duration: 2000
					})
				}
			}
		})
	}
  
})