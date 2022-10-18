<template>
	<view class="login-box">
		<view class="admin-logo">
		<!-- 	<image src="/static/icon_nodatas.png" mode="heightFix"></image> -->
		</view>
		<view class="uni-header no-padding">
			<view class="uni-title">系统登录</view>
		</view>
		<view class="uni-container">
			<uni-forms ref="form" v-model="formData"  @submit="submit">
				<uni-forms-item name="username" labelWidth="35">
					<input class="uni-input-border" type="text" placeholder="账户" v-model="formData.username" />
				</uni-forms-item>
				
				<view class="fenge"></view>
				<uni-forms-item class="icon-container" name="password" labelWidth="35">
					<input  class="uni-input-border" placeholder="密码" v-model="formData.password" type="password"/>
				</uni-forms-item>
				
				<view class="fenge"></view>
				<uni-forms-item  class="icon-container" name="code" labelWidth="35">
					<input class="uni-input-border" placeholder="动态验证码" v-model="formData.code" />
				</uni-forms-item>
				
				<view class="uni-button-group">
					<button class="uni-button uni-button-full" type="primary" style="background-color: #409EFF;" :loading="loading" :disabled="loading" @click="submit">登录</button>
				</view>
			</uni-forms>
		
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapActions
	} from 'vuex'
	import {loginMobileCode} from '@/api/user'

	export default {
		data() {
			return {
				loading: false,
				formData: {
					username: '',
					password: '',
					code: ''
				}
			}
		},
		methods: {
		
			submit(event) {
				if (this.loading) {
					return
				}
				
				if (!this.formData.username) return this.$util.Tips({
					title: '请填写用户名'
				});
				if (!this.formData.password) return this.$util.Tips({
					title: '请填写密码'
				});
				if (!this.formData.code) return this.$util.Tips({
					title: '请填写动态验证码'
				});
				if (!/^[\w\d]+$/i.test(this.formData.code)) return this.$util.Tips({
					title: '请输入正确的动态验证码'
				});
				
				this.loading = true
				
				let data =this.formData
				loginMobileCode(data).then(res => {
				if (res.data) {
					console.log(res.data)
					this.$store.commit('LOGIN', {
						token: res.data,
						time: '2099-01-01'
					});
				}
					this.$util.Tips({
						title: '登录成功',
						icon: 'success'
					});
					
				setTimeout(() => {
					uni.navigateTo({
						url:"/pages/index/index?currentTab=PAGE_THREE_SM"
					})
				}, 3000)
					
					
				}).catch(err => {
						this.$util.Tips({
							title: err
						});
					}).finally(err => {
						this.loading = false
					});

			},
			
		
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		background-color: #fff;
	}

	.fenge{
		height: 40rpx;
	}
	/* 标题栏 */
	.uni-header {
		padding: 0 15px;
		display: flex;
		height: 55px;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px #f5f5f5 solid;
	}

	.uni-button-full {
		width: 100%;
		height: 80rpx;
	}
	/* 按钮样式 */
	.uni-button-group {
		margin-top: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 30rpx;
	}
	
	.uni-input-border,
	.uni-textarea-border {
		width: 100%;
		font-size: 14px;
		color: #666;
		border: 1px #e5e5e5 solid;
		border-radius: 5px;
		box-sizing: border-box;
	}
	
	.uni-input-border {
		padding: 0 10px;
		height: 35px;
		
	}
.uni-icons-person-filled:before {
	content: "\e131";
}
	.login-box {
		position: relative;
		max-width: 350px;
		flex: 1;
		padding: 140px 35px 0;
		margin: 0 auto;
		overflow: hidden;
		/* background-color: #F5F5F5; */
	}


	.underline:hover {
		text-decoration: underline;
	}

	.uni-tips {
		display: flex;
		justify-content: flex-end;
		margin-top: 15px;
	}

	.uni-tips-text {
		cursor: pointer;
		text-decoration: underline;
		font-size: 13px;
		color: #007AFF;
		opacity: 0.8;
	}

	.no-padding {
		padding: 0;
	}

	.admin-logo {
		display: flex;
		justify-content: center;
		margin-bottom: 30px;
	}

	.admin-logo image {
		height: 80px;
	}

	.admin-captcha-img {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		width: 100px;
		height: 33px;
		border: 1px #E5E5E5 solid;
		border-radius: 0 5px 5px 0;
		background-color: #f9f9f9;
	}
	.admin-captcha-img img {
		border-radius: 5px;
		/* #ifndef H5 */
		height: 75rpx;
		/* #endif */
	}

	.uni-loading:before {
	    background: rgba(0,0,0,0) url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=") no-repeat
	}

	.uni-loading {
		margin: 0 auto;
	    width: 20px;
	    height: 20px;
	    display: inline-block;
	    vertical-align: middle;
	    -webkit-animation: uni-loading 1s steps(12) infinite;
	    animation: uni-loading 1s steps(12) infinite;
	    background-size: 100%
	}

	@-webkit-keyframes uni-loading {
	    0% {
	        -webkit-transform: rotate(0deg);
	        transform: rotate(0deg)
	    }

	    to {
	        -webkit-transform: rotate(1turn);
	        transform: rotate(1turn)
	    }
	}

	@keyframes uni-loading {
	    0% {
	        -webkit-transform: rotate(0deg);
	        transform: rotate(0deg)
	    }

	    to {
	        -webkit-transform: rotate(1turn);
	        transform: rotate(1turn)
	    }
	}
</style>
