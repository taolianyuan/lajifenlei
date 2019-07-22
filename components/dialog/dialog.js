import {
	uploadUserInfo,
	getQRCodeOne,
	updateSingleAvatarUrl,
	getUserByBusinessKey
} from '../../api/api.js';

var avatarUrl = '';
var app = getApp();

// var inviteId = null;



Component({
	options: {
		multipleSlots: true // 在组件定义时的选项中启用多slot支持
	},
	/**
	 * 组件的属性列表
	 */
	properties: {
		// 弹窗标题
		title: {
			type: String,
			value: '标题' // 默认值
		},
		// 弹窗内容
		content: {
			type: String,
			value: '弹窗内容'
		},

		cancleText: {
			type: String,
			value: '取消'
		},

		// 弹窗确认按钮文字
		confirmText: {
			type: String,
			value: '确定'
		}
	},

	/**
	 * 组件内私有数据
	 */
	data: {
		// 弹窗显示控制
		isShow: false,
		avatarUrl: ''
	},

	/**
	 * 组件的公有方法列表
	 */
	methods: {

		//隐藏弹框
		hideDialog() {
			// console.log('hideDialog')
			this.setData({
				isShow: false
			})
			console.log('isShow' + this.data.isShow)
		},
		//展示弹框
		showDialog() {
			// console.log('showDialog')
			this.setData({
				isShow: true
			})
			console.log('isShow' + this.data.isShow)
		},
		/**
		 * triggerEvent 组件之间通信
		 */
		confirmEvent() {
			this.triggerEvent("confirmEvent");
			console.log('confirmEvent')
		},

		cancleEvent() {
			this.triggerEvent("cancleEvent");
		},

		bindGetUserInfo(e) {

			// success: function(res){

			// }

			if (e.detail.userInfo) {
				//用户按了允许授权按钮

				var userInfo = e.detail.userInfo;

				// inviteId = app.globalData.inviteId;
				// console.log(inviteId, 'inviteIdinviteIdinviteIdinviteId')

				wx.setStorageSync('userInfo', userInfo);

				wx.showLoading({
					title: '加载中...',
					mask: true
				})



				updateSingleAvatarUrl({
					data: {
						avatarUrl: userInfo.avatarUrl
					},
					success: function(res) {
						if (res.data.code == 1) {
							avatarUrl = res.data.data;
							app.getBusinessKey().then(res => {
								if (res.status == 0) {
									console.log('已经登录~')
									console.log(res, '-----------status-----------')
									uploadUserInfo({
										data: {
											// inviteId
										},
										success: function(e) {
											if (e.data.code == 1) {
												getQRCodeOne({
													success: function(res) {
														if (res.data.code == 1) {
															wx.hideLoading();
														} else {
															wx.showToast({
																title: '请求失败',
																icon: 'none'
															})
														}
													},
													fail: function() {
														wx.showToast({
															title: '请求失败',
															icon: 'none'
														})
													}
												})
												wx.startPullDownRefresh();
											} else {
												wx.showToast({
													title: '请求失败',
													icon: 'none'
												})
											}
										},
										fail: function() {
											wx.showToast({
												title: '请求失败',
												icon: 'none'
											})
										}
									})
								} else {
									console.log(res, '-----------status-----------')
									console.log('没有登录~')
									uploadUserInfo({
										data: {
											avatarUrl,
											city: userInfo.city,
											county: userInfo.country,
											gender: userInfo.gender,
											nickName: userInfo.nickName,
											provice: userInfo.provice,
											// inviteId
										},
										success: function(e) {
											if (e.data.code == 1) {
												getQRCodeOne({
													success: function(res) {
                           console.log(res,"___------")
														if (res.data.code == 1) {
															wx.hideLoading();
														} else {
															wx.showToast({
																title: '请求失败',
																icon: 'none'
															})
														}
													},
													fail: function() {
														wx.showToast({
															title: '请求失败',
															icon: 'none'
														})
													}
												})
												wx.startPullDownRefresh();
											} else {
												wx.showToast({
													title: '请求失败',
													icon: 'none'
												})
											}
										},
										fail: function() {
											wx.showToast({
												title: '请求失败',
												icon: 'none'
											})
										}
									})
								}
							})
						} else {
							wx.showToast({
								title: '请求失败',
								icon: 'none'
							})
						}
					},
					fail: function() {
						wx.showToast({
							title: '请求失败',
							icon: 'none'
						})
					}
				})
			} else {
				//用户按了拒绝按钮
				return true;
			}


		},

		updateUserInfo: function(userInfo) {

			var that = this;
			var userInfo = wx.getStorageSync('userInfo', userInfo);

			if (businessKey == '') {
				that.updateUserInfo(userInfo);
			} else {

				uploadUserInfo({
					data: {
						avatarUrl: userInfo.avatarUrl,
						city: userInfo.city,
						county: userInfo.country,
						gender: userInfo.gender,
						nickName: userInfo.nickName,
						provice: userInfo.provice,
						businessKey: businessKey
					},
					success: function(e) {

					}
				})
			}
		},
	}
})
