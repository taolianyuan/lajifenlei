// pages/Home/Dinner/Details/Details.js
var globalData = getApp().globalData;
const app = getApp();

import {
  getrestauranttaste,
  insertrestaurantrecord //提交
} from '../../../../api/api.js';


Page({

  /**
   * 页面的初始数据
   */
  data: {

    ishow: false,
    value: ""
    // productsList:[
    //   {
    //     title: '龙虾'
    //   },
    //   {
    //     title: '烧烤'
    //   },
    //   {
    //     title: '火锅店'
    //   }
    //   ,
    //   {
    //     title: '牛排店'
    //   }
    // ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
     
    var that = this
    var businessKey = wx.getStorageSync('businessKey');
    var recordId = wx.getStorageSync("recordId")
    console.log(recordId)

    //  console.log(businessKey)
    //  console.log(options)
    var goodsid = options.goodaid

    that.getrestauranttaste(goodsid)
    that.setData({
      goodsid: goodsid,
      businessKey: businessKey,
      recordId: recordId,
      getid: options.id //获取分享链接的参数
    })

    // console.log(options.id)  //获取分享链接的参数
    // console.log(options)
    // var goods = options.goodaid
    // console.log(goods)
    // var that = this
    // that.setData({
    //   title: that.data.productsList[goods].title
    // })

    this.dialog = this.selectComponent("#dialog");
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo == null || userInfo == "") {
      this.showDialog();
      this.setData({
        isLogin: false,
      })
    } else {
      this.setData({
        isLogin: true
      })
    }
  },


  showDialog: function() {
    this.dialog.showDialog();
  },

  confirmEvent: function() {
    this.dialog.hideDialog();
  },

  cancleEvent: function() {
    this.dialog.hideDialog();
  },


  //  获取口味数据

  getrestauranttaste: function(goodsid) {
    var that = this;
    getrestauranttaste({
      data: {
        tasteId: goodsid
      },
      success: function(res) {
        console.log(res, "+++++++++++")
        if (res.data.code == 1) {
          //console.log(res.data.data.drinks)
          that.setData({
            // recommendList: res.data.data.records
            drinks: res.data.data.drinks,
            taste: res.data.data.taste,
            tastelist: res.data.data.tastelist,
            tastelists: res.data.data.tastelist
          })
        }
      }
    })
  },



  btns: function(e) {
    // console.log(e.currentTarget.dataset.index)
    // console.log(e.currentTarget.dataset.id)
    //  var that = this
    // let id = e.currentTarget.dataset.id; //获取id
    // let index = e.currentTarget.dataset.index //获取下标
    // let param = that.data.tastelist[index]
    // console.log(param)
  },

  // 多选
  // checkboxChange: function (e) {
  //   console.log(e)
  //   var that = this
  //   var checked = e.detail.value
  //   console.log(checked)
  //   var param = that.data.tastelist.length
  //   var changed = {}
  //   for (var i = 0; i < param; i++) {
  //     if (checked.indexOf(this.data.tastelist[i].tasteId) !== -1) {
  //       changed['tastelist[' + i + '].checked'] = true
  //       that.setData({
  //         values: e.detail.value
  //       })
  //     } else {
  //       changed['tastelist[' + i + '].checked'] = false
  //     }
  //   }
  //   this.setData(changed)
  // },


  checkboxChange: function(e) {
    //console.log(e)
    var that = this
    var values = e.detail.value

    var param = that.data.tastelist.length
    that.setData({
      values: e.detail.value
    })

    //var changed = {}
    // for (var i = 0; i < param; i++) {
    //   if (checked.indexOf(this.data.tastelist[i].tasteId) !== -1) {
    //     changed['tastelist[' + i + '].checked'] = true
    //     that.setData({
    //       values: e.detail.value
    //     })
    //   } else {
    //     changed['tastelist[' + i + '].checked'] = false
    //   }
    // }
    // this.setData(changed)
  },




  // 单选
  radioChange: function(e) {
    console.log(e)
    var that = this
    // console.log(e)
    var checked = e.detail.value
    console.log(checked, "+++++++++++++++++")
    var param = that.data.tastelists.length
    // console.log(param)
    var changed = {}
    for (var i = 0; i < param; i++) {
      if (checked.indexOf(that.data.tastelists[i].tasteId) !== -1) {
        changed['tastelists[' + i + '].checked'] = true
        that.setData({
          value: e.detail.value
        })
      } else {
        changed['tastelists[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },


  bts: function() {
    var that =this
    var businessKey = this.data.businessKey
    var getid = this.data.getid
    console.log(getid, "我是分享进来的")
    var recordId = this.data.recordId

    var ids = this.data.goodsid
    // console.log(ids)
    var avalues = this.data.values
    var svalue = this.data.value
    // console.log(avalues)
    // console.log(svalue)
    // var tt = [avalues,svalue]
    // console.log(tt)
    var merge = this.data.values.concat(svalue) //插入数组
   // console.log(merge, "++++++")
    // this.setData({
    //   df: this.data.values.concat(svalue)
    // })
    insertrestaurantrecord({
      data: {
        restaurantId: ids,
        businessKey: businessKey,
        tastelist: merge,
        matchingId: recordId
      },
      success: function(res) {
        if (res.data.code == 1) {
          var recordId = res.data.data["0"].recordId
          // console.log(recordId)
          wx.setStorageSync('recordId', recordId)

          var markes = JSON.stringify(res.data.data["0"].restaurantTastes)
          
          console.log(markes,"++++++++++++")
          wx.showToast({
            title: '生成订单中',
            icon: 'none',
            duration: 1000
          })
          // that.setData({
          //   recordId: recordId
          // })

          if (getid == 1) {
             // 判断是否从分享进来
            wx.navigateTo({
              url: '/pages/Home/Dinner/matching/matching',
            })
          } else {
            wx.navigateTo({
              url: '/pages/Home/Dinner/Result/Result?markes=' + markes,
            })
          }
        } else {
          wx.showToast({
            title: '提交失败',
            icon: 'none',
            duration: 1500
          })
        }
       // console.log(res)
      }
    })
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
    var userInfo = wx.getStorageSync('userInfo');

    if (userInfo == null || userInfo == "") {
      return;
    } else {
      // this.getUserInfo();
      this.setData({
        isLogin: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

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

  }
})