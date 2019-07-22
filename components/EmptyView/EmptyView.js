
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 弹窗标题
    title: {          
      type: String,     
      value: '空空如也' // 默认值
    },
    // 弹窗内容
    content :{
      type : String ,
      value : '暂无相关数据'
    },

    // 弹窗确认按钮文字
    confirmText :{
      type : String ,
      value : '重新连接'
    },

    autoLayout: {
      type: Number,
      value: true
    },

    status : {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件内私有数据
   */
  data: {


  },

  /**
   * 组件的公有方法列表
   */
  methods: {

     /**
     * triggerEvent 组件之间通信
     */
    confirmEvent(){
      this.triggerEvent("confirmEvent");
      console.log('confirmEvent-private')
    },


  }




})
