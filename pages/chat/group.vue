<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="px-4">
		<u-navbar :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
			<view slot="right">
				<i class="ri-question-fill text-3xl bg-gradient-to-b from-red-400 to-red-200 bg-clip-text text-transparent"
					@click="showHelp = true"></i>
			</view>
		</u-navbar>

		<view class="fixed bottom-0 left-0 right-0 flex p-4">
			<view class="flex-1 mr-4">
				<view class="rounded-full h-10 flex items-center px-4 bg-white bg-opacity-20">
					<u-input type="text" placeholder="说点什么吧" :clearable="true"
						customStyle="border: none; background: none; padding: 0;">
						<i slot="suffix" class="ri-message-3-fill text-base leading-none text-white opacity-70"></i>
					</u-input>
				</view>
			</view>
			<view class="mr-4">
				<view class="rounded-full w-10 h-10 flex items-center justify-center bg-white bg-opacity-20">
					<i class="ri-gift-fill text-base leading-none text-white opacity-70"></i>
				</view>
			</view>
			<view class="mr-4">
				<view class="rounded-full w-10 h-10 flex items-center justify-center bg-white bg-opacity-20">
					<i class="ri-apps-2-fill text-base leading-none text-white opacity-70"></i>
				</view>
			</view>
			<view class="">
				<view class="rounded-full w-10 h-10 flex items-center justify-center bg-white bg-opacity-20">
					<i class="ri-mic-off-fill text-base leading-none text-white opacity-70"></i>
				</view>
			</view>
		</view>

		<uc-auth></uc-auth>
	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				showAction: false,
			}
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo,
			})
		},
		onLoad() {
			let that = this
		},
		methods: {}
	}
</script>

<style scoped>

</style>