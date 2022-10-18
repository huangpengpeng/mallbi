<template>
	<scroll-view class="sidebar" scroll-y="true">

		<uni-nav-menu :uniqueOpened="true" :active="splitFullPath(active)" activeKey="url" textColor="#666" activeTextColor="#409eff" @select="select">
			<uni-menu-sidebar :data="navMenu"></uni-menu-sidebar>
<!-- 			<uni-menu-sidebar :data="staticMenu"></uni-menu-sidebar> -->
		</uni-nav-menu>
	</scroll-view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import config from '@/admin.config.js'
	export default {
		data() {
			return {
				...config.sideBar,
				defaultValue: '',
				current: '',
				active:'1',
				navMenu:[{
					"enable": true,
					"icon": "uni-icons-gear",
					"menu_id": "system_management",
					"name": "当月积分汇总",
					"parent_id": "",
					"permission": [],
					"sort": 1000,
					"url": "/pages/index/index?currentTab=PAGE_THREE_SM",
					// "children": [{
					// 			"_id": "605d30cc4f2517000142f3b9",
					// 			"enable": true,
					// 			"icon": "uni-icons-map-filled",
					// 			"menu_id": "system-report",
					// 			"name": "水母博士",
					// 			"parent_id": "system_management",
					// 			"permission": ["read"],
					// 			"sort": 1050,
					// 			"url": "/pages/index/index?currentTab=PAGE_THREE",
					// 			"isLeafNode": true,
					// 			"children": []
					// 		},
					// 		{
					// 					"_id": "605d30cc4f2517000142f3b9",
					// 					"enable": true,
					// 					"icon": "uni-icons-map-filled",
					// 					"menu_id": "system-report",
					// 					"name": "同富时代",
					// 					"parent_id": "system_management",
					// 					"permission": ["read"],
					// 					"sort": 1050,
					// 					"url": "/pages/index/index?currentTab=PAGE_FOUR",
					// 					"isLeafNode": true,
					// 					"children": []
					// 				}]
					},
					{
						"enable": true,
						"icon": "uni-icons-gear",
						"menu_id": "system_management",
						"name": "团队每日积分明细",
						"parent_id": "",
						"permission": [],
						"sort": 1000,
						"url": "/pages/teamScoreInfo/index?currentTab=TEAM_SCORE_INFO_SM",
						},
						{
							"enable": true,
							"icon": "uni-icons-gear",
							"menu_id": "system_management",
							"name": "团队每日新增创客",
							"parent_id": "",
							"permission": [],
							"sort": 1000,
							"url": "/pages/teamMemberNumber/index?currentTab=TEAM-MEMBER-NUMBER-SM",
							},
							{
								"enable": true,
								"icon": "uni-icons-gear",
								"menu_id": "system_management",
								"name": "日订单积分明细",
								"parent_id": "",
								"permission": [],
								"sort": 1000,
								"url": "/pages/orderNumberScoreInfo/index?currentTab=ORDER-NUMBER-SCORE-INFO-SM",
								}
					],
					
			}
		},
		computed: {
			// ...mapState('app', ['inited', 'navMenu', 'active'])
		},
		// #ifdef H5
		watch: {
			$route: {
				immediate: true,
				handler(newRoute, oldRoute) {
					if (newRoute.fullPath !== (oldRoute && oldRoute.fullPath)) {
						this.changeMenuActive(newRoute.fullPath)
					}
				}
			},
			current: {
				immediate: true,
				handler(newUrl) {
					this.select(newUrl)
				}
			}
		},
		// #endif
		methods: {
			...mapActions({
				changeMenuActive: 'app/changeMenuActive'
			}),
			select(e) {
			
				let url = e.url
	console.log(url)
				if (!url) {
					url = this.active
					this.current = url
				}
				this.clickMenuItem(url)
			},
			clickMenuItem(url) {
				// #ifdef H5
				if (url.indexOf('http') === 0) {
					return window.open(url)
				}
				// #endif

				// url 开头可用有 / ，也可没有
				if (url[0] !== '/' && url.indexOf('http') !== 0) {
					url = '/' + url
				}
				// TODO 后续要调整
				uni.redirectTo({
					url: url,
					fail: () => {
						uni.showModal({
							title: '提示',
							content: '页面 ' + url + ' 跳转失败',
							showCancel: false
						})
					}
				})
			},
			splitFullPath(path) {
				if (!path) path = '/'
				return path.split('?')[0]
			}
		}
	}
</script>

<style lang="scss">
	.sidebar {
		position: fixed;
		top: var(--top-window-height);
		width: 240px;
		height: calc(100vh - (var(--top-window-height)));
		box-sizing: border-box;
		border-right: 1px solid darken(#fff, 8%);
		background-color: #fff;
		padding-bottom: 10px;
	}

	.title {
		margin-left: 5px;
	}
</style>
