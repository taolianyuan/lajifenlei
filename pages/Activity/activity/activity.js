// pages/Home/activity/activity.js

let app = getApp();

var actId = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // photos: '',
    // imgSrc: '',
    img: '',
    url: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/activity/',
    screenWidth: 0,
    screenHeight: 0,
    imgwidth: 0,
    imgheight: 0,
    imgSrc: '',
    photos: [],
    current: 0,
    isShow: false,
    showList:[]
  },


  //选择图片
  getImgurl: function () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        //启动上传等待中...  
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        this.setData({
          imgSrc: res.tempFilePaths
        })
      }
    })
  },
  //点击取消
  btnNo: function () {
    this.setData({
      imgSrc: ''
    })
  },
  onLoad: function (options) {
    // var picName = this.formatTime(new Date());

    // picName += '.jpg';
    // console.log(picName);

    // this.setData({
    //   img: picName
    // })  

  console.log(options,'activity里的options')

    if (options.scene){
      var scene = decodeURIComponent(options.scene)
      
      var actSceneId = scene.split('=')[1]

      actId = actSceneId
    }else{
      actId = options.actId
    }

    if(Number(actId) === 3){
      this.setData({
        showList: ['template-first.png?sign=36aea4f44e96a34f42661200a0823c2c&t=1548744226', 'template-second.png?sign=2980ce139fe62ea57c204320e0bca88f&t=1548744259','template-third.png?sign=d526d02c0d80a0d7c77c40a8b0070f46&t=1548744279'],
        photos: ['mode-2.png?sign=673bd325648123d51f1f62e7bfff817b&t=1548744345', 'mode-1.png?sign=046479d437ab69240749b4df472d9220&t=1548744365', 'mode-3.png?sign=f214f6eeda04ed8645f9e81bebf6dd75&t=1548744390']
      })
    }else if(Number(actId)=== 7){
      this.setData({
        showList: ['Valentine-activity/Valentine-1.jpg?sign=dbcc8b43839be33383a7812e8d05d75c&t=1548917425', 'Valentine-activity/Valentine-2.jpg?sign=08d391787081bd7e5be85d25714af4cb&t=1548917455','Valentine-activity/Valentine-3.jpg?sign=1ea602b2e2a15780442aa3f0ec25c808&t=1548917469'],
        photos: ['Valentine-activity/mode1.png?sign=c47a3c8f99cfe1081467ac6efc373dfd&t=1548938127', 'Valentine-activity/mode2.png?sign=c4be050445a094072273e24e736795c3&t=1548938147','Valentine-activity/mode3.png?sign=00373d456e864ec7c4fa939c4371e951&t=1548938161']
      })
    }

  },


  imageLoad: function (e) {

    var _this = this;
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;     
    var viewWidth = 600,           //设置图片显示宽度，
      viewHeight = 600 / ratio; 
    this.setData({
      imgwidth: viewWidth,
      imgheight: viewHeight,
      isShow: true
    })
  },



  DidSwiperFinished: function (e) {
    // console.log(e.detail.current,'---------')
    this.setData({
      current: e.detail.current
    })
  },

  confirmChoose: function () {
    var index = this.data.current;
    var photos = this.data.photos;
    console.log(photos[index],'photos[index]')
    app.globalData.photo = photos[index];

    app.globalData.userCurrent = index; 


    wx.navigateTo({
      url: '../createPic/createPic?actId='+ actId
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    this.setData({
      imgSrc: app.globalData.userImage
    })

    app.globalData.userImage = '';

    // var picName = this.formatTime(new Date());

    // picName += '.jpg';

    // console.log(picName);

    // this.setData({
    //   img: picName
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  //生成时间戳
  formatTime: function (date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var minutes = date.getMinutes()

    var picName = 'activity' + year + '-' + month + '-' + day + '-' + minutes;

    return picName;
  },

})