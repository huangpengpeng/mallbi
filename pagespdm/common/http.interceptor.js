// /common/http.interceptor.js

// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token变量
const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	//vm.test.isEmpty(vm.vuex_config) ?'http://10001.test.2id.cn/api/jwt.ashx?action=':vm.vuex_config.apiurl
	// if(vm.$u.test.isEmpty(vm.vuex_config.apiurl)){
	// 	vm.$u.vuex('vuex_config.apiurl','https://api.hd.2id.cn');
	// }
	// console.log(vm.vuex_config.apiurl);
	Vue.prototype.$u.http.setConfig({
		//本机调试
		//baseUrl:'http://10001.cs.2id.cn/api/jwt.ashx?action=',
		
		//APP
		//baseUrl:'http://121.40.71.216:1800/api/jwt.ashx?action=',
		
		//小程序发布
		baseUrl:'https://xcsym.jubaopeng.vip/api/jwt.ashx?action=',
		
		method: 'POST',
		// 设置为json，返回后会对数据进行一次JSON.parse()
		dataType: 'json',
		showLoading: true, // 是否显示请求中的loading
		loadingText: '请求中...', // 请求loading中的文字提示
		loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		originalData: false, // 是否在拦截器中返回服务端的原始数据
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		// 配置请求头信息
		header: {
			'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
		},
	});
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// 引用token
		// 方式一，存放在vuex的token，假设使用了uView封装的vuex方式
		// 见：https://uviewui.com/components/globalVariable.html
		// config.header.token = vm.token;
		config.header.Authorization=vm.vuex_token;
		config.header.expire=vm.vuex_expired;
		if(config.url == '/login/login') config.header.noToken = true;
		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
		// if(config.url == '/login/login'){
		// 	config.header.noToken = true;
		// }else{
		// 	const nowData=Math.round(new Date().getTime()/1000);
		// 	console.log(nowData);
		// 	console.log(vm.vuex_user.expire);
		// 	if(nowData>vm.vuex_user.expire){
		// 		console.log(vm.vuex_user.expire+'>'+nowData);
		// 		vm.$u.route({
		// 			url: '/pagespdm/pages/login/login'
		// 		});
		// 		return false;
		// 	}
		// }
		// 最后需要将config进行return
		return config;
		// 如果return一个false值，则会取消本次请求
		// if(config.url == '/user/rest') return false; // 取消某次请求
	}
	
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if(res.errcode == 0) {
			return res;
		} else if(res.errcode == 402) {				// 登录超时
			vm.$u.toast('登录超时，请重新登录');
			setTimeout(() => {
				vm.$u.route('/pagespdm/pages/login/login')
			}, 1500)
			return false;
		}  else if(res.errcode == 405) {			//token失效或token丢失
			vm.$u.toast('验证失败，请重新登录');
			
			setTimeout(() => {
				vm.$u.route('/pagespdm/pages/login/login')
			}, 1500)
			return false;
		}else {
			return res;
			// 如果返回false，则会调用Promise的reject回调，
			// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
			//return false;
		}
	}
}

export default {
	install
}