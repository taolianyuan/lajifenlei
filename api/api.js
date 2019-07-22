import {

	getApiData,
	uploadFile

} from './apiFunc.js';

export function getShareContent(options) {
	getApiData('biz/share-content/getShareContent', options, 'POST', false);
}


/*首页活动*/
//是否已经投过票
export function queryjudge(options) {
	getApiData('biz/recordcontroller/queryjudge', options, 'POST', true)
}

//记录投票信息
export function insertRecord(options) {
	getApiData('biz/recordcontroller/insertRecord', options, 'POST', true)
}

//总票数
export function queryNumber(options) {
	getApiData('biz/recordcontroller/queryNumber', options, 'POST', false)
}


//米饭活动
export function getRice(options) {
	getApiData('biz/ch/activity/getMiFanActivity', options, 'POST', false)
}

// 米饭活动总票数
export function getRiceTotalVotes(options) {
	getApiData('biz/recordcontroller/queryMiFanNumber', options, 'POST', false)
}

// 米饭投票
export function insertRiceVotes(options) {
	getApiData('biz/recordcontroller/insertMiFanRecord', options, 'POST', true)
}

//是否投过票
export function ifRecordRiceVotes(options) {
	getApiData('biz/recordcontroller/queryMiFanjudge', options, 'POST', true)
}


//拼图游戏剩余次数
export function getChances(options) {
	getApiData('biz/LndiaController/queryChance', options, 'POST', true)
}

//记录拼图游戏
export function recordGame(options) {
	getApiData('biz/LndiaController/insertbegin', options, 'POST', true)
}

//获取拼图时间
export function getPuzzleImg(options) {
	getApiData('biz/LndiaController/puzzleImg', options, 'POST',  false)
}

//查询首页购买次数和信息
export function getRemaining(options) {
	getApiData('biz/pay/order/getHomePaycount', options, 'POST',  false)
}

//提交订单
export function getRepayment(options) {
	getApiData('biz/pay/order/goPay', options, 'POST', true)
}

// 校验验证码
export function checkVerticalCode(options) {
	getApiData('biz/pay/order/judge', options, 'POST', false)
}

//获取验证码
export function getVerticalCode(options) {
	getApiData('biz/pay/order/sendSMS', options, 'POST', false)
}

//查询剩余购买次数
export function getPaycount(options) {
	getApiData('biz/pay/order/getPaycount', options, 'POST', false)
}








/*--------------------------------------登 录---------------------------------------------------------------------*/
// //登录
// export function login(options) {
//   getApiData('account/auth/wx/newlogin', options, 'POST', false);
// }

export function insertUserAuth(options){
	getApiData('account/auth/insertUserAuth',options,'POST',true)
}

// 登录
export function login(options) {
	getApiData('account/auth/wx/loginNew', options, 'POST', false);
}

export function getQRCodeOne(options) {
	getApiData('man/upload/userQRCodeOne', options, 'POST', true);
}

// export function getUserByBusinessKey(options){
// 	getApiData('account/user/getUserByBusinessKey',options,'POST',true)
// }
// 

// 校验BusinessKey  下面这个也是
// export function checkUserByBusinessKey(options){
// 	getApiData('account/user/checkUserByBusinessKey',options,'POST',true)
// }
export function checkUserByBusinessKey(options) {
  getApiData('account/auth/checkBusinessKey', options, 'POST', true)
}

//单个修改用户头像的url
export function updateSingleAvatarUrl(options) {
	getApiData('man/upload/updateSingleAtatarUrl', options, 'POST', false)
}

//检查登录状态
//粉丝列表
export function checkBusinessKey(options) {
	getApiData('account/auth/checkBusinessKey', options, 'POST', false);
}


// //上传用户信息
// export function uploadUserInfo(options) {
//   getApiData('account/user/update', options, 'POST', true);
// }
//上传用户信息
export function uploadUserInfo(options) {
	getApiData('account/user/updateNew', options, 'POST', true);
}

//获取个人信息
export function getUserInfo(options) {
	getApiData('biz/ch/userInfo/queryMeInfo', options, 'POST', true);
}

// 获取烹饪方式
export function getCookingType(options) {
	getApiData('biz/ch/cook/QueryAllCook', options, 'POST', false);
}


// 上传菜谱第一步
export function uploadDishOne(options) {
	getApiData('biz/ch/dish/uploadDishOne', options, 'POST', true);
}


// 上传菜谱第二步
export function uploadDishTwo(options) {
	getApiData('biz/ch/dish/uploadDishTwo', options, 'POST', false);
}


// 上传菜谱第三步
export function uploadDishThree(options) {
	getApiData('biz/ch/dish/uploadDishThree', options, 'POST', false);
}


