// pages/Piazza/DynamicDetail/DynamicDetail.js
import {
	getDishDetail,
	addCollection,
	deleteCollection,
	shareSomething,
	likeSomething,
	insertComment,
	getEvaluates,
	deleteDrafts,
	addCommentReply,
	CheckContent,
	getStepAudio
} from '../../../api/api.js';


var app = getApp();
var objectType = '';
var objectId = 0;
const audio = wx.createInnerAudioContext();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imgDomain: app.globalData.imgDomain,
		imgDomain1: app.globalData.imgDomain1,
		star: false,
		isComment: false,
		isCollection: false,
		cookType: '',
		dishDetail: {},
		evaluateList: [],
		evaluateCount: 0,
		isFrom: '',
		materialCount: 0,
		starList: [],
		object: {},
		condimentList: [],
		materialList: [],
		official: false,
		commentList: [],
		contentText: '',
		unflod: false,
		status: 0,
		photos: [],
		objectId: 0,
		objectType: '',
		isCover: true,
		isPreview: false,
		isEquality: '',
		isPlay: true,
		isShowLoading: false,
		isReply: false,
		ruserId: '',
		commentIndex: '',
		isLogin: false,
		cid: '',
		placeholder: '',
		showBottom: true,
		currentPlay: -1,
		currentVideo: 0,
		pause: false,
		audioList: [],
		// play: false,
		pause: true,
		showIndia: false,
		actName: '',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		

		console.log(options, '-----options------')

		this.dialog = this.selectComponent("#dialog");
		var userInfo = wx.getStorageSync('userInfo');

		if (userInfo == null || userInfo == "") {

			this.showDialog();
			this.setData({
				isLogin: false
			})
		} else {
			this.setData({
				isLogin: true,
				status: 0
			})
		}

		if (options.scene != null) {
			var scene = decodeURIComponent(options.scene);

			console.log(scene, '--------------------------');
			var lesson = scene.split('&')
			objectId = lesson[0].split('=')[1]
			objectType = lesson[1].split('=')[1]
			console.log(objectId, objectType, '拆分后的id和type')
		} else {
			objectId = Number(options.objectId);
			objectType = options.objectType;
			console.log(objectId, objectType, '传进来的')
		}

		//获取音频源
		this.getStepAudio();

		var isFrom = options.isFrom;

		if (isFrom != '' && isFrom != null) {
			var isPreview = isPreview == 'preview' ? true : false;
			this.setData({
				isFrom,
				isPreview
			})
		}
		
		var actName = options.actName;
		if (actName != '' && actName != null) {

			this.setData({
				actName
			})
		}
		
		if (wx.getStorageSync('hideSelf') == null || wx.getStorageSync('hideSelf') == '') {
			this.setData({
				showIndia: true
			})
		}
		
		console.log(wx.getStorageSync('hideSelf'),'pppppppp')

		this.setData({
			objectId: objectId,
			objectType: objectType
		})

		var title = objectType == 'sauce' ? '酱汁详情' : '菜谱详情';
		wx.setNavigationBarTitle({
			title: title
		})

		this.getDishDetail();
	},


	onHide: function() {
		this.setData({
			currentPlay: -1
		})
	},

	onUnload: function() {

		audio.stop()
		audio.offEnded()
		audio.offPlay()
		audio.offStop()

		// 		console.log('onUnload')
		// 		
		// 		var that = this;
		// 		var promise = new Promise((resolve, reject) => {
		// 			resolve();
		// 		})
		// 		promise.then(() => {
		// 			audio.stop();
		// 			return new Promise((resolve, reject) => {
		// 				resolve();
		// 			})
		// 		}).then(() => {
		// 			audio.destroy();
		// 		})
	},

	onShow: function() {

		var that = this;

		if (that.data.dishDetail != {}) {
			let arr = getCurrentPages();

			let page = arr[arr.length - 1];

			if (page.data.evaluate != '' && page.data.stepItem != null) {

				list.splice(0, 0, page.data.evaluate);
				that.setData({
					evaluateList: evaluateList
				})
			}
		}

		if (objectType == 'sauce') {
			that.getEvaluates();
		}

	},

	//跳转分享页面
	shareFriends: function() {
		if (this.data.objectType == 'dish') {
			wx.navigateTo({
				url: `../../sharePage/sharePage?isfrom=dish&objectId=${this.data.dishDetail.other.objectId}&type=piazza`,
			})
		} else {
			wx.navigateTo({
				url: `../../sharePage/sharePage?isfrom=sauce&objectId=${this.data.dishDetail.other.objectId}&type=piazza`,
			})
		}

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

	EmptyconfirmEvent: function() {
		var userInfo = wx.getStorageSync('userInfo');
		if (this.data.status == 4 && !userInfo) {
			this.showDialog();
		} else {
			wx.startPullDownRefresh();
		}
	},

	//跳转首页菜谱推荐列表
	skipMoreRecommend: function() {
		wx.navigateTo({
			url: '../../Home/RecommedHistory/RecommedHistory',
		})
	},

	//点击播放视频
	playVideo: function() {

		var myVideo = wx.createVideoContext('myVideo');

		var that = this;
		setTimeout(function() {
			audio.stop();
			that.setData({
				isCover: false,
				currentPlay: -1
			})
		}, 1000)

		myVideo.play();
	},

	bindended: function() {
		var myVideo = wx.createVideoContext('myVideo');
		this.setData({
			isCover: true
		})
		myVideo.pause();
	},



	bindwaiting: function(e) {
		// 		console.log(e,'----e-----')
		// 		this.setData({
		// 			pause : true
		// 		})
	},
	
	bindpause: function(){
		console.log('bindpause')
		this.data.isCover = true;
	},

	bindtimeupdate: function(e) {
		// if (this.data.pause) {
		this.setData({
			currentPlay: -1,
			isCover: false
		})
		audio.pause();
		// }
	},

	onPullDownRefresh: function() {
		wx.showLoading({
			title: '加载中...',
			mask: true
		})
		wx.showNavigationBarLoading();
		this.getDishDetail();
	},
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function(res) {

		var that = this;
		var tempName = objectType == 'sauce' ?  that.data.dishDetail.objectInfo.menu.sauceName : that.data.dishDetail.objectInfo.menu.dishName;
		
		
		return {
			title: tempName,
			// 分享时在路径后拼接参数，可拼接多个参数。
			path: 'pages/Piazza/DynamicDetail/DynamicDetail?objectId=' + objectId + '&objectType=' + objectType,
			success: function(res) {

				shareSomething({
					data: {
						objectId: objectId,
						objectType: objectType
					},
					success: function(res) {
						if (res.data.code == 1) {
							wx.showToast({
								title: '转发成功',
								icon: 'success',
								duration: 2000,
							})
						}
					}
				})
			},
			fail: function(res) {
				// 转发失败
				console.log("转发失败")
			}
		}

	},

	//回复评论
	addCommentReply: function(e) {
		// console.log(e.currentTarget,'---')
		var index = e.currentTarget.dataset.index;
		var commentList = this.data.commentList[index];
		var placeholder = `回复 ${commentList.nickname}`;

		if (commentList.commentReply.status == 0) {
			wx.showToast({
				title: '该评论正在审核中',
				icon: 'none'
			})
			return;
		} else {
			this.setData({
				isComment: true,
				contentText: '',
				isReply: true,
				ruserId: e.currentTarget.dataset.userid,
				cid: e.currentTarget.dataset.cid,
				placeholder,
				showBottom: false
			})
		}


	},


	starSomeOne: function(e) {
		this.setData({
			star: !this.data.star
		})
	},


	getDishDetail: function() {

		var that = this;
		var userInfo = wx.getStorageSync('userInfo')

		if (userInfo == '' || userInfo == null) {
			that.setData({
				status: 4
			})
		} else {
			getDishDetail({
				data: {
					objectId: objectId,
					objectType: objectType
				},
				success: function(res) {
					if (res.data.code == 1) {

						wx.hideNavigationBarLoading() //完成停止加载

						var dishDetail = res.data.data;

						if (dishDetail.objectInfo.menu.videoUrl != '' && dishDetail.objectInfo.menu.videoUrl != null) {
							that.setData({
								official: true
							})
						}

						if (dishDetail.objectInfo.collectStatus == 1) {
							that.setData({
								isCollection: true
							})
						}
						var cooks = dishDetail.objectInfo.cooks;
						var cookStr = '';

						if (cooks.length > 0) {
							for (var i = 0; i < cooks.length; i++) {
								var cook = cooks[i];
								cookStr = cookStr + ' ' + cook.cookName;
							}
						}


						var starList = [];
						for (var i = 0; i < 5; i++) {
							if (i < dishDetail.objectInfo.menu.difficulty) {
								starList.push('../../../img/star_on.png');
							} else {
								starList.push('../../../img/star_off.png');
							}
						}

						var material = that.creatMaterial(dishDetail.objectInfo.material, 1);
            console.log(material,"1111111111111111")
						var condiment = that.creatMaterial(dishDetail.objectInfo.condiment, 2);
						var materialList = [];

						materialList = materialList.concat(material);
						materialList = materialList.concat(condiment);

						var materialCount = materialList.length;

						if (materialCount > 6) {
							materialList.splice(6, materialList.length - 6);
						}

						dishDetail.objectInfo.menu.nickName = dishDetail.objectInfo.menu.nickName.length > 8 ? (dishDetail.objectInfo.menu.nickName.substring(0, 8) + '') : dishDetail.objectInfo.menu.nickName;
						var photo = dishDetail.objectInfo.photos == undefined ? [] : dishDetail.objectInfo.photos;



						for (let i = 0; i < dishDetail.objectInfo.steps.length; i++) {
							let item = dishDetail.objectInfo.steps[i];
							if (item.steptPhoto == null) {
								continue;
							} else {
								if (item.steptPhoto.indexOf('https://img.jishantech.com') == 0) {
									var url = item.steptPhoto;
									var arr = url.split('/');
									var newArr = `/${arr[3]}/${arr[4]}`
									item.steptPhoto = newArr
								} else {
									continue;
								}
							}
						}


						wx.getImageInfo({
							src: 'https://img.jishantech.com' + dishDetail.objectInfo.menu.defPhoto,
							success: function(res) {
								console.log(res, '------')
								if (res.width == res.height) {
									that.setData({
										isEquality: true
									})
								} else {
									isEquality: false
								}
							}
						})

						that.setData({
							photos: photo,
							status: 1,
							dishDetail: dishDetail,
							cookType: cookStr,
							starList: starList,
							materialList: materialList,
							materialCount: materialCount,
						})

						// console.log('dishDetail.objectInfo.menu.nickName = ' + dishDetail.objectInfo.menu.nickName);
						console.log(dishDetail.objectInfo.menu);
						if (objectType == 'dish') {
							that.setData({
								commentList: dishDetail.objectInfo.commentList,
							})
						}
					} else {

						that.setData({
							status: 3
						})
					}
				},
				fail: function(res) {
					that.setData({
						status: 3
					})
				},
				complete: function() {
					setTimeout(() => {
						wx.hideLoading();
					}, 100);
					wx.hideNavigationBarLoading() //完成停止加载
					wx.stopPullDownRefresh() //停止下拉刷新
				}
			})
		}


	},


	goOtherUserCenter: function() {
		wx.navigateTo({
			url: '../OthersUserCenter/OthersUserCenter?userId=' + this.data.dishDetail.objectInfo.sourceId
		})
	},


	comment: function() {
		this.setData({
			isComment: true,
			contentText: '',
			isReply: false,
			placeholder: '说点什么吧...',
			showBottom: false
		})
	},


	likeSomething: function(e) {

		var that = this;
		var dishDetail = that.data.dishDetail;
		var likeCount = '';

		wx.showLoading({
			mask: true
		})


		if (dishDetail.objectInfo.count) {
			likeCount = dishDetail.objectInfo.count.likeCount;
		} else {
			dishDetail.objectInfo.count = {};
			likeCount = 0;
		}

		likeSomething({
			data: {
				objectType: objectType,
				objectId: objectId
			},
			success: function(res) {
				console.log(res)
				if (res.data.code == 1) {
					// dishDetail.objectInfo.count.likeCount = dishDetail.objectInfo.count == null ? 0 : dishDetail.objectInfo.count.likeCount;

					dishDetail.objectInfo.count.likeCount = likeCount + 1;
					that.setData({
						dishDetail: dishDetail
					})
					wx.hideLoading();
				} else {
					wx.showToast({
						title: '系统繁忙,稍后再试~',
						icon: 'none',
						duration: 2000
					})
				}
			}
		})
	},


	addCollection: function() {


		var that = this;
		var data = {
			"businessKey": wx.getStorageSync('businessKey'),
			"objectId": objectId,
			"objectType": objectType
		}


		if (that.data.isCollection) {
			wx.showLoading({
				title: '取消收藏...',
				mask: true
			})
			deleteCollection({
				data: data,
				success: function(res) {
					if (res.data.code == 1) {
						that.setData({
							isCollection: false
						})
						setTimeout(function() {
							wx.showToast({
								title: '已取消收藏',
								icon: 'success',
								duration: 2000,
							})
						}, 500)

					} else {
						setTimeout(function() {
							wx.showToast({
								title: '系统繁忙,稍后再试~',
								icon: 'none',
								duration: 2000
							})
						}, 500)
					}
				}
			})
		} else {
			wx.showLoading({
				title: '正在收藏...',
				mask: true
			})
			addCollection({
				data: data,
				success: function(res) {
					if (res.data.code == 1) {

						that.setData({
							isCollection: true
						})
						setTimeout(() => {
							wx.showToast({
								title: '收藏成功',
								icon: 'success',
								duration: 2000,
							})
						}, 500)

					} else {
						setTimeout(() => {
							wx.showToast({
								title: '系统繁忙,稍后再试~',
								icon: 'none',
								duration: 2000
							})
						}, 500)

					}
				}
			})
		}
	},





	sendComment: function() {

		setTimeout(() => {

			var that = this;
			var text = that.data.contentText;

			text = text.replace(/^\s+|\s+$/g, "");
			wx.showLoading({
				title: '发送中...',
				mask: true
			})
			if (text != '' && text != null) {


				CheckContent({
					data: {
						content: text
					},
					success: function(res) {

						if (res.data.code == 1) {
							if (that.data.isReply) {
								addCommentReply({
									data: {
										commentReply: {
											"content": text,
											"objectId": objectId,
											"objectType": objectType,
											"ruserId": that.data.ruserId,
											"cid": that.data.cid
										}
									},
									success: function(res) {
										if (res.data.code == 1) {
											var comment = res.data.data;
											var list = that.data.commentList;

											list.unshift(comment);

											that.setData({
												commentList: list,
												isComment: false,
												contentText: '',
												isReply: false,
												showBottom: true
											})
											wx.showToast({
												title: '回复成功~',
												icon: 'none',
												duration: 1500
											})

										} else {
											if (res.data.data !== null) {
												wx.showToast({
													title: res.data.data,
													icon: 'none',
													duration: 1500
												})
											} else {
												wx.showToast({
													title: '发送失败',
													icon: 'none',
													duration: 1500
												})
											}

										}
									}
								})
							} else {
								addCommentReply({
									data: {
										commentReply: {
											"cid": 0,
											"content": text,
											"objectId": objectId,
											"objectType": objectType
										}
									},
									success: function(res) {
										if (res.data.code == 1) {
											var comment = res.data.data;
											var list = that.data.commentList;

											list.unshift(comment);
											that.setData({
												commentList: list,
												isComment: false,
												contentText: '',
												showBottom: true
											})
											wx.showToast({
												title: '评论成功~',
												icon: 'none',
												duration: 1500
											})
										} else {
											wx.showToast({
												title: '系统繁忙,稍后再试~',
												icon: 'none',
												duration: 1500
											})
										}
									}
								})
							}
						} else {
							wx.showToast({
								title: '评论失败',
								icon: 'none'
							})
						}
					},
					fail: function() {
						wx.showToast({
							title: '网络错误',
							icon: 'none'
						})
					}
				})



			} else {

				that.setData({
					isComment: false,
					contentText: '',
					showBottom: true
				})


				wx.showToast({
					title: '评论为空!',
					icon: 'none',
					duration: 1500,
				})
			}
		}, 100);
	},


	cancelComment: function(e) {

		var text = e.detail.value;
		var that = this;
		this.setData({
			contentText: text,
			placeholder: '',
		})

		setTimeout(() => {
			that.setData({
				showBottom: true,
				isComment: false
			})
		}, 100)
	},

	goCommentList: function() {
		wx.navigateTo({
			url: '../CommentList/CommentList?objectType=' + objectType + '&objectId=' + objectId
		})
	},

	// 
	// 	confirmEvent: function() {
	// 		wx.startPullDownRefresh();
	// 	},


	unflod: function() {

		var unflod = !this.data.unflod;
		var materialList = [];

		var material = this.creatMaterial(this.data.dishDetail.objectInfo.material, 1);

		var condiment = this.creatMaterial(this.data.dishDetail.objectInfo.condiment, 2);


		materialList = materialList.concat(material);
		materialList = materialList.concat(condiment);

		var materialCount = materialList.length;

		if (!unflod) {

			if (materialCount > 6) {
				materialList.splice(6, materialList.length - 6);
			}
		}

		this.setData({
			unflod: unflod,
			materialList: materialList,
			materialCount: materialCount
		})
	},

	goTest: function() {
		wx.navigateTo({
			url: '../../Release/ReleaseProduct/ReleaseProduct?objectType=sauce' + '&objectId=' + objectId
		})
	},

	didSelectedItem: function(e) {
		var index = e.currentTarget.dataset.index;
		var evaluate = this.data.evaluateList[index];

		if (evaluate.status == 1) {
			app.globalData.evaluate = evaluate;

			wx.navigateTo({
				url: '../../Piazza/TestDetail/TestDetail'
			})
		} else {
			wx.showToast({
				title: '评测审核中...',
				icon: 'none',
				duration: 2000,
			})
		}
	},


	getEvaluates: function() {

		var that = this;
		getEvaluates({
			data: {
				currentPage: 1,
				objectId: objectId,
				objectType: "sauce",
				size: 10
			},
			success: function(res) {

				if (res.data.code == 1) {
					var list = res.data.data.comment;
					var evaluateList = [];

					for (let i = 0; i < list.length; i++) {
						var item = list[i];
						item.evaluatePhotos = JSON.parse(item.evaluatePhotos)
					}

					if (list.length > 2) {
						evaluateList = [list[0], list[1]];
					} else {
						evaluateList = list;
					}

					that.setData({
						evaluateList: evaluateList,
						evaluateCount: list.length
					})
				}
			}
		})
	},



	clickMore: function() {
		wx.navigateTo({
			url: '../../SauceLib/SauceProfile/SauceProfile?objectId=' + objectId
		})
	},


	deleteDrafts: function() {

		var that = this;
		wx.showModal({
			title: '提示',
			content: '真的要删除吗',
			success(res) {
				if (res.confirm) {
					that.deleteObject()
				} else if (res.cancel) {}
			}
		})
	},

	deleteObject: function() {
		wx.showLoading({
			title: '正在删除...',
			mask: true
		})
		var that = this;
		deleteDrafts({
			data: {
				isPublish: that.data.dishDetail.objectInfo.menu.isPublish,
				objectId: objectId,
				objectType: objectType,
			},
			success: function(res) {
				if (res.data.code == 1) {
					wx.showToast({
						title: '已删除',
						icon: 'success',
						duration: 2000,
					})
					wx.navigateBack();
				} else {
					wx.showToast({
						title: '系统繁忙,稍后再试~',
						icon: 'none',
						duration: 2000
					})
				}
			}
		})
	},



	editObject: function() {

		var object = {};
		var objectDetail = this.data.dishDetail;

		object.objectName = objectDetail.other.objectName;
		object.objectId = objectDetail.other.objectId;

		object.condiment = objectDetail.objectInfo.condiment;
		object.steps = objectDetail.objectInfo.steps;
		object.defPhoto = objectDetail.objectInfo.menu.defPhoto;
		object.cooks = objectDetail.objectInfo.cooks;
		object.duration = objectDetail.objectInfo.menu.duration;
		object.cookIds = objectDetail.objectInfo.menu.cookIds;
		object.difficulty = objectDetail.objectInfo.menu.difficulty;

		if (objectType == 'dish') {
			object.material = objectDetail.objectInfo.material;
			object.dishSummary = objectDetail.objectInfo.menu.dishSummary;
			object.tips = objectDetail.objectInfo.menu.tips;
			object.sauceIds = objectDetail.objectInfo.menu.sauceIds;
			object.sauces = objectDetail.objectInfo.sauces;
		}
		console.log('object');
		console.log(object);

		app.globalData.objectInfo = object;

		var url = '';
		if (objectType == 'dish') {
			url = '../../Release/ReleaseMenu/ReleaseMenu?isFrom=drafts'
		} else {
			url = '../../Release/ReleaseSauce/ReleaseSauce?isFrom=drafts'
		}

		setTimeout(() => {
			wx.navigateTo({
				url: url
			})
		}, 100)
	},


	creatMaterial: function(arr, type) {

		var result = [];

		for (var i = 0; i < arr.length; i++) {
			var material = {};
			var map = arr[i];
			if (type == 1) {
				material.objectName = map.fmName;
			} else if (type == 2) {
				material.objectName = map.condimentName;
			}

			material.dosage = map.dosage;
			material.unit = map.unit;
			result.push(material);

		}

		return result;
	},

	sure: function() {
		wx.navigateBack();
	},


	// 音频播放


	// 	goVideo: function (e) {
	// 		var currentPlay = e.currentTarget.dataset.index;
	// 		console.log(e)
	// 		 this.setData({
	// 			 currentPlay
	// 		 })
	// 		 
	// 		 this.showAudio();
	// 	},
	// 	
	// 	
	// 	hideAudio: function () {
	// 		
	// 		if (objectId == 1596) {
	// 			this.player.pause();
	// 		}
	// 		
	// 		setTimeout(() => {
	// 			this.animation.translate(0, 0).step()
	// 			this.setData({
	// 			  animation: this.animation.export(),
	// 				play: false
	// 			})
	// 		},100)
	// 		
	// 	},
	// 	
	// 	
	// 	showAudio: function () {
	// 		
	// 		this.animation.translate(0, -this.data.sh).step()
	// 		this.setData({
	// 		  animation: this.animation.export(),
	// 			play: true
	// 		})
	// 		
	// 		if (objectId == 1596) {
	// 			setTimeout(() => {
	// 				this.player.play()
	// 			},500)
	// 		}
	// 	},
	// 	
	// 	
	play: function(e) {
		var currentVideo = e.currentTarget.dataset.index;

		if (!this.data.isCover) {
			wx.showToast({
				title: '请关闭其他音频或者视频',
				icon: 'none'
			})
		} else {
			if (currentVideo == this.data.currentVideo) {

				var pause = !this.data.pause;

				if (pause) {
					this.setData({
						currentPlay: -1
					})
					audio.pause();
				} else {
					this.setData({
						currentPlay: currentVideo
					})
					audio.play();
				}

				this.data.pause = pause;
			} else {
				this.changeAudio(currentVideo);
			}
		}



		// 		if (pause) {
		// 			this.player.pause()
		// 		} else {
		// 			this.player.play()
		// 		}
	},

	next: function() {

		var currentVideo = this.data.currentVideo;

		if (currentVideo >= this.data.audioList.length - 1) {
			this.data.currentVideo = this.data.audioList.length - 1;
			// var src = that.data.imgDomain + audioList[currentVideo].stepSpeech.speechUrl;
			// audio.src = src;
			audio.stop();
			this.setData({
				currentPlay: -1
			})
			return;
		} else {
			currentVideo = currentVideo + 1;
			this.changeAudio(currentVideo);
		}
	},

	// 	next: function () {
	// 				
	// 		this.player.stop();
	// 		var steps = this.data.dishDetail.objectInfo.steps;
	// 		var that = this;
	// 		setTimeout(() => {
	// 			var currentPlay = that.data.currentPlay;
	// 			currentPlay = currentPlay >= steps.length - 1 ? steps.length - 1 : currentPlay + 1;
	// 					
	// 			that.setData({
	// 				currentPlay
	// 			})
	// 			that.player.play()
	// 		},200)
	// 		
	// 
	// 	},
	// 
	// 
	// 	last: function () {
	// 		
	// 		this.player.stop();
	// 		var steps = this.data.dishDetail.objectInfo.steps;
	// 		var that = this;
	// 		
	// 		setTimeout(() => {
	// 			var currentPlay = that.data.currentPlay;
	// 			currentPlay = currentPlay <= 0 ? 0 : currentPlay - 1;
	// 
	// 					
	// 			that.setData({
	// 				currentPlay
	// 			})
	// 			
	// 			that.player.play()
	// 		},200)
	// 	},
	// 
	// 
	// 	
	// 	pause: function () {
	// 		this.setData({
	// 			pause: true
	// 		})
	// 	},
	// 	
	// 	ended: function () {
	// 		var currentPlay = this.data.currentPlay;
	// 		var steps = this.data.dishDetail.objectInfo.steps;
	// 		
	// 		if (currentPlay == steps.length - 1) {
	// 			this.player.stop();
	// 		} else {
	// 			this.next();
	// 		}
	// 	}


	changeAudio: function(currentVideo) {

		var that = this;
		var a = new Promise((resolve, reject) => {
			resolve();
		})

		a.then(() => {
			audio.stop();
			return new Promise((resolve, reject) => {
				resolve();
			})
		}).then(() => {
			var src = that.data.imgDomain + that.data.audioList[currentVideo].stepSpeech.speechUrl;
			audio.src = src;
			console.log(src, 'changeAudio-src');
			audio.play()

			that.data.currentVideo = currentVideo;

			that.setData({
				currentPlay: currentVideo
			})
		})
	},

	getStepAudio: function() {

		var that = this;
		getStepAudio({
			data: {
				"objectId": objectId,
				"objectType": "dish"
			},
			success: function(res) {
        console.log(res)
				if (res.data.code == 1) {
					var audioList = res.data.data;

					if (audioList.length > 0) {
						var src = that.data.imgDomain + audioList[0].stepSpeech.speechUrl;
						audio.src = src;
						audio.obeyMuteSwitch = false;
						audio.onEnded(() => {
							that.data.pause = true;
							// 							if (that.data.currentVideo >= audioList.length - 1) {
							// 								audio.stop()
							// 								
							// 							} else{
							that.next();
							// }
							// 							this.setData({
							// 								currentPlay: -1
							// 							})
						})

						audio.onStop(() => {
							that.data.pause = true
							// console.log(that.data.pause)
						})

						audio.onPlay(() => {
							that.data.pause = false
							// console.log(that.data.pause)
						})
					}

					that.setData({
						audioList
					})
				} else {

				}
			}
		})
	},
	
	
	hideSelf: function () {
		wx.setStorageSync("hideSelf", 1);
		this.setData({
			showIndia: false
		})
	}




})
