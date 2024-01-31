<template>
	<view style="min-height: 100vh;background: #F8F8F8;height: 100%;">
		<u-navbar title="才华成就" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view>
			<view style="display: flex;align-items: center;flex-wrap: wrap;">
				<view style="width:calc(100% / 4);height:150rpx;box-sizing: border-box;padding: 20rpx;"
					v-for="(item,index) in lists" :key="index">
					<image :src="item.image" style="width: 100%;height: 100%;" mode="widthFix"></image>
				</view>
			</view>
			<u-empty v-if="!lists.length" icon="/static/iconImage/jilu.png" text="暂未获得才华勋章" textColor="#a1a1a1"
				marginTop="100"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists: []
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList() {
				this.$api("user.gloryList").then(res => {
					console.log(res)
					if (res.code == 1) {
						this.lists = res.data;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100vh;
		background: #F8F8F8;
	}
</style>