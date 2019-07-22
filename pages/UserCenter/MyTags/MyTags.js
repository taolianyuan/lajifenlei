import {
	uploadUserInfo
} from '../../../api/api.js'

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tags: '',
		labelList: [],
		activity: false,
		tag: '',
		recommendLabels: [{
				name: '锦鲤',
				isChecked: false
			},
			{
				name: '佛系养生',
				isChecked: false
			},
			{
				name: '中年少女',
				isChecked: false
			},
			{
				name: '真香',
				isChecked: false
			},
			{
				name: '土味',
				isChecked: false
			},
			{
				name: '面筋哥',
				isChecked: false
			},
		],
		count: '0/5',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

		var tags = options.tags;

		let arr = getCurrentPages();
		let page = arr[arr.length - 2];


		var tagsList = tags.split(" ");
		var count = tagsList.length + '/5';
		var labelList = this.data.labelList;
		var recommendLabels = this.data.recommendLabels;

		if (tags == '' || tags == null || tags == undefined) {
			page.setData({
				tags: ''
			})

			return;
		}

		for (var i = 0; i < tagsList.length; i++) {
			var tag = {
				name: tagsList[i],
				isChecked: true
			};
			for (var j = 0; j < recommendLabels.length; j++) {
				if (tagsList[i] == recommendLabels[j].name) {
					recommendLabels[j].isChecked = true;
				}
			}
			labelList.push(tag);
		}
		this.setData({
			recommendLabels,
			labelList,
			count,
		})
	},

	tagsInput: function(e) {
		var text = e.detail.value;
		var length = this.data.labelList.length;
		var count = length + '/5'

		this.setData({
			count: count,
			tag: text
		})
	},

	getFocus: function() {
		this.setData({
			activity: true
		})
	},

	lostFocus: function(e) {
		var text = e.detail.value;
		this.setData({
			activity: false,
			tag: text
		})
	},



	addTags: function() {
		var text = this.data.tag;

		if (text == '') {
			wx.showToast({
				title: '标签不可为空',
				icon: 'none',
			})
			return;
		}

		var labelList = this.data.labelList;
		var tag = {
			name: text,
			isChecked: true
		};

		this.ifAddTags(tag);

		this.setData({
			tag: ''
		})
	},


	selectedItem: function(e) {
		var index = e.currentTarget.dataset.index;
		var recommendLabels = this.data.recommendLabels;
		// var isChecked = list[index].isChecked;

		var tag = recommendLabels[index];

		this.ifAddTags(tag);

		this.setData({
			recommendLabels: recommendLabels,
		})
	},


	delete: function(e) {
		var index = e.currentTarget.dataset.index;
		var labelList = this.data.labelList;
		var recommendLabels = this.data.recommendLabels;
		var tagNameS = labelList[index].name;
		var count = '';

		for (var i = 0; i < recommendLabels.length; i++) {
			if (tagNameS == recommendLabels[i].name) {
				recommendLabels[i].isChecked = false;
			}
		}

		labelList.splice(index, 1);
		count = labelList.length + '/5';



		this.setData({
			labelList,
			recommendLabels,
			count
		})
	},


	ifAddTags: function(tag) {
		var sum = 0;
		var labelList = this.data.labelList;
		var count = '';

		if (labelList.length < 5) {

			for (var i = 0; i < labelList.length; i++) {

				if (tag.name == labelList[i].name) {
					sum++
				}
			}

			if (sum == 0) {

				tag.isChecked = true;
				labelList.push(tag);
				count = labelList.length + '/5';

				this.setData({
					count: count,
					labelList: labelList
				})

				return true;
			} else {

				wx.showToast({
					title: '标签已存在',
					icon: 'none',
				})
			}
			return false;

		} else {

			wx.showToast({
				title: '最多添加5个标签',
				icon: 'none',
			})
			return false;
		}
	},


	uploadUserInfo: function() {

		var that = this;
		var labelList = that.data.labelList;
		var tags = '';

		for (var i = 0; i < labelList.length; i++) {
			if (i == labelList.length - 1) {
				tags += labelList[i].name;
			} else {
				tags += (labelList[i].name + ' ');
			}
		}

		// console.log(tags,'-----------')

		uploadUserInfo({
			data: {
				tags: tags
			},
			success: function(res) {
				if (res.data.code == 1) {

					let arr = getCurrentPages();
					let page = arr[arr.length - 2];

					page.setData({
						tags: tags
					})

					wx.showToast({
						title: '保存成功',
						icon: 'success',
						success: function() {
							setTimeout(function() {
								wx.navigateBack({
									delta: 1
								})
							}, 500)
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














})
