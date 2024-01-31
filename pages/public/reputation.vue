<template>
	<view>
		<u-navbar title="名望说明" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view style="padding: 30rpx;box-sizing: border-box;">
			<view style="font-size:35rpx;color:#333;font-weight: bold;margin-bottom: 20rpx;">一、名望是什么</view>
			<view style="font-size:28rpx;color:#666;margin-bottom: 20rpx;">
				名望代表用户在平台里的知名度。由两部分组成，一是使用不同的角色可以赋予用户不同的名望值；二是用户在平台里的行为可以影响名望值的变化。</view>
			<view style="font-size:35rpx;color:#333;font-weight: bold;margin-bottom: 20rpx;">二、名望有什么作用</view>
			<view style="font-size:28rpx;color:#666;margin-bottom: 20rpx;">名望高的用户可以获得一些优先权。</view>
			<view style="font-size:28rpx;color:#666;margin-bottom: 20rpx;">1、优先展示</view>
			<view style="font-size:28rpx;color:#666;margin-bottom: 20rpx;">
				如果有许多用户的信息需要展示，平台会选择名望高的用户优先展示。例如，在曲水流觞中，会优先在场景中展示名望高的用户形象。</view>
			<view style="font-size:28rpx;color:#666;margin-bottom: 20rpx;">2、优先推荐</view>
			<view style="font-size:28rpx;color:#666;margin-bottom: 20rpx;">
				如果需要展示用户发布的内容，平台会选择名望高的用户内容优先发布。例如，在广场中，浏览用户动态时，会优先推荐名望高的用户发布的。</view>
			<view style="font-size:28rpx;color:#666;margin-bottom: 20rpx;">3、优先排序</view>
			<view style="font-size:28rpx;color:#666;margin-bottom: 20rpx;">如果存在一些数据列表，平台会将名望高的用户数据排在前面。例如，
				在用户创建的互动房间列表中，创建者的名望值高的，将排在前面。</view>
			<view style="font-size:28rpx;color:#666;margin-bottom: 20rpx;">4、其他优先权</view>
			<view style="font-size:28rpx;color:#666;margin-bottom: 20rpx;">平台会根据软件功能和服务，持续发掘名望的优先作用，敬请期待，也期待您提供宝贵意见。
			</view>
			<view style="font-size:35rpx;color:#333;font-weight: bold;margin-bottom: 20rpx;">三、名望如何获取</view>
			<view style="font-size:28rpx;color:#666;margin-bottom: 20rpx;">1、获得赞</view>
			<view style="font-size:28rpx;color:#666;margin-bottom: 20rpx;">
				在所有可以点赞处获得其他用户的赞。例如，在广场中发布的动态被人点赞、在别人的动态下评论被人点赞，都可以增加名望。</view>
			<view style="font-size:28rpx;color:#666;margin-bottom: 20rpx;">2、互动成就</view>
			<view style="font-size:28rpx;color:#666;margin-bottom: 20rpx;">
				在部分互动功能模块，可能根据互动规则，可以获得名望。例如在飞花令的系统公共房中，参与比赛并获得胜利。</view>
			<view style="font-size:35rpx;color:#333;font-weight: bold;margin-bottom: 20rpx;">四、怎样会降低名望</view>
			<view style="font-size:28rpx;color:#666;margin-bottom: 20rpx;">1、被点踩</view>
			<view style="font-size:28rpx;color:#666;margin-bottom: 20rpx;">
				在所有可以点踩（不喜欢）处被其他用户点踩。例如，在广场中发布的动态被人点踩、在别人的动态下评论被人点踩（常按呼出菜单，选择不喜欢），都会减少发布者的名望。</view>
			<view style="font-size:28rpx;color:#666;margin-bottom: 20rpx;">2、长时间不活跃</view>
			<view style="font-size:28rpx;color:#666;margin-bottom: 20rpx;">大于7天未活跃每多1天，名望会降低1；大于30天未活跃后，名望值会每天降低更多。
			</view>
		</view>
		<feiqslsHit></feiqslsHit>
	</view>
</template>

<script>
</script>

<style>
</style>