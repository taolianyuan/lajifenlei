const Puzzle = require("./h5puzzle.js");

import {
	recordGame,
	getChances
} from '../../../../api/api.js';


Page({
	data: {
		m: '00',
		s: '00',

		imgPoints: [],
		WIDTH: 0,
		HEIGHT: 0,
		width: 0,
		height: 0,
		status: false,
		currentX: 0,
		currentY: 0,
		currentPX: 0,
		currentPY: 0,
		minutes: 0,
		seconds: 0,
		level: 0,
		photoUrl: '',
		currentTime: '',
		chance: 0,
		show: false,
	},

	onLoad: function (options) {
		
		var level = Number(options.level);
		var photoUrl = options.photoUrl;
		var chance = Number(options.chance);
		
		console.log(level)
		
		this.setData({
			level,
			photoUrl
		})
		
		this.setInterval();
	    this.data.currentTime =	this.currentTime();
		
		let that = this;
		setTimeout(() => {
			that.puzzle = new Puzzle(that, {
				type: level,
				chance: chance
			},1000)
		})
	},
	
	
	onReady() {
		let _this = this;
		new Puzzle(this);
	},
	
	onShow() {
		
		if (this.data.level == 3) {
			return;
		}
		var that = this;
		getChances({
			success: function (res) {
				console.log(res)
				if (res.data.code == 1) {
					that.setData({
						chance: res.data.data.chance,
					})
					
					if (res.data.data.chance == 0) {
						that.setData({
							show: false
						})
					}
				} else{
					wx.showToast({
						title: ' 网络繁忙,请稍后再试~',
						icon: 'none',
						duration: 2000
					})
				}
			}
		})
	},
	
	onUnload() {
		this.clearTimer()
	},

	//结束计时
	clearTimer: function() {
		console.log(' 结束计时')
		clearInterval(this.timer);
	},

	setInterval: function () {
	    const that = this
// 		var ms = that.data.ms
// 	    var s = that.data.s
// 	    var m = that.data.m  
		var ms = 0
		var s = 0
		var m = 0  
	
		that.timer = setInterval(function () {  // 设置定时器
	
// 			ms ++
// 			ms = Math.floor(ms % 100);
// 			
// 			if (ms < 10) {
// 				that.setData({
// 					ms: '0'+ ms
// 				})
// 			} else{
// 				that.setData({
// 					ms
// 				})
// 			}

			s ++
			
			if (s < 10) {
				that.setData({
					s: '0'+ s
				})
			} else{
				that.setData({
					s
				})
			}
			
			if (s > 60) {
				m ++;
				s = 0;
			} 
			if (m < 10) {
				that.setData({
					m: '0'+ m
				})
			} else{
				that.setData({
					m
				})
			}
		}, 1000)
	},

	returnPage: function() {
	
	},

	goOn: function() {
		
		if (this.data.channce == 0) {
			return;
		}
		
		this.puzzle.init();
		this.setInterval();
		this.setData({
			show: false
		})
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
	
	goComment: function () {
		
		var objectId = wx.getStorageSync('indiaDishId');
		wx.navigateTo({
			url: `../../../Piazza/DynamicDetail/DynamicDetail?objectId=${objectId}&objectType=dish?isFrom=india`
		})
	},
	
	currentTime: function () {
		
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
	
	goChallenge: function () {
		this.setData({
			show: false
		})
		this.data.level = 4;
	},
	
	recordGame: function () {
		
		var updateAt = this.currentTime();
		var cost = Math.abs(Number(updateAt) - Number(this.data.currentTime));
		var that = this;
		
		recordGame({
			data : {
				createAt: that.data.currentTime,
				updateAt: updateAt,
				puzzleStatus: 1,
				puzzleTimeconsuming: `${cost}`,
				puzzleComplexity: that.data.level - 3,
			},
			success : function (res) {
				
				if (res.data.code == 1) {
					if (that.data.level == 3) {
						return;
					}
					that.setData({
						chance: res.data.data.chance,
						show: true
					})
				} else{
					
				}
			}
		})
	}
	
	
})
