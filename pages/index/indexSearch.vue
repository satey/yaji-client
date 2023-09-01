<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="px-4">
		<u-navbar :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left" @click="back">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
			<view slot="center">
				{{titleItem.title}}
			</view>
		</u-navbar>
		</block>
		<view class="pt-4">
			<block v-if="type === 'search'">
				<!-- <uc-user v-for="(item, index) in listUserSearch" :key="index" :item="item"></uc-user> -->
				<uc-search v-for="(item, index) in listUserSearch" :key="index" :item="item"></uc-search>
				<u-loadmore v-if="listUserSearch.length" :status="loadmore" nomoreText="" color="#a1a1a1"
					marginTop="20" />
				<u-empty v-if="!listUserSearch.length" icon="/static/noSearch.png" text="数据为空" textColor="#a1a1a1"
					marginTop="100"></u-empty>
			</block>
		</view>
		<uc-auth></uc-auth>
	</view>
</template>

<script>
	export default {
		name: 'indexSearch',
		components: {},
		data() {
			return {
				type: 'hot',
				listUserRecommend: [],
				listUserSearch: [],
				listRoleDynasty: [],
				listRoleAchievement: [],
				listRoleTitle: [],
				params: {
					page: 1,
					keywords: null,
					dynasty: null,
					title: null,
					achievement: null,
					role_title_id: null
				},
				paginator: {
					total: 0,
					last_page: 0,
				},
				loadmore: false,
				help: '小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士',
				showHelp: false,
				titleItem: ''

			}
		},
		onLoad(option) {
			console.log()
			var titleItem = JSON.parse(option.titleItem)
			let that = this;
			that.getUserRecommend()
			that.getRoleDynasty()
			that.getRoleAchievement()
			that.getRoleTitle()
			that.handleSearchTitle(titleItem)
		},
		onReachBottom() {
			let that = this
			if (that.loadmore === 'nomore') return false
			that.loadmore = 'loading'
			that.params.page = ++that.params.page
			that.getUserSearch()
		},
		methods: {
			// 清除历史记录
			clearAll() {
				let that = this
				that.listUserRecommend = []
			},
			back() {
				uni.removeStorageSync('titleItem')
			},
			// 历史记录搜索
			LishandleSearch() {
				let that = this
				that.params.page = 1
				that.type = 'search'
				that.listUserSearch = []
				that.getUserSearch()
			},
			handleSearch() {
				let that = this
				if (!that.params.keywords) {
					that.$u.toast('关键字不能为空')
					return false
				}
				that.params.page = 1
				that.type = 'search'
				that.listUserSearch = []
				that.getUserSearch()
			},
			handleSearchDynasty(item) {
				let that = this
				that.params.dynasty = item.dynasty
				that.params.page = 1
				that.type = 'search'
				that.listUserSearch = []
				that.getUserSearch()
			},
			handleSearchTitle(item) {
				let that = this
				that.params.role_title_id = item.id
				that.params.page = 1
				that.type = 'search'
				that.listUserSearch = []
				that.getUserSearch()

				that.titleItem = item
			},
			handleSearchAchievement(item) {
				let that = this
				that.params.achievement = item.achievement
				that.params.page = 1
				that.type = 'search'
				that.listUserSearch = []
				that.getUserSearch()
			},
			async getUserRecommend() {
				let that = this
				that.$api('user.search_log', {}).then(res => {
					if (res.code === 1) {
						that.listUserRecommend = res.data
					}
				})
			},
			async getUserSearch() {
				let that = this
				that.loadmore = 'loading';
				console.log(that.params)
				that.$api('user.recommend', that.params).then(res => {
					console.log(res)
					if (res.code === 1) {
						// if(res.data.is_free==0){
						// 	that.isfree=true
						// }
						// if(res.data.is_free==1){
						// 	that.isfreed=false
						// }
						that.paginator.total = res.data.total
						that.paginator.last_page = res.data.last_page
						that.listUserSearch = [...that.listUserSearch, ...res.data.data]
						if (that.params.page < res.data.last_page) {
							that.loadmore = 'loadmore'
						} else {
							that.loadmore = 'nomore'
						}
					}
				})
			},
			async getRoleDynasty() {
				let that = this
				that.$api('role_dynasty.lists').then(res => {
					if (res.code === 1) {
						that.listRoleDynasty = res.data
					}
				})
			},
			async getRoleAchievement() {
				let that = this
				that.$api('role_achievement.lists').then(res => {
					if (res.code === 1) {
						that.listRoleAchievement = res.data
					}
				})
			},
			async getRoleTitle() {
				let that = this
				that.$api('role_title.lists').then(res => {
					if (res.code === 1) {
						that.listRoleTitle = res.data
					}
				})
			},
		}
	}
</script>

<style>
	.characterTitle {
		height: 640rpx;
		white-space: nowrap;
		overflow-x: hidden;
		overflow-y: auto;
		transform: translateZ(0);
	}

	.characterTitle-item {
		display: inline-block;

	}
</style>