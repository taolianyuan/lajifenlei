import {
	getRice,
	getRiceTotalVotes,
	insertRiceVotes,
	ifRecordRiceVotes,
} from '../../../api/api.js';

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
	imgDomain: app.globalData.imgDomain,
	currentSection: {},
	dataSource: [],
	historyArr: [],
	unVoteArr: [],
	actId: 14,
	number: 0,
	numberRight: 0,
	percent: 0,
	isLogin: false,
	riceCover: "https://7465-test-9cd88e-1258312722.tcb.qcloud.la/rice/rice_battle.png?sign=5e22804416c9ef9bf72e007e9422b917&t=1556529175",
	riceVS: "https://7465-test-9cd88e-1258312722.tcb.qcloud.la/rice/rice_vs.png?sign=3a2718eb50fb861a098fdc31e5799f4e&t=1556178755",
	riceVictory: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/rice/rice_winner.png?sign=ffa6a080066d14a59cb028fca9a23fd0&t=1556443462',
	checkB: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/rice/rice_check_blue.png?sign=9393b6ff2bade70c30675870caa61778&t=1556530684',
	checkR: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/rice/rice_check_red.png?sign=b82bc4f51895197d4786e56aae0b3f04&t=1556530731',
	voteR: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/rice/rice_vote_red.png?sign=7fce5328a35c966f08fa54da3889e2fe&t=1556530758',
	voteB: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/rice/rice_vote_blue.png?sign=f92d0047a4ec37ac0269c6b5208018f7&t=1556530774',
	riceVss: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/rice/rice_vss.jpeg?sign=7733c31e435c3e9c22613db635c02fae&t=1556533788',
	rounds: [
		"",
		"https://7465-test-9cd88e-1258312722.tcb.qcloud.la/rice/rice_round2.png?sign=ae66e16ec50445966195988d8b7a7c9b&t=1556180592",
		"https://7465-test-9cd88e-1258312722.tcb.qcloud.la/rice/rice_round3.png?sign=be0f6764880c9edaa41ebcbe4622b7ab&t=1556180650",
		"https://7465-test-9cd88e-1258312722.tcb.qcloud.la/rice/rice_round4.png?sign=13ce860e6b07d8a184991ab2de5c9a00&t=1556180666",
		"https://7465-test-9cd88e-1258312722.tcb.qcloud.la/rice/rice_round5.png?sign=1dec9e0c281caaa69210d63d4fff7cc3&t=1556187356",
	],
	historyTitle: "https://7465-test-9cd88e-1258312722.tcb.qcloud.la/rice/rice_history.png?sign=f643b27575188502a7475a9f5bb0ec0b&t=1556187390",
	
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	
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
	
	

// 	if (options.scene != null) {
// 		
// 		var scene = decodeURIComponent(options.scene);
// 	
// 		console.log(scene, '==============================');
// 		console.log(scene.indexOf('userId') != -1)
// 	
// 		if (scene.indexOf('userId') != -1) {
// 			var str = scene.split('&');
// 			var actId = str[0].split('=')[1]
// 			var inviteId = str[1].split('=')[1]
// 			app.globalData.inviteId = inviteId;
// 			console.log(actId, inviteId, '------')
// 		} else {
// 			var actId = scene.split('=')
// 			actId = actId[1]
// 			console.log(actId, '拆分后的actId')
// 		}
// 	
// 	} else {
// 		console.log('不是扫码进来的')
// 		var actId = Number(options.actId);
// 	}
	
