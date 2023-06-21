<template>
	<u-modal :show="showModal" :showConfirmButton="false" :showCancelButton="false">
		<!-- <view class="w-full text-center">
            <view class="text-2xl mt-4">注册登录</view>
            <view class="mt-4">根据国家规定，需登录才能使用相关功能</view>
            <view class="grid grid-cols-2 gap-4 mt-10">
                <view class="rounded-full p-6 text-base leading-none bg-gray-100" @click="showModal = false">取消</view>
                <view class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500" @click="$u.route('/pages/auth/login')">确定</view>
            </view>
        </view> -->
	</u-modal>
</template>

<script>
	import Wechat from '@/common/wechat/wechat'
	import {
		mapMutations,
		mapActions,
		mapState
	} from 'vuex'
	export default {
		components: {},
		data() {
			return {}
		},
		props: {
			value: {},
			modalType: {
				type: String,
				default: ''
			}
		},
		computed: {
			...mapState({
				showLoginTip: state => state.user.showLoginTip
			}),
			showModal: {
				get() {
					if (this.showLoginTip) {
						uni.navigateTo({
							url: '/pages/auth/login'
						})
					}

					// console.log( this.showLoginTip);
					return this.showLoginTip
				},
				set(val) {
					this.$store.commit('LOGIN_TIP', val)
				}
			}
		},

		methods: {
			...mapActions(['getUserInfo']),
			async wxLogin() {
				let that = this
				let wechat = new Wechat()
				let token = await wechat.login()
				uni.setStorageSync('token', token)
				that.getUserInfo()
			}
		},
		created() {},

	}
</script>

<style lang="scss">

</style>