import {
	getChances
} from '../../../../api/api.js';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
		challenge: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/India/start_challenge.png?sign=e9c3b0f81650c01c0cb3a1e294394b42&t=1557130420',
		practice: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/India/start_practice.png?sign=ae002657a71b1895f7cd305285c0863d&t=1557130409',
		bgImage: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/India/india_bg.png?sign=fb70fe797a07a60830f32c063edecef3&t=1557227046',
		recordTime: false,
		photoUrl: '',
		chance: -2,
		imgDomain: getApp().globalData.imgDomain,
		show: false,
		time: '',
		level: 3,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		var photoUrl = options.photoUrl;
		this.setData({
			photoUrl
		})
		
		var URL = this.data.imgDomain + photoUrl;
		
  },

  playGame: function (e) {
		
		// 测试代码
// 		wx.navigateTo({
// 			url: `../Puzzle/Puzzle?level=${level}&photoUrl=${this.data.imgDomain + this.data.photoUrl}`
// 		})
// 		
// 		return;
		
		
		
		var level = e.currentTarget.dataset.level;
		this.data.level = level;
		
		
		if (level == 3) {
			wx.navigateTo({
				url: `../Puzzle/Puzzle?level=${level}&photoUrl=${this.data.imgDomain + this.data.photoUrl}&type=practice&chance=${this.data.chance}`
			})
		} else{
			this.getChances()
		}
  },
  
	goComment: function () {
		this.setData({
			show: false
		})
		
		var objectId = wx.getStorageSync('indiaDishId');
		wx.navigateTo({
			url: `../../../Piazza/DynamicDetail/DynamicDetail?objectId=${objectId}&objectType=dish&actName=india&isFrom=normal`
		})
	},
	
	getChances() {
		var that = this;
		getChances({
			success: function (res) {
				console.log(res)
				if (res.data.code == 1) {
					if (res.data.data.chance == 0) {
		
						if (res.data.data.time != null && res.data.data.time != '') {
							that.setData({
								time:  res.data.data.time
							})
						}
						that.setData({
							chance: res.data.data.chance,
							time:  res.data.data.time,
							show: true
						})
					} else{
						wx.navigateTo({
							url: `../Puzzle/Puzzle?level=${that.data.level}&photoUrl=${that.data.imgDomain + that.data.photoUrl}&chance=${that.data.chance}&type=challenge`
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
	},
})