//添加步骤
export function addDishStep(options) {
	getApiData('biz/step/insertDishStepNew', options, 'POST', false);
}

//删除步骤
export function deleteStep(options) {
	getApiData('biz/step/delDishStep', options, 'POST', false);
}

//查询步骤
export function getSteps(options) {
	getApiData('biz/step/getStepList', options, 'POST', false);
}


// 上传菜谱第四步
export function uploadDishFour(options) {
	getApiData('biz/ch/dish/uploadDishFour', options, 'POST', false);
}


// 获取菜谱 id
export function generateDishId(options) {
	getApiData('biz/ch/dish/generateDishId', options, 'POST', true);
}


// 根据菜名查食材
// export function  getMaterialWithDishName(options) {
// 	getApiData('man/imgclassify/baike/queryMaterial', options, 'POST', false);
// }

// 根据菜名查食材
export function getMaterialWithDishName(options) {
	getApiData('man/imgclassify/baike/getMaterial', options, 'POST', false);
}

//逛吃
export function getFeedPage(options) {
	getApiData('biz/feed/feedPageNew', options, 'POST', true);
}

//点赞
export function likeSomething(options) {
	getApiData('biz/ch/count/addLike', options, 'POST', false);
}

// 逛吃 & 好友动态详情
export function getFeedPageDetail(options) {
	getApiData('biz/feed/getFeedDec', options, 'POST', true);
}


//获取菜谱属性
export function getDishType(options) {
	getApiData('biz/ch/property/quaryAllProperty', options, 'POST', false);
}

/*-------------------------------------------菜谱详情-------------------------------------------*/
//获取菜谱详情
export function getDishDetail(options) {
	getApiData('biz/ch/dish/queryInfoNew', options, 'POST', true);
}

//获取菜谱步骤语音

export function getStepAudio(options) {
	getApiData('biz/step-speech/getDishStepSpeech', options, 'POST',true);
}

//分享菜谱
export function shareSomething(options) {
	getApiData('biz/ch/count/addShare', options, 'POST', true);
}

//发动态
export function releaseMode(options) {
	getApiData('biz/ch/post/insertPost', options, 'POST', true);
}

export function testEmoji(options) {
	getApiData('biz/ch/post/test', options, 'POST', false)
}

//评论
export function insertComment(options) {
	getApiData('biz/ch/count/insertComment', options, 'POST', true);
}

//添加回复评论
export function addCommentReply(options) {
	getApiData('biz/ch/commentReply/addCommentAndReply', options, 'POST', true)
}

//查询评论回复
export function getCommentReply(options) {
	getApiData('biz/ch/commentReply/getCommentAndReply', options, 'POST', true)
}

//查询评论

export function getComment(options) {
	getApiData('biz/ch/count/getCollect', options, 'POST', false);
}



/*-------------------------------------------首页-------------------------------------------*/

//历史餐桌
export function getHistoryBoard(options) {
	getApiData('biz/ch/dish/queryHistoryDish', options, 'POST', false);
}

//今日餐桌
export function getTodayBoard(options) {
	getApiData('biz/ch/dish/recommendDish', options, 'POST', false);
}


//主页最新
export function getRecommend(options) {
	getApiData('biz/ch/dish/getDishByTimePage', options, 'POST', false);
}

//斗菜推荐
export function getRecommendDishList(options) {
	getApiData('biz/ch/dish/getRecommendDishList', options, 'POST', false);
}


//主页活动
export function getActivity(options) {
	getApiData('biz/ch/activity/getActivityList', options, 'POST', false);
}

export function getSingleActivity(options) {
	getApiData('biz/ch/activity/getActivity', options, 'POST', false)
}

//banner
export function getBanner(options) {
	getApiData('biz/ch/activity/getBanner', options, 'POST', false);
}

//NewBanner
export function getHomeBanner(options) {
	getApiData('biz/ad/gethomeBanner', options, 'POST', false);
}


/*-------------------------------------------酱 汁-------------------------------------------*/
//酱汁列表
// export function  getSauceList(options) {
// 	getApiData('biz/ch/sauce/getSauces', options, 'POST', false);
// }

//上传酱汁
export function uploadSauce(options) {
	getApiData('biz/ch/sauce/uplocadSauceThree', options, 'POST', true);
}

//发布酱汁
export function releaseSauce(options) {
	getApiData('biz/ch/sauce/uplocadSauce', options, 'POST', true);
}

//获取酱汁详情
export function getSauceInfo(options) {
	getApiData('biz/ch/sauce/getSauceInfo', options, 'POST', true);
}

