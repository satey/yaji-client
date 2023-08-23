<template>
	<view style="background: #f3f3f3;">
		<u-navbar title="名人堂" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view class="listBox">
			<block v-for="(item,index) in lists" :key="index">
				<view v-if="item.status =='normal'" class="item" @click="$u.route('/pages/user/roleDetails',{
					id:item.id,
					title:item.title
				})">
					<view>{{item.title}}</view>
					<view v-if="item.images!=null">
						<block v-for="(itemImg,indexImg) in item.images" :key="index">
							<image :src="itemImg" style="width: 50rpx;height: 50rpx;border-radius: 50%;" mode="">
							</image>
						</block>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists: []
			};
		},
		onLoad() {
			this.searchName()
		},
		methods: {
			searchName() {
				let that = this
				that.$api('role_title.lists').then(res => {
					console.log(res)
					if (res.code === 1) {
						that.lists = res.data
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.listBox {
		padding: 30rpx;
		box-sizing: border-box;
	}

	.item {
		background: #fff;
		margin-bottom: 30rpx;
		box-sizing: border-box;
		display: flex;
		padding-left: 30rpx;
		height: 100rpx;
		align-items: center;
		justify-content: space-between;
		border-radius: 10rpx;
	}
</style>