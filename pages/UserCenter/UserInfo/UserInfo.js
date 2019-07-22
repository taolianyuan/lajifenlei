import {
	uploadUserInfo,
	uploadHeader,
	getUserInfo
} from '../../../api/api.js'

var app = getApp();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		date: '2016-09-01',
		head: '../../../img/camera.png',
		genderList: [{
			key: 1,
			value: '男',
		}, {
			key: 0,
			value: '女',
		}],
		imgDomain: app.globalData.imgDomain,
		userInfo: {},
		focusValue: '',
		blurValue: '',

		userInfoTitles: [
			// { key: '级别', value: '', route:'../Integration/Integration'},
			{
				key: '#个性标签',
				value: '',
				route: '../MyTags/MyTags'
			},
			{
				key: '简介',
				value: '',
				route: '../Introduce/Introduce'
			},
			{
				key: '地区',
				value: '',
				route: ''
			}
		],
		region: ['上海市', '上海市', '普陀区'],
		constellationList: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		app.globalData.coverImage = '';
		app.globalData.finalImage = '';
		this.getUserInfo();
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		// this.getUserInfo();
		var that = this;
		var userInfo = that.data.userInfo;
		let arr = getCurrentPages();
		let page = arr[arr.length - 1];

		userInfo.intro = page.data.intro;

		userInfo.tags = page.data.tags;


		if (app.globalData.finalImage) {
			wx.showLoading({
				title: '加载中...',
				mask: true
			})

			uploadHeader({
				filePath: app.globalData.finalImage,
				success: function(res) {
					var obj = JSON.parse(res.data);
					if (obj.code == 1) {
						var userInfo = {};
						userInfo.avatarUrl = that.data.imgDomain + obj.data;
						that.uploadUserInfo(userInfo);
						wx.hideLoading();
					}
				},
				fail: function(res) {
					wx.showToast({
						title: '网络错误~',
						icon: 'none'
					})
				}
			})
		}
		that.setData({
			userInfo,
		})
	},


	takePhotos: function() {
		var that = this;
		wx.chooseImage({
			count: 1,
			success: function(res) {
				var filePath = res.tempFilePaths[0];

				app.globalData.coverImage = filePath;

				wx.navigateTo({
					url: '../../cropping/cropping?isfrom=userInfo',
				})

			},
			fail: function(res) {
				wx.showToast({
					title: '网络错误~',
					icon: 'none'
				})
			},
			complete: function(res) {

			}
		})
	},

	bindfocus: function(e) {
		this.setData({
			focusValue: e.detail.value.replace(/\s+/g, '')
		})
	},

	getName: function(e) {
		var userInfo = this.data.userInfo;
		var value = e.detail.value.replace(/\s+/g, '');
		this.setData({
			blurValue: value
		})
		var userinfo = {
			wechatName: value
		};

		if (value == '') {
			wx.showToast({
				title: '输入不能为空~',
				icon: 'none'
			})
			this.setData({
				userInfo: userInfo
			})
		} else {
			this.data.userInfo.nickName = value;
			if (this.data.focusValue === value) {
				return;
			} else {
				this.uploadUserInfo(userinfo);
			}
		}


	},

	cellClick: function(e) {
		var index = e.currentTarget.dataset.id;

		var route = this.data.userInfoTitles[index].route;

		if (index == 0) {
			route = route + '?tags=' + this.data.userInfo.tags;
		} else if (index == 1) {
			route = route + '?intro=' + this.data.userInfo.intro;
		}

		if (route) {
			wx.navigateTo({
				url: route
			})
		}
	},


	bindDateChange(e) {
		var index = e.detail.value;
		var userInfo = {};
		userInfo.constellation = this.data.constellationList[index];;

		this.uploadUserInfo(userInfo);
	},


	bindRegionChange: function(e) {
    console.log(e,"+++++++++++++++++")
		var list = e.detail.value;
	  var userInfo = {};

		 userInfo.provice = list[0];
		 userInfo.city = list[1];
		 userInfo.county = list[2];

		 this.uploadUserInfo(userInfo);
    //  this.setData({
    //    provice: list[0],
    //    city: list[1],
    //    county: list[2]
    //  })
	},


	uploadUserInfo: function(info) {
		wx.showLoading({
			title: '正在修改',
			mask: true
		})
		var that = this;
		uploadUserInfo({
			data: info,
			success: function(res) {
				if (res.data.code == 1) {

					var defUserInfo = that.data.userInfo;
					var newUserInfo = Object.assign(defUserInfo, info);

					that.setData({
						userInfo: defUserInfo
					})
         
					wx.showToast({
						title: '修改成功',
						icon: 'none'
					})
				} else {
					wx.showToast({
						title: '系统繁忙,稍后再试~',
						icon: 'none',
						duration: 2000
					})
				}
			},
			complete: function() {

			}
		})
	},


	radioChange: function(e) {

		var value = e.detail.value;
		var userInfo = {};
		userInfo.gender = Number(value);

		this.uploadUserInfo(userInfo);

	},


	getUserInfo: function(e) {

		var that = this;

		getUserInfo({
			success: function(e) {

				if (e.data.code == 1) {

					var userInfo = that.data.userInfo;
					var data = e.data.data.user;
					var constellation = (data.constellation == null || data.constellation == '') ? '点击选择星座' : data.constellation
					var genderList = that.data.genderList;
					var region = [data.provice, data.city, data.county];

					userInfo.constellation = constellation;
					userInfo.avatarUrl = e.data.data.avatarUrl;
					userInfo.nickName = e.data.data.nickName;
					userInfo.gender = data.gender;
					userInfo.intro = data.intro;
					userInfo.provice = data.provice;
					userInfo.city = data.city;
					userInfo.county = data.county;
					userInfo.gender = data.gender;
					userInfo.tags = e.data.data.user.tags;

					if (userInfo.gender == 0) {
						genderList[1].isChecked = true;
					} else if (userInfo.gender == 1) {
						genderList[0].isChecked = true;
					}

					if (region) {
						that.setData({
							region,
						})
					}

					that.setData({
						userInfo,
						status: 1,
						genderList,
					})
				}
			},
			fail: function(res) {
				that.setData({
					status: 3
				})
			},
			complete: function() {
				wx.hideNavigationBarLoading() //完成停止加载
				wx.stopPullDownRefresh() //停止下拉刷新
			}
		})
	},










})
