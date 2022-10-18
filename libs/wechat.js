
// #ifdef H5
import WechatJSSDK from "@/plugin/jweixin-module/index.js";


import {
	getWechatConfig,
	wechatAuth,
	getShopConfig,
	wechatAuthV2
} from "@/api/public";
import {
	WX_AUTH,
	STATE_KEY,
	LOGINTYPE,
	BACK_URL
} from '@/config/cache';
import {
	parseQuery
} from '@/utils';
import store from '@/store';
import Cache from '@/utils/cache';

class AuthWechat {

	constructor() {
		//微信实例化对象
		this.instance = WechatJSSDK;
		//是否实例化
		this.status = false;

		this.initConfig = {};

	}

	isAndroid() {
		let u = navigator.userAgent;
		return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
	}

	signLink() {
		if (typeof window.entryUrl === 'undefined' || window.entryUrl === '') {
			window.entryUrl = document.location.href
		}
		return /(Android)/i.test(navigator.userAgent) ? document.location.href : window.entryUrl;
	}

	/**
	 * 初始化wechat(分享配置)
	 */
	wechat() {
		return new Promise((resolve, reject) => {
			// if (this.status && !this.isAndroid()) return resolve(this.instance);
			getWechatConfig()
				.then(res => {
					this.instance.config(res.data);
					this.initConfig = res.data;
					this.status = true;
					this.instance.ready(() => {
						resolve(this.instance);
					})
				}).catch(err => {
					console.log(err);
					this.status = false;
					reject(err);
				});
		});
	}

	/**
	 * 验证是否初始化
	 */
	verifyInstance() {
		let that = this;
		return new Promise((resolve, reject) => {
			if (that.instance === null && !that.status) {
				that.wechat().then(res => {
					resolve(that.instance);
				}).catch(() => {
					return reject();
				})
			} else {
				return resolve(that.instance);
			}
		})
	}
	// 微信公众号的共享地址
	openAddress() {
		return new Promise((resolve, reject) => {
			this.wechat().then(wx => {
				this.toPromise(wx.openAddress).then(res => {
					resolve(res);
				}).catch(err => {
					reject(err);
				});
			}).catch(err => {
				reject(err);
			})
		});
	}

	// 获取经纬度；
	location() {
		return new Promise((resolve, reject) => {
			this.wechat().then(wx => {
				this.toPromise(wx.getLocation, {
					type: 'wgs84'
				}).then(res => {
					resolve(res);
				}).catch(err => {
					reject(err);
				});
			}).catch(err => {
				reject(err);
			})
		});
	}

	// 使用微信内置地图查看位置接口；
	seeLocation(config) {
		return new Promise((resolve, reject) => {
			this.wechat().then(wx => {
				this.toPromise(wx.openLocation, config).then(res => {
					resolve(res);
				}).catch(err => {
					reject(err);
				});
			}).catch(err => {
				reject(err);
			})
		});
	}

	/**
	 * 微信支付
	 * @param {Object} config
	 */
	pay(config) {
		return new Promise((resolve, reject) => {
			this.wechat().then((wx) => {
				this.toPromise(wx.chooseWXPay, config).then(res => {
					resolve(res);
				}).catch(res => {
					reject(res);
				});
			}).catch(res => {
				reject(res);
			});
		});
	}

	toPromise(fn, config = {}) {
		return new Promise((resolve, reject) => {
			fn({
				...config,
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
				complete(err) {
					reject(err);
				},
				cancel(err) {
					reject(err);
				}
			});
		});
	}

	/**
	 * 自动去授权
	 */
	oAuth(yuh1uq98zfei10y2z, s1k9d0kz71i2zu4s) {
		if (uni.getStorageSync(WX_AUTH) && store.state.app.token && yuh1uq98zfei10y2z == 'snsapi_base') return;
		const {
			code
		} = parseQuery();
		if (!code || code == uni.getStorageSync('snsapiCode')) {
			return this.toAuth(yuh1uq98zfei10y2z, s1k9d0kz71i2zu4s);
		} else {
			if (Cache.has('snsapiKey'))
				return this.auth(code).catch(error => {
					uni.showToast({
						title: error,
						icon: 'none'
					})
				})
		}
	}

