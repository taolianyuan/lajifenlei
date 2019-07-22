// pages/Home/Assistant/Assistant.js

const app = getApp();
var globalData = getApp().globalData;

import {
  getGarbageList, //查询垃圾
  getClassificationByGarbage,
  getspeechToText,
  getGarbageHotWordList //关键词
} from '../../../api/api.js';

const recorderManager = wx.getRecorderManager() //创建录音
 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    inputVal: "",
    inputValEn:"",
    goods_name: [],
    isbind: false, //点击 隐藏 
    show: false, //判断搜索框是否有内容   显示/隐藏

    hiddns: false, //点击垃圾桶先显示  

    wesb: false,

    filePath: "",
    list: [
      {
      // 回收
      a1: "a1",
      img: "/img/Recyclable.png",
      aimg: "/img/Recy.png",

      simg: "https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/Re.png?sign=6fa69ee629fb7cc2f344a0956c2e6f55&t=1561964633",
       
      //  没有彩蛋的图片
      simgs:'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/Res.png?sign=a5bfb182946309ec10ef3d28d49a6fb3&t=1561971221',
      
        simgsEN:"https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/ResEN.png?sign=aa9f366fd93a49ef49585c64a62485b2&t=1562314830",
      ids: 200,
      eggs:"color: #2E4FA1",
      text:"废纸张、废塑料、废玻璃制品、废金属、废织物等；适宜回收、可循环废弃物",
      texten:"uitable for recycling and resource utilization, such as: glass,Gold, plastic, paper, clothing, etc."
    },
    {
      // 有害
      a1: "a2",
      img: "/img/HarmfulWaste.png",
      aimg: "/img/Har.png",
      simg: "https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/Har.png?sign=2e3a1baae510d87e58d7a0586a551c78&t=1561967026",
      simgs:"https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/Hars.png?sign=c82a02b28dbdff8f77fd9ab55cc58c34&t=1561971239",
      simgsEN: "https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/HarsEN.png?sign=9529ac968c99ecdb323b449c28b84fdb&t=1562314817",
      ids: 400,
      eggs: "color: #D0021B ",
      text:"对人体健康或者自然环境造成直接或 潜在危害的废弃物",
      texten:"Waste that directly or potentially harms human health or the natural environment"
    },
    {
      // 湿垃圾
      a1: "a3",
      img: "/img/Wetgarbage.png",
      aimg: "/img/Wet.png",
      simg: "https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/Wet.png?sign=fdf4a69085cb90a01babcfb7e23d58f8&t=1561964615",
      simgs:"https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/Wets.png?sign=1e6b3fd34dd99a750c16c88e960bbf36&t=1561971196",
      simgsEN: "https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/WetsEN.png?sign=7ea3e7643599669be3adf47d651883c6&t=1562314848",
      ids: 300,
      eggs: "color: #674036",
      text:"日常生活垃圾产生的容易腐烂的生物 质废弃物",
      texten:"Perishable biomass waste from household waste"
    },
    {
      // 干垃圾
      a1: "a4",
      img: "/img/Drygarbage.png",
      aimg: "/img/Dry.png",
      simg: "https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/Dry.png?sign=41a46a7c4aade225ccc686f28852ef48&t=1561964678",
      simgs:"https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/Drys.png?sign=af066256a2d55d61073978b0eecabbd1&t=1561971253",
      simgsEN: "https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/DrysEN.png?sign=c4ce2f1b4d564ab4eb36916869ce6d86&t=1562314793",
      ids: 100,
      eggs: "color: #2B2B29",
      text:"除有害垃圾、可回收物、湿垃圾以外 的其他生活废弃物",
      texten:"Domestic waste other than hazardous waste, recyclables, and wet waste "
    },
    ],

    lists: [{
      imgs: "https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/Recyclable.png?sign=9696b61d249105cb798107c05878b4d6&t=1561802118",
      imgsEN:"https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/RecyclableEN.png?sign=80a78a188bd28810fff6225003df8c98&t=1562313482",
      index: 0,
      classimg: "classimg1",
      classimgen:"classimg1En"
    }, {
      imgs: "https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/HarmfulWaste.png?sign=c3852671874b95b045b2e2b15d59f72c&t=1560864836",
        imgsEN: "https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/HarmfulWasteEN.png?sign=ed28d2c38d8defc89b02426b1778af21&t=1562313464",
      index: 1,
       classimg: "classimg2",
      classimgen: "classimg2En"
    },
    {
      imgs: "https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/Wetgarbage.png?sign=51bbca2089909acf76d2cdf619aa265e&t=1560926405",
      imgsEN: "https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/WetgarbageEN.png?sign=d58e1f79b2b4bccbd91f2a8131e41c72&t=1562313503",
      index: 2,
      classimg: "classimg3",
      classimgen: "classimg3En"
    },
    {
      imgs: "https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/Drygarbage.png?sign=bff3c80f04a63b8ad7bbc4bb9216bf6a&t=1560926437",
      imgsEN: "https://7465-test-9cd88e-1258312722.tcb.qcloud.la/images/DrygarbageEN.png?sign=316be6720416e0c548c3fda1614cad9b&t=1562313437",
      index: 3,
      classimg: "classimg4",
      classimgen: "classimg4En"
    }
    ],

    shownull: false,
    showmicro: false,
    garbageType: "",

    // 此页面 页面内容距最顶部的距离
    height: app.globalData.systeminfo.statusBarHeight * 2 + 20,

    hideModal: true, //模态框的状态  true-隐藏  false-显示
    animationData: {},//
     
    items:[ 
      { name: 1536, value: '普通话', values: "Mandarin", selected: true},
      { name: 1637, value: '粤语话', values: "Cantonese"},
      { name: 1837, value: '四川话', values: "Sichuan dialect"},
    ],
    //radios:"1536",

    radio:"1536",
    languageType:"1",
    //switchs:true,
    //switchcon:true
  },


  radioChange: function (e) {
    console.log(e)
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var radio = e.detail.value
    this.setData({
      radio: radio
    })
    let radios = { radio : radio }
    wx.setStorage({
      key: 'radios',
      data: radios
    })
  },

  switch1Change: function (e) {
    var that = this
    var switchcon = e.detail.value
    wx.setStorageSync("switchs", switchcon)
    console.log(switchcon)
    if (switchcon == true){
        //console.log("true")
        // 为true 是中文
        that.setData({
          languageType:1,
          switchcon: switchcon,
          //switchse: false
        })
    }else{
      //console.log("false")
       that.setData({
         languageType:2,
         switchcon: switchcon,
         //switchse: true
       })
    }
  },

  // 清除搜索框值
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputValEn:"",
      garbageType: "",
      show: false,
      isbind: true,
      // datase: 1,
      hiddns: true,
      wesb: true
    });
  },

  // 
  discount: function () {
    wx.navigateTo({
      url: '/pages/Home/Classes/Lesson/Lesson',
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.initRecord()
    var that = this
 
    //var switchs = that.data.switchs
     //swx.setStorageSync("switchs", switchs)
     var switchs = wx.getStorageSync('switchs')
    
    //console.log(switchs)
    if (switchs !== ''){
      that.setData({
        switchcon: switchs,
      })
    }else{
      wx.setStorageSync('switchs',true)
      var switchs = wx.getStorageSync('switchs')
      that.setData({
        switchcon: switchs,
      })
    }
  
    var hotWordlist = wx.getStorageSync('hotWordlist')
    // console.log(hotWordlist,"+++++++++++++++++")
    var radios = that.data.items
    console.log(radios)
      // 获取缓存
     wx.getStorage({
        key: 'radios',
        success:function(res){
          console.log(res.data.radio,"+++++++++++++++")
          if(res.data.radio == 1536){
            radios[0].selected = true
          } else if (res.data.radio == 1637){
            radios[1].selected = true
          } else if (res.data.radio == 1837){
            radios[2].selected = true
          }
          that.setData({
            radio: res.data.radio,
            items:radios
          })
        }
      })
     that.setData({
       hotWordlist: hotWordlist,
     })

    // console.log(that.data.as)
    //  判断语言
    var language = app.globalData.systeminfo.language
    //console.log(language)
    wx.setStorageSync('language', language)  //缓存语言

    // if (language == "zh_CN"){
    //   //console.log("我是中文")
    //   that.setData({
      
    //   })
    // } else if (language == "zh_EN"){
    //  // console.log("我是英文")
    // }
    that.getGarbageHotWordList()
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
  

  showDialog: function () {
    this.dialog.showDialog();
  },

  confirmEvent: function () {
    this.dialog.hideDialog();
  },

  cancleEvent: function () {
    this.dialog.hideDialog();
  },


  // 查询关键词
  getGarbageHotWordList:function(){
    var that = this
    var code;
      code =''
    var random = Math.floor(Math.random() * 9) //随机数
    //var lists= []
    //console.log(random)
    wx.showLoading({
      title: '加载中...',
      mask: true
    }) 
    getGarbageHotWordList({
      success:function(res){
        if (res.data.code == 1) {
          wx.hideLoading()
          var code = res.data.data[random]
          //console.log(code, "++++++++++++++++++++++++")
          var lists = res.data.data
          lists.splice(random, 1)
          //console.log(lists,"________________")
          wx.setStorageSync('hotWordlist', lists)
           
          that.setData({
            hotWordlist: lists,
            inputVal: code.garbageName,
            inputValEn: code.garbageNameEn
            // list: lists
          })
        }else{
          wx.hideLoading(),
          wx.showToast({
            title: '加载失败',
            icon:"none",
            duration:1000,
          })
        }
      }
    })
  },


  //input
  bindInputName: function (e) {
    // console.log(e)
    var _inputVal = e.detail.value
    var _inputValEn = e.detail.value
    var _cursor = e.detail.cursor
    var that = this
    var switchs_con = wx.getStorageSync('switchs')
   // var switchs_con = that.data.switchcon
      //console.log(switchs_con)
    if (switchs_con ==true ){
         that.setData({
           languageType: 1,
         })
    }else{
      that.setData({
        languageType: 2,
      })
    }
    var languageTypes= this.data.languageType
    // wx.showLoading({
    //   title: '加载中...',
    //   mask: true
    // })
    that.setData({
      inputVal: _inputVal,
      inputValEn: _inputValEn
    })
    // 判断是否为空
    if (languageTypes == 1){
      if (_inputVal != 0) {
        wx.hideLoading()
        getGarbageList({
          data: {
            garbageName: _inputVal,
            languageType: languageTypes
          },
          success: function (res) {
            //console.log(res, "++++++++++++")
            if (res.data.code == 1) {
              wx.hideLoading()
              that.setData({
                datase: res.data.data,
                show: true
              })
              if (res.data.data == "") {
                //console.log("空")
                that.setData({
                  isbind: true,
                  wesb: false,
                  garbageType: "",
                  hiddns: true
                })
              }
              if (res.data.data.length > 0) {
                //console.log("_________________________")
                that.setData({
                  goods_name: res.data.data,
                  // inputVal: _inputVal,
                  goods_len: res.data.data.length,
                  show: true,
                  isbind: false,
                  hiddns: true
                })
              } else {
                that.setData({
                  // inputVal: _inputVal,
                  isbind: true,
                  datase: res.data.data
                })
              }
            } else {
              wx.hideLoading()
              wx.showToast({
                title: '网络是否错误',
                duration: 2000,
                icon: "none"
              })
              that.setData({
                // inputVal: _inputVal,
              })
            }
          }
        })
      } else {
        console.log("我是空", that.data.inputVal)
        wx.hideLoading()
        that.setData({
          goods_name: "",
          show: false,
          isbind: true,
          garbageType: "",
          datase: 1,
          inputVal: "",
          wesb: true,
        })
        return
      }
    }else{
      if (_inputValEn != 0) {
        wx.hideLoading()
        getGarbageList({
          data: {
            garbageName: _inputValEn,
            languageType: languageTypes
          },
          success: function (res) {
            //console.log(res, "++++++++++++")
            if (res.data.code == 1) {
              wx.hideLoading()
              that.setData({
                datase: res.data.data,
                show: true
              })
              if (res.data.data == "") {
                //console.log("空")
                that.setData({
                  isbind: true,
                  wesb: false,
                  garbageType: "",
                  hiddns: true
                })
              }
              if (res.data.data.length > 0) {
                //console.log("_________________________")
                that.setData({
                  goods_name: res.data.data,
                  // inputVal: _inputVal,
                  goods_len: res.data.data.length,
                  show: true,
                  isbind: false,
                  hiddns: true
                })
              } else {
                that.setData({
                  // inputVal: _inputVal,
                  isbind: true,
                  datase: res.data.data
                })
              }
            } else {
              wx.hideLoading()
              wx.showToast({
                title: '网络是否错误',
                duration: 2000,
                icon: "none"
              })
              that.setData({
                // inputVal: _inputVal,
              })
            }
          }
        })
      } else {
        // console.log("我是空", that.data.inputVal)
        wx.hideLoading()
        that.setData({
          goods_name: "",
          show: false,
          isbind: true,
          garbageType: "",
          datase: 1,
          inputValEn: "",
          wesb: true,
        })
        return
      }
    }
  },

  // textinput: function() {
  //   this.setData({
  //     focus: true
  //   })
  // },
  // 垃圾类型：
  //  100：干垃圾，
  //  101：有异议的垃圾，
  //  300：湿垃圾，
  //  200：可回收垃圾，
  //  400：有害垃圾，
  //  500：大件垃圾/装修垃圾，
  //  700：非日常生活垃圾


  toGoodsinfo: function (e) {
    // console.log(e.currentTarget.dataset.name, "_____________")
    var that = this
    var inputVals = e.currentTarget.dataset.name
    
    var inputValEn = e.currentTarget.dataset.name

    var switchs_con = that.data.switchcon
    console.log(switchs_con) 
    if (switchs_con == true) {
     // console.log("11111")
      that.setData({
        languageType: 1,
      })
    } else {
     // console.log("22222")
      that.setData({
        languageType: 2,
      })
    }
    var languageTypes = this.data.languageType
    that.setData({
      inputVal: inputVals,
      inputValEn: inputValEn,
      isbind: true, //点击隐藏
      show: true,
      datase: "1",
      wesb: true,
    })
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    if (languageTypes == 1){
      getClassificationByGarbage({
        data: {
          garbageName: inputVals,
          languageType: languageTypes
        },
        success: function (res) {
 
          if (res.data.code == 1) {
            wx.hideLoading()
            if (res.data.data.garbageName == null) {
              // console.log(" ========",res.data.data)  
              that.setData({
                chaxu: res.data.data.garbageName,
                //wesb: false
              })
            } else {
              if (res.data.data.garbageType == 0) {
                //console.log(res.data.data.garbageType,"+______________________")
                that.setData({
                  wesb: false,
                })
              }
              that.setData({
                garbageType: res.data.data.garbageType,
                garbageName: res.data.data.garbageName,
                garbageNameEn: res.data.data.garbageNameEn,
                garbageTypeName: res.data.data.garbageTypeName,

                keywaordShareCpntent: res.data.data.keywaordShareCpntent,
                hiddns: true,
              })
            }
          } else {
            wx.showToast({
              title: '检查网络是否错误',
              duration: 1500,
              icon: "none"
            })
          }
        }
      })
    }else{
      getClassificationByGarbage({
        data: {
          garbageName: inputValEn,
          languageType: languageTypes
        },
        success: function (res) {
          // console.log(res, "!!!!!!!!!!!!!!!!") 
          if (res.data.code == 1) {
            wx.hideLoading()
            if (res.data.data.garbageName == null) {
              // console.log(" ========",res.data.data)  
              that.setData({
                chaxu: res.data.data.garbageName,
                //wesb: false
              })
            } else {
              if (res.data.data.garbageType == 0) {
                //console.log(res.data.data.garbageType,"+______________________")
                that.setData({
                  wesb: false,
                })
              }
              that.setData({
                garbageType: res.data.data.garbageType,
                garbageName: res.data.data.garbageName,
                garbageNameEn: res.data.data.garbageNameEn,
                garbageTypeName: res.data.data.garbageTypeName,
                //keywaordShareCpntent: res.data.data.keywaordShareCpntent,
                hiddns: true,
              })
            }
          } else {
            wx.showToast({
              title: '检查网络是否错误',
              duration: 1500,
              icon: "none"
            })
          }
        }
      })
    }
   
  },


  // 查询垃圾 
  toGoodsinfos: function (e) {
    var that = this
    var _inputVals = that.data.inputVal

    var _inputValEn = that.data.inputValEn
    //console.log(_inputValEn, "+++++")
    var switchs_con = that.data.switchcon
    //console.log(switchs_con)
    if (switchs_con == true) {
      // console.log("11111")
      that.setData({
        languageType: 1,
      })
    } else {
      // console.log("22222")
      that.setData({
        languageType: 2,
      })
    }
    var languageTypes = this.data.languageType

    that.setData({
      isbind: true,
      show: true,
      hiddns: true,
      //wesb:false
    })

    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    if (languageTypes == 1){
      if (_inputVals == "") {
        wx.hideLoading()
        wx.showToast({
          title: '请输入关键词',
          duration: 1500,
          icon: "none"
        })
      } else {
          getClassificationByGarbage({
            data: {
              garbageName: _inputVals,
              languageType: languageTypes
            },
            success: function (res) {
              // console.log(res)
              if (res.data.code == 1) {
                wx.hideLoading()
                if (res.data.data.garbageName == null) {
                  // console.log(" ========",res.data.data)  
                  that.setData({
                    chaxu: res.data.data.garbageName,
                    wesb: false,
                    garbageType: ""
                  })
                } else {
                  // if (res.data.data.garbageType == 0){
                  //    console.log(res.data.data.garbageType,"+______________________")
                  // }
                  that.setData({
                    garbageType: res.data.data.garbageType,
                    garbageName: res.data.data.garbageName,
                    garbageNameEn: res.data.data.garbageNameEn,
                    garbageTypeName: res.data.data.garbageTypeName,
                    keywaordShareCpntent: res.data.data.keywaordShareCpntent,
                    // wesb:false
                  })
                }
              } else {
                //console.log('111111')
              }
            }
          })

      }
    }else{
      if (_inputValEn == "") {
        wx.hideLoading()
        wx.showToast({
          title: '请输入关键词',
          duration: 1500,
          icon: "none"
        })
      } else {
          getClassificationByGarbage({
            data: {
              garbageName: _inputValEn,
              languageType: languageTypes
            },
            success: function (res) {
              // console.log(res)
              if (res.data.code == 1) {
                wx.hideLoading()
                if (res.data.data.garbageName == null) {
                  // console.log(" ========",res.data.data)  
                  that.setData({
                    chaxu: res.data.data.garbageName,
                    wesb: false,
                    garbageType: ""
                  })
                } else {
                  // if (res.data.data.garbageType == 0){
                  //    console.log(res.data.data.garbageType,"+______________________")
                  // }
                  that.setData({
                    garbageType: res.data.data.garbageType,
                    garbageName: res.data.data.garbageName,
                    garbageNameEn: res.data.data.garbageNameEn,
                    garbageTypeName: res.data.data.garbageTypeName,
                   // keywaordShareCpntent: res.data.data.keywaordShareCpntent,
                    // wesb:false
                  })
                }
              } else {
                //console.log('111111')
              }
            }
          })

      }
    }
   
  },


  // 点击垃圾桶
  cation: function (e) {
    // console.log(e)
    var that = this
    that.setData({
      indexs: e.currentTarget.dataset.index,
      show: true,
      hiddns: false, //false 显示
      garbageType: "", //隐藏
      datase: "1",
      wesb: true
    })
  },

  // 录音开始
  start: function () {
    const options = {
      duration: 30000, //指定录音的时长，单位 ms   
      sampleRate: 16000, //采样率
      numberOfChannels: 1, //录音通道数
      encodeBitRate: 96000, //编码码率
      format: 'mp3', //音频格式，有效值 aac/mp3
      frameSize: 50, //指定帧大小，单位 KB
      //audioSource:auto
    }
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      // console.log('recorder start')
    });

    this.setData({
      showmicro: true,
      inputVal: '',
      inputValEn:"",
      isbind: true,
      wesb: true,
      garbageType: "",
      hiddns: true,
      show: true
    })
    //错误回调
    recorderManager.onError((res) => {
      // console.log(res, "aaas");
    })
  },

  //停止录音
  stop: function () {
    console.log("stop")
    var that = this
    var radiosn = that.data.radio
      console.log(radiosn,"_________________")
    recorderManager.stop();
    this.setData({
      showmicro: false
    })
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
     // console.log(res)
     // console.log(res.tempFilePath, "______________________")
      //上传 录音文件  
      var switchs_con = wx.getStorageSync('switchs')
      if (switchs_con == true) {
        //console.log("11111")
        that.setData({
          languageType: 1,
          radiosCh: radiosn
        })
      } else {
        //console.log("22222")
        that.setData({
          languageType: 2,
          radiosCh: 1737
        })
      }
      var languageTypes = this.data.languageType
      var radiosCh = this.data.radiosCh
     // console.log(radiosCh,"+++++++++++++++++++")

      getspeechToText({
        filePath: res.tempFilePath,
        name: 'file',
        header: {
          "languageType": radiosCh,    //方言
          "Content-Type": "multipart/form-data"
        },
        success: function (res) {
          console.log(res)
          var jsonstr = JSON.parse(res.data)
          //  console.log(jsonstr, "+++++________________")
          if (jsonstr.code == 1) {
            // wx.hideLoading()
            // console.log(jsonstr.data)
            let text = jsonstr.data.replace('。', '').replace('，', '');
            let test = text.replace(/(^\s*)|(\s*$)/g, "") //去除前后空格

            if (jsonstr.data == null || jsonstr.data == '') {
              // console.log("语音时间太短")
              that.setData({
                shownull: true,
                garbageType: ""
                // wesb: false,
                // hiddns:true
              })
              setTimeout(function () {
                that.setData({
                  shownull: false
                })
              }, 1000)
            } else {
              if (languageTypes == 1){
                getGarbageList({
                  data: {
                    garbageName: test,
                    languageType: 1
                  },
                  success: function (res) {
                    // console.log(res,"___________________")
                    if (res.data.data == "") {
                      // console.log("空")
                      that.setData({
                        isbind: true,
                        wesb: false
                      })
                    }
                    if (res.data.data.length > 1) {
                      that.setData({
                        isbind: false,
                        goods_name: res.data.data,
                        inputVal: test,
                      })
                    } else {
                      that.setData({
                        //isbind: true,
                        goods_name: res.data.data,
                        inputVal: test,
                      })
                      // 请求 
                      getClassificationByGarbage({
                        data: {
                          garbageName: test,
                          languageType: 1
                        },
                        success: function (res) {
                          //  console.log(res)
                          if (res.data.code == 1) {

                            if (res.data.data.garbageName == null) {
                              that.setData({
                                //  show: true,
                                // datase: "",
                                garbageType: "", //语音未识别    
                                // isbind: true,
                                wesb: false,
                                // hiddns: true, 
                                chaxu: res.data.data.garbageName,
                              })
                            } else {
                              that.setData({
                                garbageType: res.data.data.garbageType,
                                garbageName: res.data.data.garbageName,
                                garbageNameEn: res.data.data.garbageNameEn,
                                garbageTypeName: res.data.data.garbageTypeName,
                                keywaordShareCpntent: res.data.data.keywaordShareCpntent
                                //   show: true,
                                //   datase: "1",
                                //  hiddns: true,
                                //  isbind: true,
                                //  wesb: false  //
                              })
                            }
                          } else {
                            //console.log('111111')
                          }
                        }
                      })
                    }
                  }
                })
              }else{
                getGarbageList({
                  data: {
                    garbageName: test,
                    languageType: 2
                  },
                  success: function (res) {
                    // console.log(res,"___________________")
                    if (res.data.data == "") {
                      // console.log("空")
                      that.setData({
                        isbind: true,
                        wesb: false
                      })
                    }
                    if (res.data.data.length > 1) {
                      that.setData({
                        isbind: false,
                        goods_name: res.data.data,
                        inputValEn: test,
                      })
                    } else {
                      that.setData({
                        //isbind: true,
                        goods_name: res.data.data,
                        inputValEn: test,
                      })
                      // 请求 
                      getClassificationByGarbage({
                        data: {
                          garbageName: test,
                          languageType: 2
                        },
                        success: function (res) {
                          //  console.log(res)
                          if (res.data.code == 1) {

                            if (res.data.data.garbageName == null) {
                              that.setData({
                                //  show: true,
                                // datase: "",
                                garbageType: "", //语音未识别    
                                // isbind: true,
                                wesb: false,
                                // hiddns: true, 
                                chaxu: res.data.data.garbageName,
                              })
                            } else {
                              that.setData({
                                garbageType: res.data.data.garbageType,
                                //garbageName: res.data.data.garbageName,
                                garbageNameEn: res.data.data.garbageNameEn,
                                garbageTypeName: res.data.data.garbageTypeName,
                               // keywaordShareCpntent: res.data.data.keywaordShareCpntent
                                //   show: true,
                                //   datase: "1",
                                //  hiddns: true,
                                //  isbind: true,
                                //  wesb: false  //
                              })
                            }
                          } else {
                            //console.log('111111')
                          }
                        }
                      })
                    }
                  }
                })
              }
            
            }
          } else {
            // console.log("语音未检测到")
            wx.showToast({
              title: '语音识别错误',
              duration: 1500,
              icon: "none"
            })
            // wx.hideLoading()
          }
        }
      })
    })
  },


  longpress: function () {
    //console.log('longTap....  longpress ')
  },

  touchStart: function () {
    //console.log('touchStart....')
    this.start();
  },
  touchEnd: function () {
    //console.log('touchEnd....')
    this.stop()
  },



  //  点击跳转 带参数
  goAssis() {
    wx.navigateTo({
      url: `../../sharePage/sharePage?isfrom=goAssis&inputVal=${this.data.inputVal}&garbageType=${this.data.garbageType}&keywaordShareCpntent=${this.data.keywaordShareCpntent}`
    })
  },




  // 显示遮罩层
  switchs: function () {
    var that = this;
    that.setData({
      hideModal: false
    })
    var animation = wx.createAnimation({
      duration: 600,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    setTimeout(function () {
      that.fadeIn();//调用显示动画
    }, 200)
  },

  // 隐藏遮罩层
  hideModal: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 800,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown();//调用隐藏动画   
    setTimeout(function () {
      that.setData({
        hideModal: true
      })
    }, 720)//先执行下滑动画，再隐藏模块

  },

  //动画集
  fadeIn: function () {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  fadeDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },

  
 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // var that = this
    // var switchs = that.data.switchs
    // console.log(switchs,"+++++++++++++++++++++")
    //   that.setData({
    //     switchs: switchs
    //   })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     var that = this
    // var switchs = this.data.switchcon
    // console.log(switchs,"+++++++++++++++++++++")
    // wx.setStorageSync("switchs", switchs)
    // var switchs = wx.getStorageSync('switchs')
    //  console.log(switchs)
    //   that.setData({
    //     switchcon: switchs
    //   })
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
  onShareAppMessage: function (res) {
     //console.log(res)
     
    // var that = this
    // var garbageType = that.data.garbageType
    // if (garbageType == 100) {
    //   that.setData({
    //     titles: "干垃圾"
    //   })
    // } else if (garbageType == 200) {
    //   that.setData({
    //     titles: "回收垃圾"
    //   })
    // } else if (garbageType == 300) {
    //   that.setData({
    //     titles: "湿垃圾"
    //   })
    // } else if (garbageType == 400) {
    //   that.setData({
    //     titles: "有害垃圾"
    //   })
    // }

    // if (res.from === 'button') {
    //   // 来自页面内转发按钮
    //   // console.log(res.target)
    //   return {
    //     title: "垃圾分类助手",
    //   }
    // }
    // return {
    //   title: "垃圾分类助手",
    //   path: "/pages/Home/Assistant/Assistant",
    //   imageUrl: "",
    //   success: function () { }
    // }

  }

})