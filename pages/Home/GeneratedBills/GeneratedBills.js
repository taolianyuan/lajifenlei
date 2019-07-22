// pages/Home/GeneratedBills.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		text: [
			'这个地方是【老婆】要吃的，当然是答应啦',
			'小贵，但是巨巨巨好吃，快扶我起来……',
			'拆了三套，跟家里人小聚一下，一块大石落地',
			'我要找份工作了，吃顿饭本月零花钱已清空😱',
			'【女儿】读书辛苦了，带你吃顿好的犒劳犒劳',
			'感谢【合作伙伴】多年的照应，今晚恭候大驾光临！',
			'因别人临时有事，付的定金没法退😂，谁有空，我请你们吃晚饭',
			'我知道你没有错，我只是一人承受不了这盛宴……',
			'经常请吃饭的【漂亮姐姐】，今天请的地方有点不一般嚯',
			'今天【领导】请客，兄弟们上啊！',
			'谢谢【网红小妹妹】的晚宴！😉顺便帮这位小主征个婚，有意者私聊',
			'我的【女神】今天吃了3碗龙虾泡饭，早知道多点几份了😲'
		],
		current: 0,
		status: 0,
		isLogin: false,
		isfirst: app.globalData.hideMask,
		isDown: false
	},

	//动画结束后，改变current的值
	bindanimationfinish: function(e) {
		this.setData({
			current: e.detail.current
		})
	},

	//隐藏遮罩层
	hideMask: function() {
		app.globalData.hideMask = false;
		this.setData({
			isfirst: app.globalData.hideMask
		})
	},

	//保存图片到本地
	saveImageToLocal: function() {
		var that = this;
		var userInfo = wx.getStorageSync('userInfo');

		if (userInfo == null || userInfo == "") {
			this.showDialog();
			this.setData({
				isLogin: false
			})
		} else {

			if (!this.data.isDown) {
				wx.getImageInfo({
					src: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/count/count-image.png?sign=4a3851472e4909c5708904b50f7c4d13&t=1554190409',
					success: function(res) {
						wx.saveImageToPhotosAlbum({
							filePath: res.path,
							success(res) {
								wx.showToast({
									title: '保存图片成功',
									icon: 'success',
									duration: 1500,
									success: function() {
										setTimeout(() => {
											wx.navigateBack();
										}, 1500)
										that.setData({
											isDown: true
										})
									}
								})
							},
							fail: function(res) {
								wx.hideLoading();
								if (res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
									wx.authorize({
										scope: 'scope.writePhotosAlbum',
										success() {
											// 授权成功
											wx.saveImageToPhotosAlbum({
												filePath: that.data.tempFilePath,
												success() {
													app.func.setMask({
														message: '图片保存成功',
														bg: 'success'
													}, that)
													return
												}
											})
										},
										fail: function() {
											// 授权失败
											wx.showModal({
												title: '警告',
												content: '您点击了拒绝授权,将无法正常保存图片,点击确定重新获取授权。',
												success: function(res) {
													if (res.confirm) {
														wx.openSetting({
															success: (res) => {
																console.log('授权成功')
															}
														})
													}
												}
											})
										}
									})
								}

							}
						})
					},
					fail: function() {
						wx.showToast({
							title: '保存失败'
						})
					}

				})
			}

			that.setData({
				isLogin: true
			})
		}



	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this;
		setTimeout(() => {
			that.setData({
				status: 1
			})
		}, 1000)

		this.dialog = this.selectComponent("#dialog");

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

		this.setData({
			isfirst: app.globalData.hideMask
		})
	},

	showDialog: function() {
		this.dialog.showDialog();
	},

	confirmEvent: function() {
		this.dialog.hideDialog();
	},

	cancleEvent: function() {
		this.dialog.hideDialog();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

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
	onShareAppMessage: function(options) {
		var text = this.data.text;
		text = text[this.data.current]
		var shareObject = {};
		if (options.from == 'menu') {
			shareObject = {
				path: 'pages/Home/GeneratedBills/GeneratedBills'
			}
		} else if (options.from == 'button') {
			shareObject = {
				title: text,
				path: 'pages/Home/GeneratedBills/GeneratedBills',
				imageUrl: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/count/count.png?sign=cf7d7a7629e92315bf5cc5a53da2f60d&t=1554111777'
			}
		}
		return shareObject;
	}
})
