<template>
	<view class="">
		<u-navbar title="礼物记录" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view class="giftList">
			<view class="giftList_item" v-for="(item,index) in giftsList">
				<text class="giftList_item_time" >{{item.createtime}}</text>
				<text class="giftList_item_name">{{item.title}}</text>
				<text class="giftList_item_price">{{item.price}}</text>
			</view>
		
		</view>
	</view>
</template>

<script>
	export default {
		name: 'giftsRecord',
		data() {
			return {
				giftsList:[]
			}
		},
		computed: {
	
		},
		created() {
		let that=this
			that.init()
		},
		methods: {
			init(){
				let that=this
				that.$api('user_gift_log.lists').then(res => {
				    if (res.code === 1) {
				        console.log(res.data);
						that.giftsList=res.data.data
				    } else {
				        that.$u.toast(res.msg)

				    }
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.giftList{
		width: 95%;
		margin: 0 auto;
		.giftList_item{
			height: 60rpx;
			// border: 1px solid #000;
			margin-top: 20rpx;
			font-size: 25rpx;
			text-align: left;
			color: black;
			line-height: 60rpx;
			.giftList_item_time{
				font-size: 24rpx;
				margin-left: 20rpx;
				color: darkgray;
			}
			.giftList_item_name{
				margin-left: 150rpx;
			}
			.giftList_item_price{
				margin-left: 190rpx;
			}
		}
	}
</style>