<template>
	<view>
		<web-view :src="webUrl" :update-title="false"></web-view>
		<!-- <u-navbar title="活动详情" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<block v-for="(item,index) in content">
			<block v-if="index == currentIndex">
				<view class="title">
					<view>
						<image class="titleImg" :src="content[index].iamge"></image>
					</view>
					<view>
						<view v-for="(item,index) in content[index].title">{{item}}</view>
					</view>
				</view>
				<view class="content">
					<block v-if="item.timer != ''">
						<view class="contentTitle">
							<view class="qiu">
								<image class="shu" src="../../static/shu.png" mode=""></image>
							</view>
							<view style="margin-left: 15rpx;">活动时间</view>
						</view>
						<view class="contentText">
							{{content[index].timer}}
						</view>
					</block>
					<block v-if="item.introduce != ''">
						<view class="contentTitle">
							<view class="qiu">
								<image class="shu" src="../../static/shu.png" mode=""></image>
							</view>
							<view style="margin-left: 15rpx;">活动介绍</view>
						</view>
						<view class="contentText">
							<text v-html="content[index].introduce"></text>
						</view>
					</block>
					<block v-if="item.contentText != ''">
						<view class="contentTitle">
							<view class="qiu">
								<image class="shu" src="../../static/shu.png" mode=""></image>
							</view>
							<view style="margin-left: 15rpx;">活动内容及奖励</view>
						</view>
						<view class="contentText">
							<text v-html="content[index].contentText"></text>
						</view>
					</block>
					<block v-if="item.illustrate != ''">
						<view class="contentTitle">
							<view class="qiu">
								<image class="shu" src="../../static/shu.png" mode=""></image>
							</view>
							<view style="margin-left: 15rpx;">活动说明</view>
						</view>
						<view class="contentText">
							<text v-html="content[index].illustrate"></text>
						</view>
					</block>
					<block v-if="item.users != ''">
						<view class="users">
							<view class="userNameItems" v-for="(items,index) in item.users">
								<text v-if="index<20">{{index>=19?'······':items}}</text>
							</view>
						</view>
					</block>
				</view>
			</block>
		</block> -->
		<feiqslsHit></feiqslsHit>
	</view>
</template>

<script>
	export default {
		name: "activity",
		data() {
			return {
				webUrl: '',
				currentIndex: -1,
				content: [{
					iamge: "../../static/title1.png",
					title: ["以文常会友", "唯德自成邻"],
					timer: "",
					introduce: "",
					contentText: "新用户注册登录app日起7天内（含注册当日），每日发布动态，并添加任意话题，即可获得1个铜钱，每日限领2次。",
					illustrate: "1、奖励无需手动领取，动态发布成功之后自动到账，请在【我的】-【我的钱包】中查看；<br/>2、 如发布的动态涉嫌违规， 奖励将会被收回；<br/>3、 铜钱仅可在雅集app内使用， 不可提现、 兑换、 赠送、 找零等。 ",
					users: []
				}, {
					iamge: "../../static/title2.png",
					title: ["清谈同日夕", "情盻叙忧勤"],
					timer: "",
					introduce: "",
					contentText: "新用户注册登录app日起7天内（含注册当日），每日跟不同的集友打招呼，每一位集友回复之后，即可获得3个铜钱，每日限领3次。",
					illustrate: "1、奖励无需手动领取，集友回复之后，铜币自动到账，发放时间有延迟，请在【我的】-【我的钱包】中查看；<br/>2、铜钱仅可在雅集app内使用，不可提现、兑换、赠送、找零等。",
					users: []
				}, {
					iamge: "../../static/title3.png",
					title: ["千金散尽还复来"],
					timer: "2023年8月1日-15日",
					introduce: "1、首充1元赠送6朵芍药花；<br/>2、首次充值其他金额（除1元外）可享受8折优惠，并赠送6朵芍药花。",
					contentText: "",
					illustrate: "1、活动期间，充值折扣不限次数，除首充外，其余充值不赠送礼物（芍药花）；<br/>2、充值铜钱仅可在雅集app内使用，不可退款、提现、兑换、赠送、找零等。",
					users: []
				}, {
					iamge: "../../static/title4.png",
					title: ["非淡泊无以明志", "非宁静无以致远"],
					timer: "2023年8月1日-31日",
					introduce: "1、活动期间，更换角色，知名度高的角色概率会提升哦~<br/>2、请在【我的】-【我的角色】中更换新角色。<br/>3、知名角色全员参与，可在雅集app首页搜索框，搜索角色姓名查看是否已被其他用户激活使用。",
					contentText: "",
					illustrate: "",
					users: []
				}]
			}
		},
		onLoad(event) {
			this.webUrl = event.url;
			uni.setNavigationBarTitle({
				title: event.title
			});
			// this.currentIndex = parseInt(event.num);
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		height: 80rpx;
		background: linear-gradient(90deg, rgba(255, 69, 116, 0) 0%, #FF4574 100%);
		margin-top: 37rpx;
		display: flex;
		align-items: center;
		letter-spacing: 15rpx;
		font-size: 22rpx;
		color: #fff;
		justify-content: flex-end;
		padding-right: 46rpx;
	}

	.titleImg {
		width: 100rpx;
		height: 100rpx;
		margin-bottom: 15rpx;
		margin-right: 15rpx;
	}

	.content {
		padding: 0rpx 30rpx;
		box-sizing: border-box;

		.contentTitle {
			height: 80rpx;
			background: #FFC5D4;
			border-radius: 80rpx 80rpx 80rpx 80rpx;
			display: flex;
			align-items: center;
			font-size: 36rpx;
			font-weight: 400;
			color: #943A2C;
			margin-top: 46rpx;
		}
	}

	.qiu {
		width: 88rpx;
		height: 88rpx;
		background: #FFA000;
		opacity: 1;
		border: 1rpx solid #FFA000;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.shu {
		width: 100rpx;
		height: 100rpx;
	}

	.contentText {
		margin-top: 46rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN-Regular, Source Han Sans CN;
		font-weight: 400;
		color: #3D3D3D;
		line-height: 50rpx;
		opacity: 0.8;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 15rpx;
	}

	.users {
		width: 60%;
		margin: 0 auto;
		margin-top: 30rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.userNameItems {
		margin-right: 20rpx;
		color: #999;
		opacity: 0.9;
		margin-bottom: 20rpx;
		// width: calc(100% / 4.5 + 10rpx);
		// overflow: hidden;
		// text-overflow: ellipsis;
		// white-space: nowrap;
		// box-sizing: border-box;
	}
</style>