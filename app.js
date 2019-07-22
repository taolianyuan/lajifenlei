import {
	login,
	checkBusinessKey,
	uploadUserInfo,
	// getUserByBusinessKey,
	updateSingleAvatarUrl,
	getQRCodeOne,
	checkUserByBusinessKey,
	insertUserAuth
} from './api/api.js';

const ald = require('./utils/ald-stat.js')

import GlobalConfig from './utils/config/index';
var businessKey = wx.getStorageSync('businessKey');
var userInfo = wx.getStorageSync('userInfo');

var avatarUrl = '';
const globalConfig = new GlobalConfig()

globalConfig.init()

App({
	globalData: {
		isNewLogin: '',
		imgDomain: 'https://img.jishantech.com',
		imgDomain1: 'http://img.jishantech.com',
		uploadImg: 'http://192.168.1.87:8085/file/upload/file',
		isIphoneX: false,
		objectInfo: {},
		appName: 'mipro-chiku',
		evaluate: {},
		stepItem: {},
		userImage: '',
		photo: '',
		userCurrent: '',
		imgUrl: '',
		usersText: '',
		experence: 0,
		userInfo: {},
		config: globalConfig,
		coverImage: '', // 用户上传的图
		finalImage: '', // 用户最终的图
		isClick: true, //步骤图更换图片时  是否点击更换
		isChange: false, // 封面图更换时的状态
		hideMask: true,
		loginStatus: '', //1未登录  0登陆过了
		inviteId: 0,

    systeminfo: {}, // 系统信息
     headerBtnPosi: {}, // 胶囊按钮位置信息
     
    isopenApp:false,

    //language:"" //获取语言
	},

  //  语音
  //  base64_decode(input) { // 解码，配合decodeURIComponent使用
  //   var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  //   var output = "";
  //   var chr1, chr2, chr3;
  //   var enc1, enc2, enc3, enc4;
  //   var i = 0;
  //   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  //   while(i <input.length) {
  //     enc1 = base64EncodeChars.indexOf(input.charAt(i++));
  //     enc2 = base64EncodeChars.indexOf(input.charAt(i++));
  //     enc3 = base64EncodeChars.indexOf(input.charAt(i++));
  //     enc4 = base64EncodeChars.indexOf(input.charAt(i++));
  //     chr1 = (enc1 << 2) | (enc2 >> 4);
  //     chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
  //     chr3 = ((enc3 & 3) << 6) | enc4;
  //     output = output + String.fromCharCode(chr1);
  //     if (enc3 != 64) {
  //       output = output + String.fromCharCode(chr2);
  //     }
  //     if (enc4 != 64) {
  //       output = output + String.fromCharCode(chr3);
  //     }
  //   }
  //   return utf8_decode(output);
  // },

  
	onLaunch: function(options) {
    console.log(options)
    var that = this;
    if (options.scene == 1001){
       this.globalData.isopenApp = true
     }


     
//  判断语言
    // var language = wx.getStorageSync('language')
    // if (language == ""){
    //   var res = wx.getSystemInfoSync()
    //    console.log(res)
    //    this.language = res.language
    //   wx.getStorageSync('language', res.language)
    // } else if (language == 'zh_CN'){
    //   this.language = 'zh_CN'
    //  }else{
    //   this.language = 'zh_EN'
    //  }
    //language: ""//全局变量


    // 获取设备信息
    wx.getSystemInfo({
      success: (res) => {
        // console.log(res.language);
         this.globalData.systeminfo = res
      },
    })
    // 获得胶囊按钮位置信息
    this.globalData.headerBtnPosi = wx.getMenuButtonBoundingClientRect()


		var promise = new Promise((resolve, reject) => {
			resolve();
		})

		promise.then(() => {
			wx.getSetting({
				success(res) {
					console.log(res)
					that.insertUserAuth(JSON.stringify(res))
				}
			})
			if (businessKey) {
				checkUserByBusinessKey({
					success: function(res) {
						if (res.data.code == 1) {
							var data = res.data.data
							that.globalData.loginStatus = data;
							if (data == 1) {
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
											var avatarUrl = res.data.data;
											that.getBusinessKey().then(res => {

												if (res.status == 0) {
													console.log(res, '-------status--------')
													console.log('已经登录~')
													uploadUserInfo({
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
													console.log(res, '-------status--------')
													console.log('没有登录~')
													uploadUserInfo({
														data: {
															avatarUrl,
															city: userInfo.city,
															county: userInfo.country,
															gender: userInfo.gender,
															nickName: userInfo.nickName,
															provice: userInfo.provice
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
							}
						}
					}
				})
			}
		})



		// console.log(options,'---onLaunch---')

		wx.cloud.init();
		// this.getBusinessKey();
		//调用
		// this.version();

// 						for (var i = 0; i < 3; i++) {
// 							const db = wx.cloud.database()
// 							db.collection('puzzleArr').add({
// 								data: {
// 									potatoUrl: 'dfdfdfdfdfd',
// 									date: '4-25'
// 								},
// 								success: res => {
// 									//         // 在返回结果中会包含新创建的记录的 _id
// 				
// 									console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
// 								},
// 								fail: err => {
// 									wx.showToast({
// 										icon: 'none',
// 										title: '新增记录失败'
// 									})
// 									console.error('[数据库] [新增记录] 失败：', err)
// 								}
// 							})
// 						}
		// 




		// const db = wx.cloud.database()
		// // 查询当前用户所有的 counters
		// db.collection('potatoDate').where({
		// }).get({
		//   success: res => {
		//     console.log(res);

		//     console.log('[数据库] [查询记录] 成功: ', res)
		//   },
		//   fail: err => {
		//     wx.showToast({
		//       icon: 'none',
		//       title: '查询记录失败'
		//     })
		//     console.error('[数据库] [查询记录] 失败：', err)
		//   }
		// })

		// wx.showShareMenu({
		//   withShareTicket: true
		// })

		// this.getPhoneType();

		// this.getBusinessKey().then(function(res){
		//   console.log("businessKey初始化");
		// })
		// wx.cloud.init();

		// 获取手机设备信息



		// 获取小程序更新机制兼容

		if (wx.canIUse('getUpdateManager')) {

			const updateManager = wx.getUpdateManager()

			updateManager.onCheckForUpdate(function(res) {

				// 请求完新版本信息的回调

				if (res.hasUpdate) {

					updateManager.onUpdateReady(function() {

						wx.showModal({

							title: '更新提示',

							content: '新版本已经准备好，是否重启应用？',

							success: function(res) {

								if (res.confirm) {

									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启

									updateManager.applyUpdate()

								} else if (res.cancel) {
									updateManager.applyUpdate()
								}

							}

						})

					})

					updateManager.onUpdateFailed(function() {

						// 新的版本下载失败

						wx.showModal({

							title: '已经有新版本了哟~',

							content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',

						})

					})

				}

			})

		} else {

			// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示

			wx.showModal({

				title: '提示',

				content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'

			})

		}

	},

	insertUserAuth: function(userAuthInfo) {
		insertUserAuth({
			data: {
				userAuthInfo
			},
			success: function(res) {
				console.log(res, '--------')
			}
		})

	},

	onShow: function() {
		var that = this;
		if (that.globalData.loginStatus == 1) {
			wx.showLoading({
				title: '加载中...',
				icon: 'none'
			})
			updateSingleAvatarUrl({
				data: {
					avatarUrl: userInfo.avatarUrl
				},
				success: function(res) {
					if (res.data.code == 1) {
						var avatarUrl = res.data.data;
						that.getBusinessKey().then(res => {

							if (res.status == 0) {
								console.log(res, '-------status--------')
								console.log('已经登录~')
								uploadUserInfo({
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
								console.log(res, '-------status--------')
								console.log('没有登录~')
								uploadUserInfo({
									data: {
										avatarUrl,
										city: userInfo.city,
										county: userInfo.country,
										gender: userInfo.gender,
										nickName: userInfo.nickName,
										provice: userInfo.provice
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
		}
	},

	onHide: function() {

	},

  


	getPhoneType: function() {

		var isIphoneX = wx.getStorageSync('isIphoneX');

		const that = this;
		if (isIphoneX != '' && isIphoneX != null) {

			that.globalData.isIphoneX = isIphoneX;

		} else {
			wx.getSystemInfo({
				success: function(res) {
					var model = res.model;
         
					if (model.indexOf('iPhone X') != -1) {

						that.globalData.isIphoneX = true;
						wx.setStorageSync('isIphoneX', that.globalData.isIphoneX);
					}
				}
			})
		}
	},

  




	getBusinessKey: function() {

		const that = this;

		return new Promise(function(resolve, reject) {
			var businessKey = wx.getStorageSync('businessKey');
  
			checkBusinessKey({
				data: {
					businessKey: businessKey
				},
				success: function(res) {

					if (res.data.code != 1) {

						wx.login({
							success: function(res) {
								console.log('wx.login success')
								console.log(res)
								console.log('--------------------------------------')

								login({
									data: {
										code: res.code,
										appName: that.globalData.appName
									},
									success: function(e) {
										console.log('app login ')
										console.log(e)
										if (e.data.code == 1) {

											console.log('-------------------app login success-------------------')
											var key = e.data.data.session_key;
											wx.setStorageSync("businessKey", key);
											console.log('businessKey = ' + key)

											var res = {
												code: 1,
												data: e.data.data.session_key,
												status: e.data.data.status
											}
											resolve(res)
										}
									}
								})
							},
							fail: function() {
								console.log('wx.login fail')
								console.log(res)
								wx.login({
									success: function(res) {
										login({
											data: {
												code: res.code,
												appName: that.globalData.appName
											},
											success: function(e) {

												if (e.data.code == 1) {
													console.log(e)
													console.log('-----------------app login success---------------------')
													var key = e.data.data.session_key;
													wx.setStorageSync("businessKey", key);
													console.log('businessKey: ' + key)
												}
												var res = {
													code: 1,
													data: e.data.data.session_key,
													status: e.data.data.status
												}
												resolve(res)
											}
										})
									},
								})
							}
						})
					} else {

						var res = {
							code: 1,
							data: businessKey
						}
						resolve(res)
					}
				}
			})
		})
	},


	version: function() {
		console.log('envVersion', __wxConfig.envVersion);
		let version = __wxConfig.envVersion;
		switch (version) {
			case 'develop':
				return 'https://测试版环境域名';
				break;
			case 'trial':
				return 'https://体验版环境域名';
				break;
			case 'release':
				return 'https://线上环境域名';
				break;
			default:
				return 'https://测试版环境域名';
		}
	}
  




})
