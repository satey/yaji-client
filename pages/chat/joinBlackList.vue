<template>
	<view class="">
		<u-navbar title="用户设置" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view class="">
			<view class="" style="margin-left: 50rpx; margin-top: 20rpx;">加入黑名单</view>
				<u-switch style='margin-left: 680rpx; margin-top: -30rpx;' @change="change"  v-model="checked"></u-switch>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'joinBlackList',
		data() {
			return {
				checked: false,
			}
		},
		computed: {
	
		},
		
		methods: {
			change(status) {
				// console.log(status);
				let that=this
				if(status){
				that.$api('user_black.lists', { post_id: that.$Route.query.post_id }).then(res => {
				    if (res.code === 1) {
				        that.post = res.data
					}
				})
				}else{
			
				}
			},
		}
	}
</script>

<style>
</style>