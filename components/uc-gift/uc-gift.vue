<template>
	<view style="width: 100%;">
		<view style="padding: 30rpx 0rpx;display: flex;justify-content: space-between;">
			<image src="/static/liwu.png" style="width: 92rpx;height: 92rpx;"></image>
			<view
				style="flex:1;display: flex;justify-content: space-between;align-items: center;border-bottom: 1rpx solid #ECECEC;height: 92rpx;padding-bottom: 30rpx;">
				<text style="margin-left: 20rpx;font-size: 32rpx;color: #323232;">芍药花</text>
				<text style="font-size: 30rpx;color: #323232;">×66</text>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		data() {
			return {}
		},
		props: {
			item: {}
		},
		created() {
			console.log(this.item)
			
		},
		methods: {}
	}
</script>

<style lang="scss">

</style>