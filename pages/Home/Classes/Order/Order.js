import {
  getRemaining,
  getRepayment,
  checkVerticalCode,
  getVerticalCode,
  getPaycount,
  goWasteAshBinPay,
  getUserCoupon,

  getLogisticsPrice
} from '../../../../api/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: 1,
    totalPrice: 0,
    perPrice: 178,
    offPrice: 0,
    second: 0,
    vertical: 60,
    getVertical: false,
    statusArr: [0, 0, 0, 0],
    desArr: [],
    selArr: [],
    products: ["0601a", "0601b", "0602a", "0602b"],
    surplusProductPayCount: 0,
    phone: '',
    verticalCode: '',
    verticalStatus: '获取验证码',
    userName: '',
    productName: '',
    canSubmit: false,

    countDownNum: '60',

    region: ['上海市', '上海市', '长宁区'],
    provinceName:"请选择",
    postage:0, //邮费

    detailInfo:"",
    discountAmount:0,
    totalPrice1:0
  },


  // 查询用户领取优惠券记录
  getUserCoupon: function () {
    var that = this
    getUserCoupon({
      data: {
        businessKey: that.data.businessKey
      },
      success: function (res) {
        if (res.data.data == true) {
          var discountAmount = that.data.discountAmounts
          //var totalPrice = that.data.perPrice - that.data.discountAmounts
          //console.log(discountAmount)
          that.setData({
            totalPrice: that.data.perPrice - that.data.discountAmounts,
            discountAmount: discountAmount
          })
        } else {
          that.setData({
            totalPrice: that.data.perPrice,
            discountAmount: 0
          })
        }
      //  console.log(res, "++++11")
      }
    })
  },



  
  // 获取地址
  chooseAddress:function(){
    var that =this
    //var totalPrice = that.data.perPrice - this.data.discountAmount 
    var totalPrice = that.data.totalPrice 
    wx.chooseAddress({
      success:(res) =>{
       // console.log(res)
        // userName:res.userName,
          this.setData({
           userName: res.userName,
           telNumber: res.telNumber,
           phone: res.telNumber,

           provinceName: res.provinceName,
           cityName: res.cityName,
           countyName: res.countyName,

           detailInfo: res.detailInfo,
         })
        that.getLogisticsPrices()
        // getLogisticsPrice({
        //   data: {
        //     privince: that.data.provinceName
        //   },
        //   success:function(res){
        //     console.log(res,"+++++++++++邮费")
        //     that.setData({
        //       postage: res.data.data.paidByShipper,
        //       totalPrice1: totalPrice + res.data.data.paidByShipper
        //     })
        //   }
        // })
      }
    })
    
    // getLogisticsPrice({
    //   data: {
    //     privince: that.data.provinceName
    //   },
    //   success: function (res) {
    //     console.log(res, "邮费————————————————————")
    //     that.setData({
    //       //postage: res.data.data.paidByShipper,
    //      // totalPrice: totalPrice + res.data.data.paidByShipper
    //     })
    //   }
    // })
  },


  //  地区选择
  bindRegionChange: function (e) {
   // console.log(e)
    var that  = this
    var list = e.detail.value
    //var totalPrice = that.data.perPrice - this.data.discountAmount
    var totalPrices = that.data.totalPrice 
    //console.log(totalPrices,"+++++++++++++")
    
    that.setData({
      provinceName: list[0],
      cityName: list[1],
      countyName: list[2],
    })

    that.getLogisticsPrices()
    // getLogisticsPrice({
    //   data:{
    //     privince: that.data.provinceName
    //   },
    //   success:function(res){
    //     console.log(res,"邮费————————————————————")
    //     that.setData({
    //       postage: res.data.data.paidByShipper,
    //       totalPrice1: totalPrices  + res.data.data.paidByShipper
    //     })
         
    //     console.log(totalPrices + res.data.data.paidByShipper,"__________________")
    //   }
    // })
  },

  getLogisticsPrices:function(){
    var that = this
    getLogisticsPrice({
      data: {
        privince: that.data.provinceName
      },
      success: function (res) {
       // console.log(res, "邮费————————————————————")
        that.setData({
          postage: res.data.data.paidByShipper,
          totalPrice1: that.data.totalPrice  + res.data.data.paidByShipper
        })

       // console.log(that.data.totalPrice  + res.data.data.paidByShipper, "__________________")
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //  console.log(options,"111111111111")
    var that = this
    var businessKey = wx.getStorageSync('businessKey');
   
    that.setData({
      discountAmounts: options.discountAmount,
      businessKey: businessKey
    })
    // 	var perPrice = options.perPrice;
    // 	this.setData({
    // 		perPrice
    // 	})

    that.getUserCoupon() //是否使用用户券
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initData();
  },

  initData: function () {

    var desArr = this.data.desArr;
    var selArr = this.data.selArr;

    var oneDes = 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/lesson/1-m-des.png?sign=f047d69213d99840cd2d3f965e9202f9&t=1558697814';
    var oneSel = 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/lesson/1-m-sel.png?sign=9dc8e66b5cbea43169f52ab94494175e&t=1558697842';
    var twoDes = 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/lesson/1-e-des.png?sign=d46b5caca428cf575ff0d39d6877caa9&t=1558697861';
    var twoSel = 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/lesson/1-e-sel.png?sign=bb364971625957ce3da491488c67ddd4&t=1558697876';
    var threeDes = 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/lesson/2-m-des.png?sign=d954dc26d83df2fa7664d3fe7829318a&t=1558697909';
    var threeSel = 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/lesson/2-m-sel.png?sign=2a4595c04257f86c795f9db306f2e235&t=1558697930';
    var fourDes = 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/lesson/2-e-des.png?sign=43289789169a16720aa34ad2b50eb558&t=1558697952';
    var fourSel = 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/lesson/2-e-sel.png?sign=a9e44c930ee83347254973f1070b93a1&t=1558697963';

    desArr = [oneDes, twoDes, threeDes, fourDes];
    selArr = [oneSel, twoSel, threeSel, fourSel];

    this.setData({
      desArr,
      selArr
    })
  },

  editNumber: function (e) {

    var totalPrice = this.data.totalPrice;
    var index = e.currentTarget.dataset.index;

    var perPrice = this.data.perPrice;
    var number = this.data.number;
    var surplusProductPayCount = this.data.surplusProductPayCount;
    var discountAmount = this.data.discountAmount
    var postage = this.data.postage

    //console.log(postage,"22222")

   // console.log(surplusProductPayCount,"++++++++++++") 
    if (index == 0) {
      number = number == 1 ? 1 : number - 1;
    } else {
      if (number < 1) {
        number++
      } else {
        wx.showToast({
          title: '已达到最大购买数量',
          icon: 'none',
          duration: 1500
        })
      }
    }
    totalPrice = number * perPrice - discountAmount + postage;
    this.setData({
      number,
      //totalPrice: totalPrice 
    })
  },

  getVerticalCode: function () {
    var phone = this.data.phone;
    if (phone.length == 11) {
      if (this.data.getVertical == true) {
        return;
      } else {
        var that = this;
        getVerticalCode({
          data: {
            phone: that.data.phone
          },
          success: function (res) {
            //console.log(res,"+++++")
            if (res.data.code == 1) {
              that.countDown(60);
              that.setData({
                getVertical: true
              })
            } else {
              that.setData({
                verticalStatus: '重新获取',
                getVertical: false
              })
            }
          }
        })
      }
    }else{
      that.checkPhone()
    }
  },
   
  countDown: function (s) {
    const that = this;
    that.timer = setInterval(function () {
      s--
      if (s <= 0) {
        // s = 60;
        that.clearTimer();
        that.setData({
          verticalStatus: '重新获取',
          getVertical: false
        })
      } else {
        that.setData({
          verticalStatus: s + 's'
        })
      }
    }, 1000)
  },

  clearTimer: function () {
   // console.log(' 结束计时')
    clearInterval(this.timer);
  },


  // selectedGoods: function (e) {
  //   var that = this
  //   var that = this;
  //   var index = e.currentTarget.dataset.index;
  //   var statusArr = that.data.statusArr;
  //   var productName = that.data.products[index];
  //   var discountAmount = this.data.discountAmount 
  //   var postage = this.data.postage

  //   console.log(statusArr,"+++++++")
  //   console.log(productName,"__________")

  //   var totalPrice = that.data.perPrice - discountAmount + postage;

  //   console.log(totalPrice, "1111")
  //   var number = 1;
  //  // var surplusProductPayCount = that.data.surplusProductPayCount;

  //   for (var i = 0; i < statusArr.length; i++) {
  //     if (index == i) {
  //       statusArr[i] = 1;
  //     } else {
  //       statusArr[i] = 0;
  //     }
  //   }
  //   that.setData({
  //     statusArr,
  //     //surplusProductPayCount: res.data.data.surplusProductPayCount,
  //     number,
  //     totalPrice,
  //     productName
  //   })


  //   // getPaycount({
  //   //   data: {
  //   //     productName: productName
  //   //   },
  //   //   success: function (res) {

  //   //     if (res.data.code == 1) {
  //   //       if (res.data.data.surplusProductPayCount > 0) {

  //   //         var totalPrice = that.data.perPrice - discountAmount + postage;
            
  //   //         console.log(totalPrice,"1111")
  //   //         var number = 1;
  //   //         var surplusProductPayCount = that.data.surplusProductPayCount;

  //   //         for (var i = 0; i < statusArr.length; i++) {
  //   //           if (index == i) {
  //   //             statusArr[i] = 1;
  //   //           } else {
  //   //             statusArr[i] = 0;
  //   //           }
  //   //         }
  //   //         that.setData({
  //   //           statusArr,
  //   //           surplusProductPayCount: res.data.data.surplusProductPayCount,
  //   //           number,
  //   //           totalPrice,
  //   //           productName
  //   //         })

  //   //         that.ifCanSubmit();
  //   //       } else {

  //   //       }
  //   //     } else {

  //   //     }
  //   //   }
  //   // })

  // },

  phoneNumber: function (e) {
    var value = e.detail.value;
    var that = this;
    //console.log(value)
    that.setData({
      phone: value
    })
    that.ifCanSubmit();
  },



  verticalNumber: function (e) {
    var value = e.detail.value;

    this.setData({
      verticalCode: value
    })
    this.ifCanSubmit();

  },

  userName: function (e) {
   // console.log(e,"+++++++++++")
    var value = e.detail.value;

    this.setData({
      userName: value
    })
    this.ifCanSubmit();
  },

 
 //收获地址
  detailInfo:function(e){
   // console.log(e)
    var value = e.detail.value;
    var that = this
    that.setData({
      detailInfo:value
    })
    this.ifCanSubmit()
  },


  checkVerticalCode: function () {
    var that = this
    //that.checkPhone()

    var phone = this.data.phone;
    var code = this.data.verticalCode;
    var nickName = this.data.userName;
    var detailInfo = this.data.detailInfo

   // console.log(detailInfo,"____________")
   
    if (phone.length == 0 || phone.length < 11) {
      wx.showToast({
        title: "请输入正确手机号",
        icon: 'none',
        duration: 1500
      })
    } else if(code.length == 0){
      wx.showToast({
        title: "请输入正确验证码",
        icon: 'none',
        duration: 1500
      })
    } else if (nickName.length == 0){
      wx.showToast({
        title: "用户名不能为空",
        icon: 'none',
        duration: 1500
      })
    } else if (detailInfo == 0){
      wx.showToast({
        title: "请填写收货地址",
        icon: 'none',
        duration: 1500
      })
    } else if (that.data.totalPrice1 == 0){
      wx.showToast({
        title: "请选择地区",
        icon: 'none',
        duration: 1500
      })
    }else{
      checkVerticalCode({
            data: {
              phone: that.data.phone,
              code: that.data.verticalCode
            },
            success: function (res) {
              if (res.data.code == 1) {
               
                that.submitOrder();
              } else {
              }
            }
          })
    }
    
  },


  submitOrder: function () {
    var that = this;
    var phone = that.data.phone;
    var code = that.data.verticalCode;
    var nickName = that.data.userName;
    var number = that.data.number;
    var productName = that.data.productName;

    var detailInfo = that.data.detailInfo;  //详细地址
    var provinceName = that.data.provinceName
    var cityName = that.data.cityName
    var countyName = that.data.countyName
    var businessKey = that.data.businessKey
    // console.log(phone ,"++++++++")
    // console.log(detailInfo,"++++++++++++++++")

    var totalPrice = that.data.totalPrice1
     
    goWasteAshBinPay({
      data: {
        phone: phone,
       // code: code,
        buyCount: number,
        nickName: nickName,
        businessKey: businessKey,

        isUseCoupon:1,
        paymentAmount: totalPrice,
        productName:"干湿分离双层垃圾桶",

        province:provinceName,  //省
        city: cityName,  
        county: countyName,
        addressInfo: detailInfo,
      },
      success: function (res) {
        if (res.data.code == 1) {
          that.payOrder(res);
        } else {
        }
      }
    })
  },

  payOrder: function (res) {
    console.log(res,"++++++++++++++++")
    wx.requestPayment({
      appid: res.data.data.appid,
      "timeStamp": res.data.data.timeStamp,
      "nonceStr": res.data.data.nonceStr,
      "package": res.data.data.package,
      signType: 'MD5',
      "paySign": res.data.data.paySign,
      success: function (res) {
        wx.showToast({
          title: '支付成功',
          icon: 'none',
          duration: 500
        })
        wx.switchTab({
          url: '/pages/Home/index/index'
        })
      }
    })
  },



  


  ifCanSubmit: function () {
    var phone = this.data.phone;
    var code = this.data.verticalCode;
    var nickName = this.data.userName;
    var productName = this.data.productName;
    var detailInfo = this.data.detailInfo

    if (phone.length == 11 && code.length == 5 && nickName != '' && productName != '') {
      this.setData({
        canSubmit: true
      })
    } else {
      this.setData({
        canSubmit: false
      })
    }
  },

  checkPhone: function () {
    var phone = this.data.phone;
    if (phone.length == 0 || phone.length < 11) {
      wx.showToast({
        title: "请输入正确手机号",
        icon: 'none',
        duration: 1500
      })
      return;
    }
  },

  checkVertical: function () {
    var code = this.data.verticalCode;
    if (code.length == 0) {
      wx.showToast({
        title: "请输入正确验证码",
        icon: 'none',
        duration: 1500
      })
    }
  },

  checkUserName: function () {
    var nickName = this.data.userName;
    if (nickName.length == 0) {
      wx.showToast({
        title: "用户名不能为空",
        icon: 'none',
        duration: 1500
      })
    }
  },

  checkGoods: function () {
    var productName = this.data.productName;
    if (productName.length == 0) {
      wx.showToast({
        title: "请选择商品",
        icon: 'none',
        duration: 1500
      })
    }
  },


})
