<template>
	<view class="wave">
		<view class="waveItem" :style="{background:nums>=80?'#fff':'transparent'}"></view>
		<view class="waveItem" :style="{background:nums>=80?'#fff':'transparent'}"></view>
		<view class="waveItem" :style="{background:nums>=60?'#fff':'transparent'}"></view>
		<view class="waveItem" :style="{background:nums>=40?'#fff':'transparent'}"></view>
		<view class="waveItem" :style="{background:nums>=20?'#fff':'transparent'}"></view>
	</view>
</template>

<script>
	export default {
		props: ['nums'],
		data() {
			return {

			}
		},
		watch: {
			nums: {
				handler(newVal, oldVal) {
				},
				immediate: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wave {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.waveItem {
		height: 5rpx;
		background: red;
		border-radius: 20rpx;
		margin-bottom: 5rpx;

		&:nth-child(1) {
			width: 10rpx;
		}

		&:nth-child(2) {
			width: 15rpx;
		}

		&:nth-child(3) {
			width: 20rpx;
		}

		&:nth-child(4) {
			width: 15rpx;
		}

		&:nth-child(5) {
			width: 10rpx;
		}
	}
</style>