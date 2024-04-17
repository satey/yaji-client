<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="px-4">
		<u-navbar :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
			<view slot="right">
				<view class="ri-user-unfollow-line" style="color: #000;font-size: 45rpx;" @click="skipBackList"></view>
				<!-- <image  style="width: 30rpx;  height: 30rpx;"
					src="https://axhub.im/ax10/85ee1db375b49826/images/%E6%9C%8B%E5%8F%8B/u10.svg" mode=""></image> -->
			</view>
		</u-navbar>
		<view>
			<u-tabs :list="tablist" lineColor="#FFA000" lineWidth="70rpx" lineHeight="16rpx" itemStyle="height: 72rpx;"
				inactiveStyle="color: #787878; transform: scale(1);"
				activeStyle="color: #333333; font-weight: blod; transform: scale(1.2);" @change="changeTab"
				@click="click">
			</u-tabs>
		</view>
		<uc-follow v-for="(item, index) in listUserFollow" :key="index" :item="item" :tabIndex="tabsIndex"></uc-follow>
		<!-- <u-loadmore v-if="listUserFollow.length" :status="loadmore" nomoreText="" color="#a1a1a1" marginTop="20" /> -->
		<u-empty v-if="!listUserFollow.length" icon="/static/wurenwu.png" text="数据为空" textColor="#a1a1a1"
			marginTop="100"></u-empty>
		<topPrompt></topPrompt>
		<feiqslsHit></feiqslsHit>
	</view>
</template>
<script>
	export default {
		name: 'contact',
		components: {},
		data() {
			return {
				tablist: [{
						name: '关注',
						type: 'follow',
						count: 0
					},
					{
						name: '粉丝',
						type: 'fans',
						count: 0
					},
					{
						name: '朋友',
						type: 'friend',
						count: 0
					},
				],
				listUserFollow: [],
				params: {
					type: 'follow',
					page: 1,
					limit: 10
				},
				paginator: {
					total: 0,
					last_page: 0,
				},
				loadmore: false,
				// -------------
				tabsIndex: 0,
			}
		},
		onShow(option) {
			let that = this;
			this.listUserFollow = []
			that.getUserFollow()
		},
		onLoad() {
			var that = this;
			uni.$on("followClic", function() {
				that.listUserFollow = []
				that.getUserFollow()
			})
		},
		onReachBottom() {
			let that = this;
			// if (that.loadmore === 'nomore') return false
			// that.loadmore = 'nomore'
			that.params.page = ++that.params.page
			that.getUserFollow();
		},
		methods: {
			click(e) {
				this.tabsIndex = e.index;
			},
			skipBackList() {
				// 跳转到黑名单
				uni.navigateTo({
					url: '/pages/mine/blackList',
					success() {
						console.log('jac');
					},
					fail(err) {
						console.log(err);
					}

				})
			},
			changeTab(e) {
				// console.log(e)
				let that = this
				that.params.type = e.type
				that.listUserFollow = []
				that.params.page = 1
				that.getUserFollow()
			},
			async getUserFollow(e) {
				let that = this;
				that.loadmore = 'loading'
				that.$api('user_follow.lists', that.params).then(res => {
					if (res.code === 1) {
						// that.paginator.total = res.data.total
						// that.paginator.last_page = res.data.last_page
						// that.listUserFollow = [...that.listUserFollow, ...res.data.data]
						that.listUserFollow.push(...res.data);
						// if (that.params.page < res.data.last_page) {
						// 	that.loadmore = 'loadmore'
						// } else {
						// 	that.loadmore = 'nomore'
						// }
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>