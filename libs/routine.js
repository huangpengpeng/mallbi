
import store from '../store';
import {
	checkLogin
} from './login';
import {
	login,
	routineLogin,
	silenceAuth
} from '../api/public';
import Cache from '../utils/cache';
import {
	STATE_R_KEY,
	USER_INFO,
	EXPIRES_TIME,
	LOGIN_STATUS
} from './../config/cache';
import {
	mapGetters
} from "vuex";
class Routine {

	constructor() {
		this.scopeUserInfo = 'scope.userInfo';
	}

	async getUserCode() {
		let isAuth = await this.isAuth(),
			code = '';
		if (isAuth)
			code = await this.getCode();
		return code;
	}
	// 小程序静默授权
	silenceAuth(code) {
		const app = getApp();
		let that = this;
		let spread = app.globalData.spid ? app.globalData.spid : '';
		return new Promise((resolve, reject) => {
			silenceAuth({
					code: code,
					spread_spid: spread,
					spread_code: app.globalData.code
				})
				.then(res => {
					console.log(res)
					if (res.data && res.data.token !== undefined) {
						uni.hideLoading();
						let time = res.data.expires_time - Math.round(new Date() / 1000);
						store.commit('LOGIN', {
							token: res.data.token,
							time: time
						});
						store.commit('SETUID', res.data.userInfo.uid);
						store.commit('UPDATE_USERINFO', res.data.userInfo);
						resolve(res)
					} else {
						reject()
						uni.navigateTo({
							url: '/pages/users/wechat_login/index'
						})
					}
				})
				.catch(err => {
					reject(err)
				});
		})
	}
	/**
	 * 获取用户信息
	 */
	getUserInfo() {
		let that = this,
			code = this.getUserCode();
		return new Promise((resolve, reject) => {
			uni.getUserInfo({
				lang: 'zh_CN',
				success(user) {
					if (code) user.code = code;
					resolve({
						userInfo: user,
						islogin: false
					});
				},
				fail(res) {
					reject(res);
				}
			})
		})
	}

	/**
	 * 新版小程序获取用户信息 2021 4.13微信小程序开始正式启用
	 */
	getUserProfile(code) {
		console.log('getUserProfile');
		return new Promise((resolve, reject) => {
			uni.getUserProfile({
				lang: 'zh_CN',
				desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				success(user) {
					if (code) user.code = code;
					resolve({
						userInfo: user,
						islogin: false
					});
				},
				fail(res) {
					reject(res);
				}
			})
		})
	}

	/**
	 * 获取用户信息
	 */
	authorize() {
		let that = this;
		return new Promise((resolve, reject) => {
			if (checkLogin())
			console.log(123123)
				return resolve({
					userInfo: Cache.get(USER_INFO, true),
					islogin: true,
				});
			uni.authorize({
				scope: that.scopeUserInfo,
				success() {
					resolve({
						islogin: false
					});
				},
				fail(res) {
					reject(res);
				}
			})
		})
	}

	async getCode() {
		let provider = await this.getProvider();
		return new Promise((resolve, reject) => {
			// if(Cache.has(STATE_R_KEY)){
			// 	return resolve(Cache.get(STATE_R_KEY));
			// }
			uni.login({
				provider: provider,
				success(res) {
					if (res.code) Cache.set(STATE_R_KEY, res.code, 10800);
					return resolve(res.code);
				},
				fail() {
					return reject(null);
				}
			})
		})
	}

	/**
	 * 获取服务供应商
	 */
	getProvider() {
		return new Promise((resolve, reject) => {
			uni.getProvider({
				service: 'oauth',
				success(res) {
					resolve(res.provider);
				},
				fail() {
					resolve(false);
				}
			});
		});
	}

	/**
	 * 是否授权
	 */
	isAuth() {
		let that = this;
		return new Promise((resolve, reject) => {
			uni.getSetting({
				success(res) {
					if (!res.authSetting[that.scopeUserInfo]) {
						resolve(true)
					} else {
						resolve(true);
					}
				},
				fail() {
					resolve(false);
				}
			});
		});
	}

	authUserInfo(data) {
		{
			console.log('authUserInfo');
		}
		return new Promise((resolve, reject) => {
			routineLogin(data).then(res => {
				store.commit('UPDATE_USERINFO', res.data);
				store.commit('SETUID', res.data.id);
				Cache.set(USER_INFO, res.data);
				return resolve(res);
			}).catch(res => {
				return reject(res);
			})
		})
	}
}

export default new Routine();