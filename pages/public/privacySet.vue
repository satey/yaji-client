<template>
	<view class="privacySet">
		<u-navbar title="隐私设置" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view style="padding: 30rpx 30rpx 30rpx 50rpx;">
			<view class="item">
				<view>个性化推荐</view>
				<switch checked="true" @change="" color="#FFA000" style="transform: scale(0.8);" />
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #323232;
	}
</style>