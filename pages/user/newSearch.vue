<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="px-4">
	    <u-navbar :safeAreaInsetTop="true" :placeholder="true">
	        <view slot="left">
	            <i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
	        </view>
	        <view slot="right">
	            <i class="ri-question-fill text-3xl bg-gradient-to-b from-red-400 to-red-200 bg-clip-text text-transparent" @click="showHelp = true"></i>
	        </view>
	    </u-navbar>
	
	    <view class="pt-4">
	        <view class="flex rounded-full bg-gray-100">
	            <u-input v-model="params.keywords" :focus="true" placeholder="输入角色名搜索" type="text" maxlength="20">
	                <i slot="prefix" class="ri-search-2-line text-xl leading-none text-gray-500"></i>
	                <text slot="suffix" class="text-rose-500" @click="handleSearch()">搜索</text>
	            </u-input>
	        </view>
	        <block v-if="type === 'hot'">
	           <!-- <view class="text-xl text-gray-500 mt-8">角色朝代</view>
	            <view class="flex flex-wrap flex-direction-row">
	                <view v-for="(item, index) in listRoleDynasty" :key="index" :item="item" :class="params.dynasty === item ? '!bg-rose-200' : ''" @click="handleSearchDynasty(item)" class="rounded text-base leading-none p-2 bg-gray-100 mt-4 mr-4">
	                    {{ item.dynasty }}
	                </view>
	            </view>
	            <view class="text-xl text-gray-500 mt-8">角色称号</view> -->
	            <view class="flex flex-wrap flex-direction-row characterTitle">
	                <view v-for="(item, index) in listRoleTitle" :key="index" :item="item" @click="handleSearchTitle(item)" class="rounded text-base leading-none p-2 bg-gray-100 mt-4 mr-4 characterTitle-item ">
	                    {{ item.title }}
	                </view>
	            </view>
	            <!-- <view class="text-xl text-gray-500 mt-8">角色成就</view>
	            <view class="flex flex-wrap flex-direction-row">
	                <view v-for="(item, index) in listRoleAchievement" :key="index" :item="item" @click="handleSearchAchievement(item)" class="rounded text-base leading-none p-2 bg-gray-100 mt-4 mr-4">
	                    {{ item.achievement }}
	                </view>
	            </view> -->
	          <!--  <view class="text-xl text-gray-500 mt-8">热门角色</view>
	            <uc-user v-for="(item, index) in listUserRecommend" :key="index" :item="item"></uc-user>
	            <u-empty v-if="!listUserRecommend.length" icon="="/static/fly.png" text="数据为空" textColor="#a1a1a1" marginTop="100"></u-empty> -->
				
				
				<view class="text-xl text-gray-500 mt-8">历史记录</view>
				<!-- <uc-user v-for="(item, index) in listUserRecommend" :key="index" :item="item" ></uc-user> -->
				<uc-userSearch  v-for="(item, index) in listUserRecommend" :key="index" :item="item" ></uc-userSearch>
				<u-empty v-if="!listUserRecommend.length" icon="/static/fly.png" text="数据为空" textColor="#a1a1a1" marginTop="100"></u-empty>
	        </block>
	        <block v-if="type === 'search'">
	            <view class="text-xl text-gray-500 mt-8">搜索结果</view>
	            <!-- <uc-user v-for="(item, index) in listUserSearch" :key="index" :item="item"></uc-user> -->
				<uc-search v-for="(item, index) in listUserSearch" :key="index" :item="item" ></uc-search>
	            <u-loadmore v-if="listUserSearch.length" :status="loadmore" nomoreText="" color="#a1a1a1" marginTop="20" />
	            <u-empty v-if="!listUserSearch.length" icon="/static/fly.png" text="数据为空" textColor="#a1a1a1" marginTop="100" ></u-empty>
	        </block>
	    </view>
	
	    <u-modal :show="showHelp" :showConfirmButton="false" :showCancelButton="false">
	        <view class="w-full text-center">
	            <view class="text-4xl mt-4">搜索小贴士</view>
	            <view class="mt-6 text-left">{{ help }}</view>
	            <view class="grid gap-4 mt-8">
	                <view class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500" @click="showHelp = false">确定</view>
	            </view>
	        </view>
	    </u-modal>
	
	    <uc-auth></uc-auth>
	</view>
</template>

<script>
	export default {
		name: 'feedback',
	components: {
	},
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
	        },
	        paginator: {
	            total: 0,
	            last_page: 0,
	        },
	        loadmore: false,
	        help: '小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士小贴士',
	        showHelp: false,
			
	    }
	},
	onLoad(option) {
	    let that = this
	    that.getUserRecommend()
	    that.getRoleDynasty()
	    that.getRoleAchievement()
	    that.getRoleTitle()
	},
	onReachBottom() {
	    let that = this
	    if (that.loadmore === 'nomore') return false
	    that.loadmore = 'loading'
	    that.params.page = ++that.params.page
	    that.getUserSearch()
	},
	methods: {
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
	        that.params.title = item.title
	        that.params.page = 1
	        that.type = 'search'
	        that.listUserSearch = []
	        that.getUserSearch()
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
					console.log(res.data);
	            }
	        })
	    },
	    async getUserSearch() {
	        let that = this
	        that.loadmore = 'loading'
	        that.$api('user.recommend', that.params).then(res => {
	            if (res.code === 1) {
					console.log('recommed',res.data);
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
					console.log('cbsdcvsc',res.data);
	                that.listRoleTitle = res.data
	            }
	        })
	    },
	}
	}
</script>

<style>
	.characterTitle{
		height: 440rpx;
		 white-space: nowrap;
		    overflow-x: hidden;
		    overflow-y: auto;
		    transform: translateZ(0);
	}
	.characterTitle-item{
		 display:inline-block;

	}
</style>