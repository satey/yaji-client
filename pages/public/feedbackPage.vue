<template>
	<view class="">
		<u-navbar title="反馈记录" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view class="list" v-for="(item,index) in list"
			@click="$u.route('/pages/public/feedbackSuggest',{ id: item.id })">
			<view class="listTitle">
				<text class="title">{{item.title}}</text>
				<text class="result"
					:class="item.status=='normal'?'resultColor':'resultActive'">{{item.status=="normal"?"已反馈":"已答复"}}</text>
			</view>
			<view class="content">
				{{item.content}}
			</view>
			<view class="date">
				{{ $u.timeFormat(item.createtime, 'yyyy-mm-dd hh:MM') }}
			</view>
		</view>
		<u-loadmore v-if="!list.length" nomoreText="" color="#a1a1a1" marginTop="20" />
		<u-empty v-if="!list.length" icon="/static/empty.png" text="数据为空" textColor="#a1a1a1" marginTop="100"></u-empty>
	</view>
</template>

<script>
	export default {
		name: 'feedbackPage',
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.init();
		},
		methods: {
			init() {
				this.getLists(1)
			},
			getLists(num) {
				var that = this;
				that.$api('feedback.lists', {
					"page": num,
					"type": "feedback"
				}).then(res => {
					if (res.code === 1) {
						that.list = res.data.data;
					} else {
						that.$u.toast(res.msg)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		padding: 30rpx;
		border-bottom: 16rpx solid #F7F7F7;

		.listTitle {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.title {
				color: #323232;
				font-size: 28rpx;
				font-weight: bold;
			}

			.result {
				font-size: 26rpx;
			}
		}

		.content {
			margin: 30rpx 0rpx;
			color: #808080;
			font-size: 26rpx;
			word-break: break-all;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
		}

		.date {
			padding-top: 20rpx;
			border-top: 1rpx solid #ECECEC;
			color: #999999;
			font-size: 24rpx;
			text-align: right;
		}
	}

	.resultColor {
		color: #999999;
	}

	.resultActive {
		color: #FE4373;
	}
</style>