//获取动态详情
export function getPostInfo(options) {
	getApiData('biz/ch/post/getPostInfoNew', options, 'POST', true);
}

// 添加评测
export function insertEvaluate(options) {
	getApiData('biz/sauce_evaluate/insertEvaluate', options, 'POST', true);
}

//获取评测列表
export function getEvaluates(options) {
	getApiData('biz/sauce_evaluate/getSauceEvaluate', options, 'POST', false);
}

//评测点赞

export function addEvaluateLike(options) {
	getApiData('biz/sauce_evaluate/addEvaluateLike', options, 'POST', false);
}

//添加酱汁步骤
export function addSauceStep(options) {
	getApiData('biz/step/insertSauceStepNew', options, 'POST', false);
}


//酱汁列表
export function getSauceByCookId(options) {
	getApiData('biz/ch/sauce/getByCookId', options, 'POST', false);
}

//第四部上传菜谱——查询适合的酱汁
export function getSauceAll(options) {
	getApiData('biz/ch/sauce/getSauceAll', options, 'POST', false)
}



//七天年夜饭
export function Activity(options) {
	getApiData('biz/college/subtask/active', options, 'POST', true)
}

//情人节特辑
export function getValentinesDay(options) {
	getApiData('biz/ch/activity/getValentinesDay', options, 'POST', false)
}


/*-------------------------------------------我的个人中心-------------------------------------------*/
/*-------------------------------------------我的个人中心-------------------------------------------*/
/*-------------------------------------------我的个人中心-------------------------------------------*/
/*-------------------------------------------我的个人中心-------------------------------------------*/
/*-------------------------------------------我的个人中心-------------------------------------------*/
/*-------------------------------------------我的个人中心-------------------------------------------*/
/*-------------------------------------------我的个人中心-------------------------------------------*/
/*-------------------------------------------我的个人中心-------------------------------------------*/
/*-------------------------------------------我的个人中心-------------------------------------------*/

//浏览历史
export function browerHistory(options) {
	getApiData('biz/ch/history-brower/queryHistoryBrower', options, 'POST', true);
}


//添加收藏
export function addCollection(options) {
	getApiData('biz/ch/count/addCollect', options, 'POST', true);
}


//取消收藏
export function deleteCollection(options) {
	getApiData('biz/ch/count/cancleCollect', options, 'POST', true);
}


//添加关注
export function follow(options) {
	getApiData('biz/ch/user-attention/insertAttention', options, 'POST', true);
}

// 取消关注
export function unFollow(options) {
	getApiData('biz/ch/user-attention/updateAttention', options, 'POST', true);
}

// 关注列表
export function getMyFollowList(options) {
	getApiData('biz/ch/user-attention/queryFollowUser', options, 'POST', true);
}

//他人关注列表
export function getUserFollowList(options) {
	getApiData('biz/ch/user-attention/queryOtherUserFollow', options, 'POST', true);
}

//我的粉丝列表
export function getMyFansList(options) {
	getApiData('biz/ch/user-attention/queryFollowList', options, 'POST', true);
}

//他人粉丝列表
export function getUserFansList(options) {
	getApiData('biz/ch/user-attention/queryOtherUserFans', options, 'POST', true);
}

//查询自己的动态
export function getMePost(options) {
	getApiData('biz/ch/post/getMePost', options, 'POST', true)
}


//查询经验值明细
export function getUserIntegral(options) {
	getApiData('biz/integral/getUserIntegral', options, 'POST', true)
}


/*-------------------------------------------好友个人中心-------------------------------------------*/

// 获取别人的动态
export function getMyPost(options) {
	getApiData('biz/ch/post/queryPostInfoNew', options, 'POST', true);
}

export function getFriendPost(options) {
	getApiData('biz/ch/post/queryPostInfoNew', options, 'POST', false);
}

// 获取别人的信息
export function getFansInfo(options) {
	getApiData('biz/ch/userInfo/queryUserInfoNew', options, 'POST', true);
}


/*-------------------------------自己个人中心-----------------------------------------------------*/
// 获取自己的菜谱列表
export function getMyDynamic(options) {
	getApiData('biz/ch/userInfo/queryMeDishNew', options, 'POST', true);
}

//获取别人的菜谱列表
export function getUserDish(options) {
	getApiData('biz/ch/userInfo/queryMeDishNew', options, 'POST', false);
}

//获取自己的酱汁列表
export function getMySauce(options) {
	getApiData('biz/ch/userInfo/queryUserSauceNew', options, 'POST', true);
}

//获取别人的酱汁列表
export function getUserSauce(options) {
	getApiData('biz/ch/userInfo/queryUserSauceNew', options, 'POST', false);
}


