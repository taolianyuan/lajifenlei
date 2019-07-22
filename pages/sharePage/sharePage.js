// pages/sharePage/sharePage.js
import {
	getShareContent
} from '../../api/api.js';
var app = getApp();
var userInfo = '';

var avatarUrl = '';
var title = '';
var sharePage = '';
var QRCode = '';
var longTap = '';
var bottomTitle = '';
var levelPhoto = '';

var left = '';
var levelLeft = '';
var width = '';
var height = '';

var background = ''; //背景图
var name = '';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isfrom: '',
		userInfo: '',
		painting: '',
		shareImage: '',
		pageInfo: null,
		sharePage: '',
		QRCode: '',
		objectId: '',
		userId: '',
		width: '',
		height: '',
		isDown: false
	},

	checkIsChinese: function(str) {
		//如果值为空，通过校验
		if (str == "") {
			return true;
		}
		var pattern = /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0])*$/gi;
		if (pattern.test(str)) {
			return true;
		} else {
			return false;
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		console.log(options, 'isfrom,=+++++++++')
		
    var that = this;
		if (options.isfrom == 'KOL') {

			this.setData({
				isfrom: 'KOL',
				userId: options.userId
			})

			wx.showLoading({
				title: '加载中...',
				mask: true
			})

			getShareContent({
				data: {
					objectId: options.userId,
					objectType: 'koluser'
				},
				success: function(res) {
					if (res.data.code == 1) {

						// setTimeout(() => {
						//   wx.hideLoading();
						// }, 100);  

						const info = res.data.data;
						background =
							'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/KOL-user.png?sign=d545681de06c35e9f30c6e7e07eb0678&t=1551927854';
						avatarUrl = info.userAndLevelVO.avatar;
						title = info.topContent;
						sharePage =
							'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/KOL-bg .png?sign=356033c56e972d67320ba773772c49fd&t=1552529804';
						QRCode = app.globalData.imgDomain + info.qrcodeUrl;
						longTap = '食神私房秘籍，就在吃库料理';
						bottomTitle = '长按识别二维码解密';
						name = info.userAndLevelVO.nickname;
						levelPhoto = app.globalData.imgDomain + info.userAndLevelVO.levelPhoto;

						console.log(that.checkIsChinese(name, '-----'))

						var isChinese = that.checkIsChinese(name)

						if (isChinese) {
							if (name.length == 1) {
								left = 176;
								levelLeft = 195;
							} else if (name.length == 2) {
								left = 168;
								levelLeft = 204;
							} else if (name.length == 3) {
								left = 160;
								levelLeft = 213;
							} else if (name.length == 4) {
								left = 148;
								levelLeft = 220;
							} else if (name.length == 4) {
								left = 148;
								levelLeft = 220;
							} else if (name.length == 5) {
								left = 138;
								levelLeft = 230;
							} else if (name.length == 6) {
								left = 130;
								levelLeft = 238;
							} else if (name.length == 7) {
								left = 120;
								levelLeft = 245;
							} else if (name.length == 8) {
								left = 110;
								levelLeft = 255;
							} else if (name.length == 9) {
								left = 100;
								levelLeft = 265;
							} else {
								left = 85;
								levelLeft = 280;
							}
						} else {
							if (name.length <= 6) {
								left = 158;
								levelLeft = 210;
							} else {
								left = 130;
								levelLeft = 240;
							}
						}
						that.setData({
							pageInfo: {
								avatarUrl,
								title,
								sharePage,
								QRCode,
								longTap,
								bottomTitle
							}
						})
					}
				},
				complete: function() {
					that.setData({
						painting: {
							width: 375, //单位px
							height: 667,
							clear: true,
							views: [{
									type: 'image',
									url: background,
									top: 0,
									left: 0,
									width: 375,
									height: 667
								},
								{
									type: 'image',
									url: avatarUrl,
									top: 32.5,
									left: 152,
									borderRadius: 35.5
								},
								{
									type: 'text',
									content: name,
									fontSize: 18,
									color: '#333333',
									top: 105,
									left
								},
								{
									type: 'image',
									url: levelPhoto,
									top: 106,
									left: levelLeft,
									width: 23,
									height: 23
								},
								{
									type: 'text',
									content: title,
									fontSize: 16,
									color: '#333333',
									textAlign: 'center',
									top: 137.5,
									left: 190,
									lineHeight: 20,
									MaxLineNumber: 2,
									breakWord: true,
									width: 270
								},
								{
									type: 'image',
									url: sharePage,
									top: 226.5,
									left: 12.5,
									width: 350,
									height: 235
								},
								{
									type: 'image',
									url: QRCode,
									top: 507.5,
									left: 40,
									borderRadius: 39
								},
								{
									type: 'text',
									content: longTap,
									fontSize: 16,
									color: '#333333',
									textAlign: 'left',
									top: 515,
									left: 127.5,
									lineHeight: 22.5,
									MaxLineNumber: 2,
									breakWord: true,
									width: 192,
									bolder: true
								},
								{
									type: 'text',
									content: bottomTitle,
									fontSize: 16,
									color: '#9B9B9B',
									textAlign: 'left',
									top: 563,
									left: 127.5,
									MaxLineNumber: 1,
									width: 220
								}
							]
						}
					})
				}
			})
		} else if (options.isfrom == 'normal') {
			wx.showLoading({
				title: '加载中...',
				mask: true
			})

			this.setData({
				isfrom: 'normal',
				userId: options.userId
			})

			getShareContent({
				data: {
					objectId: options.userId,
					objectType: 'user'
				},
				success: function(res) {
					if (res.data.code == 1) {

						// setTimeout(() => {
						//   wx.hideLoading();
						// }, 100);  

						const info = res.data.data;
						// console.log(info,'info')
						background =
							'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/normal-user.png?sign=f055f09d623f6703e787258967834372&t=1551763731';
						avatarUrl = info.userAndLevelVO.avatar;
						title = info.topContent;
						sharePage =
							'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/shareImage.png?sign=1d99722e75043d1f230a3c7362b87f34&t=1551755150';
						QRCode = app.globalData.imgDomain + info.qrcodeUrl;
						longTap = info.bottomContent;
						bottomTitle = '吃库料理邀请你一起来吃';
						name = info.userAndLevelVO.nickname;
						levelPhoto = app.globalData.imgDomain + info.userAndLevelVO.levelPhoto;
						var isChinese = that.checkIsChinese(name)

						if (isChinese) {
							if (name.length == 1) {
								left = 176;
								levelLeft = 195;
							} else if (name.length == 2) {
								left = 168;
								levelLeft = 204;
							} else if (name.length == 3) {
								left = 160;
								levelLeft = 213;
							} else if (name.length == 4) {
								left = 148;
								levelLeft = 220;
							} else if (name.length == 4) {
								left = 148;
								levelLeft = 220;
							} else if (name.length == 5) {
								left = 138;
								levelLeft = 230;
							} else if (name.length == 6) {
								left = 130;
								levelLeft = 238;
							} else if (name.length == 7) {
								left = 120;
								levelLeft = 245;
							} else if (name.length == 8) {
								left = 110;
								levelLeft = 255;
							} else if (name.length == 9) {
								left = 100;
								levelLeft = 265;
							} else {
								left = 85;
								levelLeft = 280;
							}
						} else {
							if (name.length <= 6) {
								left = 158;
								levelLeft = 210;
							} else {
								left = 130;
								levelLeft = 240;
							}
						}
						that.setData({
							pageInfo: {
								avatarUrl,
								title,
								sharePage,
								QRCode,
								longTap,
								bottomTitle
							}
						})
					}
				},
				complete: function() {
					that.setData({
						painting: {
							width: 375, //单位px
							height: 667,
							clear: true,
							views: [{
									type: 'image',
									url: background,
									top: 0,
									left: 0,
									width: 375,
									height: 667
								},
								{
									type: 'image',
									url: avatarUrl,
									top: 32.5,
									left: 152,
									borderRadius: 35.5
								},
								{
									type: 'text',
									content: name,
									fontSize: 18,
									color: '#333333',
									top: 105,
									left: left
								},
								{
									type: 'image',
									url: levelPhoto,
									top: 106,
									left: levelLeft,
									width: 23,
									height: 23
								},
								{
									type: 'text',
									content: title,
									fontSize: 16,
									color: '#333333',
									textAlign: 'center',
									top: 137.5,
									left: 190,
									lineHeight: 20,
									MaxLineNumber: 2,
									breakWord: true,
									width: 270
								},
								{
									type: 'image',
									url: sharePage,
									top: 226.5,
									left: 12.5,
									width: 350,
									height: 235
								},
								{
									type: 'image',
									url: QRCode,
									top: 507.5,
									left: 40,
									borderRadius: 39
								},
								{
									type: 'text',
									content: longTap,
									fontSize: 16,
									color: '#333333',
									textAlign: 'left',
									top: 515,
									left: 127.5,
									lineHeight: 22.5,
									MaxLineNumber: 2,
									breakWord: true,
									width: 192,
									bolder: true
								},
								{
									type: 'text',
									content: bottomTitle,
									fontSize: 16,
									color: '#9B9B9B',
									textAlign: 'left',
									top: 563,
									left: 127.5,
									MaxLineNumber: 1,
									width: 220
								}
							]
						}
					})
				}
			})
		} else if (options.isfrom == 'dish') {
			wx.showLoading({
				title: '加载中...',
				mask: true
			})
			background =
				'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/normal-user.png?sign=f055f09d623f6703e787258967834372&t=1551763731';
			this.setData({
				isfrom: 'dish',
				objectId: options.objectId
			})
			getShareContent({
				data: {
					objectId: options.objectId,
					objectType: 'dish'
				},
				success: function(res) {
					if (res.data.code == 1) {
						// setTimeout(() => {
						//   wx.hideLoading();
						// }, 100);  

						var info = res.data.data;
						avatarUrl = info.userAndLevelVO.avatar;
						title = info.topContent;
						sharePage = app.globalData.imgDomain + info.defPhoto;
						QRCode = app.globalData.imgDomain + info.qrcodeUrl;
						longTap = info.bottomContent;
						bottomTitle = '长按识别二维码';
						that.setData({
							pageInfo: {
								avatarUrl,
								title,
								sharePage,
								QRCode,
								longTap,
								bottomTitle,
								shareImage: info.defPhoto
							}
						})
					}
				},
				complete: function() {
					that.setData({
						painting: {
							width: 375, //单位px
							height: 667,
							clear: true,
							views: [{
									type: 'image',
									url: background,
									top: 0,
									left: 0,
									width: 375,
									height: 667
								},
								{
									type: 'image',
									url: avatarUrl,
									top: 32.5,
									left: 152,
									borderRadius: 35.5
								},
								{
									type: 'text',
									content: title,
									fontSize: 16,
									color: '#333333',
									textAlign: 'center',
									top: 137.5,
									left: 190,
									lineHeight: 20,
									MaxLineNumber: 2,
									breakWord: true,
									width: 270
								},
								{
									type: 'image',
									url: sharePage,
									top: 226.5,
									left: 12.5,
									width: 350,
									height: 235
								},
								{
									type: 'image',
									url: QRCode,
									top: 507.5,
									left: 40,
									borderRadius: 39
								},
								{
									type: 'text',
									content: longTap,
									fontSize: 16,
									color: '#333333',
									textAlign: 'left',
									top: 515,
									left: 127.5,
									lineHeight: 22.5,
									MaxLineNumber: 2,
									breakWord: true,
									width: 192,
									bolder: true
								},
								{
									type: 'text',
									content: bottomTitle,
									fontSize: 16,
									color: '#9B9B9B',
									textAlign: 'left',
									top: 563,
									left: 127.5,
									MaxLineNumber: 1,
									width: 220
								}
							]
						}
					})
				}
			})
		} else if (options.isfrom == 'sauce') {
			wx.showLoading({
				title: '加载中...',
				mask: true
			})
			background =
				'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/normal-user.png?sign=f055f09d623f6703e787258967834372&t=1551763731';
			this.setData({
				isfrom: 'sauce',
				objectId: options.objectId
			})

			getShareContent({
				data: {
					objectId: options.objectId,
					objectType: 'sauce'
				},
				success: function(res) {
					if (res.data.code == 1) {
						// setTimeout(() => {
						//   wx.hideLoading();
						// }, 100);  

						var info = res.data.data;
						avatarUrl = info.userAndLevelVO.avatar;
						title = info.topContent;
						sharePage = app.globalData.imgDomain + info.defPhoto;
						QRCode = app.globalData.imgDomain + info.qrcodeUrl;
						longTap = info.bottomContent;
						bottomTitle = '长按识别二维码';
						that.setData({
							pageInfo: {
								avatarUrl,
								title,
								sharePage,
								QRCode,
								longTap,
								bottomTitle,
								shareImage: info.defPhoto
							}
						})
					}
				},
				complete: function() {
					that.setData({
						painting: {
							width: 375, //单位px
							height: 667,
							clear: true,
							views: [{
									type: 'image',
									url: background,
									top: 0,
									left: 0,
									width: 375,
									height: 667
								},
								{
									type: 'image',
									url: 'avatarUrl',
									top: 32.5,
									left: 152,
									borderRadius: 35.5
								},
								{
									type: 'text',
									content: title,
									fontSize: 16,
									color: '#333333',
									textAlign: 'center',
									top: 137.5,
									left: 190,
									lineHeight: 20,
									MaxLineNumber: 2,
									breakWord: true,
									width: 270
								},
								{
									type: 'image',
									url: sharePage,
									top: 226.5,
									left: 12.5,
									width: 350,
									height: 235
								},
								{
									type: 'image',
									url: QRCode,
									top: 507.5,
									left: 40,
									borderRadius: 39
								},
								{
									type: 'text',
									content: longTap,
									fontSize: 16,
									color: '#333333',
									textAlign: 'left',
									top: 515,
									left: 127.5,
									lineHeight: 22.5,
									MaxLineNumber: 2,
									breakWord: true,
									width: 192,
									bolder: true
								},
								{
									type: 'text',
									content: bottomTitle,
									fontSize: 16,
									color: '#9B9B9B',
									textAlign: 'left',
									top: 563,
									left: 127.5,
									MaxLineNumber: 1,
									width: 220
								}
							]
						}
					})
				}
			})
		} else if (options.isfrom == 'post') {
			wx.showLoading({
				title: '加载中...',
				mask: true
			})
			that.setData({
				isfrom: 'post',
				objectId: options.objectId
			})
			background =
				'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/normal-user.png?sign=f055f09d623f6703e787258967834372&t=1551763731';
			getShareContent({
				data: {
					objectId: options.objectId,
					objectType: 'post'
				},
				success: function(res) {
					if (res.data.code == 1) {
						// setTimeout(() => {
						//   wx.hideLoading();
						// }, 100);  

						var info = res.data.data;
						avatarUrl = info.userAndLevelVO.avatar;
						title = info.topContent;
						sharePage = app.globalData.imgDomain + info.defPhoto;
						QRCode = app.globalData.imgDomain + info.qrcodeUrl;
						longTap = info.bottomContent;
						that.setData({
							pageInfo: {
								avatarUrl,
								title,
								sharePage,
								QRCode,
								longTap,
								bottomTitle
							}
						})
					}
				},
				complete: function() {
					that.setData({
						painting: {
							width: 375, //单位px
							height: 667,
							clear: true,
							views: [{
									type: 'image',
									url: background,
									top: 0,
									left: 0,
									width: 375,
									height: 667
								},
								{
									type: 'image',
									url: avatarUrl,
									top: 32.5,
									left: 152,
									borderRadius: 35.5
								},
								{
									type: 'text',
									content: title,
									fontSize: 16,
									color: '#333333',
									textAlign: 'center',
									top: 137.5,
									left: 190,
									lineHeight: 20,
									MaxLineNumber: 2,
									breakWord: true,
									width: 270
								},
								{
									type: 'image',
									url: sharePage,
									top: 226.5,
									left: 12.5,
									width: 350,
									height: 235
								},
								{
									type: 'image',
									url: QRCode,
									top: 507.5,
									left: 40,
									borderRadius: 39
								},
								{
									type: 'text',
									content: longTap,
									fontSize: 16,
									color: '#333333',
									textAlign: 'left',
									top: 515,
									left: 127.5,
									lineHeight: 22.5,
									MaxLineNumber: 2,
									breakWord: true,
									width: 192,
									bolder: true
								}
							]
						}
					})
				}
			})
		} else if (options.isfrom == 'potato') {
			wx.showLoading({
				title: '加载中...',
				mask: true
			})
			var shareImage = '';
			var index = Number(options.index)

			this.setData({
				isfrom: 'potato',
				pageInfo: {
					avatarUrl: 'https://img.jishantech.com/avatar/logo-oms.png',
					title: '吃库料理邀请你一起72变',
					sharePage: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/potato/potatoShare.png?sign=c7708f9bc28cee7288f7aba3bb7bb2ef&t=1552467520',
					QRCode: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/potato/potatoCode.jpg?sign=1afcc241b4166ecac134cd0e2a754572&t=1552469494',
					longTap: '长按识别二维码 上吃库料理 分享你的职场',
					bottomTitle
				},
				// shareImage
			})

			const db = wx.cloud.database()
			// 查询当前用户所有的 counters
			db.collection('potatoDate').where({}).get({
				success: res => {
					console.log(res);

					var potatoUrl = res.data;


					shareImage = potatoUrl[index].potatoUrl


					var promise = new Promise(function(resolve, reject) {
						wx.showLoading({
							title: '加载中...',
						})
						wx.getImageInfo({
							src: shareImage,
							complete(res) {
								resolve(res)
							}
						})
					})

					promise.then(res => {
						that.setData({
							shareImage: res.path
						})

						setTimeout(function() {
							wx.hideLoading();
						}, 500)

					})
					console.log('[数据库] [查询记录] 成功: ', res)
				},
				fail: err => {
					wx.showToast({
						icon: 'none',
						title: '查询记录失败'
					})
					console.error('[数据库] [查询记录] 失败：', err)
				}
			})
		} else if (options.isfrom == 'vote') {
			wx.showLoading({
				title: '加载中...',
				mask: true
			})
			background =
				'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/count/vote-background.png?sign=0ff9b07bf0816e13b9e199253fa0fa2c&t=1555058494';
			this.setData({
				isfrom: 'vote',
				objectId: options.actId,
				pageInfo: {
					avatarUrl: '',
					title: '为吃库料理选语音， 读出来的菜谱更精彩。',
					sharePage: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/count/shareImage-voice.png?sign=4bbaa7e95a714ea4d5c2f22f4164b286&t=1554364114',
					QRCode: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/count/voice-code.jpg?sign=cbd7d39bbe20746e4b9cb4aa3001e61f&t=1554364528',
					longTap: '票选吃库料理语音并转发， 赢取经典复古爆米花机',
					bottomTitle: '长按识别二维码查看'
				},
				painting: {
					width: 375, //单位px
					height: 667,
					clear: true,
					views: [{
							type: 'image',
							url: background,
							top: 0,
							left: 0,
							width: 375,
							height: 667
						},
						{
							type: 'image',
							url: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/count/transpaarent-propcorn.png?sign=074e7963b52413a02ce732c31ccd716b&t=1555058554',
							top: 395.5,
							left: 242,
							width: 107,
							height: 174,
							scaleSrc: 1
						},
						{
							type: 'image',
							url: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/count/voice-code.jpg?sign=cbd7d39bbe20746e4b9cb4aa3001e61f&t=1554364528',
							top: 575,
							left: 49.5,
							borderRadius: 40
						},
						{
							type: 'text',
							content: '邀你票选厨房好声音 赢取经典复古爆米花机',
							fontSize: 16,
							color: '#333333',
							textAlign: 'left',
							top: 584.5,
							left: 134.5,
							lineHeight: 22.5,
							MaxLineNumber: 2,
							breakWord: true,
							width: 182,
							bolder: true
						},
						{
							type: 'text',
							content: '长按识别二维码查看',
							fontSize: 16,
							color: '#9B9B9B',
							textAlign: 'left',
							top: 623.5,
							left: 134.5,
							MaxLineNumber: 1,
							width: 220
						}
					]
				}

			})
		} else if (options.isfrom == 'rice') {
			wx.showLoading({
				title: '加载中...',
				mask: true
			})
			background =
				'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/rice/rice_share.png?sign=a82f26b02747dd6a9902c12627121f7e&t=1556518073';
			this.setData({
				isfrom: 'rice',
				objectId: options.actId,
				pageInfo: {
					avatarUrl: '',
					title: '带你学做米饭的十种不同做法刷新你的知识盲区',
					sharePage: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/rice/rice_share_icon.png?sign=76bc4bbd168d5802de58b2c1c7af6000&t=1556518559',
					QRCode: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/rice/rice_QRC.jpg?sign=dc2703cf51f0e51a8dc704cedbe3ca92&t=1556441226',
					longTap: '食神私房秘籍，就在吃库料理',
					bottomTitle: '长按识别二维码解密'
				},

				painting: {
					width: 375, //单位px
					height: 667,
					clear: true,
					views: [{
							type: 'image',
							url: background,
							top: 0,
							left: 0,
							width: 375,
							height: 667
						},
						{
							type: 'image',
							url: '',
							top: 395.5,
							left: 242,
							width: 107,
							height: 174,
							scaleSrc: 1
						},
						{
							type: 'image',
							url: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/rice/rice_QRC.jpg?sign=dc2703cf51f0e51a8dc704cedbe3ca92&t=1556441226',
							top: 568.5,
							left: 35,
							borderRadius: 40
						},
						{
							type: 'text',
							content: '',
							fontSize: 16,
							color: '#333333',
							textAlign: 'left',
							top: 584.5,
							left: 134.5,
							lineHeight: 22.5,
							MaxLineNumber: 2,
							breakWord: true,
							width: 182,
							bolder: true
						},
						{
							type: 'text',
							content: '',
							fontSize: 16,
							color: '#9B9B9B',
							textAlign: 'left',
							top: 623.5,
							left: 134.5,
							MaxLineNumber: 1,
							width: 220
						}
					]
				}
			})
    } else if (options.isfrom == 'goAssis'){
      wx.showLoading({
        title: '加载中...',
        mask: true
      })  

      var keywaordShareCpntent = options.keywaordShareCpntent
      var garbageTypes = options.garbageType
      if (garbageTypes == 100){  
        if (keywaordShareCpntent == 'null'){
           that.setData({
             text: "除有害垃圾、可回收物、湿垃圾以外 的其他生活废弃物"
           })
         }else{
           that.setData({
             text3: keywaordShareCpntent
           })
         }

        that.setData({
          urls: "/img/Dry.png", 
          tops1:242,
          height1:158,
          introduceL:"https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/Drys.png?sign=af066256a2d55d61073978b0eecabbd1&t=1561971253",
          surl:"/img/jiantou.gif"
         // text:"除有害垃圾、可回收物、湿垃圾以外 的其他生活废弃物"
        })
      }else{
         that.setData({
           urls: "/img/Drygarbage.png",
           tops1:280,
           height1:120,
           introduceL: "/img/1.png",
           surl:"/img/1.png"
         })
      }
      if (garbageTypes == 200){
        if (keywaordShareCpntent == 'null'){
            that.setData({
              text2: '废纸张、废塑料、废玻璃制品、废金属、废织物等；适宜回收、可循环废弃物'
            })
         }else{
          that.setData({
            text2: keywaordShareCpntent
          })
         }
        that.setData({
          url: "/img/Recy.png",
          tops2: 242,
          height2: 158,
          introduceL2:"https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/Res.png?sign=a5bfb182946309ec10ef3d28d49a6fb3&t=1561971221",
           
          surl2:"/img/jiantou.gif"
          //text2: '废纸张、废塑料、废玻璃制品、废金属、废织物等；适宜回收、可循环废弃物'
         }) 
       }else{
         that.setData({
           url: "/img/Recyclable.png",
           tops2: 280,
           height2: 120,
           introduceL2:"/img/1.png",
           surl2:"/img/1.png"
         })
       }

      if (garbageTypes == 300){ 
        if (keywaordShareCpntent == 'null'){
          that.setData({
            text3: "日常生活垃圾产生的容易腐烂的生物质废弃物"
          })
        }else{
          that.setData({
            text3: keywaordShareCpntent
          })
        }
          that.setData({
            urlse: "/img/Wet.png",
            tops3: 242,
            height3: 158,
            introduceL3: "https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/Wets.png?sign=1e6b3fd34dd99a750c16c88e960bbf36&t=1561971196",
            surl3: "/img/jiantou.gif"
           // text3:"日常生活垃圾产生的容易腐烂的生物质废弃物"
          })
       }else{
         that.setData({
           urlse: "/img/Wetgarbage.png",
           tops3: 280,
           height3: 120,
           introduceL3: "/img/1.png",
           surl3:"/img/1.png"
         })
       } 
      if (garbageTypes == 400 ){
        if (keywaordShareCpntent == 'null' ){
          that.setData({
            text41: "对人体健康或者自然环境造成直接或潜在危害的废弃物"
         })
        }else{
          that.setData({
            text41: keywaordShareCpntent
          })
        } 
         that.setData({
           urlsl: "/img/Har.png",
           tops4: 242,
           height4: 158,
           introduceL4: "https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/Hars.png?sign=c82a02b28dbdff8f77fd9ab55cc58c34&t=1561971239",

           surl4: "/img/jiantou.gif"
           //text41: test  
         }) 
       }else{
         that.setData({
           urlsl: "/img/HarmfulWaste.png",
           tops4: 280,
           height4: 120,
           introduceL4: "/img/1.png",
           surl4:"/img/1.png"
         })
        }
      
      if (garbageTypes == 510){
        if (keywaordShareCpntent == 'null' ){
            that.setData({
              title:""
            })
         }else{
          that.setData({
            title: keywaordShareCpntent
          })
         }
        that.setData({
          uRls:"/img/dajian.png"
        })
      }else{
        that.setData({
          uRls: "/img/1.png"
        })
      }
      if (garbageTypes == 520){
        if (keywaordShareCpntent == 'null') {
          that.setData({
            title2: ""
          })
        } else {
          that.setData({
            title2: keywaordShareCpntent
          })
        }
        that.setData({
          uRls1: "/img/zxiu.png"
        })
      }else{
        that.setData({
          uRls1: "/img/1.png",
        })
      }

      if (garbageTypes == 530) {
        if (keywaordShareCpntent == 'null') {
          that.setData({
            title3: ""
          })
        } else {
          that.setData({
            title3: keywaordShareCpntent
          })
        }
        that.setData({
          // title: "绿化垃圾",
          uRls2: "/img/lhua.png"
        })
      }else{
        that.setData({
          uRls2: "/img/1.png",
        })
      }
      if (garbageTypes == 700){
        if (keywaordShareCpntent == 'null'){
           that.setData({
             title4:""
           })
         }else{
           that.setData({
             title4: eywaordShareCpntent
           })
         }

         that.setData({
           uRls3:"/img/rclj.png"
         })
      }else{
        that.setData({
          uRls3: "/img/1.png",
        })
      }

      if (garbageTypes == 101){
        if (keywaordShareCpntent == 'null') {
          that.setData({
            title5: "干垃圾"
          })
        } else {
          that.setData({
            title5: eywaordShareCpntent
          })
        }
        that.setData({
          uRls4: "/img/Objection.png"
        })
      }else{
        that.setData({
          uRls4: "/img/1.png",
        })
      }

      // 垃圾分类分享图  
      background ="https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/recovery.png?sign=6e91f22dc78b885fe26b34b12156d906&t=1561973748",
       this.setData({
        //  分享好友 
        isfrom: 'goAssis',
        pageInfo: {
          avatarUrl: 'https://img.jishantech.com/avatar/logo-oms.png',
          title: '垃圾分类助手',
          sharePage: 'https://img.jishantech.com/common/垃圾分类分享.jpg',
          QRCode: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/weima.jpg?sign=bd8e09077531b685cfd9c27ce1999697&t=1562051236',
          longTap: '垃圾分类助手',
          bottomTitle: '长按识别二维码'
        },   

          //保存图片 
          painting:{
            width:375,
            height: 795,
            clear: true,
            views:[{
              type: 'image',
              url: background,
              top: 0,
              left: 0,
              width: 375,
              height: 795
            },
            {
              type:"text",
              content: options.inputVal,
              fontSize: 15,
              color: '#333',
              textAlign: 'left',
              top: 191,
              left: 30
            },
            
            {
              type: 'image',
              url: that.data.url,
              top: that.data.tops2,
              left: 20,
              width: 66,
              height:that.data.height2
             },
             {
                type: 'image',
                url: that.data.urlsl,
                top: that.data.tops4,
                left: 115,
                width: 66,
                height: that.data.height4
            },

              {
                type: 'image',
                url: that.data.urlse,
                top:that.data.tops3,
                left: 200,
                width: 66,
                height: that.data.height3
              },
              {
                type: 'image',
                url: that.data.urls,
                top: that.data.tops1,
                left: 290,
                width: 66,
                height: that.data.height1 
              },


              {
                type: 'image',
                url: that.data.surl2,
                top: 242,
                left: 38,
                width: 25,
                height: 40,
              },


              {
                type: 'image',
                url: that.data.surl,
                top: 242,
                left: 310,
                width: 25,
                height: 40,
              },

              {
                type: 'image',
                url: that.data.surl4,
                top: 242,
                left: 134,
                width: 25,
                height: 40,
              },
               
              {
                type: 'image',
                url: that.data.surl3,
                top: 242,
                left: 220,
                width: 25,
                height: 40,
              },
  
              {
                type: 'image',
                url: that.data.introduceL,
                top: 405,
                left: 15,
                width: 345,
                height: 139
              },
              {
                type: 'text',
                content: that.data.text,
                fontSize: 12,
                lineHeight: 21,
                color: '#2B2B29',
                textAlign: 'left',
                top: 460,
                left: 145,
                width: 182,
                MaxLineNumber: 2,
                breakWord: true,
                bolder: false
              },

              {
                type: 'image',
                url: that.data.introduceL2,
                top: 405,
                left: 15,
                width: 345,
                height: 139 
              },
              {
                type: 'text',
                content: that.data.text2,
                fontSize: 12,
                lineHeight: 21,
                color: '#2E4FA1',
                textAlign: 'left',
                top: 460,
                left: 145,
                width: 182,
                MaxLineNumber: 2,
                breakWord: true,
                bolder: false
              },

              {
                type: 'image',
                url: that.data.introduceL3,
                top: 405,
                left: 15,
                width: 345,
                height: 139  
              },
              {
                type: 'text',
                content: that.data.text3,
                fontSize: 12,
                lineHeight: 21,
                color: '#674036',
                textAlign: 'left',
                top: 460,
                left: 145,
                width: 182,
                MaxLineNumber: 2,
                breakWord: true,
                bolder: false
              },
              
              {
                type: 'image',
                url: that.data.introduceL4,
                top: 405,
                left: 15,
                width: 345,
                height: 139
              },
              {
                type: 'text',
                content: that.data.text41,
                fontSize: 12,
                lineHeight: 21,
                color: '#D0021B',
                textAlign: 'left',
                top: 460,
                left: 145,
                width: 182,
                MaxLineNumber: 2,
                breakWord: true,
                bolder: false
              },
              

              {
                type: 'image',
                url: that.data.uRls,
                top: 405,
                left: 15,
                width: 345,
                height: 139
              },
              {
                type: 'text',
                content: that.data.title,
                fontSize: 12,
                lineHeight: 21,
                color: '#000',
                textAlign: 'left',
                top: 470,
                left: 145,
                width: 182,
                MaxLineNumber: 2,
                breakWord: true,
                bolder: false
              },

              {
                type: 'image',
                url: that.data.uRls1,
                top: 405,
                left: 15,
                width: 345,
                height: 139
              },

              {
                type: 'text',
                content: that.data.title2,
                fontSize: 12,
                lineHeight: 21,
                color: '#000',
                textAlign: 'left',
                top: 470,
                left: 145,
                width: 182,
                MaxLineNumber: 2,
                breakWord: true,
                bolder: false
              },

              {
                type: 'image',
                url: that.data.uRls2,
                top: 405,
                left: 15,
                width: 345,
                height: 139
              },
              {
                type: 'text',
                content: that.data.title3,
                fontSize: 12,
                lineHeight: 21,
                color: '#000',
                textAlign: 'left',
                top: 470,
                left: 145,
                width: 182,
                MaxLineNumber: 2,
                breakWord: true,
                bolder: false
              },

              {
                type: 'image',
                url: that.data.uRls3,
                top: 405,
                left: 15,
                width: 345,
                height: 139
              },
              {
                type: 'text',
                content: that.data.title4,
                fontSize: 12,
                lineHeight: 21,
                color: '#000',
                textAlign: 'left',
                top: 470,
                left: 145,
                width: 182,
                MaxLineNumber: 2,
                breakWord: true,
                bolder: false
              },


              {
                type: 'image',
                url: that.data.uRls4,
                top: 405,
                left: 15,
                width: 345,
                height: 139
              },
              {
                type: 'text',
                content: that.data.title5,
                fontSize: 12,
                lineHeight: 21,
                color: '#000',
                textAlign: 'left',
                top: 430,
                left: 145,
                width: 182,
                MaxLineNumber: 2,
                breakWord: true,
                bolder: false
              },
            ]
          }
       })
    }
	},


	//跳转发动态页面
	skipDynamic: function() {
		wx.navigateTo({
			url: '../Release/ReleaseProduct/ReleaseProduct',
		})
	},


	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function(options) {

		const that = this;
		var shareImage = that.data.pageInfo.sharePage;
    var title = that.data.pageInfo.title
    console.log(title)

    console.log(shareImage,"++++++++++++++++++++++++++")
		if (options.from == 'button') {
			//点击按钮分享
			const isfrom = that.data.isfrom;
			var shareObject = {};
			if (isfrom == 'dish' || isfrom == 'sauce') {
				shareObject.imageUrl = shareImage;
				shareObject.title = that.data.pageInfo.title;
				shareObject.path = '/pages/Piazza/DynamicDetail/DynamicDetail?objectId=' + that.data.objectId + '&objectType=' +
					isfrom + '&isFrom=normal';
			} else if (isfrom == 'KOL' || isfrom == 'normal') {
				
				shareObject.imageUrl = shareImage;
				shareObject.title = that.data.pageInfo.title;
				shareObject.path = `/pages/Piazza/OthersUserCenter/OthersUserCenter?userId=${that.data.userId}`;
			} else if (isfrom == 'post') {
				
				shareObject.imageUrl = shareImage;
				shareObject.title = that.data.pageInfo.title;
				shareObject.path = `/pages/Piazza/PostDetail/PostDetail?objectId=${that.data.objectId}`;
				
			} else if (isfrom == 'potato') {
				
				shareObject.imageUrl = shareImage;
				shareObject.title = that.data.pageInfo.title;
				shareObject.path = `/pages/Home/PotatoFactory/PotatoFactory`;
				
			} else if (isfrom == 'vote') {
				
				shareObject.imageUrl = shareImage;
				shareObject.title = that.data.pageInfo.title;
				shareObject.path = `/pages/Home/voteActivity/voteActivity?actId=${that.data.objectId}`;
				
			} else if (isfrom == 'rice') {
				
				shareObject.imageUrl = shareImage;
				shareObject.title = that.data.pageInfo.title;
				shareObject.path = `/pages/Home/Rice/Rice?actId=${that.data.objectId}`;
				
      } else if (isfrom == 'goAssis'){

        shareObject.imageUrl = shareImage;
        shareObject.title = that.data.pageInfo.title;
        shareObject.path = `/pages/Home/Assistant/Assistant`;
      }
		}
		console.log(shareObject)
    return shareObject;
    // return {
    //   title: title,
    //   shareObject
    // }  
	},


	eventGetImage(event) {

		console.log(event, '-------')
     var that = this
     
    setTimeout( () =>{
      let {
        tempFilePath,
        errMsg
      } = event.detail
      wx.hideLoading();
      if (errMsg === 'canvasdrawer:ok') {
        that.setData({
          shareImage: tempFilePath
        })
      }
    },500)
	},
 

	//点击保存到相册
	savePhotoAlbum: function() {
		var that = this;
		if (!this.data.isDown) {
			that.setData({
				isDown: true
			})
			wx.saveImageToPhotosAlbum({
				filePath: that.data.shareImage,
				success(res) {
					wx.showToast({
						title: '保存图片成功',
						icon: 'success',
						success: function() {
							setTimeout(() => {
								wx.navigateBack();
							}, 1500)
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
		}
		// wx.previewImage({
		//   urls: [this.data.shareImage]
		// })
	},



})
