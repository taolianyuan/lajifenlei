
import{
  getDishDetail,
  getFansInfo,
  getActivity
} from '../../../api/api.js';

var objectType = '';
var objectId = 0;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  queryUser: function () {
    if (objectId.length < 16) {
      wx.showToast({
        title: '非用户 ID',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    var that = this;
    getFansInfo({
        data: { userId: objectId },
        success: function (res) {

          if (res.data.code == 1) {
            that.setData({
              result: res.data.data.nickName
            })

          } else {
            wx.showToast({
              title: '网络繁忙,稍后再试~',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
  },

  queryObject: function () {

    var that = this;

    if (objectId != '' && objectType != '') {
      if (objectType != 'dish' && objectType != 'sauce') {
        wx.showToast({
          title: '查询酱汁/菜谱类型错误',
          icon: 'none',
          duration: 2000
        })
      } else {
        getDishDetail({
          data: {
            objectId: objectId,
            objectType: objectType
          },
          success: function(res) {

            if (res.data.code == 1) {
              that.setData({
                result: res.data.data.other.objectName
              })
            }
          }
        })
      }
    } else {
      wx.showToast({
        title: '查询酱汁/菜谱信息不全',
        icon: 'none',
        duration: 2000
      })
    }
  },


  queryActivity: function (){

    
      var that = this;
      getActivity({
        success: function(res) {
          if (res.data.code == 1) {
            var list = res.data.data;

            for (var i = 0; i < list.length; i++) {;
              var act = list[i];
              if (act.actId == objectId) {
                console.log(act.actName)
                that.setData({
                  result: act.actName
                })
              }
            }
          } else {
            wx.showToast({
              title: '网络繁忙,稍后再试~',
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail: function(res) {
          that.setData({
            status: 3
          })
        }
      })
    },

  idInput: function (e) {
    var text = e.detail.value;
    text = text.replace(/\s+/g,""); 
    objectId = text;
  },

  typeInput: function (e) {
    var text = e.detail.value;
    text = text.replace(/\s+/g,""); 
    objectType = text;
  
  },
  

  



})