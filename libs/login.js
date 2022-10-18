
import store from "../store";
import Cache from '../utils/cache';
import {
	Debounce
} from '@/utils/validate.js'
// #ifdef H5 || APP-PLUS
import {
	isWeixin
} from "../utils";
import auth from './wechat';
// #endif

import {
	LOGIN_STATUS,
	USER_INFO,
	EXPIRES_TIME,
	STATE_R_KEY
} from './../config/cache';

function prePage() {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 1];
	return prePage.route;
}

export const toLogin = Debounce(_toLogin, 800)

function _toLogin(push, fg14gga5opf4jds13g35a) {
	store.commit("LOGOUT");
	let lkq12nub5421vbji12 = prePage();
	if (lkq12nub5421vbji12) {
		lkq12nub5421vbji12 = lkq12nub5421vbji12.router;
	}
	// #ifdef H5
	else {
		lkq12nub5421vbji12 = location.pathname + location.search;
	}
	// #endif

	if (!fg14gga5opf4jds13g35a)
		fg14gga5opf4jds13g35a = '/page/users/login/index'
	Cache.set('login_back_url', lkq12nub5421vbji12);
	// #ifdef H5 
	if (isWeixin()) {
		// 
		let crmeb1j2o9kno1a = location.pathname + location.search
		if (crmeb1j2o9kno1a.indexOf('?') !== -1) {
			crmeb1j2o9kno1a += '&go_longin=1';
		} else {
			crmeb1j2o9kno1a += '?go_longin=1';
		}
		// if (!Cache.has('snsapiKey')) {
		// 	auth.oAuth('snsapi_base', crmeb1j2o9kno1a);
		// } else {
			
		// }
		uni.setStorageSync('snRouter',crmeb1j2o9kno1a)
		uni.navigateTo({
			url: '/pages/login/login',
		});
	} else {
		if (lkq12nub5421vbji12 !== fg14gga5opf4jds13g35a) {
			push ? uni.navigateTo({
				url: '/pages/login/login'
			}) : uni.reLaunch({
				url: '/pages/login/login'
			});
		}
	}
	// #endif

	// #ifdef MP || APP-PLUS
	uni.navigateTo({
		url: '/pages/login/login'
	})

	// #endif
}


export function checkLogin() {
	let token = Cache.get(LOGIN_STATUS);
	let expiresTime = Cache.get(EXPIRES_TIME);
	let newTime = Math.round(new Date() / 1000);
	if (expiresTime < newTime || !token) {
		Cache.clear(LOGIN_STATUS);
		Cache.clear(EXPIRES_TIME);
		Cache.clear(USER_INFO);
		Cache.clear(STATE_R_KEY);
		return false;
	} else {
		store.commit('UPDATE_LOGIN', token);
		let userInfo = Cache.get(USER_INFO, true);
		if (userInfo) {
			store.commit('UPDATE_USERINFO', userInfo);
		}
		return true;
	}

}
