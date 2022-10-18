
import Vue from 'vue'
import App from './App'
import store from './store'
import Cache from './utils/cache'
import util from 'utils/util'
import configs from './config/app.js'
Vue.prototype.$util = util;
Vue.prototype.$config = configs;
Vue.prototype.$Cache = Cache;
Vue.prototype.$eventHub = new Vue();
// main.js
// #ifdef MP
import uView from 'uview-ui';

Vue.use(uView);
// #endif

let vuexStore = require("@/pagespdm/store/$u.mixin.js");
Vue.mixin(vuexStore);

Vue.config.productionTip = false

// #ifdef H5


import { parseQuery } from "./utils";
import Auth from './libs/wechat';
import { SPREAD } from './config/cache';
Vue.prototype.$wechat = Auth;



let cookieName = "VCONSOLE",
	query = parseQuery(),
	urlSpread = query["spread"],
	vconsole = query[cookieName.toLowerCase()],
	md5Crmeb = "b14d1e9baeced9bb7525ab19ee35f2d2", //CRMEB MD5 加密开启vconsole模式
	md5UnCrmeb = "3dca2162c4e101b7656793a1af20295c"; //UN_CREMB MD5 加密关闭vconsole模式

if (urlSpread !== undefined) {
	var spread = Cache.get(SPREAD);
	urlSpread = parseInt(urlSpread);
	if (!Number.isNaN(urlSpread) && spread !== urlSpread) {
		Cache.set("spread", urlSpread || 0);
	} else if (spread === 0 || typeof spread !== "number") {
		Cache.set("spread", urlSpread || 0);
	}
}

if (vconsole !== undefined) {
  if (vconsole === md5UnCrmeb && Cache.has(cookieName))
	  Cache.clear(cookieName);
} else vconsole = Cache.get(cookieName);

import VConsole from './components/vconsole.min.js'

if (vconsole !== undefined && vconsole === md5Crmeb) {
	Cache.set(cookieName, md5Crmeb, 3600);
	let vConsole = new VConsole();
}

// let snsapiBase = 'snsapi_base';
// Auth.isWeixin() && Auth.oAuth(snsapiBase);


//全局路由前置守卫
// #endif

import {
	CACHE_ROUTE_REWRITES
} from '@/config/cache';

uni.addInterceptor('reLaunch', {
    // 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
    invoke (e) {
		let CACHE_ROUTE_REWRITES_MAP=Cache.get(CACHE_ROUTE_REWRITES,true);
		let url=e.url;
		if(CACHE_ROUTE_REWRITES_MAP[url]){
			uni.reLaunch({
				url: CACHE_ROUTE_REWRITES_MAP[url]
			});
			return false;
		}
       // console.log('reLaunch'+ CACHE_ROUTE_REWRITES_MAP);
        return true;
    },
    success (e) {
    }
})

uni.addInterceptor('navigateTo', {
    // 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
    invoke (e) {
		let CACHE_ROUTE_REWRITES_MAP=Cache.get(CACHE_ROUTE_REWRITES,true);
		let url=e.url;
		if(CACHE_ROUTE_REWRITES_MAP[url]){
			uni.navigateTo({
				url: CACHE_ROUTE_REWRITES_MAP[url]
			});
			return false;
		}
		console.log(url);
        return true;
    },
    success (e) {
    }
})

App.mpType = 'app'


const app = new Vue({
    ...App,
	Cache,
	store,
})

// #ifdef MP
// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import httpInterceptor from '@/pagespdm/common/http.interceptor.js'
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)
// http接口API集中管理引入部分
import httpApi from '@/pagespdm/common/http.api.js'
Vue.use(httpApi, app)

// 全局自定义函数、工具
import utils from '@/pagespdm/common/utils.js'
Vue.use(utils, app)
// #endif

app.$mount();