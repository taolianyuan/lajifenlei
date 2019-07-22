import {
	uploadUserInfo
} from '../../../api/api.js'

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		count: 0,
		intro: '',
		cursor: 0,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var intro = options.intro;

		console.log(intro, '-----intro------')
		let arr = getCurrentPages();
		let page = arr[arr.length - 2];

		if (intro == undefined || intro == '' || intro == null) {
			console.log('是空~~')
			page.setData({
				intro: ''
			})
		}
		var count = intro.length;

		this.setData({
			intro,
			count
		})
	},

	// 	onShow: function() {
	// 		if (this.data.intro == '') {
	// 			this.setData({
	// 				intro: ''
	// 			})
	// 		}
	// 	},

	changeInput: function(e) {

		let that = this;
		var text = e.detail.value;
		that.setData({
			count: text.length,
			intro: text
		})
	},

	uploadUserInfo: function() {

		var that = this;
		uploadUserInfo({
			data: {
				businessKey: wx.getStorageSync('businessKey'),
				intro: that.data.intro
			},
			success: function(res) {
				if (res.data.code == 1) {

					let arr = getCurrentPages();
					let page = arr[arr.length - 2];

					page.setData({
						intro: that.data.intro
					})




					wx.showToast({
						title: '已保存',
						icon: 'success',
						success: function() {
							setTimeout(() => {
								wx.navigateBack();
							}, 100);
						}
					})

				} else {
					wx.showToast({
						title: '系统繁忙,稍后再试~',
						icon: 'none',
						duration: 2000
					})
				}
			}
		})



	}


















})
