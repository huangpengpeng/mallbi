<template>
<uni-shadow-root class="video-swiper-index"><view class="container">
  <swiper class="swiper" :circular="circular" :easing-function="easingFunction" vertical current="1" :duration="duration" @animationfinish="animationfinish">
    
    <swiper-item v-for="(item,index) in (curQueue)" :key="item">
		<view class="swiper-item uni-bg-red">
			<view>
      <video :id="'video_'+(index)" class="video" :loop="loop" enable-play-gesture enable-progress-gesture :show-center-play-btn="false" :controls="false" :src="item.src" :data-id="item.id" :object-fit="item.objectFit || 'contain'" :data-index="index" @play="onPlay" @pause="onPause" @ended="onEnded" @error="onError" @timeupdate="onTimeUpdate" @waiting="onWaiting" @progress="onProgress" @loadedmetadata="onLoadedMetaData">
      </video>
	  </view>
	  	<view class="info">
	  		<view class="title">@{{item.title}}</view>
	  	</view>
		
	<view class="audio" @click="godetail" :data-o="item.goodsId">
		<view class="text-group">
			<view class="text1">{{item.goodsName}}@去购买</view>
		</view>
		<view>
			<image class="icon" :src="item.goodsPic"></image>
		</view>
	</view>
	  	
	  	<view class="buttons">
	  		<view :wx-if="userInfo.capaNum > 0" @click="downVideo" :data-id="item.id" :data-v="item.src" class="header_group">
	  			<image class="header" src="https://tope-test-baie-bj.oss-cn-beijing.aliyuncs.com/612bedba378d43d7994ac506f7a5c371"></image>
	  			
	  		</view>
	  		<view class="button">
	  			<image mode="widthFix" class="icon" src="https://tope-test-baie-bj.oss-cn-beijing.aliyuncs.com/8b6d732121944bda8fdde68843186c93"></image>
	  			<view>{{item.browseCount}}</view>
	  		</view>
	  		
	  		
	  	</view>
	  </view>
    </swiper-item>
  </swiper>
</view></uni-shadow-root>
</template>

<script>

global['__wxVueOptions'] = {components:{}}

global['__wxRoute'] = 'video-swiper/index'
module.exports =
	/******/
	(function(modules) { // webpackBootstrap
		/******/ // The module cache
		/******/
		var installedModules = {};
		/******/
		/******/ // The require function
		/******/
		function __webpack_require__(moduleId) {
			/******/
			/******/ // Check if module is in cache
			/******/
			if (installedModules[moduleId]) {
				/******/
				return installedModules[moduleId].exports;
				/******/
			}
			/******/ // Create a new module (and put it into the cache)
			/******/
			var module = installedModules[moduleId] = {
				/******/
				i: moduleId,
				/******/
				l: false,
				/******/
				exports: {}
				/******/
			};
			/******/
			/******/ // Execute the module function
			/******/
			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
			/******/
			/******/ // Flag the module as loaded
			/******/
			module.l = true;
			/******/
			/******/ // Return the exports of the module
			/******/
			return module.exports;
			/******/
		}
		/******/
		/******/
		/******/ // expose the modules object (__webpack_modules__)
		/******/
		__webpack_require__.m = modules;
		/******/
		/******/ // expose the module cache
		/******/
		__webpack_require__.c = installedModules;
		/******/
		/******/ // define getter function for harmony exports
		/******/
		__webpack_require__.d = function(exports, name, getter) {
			/******/
			if (!__webpack_require__.o(exports, name)) {
				/******/
				Object.defineProperty(exports, name, {
					enumerable: true,
					get: getter
				});
				/******/
			}
			/******/
		};
		/******/
		/******/ // define __esModule on exports
		/******/
		__webpack_require__.r = function(exports) {
			/******/
			if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
				/******/
				Object.defineProperty(exports, Symbol.toStringTag, {
					value: 'Module'
				});
				/******/
			}
			/******/
			Object.defineProperty(exports, '__esModule', {
				value: true
			});
			/******/
		};
		/******/
		/******/ // create a fake namespace object
		/******/ // mode & 1: value is a module id, require it
		/******/ // mode & 2: merge all properties of value into the ns
		/******/ // mode & 4: return value when already ns object
		/******/ // mode & 8|1: behave like require
		/******/
		__webpack_require__.t = function(value, mode) {
			/******/
			if (mode & 1) value = __webpack_require__(value);
			/******/
			if (mode & 8) return value;
			/******/
			if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
			/******/
			var ns = Object.create(null);
			/******/
			__webpack_require__.r(ns);
			/******/
			Object.defineProperty(ns, 'default', {
				enumerable: true,
				value: value
			});
			/******/
			if (mode & 2 && typeof value != 'string')
				for (var key in value) __webpack_require__.d(ns, key, function(key) {
					return value[key];
				}.bind(null, key));
			/******/
			return ns;
			/******/
		};
		/******/
		/******/ // getDefaultExport function for compatibility with non-harmony modules
		/******/
		__webpack_require__.n = function(module) {
			/******/
			var getter = module && module.__esModule ?
				/******/
				function getDefault() {
					return module['default'];
				} :
				/******/
				function getModuleExports() {
					return module;
				};
			/******/
			__webpack_require__.d(getter, 'a', getter);
			/******/
			return getter;
			/******/
		};
		/******/
		/******/ // Object.prototype.hasOwnProperty.call
		/******/
		__webpack_require__.o = function(object, property) {
			return Object.prototype.hasOwnProperty.call(object, property);
		};
		/******/
		/******/ // __webpack_public_path__
		/******/
		__webpack_require__.p = "";
		/******/
		/******/
		/******/ // Load entry module and return exports
		/******/
		return __webpack_require__(__webpack_require__.s = 0);
		/******/
	})
