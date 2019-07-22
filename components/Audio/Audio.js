const audio = wx.createInnerAudioContext();


Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
	
		autoplay : {
			type: Boolean,
			value: false
		},
		
		index : {
			type: Number,
			value: 0
		},

		steps : {
			type: Array,
			value: []
		},
		
		dataSource : {
		  type: Array,
		  value: []
		},
  },

  /**
   * 组件内私有数据
   */
  data: {
		loop: false,
		pause: false,
		imgDomain: 'https://img.jishantech.com',
		current: 0,
  },

  /**
   * 组件的公有方法列表
   */
  methods: {

		loop: function () {
			audio.seek(0);
		},
		
		
		last: function () {
			
			var current = this.data.current;
			
			if (current <= 0) {
				current = 0;
				return;
			} else{
				current = current - 1;
				
				audio.stop()
				
				this.changeAudio(current);
			}
		},
		
		
		play: function () {
			
			var pause = !this.data.pause;
			 
			if (pause) {
				audio.pause()
			} else {
				audio.play()
			}
			
			this.setData({
				pause
			})
		},

		
		next: function () {
			
			var current = this.data.current;
			
			if (current >= this.data.steps.length - 1) {
				current = this.data.steps.length - 1;
				return;
			} else{
				current = current + 1;
				this.changeAudio(current);
			}
		},
		
		close: function () {
			audio.stop()
			setTimeout(() => {
				this.triggerEvent("hideAudio");
			})
		},
		
		swiperDidScroll: function (e) {
			console.log(e)
			if (e.detail.source == 'touch') {

				this.changeAudio(e.detail.current)
			}
		},
		
		changeAudio: function (current) {
			
			audio.stop()
			
			var that = this;
			setTimeout(() => {
				var src = that.properties.dataSource[current].src;
				audio.src = src;
				audio.play()
				
				that.setData({
					current 
				})
			},500)
		}
    },

	attached: function () {
		
		var index = this.properties.index;
		this.data.currentIndex = index;
		var src = this.properties.dataSource[index].src;
		
		audio.src = src;

		this.setData({
			current: index
		})
		
		setTimeout(() => {
			audio.play();
		}, 1500)
		
		audio.onEnded(() => {
			this.setData({
				pause: true
			})
			console.log(this.data.current)
			setTimeout(() => {
				this.next();
			},1000)
		})
		
		audio.onStop(() => {
			this.setData({
				pause: true
			})
		})
		
		audio.onPlay(() => {
			this.setData({
				pause: false
			})
		})
	},
	
		



})
