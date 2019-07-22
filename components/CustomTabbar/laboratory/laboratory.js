

import{
 getSauceList
} from '../../../api/api.js';

var leftList = new Array();//左侧集合
var rightList = new Array();//右侧集合
var leftHight = 0, rightHight = 0, itemWidth = 0, maxHeight = 0;
var app = getApp();

Component({


  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgDomain: getApp().globalData.imgDomain,
    loadingCount: 0,
    sauceList: [],
    current: 0,
    srcs:[],
    menuList: [
      {title: '凉拌', isChecked:  true},
      {title: '腌制', isChecked: false},
      {title: '热烹', isChecked: false},
      {title: '配餐', isChecked: false},
      {title: '蘸料', isChecked: false},
      // {title: '烧烤', isChecked: false},
    ],
    statusArr: [],
    statusAll: 0,
    // isIphoneX : app.globalData.isIphoneX,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    didSelectedItem: function (e) {
      var oid = e.currentTarget.dataset.oid;
      wx.navigateTo({
         url: '../../Piazza/DynamicDetail/DynamicDetail?objectId=' + oid + '&objectType=sauce' + '&isFrom=normal'
      })

    },

    menuClicked: function (e) {
      var current = e.currentTarget.dataset.index;
      var menuList = this.data.menuList;

      menuList[current].isChecked = true;

      for (var i = 0; i < menuList.length; i++) {
        if (i != current) {
          menuList[i].isChecked = false;
        }
      }

      this.setData({
        menuList: menuList,
        current: current
      })
    },

    bindchange: function (e) {

      if (e.detail.source == 'touch') {
        var current = e.detail.current;
        var menuList = this.data.menuList;

        menuList[current].isChecked = true;

        for (var i = 0; i < menuList.length; i++) {
          if (i != current) {
            menuList[i].isChecked = false;
          }
        }

        this.setData({
          current: current,
          menuList: menuList
        })
      }
    },

    getSauceList: function () {
    var that = this;
      getSauceList({
        success: function (res) {

          if (res.data.code == 1) {

              var data = res.data.data;
              var sauceList = [data.LB, data.YZ, data.RP, data.PC, data.ZL];
              var statusArr = [];

              if (sauceList.length > 0) {
                for (var i = 0; i < sauceList.length; i++) {
                  var arr = sauceList[i];
                  var status = arr == null ? 2 : 1;
                  statusArr.push(status);
                }
              }
              

              that.setData({
                statusAll: 1,
                statusArr: statusArr,
                sauceList: sauceList
              })

              console.log(that.data.sauceList)
          }
        },
        fail: function (res) {
          var statusArr = [0,0,0,0,0,0];
          that.setData({
            statusAll: 3,
            statusArr: statusArr
          })
        }
      })
    },


    confirmEvent: function () {
      this.getSauceList();
    },

  },

  attached: function () {
    this.getSauceList();
  },


  












})