// 	this.setData({
// 		actId
// 	})
	
	
	this.getRice();
  },
  
	showDialog: function () {
	  this.dialog.showDialog();
	},
	
	confirmEvent: function() {
		this.dialog.hideDialog();
	},
	
	cancleEvent: function() {
		this.dialog.hideDialog();
	},
  
  getRice: function () {
	  var that = this;
	getRice({
		data:{},
		success: function(res) {
			
			if (res.data.code == 1) {
				
				var dataSource = res.data.data.mifanmap;
				var historyArr = that.data.historyArr;
				var currentSection = that.data.currentSection;
				var unVoteArr = that.data.unVoteArr;
				
				for (var i = 0; i < dataSource.length; i++) {
					
					var section = dataSource[i];
					
					if (section.dishes[0].dishName.length > 5) {
						section.dishes[0].dishName = section.dishes[0].dishName.substring(0, 5) + '...';
					}
					
					if (section.dishes[1].dishName.length > 5) {
						section.dishes[1].dishName = section.dishes[1].dishName.substring(0, 5) + '...';
					}
					
					if (section.aboutInfo.status == 1) {
					
						currentSection = section;
						
					} else if (section.aboutInfo.status == 2) {
						
						historyArr.unshift(section);
						
					} else if (section.aboutInfo.status == 0) {
						unVoteArr.push(section);
					}
				}
				
				
				if (currentSection != null && JSON.stringify(currentSection) != "{}") {
					var arr = [currentSection.dishes[0].dishId,currentSection.dishes[1].dishId];
					that.getRiceTotalVotes(arr);
				}
				
				console.log(currentSection,'currentSection');
				console.log(historyArr,'historyArr');
				console.log(unVoteArr,'unVoteArr');
				console.log(dataSource,'dataSource');
				
				that.setData({
					dataSource,
					historyArr,
					currentSection,
					unVoteArr
				})
			}
		}
	})
  },
  
  //  是否已经投过票
  ifRecordRiceVotes: function (e) {
	  
	  var that = this;
	  var grade = e.currentTarget.dataset.grade;
	  
	  ifRecordRiceVotes({
		  data: {
			activityId : that.data.actId,
			recordcontentId : grade
		  },
		  success: function(res) {
			if (res.data.code == 1) {
				if (res.data.data == 0) {
					var dishId = e.currentTarget.dataset.dish;
					that.insertRiceVotes(dishId, grade);
				} else{
					wx.showModal({
						title: '提示',
						content: '您已经投过票了~',
						showCancel: false,
						confirmColor:'#ff5173'
					})
				}
			} else{
				wx.showToast({
					title: '网络繁忙,稍后再试~',
					icon: 'none',
					duration:2000
				})
			}
		  }
	  })
  },
  
  //
  insertRiceVotes: function (dishId,grade) {
	  
	  var that = this;
	  
	  insertRiceVotes({
		  data: {
			activityId: that.data.actId,
			menuId : dishId,
			recordcontentId: grade
		  },
		  success: function(res) {
			if (res.data.code == 1) {
				
				var currentSection = that.data.currentSection;
				var arr = [currentSection.dishes[0].dishId,currentSection.dishes[1].dishId];
				that.getRiceTotalVotes(arr);
				
				wx.showToast({
					title: '投票成功~',
					icon: 'none',
					duration:2000
				})
				
			} else{
				wx.showToast({
					title: '网络繁忙,稍后再试~',
					icon: 'none',
					duration:2000
				})
			}
		  }
	  })
  },
  
  getRiceTotalVotes: function (arr) {	  
	  
	  var that = this;
	  
	  getRiceTotalVotes({
		  data: {
			integers: arr
		  },
		  success: function(res) {
			 if (res.data.code == 1) {
				 
				var data = res.data.data;
				var percent = data[0].votenumber;
				 
				that.setData({
					 percent
				})
				
				 if (percent == 0 || percent == 100) {
					that.setData({
					  number: percent,
					  numberRight: 100 - percent
					}) 
				 } else {
					 that.numAnimation(percent);
				 }
			 	 
			 } 
		  }
	  })
  },


  goDetail: function (e) {

	var dishId = e.currentTarget.dataset.dish;
	console.log(e);
	wx.navigateTo({
	  url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + dishId + '&objectType=dish' + '&isFrom=normal'
	})
  },
  
  
  
  numAnimation: function (number) {

	  var tempDiff;
	  if (number < 25) {
		tempDiff = 3;
	  } else if (number >= 25 && number < 50) {
		tempDiff = 6;
	  } else if (number >= 50 && number < 75) {
		tempDiff = 9;
	  } else if (number >= 75 && number < 100) {
		tempDiff = 12;
	  }
	  
	  var that = this;
	  var baseNumber = that.data.number //原数字
	  var difference = number - that.data.number //与原数字的差
	  var absDifferent = Math.abs(difference) //差取绝对值
	  var changeTimes = absDifferent < tempDiff ? absDifferent : tempDiff 
	  var changeUnit = absDifferent < tempDiff ? 1 : Math.floor(difference / tempDiff)  
    //绝对差除以变化次数
	  
	  // 依次变化
	  for (var i = 0; i < changeTimes; i += 1){
	  		// 使用闭包传入i值，用来判断是不是最后一次变化
	  		(function(i){
	  		  setTimeout(()=>{
	  			that.setData({
	  			  number: that.data.number += changeUnit,
				  numberRight: 100 - (that.data.number += changeUnit)
	  			})        
	  			// 差值除以变化次数时，并不都是整除的，所以最后一步要精确设置新数字
	  			if (i == changeTimes - 1 ){
	  			  that.setData({
	  				number: baseNumber + difference,
					numberRight: 100 - (baseNumber + difference)
	  			  })        
	  			}
	  		  },100*(i+1))
	  		})(i)
	  }  
  },
  
  share: function () {
	  wx.navigateTo({
	  	url: `../../sharePage/sharePage?isfrom=rice&actId=${this.data.actId}`
	  })
  }

  
})