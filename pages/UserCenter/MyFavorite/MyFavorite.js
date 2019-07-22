import {
	getCollectionList,
	addCollection,
	deleteCollection

} from '../../../api/api.js';


Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imgDomain: getApp().globalData.imgDomain,
		current: 0,
		menuList: [{
				title: '菜谱',
				isChecked: true
			},
			{
				title: '酱汁',
				isChecked: false
			},
			// {
			//   title: '其他',
			//   id: 2
			// }
		],

		dishList: [],
		sauceList: [],
		status_dish: 0,
		status_sauce: 0,
		status_all: 0,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		this.getCollectionList();
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

	// goDetail: function (e) {

	//   var index = e.currentTarget.dataset.index;
	//   var dish = this.data.dishList[index];
	//   var objectType = dish.objectType;

	//   if (objectType == 'dish') {
	//     wx.navigateTo({
	//       url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + dish.dishId + '&objectType=dish' + '&isFrom=normal'
	//     })
	//   } else if (objectType == 'sauce') {
	//     wx.navigateTo({
	//       url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + dish.dishId + '&objectType=sauce' + '&isFrom=normal'
	//     })
	//   } 
	// },


	swiperChange: function(e) {

		var index = e.currentTarget.dataset.index;
		var menuList = this.data.menuList;

		menuList[index].isChecked = true;

		for (var i = 0; i < menuList.length; i++) {
			if (i != index) {
				menuList[i].isChecked = false;
			}
		}

		this.setData({
			current: index,
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
				current: index,
				menuList: menuList
			})
		}
	},


	confirmEvent: function() {
		this.getCollectionList();
	},


	getCollectionList: function() {
		var that = this;
		getCollectionList({
			success: function(res) {
				console.log('getCollectionList')
				console.log(res)
				if (res.data.code == 1) {

					var status_sauce = res.data.data.sauces.length == 0 ? 2 : 1;
					var status_dish = res.data.data.dishes.length == 0 ? 2 : 1;

					that.setData({
						status_all: 1,
						status_sauce: status_sauce,
						status_dish: status_dish,
						dishList: res.data.data.dishes,
						sauceList: res.data.data.sauces
					})
				} else {
					// var status_dish = that.data.current == 0 ? 3 : that.data.status_dish;
					// var status_sauce = that.data.current == 1 ? 3 : that.data.status_sauce;
					// that.setData({
					//   status_dish: status_dish,
					//   status_sauce: status_sauce
					// })
					that.setData({
						status_all: 3
					})
				}
			},
			fail: function() {
				that.setData({
					status_all: 3
				})
			}
		})
	},


	goDetail: function(e) {

		var objectId = e.currentTarget.dataset.id;
		var objectType = e.currentTarget.dataset.type;

		console.log(objectId);
		console.log(objectType);
		wx.navigateTo({
			url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + objectId + '&objectType=' + objectType
		})
	},



























})
