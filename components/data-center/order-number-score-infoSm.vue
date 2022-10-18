<template>
	<view class="content">
		<scroll-view v-if="true" scroll-y class="data_body" :style="{height:scrollHeight}" @scroll="toScroll">

			<view class="friend_operate">
				<view class="title">订单商品占比 </view>
				<view class="pickerData">
					<picker mode="date" :value="date" fields="month" @change="dateChange">
						<view>{{date}}</view>
					</picker>
					<image src="/static/icon_select.png" class="icon_select"></image>
				</view>
				<text-block :isPC="isPC" :content="baseData"></text-block>
			</view>
			<view class="split_line"></view>


		<!-- 微客群运营-->
			<view class="friend_operate">
				<view class="title">日订单积分明细
				<view class="pickerData2">
					<picker mode="date" :value="date2" fields="month" @change="dateChange2">
						<view>{{date2}}</view>
					</picker>
					<image src="/static/icon_select.png" class="icon_select"></image>
				</view>
				</view>
				<senior-table v-if="!isPC" :headers="dataTable.headers" headerBgColor="#F78D58"
					:contents="dataTable.contents" :urlCol="dataTable.urlCol" :firstLineFixed="true"
					:sortCol="dataTable.sortCol" :computedCol="dataTable.computedCol"
					:formatCol="dataTable.formatCol" />
				<senior-table v-else headerBgColor="#F78D58" :headers="dataTable.headers" :contents="dataTable.contents"
					:urlCol="dataTable.urlCol" :firstLineFixed="true" :sortCol="dataTable.sortCol"
					:computedCol="dataTable.computedCol" :formatCol="dataTable.formatCol" default-col-width="400"
					:min-height="seniorHeightInPc" :font-size="seniorFontSizeInPc" />
			</view>
			<view class="split_line"></view>

	<view class="friend_operate">
				<view class="title">日订单数明细
				</view>
				<senior-table v-if="!isPC" :headers="dataTable.headers2" headerBgColor="#F78D58"
					:contents="dataTable.contents" :urlCol="dataTable.urlCol" :firstLineFixed="true"
					:sortCol="dataTable.sortCol" :computedCol="dataTable.computedCol"
					:formatCol="dataTable.formatCol" />
				<senior-table v-else headerBgColor="#F78D58" :headers="dataTable.headers2" :contents="dataTable.contents"
					:urlCol="dataTable.urlCol" :firstLineFixed="true" :sortCol="dataTable.sortCol"
					:computedCol="dataTable.computedCol" :formatCol="dataTable.formatCol" default-col-width="400"
					:min-height="seniorHeightInPc" :font-size="seniorFontSizeInPc" />
			</view>
			<view class="split_line"></view>
	
		</scroll-view>
		<view v-else class="container padding_stand-big normal_color">
			<li class="iconfont icon-cry cry"></li>暂无数据
		</view>
	</view>
</template>

<script>
	import Api from "../../static/api/mall/index.js"

	import DataProgress from "../data-progress/data-progress.vue"
	import SeniorTable from "../data-table/senior-table.vue"

	import {DayOrderNumberScoreInfo,DayOrderNumberScoreAccount} from '@/api/user'
	var _self;
	export default {
		name: 'user-healthy',
		props: {
			scrollHeight: {
				type: String,
				default: "600px"
			},
			currentTab: {
				type: String,
				default: ""
			},
			isPC: {
				type: Boolean,
				default: false
			},
			isCanvas2d: {
				type: Boolean,
				default: true
			}
		},
		components: {
			DataProgress,
			SeniorTable
		},
		data() {
			const currentDate = this.getDate({
				format: 'yyyy-mm'
			})
			const currentDate2 = this.getDate({
				format: 'yyyy-mm'
			})
			return {
				seniorHeightInPc: [150, , 150],
				seniorFontSizeInPc: [30, 30],
			
				delayload: false, //延时加载图表，否则会出现图表加载完后定位错乱
				pageScrollTop:0,
				animationData: {},
				off: false, //判断是否开启动画
				dataTable:{},
				baseData:{},
				date: currentDate,
				date2: currentDate2,
			}
		},
		mounted() {
			this.getData();
			// 初始化一个动画
			var animation = uni.createAnimation({
				duration: 1000,
				timingFunction: 'ease',
			})
			this.animation = animation
			this.DayOrderNumberScoreInfo("wkp42271043176625", this.date);
			this.DayOrderNumberScoreAccount("wkp42271043176625", this.date);
			
		},
	
		methods: {
			dateChange(e) {
				this.date = e.target.value.slice(0, 7);
				this.DayOrderNumberScoreAccount("wkp42271043176625", this.date);
			},
			dateChange2(e) {
				console.log(e)
				this.date2 = e.target.value.slice(0, 7);
				this.DayOrderNumberScoreInfo("wkp42271043176625", 	this.date2 );
			},
			// 获取年月日信息
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				// day = day > 9 ? day : '0' + day;
				return `${year}-${month}`;
			},
			DayOrderNumberScoreInfo(platform,date){
				DayOrderNumberScoreInfo({"platform":platform,"date":date}).then(res => {
					this.dataTable = res.data
				});
			},
			
			DayOrderNumberScoreAccount(platform,date){
				DayOrderNumberScoreAccount({"platform":platform,"date":this.date}).then(res => {
					this.baseData = res.data
				});
			},
			//开启动画事件
			declick() {
				if (!this.off) {
					this.rotateAndScale()
					this.off = true;
				}
			},
			// 定义动画内容
			rotateAndScale() {
				// 定义动画内容
				this.animation.translateX(-80).step();
				// 导出动画数据传递给data层
				this.animationData = this.animation.export();
				var timer = setTimeout(() => {
					this.off = false;
					this.norotateAndScale();
				}, 3000)
			},
			norotateAndScale() {
				this.animation.translateX(0).step()
				this.animationData = this.animation.export()
			},
			toScroll(e) {
			  this.pageScrollTop = e.detail.scrollTop
				this.declick();
			},
			async getData(){
				uni.showLoading();
				await setTimeout(() => {
					this.delayload = true;
					uni.hideLoading();
				}, 1000)
			}
		}
	}
</script>

<style scoped lang="less">
	.icon_select {
		width: 25rpx;
		height: 15rpx;
		margin-top: 10rpx;
		margin-left: 10rpx;
	}
	
	.pickerData {
		float: right;
		margin-right: 40rpx;
		margin-top: -55rpx;
		display: flex;
	}
	.pickerData2 {
		float: right;
		margin-right: 40rpx;
		display: flex;
	}
	.content {
		padding-top: 10rpx;

		.data_body {
			height: 100%;
		}

		.progress,
		.firend_operate {
			padding: 0 10rpx;
		}

		.progress {
			margin-bottom: 20rpx;
		}

		.friend_operate {
			padding: 30rpx 10rpx;

			.title {
				text-align: left;
				margin-bottom: 20rpx;
			}

			.trend_title {
				text-align: right;
				font-size: 22rpx;
				color: #ff9900;
				margin-top: 20rpx;
			}
		}
	}
</style>
