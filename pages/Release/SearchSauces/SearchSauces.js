

import{
  getSauceAll
} from '../../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    labelStr: '',
    activity: false,
    tag: '',

    saucesStr: '',
    count: '0/3',

    cursor: 0,
    allSauces: [],
    searchResult: [],
    selectedSauces: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setStorageSync('isBackFrom', 'searchSauce');
    var saucesStr = options.sauceList;

    if (saucesStr) {
      var selectedSauces = JSON.parse( saucesStr );
      var count = selectedSauces.length +'/3';

      this.setData({
        selectedSauces,
        count
      })
    }

    this.getSauceAll();
  },

  tagsInput: function (e) {

    let that = this;
    var sauceName = e.detail.value;
    var searchResult = [];
    var cursor = e.detail.cursor;

    if (sauceName == '') { return; }
    if (cursor != that.data.cursor) {
      for (var i = 0; i < that.data.allSauces.length; i++) {
        var sauce = that.data.allSauces[i];
        if (sauce.sauceName.indexOf(sauceName) != -1) {
          searchResult.push(sauce);
          console.log(sauce.sauceName);
        }
      }
    }
    that.data.cursor = cursor;
    that.setData({
      searchResult
    })
    
  },

 


  selectedItem: function (e) {
    var index = e.currentTarget.dataset.index;

    if (this.data.selectedSauces.length >= 3) {
      wx.showToast({
        title: '最多选择3个酱汁',
        icon: 'none',
      })
      return;
    }

    var searchResult = this.data.searchResult;
    var sauce = searchResult[index];
    sauce.isChecked = true;
    this.ifAddTags(sauce);

    this.setData({
      searchResult
    })
  },
    

  delete: function (e) {
    var index = e.currentTarget.dataset.index;
    var selectedSauces = this.data.selectedSauces;
    var searchResult = this.data.searchResult;
    var sauce = selectedSauces[index].sauceName;
    var count = '';

    for (var i = 0; i < searchResult.length; i++) {
      if (sauce == searchResult[i].sauceName) {
        searchResult[i].isChecked = false;
      }
    }

    selectedSauces.splice(index,1);
    count = selectedSauces.length + '/3';

    this.setData({
      selectedSauces,
      searchResult,
      count
    })
  },


  ifAddTags: function (sauce) {
    var sum = 0;
    var selectedSauces = this.data.selectedSauces;
    var count = '';

    for (var i = 0; i < selectedSauces.length; i++) {

      if (sauce.sauceName == selectedSauces[i].sauceName) {
        sum ++;

        console.log(sauce.sauceName, selectedSauces[i].sauceName)
      } 
    }

    if (sum == 0) {
      sauce.isChecked = true;
      selectedSauces.push(sauce);
      count = selectedSauces.length + '/3';

      this.setData({
        count: count,
        selectedSauces: selectedSauces
      })
    } else {

      wx.showToast({
        title: '酱汁已存在',
        icon: 'none',
      })
    }
  },



  getSauceAll: function(){
    var that = this;
    getSauceAll({
      success: function(res){
        if(res.data.code === 1){

          var allSauces = res.data.data;
          var selectedSauces = that.data.selectedSauces;

          if (selectedSauces.length > 0) {
            for (var i = 0; i < selectedSauces.length; i++) {
              var sauce = selectedSauces[i];
              for (var j = 0; j < allSauces.length; j++) {
                if (selectedSauces[i].sauceName == allSauces[j].sauceName) {
                  allSauces[j].isChecked = true;
                }
              }
            }
          } else {
            for (var i = 0; i < allSauces.length; i++) {
              allSauces[i].isChecked = false;
            }
          }

          that.setData({
            allSauces
          })
        }
      }
    })
  },


  save: function () {
    let arr = getCurrentPages();
    let page = arr[arr.length - 2];
    var saucesStr = JSON.stringify( this.data.selectedSauces );

    page.setData({
      saucesStr: saucesStr
    })

    wx.navigateBack();
  }








})