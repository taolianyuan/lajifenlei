
const localData = require('../../../utils/localData');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataSource: localData.cookTypeList,
    selectionList: [],
    currentPage: 0,
    result: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      wx.setStorageSync('isBackFrom', 'dishCookingType');
      var selectionList = this.data.dataSource;
      console.log(selectionList)
      var cookingStr = options.cookingType;

      console.log(cookingStr,'cookingStr')
      var result = JSON.parse( cookingStr );

      for (var i = 0; i < selectionList.length; i++) {

        var superData = selectionList[i];
        var subList = superData.cookList;

        for (var k = 0; k < result.length; k++) {

          var cookTypeS = result[k];

          for (var j = 0; j < subList.length; j++) {

            var cookTypeD = subList[j];

            if (cookTypeS.cookId == cookTypeD.cookId) {
              
              cookTypeD.isChecked = true;
            }
          }
        }
      }

      this.setData({
        selectionList,
        result
      })
  },

  

  save: function() {
    var that = this;
    let arr = getCurrentPages();
    let page = arr[arr.length - 2];
    var result = this.data.result;
    var jsonStr = JSON.stringify( result );

    page.setData({
      typeStr: jsonStr
    })
    wx.navigateBack({
      detal: 1,
    });
  },


selectItems: function (e) {
  var result = this.data.result;
  var section = e.currentTarget.dataset.section;
  var index = e.currentTarget.dataset.index;
  var selectionList = this.data.selectionList;
  var typeList = selectionList[section].cookList;
  var type = typeList[index];
  
  var isChecked = !type.isChecked;

  if (result.length < 3) {
    type.isChecked = !type.isChecked;
    if (isChecked) {
        result.push(type);
    } else {
      for (var i = 0; i < result.length; i++) {
        if (type.cookName == result[i].cookName) {
           result.splice(i, 1);
        }
      }
    }
  } else {
    if (isChecked) {
      wx.showToast({
        title: '最多选择三个',
        icon: 'none',
        duration: 1000
      })
    } else {
      for (var i = 0; i < result.length; i++) {
        if (type.cookName == result[i].cookName) {
           result.splice(i, 1);
        }
      }
      type.isChecked = false;
    }
  }

  this.data.result = result;
  this.setData({
    selectionList,
  })

}








})