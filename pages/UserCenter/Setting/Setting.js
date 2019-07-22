// pages/UserCenter/Setting/Setting.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		setting: [{
				title: '帮助中心',
				path: '',
				id: 1
			},
			{
				title: '语音设置',
				path: '../voiceSetting/voiceSetting',
				id: 2
			},
			{
				title: '添加到桌面',
				path: '',
				id: 3
			}
		],
		showToast: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */

	onReady: function() {

	},

	clickItem: function(e) {
		var router = e.currentTarget.dataset.path;
		var id = e.currentTarget.dataset.id;
		var that = this;
		if (id == 3) {
			if (!this.data.showToast) {
				this.setData({
					showToast: true
				})
				setTimeout(() => {
					that.setData({
						showToast: false,
					})
				}, 3000)
			}
			return;
		}
		if (router) {
			wx.navigateTo({
				url: router
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
