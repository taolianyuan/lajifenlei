const Puzzle = require("../IndiaActivity/h5puzzle.js");

import {
	recordGame,
	getChances
} from '../../../../api/api.js';

Page({
	data: {
		imgPoints: [],
		WIDTH: 0,
		HEIGHT: 0,
		width: 0,
		height: 0,
		status: false,
		trans: 0,
		currentX: 0,
		currentY: 0,
		currentPX: 0,
		currentPY: 0,
		m: '00',
		s: '00',
		level: 0,
		photoUrl: '',
		currentTime: '',
		chance: -2,
		show: false,
		pixelRatio: 1,
		type: '',
		time: '',
	},

	onLoad(options) {
		
		var level = Number(options.level);
		var photoUrl = options.photoUrl;
		var chance = Number(options.chance);
		var type = options.type;

		
		this.setInterval();
		
		this.setData({
			level,
			photoUrl,
			type
		})
	},

	onReady() {

		let _this = this;

		new Puzzle(this, {
			type: _this.data.level,
			chance: _this.data.chance
		});
	},


	onShow() {
		
		if (this.data.type == 'challenge') {
			this.getChances()
		}
		
	},

	onUnload() {
		this.clearTimer()
	},
	

	//结束计时
	clearTimer: function() {
		console.log(' 结束计时')
		clearInterval(this.timer);
	},

	setInterval: function() {
		
		this.data.currentTime = this.currentTime();
		
		const that = this
		// 		var ms = that.data.ms
		// 	    var s = that.data.s
		// 	    var m = that.data.m  
		var ms = 0
		var s = 0
		var m = 0

		that.timer = setInterval(function() { // 设置定时器

			s++

			if (s < 10) {
				that.setData({
					s: '0' + s
				})
			} else {
				that.setData({
					s
				})
			}

			if (s > 60) {
				m++;
				s = 0;
			}
			if (m < 10) {
				that.setData({
					m: '0' + m
				})
			} else {
				that.setData({
					m
				})
			}
		}, 1000)
	},

	returnPage: function() {

	},

	goOn: function() {

		if (this.data.type == 'practice') {
			return;
		}

		if (this.data.chance > 0) {
			this.puzzle = new Puzzle(this, {
				type: 4,
				chance: this.data.chance
			})

			this.setInterval();
			this.setData({
				show: false
			})
		}

	},

	invitation: function() {

		wx.navigateTo({
			url: `../IndiaShare/IndiaShare?photoUrl=${this.data.photoUrl}`
		})

		console.log('invitation in india activity')
		// 		this.setData({
		// 			show: false
		// 		})
	},

	goComment: function() {

		var objectId = wx.getStorageSync('indiaDishId');

		wx.navigateTo({
			url: '../../../Piazza/DynamicDetail/DynamicDetail?objectId=' + objectId + '&objectType=dish&actName=india&isFrom=normal'
		})
	},

	currentTime: function() {

		var date = new Date();
		var time = date.getTime()
		
		// 		var Y = date.getFullYear();
		// 		var M = date.getMonth();
		// 		var D = date.getDay();
		// 		var h = date.getHours();
		// 		var m = date.getMinutes(); 
		// 		var s = date.getSeconds();
		// 		var ms =  date.getMilliseconds(); 
		// 		
		// 		var dateFormatt = `${Y}-${M}-${D} ${h}:${m}:${s}:${ms}`;

		return `${time}`
	},

	goChallenge: function() {

		if (this.data.chance > 0) {
			this.setData({
				show: false,
				type: 'challenge'
			})
			this.data.level = 4;
			this.setInterval();
			
		}
	},

	nextChallenge: function() {
		if (this.data.type == 'challenge') {
			this.setData({
				show: true,
				level: 4
			})
		} else {

		}
	},

	recordGame: function() {

		this.clearTimer();
		var updateAt = this.currentTime();
		
		var cost = Math.abs(Number(updateAt) - Number(this.data.currentTime));
		var that = this;

		recordGame({
			data: {
				createAt: that.data.currentTime,
				updateAt: updateAt,
				puzzleStatus: 1,
				puzzleTimeconsuming: `${cost}`,
				puzzleComplexity: that.data.level - 3,
			},
			success: function(res) {

				if (res.data.code == 1) {
					if (that.data.type == 'practice') {
						that.setData({
							chance: res.data.data.chance,
							time: '',
						})
					} else if (that.data.type == 'challenge') {
						var time = res.data.data.time == null ? '' : res.data.data.time;
						that.setData({
							chance: res.data.data.chance,
							time,
							show: true
						})
					}
					
					

				} else {

				}
			}
		})
	},


	getChances() {
		var that = this;
		getChances({
			success: function(res) {
				console.log(res)
				if (res.data.code == 1) {
					that.setData({
						chance: res.data.data.chance,
						time: res.data.data.time
					})

					if (res.data.data.chance > 0) {
						that.puzzle = new Puzzle(that, {
							type: that.data.level,
							chance: res.data.data.chance
						})
					} else if (res.data.data.chance == 0) {
						that.setData({
							show: true
						})
					}
				} else {
					wx.showToast({
						title: ' 网络繁忙,请稍后再试~',
						icon: 'none',
						duration: 2000
					})
				}
			}
		})
	}




})
