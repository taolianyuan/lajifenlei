//const BASEURL = 'https://api.jishantech.com/'  // release
const BASEURL = 'http://api.test.jishantech.com/'; //test
// const BASEURL = 'http://172.16.1.224:10000/' //dev  ji
// const BASEURL = 'http://172.16.1.156:10000/' //dev  bo
//const BASEURL = "http://172.16.1.122:10000/"  

//const BASEURL = "http://172.16.1.252:10000/"

const getApiData = (apiUrl, options, method, needLogin) => {
	let defaultOpts = {
		method: method,
		data: {},
		header: {
			'content-type': 'application/json' // 默认值  
			// 'content-type': 'application/octet-stream' // 默认值
		},
		success: function(res) {
			// setTimeout(() => {
			//   wx.hideLoading();
			//   console.log('请求成功');
			// }, 100);  
		},

		fail: function(res) {
			setTimeout(() => {
				wx.showToast({
					title: '请求出错',
					icon: 'fail',
					duration: 2000
				})
				// wx.hideLoading();
				console.error(`请求失败：${res.code}`);
			}, 100);
		},

		complete: function() {
			setTimeout(() => {
				console.log('请求完成');
				// wx.hideLoading();
			}, 100);
		}
	}

	let opts = Object.assign(defaultOpts, options);
	// RESTful api get请求参数拼接
	let reqUrl = '';

	if (opts.method === 'GET' && opts.data.getData) {

		reqUrl = BASEURL + apiUrl + '/' + opts.data.getData;

	} else {
		reqUrl = BASEURL + apiUrl;
	}

	const app = getApp();
	const userInfo = wx.getStorageSync('userInfo');
	const businessKey = wx.getStorageSync('businessKey');
	//console.log(userInfo, '----------')
	if (needLogin) {
		
		if (userInfo == '' || userInfo == null) {
			return
		} else {
			// if (businessKey) {
// 				opts.data.businessKey = wx.getStorageSync('businessKey');
// 
// 				wx.request({
// 					url: reqUrl,
// 					method: method,
// 					header: opts.header,
// 					data: opts.data,
// 					success: opts.success,
// 					fail: opts.fail,
// 					complete: opts.complete
// 				})
// 			} else {
				app.getBusinessKey().then(function(res) {
					if (res.code == 1) {
					//	console.log(opts.data)
						opts.data.businessKey = wx.getStorageSync('businessKey');

					//	console.log('request needs to check login status : true');
						//console.log(opts.data);

						wx.request({
							url: reqUrl,
							method: method,
							header: opts.header,
							data: opts.data,
							success: opts.success,
							fail: opts.fail,
							complete: opts.complete
						})
					}
				})
			// }


		}
	} else {
		wx.request({
			url: reqUrl,
			method: method,
			header: opts.header,
			data: opts.data,
			success: opts.success,
			fail: opts.fail,
			complete: opts.complete
		})
	}
}

export {
	getApiData
};



const uploadFile = (apiUrl, options, needAi) => {
	// const BASEURL = 'http://192.168.1.119:10000/';
	// const BASEURL = 'http://192.168.1.103:10000/man/';

	if (needAi) {
		wx.showLoading({
			title: '智能识别菜名中...',
			mask: true
		})
	}  else {
		wx.showLoading({
			title: '正在识别...',
			mask: true
		})
	}

	let defaultOpts = {
		success: function(res) {
			wx.hideLoading();
		},

		fail: function(res) {
			wx.hideLoading();
			wx.showToast({
				title: '请求出错',
				icon: 'fail',
				duration: 2000
			})
			console.error(`请求失败：${res.code}`);
		},

		complete: function() {

			wx.hideLoading();
			console.log('请求完成');
		}
	}
	let opts = Object.assign(defaultOpts, options);

	wx.uploadFile({
		url: BASEURL + apiUrl,
		filePath: opts.filePath,
		name: 'file',
		success: opts.success,
    header: opts.header,
    formData: opts.formData,
		fail: opts.fail,
		complete: opts.complete
	})
}

export {
	uploadFile
};


// const uploadSeveralFiles = (filePaths, i) => {

//     var that = this;

//     wx.uploadFile({
//         url: BASEURL + 'man/upload/gallery',
//         filePath: filePaths[i],
//         name: 'file',

//         success: opts.success,
//         fail: opts.fail,
//         complete: opts.complete
//     })


// }













/**
 * 封封微信的的request
 */
// function request(url, data = {}, method) {
//   return new Promise(function (resolve, reject) {
//     wx.request({
//       url: url,
//       data: data,
//       method: method,
//       header: {
//         'Content-Type': 'application/json',
//         'X-Nideshop-Token': wx.getStorageSync('token')
//       },
//       success: function (res) {

//         if (res.statusCode == 200) {

//           if (res.data.errno == 401) {
//           //需要登录后才可以操作
//           wx.showModal({
//             title: '',
//             content: '请先登录',
//             success: function (res) {
//               if (res.confirm) {
//                 wx.removeStorageSync("userInfo");
//                 wx.removeStorageSync("businessKey");
//                 // wx.switchTab({
//                 //   url: '/pages/q-ucenter/index/index'
//                 // });
//               } else {
//                 // wx.switchTab({
//                 //   url: '/pages/q-index/index'
//                 // });
//               }
//             }
//           });
//           } else {
//             resolve(res.data);
//           }
//         } else {
//           reject(res.errMsg);
//         }
//       },
//       fail: function (err) {
//         reject(err)
//           console.log("failed")
//         } 
//     })
//   });
// }
