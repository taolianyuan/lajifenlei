// pages/Home/voteActivity/voteActivity.js
import {
	getSingleActivity,
	queryjudge,
	insertRecord,
	queryNumber
} from '../../../api/api.js'

var app = getApp();
var WxParse = require('../../../wxParse/wxParse.js');
var wxCharts = require('../../../utils/wxcharts-min.js');
var audio = wx.createInnerAudioContext();

var columnChart = null;
var pieChart = null;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imgDomain: 'https://img.jishantech.com',
		actId: '',
		dishIds: null,
		currentId: -1,
		checkedId: -1,
		showMask: false,
		
		number: '',
		status: 0,
		isLogin: false,
		topTitle: '',
		bottomTitle: '',
		scrollTop: '',
		buttonTitle: '',
		pageShowStatus: 0,
		isOver: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		console.log(options, '----------')

		// console.log(Number(picName),'picName')

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
		if (options.scene != null) {
			var scene = decodeURIComponent(options.scene);

			console.log(scene, '--------------------------');
			console.log(scene.indexOf('userId') != -1)

			if (scene.indexOf('userId') != -1) {
				var str = scene.split('&');
				var actId = str[0].split('=')[1]
				var inviteId = str[1].split('=')[1]
				app.globalData.inviteId = inviteId;
				console.log(actId, inviteId, '------')
			} else {
				var actId = scene.split('=')
				actId = actId[1]
				console.log(actId, '拆分后的actId')
			}

		} else {
			console.log('不是扫码进来的')
			var actId = options.actId
		}

		this.setData({
			actId
		})
		// this.queryjudge();
		this.getSingleActivity();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},
	//查询单个活动列表
	getSingleActivity: function() {
		var that = this;
		console.log(that.data.actId)
		console.log(Number(that.data.actId))
		getSingleActivity({
			data: {
				actId: that.data.actId
			},
			success: function(res) {
				if (res.data.code == 1) {
					var dishIds = res.data.data.dishIds;
					var jsonStr = dishIds
					var obj = JSON.parse(jsonStr);
					if (obj.userList.length !== 0) {
						that.setData({
							pageShowStatus: 1
						})
						that.queryNumber([1, 2, 3, 4])
					}

					WxParse.wxParse('content', 'html', obj.content_html, that, 0);

					that.setData({
						dishIds: obj,
						status: 1
					})
				} else {
					that.setData({
						status: 3
					})
				}
			},
			fail: function() {
				that.setData({
					status: 3
				})
			},
			complete: function() {
				wx.hideNavigationBarLoading({
					success: function() {
						wx.hideLoading();
					}
				}) //完成停止加载
				wx.stopPullDownRefresh() //停止下拉刷新
			}
		})
	},

	formatTime: function(date) {
		var year = date.getFullYear()
		var month = date.getMonth() + 1
		var day = date.getDate()

		console.log(day, 'day---day')

		if (day < 10) {
			day = '0' + day
		}

		var picName = `${month}${day}`;

		return picName;
	},

	//是否已经投过票
	queryjudge: function() {
		var that = this;
		queryjudge({
			success: function(res) {
				console.log(res, 'queryjudge')
				if (res.data.code == 1) {
					var data = res.data.data;
					that.setData({
						number: res.data.data,
						checkedId: data - 1
					})
					if (that.data.number !== 0) { //说明已经投过票
						//再次判断是否是最高票
						var number = that.data.number;
						// var voteInfo = that.data.dishIds.voteInfo;
						that.queryNumber([1, 2, 3, 4], number - 1)
					}
				}
			}
		})
	},
	//确定投票
	confirmPick: function() {

		var userInfo = wx.getStorageSync('userInfo');
		var that = this;

		if (userInfo == null || userInfo == "") {
			this.showDialog();
			this.setData({
				isLogin: false
			})
		} else {

			//第一次投票
			if (this.data.number == 0) {
				if (this.data.checkedId == -1) {
					wx.showToast({
						title: '选择你喜欢的一款声音吧',
						icon: 'none'
					})
				} else {
					var voteInfo = this.data.dishIds.voteInfo;
					var recordcontentId = voteInfo[this.data.checkedId].vote_id;
					insertRecord({
						data: {
							activityId: this.data.actId,
							recordcontentId
						},
						success: function(res) {
							console.log(res)
							if (res.data.code == 1) {
								that.setData({
									number: -1,
								})
								that.queryNumber([voteInfo[0].vote_id, voteInfo[1].vote_id, voteInfo[2].vote_id, voteInfo[3].vote_id],
									that.data.checkedId)
							} else {
								wx.showToast({
									title: '网络错误',
									icon: 'none'
								})
							}
						}
					})
				}
				console.log('第一次投票')
			} else {
				console.log('已经投过票了')
				//已经投过票了
				var number = this.data.number;
				var voteInfo = this.data.dishIds.voteInfo;
				that.queryNumber([voteInfo[0].vote_id, voteInfo[1].vote_id, voteInfo[2].vote_id, voteInfo[3].vote_id], number -
					1)
			}

			this.setData({
				isLogin: true
			})
		}

	},

	//查询总票数

	queryNumber: function(arr, id) {
		var that = this;
		queryNumber({
			data: {
				integers: arr
			},
			success: function(res) {
				console.log(res, '---codecode-')


				var picName = Number(that.formatTime(new Date()));
				console.log(picName, 'picName')

				if (res.data.code == 1) {
					var data = res.data.data;
					var arr = [data['1'], data['2'], data['3'], data['4']];
					var num = id;
					console.log(arr, num, 'arr,num')
					var max = 0;
					for (let i = 1; i < arr.length; i++) {
						if (arr[i] > arr[max]) {
							max = i;
						}
					}
					console.log(max, '-----max-----')
// 
// 					if (picName == 420 || picName == 421) {
// 						that.setData({
// 							isOver: true,
// 							showMask: true,
// 							topTitle: '投票已结束',
// 							bottomTitle: '获奖名单将于4月22日 在吃库料理小程序中公示',
// 							buttonTitle: '我知道了'
// 						})
// 						return;
// 					}

					if (that.data.pageShowStatus == 1) {
						that.setData({
							pageShowStatus: 1
						})

						columnChart = new wxCharts({
							canvasId: 'columnCanvas',
							type: 'column',
							animation: false,
							categories: ['网红妹妹', '学神姐姐', '游戏主播', '霸道总裁'],
							series: [{
								name: '人数',
								data: arr,
								format: function(val, name) {
									return val;
								},

							}],
							yAxis: {
								format: function(val) {
									return val;
								},
								// title: 'hello',
								min: 0,
								disabled: true
							},
							xAxis: {
								disableGrid: true,
								type: 'calibration',
							},
							extra: {
								column: {
									width: 50
								}
							},
							width: 290,
							height: 200,
						});

						//饼状图
						pieChart = new wxCharts({
							animation: false,
							canvasId: 'pieCanvas',
							type: 'pie',
							series: [{
								name: '男',
								data: data.man
							}, {
								name: '女',
								data: data.woman
							}, {
								name: '未知',
								data: data.unknown
							}],
							width: 300,
							height: 250,
							dataLabel: true,
						});
						return;
					}



					if (arr[num] == arr[max]) {
						that.setData({
							showMask: true,
							topTitle: '你的做饭团伙',
							bottomTitle: '凭借微弱优势，暂时领先',
							buttonTitle: '让你的好友支持你的选择'
						})
						console.log('投票数最多显示的')
						return;
					}

					if (max == num) {
						that.setData({
							showMask: true,
							topTitle: '你的做饭团伙',
							bottomTitle: '凭借微弱优势，暂时领先',
							buttonTitle: '让你的好友支持你的选择'
						})
						console.log('投票数最多显示的')
					} else {
						that.setData({
							showMask: true,
							topTitle: '你最爱的音色',
							bottomTitle: '离第一还差一点哦!',
							buttonTitle: '找更多好友支持你的选择'
						})
						console.log('投票数少的显示的')
					}
				}
			}
		})
	},

	skipToPages: function() {
		wx.switchTab({
			url: '../index/index'
		})
	},




	//音频的处理
	handleAudio: function(e) {
		var that = this;
		var audioText = this.data.imgDomain + this.data.dishIds.voteInfo[e.currentTarget.dataset.index].content_url
		if (this.data.currentId == e.currentTarget.dataset.index) {
			audio.pause();
			this.setData({
				currentId: -1
			})
		} else {
			audio.src = audioText;
			audio.play()
			this.setData({
				currentId: e.currentTarget.dataset.index
			})
			audio.onEnded(() => {
				console.log(111111)
				that.setData({
					currentId: -1
				})
			})
		}
	},

	radioChange(e) {
		// console.log('radio发生change事件', e)
		var currentId = Number(e.detail.value)

		this.setData({
			checkedId: currentId
		})
	},

	//分享按钮
	shareFriends: function() {

		if (this.data.isOver) {
			wx.switchTab({
				url: '../index/index'
			})
		} else {
			wx.navigateTo({
				url: `../../sharePage/sharePage?isfrom=vote&actId=${this.data.actId}`
			})
		}


	},
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		this.queryjudge();
		this.setData({
			showMask: false
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
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {
		audio.stop();
		console.log('监听结束')
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {
		wx.showLoading({
			title: '加载中...',
			mask: true
		})
		wx.showNavigationBarLoading();
		this.queryjudge();
		this.getSingleActivity();
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
