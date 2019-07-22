// pages/test/test.js
import WeCropper from '../../utils/we-cropper/we-cropper.js'

const app = getApp()
const config = app.globalData.config

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight+8;

const cuttingWidth = 0;
const cuttingHeight = 0;

var options = '';


Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      targetId: 'targetCropper',
      pixelRatio: device.pixelRatio,
      width,
      height,
      scale: 2,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300
      },
      boundStyle: {
        color: config.getThemeColor(),
        mask: 'rgba(0,0,0,0.8)',
        lineWidth: 1
      }
    }
  },
  touchStart(e) {
    this.cropper.touchStart(e)
  },
  touchMove(e) {
    this.cropper.touchMove(e)
  },
  touchEnd(e) {
    this.cropper.touchEnd(e)
  },
  getCropperImage() {
    this.cropper.getCropperImage()
      .then((src) => {
        // wx.previewImage({
        //   current: '', // 当前显示图片的http链接
        //   urls: [src] // 需要预览的图片http链接列表
        // })

        app.globalData.finalImage = src;
        app.globalData.isClick = false;
        if (options == 'releaseMenu'){
          app.globalData.isChange = true
        } else if (options == 'addstep'){
          app.globalData.isChange = false
        }
        wx.navigateBack();
      })
      .catch(() => {
        console.log('获取图片地址失败，请稍后重试')
      })
  },
  onLoad(option) {
    options = option.isform
   
    var that = this;

    const { cropperOpt } = this.data

    cropperOpt.boundStyle.color = config.getThemeColor()

    if (options == 'releaseMenu' || options == 'addstep') {
      cropperOpt.cut.height = 300;
      cropperOpt.cut.y = (height - 300) / 2;
      // app.globalData.isChange = true
    }

    this.setData({ cropperOpt })

    this.cropper = new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        wx.hideToast()
      })

    const src = app.globalData.coverImage;
    this.cropper.pushOrign(src)
  },
})