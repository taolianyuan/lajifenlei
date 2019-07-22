// pages/UserCenter/voiceSetting/voiceSetting.js
import {
	getUserConfig,
	updateUserConfig
} from '../../../api/api.js'
var app = getApp();
var audio = wx.createInnerAudioContext();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imgDomain: app.globalData.imgDomain,
		voiceList: [],
		currentId: -1,
		checkedId: -1,
		status: 0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.getUserConfig();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	radioChange(e) {
		// console.log('radio发生change事件', e)
		var checkedId = Number(e.detail.value)

		var index = this.data.voiceList[checkedId].voteId;

		this.setData({
			checkedId
		})
		this.updateUserConfig(index)
	},

	updateUserConfig: function(tone) {
		var that = this;
		updateUserConfig({
			data: {
				tone
			},
			success: function(res) {
				if (res.data.code == 1) {
					wx.showToast({
						title: '切换成功',
						icon: 'none'
					})
				}
			}
		})
	},

	//音频的处理
	handleAudio: function(e) {
		var that = this;
		var audioText = this.data.imgDomain + this.data.voiceList[e.currentTarget.dataset.index].contentUrl
		if (this.data.currentId == e.currentTarget.dataset.index) {
			audio.pause();
			this.setData({
				currentId: -1
			})
		} else {
			audio.src = audioText;
			audio.play()
			this.setData({
				currentId: e.currentTarget.dataset.index
			})
			audio.onEnded(() => {
				console.log(111111)
				that.setData({
					currentId: -1
				})
			})
		}
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {
		audio.stop();
		console.log('监听结束')
	},

	getUserConfig: function() {
		var that = this;
		getUserConfig({
			data: {
				parameter: 'tone'
			},
			success: function(res) {
				if (res.data.code == 1) {
					var data = res.data.data;
					if (data.userConfigParameter) {
						var index = Number(data.userConfigParameter);
						if (data.userConfigParameter == 4) {
							that.setData({
								checkedId: 0
							})
						} else if (data.userConfigParameter == 0) {
							that.setData({
								checkedId: 1
							})
						} else if (data.userConfigParameter == 1) {
							that.setData({
								checkedId: 2
							})
						} else if (data.userConfigParameter == 3) {
							that.setData({
								checkedId: 3
							})
						}
					}
					that.setData({
						voiceList: data.configParameter,
						status: 1
					})
				} else {
					that.setData({
						status: 3
					})
				}
			},
			fail: function() {
				that.setData({
					status: 3
				})
			}
		})
	},
	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
