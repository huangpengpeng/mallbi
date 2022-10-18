<script>
	import {
		checkLogin
	} from './libs/login';
	import {
		HTTP_REQUEST_URL
	} from './config/app';
	import {
		getShopConfig,
		silenceAuth
	} from '@/api/public';
	import {
		loginH5,
		getUserInfo
	} from '@/api/user';
	import {
		LOGO_URL,
		EXPIRES_TIME,
		USER_INFO,
		STATE_R_KEY,
		CACHE_OTHER
	} from '@/config/cache';
	import Cache from '@/utils/cache';
	import Auth from './libs/wechat.js';
	import Routine from '@/libs/routine.js';
	export default {
		globalData: {
			spid: 0,
			code: 0,
			isLogin: false,
			userInfo: {},
			MyMenus: [],
			globalData: false,
			isIframe: false,
			tabbarShow: true,
			a:'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlAWPo',
			b:'MIGfMA0GCSqGSIb3DQEBAMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlAWPoQUAA4GNADCBiQKBgQDlAWPo'
		},
		onLaunch: function(option) {
			let that = this;
			// #ifdef MP
			if (HTTP_REQUEST_URL == '') {
				console.error(
					"请配置根目录下的config.js文件中的 'HTTP_REQUEST_URL'\n\n请修改开发者工具中【详情】->【AppID】改为自己的Appid\n\n请前往后台【小程序】->【小程序配置】填写自己的 appId and AppSecret"
				);
				return false;
			}
			if (option.query.hasOwnProperty('scene')) {
				switch (option.scene) {
					//扫描小程序码
					case 1047:
						let val = that.$util.getUrlParams(decodeURIComponent(option.query.scene));
						that.globalData.code = val.pid === undefined ? val : val.pid;
						break;
						//长按图片识别小程序码
					case 1048:
						that.globalData.code = option.query.scene;
						break;
						//手机相册选取小程序码
					case 1049:
						that.globalData.code = option.query.scene;
						break;
						//直接进入小程序
					case 1001:
						that.globalData.spid = option.query.scene;
						break;
				}
			}
			const updateManager = uni.getUpdateManager();

			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
			});

			updateManager.onUpdateReady(function() {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success: function(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});
			});
			updateManager.onUpdateFailed(function() {
				return that.Tips({
					title: '新版本下载失败'
				});
			});
			// #endif
			// getShopConfig().then(res => {
			// 	this.$store.commit('SETPHONESTATUS', res.data.status);
			// });
			// 获取导航高度；
			uni.getSystemInfo({
				success: function(res) {
					that.globalData.navHeight = res.statusBarHeight * (750 / res.windowWidth) + 91;
				}
			});

			// #ifdef H5
			uni.getSystemInfo({
				success(e) {
					/* 窗口宽度大于420px且不在PC页面且不在移动设备时跳转至 PC.html 页面 */
					if (e.windowWidth > 420 && !window.top.isPC && !/iOS|Android/i.test(e.system)) {
						window.location.pathname = '/static/html/pc.html';
					}
				}
			})
			if (option.query.hasOwnProperty('type') && option.query.type == "iframeMakkMinkkJuan") {
				this.globalData.isIframe = true;
			} else {
				this.globalData.isIframe = false;
			}
		

			// #endif
			// #ifdef MP
			// 小程序静默授权
			console.log(this.$store.getters.isLogin, 'this.$store');
			if (!this.$store.getters.isLogin) {
				// Routine.getCode()
				// 	.then(code => {
				// 		this.silenceAuth(code);
				// 	})
				// 	.catch(res => {
				// 		uni.hideLoading();
				// 	});
			}
			// #endif
		},
		mounted() {},
		methods: {
			checkToken() {
				if(this.vuex_token && this.vuex_expired) {
					const nowData=Math.round(new Date().getTime()/1000);
					if(this.vuex_expired>nowData){
						return true;
					}
				}
				return false
			},
			// 小程序静默授权
			silenceAuth(code) {
				let that = this;
				let spread = that.globalData.spid ? that.globalData.spid : '';
				silenceAuth({
						code: code,
						spread_spid: spread,
						spread_code: that.globalData.code
					})
					.then(res => {
						if (res.data.token !== undefined && res.data.token) {
							uni.hideLoading();
							let time = res.data.expires_time - this.$Cache.time();
							that.$store.commit('LOGIN', {
								token: res.data.token,
								time: time
							});
							that.$store.commit('SETUID', res.data.userInfo.uid);
							that.$store.commit('UPDATE_USERINFO', res.data.userInfo);
						}
					})
					.catch(res => {
						console.log(res);
					});
			},
			phoneSilenceAuth(phone){
				var that=this;
				Routine.getCode()
					.then(code => {
						console.log(code);
						loginH5({
								phone: phone,
								code:code
							})
							.then(data => {
								if(data.error_code != '1'){
									that.$util.Tips({
										title: data.message
									});
									return;
								}
								that.$store.commit("LOGIN", {
									'token': data.data.token,
									time: '2099-02-02'
								});
								getUserInfo().then(res => {
									uni.hideLoading();
									that.userInfo = res.data;
									that.$store.commit('SETUID', res.data.uid);
									that.$store.commit('UPDATE_USERINFO', res.data);
								})
							})
							.catch(e => {
								that.$util.Tips({
									title: e
								});
							});
					})
					.catch(res => {
						uni.hideLoading();
					});
			},
			customstype(){
				let cacheOther=Cache.get(CACHE_OTHER, true);
				if(cacheOther && cacheOther.length > 0){
					return JSON.parse(cacheOther[0].text);
				}
				return {};
			}
		},
		onHide: function() {
			//console.log('App Hide')
		},
		onShow:function(options){
			if(options.referrerInfo.extraData){
				let phone =options.referrerInfo.extraData.phone;
				this.phoneSilenceAuth(phone);
			}
		}
	};
</script>

<style lang="scss">
	@import url("@/plugin/emoji-awesome/css/google.min.css");
	@import url('@/plugin/animate/animate.min.css');
	@import 'static/css/base.css';
	@import 'static/iconfont/iconfont.css';
	@import 'static/css/guildford.css';
	@import 'static/css/style.scss';
	// #ifdef MP
	@import "uview-ui/index.scss";
	// #endif


	/* #ifdef H5 */
	body::-webkit-scrollbar,
	html::-webkit-scrollbar {
		display: none;
	}

	/* #endif */
	view {
		box-sizing: border-box;
	}

	.bg-color-red {
		background-color: #e93323 !important;
	}

	.syspadding {
		padding-top: var(--status-bar-height);
	}

	.flex {
		display: flex;
	}

	.uni-scroll-view::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
	
	/*每个页面公共css */
	.soma-body{
		height: calc(100% - 44px);
		height: calc(100% - 44px - constant(safe-area-inset-top));
		height: calc(100% - 44px - env(safe-area-inset-top));
	}
	.soma-form{
		padding: 0 20rpx;
	}
	.soma-input-16 ::v-deep .u-label-text{
		font-size: 32rpx !important;
	}
	.soma-input-16 ::v-deep .u-field__input-wrap, .soma-input-16 ::v-deep .uni-input-input , .soma-input-16 ::v-deep .uni-input{
		font-size: 32rpx !important;
		font-weight: 700;
		color: #303133;
	}
	.soma-body ::v-deep .u-error-message{
		color: #909399 !important;
	}
	.soma-body ::v-deep .u-field{
		padding: 30rpx 0 !important;
	}
	.soma-orderlist ::v-deep .u-form-item{
		padding:0 !important;
	}
	.soma-orderdetail{
		color:#606266;
	}
</style>
