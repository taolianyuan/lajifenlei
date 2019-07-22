
Component({
	
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  
  /**
   * 组件的属性列表
   */
  properties: {
		
		times: {
				type: Number,
				value: 0
			},
		
		interval: {
			type: String,
			value: '00:00:00'
		},
		
		comment: {
			type: Boolean,
			value: false
		},
  },

  /**
   * 组件的初始数据
   */
  data: {
		mark: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/India/india_mark.png?sign=17087dce68415b28a9e4853c987ec9ee&t=1557197762',
		goon: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/India/india_go.png?sign=b9cda40e1f8d37a42afa1c59c4aec72a&t=1557197807',
		invitation: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/India/india_invite.png?sign=3caa560a52878c82b48b5e42ed89399a&t=1557197775',
		alert: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/India/India_alert.png?sign=37c82ef144dc9db757326f9e400c8102&t=1557197818',
		alertComment: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/India/india_alert_comment.png?sign=79f0b9a3d2f193575948d68812954eb4&t=1557207060',
		commentImg: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/India/india_go_comment.png?sign=4a85b6a6a8569cb1dbae1438e2be3214&t=1557300510',
		challenge: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/India/challenge_gray.png?sign=b6b38f12a56fe528830861205b8a9fca&t=1557215977',
		dishComment: 'https://7465-test-9cd88e-1258312722.tcb.qcloud.la/India/india_dish_comment.png?sign=af8cb86f7b0bcb24b629374d64ce1563&t=1557312000',
  },

  /**
   * 组件的方法列表
   */
  methods: {

		goOn: function () {
			this.triggerEvent("goOn");
		},
		
		invitation: function () {
			this.triggerEvent("invitation");
		},
		
		goComment: function () {
			this.triggerEvent("goComment");
		},
		
		hideSelf: function () {
			this.triggerEvent("hideSelf");
		}
  }
})
