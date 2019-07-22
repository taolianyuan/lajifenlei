import {
	getPostInfo,
	getComment,
	insertComment,
	addCommentReply,
	getCommentReply,
	CheckContent
} from '../../../api/api.js'

const app = getApp();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		postId: 0,
		isComment: false,
		postDetail: {},
		commentList: [],
		photoList: [],
		imgDomain: app.globalData.imgDomain,
		postText: '',
		contentText: '',
		status: 0,
		isReply: false,
		noMoreData: false,
		showLoading: false,
		currentPage: 1,
		pageSize: 10,
		totalPage: 0,
		ruserId: '',
		cid: '',
		placeholder: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

		var postId;


		if (options.scene != null) {
			var scene = decodeURIComponent(options.scene);

			postId = scene.split('=')[1]

		} else {
			postId = options.objectId;
		}

		this.setData({
			postId: Number(postId)
		})

		this.getPostInfo(postId);
		// this.getComment(1);
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	},

	comment: function() {
		this.setData({
			isComment: true,
			contentText: '',
			isReply: false,
			placeholder: '说点什么吧...'
		})
	},

	cancelComment: function(e) {
		var that = this;
		var text = e.detail.value;

		this.setData({
			// isComment: false,
			contentText: text,
			placeholder: ''
		})

		setTimeout(() => {
			that.setData({
				isComment: false
			})
		}, 500)

	},

	shareFriends: function() {
		wx.navigateTo({
			url: '../../sharePage/sharePage?isfrom=post&objectId=' + this.data.postDetail.post.postId,
		})
	},

	getPostInfo: function(postId) {
		var that = this;
		getPostInfo({
			data: {
				postId: postId
			},
			success: function(res) {
				if (res.data.code == 1) {
					var postDetail = res.data.data

					if (postDetail.nickName.length >= 8) {
						postDetail.nickName = postDetail.nickName.substring(0, 8) + '...'
					}

					var content = JSON.parse(postDetail.post.postContent);
					postDetail.post.postContent = content;

					// var status = postDetail == null ? 2 : 1;



					that.setData({
						status: 1,
						postDetail: postDetail,
						photoList: postDetail.post.postContent.photoList,
						postText: postDetail.post.postContent.postText,
						commentList: postDetail.commentList
					})
				}
			},
			fail: function(res) {
				that.setData({
					status: 3
				})
			}
		})
	},

	//回复评论
	addCommentReply: function(e) {

		var index = e.currentTarget.dataset.index;
		var commentList = this.data.commentList[index];
		var placeholder = `回复 ${commentList.nickname}`

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
				placeholder
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
											"objectId": that.data.postId,
											"objectType": 'post',
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
												isReply: false
											})
											wx.showToast({
												title: '回复成功',
												icon: 'none'
											})
											// }
											console.log(res, '---点击回复的res---')
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
											"content": text,
											"objectId": that.data.postId,
											"objectType": 'post',
											"cid": 0
										}
									},
									success: function(res) {
										if (res.data.code == 1) {
											console.log(res, '---普通回复的res---')
											var comment = res.data.data;
											var list = that.data.commentList;

											list.unshift(comment);
											that.setData({
												commentList: list,
												isComment: false,
												contentText: '',
											})
											wx.showToast({
												title: '评论成功',
												icon: 'none'
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

	goPreview: function(e) {

		var list = this.data.photoList;
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


	goOthersCenter: function(e) {
		var index = e.currentTarget.dataset.index;
		var userId = this.data.postDetail.userIdstr;
		console.log(userId);
		wx.navigateTo({
			url: '../../Piazza/OthersUserCenter/OthersUserCenter?userId=' + userId
		})
	},


	goCommentList: function() {

		wx.navigateTo({
			url: '../CommentList/CommentList?objectType=post' + '&objectId=' + this.data.postId
		})
	},













})
