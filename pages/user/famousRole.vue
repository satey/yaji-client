<template>
	<view>
		<image style="position: absolute;top: 0;left: 0;width: 100%;height: 360rpx;" src="/static/mingrentangTopImg.png"
			mode="aspectFill">
		</image>
		<view class="seach">
			<u-navbar :safeAreaInsetTop="true" title='名人堂' :placeholder="true" bgColor="transparent">
				<view slot="left">
					<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
				</view>
			</u-navbar>
			<view class="myInput" @click="$u.route('pages/user/newSearch')">
				<view class="searchIcon">
					<text class="ri-search-line " style="font-size: 35rpx;color: #999999;"></text>
					<text style="color: #999999;font-size: 23rpx;margin-left: 5rpx;">搜索人物角色</text>
				</view>
			</view>
			<view
				style="display: flex;align-items: center;padding: 32rpx 30rpx 0rpx 30rpx;box-sizing: border-box;justify-content: space-between;">
				<view style="text-align: center;position: relative;" @click="tabClick(0)">
					<view :style="{color:tabIndex==0?'#FFA000':'#333333'}" style="font-size: 30rpx;">名望榜</view>
					<image v-if="tabIndex==0" src="../../static/xian.png"
						style="width:41rpx ;height: 6rpx;position: absolute;left: 50%;bottom: -6rpx;transform: translateX(-50%);"
						mode="widthFix"></image>
				</view>
				<view style="text-align: center;position: relative;" @click="tabClick(1)">
					<view :style="{color:tabIndex==1?'#FFA000':'#333333'}" style="font-size: 30rpx;">才华榜</view>
					<image v-if="tabIndex==1" src="../../static/xian.png"
						style="width:41rpx ;height: 6rpx;position: absolute;left: 50%;bottom: -6rpx;transform: translateX(-50%);"
						mode="widthFix"></image>
				</view>
				<view style="text-align: center;position: relative;" @click="tabClick(2)">
					<view :style="{color:tabIndex==2?'#FFA000':'#333333'}" style="font-size: 30rpx;">战绩榜</view>
					<image v-if="tabIndex==2" src="../../static/xian.png"
						style="width:41rpx ;height: 6rpx;position: absolute;left: 50%;bottom: -6rpx;transform: translateX(-50%);"
						mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view style="height: 360rpx;"></view>
		<view class="roleList" v-if="tabIndex ==0"
			style="padding: 0rpx 31rpx;box-sizing: border-box;margin-top: 50rpx;">
			<view class="plist" v-if="lists.length !=0">
				<view class="p2 wang2">
					<image :src="lists[1].profile_url" style="width: 128rpx;height: 128rpx;margin-top: -30rpx;"
						mode="heightFix" @click="$u.route('/pages/user/home',{user_id:lists[1].id})"></image>
					<view style="display: flex;align-items: center;margin-top: 10rpx;">
						<image :src="lists[1].mw_image" style="width: 51rpx;height:41rpx ;" mode="aspectFill"></image>
						<text style="color: #FFA000;font-size: 23rpx;margin-left: 5rpx;">{{lists[1].total_mw}}</text>
					</view>
					<view style="display: flex;align-items: center;margin-top: 10rpx;">
						<view
							style="color: #333333;font-size: 30rpx;width: 150rpx;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;text-align: center;">
							{{lists[1].realname}}·{{lists[1].dynasty}}
						</view>
					</view>
					<view style="color:#666666 ;font-size:22rpx ;margin-top: 10rpx;">
						<text>{{lists[1].achievements}}</text>
					</view>
				</view>
				<view class="p1 wang1">
					<image :src="lists[0].profile_url" style="width: 128rpx;height: 128rpx;margin-top: -30rpx;"
						mode="heightFix" @click="$u.route('/pages/user/home',{user_id:lists[0].id})"></image>
					<view style="display: flex;align-items: center;margin-top: 10rpx;">
						<image :src="lists[0].mw_image" style="width: 51rpx;height:41rpx ;" mode="aspectFill"></image>
						<text style="color: #FFA000;font-size: 23rpx;margin-left: 5rpx;">{{lists[0].total_mw}}</text>
					</view>
					<view style="display: flex;align-items: center;margin-top: 10rpx;">
						<view
							style="color: #333333;font-size: 30rpx;width: 150rpx;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;text-align: center;">
							{{lists[0].realname}}·{{lists[0].dynasty}}
						</view>
					</view>
					<view style="color:#666666 ;font-size:22rpx ;margin-top: 10rpx;">
						<text>{{lists[0].achievements}}</text>
					</view>
				</view>
				<view class="p3 wang3">
					<image :src="lists[2].profile_url" style="width: 128rpx;height: 128rpx;margin-top: -30rpx;"
						mode="heightFix" @click="$u.route('/pages/user/home',{user_id:lists[2].id})"></image>
					<view style="display: flex;align-items: center;margin-top: 10rpx;">
						<image :src="lists[2].mw_image" style="width: 51rpx;height:41rpx ;" mode="aspectFill"></image>
						<text style="color: #FFA000;font-size: 23rpx;margin-left: 5rpx;">{{lists[2].total_mw}}</text>
					</view>
					<view style="display: flex;align-items: center;margin-top: 10rpx;">
						<view
							style="color: #333333;font-size: 30rpx; width: 150rpx;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;text-align: center;">
							{{lists[2].realname}}·{{lists[2].dynasty}}
						</view>
					</view>
					<view style="color:#666666 ;font-size:22rpx ;margin-top: 10rpx;">
						<text>{{lists[2].achievements}}</text>
					</view>
				</view>
			</view>
			<scroll-view scroll-y v-if="lists.length !=0" @scrolltolower='bottomChange'
				style="margin-top: 25rpx;height: calc(100vh - 360rpx - 450rpx);">
				<block v-for="(item,index) in lists.slice(3,lists.length)">
					<view
						style="margin-bottom: 15rpx;width: 100%;height: 143rpx;background: linear-gradient(rgba(255, 246, 232, 1),rgba(255, 246, 232, 0));border: 1px solid #FFA000;border-radius: 20rpx;display: flex;align-items: center;padding: 0rpx 32rpx;box-sizing: border-box;justify-content: space-between;">
						<view style="display: flex;align-items: center;">
							<image :src="item.avatar" style="width: 93rpx;height: 93rpx;border-radius: 50%;"
								mode="aspectFill" @click="$u.route('/pages/user/home',{user_id:item.id})"></image>
							<view
								style="height: 93rpx;margin-left: 15rpx;flex-direction: column;justify-content: space-around;display: flex;flex: 1;">
								<view style="display: flex;align-items: center;">
									<view style="color: #333333;font-size: 30rpx;">{{item.realname}}·{{item.dynasty}}
									</view>
									<block v-if="item.gender==1">
										<i class="iconfont icon-nan1"
											style="font-size: 22rpx;color: #00C2FF;margin-left: 10rpx;"></i>
									</block>
									<block v-else>
										<i class="iconfont icon-nv"
											style="font-size: 22rpx;color: #FFA000;margin-left: 10rpx;"></i>
									</block>
									<view v-if="item.titles"
										@click="$u.route('pages/user/combination',{titles:item.titles.split(',')[0],role_title_id:item.role_title_id.split(',')[0]})"
										style="margin-left: 15rpx;;padding: 0rpx 18rpx;;height: 40rpx;line-height: 40rpx;text-align: center;font-size:23rpx ;color:#fff ;background: #FFA000;border-radius: 10rpx;">
										{{item.titles}}
									</view>
									<!-- <block v-for="(item2,index2) in item.achievements.split(' ')" :key="index2">
										<view
											style="margin-left: 15rpx;;padding: 0rpx 18rpx;;height: 40rpx;line-height: 40rpx;text-align: center;font-size:23rpx ;color:#fff ;background: #FFA000;border-radius: 10rpx;">
											{{item.titles}}
										</view>
									</block> -->
								</view>
								<view style="color:#666 ;font-size:23rpx ;">
									<block v-for="(item2,index2) in item.achievements.split(' ')">
										<text style="margin-right: 10rpx;">{{item2}}</text>
									</block>
								</view>
							</view>
						</view>
						<view style="display: flex;align-items: center;">
							<image :src="item.mw_image" style="width: 51rpx;height: 43rpx;margin-right: 5rpx;"
								mode="heightFix"></image>
							<text style="color: #FFA000;font-size:23rpx ;">{{item.total_mw}}</text>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
		<!-- ------- -->
		<view class="roleList" v-if="tabIndex ==1"
			style="padding: 0rpx 31rpx;box-sizing: border-box;margin-top: 50rpx;">
			<view class="plist" v-if="lists.length !=0">
				<view class="p2 cai2">
					<image :src="lists[1].profile_url" style="width: 128rpx;height: 128rpx;margin-top: -30rpx;"
						mode="heightFix" @click="$u.route('/pages/user/home',{user_id:lists[1].id})"></image>
					<view style="display: flex;align-items: center;margin-top: 10rpx;">
						<image src="@/static/cai.png" style="width: 51rpx;height:41rpx ;" mode="aspectFill"></image>
						<text
							style="color: #95DA02;font-size: 23rpx;background: linear-gradient( 277deg, #FFDA8C 0%, rgba(255,218,140,0) 100%);padding: 0rpx 20rpx;border-radius: 0rpx 50rpx 50rpx 0rpx;margin-left: -15rpx;">{{lists[1].talent_value}}</text>
					</view>
					<view style="display: flex;align-items: center;margin-top: 10rpx;">
						<view
							style="color: #333333;font-size: 30rpx;width: 150rpx;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;text-align: center;">
							{{lists[1].realname}}·{{lists[1].dynasty}}
						</view>
					</view>
					<view style="color:#666666 ;font-size:22rpx ;margin-top: 10rpx;">
						<text>{{lists[1].achievements}}</text>
					</view>
				</view>
				<view class="p1 cai1">
					<image :src="lists[0].profile_url" style="width: 128rpx;height: 128rpx;margin-top: -30rpx;"
						mode="heightFix" @click="$u.route('/pages/user/home',{user_id:lists[0].id})"></image>
					<view style="display: flex;align-items: center;margin-top: 10rpx;">
						<image src="@/static/cai.png" style="width: 51rpx;height:41rpx ;" mode="aspectFill"></image>
						<text
							style="color: #95DA02;font-size: 23rpx;background: linear-gradient( 277deg, #FFDA8C 0%, rgba(255,218,140,0) 100%);padding: 0rpx 20rpx;border-radius: 0rpx 50rpx 50rpx 0rpx;margin-left: -15rpx;">{{lists[0].talent_value}}</text>
					</view>
					<view style="display: flex;align-items: center;margin-top: 10rpx;">
						<view
							style="color: #333333;font-size: 30rpx;width: 150rpx;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;text-align: center;">
							{{lists[0].realname}}·{{lists[0].dynasty}}
						</view>
					</view>
					<view style="color:#666666 ;font-size:22rpx ;margin-top: 10rpx;">
						<text>{{lists[0].achievements}}</text>
					</view>
				</view>
				<view class="p3 cai3">
					<image :src="lists[2].profile_url" style="width: 128rpx;height: 128rpx;margin-top: -30rpx;"
						mode="heightFix" @click="$u.route('/pages/user/home',{user_id:lists[2].id})"></image>
					<view style="display: flex;align-items: center;margin-top: 10rpx;">
						<image src="@/static/cai.png" style="width: 51rpx;height:41rpx ;" mode="aspectFill"></image>
						<text
							style="color: #95DA02;font-size: 23rpx;background: linear-gradient( 277deg, #FFDA8C 0%, rgba(255,218,140,0) 100%);padding: 0rpx 20rpx;border-radius: 0rpx 50rpx 50rpx 0rpx;margin-left: -15rpx;">{{lists[2].talent_value}}</text>
					</view>
					<view style="display: flex;align-items: center;margin-top: 10rpx;">
						<view
							style="color: #333333;font-size: 30rpx;width: 150rpx;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;text-align: center;">
							{{lists[2].realname}}·{{lists[2].dynasty}}
						</view>
					</view>
					<view style="color:#666666 ;font-size:22rpx ;margin-top: 10rpx;">
						<text>{{lists[2].achievements}}</text>
					</view>
				</view>
			</view>
			<scroll-view scroll-y="true" v-if="lists.length !=0" @scrolltolower='bottomChange'
				style="margin-top: 25rpx;height: calc(100vh - 360rpx - 450rpx);">
				<block v-for="(item,index) in lists.slice(3,lists.length)">
					<view
						style="margin-bottom: 15rpx;width: 100%;height: 143rpx;background: linear-gradient(rgba(233, 255, 237, 1),rgba(246, 255, 232, 0));border: 1px solid #ADFF00;border-radius: 20rpx;display: flex;align-items: center;padding: 0rpx 32rpx;box-sizing: border-box;justify-content: space-between;">
						<view style="display: flex;align-items: center;">
							<image :src="item.avatar" style="width: 93rpx;height: 93rpx;border-radius: 50%;"
								mode="aspectFill" @click="$u.route('/pages/user/home',{user_id:item.id})"></image>
							<view
								style="height: 93rpx;margin-left: 15rpx;flex-direction: column;justify-content: space-around;display: flex;flex: 1;">
								<view style="display: flex;align-items: center;">
									<view style="color: #333333;font-size: 30rpx;">{{item.realname}}·{{item.dynasty}}
									</view>
									<block v-if="item.gender==1">
										<i class="iconfont icon-nan1"
											style="font-size: 22rpx;color: #00C2FF;margin-left: 10rpx;"></i>
									</block>
									<block v-else>
										<i class="iconfont icon-nv"
											style="font-size: 22rpx;color: #FFA000;margin-left: 10rpx;"></i>
									</block>
									<view v-if="item.titles"
										@click="$u.route('pages/user/combination',{titles:item.titles.split(',')[0],role_title_id:item.role_title_id.split(',')[0]})"
										style="margin-left: 15rpx;;padding: 0rpx 18rpx;;height: 40rpx;line-height: 40rpx;text-align: center;font-size:23rpx ;color:#fff ;background: #FFA000;border-radius: 10rpx;">
										{{item.titles}}
									</view>

								</view>
								<view style="color:#666 ;font-size:23rpx ;">
									<block v-for="(item2,index2) in item.achievements.split(' ')" :key="index2">
										<text style="margin-right: 10rpx;">{{item2}}</text>
									</block>
								</view>
							</view>
						</view>
						<view style="display: flex;align-items: center;">
							<image src="@/static/cai.png" style="width: 51rpx;height:41rpx ;" mode="aspectFill"></image>
							<text
								style="color: #95DA02;font-size: 23rpx;background: linear-gradient( 277deg, #FFDA8C 0%, rgba(255,218,140,0) 100%);padding: 0rpx 20rpx;border-radius: 0rpx 50rpx 50rpx 0rpx;margin-left: -15rpx;">{{item.talent_value}}</text>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
		<!-- -------------- -->
		<view class="roleList" v-if="tabIndex ==2"
			style="padding: 0rpx 31rpx;box-sizing: border-box;margin-top: 50rpx;">
			<view class="plist" v-if="lists.length !=0">
				<view class="p2 zhan2">
					<image :src="lists[1].profile_url" style="width: 128rpx;height: 128rpx;margin-top: -30rpx;"
						mode="heightFix" @click="$u.route('/pages/user/home',{user_id:lists[1].id})"></image>
					<view style="display: flex;align-items: center;margin-top: 10rpx;">
						<image src="@/static/zhan.png" style="width: 51rpx;height:41rpx ;" mode="aspectFill"></image>
						<text
							style="color: #9F2600;font-size: 23rpx;background: linear-gradient( 277deg, #FFA88C 0%, rgba(255, 218, 140, 0) 100%);padding: 0rpx 20rpx;border-radius: 0rpx 50rpx 50rpx 0rpx;margin-left: -15rpx;">{{lists[1].total_win_count}}</text>
					</view>
					<view style="display: flex;align-items: center;margin-top: 10rpx;">
						<view
							style="color: #333333;font-size: 30rpx;width: 150rpx;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;text-align: center;">
							{{lists[1].realname}}·{{lists[1].dynasty}}
						</view>
					</view>
					<view style="color:#666666 ;font-size:22rpx ;margin-top: 10rpx;">
						<text>{{lists[1].achievements}}</text>
					</view>
				</view>
				<view class="p1 zhan1">
					<image :src="lists[0].profile_url" style="width: 128rpx;height: 128rpx;margin-top: -30rpx;"
						mode="heightFix" @click="$u.route('/pages/user/home',{user_id:lists[0].id})"></image>
					<view style="display: flex;align-items: center;margin-top: 10rpx;">
						<image src="@/static/zhan.png" style="width: 51rpx;height:41rpx ;" mode="aspectFill"></image>
						<text
							style="color: #9F2600;font-size: 23rpx;background: linear-gradient( 277deg, #FFA88C 0%, rgba(255, 218, 140, 0) 100%);padding: 0rpx 20rpx;border-radius: 0rpx 50rpx 50rpx 0rpx;margin-left: -15rpx;">{{lists[0].total_win_count}}</text>
					</view>
					<view style="display: flex;align-items: center;margin-top: 10rpx;">
						<view
							style="color: #333333;font-size: 30rpx;width: 150rpx;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;text-align: center;">
							{{lists[0].realname}}·{{lists[0].dynasty}}
						</view>
					</view>
					<view style="color:#666666 ;font-size:22rpx ;margin-top: 10rpx;">
						<text>{{lists[0].achievements}}</text>
					</view>
				</view>
				<view class="p3 zhan3">
					<image :src="lists[2].profile_url" style="width: 128rpx;height: 128rpx;margin-top: -30rpx;"
						mode="heightFix" @click="$u.route('/pages/user/home',{user_id:lists[2].id})"></image>
					<view style="display: flex;align-items: center;margin-top: 10rpx;">
						<image src="@/static/zhan.png" style="width: 51rpx;height:41rpx ;" mode="aspectFill"></image>
						<text
							style="color: #9F2600;font-size: 23rpx;background: linear-gradient( 277deg, #FFA88C 0%, rgba(255, 218, 140, 0) 100%);padding: 0rpx 20rpx;border-radius: 0rpx 50rpx 50rpx 0rpx;margin-left: -15rpx;">{{lists[2].total_win_count}}</text>
					</view>
					<view style="display: flex;align-items: center;margin-top: 10rpx;">
						<view
							style="color: #333333;font-size: 30rpx;width: 150rpx;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;text-align: center;">
							{{lists[2].realname}}·{{lists[2].dynasty}}
						</view>
					</view>
					<view style="color:#666666 ;font-size:22rpx ;margin-top: 10rpx;">
						<text>{{lists[2].achievements}}</text>
					</view>
				</view>
			</view>
			<scroll-view scroll-y="true" v-if="lists.length !=0" @scrolltolower='bottomChange'
				style="margin-top: 25rpx;height: calc(100vh - 360rpx - 450rpx);">
				<block v-for="(item,index) in lists.slice(3,lists.length)">
					<view
						style="margin-bottom: 15rpx;width: 100%;height: 143rpx;background: linear-gradient(rgba(255, 224, 213, 1),rgba(255, 231, 223, 0));border: 1px solid #FFAA8E;border-radius: 20rpx;display: flex;align-items: center;padding: 0rpx 32rpx;box-sizing: border-box;justify-content: space-between;">
						<view style="display: flex;align-items: center;">
							<image :src="item.avatar" style="width: 93rpx;height: 93rpx;border-radius: 50%;"
								mode="aspectFill" @click="$u.route('/pages/user/home',{user_id:item.id})"></image>
							<view
								style="height: 93rpx;margin-left: 15rpx;flex-direction: column;justify-content: space-around;display: flex;flex: 1;">
								<view style="display: flex;align-items: center;">
									<view style="color: #333333;font-size: 30rpx;">{{item.realname}}·{{item.dynasty}}
									</view>
									<block v-if="item.gender==1">
										<i class="iconfont icon-nan1"
											style="font-size: 22rpx;color: #00C2FF;margin-left: 10rpx;"></i>
									</block>
									<block v-else>
										<i class="iconfont icon-nv"
											style="font-size: 22rpx;color: #FFA000;margin-left: 10rpx;"></i>
									</block>
									<view v-if="item.titles"
										@click="$u.route('pages/user/combination',{titles:item.titles.split(',')[0],role_title_id:item.role_title_id.split(',')[0]})"
										style="margin-left: 15rpx;;padding: 0rpx 18rpx;;height: 40rpx;line-height: 40rpx;text-align: center;font-size:23rpx ;color:#fff ;background: #FFA000;border-radius: 10rpx;">
										{{item.titles}}
									</view>
								</view>
								<view style="color:#666 ;font-size:23rpx ;">
									<block v-for="(item2,index2) in item.achievements.split(' ')" :key="index2">
										<text style="margin-right: 10rpx;">{{item2}}</text>
									</block>
								</view>
							</view>
						</view>
						<view style="display: flex;align-items: center;">
							<image src="@/static/zhan.png" style="width: 51rpx;height:41rpx ;" mode="aspectFill">
							</image>
							<text
								style="color: #9F2600;font-size: 23rpx;background: linear-gradient( 277deg, #FFA88C 0%, rgba(255, 218, 140, 0) 100%);padding: 0rpx 20rpx;border-radius: 0rpx 50rpx 50rpx 0rpx;margin-left: -15rpx;">{{item.total_win_count}}</text>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
		<!-- -------------不要----- -->
		<!-- <view class="lists">
			<view class="item" v-for="(item,index) in lists" :key="index">
				<view style="display: flex;align-items: center;">
					<image :src="item.avatar" style="width: 88rpx;height: 88rpx;border-radius: 50%;" mode=""
						@click="openUserHome(item)">
					</image>
					<view style="margin-left: 30rpx;flex: 1;margin-right: 10rpx;">
						<view style="font-size: 32rpx;color: #3D3D3D;display: flex;align-items: center;">
							<text @click="openUserHome(item)">{{item.realname}}·{{item.dynasty}}</text>
							<block v-if="item.gender == 2">
								<text class="ri-women-fill"
									style="margin-left: 15rpx;color: #E87B7B;font-size: 25rpx;"></text>
							</block>
							<block v-if="item.gender == 1">
								<text class="ri-men-fill"
									style="margin-left: 15rpx;color: #8FB992;font-size: 25rpx;"></text>
							</block>
							<view v-if="item.titles"
								@click="$u.route('pages/user/combination',{titles:item.titles.split(',')[0],role_title_id:item.role_title_id.split(',')[0]})"
								style="width: 126rpx;height: 40rpx;line-height: 40rpx;text-align: center;color: #fff;border-radius: 10rpx;background-color: #FE4373;font-size: 23rpx;margin-left: 13rpx;">
								{{item.titles.split(",")[0]}}
							</view>
						</view>
						<view style="font-size: 25rpx;color: #3D3D3D;opacity: 0.6;margin-top: 10rpx;">
							{{item.achievements}}
						</view>
					</view>
				</view>
				<view style="display: flex;align-items: center;">
					<view style="width: 39rpx;height: 39rpx;border-radius: 50%;margin-right: 10rpx;">
						<image :src="item.mw_image" style="width: 100%;height: 100%;" mode=""></image>
					</view>
					<text style="font-size: 28rpx; color: #3D3D3D;width: 100rpx;">{{item.total_mw}}</text>
				</view>
			</view>
			<u-empty v-if="!lists.length" icon="/static/empty2.png" text="数据为空" textColor="#a1a1a1"
				marginTop="100"></u-empty>
		</view> -->
		<topPrompt></topPrompt>
		<feiqslsHit></feiqslsHit>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 0,
				lists: [],
				page: 1
			};
		},
		onLoad() {
			this.searchName()
		},
		onReachBottom() {
			// this.page++;
			// switch (this.tabIndex) {
			// 	case 0:
			// 		this.searchName()
			// 		break;
			// 	case 1:
			// 		this.searchName2()
			// 		break;
			// 	case 2:
			// 		this.searchName3()
			// 		break;
			// }
		},
		methods: {
			bottomChange(){
				this.page++;
				switch (this.tabIndex) {
					case 0:
						this.searchName()
						break;
					case 1:
						this.searchName2()
						break;
					case 2:
						this.searchName3()
						break;
				}
			},
			tabClick(current) {
				this.lists = [];
				this.tabIndex = current;
				this.page = 1;
				switch (current) {
					case 0:
						this.searchName()
						break;
					case 1:
						this.searchName2()
						break;
					case 2:
						this.searchName3()
						break;
				}
			},
			openUserHome(item) {
				var userInfo = uni.getStorageSync("userInfo");
				if (userInfo.id == item.id) {
					uni.switchTab({
						url: "/pages/index/mine"
					})
				} else {
					this.$u.route('pages/user/home', {
						user_id: item.id
					})
				}
			},
			searchName() {
				let that = this
				that.$api('role_title.hall_of_fame', {
					page: that.page,
					limit: 10
				}).then(res => {
					if (res.code === 1) {
						this.lists = [...this.lists, ...res.data.list]
					}
				})
			},
			searchName2() {
				let that = this
				that.$api('role_title.talent_ranking', {
					page: that.page,
					limit: 10
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.lists = [...this.lists, ...res.data.list]
						console.log(this.lists)
					}
				})
			},
			searchName3() {
				let that = this
				that.$api('role_title.pk_ranking', {
					page: that.page,
					limit: 10
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.lists = [...this.lists, ...res.data.list]
						console.log(this.lists)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.plist {
		display: flex;
		padding: 0rpx 40rpx;
		box-sizing: border-box;
		justify-content: space-between;

		.wang1 {
			background-image: url(@/static/paihang/wang1.png);
		}

		.wang2 {
			background-image: url(@/static/paihang/wang2.png);
		}

		.wang3 {
			background-image: url(@/static/paihang/wang3.png);
		}

		.cai1 {
			background-image: url(@/static/paihang/cai1.png);
		}

		.cai2 {
			background-image: url(@/static/paihang/cai2.png);
		}

		.cai3 {
			background-image: url(@/static/paihang/cai3.png);
		}

		.zhan1 {
			background-image: url(@/static/paihang/zhan1.png);
		}

		.zhan2 {
			background-image: url(@/static/paihang/zhan2.png);
		}

		.zhan3 {
			background-image: url(@/static/paihang/zhan3.png);
		}

		.p2 {
			width: 183rpx;
			height: 312rpx;
			background-position: 100% 100%;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			margin-top: 35rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.p1 {
			width: 183rpx;
			height: 312rpx;
			background-position: 100% 100%;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.p3 {
			width: 183rpx;
			height: 312rpx;
			background-position: 100% 100%;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			margin-top: 35rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}

	.lists {
		padding: 30rpx;
		box-sizing: border-box;
		background: #fff;

		.item {
			padding: 26rpx 0rpx 26rpx 26rpx;
			margin-bottom: 26rpx;
			box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(0, 0, 0, 0.302);
			border-radius: 6rpx 6rpx 6rpx 6rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}

	.seach {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		padding: 0rpx 30rpx;
		box-sizing: border-box;
		// background: linear-gradient(180deg, rgba(185, 177, 177, 0) 0%, #FFFFFF 100%);
		height: 360rpx;


		.myInput {
			width: 100%;
			height: 72rpx;
			padding-left: 10rpx;
			box-sizing: border-box;
			position: relative;
			display: flex;
			align-items: center;
			z-index: 999;
			margin-top: 50rpx;
			background-image: url(@/static/sousuoBg.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-position: 100% 100%;

			.searchIcon {
				display: flex;
				align-items: center;
				position: absolute;
				left: 35rpx;
				top: 0;
				height: 72rpx;
				line-height: 72rpx;
			}
		}
	}
</style>