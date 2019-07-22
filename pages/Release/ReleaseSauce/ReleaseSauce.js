import {
	uploadSaucePic,
	uploadSauce,
	releaseSauce,
	getSteps,
	deleteStep
} from '../../../api/api.js';


var localData = require('../../../utils/localData.js');
var app = getApp();
var isFrom = ''
Page({

	/**
	 * 页面的初始数据   
	 */
	data: {
		imgDomain: app.globalData.imgDomain,
		stepList: [],
		scrollTop: 0,
		stepItem: {},
		materialTitles: ['材料', '用量', '单位', '编辑'],
		materialUnits: ['棵', '根', '段', '克', '个', '瓣', '头', '片', '块', '颗', '粒', '大勺', '条', '千克', '斤', '朵', '卷', '节', '碗',
			'只', '包', '张', '毫升'
		],
		starList: [{
				key: 1,
				value: '★'
			},
			{
				key: 2,
				value: '★★'
			},
			{
				key: 3,
				value: '★★★'
			},
			{
				key: 4,
				value: '★★★★'
			},
			{
				key: 5,
				value: '★★★★★'
			}
		],

		timeListNum: [{
				key: 5,
				value: '5 分钟'
			},
			{
				key: 10,
				value: '10 分钟'
			},
			{
				key: 15,
				value: '15 分钟'
			},
			{
				key: 20,
				value: '20 分钟'
			},
			{
				key: 25,
				value: '25 分钟'
			},
			{
				key: 30,
				value: '30 分钟'
			},
			{
				key: 35,
				value: '35 分钟'
			},
			{
				key: 40,
				value: '40 分钟'
			},
			{
				key: 45,
				value: '45 分钟'
			},
			{
				key: 50,
				value: '50 分钟'
			},
			{
				key: 55,
				value: '55 分钟'
			},
			{
				key: 60,
				value: '60 分钟'
			}
		],

		cooks: [{
				key: 1,
				value: '凉拌'
			},
			{
				key: 2,
				value: '热烹'
			},
			{
				key: 3,
				value: '蘸料'
			},
			{
				key: 4,
				value: '腌制'
			},
			{
				key: 5,
				value: '配餐'
			}
		],

		stars: '',
		duration: '',
		condimentList: [],
		cookName: '',
		sauceId: 0,
		sauceParam: {
			"condimentList": [],
			"cookIds": "",
			"defPhoto": "",
			"difficulty": 0,
			"duration": 0,
			"sauceId": 0,
			"sauceName": ""
		},
		sauceInfo: {},
		currentPage: 0,
		isClick: true,
		isChange: false
	},


	/*             
	             -生命周期-     -onLoad-  
	*/

	onLoad: function(options) {
		app.globalData.isClick = true;
		app.globalData.finalImage = '';
		app.globalData.isChange = false
		wx.setStorageSync('isBackFrom', '');
		isFrom = options.isFrom;

		if (isFrom == 'drafts') {

			var sauceInfo = app.globalData.objectInfo;
			console.log(sauceInfo, '--------------')
			var stars = '';
			var cookName = '';
			var cooks = sauceInfo.cooks;

			this.data.sauceId = sauceInfo.objectId;

			this.data.sauceParam.sauceName = sauceInfo.objectName;
			this.data.sauceParam.sauceId = sauceInfo.objectId;
			this.data.sauceParam.cookIds = sauceInfo.cookIds;
			this.data.sauceParam.difficulty = sauceInfo.difficulty;
			this.data.sauceParam.condimentList = sauceInfo.condiment;
			this.data.sauceParam.defPhoto = sauceInfo.defPhoto;
			this.data.sauceParam.duration = sauceInfo.duration;

			for (var i = 0; i < sauceInfo.difficulty; i++) {
				stars += '★';
			}

			for (var i = 0; i < cooks.length; i++) {
				var cook = cooks[i];
				cookName = ' ' + cookName + cook.cookName;
			}

			sauceInfo.defPhoto = app.globalData.imgDomain + sauceInfo.defPhoto


			for (let i = 0; i < sauceInfo.steps.length; i++) {
				let item = sauceInfo.steps[i];

				if (item.steptPhoto.indexOf('https://img.jishantech.com') == 0) {
					continue;
				} else {
					item.steptPhoto = app.globalData.imgDomain + item.steptPhoto
					// console.log(item.steptPhoto,'-----------------------------------------------------')
				}
			}

			this.setData({
				sauceInfo: sauceInfo,
				stars: stars,
				duration: sauceInfo.duration + ' 分钟',
				condimentList: sauceInfo.condiment,
				stepList: sauceInfo.steps,
				cookName: cookName,
				scrollTop: sauceInfo.steps.length * 400
			})


		}

		this.setData({
			isClick: app.globalData.isClick,
			isChange: app.globalData.isChange
		})
	},

	/*             
	             -生命周期-     -onShow-  
	*/
	onShow: function() {


		this.setData({
			isClick: app.globalData.isClick,
			isChange: app.globalData.isChange
		})

		var isBackFrom = wx.getStorageSync('isBackFrom')
		var that = this;
		let arr = getCurrentPages();
		var list = that.data.stepList;
		let page = arr[arr.length - 1];
		var isEdit = page.data.isEdit;

		if (isEdit) {
			getSteps({
				data: {
					"objectId": that.data.sauceId,
					"objectType": "sauce"
				},
				success: function(res) {
					if (res.data.code == 1) {
						var list = res.data.data || [];
						for (let i = 0; i < list.length; i++) {
							var item = list[i];
							if (item.steptPhoto.indexOf('https://img.jishantech.com') == 0) {
								continue;
							} else {
								item.steptPhoto = app.globalData.imgDomain + item.steptPhoto
							}
						}


						that.setData({
							stepList: list,
							scrollTop: list.length * 400
						})
					}
				},
			})
		}

		if (app.globalData.finalImage !== '' && this.data.isChange) {
			this.setObjectInfo('defPhoto', app.globalData.finalImage);
		}

	},

	/*             
	              -第一步-  菜名   -dishNameInput-  
	 */
	dishNameInput: function(e) {
		var text = e.detail.value;
		text = text.replace(/\s+/g, "");
		this.data.sauceParam.sauceName = text;
		var sauceInfo = this.data.sauceInfo;
		sauceInfo.objectName = text;
	},




	/*             
	              -第一步-   上传图片,根据图片识别菜名  -getDishName-  
	 */
	// 上传图片
	getDishName: function(index) {

		var sourceTypeIndex;
		if (index == 0) {
			sourceTypeIndex = ['camera']
		} else {
			sourceTypeIndex = ['album']
		}
		var that = this
		wx.chooseImage({
			sourceType: sourceTypeIndex,
			sizeType: "压缩",
			count: 1,
			success: function(res) {
				var imageList = res.tempFilePaths;
				var src = imageList[0];

				app.globalData.coverImage = src;

				wx.navigateTo({
					url: '../../cropping/cropping?isform=releaseMenu',
				})
			},
			fail: function(res) {
				// console.log('fail')
			}
		})
	},

	//图片加载
	discernDish: function() {



		if (isFrom == 'drafts' && this.data.isClick) {
			return true;
		}

		var that = this;

		uploadSaucePic({
			filePath: app.globalData.finalImage,
			success: function(e) {

				if (e.statusCode == 200) {

					var jsonStr = e.data;

					if (jsonStr != null && '' != jsonStr) {

						jsonStr = jsonStr.replace(" ", "");

						if (typeof jsonStr != 'object') {

							jsonStr = jsonStr.replace(/\ufeff/g, "");

							var obj = JSON.parse(jsonStr);

							if (obj.data != null) {

								that.data.sauceParam.defPhoto = obj.data;
								// that.setObjectInfo('defPhoto', obj.data);
							}
						}
					}
				}
			}
		})

	},

	goCookingType: function(e) {
		wx.setStorageSync('isBackFrom', 'sauceCookingType');

		wx.navigateTo({
			url: '../CookingType/CookingType'
		})
	},

	bindCookChange: function(e) {

		var index = e.detail.value;
		var cook = this.data.cooks[index];

		this.data.sauceParam.cookIds = cook.key;
		this.setObjectInfo('cookIds', cook.key);

		this.setData({
			cookName: cook.value
		})

	},

	bindTimeChange: function(e) {

		var index = e.detail.value;
		var duration = this.data.timeListNum[index];

		this.data.sauceParam.duration = duration.key;
		this.setObjectInfo('duration', duration.key);

		this.setData({
			duration: duration.value
		})

	},


	/*             
	              -第二步-   设置难度  -bindStarChange-  
	 */
	bindStarChange: function(e) {

		var index = e.detail.value;
		var difficulty = this.data.starList[index];

		this.data.sauceParam.difficulty = difficulty.key;
		this.setObjectInfo('difficulty', difficulty.key);

		this.setData({
			stars: difficulty.value
		})
	},


	/*             
	              -第二步-  输入主料名字 inputMaterials   -onLoad-  
	 */
	inputMaterials: function(e) {

		var type = e.currentTarget.dataset.type;
		var index = e.currentTarget.dataset.index;
		var value = e.detail.value;

		var tempList = this.data.condimentList;
		var tempInfo = tempList[index];

		if (type == 'name') {

			if (tempList.length == 0) {

				tempInfo.condimentName = value;
				tempList.push(tempInfo);

			} else {
				tempList[index].condimentName = value;
			}

		} else {

			if (tempList.length == 0) {

				tempInfo.dosage = Number(value);
				tempList.push(tempInfo);

			} else {

				tempList[index].dosage = Number(value);
			}
		}

		this.setData({
			condimentList: tempList
		})

	},



	uploadSauce: function() {

		this.data.sauceParam.condimentList = this.data.condimentList;
		this.ifGoNext(this.data.sauceParam);

		// this.setData({
		//   currentPage: 1
		// })

	},


	/*             
	              -第二步-  选择单位   -bindUnitChange-  
	 */
	bindUnitChange: function(e) {

		var i = e.detail.value;
		var index = e.currentTarget.dataset.index;

		var tempList = this.data.condimentList;;
		var tempInfo = tempList[index];
		var tempUnit = this.data.materialUnits;

		var value = tempUnit[i];

		if (tempList.length == 0) {

			tempInfo.unit = value;
			tempList.push(tempInfo);

		} else {

			tempList[index].unit = value;
		}

		this.setData({
			condimentList: tempList
		})
	},





	/*             
               -第二步-   删除调料  -deleteFlavour-  
  */
	deleteFlavour: function(e) {

		var index = e.currentTarget.dataset.index;
		var list = this.data.condimentList;
		list.splice(index, 1);
		this.setData({
			condimentList: list
		})
	},




	/*             
               -第二步-   添加调料  -addFlavour-  
  */
	addFlavour: function() {

		var condimentInfo = {
			condimentName: "",
			unit: "--",
			dishId: 0,
			dosage: 0,
			sauceId: this.data.sauceId
		};

		var condimentList = this.data.condimentList;
		condimentList.push(condimentInfo);

		this.setData({
			condimentList: condimentList
		})
	},


	/*             
	             -公共方法-     -showAction-  
	*/
	showAction: function(e) {
		var type = e.currentTarget.dataset.type;

		// console.log(type)
		var that = this
		wx.showActionSheet({
			itemList: ['拍照', '从手机相册选择'],
			success: function(e) {
				that.getDishName(e.tapIndex)
			}
		})
	},

	goPreview: function() {
		wx.setStorageSync('isBackFrom', 'dishDetail');
		wx.navigateTo({
			url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + this.data.sauceId + '&objectType=sauce' +
				'&isFrom=preview'
		})
	},

	goBack: function() {
		this.setData({
			currentPage: 0
		})
	},

	addStep: function() {
		wx.setStorageSync('isBackFrom', 'SauceStep');

		wx.navigateTo({
			url: '../AddStep/AddStep?objectType=sauce&objectId=' + this.data.sauceId + '&index=' + (this.data.stepList.length +
				1)
		})
	},

	editStep: function(e) {
		var index = e.currentTarget.dataset.index;
		var stepItem = this.data.stepList[index];
		app.globalData.stepItem = stepItem;
		wx.setStorageSync('isBackFrom', 'SauceStep');
		wx.navigateTo({
			url: '../AddStep/AddStep?objectType=sauce&fun=edit&index=' + (index + 1)
		})
	},

	deleteStep: function(e) {

		var that = this;
		var index = e.currentTarget.dataset.index;
		wx.showModal({
			title: "提示",
			content: '要删除第' + (index + 1) + '步吗?',
			showCancel: true,
			cancelText: "取消",
			cancelColor: "#666",
			confirmText: "确定",
			confirmColor: "#ff5173",
			success: function(res) {
				console.log(res)
				if (res.confirm) {
					var list = that.data.stepList;
					var stepItem = list[index];

					deleteStep({
						data: stepItem,
						success: function(res) {
							if (res.data.code == 1) {

								list.splice(index, 1);
								that.setData({
									stepList: list
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
			}
		})
	},


	catchTouchMove: function(res) {
		return false
	},



	ifGoNext: function(options) {

		var sum = 0
		var title = '';

		if (options.defPhoto == '') {
			title = '照片不可为空';
			sum += 1;
		} else if (options.sauceName == '') {
			title = '请填写酱汁名';
			sum += 1;
		} else if (options.cookIds == '') {
			title = '请选用法';
			sum += 1;
		} else if (options.duration == '') {
			title = '请选择制作时间';
			sum += 1;
		} else {
			if (options.condimentList.length > 0) {

				for (var i = 0; i < options.condimentList.length; i++) {

					var condiment = options.condimentList[i];
					condiment.condimentName = condiment.condimentName.replace(/\s+/g, "");

					if (condiment.condimentName == '' || condiment.condimentName == '') {
						title = '材料名不可为空';
						sum += 1;
						break;
					} else if (condiment.dosage == 0) {
						title = '用量不可为空';
						sum += 1;
						break;
					} else if (condiment.unit == '--') {
						title = '单位不可为空';
						sum += 1;
						break;
					}
				}

			} else {
				title = '材料不可为空';
				sum += 1;
			}
		}

		setTimeout(() => {
			if (sum > 0) {
				wx.showToast({
					title: title,
					icon: 'none',
					duration: 2000
				})

				console.log('返回 false sum = ' + sum)

			} else {

				console.log('返回 true sum = ' + sum)

				var that = this;
				uploadSauce({
					data: that.data.sauceParam,
					success: function(res) {
						if (res.data.code == 1) {

							if (that.data.currentPage == 0) {

								var sauceList = that.data.sauceParam.condimentList;

								for (var i = 0; i < sauceList.length; i++) {
									sauceList[i].sauceId = res.data.data;
								}
								that.data.sauceParam.sauceId = res.data.data;
								that.data.sauceId = res.data.data;
								that.data.sauceParam.condimentList = sauceList;

								wx.showToast({
									title: '已存入草稿箱',
									icon: 'none',
									duration: 2000
								})

								that.setData({
									currentPage: 1
								})
							} else {
								wx.showToast({
									title: '发布成功',
									icon: 'success',
									duration: 2000
								})
								wx.navigateBack();
							}
						}
					}
				})
			}
		}, 500)
	},


	releaseSauce: function() {

		var that = this;

		if (that.data.stepList.length == 0) {
			wx.showToast({
				title: '请添加步骤',
				icon: 'none',
				duration: 2000
			})
			return;
		}
		releaseSauce({
			data: that.data.sauceParam,
			success: function(res) {
				if (res.data.code == 1) {

					wx.showToast({
						title: '发布成功!',
						icon: 'success',
						duration: 1500,
						success: function() {
							setTimeout(() => {
								wx.navigateBack();
							}, 1500)
						}
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
	},



	setObjectInfo: function(key, value) {
		var sauceInfo = this.data.sauceInfo;

		sauceInfo[key] = value;

		this.setData({
			sauceInfo: sauceInfo
		})

		console.log(sauceInfo);
	},







})
