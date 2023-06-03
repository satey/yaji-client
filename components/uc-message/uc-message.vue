<template>
    <page-meta :root-font-size="'13px'"></page-meta>
	<view class="" >
		<view  class="flex "@click="$u.route('pages/chat/single', {user_id:item.receiver_id})" style="height:140rpx; border-bottom: 1px solid lightgray;">
		<!-- <i class="ri-alarm-warning-fill text-3xl leading-none text-white"></i> -->
	<!-- {{item}} -->
			<view class="rounded-full w-8 h-8 p-4   mr-6">
				<image style="width: 80rpx; height: 80rpx;margin-top: 5rpx; border-radius: 50%;" :src="item.data.user.avatar" mode=""></image>
			</view>
			<view class="flex-1">
				<view class="text-lg leading-none mt-2" style="margin-top: 28rpx;">{{ item.data.role.realname}} . {{item.data.role.dynasty}}</view> 
			<view class="text-lg leading-none mt-2" style="margin-top: 30rpx;color: gray;">{{ item.data.content }}</view>
			</view>
			<view class="text-base leading-none text-gray-500 mt-4" style="float: right;margin-top: 28rpx;">
			{{ $u.timeFrom(item.data.updatetime, 'yyyy年mm月dd日') }}
			</view>
			<view>
				<u-badge v-if="!item.data.readtime" :isDot="true" bgColor="#FF7043" type="success" style="margin-right: 15rpx; margin-top: 90rpx;"></u-badge>
			</view>
			
		</view>
		</view>

</template>

<script>
export default {  
    components: {},
    data() {
        return {
			userlist:[]
		}
    },
    props: {
        item: {}
    },
    computed: {},
    methods: {},
	mounted() {
		let that=this
		// that.userlist=that.item
		// console.log('that.ua');
		if(Boolean(uni.getStorageSync('listMessage'))){
			// that.item=uni.getStorageSync('listMessage').data
			
			console.log(uni.getStorageSync('listMessage'));
		}
	}
}
</script>

<style lang="scss">

</style>
