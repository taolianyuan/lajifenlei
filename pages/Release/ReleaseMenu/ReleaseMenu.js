import {
	uploadDishOne,
	uploadDishTwo,
	uploadDishThree,
	uploadDishFour,
	discernDish,
	getMaterialWithDishName,
	getCookingType,
	uploadSeveralPic,
	deleteStep,
	getSteps
} from '../../../api/api.js';


var localData = require('../../../utils/localData.js');
var app = getApp();
var newArr = [];

var isFrom = '';


Page({

	/**
	 * 页面的初始数据   
	 */
	data: {
		imgDomain: app.globalData.imgDomain,
		hidden: true,
		scrollTop: 0,
		materialUnits: ['棵', '根', '段', '克', '个', '瓣', '头', '片', '块', '颗', '粒', '大勺', '条', '千克', '斤', '朵', '卷', '节', '碗',
			'只', '包', '张', '毫升', '少许'
		],
		condimentUnits: ['棵', '根', '段', '克', '个', '瓣', '头', '片', '块', '颗', '粒', '大勺', '条', '千克', '斤', '朵', '卷', '节', '碗',
			'只', '包', '张', '毫升', '少许'
		],
		materialTitles: ['材料', '用量', '单位', '编辑'],
		animation: {},
		businessKey: wx.getStorageSync('businessKey'),
		dishId: 0,
		dish: {},
		uploadDishOne: {
			"businessKey": "",
			"defPhoto": "",
			"dishName": "",
			"dishSummary": ""
		},
		uploadDishTwo: {
			"condimentList": [],
			"cookIds": "",
			"difficulty": 0,
			"dishId": 0,
			"materialList": [],
			"duration": 0
		},

		uploadDishFour: {
			"dishId": 0,
			"photos": [],
			"sauceIds": ""
		},
		currentPage: 0,
		count: 0,
		dishImage: '',
		cookingType: [],
		productImage: [],
		sauceList: [],
		sauceIdList: [
			[],
			[],
			[]
		],
		stepList: [],
		stepItem: {},
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
		stars: '',
		duration: '',
		sh: 0,
		dishType: [],
		dishTypeName: '',
		dishTypeList: [],
		recommendMaterialList: [],
		recommendCondimentList: [],
		dishInfo: {},
		scrollTop: 0,
		isneed: false,
		isClick: true,
		isChange: false,
		focusValue: '',
		blurValue: ''
	},


	/*             
	             -生命周期-     -onLoad-  
	*/

	onLoad: function(options) {

		app.globalData.finalImage = '';
		app.globalData.isClick = true;
		app.globalData.isChange = false;



		isFrom = options.isFrom;


		wx.setStorageSync('isBackFrom', '');
		// var isFrom = options.isFrom;

		if (isFrom == 'drafts') {
			var dishInfo = app.globalData.objectInfo;

			console.log(dishInfo, '--dishInfodishInfodishInfo--')


			// if (dishInfo.defPhoto.indexOf("http://") == 0){
			//   console.log(1111)
			//   this.setData({
			//     isneed: true
			//   })
			// }else{
			//   console.log(2222)
			//   this.setData({
			//     isneed: false
			//   })
			// }

			console.log(dishInfo, '发菜谱里的dishInfo')
			var stars = '';
			var cookName_str = '';
			var cooks = dishInfo.cooks;

			this.data.dishId = dishInfo.objectId;

			this.data.uploadDishOne.dishId = dishInfo.objectId;
			this.data.uploadDishOne.dishName = dishInfo.objectName;
			this.data.uploadDishOne.defPhoto = dishInfo.defPhoto;
			this.data.uploadDishOne.dishSummary = dishInfo.dishSummary;

			this.data.uploadDishTwo.condimentList = dishInfo.condiment;
			this.data.uploadDishTwo.cookIds = dishInfo.cookIds;
			this.data.uploadDishTwo.difficulty = dishInfo.difficulty;
			this.data.uploadDishTwo.duration = dishInfo.duration;
			this.data.uploadDishTwo.dishId = dishInfo.objectId;
			this.data.uploadDishTwo.materialList = dishInfo.material;

			this.data.uploadDishFour.photos = dishInfo.photos;
			this.data.uploadDishFour.sauceIds = dishInfo.sauceIds;

			this.data.cookingType = dishInfo.cooks;

			for (var i = 0; i < dishInfo.difficulty; i++) {
				stars += '★';
			}

			if (cooks != null) {
				for (var i = 0; i < cooks.length; i++) {
					var cook = cooks[i];
					cookName_str = ' ' + cookName_str + cook.cookName;
				}
			}

			dishInfo.defPhoto = app.globalData.imgDomain + dishInfo.defPhoto

			var count = dishInfo.dishSummary == null ? 0 : dishInfo.dishSummary.length;

			// if (dishInfo.step){

			// }

			for (let i = 0; i < dishInfo.steps.length; i++) {
				let item = dishInfo.steps[i];

				if (item.steptPhoto.indexOf('https://img.jishantech.com') == 0) {
					continue;
				} else {
					item.steptPhoto = app.globalData.imgDomain + item.steptPhoto
					// console.log(item.steptPhoto,'-----------------------------------------------------')
				}
			}

			// console.log(dishInfo.steps,'--------------------------------')

			// console.log(dishInfo.setps,'dishInfo.setps')
			this.setData({
				recommendMaterialList: dishInfo.material,
				recommendCondimentList: dishInfo.condiment,
				count: count,
				stars: stars,
				duration: dishInfo.duration + ' 分钟',
				stepList: dishInfo.steps,
				cookName_str: cookName_str,
				dishInfo: dishInfo,
				sauceList: dishInfo.sauces,
				scrollTop: dishInfo.steps.length * 400
			})
			console.log(this.data.dishInfo);
		}

		this.setData({
			isChange: app.globalData.isChange,
			isClick: app.globalData.isClick
		})
	},


	/*             
	             -生命周期-     -onShow-  
	*/
	onShow: function() {

		this.setData({
			isChange: app.globalData.isChange,
			isClick: app.globalData.isClick
		})

		var isBackFrom = wx.getStorageSync('isBackFrom')
		var that = this;
		let arr = getCurrentPages();
		var list = that.data.stepList;
		let page = arr[arr.length - 1];

		// console.log(page.__data__,'page-------')

		if (isBackFrom == 'dishStep') {

			var isEdit = page.data.isEdit;
			if (isEdit) {
				getSteps({
					data: {
						"objectId": that.data.dishId,
						"objectType": "dish"
					},
					success: function(res) {

						// var list = res.data.data;

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
		} else if (isBackFrom == 'dishCookingType') {

			if (page.data.typeStr) {
				var cookingType = JSON.parse(page.data.typeStr);
				var cookId_str = '';
				var cookName_str = '';

				for (var i = 0; i < cookingType.length; i++) {
					if (i == 0) {
						cookId_str += cookingType[i].cookId;
						cookName_str += cookingType[i].cookName;
					} else {
						cookId_str += ',' + cookingType[i].cookId;
						cookName_str += ' ' + cookingType[i].cookName;
					}
				}

				that.data.cookingType = cookingType;
				that.data.uploadDishTwo.cookIds = cookId_str;
				that.setData({
					cookName_str,
				})
			}
		} else if (isBackFrom == 'searchSauce') {
			if (page.data.saucesStr) {
				var sauceList = JSON.parse(page.data.saucesStr);

				that.setData({
					sauceList
				})
			}
		}

		var length = this.data.stepList.length;

		if (app.globalData.finalImage !== '' && this.data.isChange) {
			this.setObjectInfo('defPhoto', app.globalData.finalImage);
		}
	},

	/*             
	              -生命周期-     -onReady-  
	 */
	onReady: function() {
		this.animation = wx.createAnimation()

		this.setData({
			sh: wx.getSystemInfoSync().windowHeight
		})
	},




	/*             
	              -第一步-  菜谱故事   -changeInput-  
	 */
	changeInput: function(e) {
		var text = e.detail.value;

		console.log(text, '-----------------text-----------------')
		var dishInfo = this.data.dishInfo;
		dishInfo.dishSummary = text;
		this.data.uploadDishOne.dishSummary = text;

		this.setData({
			dishInfo,
			count: text.length
		})
	},


	tipsInput: function(e) {
		var text = e.detail.value;
		this.data.uploadDishFour.tips = text;
	},



	/*             
	              -第一步-  菜名   -dishNameInput-  
	 */

	bindfocus: function(e) {
		this.setData({
			focusValue: e.detail.value.replace(/\s+/g, '')
		})
	},

	dishNameInput: function(e) {

		var text = e.detail.value;

		text = text.replace(/\s+/g, "");

		this.setData({
			blurValue: text
		})
		var dishInfo = this.data.dishInfo;

		if (this.data.focusValue == text) {
			return;
		} else {
			dishInfo.objectName = text;
			this.data.uploadDishOne.dishName = text;
			this.getMaterialWithDishName(text);
			this.setData({
				dishInfo
			})
		}
	},




	/*             
               -第一步-   根据菜名获取食材  -getMaterial-  
  */

	getMaterialWithDishName: function(dishName) {
		wx.showLoading({
			title: '智能匹配食材中...',
			mask: true
		})
		var that = this;
		getMaterialWithDishName({
			data: {
				dishName: dishName
			},
			success: function(res) {

				if (res.data.code == 1) {
					var data = res.data.data;
					if (data) {
						if (data.material) {
							// 							var recommendMaterialList = that.data.recommendMaterialList;
							// 							recommendMaterialList = recommendMaterialList.concat(data.material);
							for (let i = 0; i < data.material.length; i++) {
								var item = data.material[i];
								if (item.unit == '' || item.unit == null || item.unit == undefined) {
									item.unit == '--'
								}
							}
							that.setData({
								recommendMaterialList: data.material
							})
						}

						if (data.condiment) {
							// 							var recommendCondimentList = that.data.recommendCondimentList;
							// 							recommendCondimentList = recommendCondimentList.concat(data.condiment);
							for (let i = 0; i < data.condiment.length; i++) {
								var item = data.condiment[i];
								if (item.unit == null) {
									item.unit = '--'
								}
							}
							that.setData({
								recommendCondimentList: data.condiment
							})
						}
					}
					wx.hideLoading();
				}
			},
			fail: function() {
				wx.showToast({
					title: '服务繁忙，请稍后再试',
					icon: 'none'
				})
			}
		})
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
				// console.log('success')
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
		discernDish({
			filePath: app.globalData.finalImage,
			success: function(e) {
				if (e.statusCode == 200) {

					var jsonStr = e.data;

					console.log('jsonStr = ' + jsonStr);

					if (jsonStr != null && '' != jsonStr) {

						jsonStr = jsonStr.replace(" ", "");

						if (typeof jsonStr != 'object') {

							jsonStr = jsonStr.replace(/\ufeff/g, "");

							var obj = JSON.parse(jsonStr);

							console.log(obj)

							if (obj.data != null) {

								var defPhoto = obj.data.ossRelativeUrl;
								var dishName = obj.data.imgClassiflyRes.result[0].name;

								// that.setObjectInfo('defPhoto', defPhoto);
								if (dishName == '') {
									wx.showToast({
										title: '识别菜名失败,请手动输入',
										icon: 'none'
									})
								} else {
									that.setObjectInfo('objectName', dishName);
									that.data.uploadDishOne.dishName = dishName;
									that.getMaterialWithDishName(dishName);
								}
								that.data.uploadDishOne.defPhoto = defPhoto;
							}
						}
					}
				} else {
					wx.showToast({
						title: '识别失败...',
						icon: 'none'
					})
				}
			},
			fail: function() {
				wx.showToast({
					title: '识别失败...',
					icon: 'none'
				})
			}
		})
	},



	/*             
	              -第二步-  设置烹饪方式   -secondPageCellClicked-  
	 */
	goCookingType: function(e) {

		var cookingType = this.data.cookingType;
		var jsonStr = JSON.stringify(cookingType);

		wx.navigateTo({
			url: '../CookingType/CookingType?cookingType=' + jsonStr
		})
	},



	/*             
	              -第二步-   设置菜谱类型  -getDishTypeChange-  
	 */
	getDishTypeChange: function(e) {
		var index = e.detail.value;
		this.setData({
			dishTypeName: this.data.dishType[index].propertyName
		})
		this.data.uploadDishTwo.propertyId = this.data.dishType[index].propertyId;
	},



	/*             
               -第二步-   设置时间  -bindTimeChange-  
  */
	bindTimeChange: function(e) {
		var index = e.detail.value;

		var duration = this.data.timeListNum[index];

		this.data.uploadDishTwo.duration = duration.key;
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

		this.data.uploadDishTwo.difficulty = difficulty.key;
		this.setObjectInfo('difficulty', difficulty.key);

		this.setData({
			stars: difficulty.value
		})
	},


	/*             
	              -第二步-  输入主料名字 inputMaterials   -onLoad-  
	 */
	inputMaterials: function(e) {

		var id = e.currentTarget.dataset.id;
		var type = e.currentTarget.dataset.type;
		var index = e.currentTarget.dataset.index;
		var value = e.detail.value;

		// console.log('id = ' + id);

		var tempList = [];
		var tempInfo = {};

		if (id == 0) {
			tempList = this.data.recommendMaterialList;
		} else {
			tempList = this.data.recommendCondimentList;
		}

		tempInfo = tempList[index];

		if (type == 'name') {

			if (id == 0) {

				if (tempList.length == 0) {

					tempInfo.fmName = value;
					tempList.push(tempInfo);

				} else {

					tempList[index].fmName = value;
				}

			} else {

				if (tempList.length == 0) {

					tempInfo.condimentName = value;
					tempList.push(tempInfo);

				} else {

					tempList[index].condimentName = value;

				}

			}

		} else {

			if (tempList.length == 0) {

				tempInfo.dosage = Number(value);
				tempList.push(tempInfo);

			} else {

				tempList[index].dosage = Number(value);

			}

		}

		if (id == 0) {
			this.setData({
				recommendMaterialList: tempList
			})
			console.log('主料');
			console.log(this.data.recommendMaterialList);
		} else {
			this.setData({
				recommendCondimentList: tempList
			})
			console.log('配料');
			console.log(this.data.recommendCondimentList);
		}
	},



	/*             
	              -第二步-  选择单位   -bindUnitChange-  
	 */
	bindUnitChange: function(e) {
		var id = e.currentTarget.dataset.id;
		var i = e.detail.value;
		var index = e.currentTarget.dataset.index;

		var tempList = [];
		var tempInfo = {};
		var tempUnit = [];

		if (id == 0) {
			tempList = this.data.recommendMaterialList;
			tempUnit = this.data.materialUnits;
		} else {
			tempList = this.data.recommendCondimentList;
			tempUnit = this.data.condimentUnits;
		}

		tempInfo = tempList[index];
		var value = tempUnit[i];

		if (tempList.length == 0) {
			tempInfo.unit = value;
			tempList.push(tempInfo);
		} else {
			tempList[index].unit = value;
		}

		if (id == 0) {
			this.setData({
				recommendMaterialList: tempList
			})
			console.log('主料');
			console.log(this.data.recommendMaterialList);
		} else {
			this.setData({
				recommendCondimentList: tempList
			})
			console.log('配料');
			console.log(this.data.recommendCondimentList);
		}

	},


	/*             
	              -第二步-   删除主料  -deleteMeterial-  
	 */
	deleteMeterial: function(e) {

		var index = e.currentTarget.dataset.index;
		// console.log(index)
		var list = this.data.recommendMaterialList;

		var that = this;

		wx.showModal({
			title: '提示',
			content: '确定删除',
			success(res) {
				if (res.confirm) {
					list.splice(index, 1);
					that.setData({
						recommendMaterialList: list
					})
				} else if (res.cancel) {
					return
				}
			}
		})
	},



	/*             
               -第二步-   删除调料  -deleteFlavour-  
  */
	deleteFlavour: function(e) {

		var index = e.currentTarget.dataset.index;
		// console.log(index)
		var list = this.data.recommendCondimentList;
		var that = this;

		wx.showModal({
			title: '提示',
			content: '确定删除',
			success(res) {
				if (res.confirm) {
					list.splice(index, 1);
					that.setData({
						recommendCondimentList: list
					})
				} else if (res.cancel) {
					return
				}
			}
		})
	},
	/*             
	              -第二步-   添加主料  -addMaterial-  
	 */
	addMaterial: function() {

		var list = this.data.recommendMaterialList;
		var materialInfo = {
			dishId: this.data.dishId,
			dosage: '',
			fmName: "",
			unit: "--"
		};
		list.push(materialInfo);
		this.setData({
			recommendMaterialList: list
		})
	},


	/*             
               -第二步-   添加调料  -addFlavour-  
  */
	addFlavour: function() {

		var list = this.data.recommendCondimentList;
		var condimentInfo = {
			dishId: this.data.dishId,
			dosage: '',
			condimentName: "",
			unit: "--"
		};
		list.push(condimentInfo);
		this.setData({
			recommendCondimentList: list
		})
	},


	/*             
	              -第三步-  添加步骤   -addStep-  
	 */
	addStep: function() {
		wx.navigateTo({
			url: '../AddStep/AddStep?objectType=dish&objectId=' + this.data.dishId + '&index=' + (this.data.stepList.length +
				1)
		})
	},

	editStep: function(e) {
		var index = e.currentTarget.dataset.index;
		var stepItem = this.data.stepList[index];
		app.globalData.stepItem = stepItem;
		// wx.setStorageSync('isBackFrom', 'SauceStep');
		wx.navigateTo({
			url: '../AddStep/AddStep?objectType=sauce&fun=edit' + '&index=' + (index + 1)
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


	/*             
	              -第四步-  删除图片   -deleteImage-  
	 */
	deleteImage: function(e) {
		var index = e.currentTarget.dataset.index
		var arr = this.data.productImage;
		// console.log("删除索引" + index);
		arr.splice(index, 1);
		// this.data.imageUrlList.splice(index, 1);
		this.setData({
			productImage: arr
		})
	},


	/*             
	             -第四步-  点击图片   -deleteImage-  
	*/
	/*---------------------------------------------------onLoad---------------------------------------------------*/
	clickImage: function(e) {
		var that = this;
		var imageIndex = e.currentTarget.dataset.index;
		var arr = this.data.productImage;

		var newArr = [];

		for (let i = 0; i < arr.length; i++) {
			newArr.push(arr[i].photoUrl)
		}

		console.log(newArr)
		arr = newArr;

		wx.previewImage({
			current: arr[e.currentTarget.dataset.index], // 当前显示图片的http链接
			urls: arr // 需要预览的图片http链接列表
		})

	},


	/*             
	              -第四步-  预览图片   -deleteImage-  
	 */
	previewImage: function(e) {
		var that = this;
		var current = e.target.dataset.src
		var arr = this.data.productImage;
		var newArr = [];

		for (let i = 0; i < arr.length; i++) {
			newArr.push(arr[i].photoUrl)
		}

		console.log(newArr)
		arr = newArr;


		wx.previewImage({
			current: that.data.imgDomain + current,
			urls: arr
		})
	},


	// 预览
	/*             
               -第四步-  预览菜谱   -goPreview-  
  */

	goPreview: function() {

		this.uploadDishFour(1);
	},


	/*             
	              -第四步-   返回上一页  -goBack-  
	 */

	// goBack: function () {
	//   this.setData({
	//     hidden: true
	//   });
	//   wx.navigateBack()
	// },


	/*             
	              -第四步-   跳转我的菜谱  -goMyMenu-  
	 */
	// goMyMenu: function () {
	//   this.setData({
	//     nocancel: !this.data.nocancel,
	//     hidden: true
	//   });

	// wx.navigateTo({
	//   url: '../../UserCenter/MyDynamic/MyDynamic',
	// })
	// },


	/*             
	              -第四步-  选多张图   -chooseSeveralPics-  
	 */
	chooseSeveralPics: function(index) {

		var sourceTypeIndex;
		var that = this;
		if (index == 0) {
			sourceTypeIndex = ['camera']
		} else {
			sourceTypeIndex = ['album']
		}
		var that = this
		var imageList = that.data.productImage;
		wx.chooseImage({
			sourceType: sourceTypeIndex,
			sizeType: "压缩",
			count: 9 - imageList.length,
			success: function(res) {
				var successUp = 0; //成功个数
				var failUp = 0; //失败个数
				var length = res.tempFilePaths.length; //总共个数
				var i = 0; //第几个
				that.upLoadPics(res.tempFilePaths, successUp, failUp, i, length);
			},
			fail: function(res) {
				// console.log('fail')
			}
		})

	},


	/*             
               -第四步-  上传多张图   -upLoadPics-  
  */
	/* 函数描述：作为上传文件时递归上传的函数体体；
	 * 参数描述： 
	 * filePaths是文件路径数组
	 * successUp是成功上传的个数
	 * failUp是上传失败的个数
	 * i是文件路径数组的指标
	 * length是文件路径数组的长度
	 */
	upLoadPics(filePaths, successUp, failUp, i, length) {
		var that = this;
		uploadSeveralPic({

			filePath: filePaths[i],
			success: function(e) {

				if (e.statusCode == 200) {
					console.log(e)
					var jsonStr = e.data;
					successUp++;

					if (jsonStr != null && '' != jsonStr) {

						jsonStr = jsonStr.replace(" ", "");

						if (typeof jsonStr != 'object') {

							jsonStr = jsonStr.replace(/\ufeff/g, "");

							var obj = JSON.parse(jsonStr);

							if (obj.data != null) {

								var list = that.data.productImage;
								var url = obj.data;
								var proPhotos = {
									"dishId": 0,
									"photoId": 0,
									"photoOrder": 0,
									"photoUrl": "",
									"sauceId": 0
								};

								proPhotos.dishId = that.data.dishId;
								proPhotos.photoUrl = url[0];
								proPhotos.photoOrder = list.length + 1;

								list.push(proPhotos);

								that.setData({
									productImage: list
								})

								console.log(list)
							}

						} else {

						}
					}
				}
			},
			fail: function(e) {
				failUp++;
			},
			complete: function(e) {
				wx.hideLoading();
				i++;
				if (i == length) {
					// that.showToast('总共'+successUp+'张上传成功,'+failUp+'张上传失败！');
				} else { //递归调用uploadDIY函数
					that.upLoadPics(filePaths, successUp, failUp, i, length);
				}
			},
		})
	},



	deleteSauce: function(e) {
		var index = e.currentTarget.dataset.index;
		var sauceList = this.data.sauceList;
		console.log(index);
		sauceList.splice(index, 1);

		this.setData({
			sauceList
		})
	},


	goSearchSauces: function() {
		var sauceList = this.data.sauceList;
		var jsonStr = JSON.stringify(sauceList);

		wx.navigateTo({
			url: '../SearchSauces/SearchSauces?sauceList=' + jsonStr
		})
	},

	/*             
	              -公共方法-     -showAction-  
	 */
	showAction: function(e) {
		var type = e.currentTarget.dataset.type;
    console.log(type)
    
		// console.log(type)
		var that = this
		wx.showActionSheet({
			itemList: ['拍照', '从手机相册选择'],
			success: function(e) {
				// console.log(e.tapIndex)
				if (type == "single") {
					that.getDishName(e.tapIndex)
				} else if (type == 'several') {
					that.chooseSeveralPics(e.tapIndex)
				}
			}
		})
	},



	uploadDishOne: function() {

		wx.showLoading({
			title: '加载中...',
			mask: true
		})

		var that = this;
		that.data.uploadDishOne.businessKey = wx.getStorageSync('businessKey');
		uploadDishOne({
			data: that.data.uploadDishOne,
			success: function(res) {

				if (res.data.code == 1) {

					wx.showToast({
						title: '已存入草稿箱',
						icon: 'none',
						duration: 2000
					})

					var dishId = res.data.data;
					that.data.uploadDishOne.dishId = dishId;
					that.data.uploadDishTwo.dishId = dishId;
					that.data.uploadDishFour.dishId = dishId;
					that.data.dishId = dishId;

					that.animation.translate(0, -that.data.sh).step()
					that.setData({
						animation: that.animation.export()
					})
				}
			}
		})
	},


	uploadDishTwo: function() {

		wx.showLoading({
			title: '加载中...',
			mask: true
		})

		var that = this;

		uploadDishTwo({
			data: that.data.uploadDishTwo,
			success: function(res) {

				if (res.data.code == 1) {
					that.setData({
						currentPage: that.data.currentPage + 1
					})
					wx.hideLoading();
				}
			}
		})
	},


	uploadDishFour: function(sign) {
		var sauceList = this.data.sauceList;
		var sauceIds = '';
		for (var i = 0; i < sauceList.length; i++) {
			if (i == 0) {
				sauceIds += sauceList[i].sauceId;
			} else {
				sauceIds += ',' + sauceList[i].sauceId;
			}
		}

		// return;

		var that = this;

		that.data.uploadDishFour.sauceIds = sauceIds;
		that.data.uploadDishFour.photos = that.data.productImage;
		that.data.uploadDishFour.sign = sign;

		uploadDishFour({
			data: that.data.uploadDishFour,
			success: function(res) {
				console.log(res)
				if (res.data.code == 1) {

					if (sign == 1) {
						wx.setStorageSync('isBackFrom', 'dishDetail');
						wx.navigateTo({
							url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + that.data.uploadDishFour.dishId +
								'&objectType=dish' + '&isFrom=preview'
						})
					} else {
						wx.showToast({
							title: '发布成功~',
							icon: 'none',
							duration: 1500,
							success: function() {
								setTimeout(() => {
									wx.navigateBack();
								}, 1500)
							}
						})
					}

				}
			}
		})
	},



	/*             
	              -公共方法-   下一步  -goNextPage-  
	 */
	goNextPage: function(e) {

		var page = e.currentTarget.dataset.page

		var title = '';

		if (page == 0) {

			var options = this.data.uploadDishOne;
			if (options['defPhoto'] === '') {
				title = '选择一张封面图吧'
			} else if (options['dishName'] === '') {
				title = '你的菜还没有名字呢'
			} else {
				this.uploadDishOne();
				return;
			}

		} else if (page == 1) {

			var recommendCondimentList = this.data.recommendCondimentList;
			var recommendMaterialList = this.data.recommendMaterialList;
			for (var i = 0; i < recommendCondimentList.length; i++) {
				var condiment = recommendCondimentList[i];

				if (condiment.condimentName == '' && condiment.dosage == 0 && condiment.unit == '--') {
					recommendCondimentList.splice(i, 1);
				}
			}

			for (var i = 0; i < recommendMaterialList.length; i++) {
				var condiment = recommendMaterialList[i];

				if (condiment.fmName == '' && condiment.dosage == 0 && condiment.unit == '--') {
					recommendMaterialList.splice(i, 1);
				}
			}
			this.data.uploadDishTwo.condimentList = recommendCondimentList;
			this.data.uploadDishTwo.materialList = recommendMaterialList;

			var options = this.data.uploadDishTwo;
			if (options['cookIds'] == '' || options.cookIds == null) {
				title = '还没选择烹饪方式呢~'
			} else if (options['duration'] === 0) {
				title = '做菜需要时间哦~亲'
			} else if (options['difficulty'] == '' || options['difficulty'] == null) {
				title = '做菜是有难度呢~';
			} else if (options['condimentList'].length == 0 && options['materialList'].length == 0) {
				title = '请添加一种主料或调料'

			} else {
				if (options['materialList'].length > 0) {
					for (let i = 0; i < options['materialList'].length; i++) {
						var info = options['materialList'][i];
						if (info.fmName == '') {
							title = '食材第 ' + (i + 1) + ' 项信息不全';
						} else if (info.fmName == '--' || info.dosage == null) {
							title = info.fmName + ' 的用量不可为空';
						} else if (info.unit == '--') {
							title = info.fmName + ' 的单位不可为空';
						}
					}
				} else if (options['condimentList'].length > 0) {
					for (let i = 0; i < options['condimentList'].length; i++) {
						var info = options['condimentList'][i];
						if (info.condimentName == '') {
							title = '调料第 ' + (i + 1) + ' 项信息不全';
						} else if (info.dosage == '--' || info.dosage == null) {
							title = info.condimentName + ' 的用量不可为空';
						} else if (info.unit == '--') {
							title = info.condimentName + ' 的单位不可为空';
						}
					}
				}
			}

			if (title == '') {
				console.log('第二步执行')
				this.uploadDishTwo();
				return;
			}

		} else if (page == 2) {

			if (this.data.stepList.length == 0) {
				title = '请添加至少一个步骤'
			} else {
				this.setData({
					currentPage: this.data.currentPage + 1
				})
				return;
			}
		} else if (page == 3) {
			this.uploadDishFour(2);
			return;
		}

		wx.showToast({
			title: title,
			icon: 'none',
			duration: 2000
		})
	},



	/*             
	              -公共方法-  上一步   -backLastPage-  
	 */
	backLastPage: function(e) {

		var page = e.currentTarget.dataset.page

		if (page == 1) {
			this.animation.translate(0, 0).step()
			this.setData({
				animation: this.animation.export()
			})
		} else {
			this.setData({
				currentPage: this.data.currentPage - 1
			})
		}
	},


	catchTouchMove: function(res) {
		return false
	},


	setObjectInfo: function(key, value) {

		var dishInfo = this.data.dishInfo;

		dishInfo[key] = value;

		this.setData({
			dishInfo: dishInfo
		})

		console.log(this.data.dishInfo);
	},

})
