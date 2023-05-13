<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="flex mt-8">
        <view class="mr-4" @click="$u.route('/pages/user/home', { user_id: item.id })">
            <image class="block w-14 h-14 rounded-full" :src="item.avatar || '/static/avatar.png'"></image>
        </view>
        <view class="flex-1" @click="$u.route('/pages/user/home', { user_id: item.id })">
			
            <!-- <view class="text-base leading-none mt-2">{{ item.realname + ' · ' + item.dynasty || '无名氏' }}</view> -->
			<view class="text-base leading-none mt-2">{{ item.realname + ' · ' + item.dynasty || '无名氏' }}</view>
            <!-- <view class="text-gray-500 mt-4">{{ $u.timeFrom(item.createtime, 'mm月dd日') }}</view> -->
        
			<view class="flex mt-3">
                <view class="flex items-center mr-2" v-for="(tag, index) in item.tags" :key="index" :item="tag">
                    <view class="text-base leading-none text-gray-500">{{ tag }}</view>
                </view>
            </view>
            <view class="mt-4">{{ item.bio }}</view>
        </view>
        <view class="ml-4">
            <!-- <view class="border border-solid border-orange-500 p-2 rounded-full text-base leading-none text-orange-500" @click="$u.route('/pages/user/home', { user_id: item.id })">了解他</view> -->
       <text style=" display: inline-block; width: 40rpx; text-align: center; margin-right: 20rpx; height: 40rpx; border-radius: 50%; background-color: greenyellow; color: green;" @click="$u.route('/pages/user/home', { user_id: item.id })">望</text> 
	   <text style="color: green;">{{item.total_mw}}</text>
	  
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
    computed: {},
    methods: {}
}
</script>

<style lang="scss">

</style>