// 获取自己收藏的菜谱列表
export function getCollectionList(options) {
	getApiData('biz/ch/user-collect/queryCollectDish', options, 'POST', true);
}


//草稿箱
export function getDraftsList(options) {
	getApiData('biz/ch/dish/queryUnpDishes', options, 'POST', true);
}

//删除草稿
export function deleteDrafts(options) {
	getApiData('biz/ch/dish/delDraft', options, 'POST', true);
}

//土豆系列活动
export function potatoActivity(options) {
	getApiData('biz/ch/activity/getTuDouActivity', options, 'POST', false);
}


//好友动态
export function getFriendDynamic(options) {
	getApiData('biz/ch/post/queryfriendPost', options, 'POST', true);
}

export function getUserConfig(options){
	getApiData('biz/user-config/getUserConfig',options,'POST',true)
}

export function updateUserConfig(options){
	getApiData('biz/user-config/updateUserConfig',options,'POST',true)
}



/*------------------------校验--------------------------------------------*/
//用户图片校验
export function ImgSingleGuoChao(options) {
	uploadFile('man/upload/imgSingleGuoChao', options)
}

//校验用户输入的文字
export function CheckContent(options) {
	getApiData('man/sysman/check/checkContent', options, 'POST', false)
}

//校验最终海报的生成
export function ImgSingleGuoChaoUser(options) {
	uploadFile('man/upload/imgSingleGuoChaoUser', options)
}





/*------------------------上传图片--------------------------------------------*/

//上传头像
export function uploadHeader(options) {
	uploadFile('man/upload/imgSingleAvatar', options);
}


//上传单张图片
export function uploadSinglePic(options) {
	uploadFile('man/upload/imgSingle', options);
}


//上传多张图片
export function uploadSeveralPic(options) {
	uploadFile('man/upload/gallery', options);
}


export function imgSingleSauceEvaluate(options) {
	uploadFile('man/upload/imgSingleSauceEvaluate', options)
}


//上传图片识别菜名
export function discernDish(options) {
	uploadFile('man/imgclassify/dish', options, true);
}



//上传酱汁图片
export function uploadSaucePic(options) {
	uploadFile('man/upload/imgSingleSauce', options);
}


/*------------------------约饭活动--------------------------------------------*/
//饭店选择
export function getrestaurant(options) {
  getApiData('mc/re/restaurant/getrestaurant', options, 'POST', false)
}
// 口味
export function getrestauranttaste(options) {
  getApiData('mc/re/restauranttaste/getrestauranttaste', options, 'POST', false)
}

// 提交表单
export function insertrestaurantrecord(options) {
  getApiData('mc/re/restaurantrecord/insertrestaurantrecord', options, 'POST', false)
}

//查询匹配度

export function getmtcheddegree(options) {
  getApiData('mc/re/restaurantrecord/getmtcheddegree', options, 'POST', false)
}





/*------------------------垃圾分类--------------------------------------------*/
 
//  上传图片
export function getFoodCalRecognition(options) {
  uploadFile('cal/cal/food-nutrition/getFoodCalRecognition', options)
}


// 查询垃圾
export function getGarbageList(options) {
  getApiData('wasteasorting/garbage/getGarbageListByData', options, 'POST', false)
}


// 查询垃圾所属分类
// export function getClassificationByGarbage(options) {
//   getApiData('wasteasorting/garbage/getClassificationByGarbage', options, 'POST', false)
// }


export function getClassificationByGarbage(options) {
  getApiData('wasteasorting/garbage/getClassificationByGarbageSwitch', options, 'POST', false)
}




// 语音识别
export function getspeechToText(options) {
  uploadFile('wasteasorting/garbage/getspeechToText', options)
}

//关键词
export function getGarbageHotWordList(options) {
  getApiData('wasteasorting/garbage/getGarbageHotWordList', options, 'POST', false)
}

export function test(options) {
  getApiData('wasteasorting/garbage/test', options, 'POST', false)
}



// 领取优惠券
export function addUserCoupon(options) {
  getApiData('biz/ch/coupon/addUserCoupon', options, 'POST', false)
}

//查询优惠券
export function getCoupon(options) {
  getApiData('biz/ch/coupon/getCoupon', options, 'POST', false)
}

//查询用户领取优惠券
export function getUserCoupon(options) {
  getApiData('biz/ch/coupon/getUserCoupon', options, 'POST', false)
}


//垃圾订单提交
export function goWasteAshBinPay(options) {
  getApiData('biz/pay/order/goWasteAshBinPay', options, 'POST', true)
}

//邮费
export function getLogisticsPrice(options) {
  getApiData('biz/ch/logistics-price/getLogisticsPrice', options, 'POST', false)
}













