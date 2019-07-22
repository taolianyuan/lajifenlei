import {
	getFeedPage,
	follow,
	unFollow,
	likeSomething,
	getRecommendDishList,
	shareSomething,
	insertComment,
	addCommentReply,
	CheckContent
} from '../../../api/api.js';

var objectType;
var objectId;

Page({

	/**
	 * 组件的初始数据
	 */
	data: {
		imgDomain: getApp().globalData.imgDomain,
		newsList: [],
		recommendList: [],
		star: false,
		fansId: 0,
		current: 0,
		isIphoneX: getApp().globalData.isIphoneX,
		pageSize: 10,
		status: 0,

		noMoreData: false,
		showLoading: false,
		currentPage: 1,
		totalPage: 0,

		isComment: false,
		contentText: '',
		contentIndex: 0,
		isLogin: false,
		currentPage2: 1,
		totalPage2: 0,
		isReply: false,
		ruserId: '',
		placeholder: '说点什么吧...',
		cid: ''
	},

	onPullDownRefresh: function() {
		wx.showLoading({
			title: '加载中...',
			mask: true
		})
		wx.showNavigationBarLoading();

		this.getData(this.data.current, 1);
	},

	onReachBottom: function() {
		const that = this;

		if (this.data.current == 0) {
			if (this.data.totalPage == this.data.currentPage) {
				this.setData({
					noMoreData: true
				});

				setTimeout(function() {
					that.setData({
						noMoreData: false
					});
				}, 1500);
				return;
			}

			wx.showLoading({
				title: '加载中...',
				mask: true
			})

			that.setData({
				showLoading: true,
				noMoreData: false
			})

			// let that = this;
			if (!that.data.noMoreData && that.data.showLoading) {
				var page = that.data.currentPage + 1;
				that.getData(that.data.current, page);
			}
		} else {
			if (this.data.totalPage2 == this.data.currentPage2) {
				this.setData({
					noMoreData2: true
				});
				const that = this;
				setTimeout(function() {
					that.setData({
						noMoreData2: false
					});
				}, 1500);
				return;
			}

			wx.showLoading({
				title: '加载中...',
				mask: true
			})


			this.setData({
				showLoading2: true,
				noMoreData2: false
			})

			let that = this;
			if (!that.data.noMoreData2 && that.data.showLoading2) {
				var page = this.data.currentPage2 + 1;
				this.getRecommend(page);
			}
		}

	},


	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function(options) {


	},

	//跳转分享按钮
	shareFriends: function(e) {
		var section = e.currentTarget.dataset.section;
		var objectId = this.data.newsList[section].feedAndUserVO.feed.objectId;
		var objectType = this.data.newsList[section].feedAndUserVO.feed.objectType;

		if (objectType == 'dish') {
			wx.navigateTo({
				url: `../../sharePage/sharePage?isfrom=dish&objectId=${objectId}&type=piazza`,
			})
		} else if (objectType == 'sauce') {
			wx.navigateTo({
				url: `../../sharePage/sharePage?isfrom=sauce&objectId=${objectId}&type=piazza`,
			})
		} else if (objectType == 'post') {
			wx.navigateTo({
				url: `../../sharePage/sharePage?isfrom=post&objectId=${objectId}&type=piazza`,
			})
		}
	},


	goMessage: function() {
		console.log(22222)
		wx.navigateTo({
			url: '../Message/Message'
		})
	},

	starSomeOne: function(e) {
		console.log(index)
	},


	/*---------------------------------------------------------------------------------------------------------------------*/

	goOthersCenter: function(e) {
		var userId = e.currentTarget.dataset.id;
		var userInfo = wx.getStorageSync('userInfo');
		if (userInfo == '' || userInfo == null) {
			this.showDialog();
			this.setData({
				isLogin: false
			})
		} else {
			wx.navigateTo({
				url: '../../Piazza/OthersUserCenter/OthersUserCenter?userId=' + userId
			})

			this.setData({
				isLogin: true
			})
		}

	},



	goNewsDetail: function(e) {

		var section = e.currentTarget.dataset.section;
		objectType = this.data.newsList[section].feedAndUserVO.feed.objectType;
		objectId = this.data.newsList[section].feedAndUserVO.feed.objectId;
		var userInfo = wx.getStorageSync('userInfo');



		if (userInfo == '' || userInfo == null) {
			this.showDialog();
			this.setData({
				isLogin: false
			})
		} else {
			if (objectType == 'dish' || objectType == 'sauce') {
				wx.navigateTo({
					url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + objectId + '&objectType=' + objectType +
						'&isFrom=normal'
				})
			} else if (objectType == 'post') {
				wx.navigateTo({
					url: '../../Piazza/PostDetail/PostDetail?objectId=' + objectId + '&objectType=' + objectType
				})
			}
			this.setData({
				isLogin: true
			})
		}



	},

	changeStatus: function(e) {

		var that = this;
		var index = e.currentTarget.dataset.index;
		var user = that.data.newsList[index];
		var data = {
			followedUser: user.feed.fansId
		};

		wx.showLoading({
			title: '操作中...',
			icon: 'none',
			mask: 'true'
		})

		if (user.status == 0) {

			follow({
				data: data,
				success: function(res) {
					console.log('follow')
					console.log(res)
					if (res.data.code == 1) {
						that.data.newsList[index].status == 2
						setTimeout(() => {
							wx.showToast({
								title: '已关注',
								icon: 'success',
							})
							wx.hideLoading();
						}, 100);
					}
				}
			})
		} else {

			unFollow({
				data: data,
				success: function(res) {
					console.log('unFollow')
					console.log(res)
					if (res.data.code == 1) {
						that.data.newsList[index].status == 0

						setTimeout(() => {
							wx.showToast({
								title: '已取消关注',
								icon: 'success',
							})
							wx.hideLoading();
						}, 100);
					}
				}
			})
		}
	},

	getFeedList: function(page) {

		var that = this;
		var userInfo = wx.getStorageSync('userInfo');

		if (userInfo == '' || userInfo == null) {
			this.setData({
				status: 4
			})
		} else {

			getFeedPage({
				data: {
					currentPage: page,
					size: that.data.pageSize
				},
				success: function(res) {
					console.log(res.data)
					if (res.data.code == 1) {

						var status = res.data.data.total == 0 ? 2 : 1;
						that.data.totalPage = res.data.data.pages;
						that.data.currentPage = page;

						that.setData({
							status: status,
						})

						if (res.data.data.total > 0) {

							var list = that.data.newsList;

							status = 1;

							if (res.data.data.pages == page) {
								that.setData({
									showLoading: false,
									noMoreData: true
								})
							} else {

								that.setData({
									showLoading: false,
									noMoreData: false
								})
							}

							if (page == 1) {
								list = res.data.data.feedAndUser;
							} else {
								var arr = res.data.data.feedAndUser;

								if (list.length == res.data.data.total) {
									return;
								}
								list = list.concat(arr);
								console.log(list.length, 'list')
							}

							var time = '';
							var timeList = [];

							for (var i = 0; i < list.length; i++) {


								var jsonStr = list[i].feedAndUserVO.feed.content;

								if (jsonStr != null && '' != jsonStr) {

									if (typeof jsonStr != 'object') {

										jsonStr = jsonStr.replace(/\ufeff/g, "");
										var content = JSON.parse(jsonStr);
										list[i].feedAndUserVO.feed.content = content;
									}
								}
							}
							that.setData({
								newsList: list,
							})
						}
						wx.hideLoading();
					} else {
						that.setData({
							status: 3,
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
					wx.hideNavigationBarLoading({
						success: function() {
							wx.hideLoading();
						}
					}) //完成停止加载
					wx.stopPullDownRefresh() //停止下拉刷新
				}
			})

		}


	},


	// share: function

	likeSomething: function(e) {

		wx.showLoading({
			mask: true
		})

		var that = this;
		var section = e.currentTarget.dataset.section;
		objectId = that.data.newsList[section].feedAndUserVO.feed.objectId;
		objectType = that.data.newsList[section].feedAndUserVO.feed.objectType;
		var list = that.data.newsList;

		var likeCount;

		var userInfo = wx.getStorageSync('userInfo');


		if (userInfo == '' || userInfo == null) {
			this.showDialog();
			this.setData({
				isLogin: false
			})
		} else {
			if (list[section].feedAndUserVO.count) {
				likeCount = list[section].feedAndUserVO.count.likeCount;
			} else {
				list[section].feedAndUserVO.count = {};
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

						setTimeout(() => {
							wx.hideLoading()
						}, 100)

						likeCount += 1;
						list[section].feedAndUserVO.count.likeCount = likeCount;
						that.setData({
							newsList: list
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
			this.setData({
				isLogin: true
			})
		}



	},

	nothing: function() {

	},


	segment: function(e) {
		var current = e.currentTarget.dataset.index;

		this.getData(current, 1);

		this.setData({
			current: current
		})
	},


	getRecommend: function(page) {
		var that = this;
		getRecommendDishList({
			data: {
				currentPage: page,
				size: that.data.pageSize
			},
			success: function(res) {

				if (res.data.code == 1) {

					var status = res.data.data.total == 0 ? 2 : 1;
					that.data.totalPage2 = res.data.data.pages;
					that.data.currentPage2 = page;

					that.setData({
						status: status,
					})

					if (res.data.data.total > 0) {

						var list = that.data.recommendList;

						status = 1;

						if (res.data.data.pages == page) {
							that.setData({
								showLoading: false,
								noMoreData: true
							})
						} else {

							that.setData({
								showLoading: false,
								noMoreData: false
							})
						}

						if (page == 1) {
							list = res.data.data.records;
						} else {
							var arr = res.data.data.records;

							console.log(arr, list, 'list-------')

							if (list.length == res.data.data.total) {
								return;
							}
							list = list.concat(arr);
							console.log(list.length, 'list')
						}

						var time = '';
						var timeList = [];

						that.setData({
							recommendList: list,
						})
					}
					wx.hideLoading();
				} else {
					that.setData({
						status: 3,
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
				wx.hideNavigationBarLoading({
					success: function() {
						wx.hideLoading();
					}
				}) //完成停止加载
				wx.stopPullDownRefresh() //停止下拉刷新
			}
		})
	},


	//回复评论
	addCommentReply: function(e) {
		var index = e.currentTarget.dataset.index;
		var section = e.currentTarget.dataset.section;
		var newList = this.data.newsList[section];

		objectType = this.data.newsList[section].feedAndUserVO.feed.objectType;
		objectId = this.data.newsList[section].feedAndUserVO.feed.objectId;

		var comment = newList.commentList[index];
		var placeholder = `回复: ${comment.nickname}`;
		if (comment.commentReply.status == 0) {
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
				placeholder,
				cid: e.currentTarget.dataset.cid,
				contentIndex: section
			})
		}
	},


	swiperDidEndScroll: function(e) {
		var current = e.detail.current;

		this.setData({
			current: current
		})
	},


	goPreview: function(e) {

		var section = e.currentTarget.dataset.section;
		var list = this.data.newsList[section].feedAndUserVO.feed.content.photoList;
		var current = e.target.dataset.src;

		var urls = [];

		for (var i = 0; i < list.length; i++) {
			var url = list[i];
			urls.push(this.data.imgDomain + url);
		}

		wx.previewImage({
			current: current, // 当前显示图片的http链接
			urls: urls // 需要预览的图片http链接列表
		})
	},

	EmptyconfirmEvent: function() {
		var userInfo = wx.getStorageSync('userInfo');
		if (this.data.status == 4 && !userInfo) {
			this.showDialog();
		} else {
			wx.startPullDownRefresh();
		}
	},


	goDetail: function(e) {
		var index = e.currentTarget.dataset.index;
		var dish = this.data.recommendList[index];
		var userInfo = wx.getStorageSync('userInfo');

		if (userInfo == '' || userInfo == null) {
			this.showDialog();
			this.setData({
				isLogin: false
			})
		} else {
			wx.navigateTo({
				url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + dish.dishId + '&objectType=dish' +
					'&isFrom=normal'
			})
			this.setData({
				isLogin: true
			})
		}

	},

	showAction: function() {

		var userInfo = wx.getStorageSync('userInfo');
		var that = this;

		if (userInfo == '' || userInfo == null) {
			this.showDialog();
			this.setData({
				isLogin: false
			})
		} else {
			wx.showActionSheet({
				itemList: ['发布菜谱', '发酱汁', '发动态'],
				success: function(e) {
					wx.setStorageSync('isBackFrom', '');
					var index = e.tapIndex;
					var router = ['../../Release/ReleaseMenu/ReleaseMenu', '../../Release/ReleaseSauce/ReleaseSauce',
						'../../Release/ReleaseProduct/ReleaseProduct'
					];

					wx.navigateTo({
						url: router[index]
					});
					that.setData({
						isLogin: true
					})

				}
			})
		}

	},

	addComment: function(e) {
		var that = this;

		var section = e.currentTarget.dataset.section;
		objectType = that.data.newsList[section].feedAndUserVO.feed.objectType;
		objectId = that.data.newsList[section].feedAndUserVO.feed.objectId;

		var userInfo = wx.getStorageSync('userInfo');

		if (userInfo == '' || userInfo == null) {
			this.showDialog();
			this.setData({
				isLogin: false
			})
		} else {
			if (objectType == 'sauce') {
				wx.navigateTo({
					url: '../../Release/ReleaseProduct/ReleaseProduct?objectType=' + objectType + '&objectId=' + objectId
				})
			} else {
				this.setData({
					isComment: true,
					contentText: '',
					contentIndex: section,
					isReply: false,
					placeholder: '说点什么吧...'
				})
			}
			this.setData({
				isLogin: true
			})
		}
	},


	sendComment: function() {

		setTimeout(() => {

			var that = this;
			var text = that.data.contentText;

			text = text.replace(/^\s+|\s+$/g, "");



			if (text != '' && text != null) {

				wx.showLoading({
					title: '发送中...',
					mask: true
				})

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
											var list = that.data.newsList;
											var news = list[that.data.contentIndex];
											news.feedAndUserVO.commentCount += 1;
											news.commentList.unshift(res.data.data)
											that.setData({
												newsList: list,
												isComment: false,
												contentText: ''
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
									},
									complete: function() {

									}
								})
							} else {
								addCommentReply({
									data: {
										commentReply: {
											"content": text,
											"objectId": objectId,
											"objectType": objectType,
											"cid": 0
										}
									},
									success: function(res) {
										if (res.data.code == 1) {
											var list = that.data.newsList;
											var news = list[that.data.contentIndex];
											news.feedAndUserVO.commentCount += 1;
											news.commentList.unshift(res.data.data)
											that.setData({
												newsList: list,
												isComment: false,
												contentText: ''
											})
											wx.showToast({
												title: '发送成功',
												icon: 'none',
												duration: 1500
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
						} else {
							wx.showToast({
								title: '评论失败',
								icon: 'none'
							})
						}
					}
				})



			} else {
				that.setData({
					isComment: false,
					contentText: ''
				})

				wx.showToast({
					title: '评论为空!',
					icon: 'none',
					duration: 2000,
				})
			}
		}, 100);
	},


	cancelComment: function(e) {

		var text = e.detail.value;
		var that = this;


		this.setData({
			contentText: text,
			placeholder: ''
		})

		setTimeout(() => {
			that.setData({
				isComment: false
			})
		}, 500)

	},

	// 	bindblur: function(e) {
	// 		var text = e.detail.value;
	// 		// setTimeout(() => {
	// 		// 			this.setData({
	// 		// 				isComment: false,
	// 		// 				contentText: text,
	// 		// 			})
	// 		// }, 500)
	// 
	// 		this.setData({
	// 			isComment: false,
	// 			contentText: text,
	// 			placeholder: ''
	// 		})
	// 
	// 	},
	// 
	goCommentList: function() {

		console.log(objectId, objectType, '-----------------')

		wx.navigateTo({
			url: '../CommentList/CommentList?objectType=' + objectType + '&objectId=' + objectId
		})
	},


	getData: function(current, page) {
		if (current == 0) {
			this.getFeedList(page);
		} else {
			this.getRecommend(page);
		}
	},


	nothing: function() {

	},



	onLoad: function(options) {

		this.getData(0, 1);
	},

	onShow: function() {
		this.dialog = this.selectComponent("#dialog");

		var userInfo = wx.getStorageSync('userInfo');

		if (userInfo == null || userInfo == "") {

			this.showDialog();
			this.setData({
				isLogin: false
			})
		} else {
			if (this.data.status == 4) {
				wx.startPullDownRefresh();
				this.setData({
					isLogin: true,
					status: 0
				})
			}
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

})