/************************************************************************/
/******/
([
	/* 0 */
	/***/
	(function(module, exports, __webpack_require__) {

		"use strict";


		Component({
			options: {
				addGlobalClass: true,
				pureDataPattern: /^_/
			},
			properties: {
				duration: {
					type: Number,
					value: 500
				},
				easingFunction: {
					type: String,
					value: 'default'
				},
				loop: {
					type: Boolean,
					value: true
				},
				downFile:{
					type:Function,
					value: null
				},
				userInfo: {
					type: Object,
					value: true
				},
				videoList: {
					type: Array,
					value: [],
					observer: function observer() {
						var newVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[
							0] : [];

						this._videoListChanged(newVal);
					}
				}
			},
			data: {
				nextQueue: [],
				prevQueue: [],
				curQueue: [],
				circular: false,
				_last: 1,
				_change: -1,
				_invalidUp: 0,
				_invalidDown: 0,
				_videoContexts: []
			},
			lifetimes: {
				attached: function attached() {
					this.data._videoContexts = [wx.createVideoContext('video_0', this), wx
						.createVideoContext('video_1', this), wx.createVideoContext('video_2',
							this)
					];
				}
			},
			methods: {
				godetail: function godetail(e){
					var o = e.currentTarget.dataset.o;
					wx.navigateTo({
						url:'/pages/goods_details/index?id='+ o
					})
				},
				downVideo: function downVideo(e) {
					var data = this.data;
					console.log(data.downFile)
					data.downFile(e);
				},
				_videoListChanged: function _videoListChanged(newVal) {
					var _this = this;

					var data = this.data;
					newVal.forEach(function(item) {
						data.nextQueue.push(item);
					});
					if (data.curQueue.length === 0) {
						this.setData({
							curQueue: data.nextQueue.splice(0, 3)
						}, function() {
							_this.playCurrent(1);
						});
					}
				},
				animationfinish: function animationfinish(e) {
					var _data = this.data,
						_last = _data._last,
						_change = _data._change,
						curQueue = _data.curQueue,
						prevQueue = _data.prevQueue,
						nextQueue = _data.nextQueue;

					var current = e.detail.current;
					var diff = current - _last;
					if (diff === 0) return;
					this.data._last = current;
					this.playCurrent(current);
					this.triggerEvent('change', {
						activeId: curQueue[current].id
					});
					var direction = diff === 1 || diff === -2 ? 'up' : 'down';
					if (direction === 'up') {
						if (this.data._invalidDown === 0) {
							var change = (_change + 1) % 3;
							var add = nextQueue.shift();
							var remove = curQueue[change];
							if (add) {
								prevQueue.push(remove);
								curQueue[change] = add;
								this.data._change = change;
							} else {
								this.data._invalidUp += 1;
							}
						} else {
							this.data._invalidDown -= 1;
						}
					}
					if (direction === 'down') {
						if (this.data._invalidUp === 0) {
							var _change2 = _change;
							var _remove = curQueue[_change2];
							var _add = prevQueue.pop();
							if (_add) {
								curQueue[_change2] = _add;
								nextQueue.unshift(_remove);
								this.data._change = (_change2 - 1 + 3) % 3;
							} else {
								this.data._invalidDown += 1;
							}
						} else {
							this.data._invalidUp -= 1;
						}
					}
					var circular = true;
					if (nextQueue.length === 0 && current !== 0) {
						circular = false;
					}
					if (prevQueue.length === 0 && current !== 2) {
						circular = false;
					}
					this.setData({
						curQueue: curQueue,
						circular: circular
					});
				},
				playCurrent: function playCurrent(current) {
					this.data._videoContexts.forEach(function(ctx, index) {
						index !== current ? ctx.pause() : ctx.play();
					});
				},
				onPlay: function onPlay(e) {
					this.trigger(e, 'play');
				},
				onPause: function onPause(e) {
					this.trigger(e, 'pause');
				},
				onEnded: function onEnded(e) {
					this.trigger(e, 'ended');
				},
				onError: function onError(e) {
					this.trigger(e, 'error');
				},
				onTimeUpdate: function onTimeUpdate(e) {
					this.trigger(e, 'timeupdate');
				},
				onWaiting: function onWaiting(e) {
					this.trigger(e, 'wait');
				},
				onProgress: function onProgress(e) {
					this.trigger(e, 'progress');
				},
				onLoadedMetaData: function onLoadedMetaData(e) {
					this.trigger(e, 'loadedmetadata');
				},
				trigger: function trigger(e, type) {
					var ext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] :
					{};

					var detail = e.detail;
					var activeId = e.target.dataset.id;
					this.triggerEvent(type, Object.assign(Object.assign(Object.assign({}, detail), {
						activeId: activeId
					}), ext));
				}
			}
		});

		/***/
	})
	/******/
]);
export default global['__wxComponents']['video-swiper/index']
</script>
<style platform="mp-weixin">
.swiper {
		position: relative;
		width: 100%;

	}
	
	.info {
		z-index: 1;
		position: absolute;
		bottom: 60upx;
		color: white;
		text-indent: 1em;
		font-size: 30upx;
	}
		
		
		
	.video {
		width: 100%;
		z-index: 0;
	}
	
	.add{
		position: absolute;
		bottom: -30upx;
		margin: 0 auto;
		right: 0upx;
		background-color: #f15b6c;
		left: 0upx;
		width: 50upx;
		height: 50upx;
		font-size: 50upx;
		line-height: 50upx;
		border-radius:50upx;
	}
	
	.header{
		border: 2px solid white;
		margin: 0 auto;
		border-radius:90upx;
		height: 90upx;
		width: 90upx;
	}
	.header_group{
		height: 90upx;
		width: 90upx;
		position: relative;
		margin-top: 90upx;
	}
	
	.button {
		text-align: center;
		font-size: 25upx;
	}
	
	.button .icon {
		margin: 20upx;
		width: 60upx;
	}
	
	.buttons {
		display: flex;
		flex-direction: column;
		position: absolute;
		right: 5vw;
		bottom: 12vh;
		color: white;
		text-align: center;
		justify-content: center;
		z-index: 1;
		
		
	}
</style>