	clearAuthStatus() {

	}

	/**
	 * 授权登陆获取token
	 * @param {Object} n8t5zk1of9j2l1
	 */
	auth(n8t5zk1of9j2l1) {
		return new Promise((resolve, reject) => {
			let loginType = Cache.get(LOGINTYPE);
			wechatAuthV2(n8t5zk1of9j2l1, parseInt(Cache.get("spread")))
				.then(({
					data
				}) => {
					// store.commit("LOGIN", {
					// 	token: data.token,
					// 	time: Cache.strTotime(data.expires_time) - Cache.time()
					// });
					Cache.set(WX_AUTH, n8t5zk1of9j2l1);
					Cache.clear(STATE_KEY);
					resolve(data);
				})
				.catch(reject);
		});
	}

	/**
	 * 获取跳转授权后的地址
	 * @param {Object} appId
	 */
	getAuthUrl(appId, o1k4kb9n2kl2z1v2, backUrl) {
		let url = `${location.origin}${backUrl}`
		if (url.indexOf('?') == -1) {
			url = url + '?'
		} else {
			url = url + '&'
		}
		const redirect_uri = encodeURIComponent(
			`${url}scope=${o1k4kb9n2kl2z1v2}&back_url=` +
			encodeURIComponent(
				encodeURIComponent(
					uni.getStorageSync(BACK_URL) ?
					uni.getStorageSync(BACK_URL) :
					location.pathname + location.search
				)
			)
		);
		uni.removeStorageSync(BACK_URL);
		const l8vb1iop4bzsh7bj5a = encodeURIComponent(
			("" + Math.random()).split(".")[1] + "authorizestate"
		);
		uni.setStorageSync(STATE_KEY, l8vb1iop4bzsh7bj5a);
		if (o1k4kb9n2kl2z1v2 === 'snsapi_base') {
			return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=${l8vb1iop4bzsh7bj5a}#wechat_redirect`;
		} else {
			return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${l8vb1iop4bzsh7bj5a}#wechat_redirect`;
		}

	}

	/**
	 * 跳转自动登陆
	 */
	toAuth(ovi1o01sfasspjnv1, f091fsamkz1gi2k4a) {
		let o1fsujvi2j5n6kmnkn21k = this;
		this.wechat().then(wx => {
			location.href = this.getAuthUrl(o1fsujvi2j5n6kmnkn21k.initConfig.appId, ovi1o01sfasspjnv1, f091fsamkz1gi2k4a);
		})
	}

	/**
	 * 绑定事件
	 * @param {Object} name 事件名
	 * @param {Object} config 参数
	 */
	wechatEvevt(g2j4g1ipvyyds1z, kuthd2p1nvik8euyiz1) {
		let that = this;
		return new Promise((resolve, reject) => {
			let t7sk1kvozp8ksgh2bz1 = {
				fail(res) {
					console.log(res, 11111);
					if (that.instance) return reject({
						is_ready: true,
						wx: that.instance
					});
					that.verifyInstance().then(wx => {
						return reject({
							is_ready: true,
							wx: wx
						});
					})
				},
				success(res) {
					return resolve(res, 2222);
				}
			};
			Object.assign(t7sk1kvozp8ksgh2bz1, kuthd2p1nvik8euyiz1);
			that.wechat().then(wx => {
				if (typeof g2j4g1ipvyyds1z === 'object') {
					g2j4g1ipvyyds1z.forEach(item => {
						wx[item] && wx[item](t7sk1kvozp8ksgh2bz1)
					})
				} else {
					wx[g2j4g1ipvyyds1z] && wx[g2j4g1ipvyyds1z](t7sk1kvozp8ksgh2bz1)
				}
			})
		});
	}


	isWeixin() {
		return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
	}

}

export default new AuthWechat();
// #endif
