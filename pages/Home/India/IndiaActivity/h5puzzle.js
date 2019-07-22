class Puzzle {
	
	constructor(page, options) {
		options = options || {};
		this.page = page;
		this.width = 0;
		this.height = 0;
		this.type = options.type || 3;
		this.chance = options.chance || 0;
		
		let _this = this;
		
		_this.init();
	}
	
	init() {
		var _this = this;
		wx.getSystemInfo({
			success(res) {
				
				console.log(res)
				_this.page.setData({
					WIDTH: res.windowWidth,
					HEIGHT: res.windowHeight,
					width: res.windowWidth / _this.type,
					height: res.windowHeight / _this.type
				});
				_this.width = res.windowWidth / _this.type;
				_this.height = res.windowHeight / _this.type;
			}
		});
		this.originX = 0;
		this.originY = 0;
		this.originPX = 0;
		this.originPY = 0;
		this.currentX = 0;
		this.currentY = 0;
		this.cval = null;
		this.val = null;
		this.typeArr = [];
		this.newTypeArr = [];
		this.pointsArr = [];
		this.initTypeArr();
		this.randomArr();

		this.page.setData({
			imgPoints: this.newTypeArr
		});
		this.bindEvent();
	}
	
	initTypeArr() {
		let arr = [],
			count = 0;
		for (let i = 0; i < this.type; i++) {
			arr[i] = [];
			for (let j = 0; j < this.type; j++) {
				arr[i].push({
					x: j,
					y: i,
					px: j,
					py: i,
					count: count
				});
				this.pointsArr.push(count);
				count++;
			}
		}
		this.typeArr = arr;
	}
	
	randomArr() {
		let len = this.pointsArr.length - 1;
		for (let i = 0; i < len; i++) {
			let index = parseInt(Math.random() * len);
			let current = this.pointsArr[i];
			this.pointsArr[i] = this.pointsArr[index];
			this.pointsArr[index] = current;
		}
		for (let j = 0, le = this.typeArr.length; j < le; j++) {
			let arr = this.typeArr[j];
			this.newTypeArr[j] = [];
			for (let k = 0, l = arr.length; k < l; k++) {
				let val = arr[k];
				this.newTypeArr[j].push({
					x: val.x,
					y: val.y,
					px: this.pointsArr[val.count] % this.type,
					py: parseInt(this.pointsArr[val.count] / this.type),
					count: val.count
				})
			}
		}
	}
	
	checkWin() {
		return JSON.stringify(this.typeArr) === JSON.stringify(this.newTypeArr);
	}
	
	bindEvent() {
	
		let _this = this;
		let page = this.page;
		page.onTouchStart = function(e) {
			let x = parseInt(e.touches[0].pageX / _this.width),
				y = parseInt(e.touches[0].pageY / _this.height);
			let val = _this.newTypeArr[y][x];
			_this.cval = _this.newTypeArr[y][x];

			_this.page.setData({
				status: true,
				currentX: val.x * _this.width,
				currentY: val.y * _this.height,
				currentPX: val.px,
				currentPY: val.py
			})
			_this.originX = val.x * _this.width;
			_this.originY = val.y * _this.height;
			_this.originPX = val.px;
			_this.originPY = val.py;
			_this.currentX = e.touches[0].pageX;
			_this.currentY = e.touches[0].pageY;
		}
		page.onTouchMove = function(e) {
			
			let x = parseInt(e.touches[0].pageX / _this.width),
				y = parseInt(e.touches[0].pageY / _this.height);
			let cx = e.touches[0].pageX,
				cy = e.touches[0].pageY;
			let cgx = cx - _this.currentX,
				cgy = cy - _this.currentY;
			_this.val = _this.newTypeArr[y][x];

			_this.page.setData({
				status: true,
				currentX: _this.originX + cgx,
				currentY: _this.originY + cgy,
				currentPX: _this.originPX,
				currentPY: _this.originPY
			})
		}
		page.onTouchEnd = function(e) {
			
			if (_this.val) {

				_this.cval.px = _this.val.px;
				_this.cval.py = _this.val.py;
				_this.val.px = _this.originPX;
				_this.val.py = _this.originPY;

				_this.page.setData({
					imgPoints: _this.newTypeArr,
					status: false,
					currentX: 0,
					currentY: 0,
					currentPX: 0,
					currentPY: 0
				})
				_this.originX = 0;
				_this.originY = 0;
				_this.originPX = 0;
				_this.originPY = 0;
				_this.currentX = 0;
				_this.currentY = 0;

				if (_this.checkWin()) {
					// _this.page.clearTimer();
					_this.page.recordGame();
					
					if (_this.type == 3) {
						let text = '您真棒，恭喜您完成练习，进入直接挑战即可赢取丰厚奖品噢~';
						wx.showModal({
							title: '过关提醒',
							content: text,
							confirmText:  "去挑战!",
							cancelText: "再练一遍",
							success(res) {
								if (res.confirm) {
									
									_this.page.setData({
										type: 'challenge'
									})
									if (_this.chance > 0) {
										// _this.page.setInterval();
										_this.type = 4;
										_this.init();
										_this.page.goChallenge();
									} else {
										_this.page.nextChallenge()
									}
									
								} else if (res.cancel) {
									_this.init();
									_this.page.goOn()
								}
							}
						})
					} else if (_this.type == 4) {
						_this.init();
						_this.page.nextChallenge()
					}
				};
			}
		}
	}
}
module.exports = Puzzle;







