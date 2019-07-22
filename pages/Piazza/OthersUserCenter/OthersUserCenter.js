import {
	getFansInfo,
	follow,
	unFollow,
	getFriendPost,
	getUserDish,
	getUserSauce
} from '../../../api/api.js'

var globalData = getApp().globalData;

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imgDomain: globalData.imgDomain,
		menuList: [{
				title: 'TA 的菜谱',
				badge: 0,
				isChecked: true,
			},
			{
				title: 'TA 的动态',
				badge: 0,
				isChecked: false,
			},
			{
				title: 'TA 的酱汁',
				badge: 0,
				isChecked: false,
			}
		],
		follow: true,

		isLogin: false,

		userInfo: {},
		dynamicList: [],
		dishList: [],
		sauceList: [],

		userId: '',
		currentPage: 0,
		pageSize: 10,

		cutrrent_post: 0,
		cutrrent_dish: 0,
		cutrrent_sauce: 0,

		noMore_post: 0,
		noMore_dish: 0,
		noMore_sauce: 0,
		loading_post: 0,
		loading_dish: 0,
		loading_sauce: 0,

		total_post: 0,
		total_dish: 0,
		total_sauce: 0,

		status_post: 0,
		status_dish: 0,
		status_sauce: 0,
		status_all: 0,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

		this.dialog = this.selectComponent("#dialog");

		var userId = '';

		if (options.scene != null) {
			var scene = decodeURIComponent(options.scene);
			var optuserId = scene.split('=')[1];
			userId = optuserId;
		} else {
			userId = options.userId.replace(/\s+/g, '');
		}

		this.data.userId = userId;

		if (this.data.userId != '' && this.data.userId != null) {
			this.getFansInfo();
		}

	},
	onShow: function() {
		this.dialog = this.selectComponent("#dialog");
		// this.scroll = this.selectComponent("#scroll");

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

	//跳转分享界面
	shareFriends: function() {
		var that = this;
		if (this.data.userInfo.userLevel.levelId == 999) {
			//KOL达人分享
			wx.navigateTo({
				url: `../../sharePage/sharePage?isfrom=KOL&userId=${that.data.userInfo.userId}`,
			})
		} else {
			//普通用户分享
			wx.navigateTo({
				url: `../../sharePage/sharePage?isfrom=normal&userId=${that.data.userInfo.userId}`,
			})

		}
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

	},


	clickMenu: function(e) {
		var index = e.currentTarget.dataset.index;
		var menuList = this.data.menuList;

		menuList[index].isChecked = true;

		for (var i = 0; i < menuList.length; i++) {
			if (i != index) {
				menuList[i].isChecked = false;
			}
		}

		this.setData({
			currentPage: index,
			menuList: menuList
		})
	},

	bindchange: function(e) {

		if (e.detail.source == 'touch') {
			var index = e.detail.current;
			var menuList = this.data.menuList;

			menuList[index].isChecked = true;

			for (var i = 0; i < menuList.length; i++) {
				if (i != index) {
					menuList[i].isChecked = false;
				}
			}

			this.setData({
				currentPage: index,
				menuList: menuList
			})
		}
	},

	EmptyconfirmEvent: function() {
		var userInfo = wx.getStorageSync('userInfo');
		if (this.data.status == 4 && !userInfo) {
			this.showDialog();
		} else {
			wx.startPullDownRefresh();
		}
	},


	// 个人信息
	getFansInfo: function() {

		var userInfo = wx.getStorageSync('userInfo');

		var that = this;

		if (userInfo == '' || userInfo == null) {
			this.setData({
				status: 4
			})
		} else {
			getFansInfo({
				data: {
					userId: that.data.userId
				},
				success: function(res) {

					if (res.data.code == 1) {

						that.getUserDish(1);
						that.getFriendPost(1);
						that.getUserSauce(1)

						var list = that.data.menuList;
						list[0].badge = res.data.data.dishCount;
						list[1].badge = res.data.data.postCount;
						list[2].badge = res.data.data.sauceCount;

						if (res.data.data.status == 1) {
							that.setData({
								follow: false
							})
						} else {
							that.setData({
								follow: true
							})
						}

						var status_all = res.data.data == null ? 2 : 1;
						that.setData({
							status_all: status_all,
							userInfo: res.data.data,
							menuList: list
						})

						console.log('follow = ' + that.data.follow)
					} else {
						wx.showToast({
							title: '网络繁忙,稍后再试~',
							icon: 'none',
							duration: 2000
						})
						that.setData({
							status_all: 2
						})
					}
				},
				fail: function(res) {
					that.setData({
						status_all: 3
					})
				}
			})
		}

	},


	// 好友的动态
	getFriendPost: function(page) {

		var that = this;
		getFriendPost({
			data: {
				currentPage: page,
				size: that.data.pageSize,
				userId: that.data.userId
			},
			success: function(res) {

				// var newList = [];


				if (res.data.code == 1) {

					var status_post = res.data.data.total == 0 ? 2 : 1;
					that.data.total_post = res.data.data.pages;
					that.data.cutrrent_post = page;

					that.setData({
						status_post: status_post,
					})

					if (res.data.data.total > 0) {

						var list = that.data.dynamicList;
						// var data = res.data.data.data[0];
						// console.log(newList,'--newListnewListnewList--')

						if (page == 1) {
							list = res.data.data.data;
						} else {
							var arr = res.data.data.data;
							var index = list.length - 1;

							if (arr.length == 1) {
								if (arr[0].year == list[index].year) {
									list[index].info = list[index].info.concat(arr[0].info);
								} else {
									list = list.concat(arr);
								}
							} else {
								if (arr[0].year == list[index].year) {
									list[index].info = list[index].info.concat(arr[0].info);
								} else {
									list = list.concat(arr);
								}
							}
						}

						if (res.data.data.pages == page) {
							that.setData({
								loading_post: false,
								noMore_post: true
							})
						} else {

							that.setData({
								loading_post: false,
								noMore_post: false
							})
						}


						for (var z = 0; z <= list.length; z++) {
							var List = list[z]
							if (List) {
								for (var i = 0; i <= List.info.length; i++) {
									var post = List.info[i];
									if (post) {
										for (var j = 0; j <= post.info.length; j++) {
											var item = post.info[j];
											if (item) {
												var postContent = JSON.parse(item.post.postContent);
												var photoList = postContent.photoList;
												var showPic = [];

												if (photoList.length > 4) {
													showPic = photoList.slice(0, 4);
												} else if (photoList.length == 3) {
													showPic = photoList.slice(0, 2);
												} else {
													showPic = photoList;
												}
												postContent.photoList = showPic;
												item.postContent = postContent;
											}
										}
									}
								}
							}

						}
						that.setData({
							dynamicList: list
						})
					}

					wx.hideLoading();

				} else {
					wx.showToast({
						title: '网络繁忙,稍后再试~',
						icon: 'none',
						duration: 2000
					})
					that.setData({
						status_post: 3
					})
				}
			},
			fail: function(res) {
				that.setData({
					status_post: 3
				})
				wx.showToast({
					title: '网络繁忙,稍后再试~',
					icon: 'none',
					duration: 2000
				})

			}
		})
	},


	//获取用户的菜谱
	getUserDish: function(page) {

		var that = this;

		getUserDish({
			data: {
				currentPage: page,
				size: that.data.pageSize,
				userId: that.data.userId
			},
			success: function(res) {

				if (res.data.code == 1) {

					var status_dish = res.data.data.total == 0 ? 2 : 1;
					that.data.total_dish = res.data.data.pages;
					that.data.cutrrent_dish = page;

					that.setData({
						status_dish: status_dish,
					})

					if (res.data.data.total > 0) {

						var list = that.data.dishList;

						if (page == 1) {
							list = res.data.data.data;
						} else {
							var arr = res.data.data.data;
							var index = list.length - 1;

							if (arr.length == 1) {
								if (arr[0].year == list[index].year) {
									list[index].info = list[index].info.concat(arr[0].info);
								} else {
									list = list.concat(arr);
								}
							} else {
								if (arr[0].year == list[index].year) {
									list[index].info = list[index].info.concat(arr[0].info);
								} else {
									list = list.concat(arr);
								}
							}
						}

						if (res.data.data.pages == page) {
							that.setData({
								loading_dish: false,
								noMore_dish: true
							})
						} else {

							that.setData({
								loading_dish: false,
								noMore_dish: false
							})
						}

						that.setData({
							dishList: list
						})
					}

					wx.hideLoading();

				} else {
					wx.showToast({
						title: '网络繁忙,稍后再试~',
						icon: 'none',
						duration: 2000
					})

					that.setData({
						status_dish: 3
					})
				}
			},
			fail: function(res) {
				that.setData({
					status_dish: 3
				})
				wx.showToast({
					title: '网络繁忙,稍后再试~',
					icon: 'none',
					duration: 2000
				})
			}
		})
	},

	//获取用户的酱汁
	getUserSauce: function(page) {
		var that = this;
		getUserSauce({
			data: {
				currentPage: page,
				size: that.data.pageSize,
				userId: that.data.userId
			},
			success: function(res) {

				if (res.data.code == 1) {

					var status_sauce = res.data.data.total == 0 ? 2 : 1;
					that.data.total_sauce = res.data.data.pages;
					that.data.cutrrent_sauce = page;

					that.setData({
						status_sauce: status_sauce,
					})

					if (res.data.data.total > 0) {
						var list = that.data.sauceList;

						if (page == 1) {
							list = res.data.data.data;
						} else {
							var arr = res.data.data.data;

							var index = list.length - 1;

							if (arr.length == 1) {
								if (arr[0].year == list[index].year) {
									if (arr[0].info[0].date == list[index].info[0].date) {
										list[index].info[0].info = list[index].info[0].info.concat(arr[0].info[0].info);
									} else {
										list[index].info = list[index].info.concat(arr[0].info);
									}
								} else {
									list = list.concat(arr);
								}
							} else {
								if (arr[0].year == list[index].year) {
									list[index].info = list[index].info.concat(arr[0].info);
								} else {
									list = list.concat(arr);
								}
							}
						}

						if (res.data.data.pages == page) {
							that.setData({
								loading_sauce: false,
								noMore_sauce: true
							})
						} else {

							that.setData({
								loading_sauce: false,
								noMore_sauce: false
							})
						}

						that.setData({
							sauceList: list
						})
					}
					wx.hideLoading();
				} else {
					wx.showToast({
						title: '网络繁忙,稍后再试~',
						icon: 'none',
						duration: 2000
					})

					that.setData({
						status_sauce: 3
					})
				}
			},
			fail: function(res) {
				that.setData({
					status_dish: 3
				})
				wx.showToast({
					title: '网络繁忙,稍后再试~',
					icon: 'none',
					duration: 2000
				})
			}
		})
	},

	//点击动态跳转动态详情
	skipDynamicDetail: function(e) {
		var id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: '../../Piazza/PostDetail/PostDetail?objectId=' + id
		})
	},


	// 取消关注及关注

	changeStatus: function() {

		var that = this;
		var data = {
			followedUser: that.data.userId
		};
		var userInfo = that.data.userInfo;
		var UserInfo = wx.getStorageSync('userInfo');


		if (UserInfo == '' || UserInfo == null) {
			this.showDialog();
			this.setData({
				isLogin: false
			})
		} else {
			wx.showLoading({
				title: '操作中...',
				icon: 'none',
				mask: 'true'
			})
			if (that.data.follow) {

				unFollow({
					data: data,
					success: function(res) {
						console.log('unFollow')
						// console.log(res)
						if (res.data.code == 1) {

							userInfo.fansCount--;
							that.setData({
								follow: false,
								userInfo
							})

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

			} else {

				follow({
					data: data,
					success: function(res) {
						console.log('follow')
						// console.log(res)
						if (res.data.code == 1) {
							userInfo.fansCount++
							that.setData({
								follow: true,
								userInfo
							})

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
			}

			this.setData({
				isLogin: true
			})

		}





	},


	goMyAttention: function() {

		var userInfo = wx.getStorageSync('userInfo');
		if (userInfo == '' || userInfo == null) {
			this.showDialog();
			this.setData({
				isLogin: false
			})
		} else {
			wx.navigateTo({
				url: '../../UserCenter/MyAttention/MyAttention?isFrom=others&userId=' + this.data.userId
			});
			this.setData({
				isLogin: true
			})
		}

	},

	goMyFans: function() {
		var userInfo = wx.getStorageSync('userInfo');
		if (userInfo == '' || userInfo == null) {
			this.showDialog();
			this.setData({
				isLogin: false
			})
		} else {
			wx.navigateTo({
				url: '../../UserCenter/MyFans/MyFans?isFrom=others&userId=' + this.data.userId
			});
			this.setData({
				isLogin: true
			})
		}

	},

	refreshAll: function() {
		this.getFansInfo();
	},


	refreshPost: function() {
		this.getFriendPost();
	},


	refreshDish: function() {
		this.getUserDish();
	},




	loadMoreDish: function() {

		var that = this;
		console.log('菜谱')

		if (this.data.total_dish == this.data.cutrrent_dish) {

			console.log(this.data.total_dish, 'total_dish');
			this.setData({
				noMore_dish: true
			});

			setTimeout(function() {
				that.setData({
					noMore_dish: false
				});
			}, 1500);
			return;
		}

		wx.showLoading({
			title: '加载中...',
			mask: true
		})
		this.setData({
			loading_dish: true,
			noMore_dish: false
		})

		// let that = this;
		if (!that.data.noMore_dish && that.data.loading_dish) {
			var page = that.data.cutrrent_dish + 1;
			that.getUserDish(page);
		}
	},


	loadMorePost: function() {
		console.log('动态')
		var that = this;

		if (this.data.total_post == this.data.cutrrent_post) {
			this.setData({
				noMore_post: true
			});

			setTimeout(function() {
				that.setData({
					noMore_post: false
				});
			}, 1500);
			return;
		}
		wx.showLoading({
			title: '加载中...',
			mask: true
		})

		this.setData({
			loading_post: true,
			noMore_post: false
		})

		// let that = this;
		if (!that.data.noMore_post && that.data.loading_post) {
			var page = that.data.cutrrent_post + 1;
			that.getFriendPost(page);
		}
	},


	loadMoreSauce: function() {
		console.log('酱汁')

		if (this.data.total_sauce == this.data.cutrrent_sauce) {
			this.setData({
				noMore_sauce: true
			});

			setTimeout(function() {
				this.setData({
					noMore_sauce: false
				});
			}, 1500);
			return;
		}

		wx.showLoading({
			title: '加载中...',
			mask: true
		})

		this.setData({
			loading_sauce: true,
			noMore_sauce: false
		})

		let that = this;
		if (!that.data.noMore_sauce && that.data.loading_sauce) {
			var page = that.data.cutrrent_sauce + 1;
			that.getUserSauce(page);
		}
	},


	//跳转到菜谱详情
	goDishDetail: function(e) {
		console.log(e);
		var id = e.currentTarget.dataset.index;
		var userInfo = wx.getStorageSync('userInfo');
		if (userInfo == '' || userInfo == null) {
			this.showDialog();
			this.setData({
				isLogin: false
			})
		} else {
			wx.navigateTo({
				url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + id + '&objectType=dish' + '&isFrom=normal'
			})
			this.setData({
				isLogin: true
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


	goSauceDetail: function(e) {
		console.log(e);
		var id = e.currentTarget.dataset.index;
		var userInfo = wx.getStorageSync('userInfo');

		if (userInfo == '' || userInfo == null) {
			this.showDialog();
			this.setData({
				isLogin: false
			})
		} else {
			wx.navigateTo({
				url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + id + '&objectType=sauce' + '&isFrom=normal'
			})
			this.setData({
				isLogin: true
			})

		}

	}







})
