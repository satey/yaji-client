<template>
	
    <page-meta :root-font-size="'13px'"></page-meta>
	
    <view>
		
        <view class="flex mt-4 bg-gray-100 p-4 rounded" @tap="$u.route('/pages/chat/audio', { id: item.id })">
            <view class="flex mr-4 rounded">
                <u-image :src="item.image" mode="aspectFill" width="180" height="180" :lazy-load="true"></u-image>
            </view>
            <view class="flex-1">
                <view class="">{{ item.title }}</view>
                <!-- <view class="text-gray-500 mt-4">{{ item.desc }}</view> -->
                <view class="flex mt-4">
                    <view class="flex items-center mr-2" v-for="(tag, index) in item.tags" :key="index" :item="tag">
                        <i class="ri-hashtag text-gray-500"></i>
                        <view class="text-gray-500">{{ tag }}</view>
                    </view>
                </view>
                <view class="flex mt-4">
                    <view class="flex-1 flex items-center">
                        <i class="ri-user-3-fill text-xl bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
                        <text class="text-gray-500 ml-2">{{ item.usernums }}</text>
                    </view>
                    <view class="flex items-center">
                        <i class="ri-heart-3-fill text-xl bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
                        <text class="text-gray-500 ml-2">{{ item.diggnums }}</text>
                    </view>
                    <view class="flex items-center ml-4">
                        <i class="ri-fire-fill text-xl bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
                        <text class="text-gray-500 ml-2">{{ item.viewnums }}</text>
                    </view>
                </view>
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
    computed: {},
    methods: {}
}
</script>

<style lang="scss">

</style>
