<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="chatRoom">
		<image src="@/static/fhlbg.png" v-if="roomType=='fhl'"
			style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;" mode="">
		</image>
		<image src="@/static/jlbg.png" v-if="roomType=='scjl'||roomType=='cyjl'"
			style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;" mode="">
		</image>
		<u-popup :show="empower" @close="empower = false" mode="center" :closeable="false" :round="20">
			<view class="log">
				<view style="text-align: center;font-size: 30rpx;color: #333;">实名认证</view>
				<view style="font-size: 28rpx;color: #333;margin-top: 89rpx;">首次创建公开房间需要完成实名认证。</view>
				<view style="display: flex;align-items: center;justify-content: center;margin-top: 137rpx;">
					<view @click="$u.route('/pages/authentication/authentication');empower = false"
						style="margin-right: 21rpx;width: 210rpx;height: 68rpx;background: #FFDDA4;border-radius: 8rpx;text-align: center;line-height: 68rpx;color: #FFA000;font-size: 30rpx;">
						去认证</view>
					<view @click="empower = false"
						style="margin-left: 21rpx;width: 210rpx;height: 68rpx;background: #FFA000;border-radius: 8rpx;text-align: center;line-height: 68rpx;color: #fff;font-size: 30rpx;">
						取消</view>
				</view>
			</view>
		</u-popup>
		<!-- 礼物 -->
		<u-popup :show="showGift" @close="showGift = false" mode="bottom" :closeable="false" :round="20">
			<view class="giftContainer">
				<scroll-view scroll-y="true" class="giftBox">
					<block>
						<view v-if="stage_list[0]!=''||stage_list[1]!=''"
							style='display: flex;align-items: center;justify-content: space-between;padding-right: 30rpx;'>
							<text>送给：</text>
							<view style='display: flex;align-items: center;' @click="allGiftSelect">
								<text style="margin-right: 10rpx;">全选</text>
								<image v-if="allGiftSelectFlag" src="../../static/iconImage/okRadio.png"
									style="width: 28rpx;height: 28rpx;" mode=""></image>
								<image v-else src="../../static/iconImage/noRadio.png"
									style="width: 28rpx;height: 28rpx;" mode=""></image>
							</view>
						</view>
						<view v-else>
							<u-empty icon="/static/iconImage/renwu.png" text="暂无可赠送对象" textColor="#a1a1a1"
								marginTop="100"></u-empty>
						</view>
						<view style="margin-top: 40rpx;display: flex;align-items: center;margin-right: 35rpx;">
							<block v-if="allGiftSelectFlag == false">
								<block v-for="(item,index) in stage_list" :key="index">
									<view class="giftUserContainer" v-if="item!=''" @click="giftCurrentUserIndex=index"
										:class="giftCurrentUserIndex==index?'giftUserContainerActive':''">
										<view style="text-align: right;margin: 8rpx 8rpx 0rpx 0rpx;">
											<image src="../../static/iconImage/okRadio.png"
												v-if="giftCurrentUserIndex==index" style="width: 28rpx;height: 28rpx;"
												mode=""></image>
											<image src="../../static/iconImage/noRadio.png" v-else
												style="width: 28rpx;height: 28rpx;" mode=""></image>
										</view>
										<view class="giftUserBox">
											<image style="width: 92rpx;height: 92rpx;border-radius: 50rpx;"
												:src="item.avatar" mode="aspectFill"></image>
											<view
												style="height: 92rpx;display: flex;flex-direction: column;justify-content: space-around;margin-left: 20rpx;flex: 1;">
												<view style="color: #000;font-size: 23rpx;">
													{{item.role_realname}}·{{item.role_dynasty}}
												</view>
												<view style="display: flex;align-items: center;">
													<i class="iconfont icon-nan1" v-if="item.gender==1"
														style="font-size: 22rpx;color: #00C2FF;margin-right: 10rpx;"></i>
													<i class="iconfont icon-nv" v-if="item.gender==2"
														style="font-size: 22rpx;color: #FFA000;"></i>
													<view style="position: relative;">
														<text
															style="color: #000000;font-size:23rpx ;z-index: 9;position: relative;">名望：{{item.total_mw}}</text>
														<view class="line"></view>
													</view>
												</view>
											</view>
										</view>
									</view>
								</block>
							</block>
							<block v-else>
								<block v-for="(item,index) in stage_list" :key="index">
									<view class="giftUserContainer giftUserContainerActive" v-if="item!=''">
										<view style="text-align: right;margin: 8rpx 8rpx 0rpx 0rpx;">
											<image src="../../static/iconImage/okRadio.png"
												style="width: 28rpx;height: 28rpx;" mode=""></image>
										</view>
										<view class="giftUserBox">
											<image style="width: 92rpx;height: 92rpx;border-radius: 50rpx;"
												:src="item.avatar" mode="aspectFill"></image>
											<view
												style="height: 92rpx;display: flex;flex-direction: column;justify-content: space-around;margin-left: 20rpx;flex: 1;">
												<view style="color: #000;font-size: 23rpx;">
													{{item.role_realname}}·{{item.role_dynasty}}
												</view>
												<view style="display: flex;align-items: center;">
													<i class="iconfont icon-nan" v-if="item.gender==1"
														style="font-size: 22rpx;color: #00C2FF;margin-right: 10rpx;"></i>
													<i class="iconfont icon-nv" v-if="item.gender==2"
														style="font-size: 22rpx;color: #FFA000;"></i>
													<view style="position: relative;">
														<text
															style="color: #000000;font-size:23rpx ;z-index: 9;position: relative;">名望：{{item.total_mw}}</text>
														<view class="line"></view>
													</view>
												</view>
											</view>
										</view>
									</view>
								</block>
							</block>

						</view>
						<view class="giftList">
							<block v-for="(item,index) in giftList" :key="index">
								<view class="giftItem" @click="sendGift(item,index)"
									:class="giftCurrentIndex == index?'giftItemActive':''" v-if="item.status=='normal'">
									<view>
										<image :src="item.image" style="width: 140rpx;height: 140rpx;"
											mode="aspectFill">
										</image>
									</view>
									<view style="color:#323232;font-size: 23rpx;">{{item.title}}</view>
									<view>
										<image src="../../static/qian.png" style="width:20rpx ;height: 20rpx;" mode="">
										</image>
										<text
											style="color:#808080;font-size: 20rpx;margin-left: 5rpx;">{{item.price}}</text>
									</view>
								</view>
							</block>
						</view>
						<view class="giftFooter">
							<view></view>
							<view style="display: flex;align-items: center;">
								<image src="../../static/qian.png"
									style="width: 38rpx;height:38rpx;margin-right: 10rpx ;" mode=""></image>
								<view class="giftNum" style="margin-right: 30rpx ;">余额{{userInfo.money}}</view>
								<view class="sendGiftBtn" @click="$u.route('/pages/mine/recharge')">充值</view>
							</view>
						</view>
					</block>
					<!-- 	<view v-else style="text-align: center;margin-top: 50rpx;">
						<image style="width: 393rpx;height: 416rpx;" src="@/static/iconImage/renwu.png"
							mode="aspectFill">
						</image>
					</view> -->
				</scroll-view>
			</view>
		</u-popup>
		<!-- 分享 -->
		<u-popup :show="showShare" @close="showShare = false" mode="bottom" :closeable="true" :round="20">
			<scroll-view scroll-x="true" class="shareBox">
				<view style="display: flex;align-items: center;">
					<block v-for="(item,index) in inviteList" :key="index">
						<view @click="inviteClick(item)"
							style="display: flex;flex-direction: column;justify-content: center;align-items: center;margin: 0rpx 30rpx;">
							<image :src="item.avatar" style="width: 96rpx;height: 96rpx;border-radius: 50%;"
								mode="aspectFill">
							</image>
							<view style="color: #333;font-size: 23rpx;margin-top: 15rpx;white-space: nowrap;">
								{{item.role_realname }}·{{item.role_dynasty}}
							</view>
						</view>
					</block>
					<view v-if="!inviteList.length">
						暂无最近聊过天的好友
					</view>
					<!-- <u-empty v-if="!inviteList.length" icon="/static/iconImage/jilu.png" text="暂无最近聊过天的好友"
						textColor="#a1a1a1" marginTop="0"></u-empty> -->
				</view>

			</scroll-view>
			<!-- <view class="shareBox">
				
			</view> -->
		</u-popup>
		<!-- 创建房间 -->
		<u-popup :show="showCreateRoom" @close="showCreateRoom = false" mode="bottom" :closeable="false" :round="20">
			<view class="createRoomContainer">
				<view style="display: flex;">
					<text style="font-size: 32rpx;color: #666666;white-space: nowrap;">房间名称：</text>
					<view style="border-bottom: 1px solid #333333;padding-bottom:10rpx ;">
						<input type="text" v-model="createRoomName" placeholder="请输入房间名称" style="padding-bottom: 0;">
					</view>
				</view>
				<view class="roomType" style="display: flex;align-items: center;margin-top: 85rpx;"
					v-if="roomType=='scjl'||roomType=='cyjl'">
					<text style="font-size: 32rpx;color: #666666;">房间内容：</text>
					<view style="display: flex;align-items: center;">
						<block v-for="(item,index) in createRoomDate.type" :key="index">
							<view style="display: flex;align-items: center;margin-left: 35rpx;"
								@click="createRoomType(item,index)">
								<block v-if="createRoomTypeIndex==index">
									<image src="../../static/iconImage/dian.png" style="width: 26rpx;height: 26rpx;"
										mode=""></image>
								</block>
								<block v-else>
									<view style="width: 26rpx;height: 26rpx;background: #D9D9D9;border-radius: 50rpx;">
									</view>
								</block>
								<text style="font-size: 32rpx;color: #FFA000;margin-left: 10rpx;font-weight: bold;"
									:style="{color:createRoomTypeIndex==index?'#FFA000':'',fontWeight:createRoomTypeIndex==index?'bold':'',}">{{item.value}}</text>
							</view>
						</block>
					</view>
				</view>
				<view class="roomType" style="display: flex;align-items: center;margin-top: 85rpx;">
					<text style="font-size: 32rpx;color: #666666;">房间类型：</text>
					<view style="display: flex;align-items: center;">
						<block v-for="(item,index) in createRoomDate.public_type" :key="index">
							<view style="display: flex;align-items: center;margin-left: 35rpx;"
								@click="createRoomIndex=index">
								<block v-if="createRoomIndex==index">
									<image src="../../static/iconImage/dian.png" style="width: 26rpx;height: 26rpx;"
										mode=""></image>
								</block>
								<block v-else>
									<view style="width: 26rpx;height: 26rpx;background: #D9D9D9;border-radius: 50rpx;">
									</view>
								</block>
								<text style="font-size: 32rpx;color: #FFA000;margin-left: 10rpx;font-weight: bold;"
									:style="{color:createRoomIndex==index?'#FFA000':'',fontWeight:createRoomIndex==index?'bold':'',}">{{item.value}}</text>
							</view>
						</block>
					</view>
				</view>
				<view style="color:#666666 ;font-size: 26rpx;margin-top: 50rpx;">
					开放房间将在公开列表中显示，其他用户可进入并参与互 动。私密房将不在公开列表中展示，其他人仅可通过你的 邀请链接进入。
				</view>
				<view class="createBtn" @click="createRoom">
					<block v-if="createRoomIndex==0">
						<text v-if="createRoomDate.need_pay ==1">花费{{createRoomDate.room_price}}铜钱创建</text>
						<text v-if="createRoomDate.need_pay ==0">免费创建</text>
					</block>
					<block v-else>
						<text>免费创建</text>
					</block>
				</view>
				<view style="color:#666666 ;font-size: 26rpx;margin-top: 50rpx;">
					注：如果已创建过1个同类型房间，再次创建需花费铜钱哦~
				</view>
			</view>
		</u-popup>
		<!-- 抽屉栏 -->
		<u-popup :show="showDrawer" @close="showDrawer = false" mode="right" :closeable="false" :round="20">
			<view class="drawerContainer">
				<view>
					<view style="height: 30rpx;"></view>
					<view style="display: flex;justify-content: flex-end;" @click="showDrawer=false;showShare=true">
						<view class="invite">
							<i class="iconfont icon-yaoqing" style="font-size: 22rpx;"></i>
							<text>邀请朋友</text>
						</view>
					</view>
					<view class="drawerMenu">
						<view class="menuItem" @click="yuCreateRoom">
							<view class="iconMenu">
								<i class="iconfont icon-xinjianmenhu" style="font-size: 50rpx;color: #E2E2E2;"></i>
							</view>
							<text style="margin-top: 15rpx;">创建房间</text>
						</view>
						<view class="menuItem" @click="exitRoom">
							<view class="iconMenu">
								<i class="iconfont icon-tuichu" style="font-size: 50rpx;color: #E2E2E2;"></i>
							</view>
							<text style="margin-top: 15rpx;">退出房间</text>
						</view>
						<view class="menuItem" v-if="roomDate!=null&&roomDate.permission.close_room!=0"
							@click="closeRoom">
							<view class="iconMenu">
								<i class="iconfont icon-tuichu1" style="font-size: 50rpx;color: #E2E2E2;"></i>
							</view>
							<text style="margin-top: 15rpx;">解散房间</text>
						</view>
						<!-- 	<view class="menuItem" v-if="roomDate!=null&&roomDate.room_info.public_type!='公共房'">
							<view class="iconMenu">
								<i class="iconfont icon-xinjianmenh" style="font-size: 50rpx;color: #E2E2E2;"></i>
							</view>
							<text style="margin-top: 15rpx;">回到聊天</text>
						</view> -->
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<view style="color: #fff;font-size: 32rpx;">在线用户（{{allUserList.user_count}}人）</view>
						<view class="drawerOperate">
							<view class="drawerOperateText" v-if="roomDate!=null&&roomDate.permission.remove_user!=0"
								@click="drawerTabIndex=1" :style="{color:drawerTabIndex==1?'#fff':'#BDBDBD'}"
								style="margin-right: 10rpx;">
								<text style="z-index: 2;position: relative;">踢人</text>
								<view class="line" v-if="drawerTabIndex==1"></view>
							</view>
							<view class="drawerOperateText" @click="drawerTabIndex=2"
								:style="{color:drawerTabIndex==2?'#fff':'#BDBDBD'}" style="margin-left: 10rpx;">
								<text style="z-index: 2;position: relative;">举报</text>
								<view class="line" v-if="drawerTabIndex==2"></view>
							</view>
						</view>
					</view>
				</view>

				<scroll-view scroll-y="true" class="drawerScroll">
					<block v-for="(item,index) in allUserList.user_list" :key="index">
						<view class="userItem">
							<view style="display: flex;align-items: center;" @click="openUserBox(item)">
								<image style="width: 108rpx;height: 108rpx;border-radius: 50rpx;margin-right: 8rpx;"
									:src="item.avatar" mode="aspectFill">
								</image>
								<view
									style="height: 108rpx;display: flex;flex-direction: column;justify-content: space-around;">
									<view
										style="color: #fff;font-size: 26rpx;width: 150rpx;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
										{{item.role_realname}}·{{item.role_dynasty}}
									</view>
									<view style="display: flex;align-items: center;color: #fff;font-size: 23rpx;">
										<text style="margin-right: 12rpx;" v-if="item.is_room_owner!=0">房主</text>
										<text>名望{{item.total_mw}}</text>
									</view>
								</view>
							</view>
							<view style="color: #fff;font-size: 28rpx;" v-if="item.is_room_owner==0">
								<text v-if="drawerTabIndex==1 && item.user_id!=userInfo.id"
									@click="removeUser(item)">踢人</text>
								<text v-if="drawerTabIndex==2 && item.user_id!=userInfo.id"
									@click="$u.route('/pages/public/report',{user_id:item.user_id,type:'语音房',selectId:roomDate.room_info.room_id})">举报</text>
							</view>
						</view>
					</block>
				</scroll-view>
			</view>
		</u-popup>
		<!-- 令牌 -->
		<u-popup :show="showToken" @close="showToken = false;taskData = null;taskResultData = null;" mode="center"
			:closeable="false" :round="20">
			<view class="tokenContainer">
				<block v-if="selectOrder">
					<view class="tokenTitle">
						<text class="text">选择令牌</text>
						<view class="replace" @click="changeOrder">
							<text>换一批</text>
							<i class="iconfont icon-huanyipi" style="margin-left:10rpx;font-size: 22rpx;"></i>
						</view>
					</view>
					<view class="tokenTextList">
						<block v-for="(item,index) in orderList" :key="index">
							<view class="tokenTextItem" @click="selectOrderClick(item,index)"
								:style="{background:selectOrderIndex==index?'#FFA000':'',color:selectOrderIndex==index?'#FFFFFF':''}">
								{{item.word}}
							</view>
						</block>
					</view>
					<view class="tokenBens">
						<view class="tokenBen" style="margin-right: 15rpx;" @click="showToken=false;selectOrderIndex=0">
							取消</view>
						<view class="tokenBen" style="margin-left: 15rpx;" @click="selectOrderOk">确定</view>
					</view>
				</block>
				<block v-if="taskResultData!=null">
					<view class="tokenTitle">
						<text class="text">比赛结束</text>
					</view>
					<view class="resultBox">
						<view class="resultText">胜</view>
						<view class="resultText">败</view>
					</view>
					<view class="PKBox">
						<view class="PKContent">
							{{taskResultData.win_user_info.role_realname}}·{{taskResultData.win_user_info.role_dynasty}}
						</view>
						<view class="pkText">PK</view>
						<view class="PKContent">
							{{taskResultData.fail_user_info.role_realname}}·{{taskResultData.fail_user_info.role_dynasty}}
						</view>
					</view>
					<view class="record">
						<view>
							<view style="display: flex;align-items: center;margin-bottom: 30rpx;">
								<image style="width: 16rpx;height: 16rpx;margin-right: 10rpx;"
									src="../../static/iconImage/dian.png" mode=""></image>
								<view>对答：{{taskResultData.win_user_info.answer_count}}</view>
							</view>
							<view style="display: flex;align-items: center;margin-bottom: 30rpx;">
								<image style="width: 16rpx;height: 16rpx;margin-right: 10rpx;"
									src="../../static/iconImage/dian.png" mode=""></image>
								<view>名望：{{taskResultData.win_user_info.mw_str}}</view>
							</view>
							<view style="display: flex;align-items: center;margin-bottom: 30rpx;">
								<image style="width: 16rpx;height: 16rpx;margin-right: 10rpx;"
									src="../../static/iconImage/dian.png" mode=""></image>
								<view>风雅度：{{taskResultData.win_user_info.fyd_str}}</view>
							</view>
						</view>
						<view>
							<view style="display: flex;align-items: center;margin-bottom: 30rpx;">
								<image style="width: 16rpx;height: 16rpx;margin-right: 10rpx;"
									src="../../static/iconImage/dian.png" mode=""></image>
								<view>对答：{{taskResultData.fail_user_info.answer_count}}</view>
							</view>
							<view style="display: flex;align-items: center;margin-bottom: 30rpx;">
								<image style="width: 16rpx;height: 16rpx;margin-right: 10rpx;"
									src="../../static/iconImage/dian.png" mode=""></image>
								<view>名望：{{taskResultData.fail_user_info.mw_str}}</view>
							</view>
							<view style="display: flex;align-items: center;margin-bottom: 30rpx;">
								<image style="width: 16rpx;height: 16rpx;margin-right: 10rpx;"
									src="../../static/iconImage/dian.png" mode=""></image>
								<view>风雅度：{{taskResultData.fail_user_info.fyd_str}}</view>
							</view>
						</view>
					</view>
					<view @click="showToken = false;"
						style="width: 190rpx;height: 85rpx;text-align: center;line-height: 85rpx;color: #fff;border-radius: 50rpx;margin: 0 auto;margin-top: 60rpx;background: #FFA000;">
						确认</view>
				</block>
			</view>
		</u-popup>
		<!-- 上报 -->
		<u-popup :show="showReport" @close="showReport = false" mode="center" :closeable="false" :round="20">
			<view class="report">
				<view class="reportBgBox">
					<text>库中没有检测到对应诗句，请检查是否 有错别字，或一键上报，我们将持续完 善基础库。</text>
				</view>
				<view
					style="display: flex;align-items: center;padding: 0rpx 52rpx;box-sizing: border-box;justify-content: space-between;margin-top: 33rpx;">
					<view class="reportBtn" @click="showReport = false;inputMessage = '';">好吧</view>
					<view class="reportBtn" @click="reportClick">一键上报</view>
				</view>
			</view>
		</u-popup>
		<!-- 认输 -->
		<u-popup :show="showTransport" @close="showTransport = false" mode="center" :closeable="false" :round="20">
			<view class="report">
				<view class="reportBgBox"
					style="text-align: center;display: flex;align-items: center;justify-content: center;">
					<text>您确定要认输吗？</text>
				</view>
				<view
					style="display: flex;align-items: center;padding: 0rpx 52rpx;box-sizing: border-box;justify-content: space-between;margin-top: 33rpx;">
					<view class="reportBtn" @click="transport">确定</view>
					<view class="reportBtn" @click="showTransport = false">继续比赛</view>
				</view>
			</view>
		</u-popup>

		<view class="roomBody">
			<view class="roomHead">
				<view class="headLeft">
					<text style="color: #333333;font-size: 26rpx;"
						v-if="roomDate!=null">{{roomDate.room_info.room_name||'未知'}}</text>
					<text style="color: #666666;font-size: 23rpx;"
						v-if="roomDate!=null">ID{{roomDate.room_info.room_id||'未知'}}</text>
				</view>
				<i class="iconfont icon-gengduo1" @click="openDrawer" :style="{color:roomType!='fhl'?'#999':'#fff'}"
					style="font-size: 46rpx;"></i>
			</view>
			<view class="stageContainer">
				<!-- 未准备倒计时 -->
				<view class="markContainer" v-if="noReadyUser!=null">
					<view class="markBox">
						<block v-for="(item,index) in stage_list" :key="index">
							<view class="markStatus" :style="{opacity:item.ready_status==1?'0':'1'}">
								<i class="iconfontcolor icon-shaloudaojishi" style="font-size: 23rpx;"></i>
								<text style="margin-left: 10rpx;">{{noReadyTime}}s</text>
							</view>
						</block>
					</view>
				</view>
				<view class="markContainer" v-if="taskBeginFlag">
					<view class="markBox">
						<view class="markStatus">
							<block v-if="taskData.answer_uid==stage_list[0].user_id">
								<i class="iconfontcolor icon-shaloudaojishi" @click="currnetIndex=3"
									style="font-size: 23rpx;"></i>
								<text style="margin-left: 10rpx;">{{taskBeginTime}}s</text>
							</block>
							<block v-else>
								<text>未开始</text>
							</block>
						</view>
						<view class="markStatus">
							<block v-if="taskData.answer_uid==stage_list[1].user_id">
								<i class="iconfontcolor icon-shaloudaojishi" @click="currnetIndex=3"
									style="font-size: 23rpx;"></i>
								<text style="margin-left: 10rpx;">{{taskBeginTime}}s</text>
							</block>
							<block v-else>
								<text>未开始</text>
							</block>
						</view>
					</view>
					<view class="okNumsBox" style="display: flex;align-items: center;justify-content: space-between;">
						<block v-for="(item,index) in stage_list" :key="index">
							<view class="okNums" style="background: #FFA000;"
								v-if="item.user_id == taskData.answer_count[0].user_id">
								<view style="width: 6rpx;height: 6rpx;background: #333;border-radius: 50%;"></view>
								<text>{{taskData.answer_count[0].count}}</text>
							</view>
							<view class="okNums" v-if="item.user_id == taskData.answer_count[1].user_id"
								style="background: #8FFF00;">
								<view style="width: 6rpx;height: 6rpx;background: #333;border-radius: 50%;"></view>
								<text>{{taskData.answer_count[1].count}}</text>
							</view>
						</block>
					</view>
				</view>
				<!-- 左边 -->
				<view class="stageBox">
					<view class="positionNumBox" @click="openMai(stage_list[0],1)"
						:style='{background:stage_list[0].mike_status?"#FFA000":""}' style="margin-right: 10rpx;">
						<block v-if="stage_list[0].mike_status==0||stage_list[0]==''">
							<view style="font-weight: bold;">1</view>
							<i class="iconfont icon-huatong-guan-F"
								style="color: #333;font-size: 26rpx;margin-top: 5rpx;"></i>
						</block>
						<block v-else>
							<block v-if="waveData!=null">
								<block v-for="(item,index) in waveData" :key="index">
									<block v-if="Number(item.userId)==stage_list[0].user_id">
										<wave :nums="item.volume"></wave>
									</block>
								</block>
							</block>
							<block v-else>
								<view style="font-weight: bold;color: #fff;">1</view>
							</block>
							<i class="iconfont icon-huatong-F"
								style="color: #333;font-size: 26rpx;margin-top: 5rpx;color: #fff;"></i>
						</block>
					</view>
					<view class="positionBox">
						<block v-if="stage_list[0] !=''">
							<image style="width: 125rpx;height: 170rpx" :src="stage_list[0].profile_url"
								mode="aspectFill">
							</image>
							<view class="userName">
								<text
									style="position: relative;z-index: 2;">{{stage_list[0].role_realname}}·{{stage_list[0].role_dynasty}}</text>
								<view class="line" v-if="stage_list[0].is_challenger==1"></view>
							</view>
							<view style="height: 32rpx;">
								<block v-if="taskBeginFlag==false">
									<block v-if="!readyFlag">
										<view class="stageStatus" v-if="stage_list[0].ready_status==0"
											@click="ready(stage_list[0])">准备</view>
										<view class="stageStatus" v-else>已准备</view>
									</block>
								</block>
								<block v-else>
									<view class="stageStatus" v-if="taskData.answer_uid==stage_list[0].user_id">思考中
									</view>
									<view class="stageStatus" v-else>等待中</view>
								</block>
							</view>
						</block>
						<block v-else>
							<i class="iconfontcolor icon-touxiang" @click="addStage(1)" style="font-size: 108rpx;"></i>
							<text class="empty" @click="addStage(1)">虚位以待</text>
						</block>
					</view>
				</view>
				<!-- 中间 -->
				<view class="stageCenter">
					<block v-if="selectOrderData!=null&&!readyFlag">
						<view class="shanziBox">
							<image src="../../static/iconImage/shanzi.png" style="width: 215rpx;height: 215rpx;"
								mode="widthFix">
							</image>
							<text class="stageText">{{selectOrderData.content}}</text>
						</view>
						<view class="stageCenterTextBox">
							<block v-for="(item,index) in taskTextList" :key="index">
								<view class="stageCenterUserOne" v-if="item.answer_uid!=stage_list[0].user_id">
									<view>{{item.last_content}}</view>
								</view>
								<view style="display: flex;justify-content: flex-end;" v-else>
									<view class="stageCenterUserTwo">
										<view>{{item.last_content}}</view>
									</view>
								</view>
							</block>
						</view>
					</block>
					<block v-if="selectOrderData==null">
						<view class="shanziBox">
							<image src="../../static/iconImage/shanzi.png" style="width: 215rpx;height: 215rpx;"
								mode="widthFix">
							</image>
							<text class="stageText">?</text>
						</view>
					</block>
				</view>
				<!-- 右边 -->
				<view class="stageBox">
					<view class="positionBox">
						<block v-if="stage_list[1]!=''">
							<image style="width: 125rpx;height: 170rpx;" :src="stage_list[1].profile_url"
								mode="aspectFill">
							</image>
							<view class="userName">
								<text
									style="position: relative;z-index: 2;">{{stage_list[1].role_realname}}·{{stage_list[1].role_dynasty}}</text>
								<view class="line" v-if="stage_list[1].is_challenger==1"></view>
							</view>
							<view style="height: 32rpx;">
								<block v-if="taskBeginFlag==false">
									<block v-if="!readyFlag">
										<view class="stageStatus" v-if="stage_list[1].ready_status==0"
											@click="ready(stage_list[1])">准备</view>
										<view class="stageStatus" v-else>已准备</view>
									</block>
								</block>
								<block v-else>
									<view class="stageStatus" v-if="taskData.answer_uid==stage_list[1].user_id">思考中
									</view>
									<view class="stageStatus" v-else>等待中</view>
								</block>
							</view>
						</block>
						<block v-else>
							<i class="iconfontcolor icon-touxiang" @click="addStage(2)" style="font-size: 108rpx;"></i>
							<text class="empty" @click="addStage(2)">虚位以待</text>
						</block>
					</view>
					<view class="positionNumBox" @click="openMai(stage_list[1],2)"
						:style='{background:stage_list[1].mike_status?"#FFA000":""}' style="margin-left: 10rpx;">
						<block v-if="stage_list[1].mike_status==0||stage_list[1]==''">
							<view style="font-weight: bold;">2</view>
							<i class="iconfont icon-huatong-guan-F"
								style="color: #333;font-size: 26rpx;margin-top: 5rpx;"></i>
						</block>
						<block v-else>
							<block v-if="waveData!=null">
								<block v-for="(item,index) in waveData" :key="index">
									<block v-if="Number(item.userId)==stage_list[1].user_id">
										<wave :nums="item.volume"></wave>
									</block>
								</block>
							</block>
							<block v-else>
								<view style="font-weight: bold;color: #fff;">2</view>
							</block>
							<i class="iconfont icon-huatong-F"
								style="color: #333;font-size: 26rpx;margin-top: 5rpx;color: #fff;"></i>
						</block>
					</view>
				</view>
			</view>

			<view class="contentContainer">
				<view class="contentLeft">
					<scroll-view class="chatContainer" scroll-y="true" :scroll-into-view="scrollInto"
						:scroll-with-animation="true" :show-scrollbar="false">

						<block v-for="(item,index) in messageList" :key="index">
							<!-- 聊天消息 -->
							<view class="chatContent" v-if="item.message.type=='text'||item.message.type=='image'">
								<view class="userImg" style="flex-shrink: 0;">
									<image style="width: 100%;height: 100%;" :src="item.from_user_info.avatar"
										mode="aspectFill">
									</image>
								</view>
								<view class="chatBox">
									<view class="userName">
										{{item.from_user_info.role_realname}}·{{item.from_user_info.role_dynasty}}
									</view>
									<view class="chatMessageBox" v-if="item.message.type=='text'">
										{{item.message.content}}
									</view>
									<view v-if="item.message.type=='image'">
										<u-album :urls="item.message.content.split(',')" multipleSize="300"
											@imgLoad="imgLoad" rowCount="1"></u-album>
									</view>
								</view>
							</view>
							<!-- 系统消息 -->
							<view style="display: flex;align-items: center;" v-if="item.message.type=='entry_room'">
								<view></view>
								<view class="systemMessage" style="color: #FFDDA4;">
									*{{item.user_info.role_realname}}·{{item.user_info.role_dynasty}}来围观了
								</view>
							</view>
							<!-- 礼物消息 -->
							<view style="display: flex;align-items: center;" v-if="item.message.type=='gift'">
								<view></view>
								<view class="giftMessage" style="display: flex;align-items: center;">
									<text>*{{item.from_user_info.role_realname}}·{{item.from_user_info.role_dynasty}}给{{item.to_user_info.role_realname}}·{{item.to_user_info.role_dynasty}}送出了</text>
									<image :src="item.message.gift_image" class="giftImgs" mode="aspectFill"></image>
								</view>
							</view>
							<view style="display: flex;align-items: center;" v-if="item.message.type=='prompt'">
								<view></view>
								<view class="systemMessage" style="padding: 20rpx;box-sizing: border-box;color: #fff;">
									{{item.message.content}}
								</view>
							</view>
						</block>
						<view id="scrollBottom"></view>
					</scroll-view>
				</view>
				<view class="contentRight">
					<view class="maiUser" v-for="(item,index) in wait_list" :key="index">
						<block v-if="item!=''">
							<image @click="openUserBox(item)" style="width: 4rem;height: 4rem;border-radius: 50%;"
								:src="item.avatar" mode="aspectFill">
							</image>
							<view class="positionNumBox" @click="openMai(item,index+3)"
								:style="{background:item.mike_status==0?'#fff':'',color:item.mike_status==0?'#333':''}">
								<block v-if="item.mike_status==0">
									<view>{{index+3}}</view>
									<i class="iconfont icon-huatong-guan-F"
										style="font-size: 36rpx;margin-top: 10rpx;"></i>
								</block>
								<block v-else>
									<block v-if="waveData!=null">
										<block v-for="(waveItem,waveIndex) in waveData" :key="waveIndex">
											<block v-if="Number(waveItem.userId)==item.user_id">
												<wave :nums="waveItem.volume"></wave>
											</block>
											<!-- <view v-else style="font-weight: bold;">{{index+3}}</view> -->
										</block>
									</block>
									<view v-else style="font-weight: bold;">{{index+3}}</view>
									<i class="iconfont icon-huatong-F" style="font-size: 36rpx;margin-top: 10rpx;"></i>
								</block>
							</view>
						</block>
						<block v-else>
							<i class="iconfontcolor icon-touxiang" style="font-size: 4rem;"></i>
							<view class="positionNumBox"
								style="color: #333;background: #fff;text-align: center;font-size: 25rpx;">
								空 位 置
							</view>
						</block>
					</view>
					<block v-for="(item,index) in stage_list" :key="index">
						<view v-if="item.user_id==userInfo.id" @click="useSilk" style="text-align: center;">
							<view
								style="margin-top: 20rpx;display: flex;align-items: center;;height: 57rpx;width: 150rpx;background: linear-gradient(135deg, #FFF8B6, #fff);margin-right: -30rpx;border-radius: 50rpx 0rpx 0rpx 50rpx;border: 1px solid #fff;">
								<image src="../../static/iconImage/libao.gif"
									style="width: 80rpx;height: 80rpx;margin-left: -20rpx;" mode="">
								</image>
								<text
									style="color:#FFA000 ;font-size: 26rpx;font-family: font-test !important;white-space: nowrap;">看答案</text>
							</view>
							<block v-if="silkText=='免费'">
								<view
									style="color: #333;font-size: 28rpx;width: 150rpx;margin-right: -30rpx;text-align: center;margin-top: 10rpx;">
									{{silkText}}
								</view>
							</block>
							<block v-else>
								<view
									style="color: #333;font-size: 28rpx;display: flex;align-items: center;width: 150rpx;margin-right: -30rpx;margin-top: 10rpx;text-align: center;">
									<image src="../../static/qian.png"
										style="width: 35rpx;height: 35rpx;margin-right: 5rpx;" mode=""></image>
									<text>×{{silkText}}</text>
								</view>
							</block>
						</view>
					</block>
				</view>
			</view>

			<view class="bottomBar">
				<view class="bottomInput" @click="sendInput">
					<text style="color: #FFA000;white-space: nowrap;font-size: 28rpx;">发言：</text>
				</view>
				<view class="bottomBarIcon" @click="handleImage">
					<image src="@/static/iconImage/roomimg.png" style="width: 100%;height: 100%;" mode=""></image>
				</view>
				<view class="bottomBarIcon" @click="showGift=true">
					<image src="@/static/iconImage/roomliwu.png" style="width: 100%;height: 100%;" mode=""></image>
				</view>
				<block>
					<view class="maiBtn" @click="addTalk" v-if="flagMaiBtn">
						<i class="iconfont icon-huatong-F" style="font-size: 36rpx;margin-top: 10rpx;color:fff;"></i>
						<text>上麦</text>
					</view>
					<view class="maiBtn" @click="belowTalk" v-else>
						<i class="iconfont icon-huatong-F" style="font-size: 36rpx;margin-top: 10rpx;color:fff;"></i>
						<text>下麦</text>
					</view>
				</block>
			</view>
		</view>
		<!-- 输入框 -->
		<u-popup :show="showInput" @close="showInput = false" mode="bottom" :overlayOpacity="0" :closeable="false"
			:round="20">
			<view class="inputContainer">
				<view class="inputBox">
					<view class="textAreaBox">
						<textarea type="text" v-model="inputMessage" @blur="showInput=false;" auto-focus="true"
							confirm-type="send" auto-height="true" :adjust-position="false" class="myTextArea" />
					</view>
					<view class="inputBtn" @touchend.prevent="sendTextMessage">发送</view>
				</view>
				<view :style="{height:keyboardHeight+'px'}"></view>
			</view>
		</u-popup>


		<!-- 动画 -->
		<collision ref="collision">
			<template slot="left">
				<view style="display: flex;align-items: center;">
					<image :src="stage_list[0].profile_url" style="width: 125rpx;height: 170rpx;margin-bottom: 4rpx;"
						mode="aspectFill"></image>
					<view style="width: 132rpx;color: #000;font-size: 22rpx;margin-top: 30rpx;">
						{{stage_list[0].role_realname}}·{{stage_list[0].role_dynasty}}
					</view>
				</view>
			</template>
			<template slot="right">
				<view style="display: flex;align-items: center;justify-content: flex-end;">
					<text
						style="width: 132rpx;color: #000;font-size: 22rpx;text-align: left;margin-top:30rpx;">{{stage_list[1].role_realname}}·{{stage_list[1].role_dynasty}}</text>
					<image :src="stage_list[1].profile_url" style="width: 125rpx;height: 170rpx;margin-bottom: 4rpx;"
						mode="aspectFill"></image>
				</view>
			</template>
		</collision>
		<!-- 礼物动画 -->
		<view v-show="showSvga" id="svgaPlayer"
			style="z-index: 99999;box-sizing: border-box;position: fixed;top:0;left: 0;width: 100%;height: 100%;">
			<l-svga ref="svgaPlayer" style="width: 100%;height: 100%;box-sizing: border-box;"></l-svga>
		</view>
		<!-- 充值弹窗 -->
		<!-- #ifdef APP -->
		<recharge ref="recharge"></recharge>
		<!-- #endif -->
		<userContainer ref="userContainer"></userContainer>
	</view>
</template>

<script>
	import userContainer from "@/components/fei-userContainer/fei-userContainer.vue"
	import collision from "@/components/fei-collision/fei-collision.vue"
	import recharge from "@/components/fei-recharge/fei-recharge.vue"
	import wave from "@/components/fei-wave/fei-wave.vue"
	// #ifdef APP
	import permision from "@/TrtcCloud/permission.js";
	import TrtcCloud from '@/TrtcCloud/lib/index';
	import genTestUserSig from '@/debug/GenerateTestUserSig';
	import {
		TRTCAppScene,
		TRTCRoleType
	} from '@/TrtcCloud/lib/TrtcDefines';
	import {
		TRTCAudioQuality
	} from '@/TrtcCloud/lib/TrtcDefines';
	// #endif

	export default {
		components: {
			collision,
			recharge,
			wave,
			userContainer
		},
		data() {
			return {
				empower: false,
				roomType: "",
				transportFlag: false,
				showTransport: false,
				backgroundImg: "",
				showGift: false,
				showShare: false,
				keyboardHeight: 0,
				currnetIndex: 1,
				giftCurrentUserIndex: 1,
				giftCurrentIndex: 0,
				showReport: false,
				showToken: false,
				showDrawer: false,
				drawerTabIndex: 1,
				showCreateRoom: false,
				showInput: false,
				roomDate: null, //房间信息
				stage_list: ["", ""],
				messageList: [],
				wait_list: ["", "", "", ""], //麦位 
				giftList: [],
				userInfo: uni.getStorageSync("userInfo"),
				flagMaiBtn: true,
				maiCurrentIndex: null,
				orderPage: 1,
				orderList: [],
				selectOrder: false,
				selectOrderIndex: 0,
				selectOrderData: null,
				readyFlag: true,
				inputMessage: '',
				scrollInto: "",
				showSvga: false,
				createRoomDate: [],
				createRoomIndex: 0,
				createRoomTypeIndex: 0,
				createRoomName: '',
				noReadyUser: null,
				noReadyInter: null,
				noReadyTime: 120,
				taskData: null,
				taskTextList: [],
				taskBeginFlag: false,
				taskBeginTime: 30,
				taskBeginInter: null,
				taskResultData: null,
				silkText: "免费",
				allUserList: [],
				allGiftSelectFlag: false,
				task_id: null,
				exitRoomFlag: false,
				// -------语音
				trtcCloud: null,
				sdkAppId: 0,
				roomId: "",
				userId: String(uni.getStorageSync("userInfo").id),
				userSig: '',
				waveData: null,
				inviteList: [],
				roomIsError: false,
			}
		},
		onLoad(option) {
			getApp().globalData.socketTask._callbacks.message.splice(1);
			var that = this;
			that.roomType = option.type
			that.init(option.roomId)
			that.setFontFamily();
			that.watchKeyboard()
			that.getGiftList()
			that.getUserInfo()
			that.invite()
			uni.$on("changeRoom", (data) => {
				if (data.msg == 'chatRoom') {
					getApp().globalData.socketTask._callbacks.message.splice(1);
					that.init(option.roomId)
				}
			})
			// #ifdef APP-PLUS
			this.initTRTC()
			// 保持屏幕常亮
			uni.setKeepScreenOn({
				keepScreenOn: true
			});
			plus.device.setWakelock(true);
			// #endif
		},
		onUnload() {
			// #ifdef APP-PLUS
			// 保持屏幕常亮
			uni.setKeepScreenOn({
				keepScreenOn: false
			});
			plus.device.setWakelock(false);
			// #endif

			var that = this;
			var isUser = this.stage_list.filter((item, index) => {
				return item.user_id == this.userInfo.id
			})
			if (isUser.length == 0) {
				if (that.roomIsError == false) {
					that.$api("room.exitRoom", {
						room_id: that.roomDate.room_info.room_id
					}).then(res => {
						if (res.code == 1) {
							// #ifdef APP-PLUS
							that.closeTrtcCloud()
							// #endif
						}
					})
				}
			} else {
				if (this.taskData == null) {
					that.$api("room.exitRoom", {
						room_id: that.roomDate.room_info.room_id
					}).then(res => {
						if (res.code == 1) {
							// #ifdef APP-PLUS
							that.closeTrtcCloud()
							// #endif
						}
					})
				} else {
					this.stage_list.forEach((item, index) => {
						if (item.user_id == this.userInfo.id) {
							this.showDrawer = false;
							this.showTransport = true;
							this.exitRoomFlag = true
						}
					})
				}
			}
		},
		onBeforeBack(args) {
			return true //阻止页面关闭
		},
		methods: {
			init(roomId) {
				var that = this;
				that.$api("room.entryRoom", {
					room_id: roomId
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.initScoket();
						that.roomDate = res.data;
						that.drawerTabIndex = 0;
						//麦位
						res.data.profile_list.wait_list.forEach((item, index) => {
							switch (item.key) {
								case 3:
									that.wait_list[0] = item
									break;
								case 4:
									that.wait_list[1] = item
									break;
								case 5:
									that.wait_list[2] = item
									break;
								case 6:
									that.wait_list[3] = item
									break;
							}
						})
						//pk擂台
						res.data.profile_list.stage_list.forEach((item, index) => {
							switch (item.key) {
								case 1:
									that.stage_list[0] = item
									break;
								case 2:
									that.stage_list[1] = item
									break;
							}
							if (item.is_challenger == 1) {
								that.giftCurrentUserIndex = item.key - 1;
							}
						})
						//pk中的时候
						if (res.data.task_info.length != 0) {
							that.taskData = res.data.task_info;
							that.noReadyUser = null;
							that.taskBeginFlag = true;
							that.readyFlag = false;
							that.selectOrderData = res.data.task_info.content;
						}
						res.data.message_list.reverse().forEach((item, index) => {
							that.messageList.push(item);
							that.scrollBottom();
						})
						var allUserArr = [...res.data.profile_list.stage_list, ...res.data.profile_list.wait_list];
						if (allUserArr.length != 0) {
							allUserArr.forEach((item, index) => {
								if (item != '') {
									that.maiSocket(1)
									that.addAudioRoom(that.userId, that.roomDate.room_info.room_id)
								}
							})
						}

					} else {
						that.roomIsError = true;
						uni.showToast({
							icon: "none",
							title: res.msg
						})
						var timeOut = setTimeout(() => {
							that.$u.route({
								type: 'navigateBack',
								delta: 1
							})
							clearTimeout(timeOut)
						}, 800)
					}
				})
			},
			//初始化scoket
			initScoket() {
				var that = this;
				getApp().globalData.socketTask.onMessage((res) => {
					var socketDate = JSON.parse(res.data);
					console.log(socketDate)
					if (socketDate.cate == "room") {
						switch (socketDate.data.type) {
							case "entry_room":
								var item = socketDate.data;
								item.message = {}
								item.message.type = "entry_room"
								that.messageList.push(item);
								that.scrollBottom();
								break;
							case "profile_change_one":
								if (socketDate.data.key <= 2) {
									if (socketDate.data.user_info.user_id != undefined) {
										that.stage_list.forEach((item, index) => {
											if (item.user_id == socketDate.data.user_info.user_id) {
												that.stage_list.splice(index, 1, "")
											}
										})
										that.stage_list[Number(socketDate.data.key) - 1] = socketDate.data
											.user_info;
										that.stage_list.forEach((item, index) => {
											if (item.user_id == that.userInfo.id) {
												that.flagMaiBtn = false;
											}
											if (item.is_challenger == 1) {
												that.giftCurrentUserIndex = item.key - 1;
											}
										})
										that.$forceUpdate()
									} else {
										if (that.stage_list[Number(socketDate.data.key) - 1].user_id == that
											.userInfo.id) {
											that.flagMaiBtn = true;
										}
										that.stage_list.splice(Number(socketDate.data.key) - 1, 1, "")
										that.stage_list.forEach((item, index) => {
											if (item != '') {
												that.stage_list[index].ready_status = 0
												that.stage_list[index].is_challenger = 1;
											}
										})
									}
									if (that.stage_list.includes("") == false) {
										if (that.taskData == null) {
											that.taskBeginFlag = false;
										}
										that.readyFlag = false;
									} else {
										that.readyFlag = true
										that.selectOrderData = null;
										that.noReadyUser = null;
										that.noReadyTime = 120;
										that.taskBeginTime = 30;
										that.taskBeginFlag = false;
										that.taskData = null;
										that.selectOrderData = null;
										that.noReadyTime = 120;
										that.taskTextList = []
										clearInterval(that.noReadyInter)
										clearInterval(that.taskBeginInter)
									}
									that.$forceUpdate()
								} else {
									if (socketDate.data.user_info.user_id != undefined) {
										that.wait_list.forEach((item, index) => {
											if (item.user_id == socketDate.data.user_info.user_id) {
												that.wait_list.splice(index, 1, "")
											}
										})
										that.wait_list[Number(socketDate.data.key) - 3] = socketDate.data
											.user_info;
										that.wait_list.forEach((item, index) => {
											if (item.user_id == that.userInfo.id) {
												that.flagMaiBtn = false;
											}
										})
									} else {
										if (that.wait_list[Number(socketDate.data.key) - 3].user_id == that
											.userInfo.id) {
											that.flagMaiBtn = true;
										}
										that.wait_list.splice(Number(socketDate.data.key) - 3, 1, "")
									}
								}
								that.$forceUpdate()
								break;
							case "profile_change":
								that.stage_list = ["", ""]
								that.wait_list = ["", "", "", ""];
								that.flagMaiBtn = true;
								//pk擂台
								socketDate.data.profile_list.stage_list.forEach((item, index) => {
									switch (item.key) {
										case 1:
											that.stage_list[0] = item
											break;
										case 2:
											that.stage_list[1] = item
											break;
									}
									if (item.user_id == that.userInfo.id) {
										that.flagMaiBtn = false;
									}
									if (item.is_challenger == 1) {
										that.giftCurrentUserIndex = item.key - 1;
									}
								})

								//麦位
								socketDate.data.profile_list.wait_list.forEach((item, index) => {
									switch (item.key) {
										case 3:
											that.wait_list[0] = item
											break;
										case 4:
											that.wait_list[1] = item
											break;
										case 5:
											that.wait_list[2] = item
											break;
										case 6:
											that.wait_list[3] = item
											break;
									}
									if (item.user_id == that.userInfo.id) {
										that.flagMaiBtn = false;
									}
								})
								that.readyFlag = that.stage_list.includes('')
								that.selectOrderData = null;
								that.noReadyUser = null;
								that.noReadyTime = 120;
								that.taskBeginTime = 30;
								that.taskBeginFlag = false;
								that.taskData = null;
								that.selectOrderData = null;
								that.noReadyUser = null;
								that.noReadyTime = 120;
								that.taskTextList = []
								clearInterval(that.noReadyInter)
								clearInterval(that.taskBeginInter)
								that.$forceUpdate()
								break;
							case "fhl_key_word":
								that.selectOrderData = socketDate.data
								break;
							case "task_ready_status":
								socketDate.data.ready_list.forEach((item, index) => {
									if (item.index == that.stage_list[index].key) {
										if (item.ready_status == 1) {
											that.stage_list[index].ready_status = 1;
										} else {
											that.noReadyUser = item;
											that.noReadyInter = setInterval(() => {
												that.noReadyTime = --that.noReadyTime;
												if (that.noReadyTime <= 0) {
													clearInterval(that.noReadyInter)
													if (item.user_id == that.userInfo.id) {
														that.add(2, item.index)
														that.noReadyUser = null;
														that.noReadyTime = 120;
													}
												}
											}, 1000)
										}
									}
								})
								that.$forceUpdate()
								break;
							case "fhl_task_begin":
								that.noReadyUser = null;
								that.noReadyTime = 120;
								that.taskBeginFlag = true;
								that.$refs.collision.start()
								that.taskData = socketDate.data;
								clearInterval(that.noReadyInter)
								that.taskBeginInterVal()
								break;
							case "fhl_task_trun":
								that.taskTextList = [];
								that.noReadyTime = 120;
								clearInterval(that.noReadyInter)
								that.taskTextList.push(socketDate.data)
								that.taskData = socketDate.data;
								that.taskBeginInterVal()
								break;
							case "fhl_task_result":
								that.selectOrder = false;
								that.taskTextList = []
								that.showToken = true;
								that.taskBeginFlag = false;
								that.taskData = null;
								that.readyFlag = true;
								that.taskResultData = null;
								that.silkText = '免费';
								that.taskResultData = socketDate.data;
								break;
							case "room_trtc_status":
								if (socketDate.data.status == 0) {
									if (that.trtcCloud != null) {
										that.trtcCloud.exitRoom();
									}
								} else {
									that.addAudioRoom(that.userId, that.roomDate.room_info.room_id)
								}
								break;
							case "close_room":
								that.$api("room.exitRoom", {
									room_id: that.roomDate.room_info.room_id
								}).then(res => {
									if (res.code == 1) {
										uni.$emit('closeRoom', {
											msg: '房间解散'
										})
										that.trtcCloud.exitRoom();
										that.closeTrtcCloud()
										that.$nextTick(() => {
											that.$u.route({
												type: 'navigateBack',
												delta: 1
											})
										})
									}
								})
								break;
							case "exit_room":
								that.$api("room.moreinfo", {
									room_id: that.roomDate.room_info.room_id
								}).then(res => {
									if (res.code == 1) {
										that.allUserList = [];
										that.allUserList = res.data;
									}
								})
								break;
							case "room_remove_user":
								if (socketDate.data.user_info.user_id == that.userInfo.id) {
									uni.$emit('roomRemoveUser', {
										msg: '踢出房间'
									})
									that.$nextTick(() => {
										that.trtcCloud.exitRoom();
										that.closeTrtcCloud()
										that.$nextTick(() => {
											that.$u.route({
												type: 'navigateBack',
												delta: 1
											})
										})
									})
								}
								break;
						}
					} else if (socketDate.cate == "chat") {
						if (socketDate.data.room_id != undefined) {
							if (socketDate.data.message.type == "gift") {
								var isShowGift = true;
								that.stage_list.forEach((item, index) => {
									if (item.user_id == that.userInfo.id) {
										isShowGift = false;
									}
								})
								if (isShowGift == true) {
									that.showSvga = true;
									that.$refs.svgaPlayer.render(async (parser, player) => {
										let videoItem = await parser.load(socketDate.data.message
											.gift_svga);
										await player.setVideoItem(videoItem)
										player.loops = 1;
										player.setContentMode(socketDate.data.message.is_full_screen ==
											1 ?
											"AspectFill" :
											"AspectFit")
										player.startAnimation();
										player.onFinished(() => {
											that.showSvga = false
										})
									})
								}
							} else {
								socketDate.data.type = "chat"
							}
							that.messageList.push(socketDate.data);
							that.scrollBottom();
							that.$forceUpdate()
						}
					}
				})
			},
			invite() {
				this.$api("room.getInviteUser").then(res => {
					if (res.code == 1) {
						this.inviteList = res.data;
					}
				})
			},
			//登上舞台
			addStage(num) {
				var flagArr = this.wait_list.filter((item, index) => {
					return item.user_id == this.userInfo.id
				})
				if (flagArr.length == 0) {
					this.maiCurrentIndex = num;
					this.add(1, num)
				} else {
					uni.showToast({
						icon: "none",
						title: "您已在麦位上"
					})
				}
			},
			createRoomType(item, index) {
				this.createRoomTypeIndex = index;
				this.$api("room.createRoomOption", {
					type: item.key
				}).then(res => {
					if (res.code == 1) {
						console.log(res)
						this.createRoomDate = res.data;
					}
				})
			},
			//准备
			ready(item) {
				var that = this;
				if (this.userInfo.id != item.user_id) {
					uni.showToast({
						icon: "none",
						title: "这不是您自己"
					})
					return;
				}
				if (item.is_challenger == 1) {
					if (that.roomType == 'fhl') {
						this.order("ready")
					} else {
						that.$api("room.taskReady", {
							room_id: that.roomDate.room_info.room_id
						}).then(res => {
							console.log(res)
						})
					}
				} else {
					that.$api("room.taskReady", {
						room_id: that.roomDate.room_info.room_id
					}).then(res => {
						console.log(res)
					})
				}
			},
			//选择令牌
			selectOrderClick(item, index) {
				this.selectOrderIndex = index;
			},
			//令牌ok
			selectOrderOk() {
				this.showToken = false;
				this.selectOrder = false;
				this.$api("room.taskReady", {
					room_id: this.roomDate.room_info.room_id,
					key_word: this.orderList[this.selectOrderIndex].word
				}).then(res => {
					this.selectOrderIndex = 0;
				})
			},
			//更换令牌
			changeOrder() {
				this.orderPage++;
				this.order()
			},
			//上麦位
			addTalk() {
				for (var i = 0; i < this.wait_list.length; i++) {
					if (this.wait_list[i] == '') {
						this.add(1, i + 3)
						return;
					}
				}
			},
			//下麦位
			belowTalk() {
				this.stage_list.forEach((item, index) => {
					if (item.user_id == this.userInfo.id) {
						if (this.taskData == null) {
							this.add(2, item.key);
							this.trtcCloud.stopLocalAudio()
						} else {
							this.showDrawer = false;
							this.showTransport = true;
							this.transportFlag = true;
						}
					}
				})
				this.wait_list.forEach((item, index) => {
					if (item.user_id == this.userInfo.id) {
						this.add(2, item.key);
						this.trtcCloud.stopLocalAudio()
					}
				})
			},
			yuCreateRoom() {
				if (this.createRoomDate.is_real_auth == 0) {
					this.showDrawer = false;
					this.empower = true;
					return;
				}
				this.showDrawer = false;
				this.showCreateRoom = true;
				if (this.roomType == 'scjl' && this.roomType == 'cyjl') {
					this.$api("room.createRoomOption", {
						type: this.createRoomDate.type[this.createRoomTypeIndex].key
					}).then(res => {
						if (res.code == 1) {
							this.createRoomDate = res.data;
						}
					})
				}
			},
			// 认输
			transport() {
				var that = this;
				that.showTransport = false;
				if (that.exitRoomFlag == true) {
					this.stage_list.forEach((val, index) => {
						if (val.user_id == that.userInfo.id) {
							that.$api("room.submitFailTask", {
								room_id: that.roomDate.room_info.room_id,
								task_id: that.taskData.fhl_task_id,
								is_giveup: 1
							}).then(res => {
								that.$api("room.exitRoom", {
									room_id: that.roomDate.room_info.room_id
								}).then(res => {
									if (res.code == 1) {
										that.exitRoomFlag = false;
										that.closeTrtcCloud()
										that.$nextTick(() => {
											that.$u.route({
												type: 'navigateBack',
												delta: 1
											})
										})
									}
								})
							})
						}
					})
				} else {
					if (that.transportFlag == true) {
						that.stage_list.forEach((val, index) => {
							if (val.user_id == that.userInfo.id) {
								that.$api("room.submitFailTask", {
									room_id: that.roomDate.room_info.room_id,
									task_id: that.taskData.fhl_task_id,
									is_giveup: 1
								}).then(res => {
									that.transportFlag = false;
								})
							}
						})
					} else {
						that.closeTrtcCloud()
						that.submitFailTask()
					}

				}
			},
			//房间形象变动-PK位/候补席变动
			add(type, index) {
				var that = this;
				that.$api("room.positionChange", {
					type: type,
					index: index,
					room_id: that.roomDate.room_info.room_id
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						that.maiCurrentIndex = null;
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				})
			},
			//离开房间
			exitRoom() {
				var that = this;
				var isUser = this.stage_list.filter((item, index) => {
					return item.user_id == this.userInfo.id
				})
				if (isUser.length == 0) {
					that.$api("room.exitRoom", {
						room_id: that.roomDate.room_info.room_id
					}).then(res => {
						if (res.code == 1) {
							that.closeTrtcCloud()
							that.$nextTick(() => {
								that.$u.route({
									type: 'navigateBack',
									delta: 1
								})
							})
						}
					})
				} else {
					if (this.taskData == null) {
						that.$api("room.exitRoom", {
							room_id: that.roomDate.room_info.room_id
						}).then(res => {
							if (res.code == 1) {
								that.closeTrtcCloud()
								that.$nextTick(() => {
									that.$u.route({
										type: 'navigateBack',
										delta: 1
									})
								})
							}
						})
					} else {
						this.stage_list.forEach((item, index) => {
							if (item.user_id == this.userInfo.id) {
								this.showDrawer = false;
								this.showTransport = true;
								this.exitRoomFlag = true
							}
						})
					}
				}
			},
			//打开用户弹窗
			openUserBox(item) {
				if (item.user_id == this.userInfo.id) {
					uni.showToast({
						icon: "none",
						title: "这是您自己"
					})
				} else {
					this.$refs.userContainer.show(item.user_id, this.roomDate.room_info.room_id)
				}
			},
			//设置字体
			setFontFamily() {
				// #ifdef APP-PLUS
				uni.loadFontFace({
					family: 'font-test',
					// 本地字体路径需转换为平台绝对路径
					source: `url(${plus.io.convertLocalFileSystemURL('_www/static/AaHouDiHei.ttf')})`,
					success() {
						console.log('success')
					},
					fail(e) {
						console.log('fail')
					}
				})
				// #endif
			},
			//监听键盘
			watchKeyboard() {
				var that = this;
				uni.onKeyboardHeightChange(res => {
					that.keyboardHeight = res.height;
				})
			},
			//获取礼物列表
			getGiftList() {
				var that = this;
				that.$api('gift.lists').then(res => {
					if (res.code === 1) {
						that.giftList = res.data;
					}
				})
			},
			//令牌接口
			order() {
				var that = this;
				that.taskResultData = null;
				that.$api("room.preCreateTask", {
					page: that.orderPage
				}).then(res => {
					if (res.code == 1) {
						that.orderList = [];
						that.orderList = res.data.list;
						that.showToken = true;
						that.selectOrder = true;
					}
				})
			},
			//用户信息
			getUserInfo() {
				var that = this;
				that.$api("user.info").then(res => {
					if (res.code == 1) {
						that.userInfo = res.data;
					}
				})
			},
			//送礼物
			sendGift(item, index) {
				var that = this;
				if (that.stage_list[0] == '' && that.stage_list[1] == '') {
					return;
				}
				if (that.allGiftSelectFlag == true) {
					that.$api("gift.giveGift2", {
						room_id: that.roomDate.room_info.room_id,
						to_user_id: [that.stage_list[0].user_id, that.stage_list[1].user_id],
						gift_id: item.id
					}).then(res => {
						that.getUserInfo()
						if (res.code == 3001) {
							uni.showToast({
								icon: "none",
								title: res.msg,
								complete() {
									that.showGift = false;
									that.$refs.recharge.show()
								}
							})
						} else if (res.code == 2001) {
							uni.showToast({
								icon: "none",
								title: res.msg,
								complete() {
									that.showGift = false;
								}
							})
						}
					})
				} else {
					that.$api("gift.giveGift2", {
						room_id: that.roomDate.room_info.room_id,
						to_user_id: [that.stage_list[that.giftCurrentUserIndex].user_id],
						gift_id: item.id
					}).then(res => {
						that.getUserInfo()
						if (res.code == 3001) {
							uni.showToast({
								icon: "none",
								title: res.msg,
								complete() {
									that.showGift = false;
									that.$refs.recharge.show()
								}
							})
						} else if (res.code == 2001) {
							uni.showToast({
								icon: "none",
								title: res.msg,
								complete() {
									that.showGift = false;
								}
							})
						}
					})
				}
			},
			//发送图片
			handleImage() {
				var that = this
				var token = uni.getStorageSync("token");
				getApp().globalData.isSelectImage = true;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: (res) => {
						res.tempFilePaths.forEach(item => {
							uni.uploadFile({
								url: uni.getStorageSync("hostData").host+"/api/hey/" + 'index/upload',
								filePath: item,
								name: 'file',
								formData: {
									"token": token
								},
								success: res => {
									res = JSON.parse(res.data)
									if (res.code == 1) {
										that.sendMessage({
											type: "image",
											content: res.data.fullurl
										})
									}
								},
								fail: e => {
									uni.showToast({
										icon: "none",
										title: "发送图片失败"
									})
								}
							})
						})
					}
				})
			},
			//发送文字信息
			sendTextMessage() {
				if (this.inputMessage == '') {
					uni.showToast({
						icon: "none",
						title: "请输入内容"
					})
				} else {
					if (this.taskData == null) {
						this.sendMessage({
							type: "text",
							content: this.inputMessage
						})
						this.showInput = false;
						this.inputMessage = '';
					} else {
						if (this.taskData.answer_uid == this.userInfo.id) {
							this.showInput = false;
							this.$api("room.refereeTask", {
								room_id: this.roomDate.room_info.room_id,
								content: this.inputMessage,
								task_id: this.taskData.fhl_task_id
							}).then(res => {
								if (res.code == 2002) {
									uni.showToast({
										icon: "none",
										title: res.msg
									})
									this.task_id = res.data.task_id;
									this.showReport = true;
								} else if (res.code == 1) {
									this.inputMessage = '';
								} else {
									uni.showToast({
										icon: "none",
										title: res.msg
									})
								}
							})
						} else {
							this.sendMessage({
								type: "text",
								content: this.inputMessage
							})
							this.showInput = false;
							this.inputMessage = '';
						}
					}
				}
			},
			//发送socket信息
			sendMessage(data) {
				let that = this;
				let params = {
					cate: "chat",
					code: 1,
					msg: "success",
					data: {
						room_id: that.roomDate.room_info.room_id,
						from_user_id: that.userInfo.id,
						message: data
					}
				}
				console.log("-------发送消息----------")
				getApp().globalData.socketTask.send({
					data: JSON.stringify(params),
					success() {
						console.log("webscoket发送信息成功");
						that.sendStr = "";
					},
					fail() {
						console.log("webscoket发送信息失败");
					}
				});
			},
			//滚动到底部
			scrollBottom() {
				let that = this
				let timeout = null
				that.scrollInto = ''
				clearTimeout(timeout)
				timeout = setTimeout(() => {
					that.scrollInto = 'scrollBottom'
				}, 500)
			},
			//邀请
			inviteClick(item) {
				this.$api("room.inviteUser", {
					to_user_id: item.user_id,
					room_id: this.roomDate.room_info.room_id,
				}).then(res => {
					if (res.code == 1) {
						this.showShare = false;
						uni.showToast({
							icon: "none",
							title: res.msg,
						})
					}
				})
			},
			//图片记载
			imgLoad() {
				this.scrollBottom()
			},
			//打开抽屉
			openDrawer() {
				var that = this;
				that.showDrawer = true;
				that.$api("room.createRoomOption", {
					type: that.roomType
				}).then(res => {
					if (res.code == 1) {
						console.log(res)
						that.createRoomDate = res.data;
					}
				})
				that.$api("room.moreinfo", {
					room_id: that.roomDate.room_info.room_id
				}).then(res => {
					if (res.code == 1) {
						that.allUserList = [];
						that.allUserList = res.data;
					}
				})
			},
			//发送
			sendInput() {
				this.inputMessage = '';
				if (this.taskData == null) {
					this.inputMessage = '';
					this.$nextTick(() => {
						this.showInput = true;
					})
				} else {
					if (this.taskData.none_answer_id == this.userInfo.id) {
						uni.showToast({
							icon: "none",
							title: "暂时不能作答"
						})
					} else {
						this.showInput = true;
					}
				}
			},
			//答题倒计时
			taskBeginInterVal() {
				console.log(this.taskData)
				this.taskBeginTime = 30;
				clearInterval(this.taskBeginInter)
				this.taskBeginInter = setInterval(() => {
					this.taskBeginTime = --this.taskBeginTime;
					if (this.taskBeginTime <= 0) {
						clearInterval(this.taskBeginInter)
						this.submitFailTask()
					}
				}, 1000)
			},
			//任务失败
			submitFailTask() {
				var that = this;
				that.stage_list.forEach((val, index) => {
					if (val.user_id == this.userInfo.id) {
						that.$api("room.submitFailTask", {
							room_id: that.roomDate.room_info.room_id,
							task_id: that.taskData.fhl_task_id,
						}).then(res => {})
					}
				})
			},
			//使用锦囊
			useSilk() {
				var that = this;
				console.log(that.taskData)
				if (that.taskData == null) {
					uni.showToast({
						icon: "none",
						title: "暂未开始"
					})
					return;
				}
				that.$api("room.useSilk", {
					room_id: that.roomDate.room_info.room_id,
					task_id: that.taskData.fhl_task_id,
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.silkText = res.data.next_silk_price;
					} else if (res.code == 3001) {
						uni.showToast({
							icon: "none",
							title: res.msg,
							complete() {
								that.$refs.recharge.show()
							}
						})
					} else if (res.code == 2001) {
						uni.showToast({
							icon: "none",
							title: res.msg,
						})
					} else if (res.code == 2002) {
						uni.showToast({
							icon: "none",
							title: res.msg,
						})
					}
					console.log("使用锦囊")
				})
			},
			//上报
			reportClick() {
				var that = this;
				that.$api("room.submitTaskContent", {
					task_id: that.task_id,
					room_id: that.roomDate.room_info.room_id,
					content: that.inputMessage
				}).then(res => {
					that.inputMessage = "";
					that.showReport = false;
					that.task_id = "";
				})
			},
			//送礼物全选
			allGiftSelect() {
				this.allGiftSelectFlag = !this.allGiftSelectFlag;
			},
			//创建房间
			createRoom() {
				var that = this;
				var paremt = {};
				if (that.roomType == 'fhl') {
					paremt = {
						room_id: that.roomDate.room_info.room_id,
						room_name: that.createRoomName,
						public_type: that.createRoomDate.public_type[that.createRoomIndex].key
					}
				} else {
					paremt = {
						type: that.createRoomDate.type[that.createRoomTypeIndex].key,
						room_name: that.createRoomName,
						public_type: that.createRoomDate.public_type[that.createRoomIndex].key
					}
				}
				that.$api("room.createRoom", paremt).then(res => {
					that.showCreateRoom = false;
					if (res.code == 1) {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
						that.roomDate = null;
						that.stage_list = ["", ""];
						that.messageList = [];
						that.wait_list = ["", "", "", ""]
						that.giftList = [];
						that.flagMaiBtn = false;
						that.maiCurrentIndex = null;
						that.selectOrderData = null;
						that.readyFlag = true;
						that.createRoomDate = [];
						that.createRoomIndex = 0
						that.createRoomName = '';
						that.taskBeginFlag = false;
						that.taskData = null;
						that.selectOrderData = null;
						that.noReadyUser = null;
						that.noReadyTime = 120;
						that.taskBeginTime = 30;
						that.taskTextList = []
						clearInterval(that.noReadyInter)
						clearInterval(that.taskBeginInter)
						that.$nextTick(() => {
							that.init(res.data.room_info.room_id)
						})
					} else {
						that.createRoomName = '';
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				})
			},
			//打开麦
			openMai(user, index) {
				if (user != undefined) {
					if (user.user_id == this.userInfo.id) {
						if (user.mike_status == 0) {
							this.add(3, index)
							this.maiSocket(1)
							this.trtcCloud.startLocalAudio(TRTCAudioQuality.TRTCAudioQualityMusic);
						} else {
							this.add(4, index)
							this.trtcCloud.stopLocalAudio()
						}
					} else {
						console.log("不是您自己")
					}
				}
			},
			maiSocket(flag) {
				//flag:0=关,1=开
				var that = this;
				that.$api("room.roomTrtcStatusNotice", {
					room_id: that.roomDate.room_info.room_id,
					status: flag
				}).then(res => {
					console.log(res)
				})
			},
			//解散
			closeRoom() {
				var that = this;
				that.$api("room.closeRoom", {
					room_id: that.roomDate.room_info.room_id,
				}).then(res => {
					uni.showToast({
						icon: "none",
						title: res.msg
					})
				})
			},
			//踢人
			removeUser(item) {
				var that = this;
				that.$api("room.removeUser", {
					room_id: that.roomDate.room_info.room_id,
					user_id: item.user_id
				}).then(res => {})
			},
			// ----------------TRTC
			//初始化语音房
			initTRTC() {
				var that = this;
				if (uni.getSystemInfoSync().platform === 'android') {
					permision.requestAndroidPermission('android.permission.RECORD_AUDIO');
				}
				that.$api("room.getUserImSign").then(res => {
					if (res.code == 1) {
						that.userSig = res.data.gensig;
						that.sdkAppId = res.data.app_id;
						console.log('创建实例 ')
						that.trtcCloud = TrtcCloud.createInstance();
						that.handleEvents();
					}
				})
			},
			//加入房间
			addAudioRoom(userId, roomId) {
				const params = {
					sdkAppId: this.sdkAppId, // Please replace with your own sdkAppId
					userId: userId, // Please replace with your own userid
					roomId: roomId, // Please replace with your own room number 
					userSig: this.userSig, // Please replace with your own userSig
				};
				this.trtcCloud.enterRoom(params, TRTCAppScene.TRTCAppSceneAudioCall);
				this.trtcCloud.enableAudioVolumeEvaluation(300);
			},

			//关闭语音房
			closeTrtcCloud() {
				if (this.trtcCloud != null) {
					console.log("退出语音房")
					this.trtcCloud.exitRoom();
				}
				if (this.trtcCloud) {
					TrtcCloud.destroyInstance();
					this.trtcCloud = null;
					console.log("销毁实例")
				}
			},
			//聊天室监听状态事件
			handleEvents() {
				this.trtcCloud.on('onWarning', (res) => {
					console.log('- onWarning: ', JSON.stringify(res));
				});
				this.trtcCloud.on('onError', (res) => {
					console.log('- onError: ', JSON.stringify(res));
				});
				this.trtcCloud.on("onExitRoom", (result) => {
					console.log(`退出房间`)
				});
				this.trtcCloud.on("onEnterRoom", (result) => {
					console.log(`进房成功，耗时: ${result}ms`)
				});
				this.trtcCloud.on("onRemoteUserEnterRoom", (result) => {
					console.log("有人加入房间")
				});
				this.trtcCloud.on('onUserAudioAvailable', (res) => {
					console.log(res)
				});
				this.trtcCloud.on('onUserVoiceVolume', (res) => {
					res.userVolumes.forEach((item, index) => {
						if (item.userId == '') {
							res.userVolumes[index].userId = String(this.userInfo.id)
						}
					})
					this.waveData = res.userVolumes
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	.chatRoom {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		background: #000;
		position: relative;
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		overflow: hidden;

		.roomBody {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			padding: var(--status-bar-height) 30rpx 30rpx 30rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
		}
	}

	.giftContainer {
		height: 776rpx;
		background: #fff;
		display: flex;
		flex-direction: column;
		border-radius: 20rpx 20rpx;
		overflow: hidden;

		.giftBox {
			flex: 1;
			height: 0;
			padding: 35rpx 0rpx 35rpx 35rpx;
			box-sizing: border-box;
			position: relative;

			.giftFooter {
				height: 171rpx;
				background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
				position: fixed;
				left: 0;
				right: 0;
				bottom: 33rpx;
				display: flex;
				padding: 0rpx 35rpx;
				box-sizing: border-box;
				align-items: flex-end;
				justify-content: space-between;

				.giftNum {
					// padding: 10rpx 30rpx;
					// background: #FFEAC7;
					// border-radius: 50rpx;
					// text-align: center;
					color: #FFA000;
					font-size: 23rpx;
				}

				.sendGiftBtn {
					width: 140rpx;
					height: 66rpx;
					text-align: center;
					line-height: 66rpx;
					color: #fff;
					background: #FFA000;
					border-radius: 50rpx;
					font-size: 30rpx;
					font-weight: bold;
				}
			}

			.giftList {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				margin-top: 28rpx;
				padding-bottom: 200rpx;
				margin-right: 35rpx;

				.giftItem {
					width: calc(100% / 4);
					height: 223rpx;
					border-radius: 12rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					border: 1px solid transparent;
					box-sizing: border-box;
				}

				.giftItemActive {
					background: #FFEAC7;
					border: 1px solid #FFA000;
					box-sizing: border-box;
				}
			}

			.giftUserContainer {
				width: 50%;
				height: 151rpx;
				border-radius: 20rpx;
				border: 2px solid #B9B9B9;

				&:first-child {
					margin-right: 40rpx;
				}

				.giftUserBox {
					display: flex;
					align-items: center;
					padding: 0rpx 16rpx;
					box-sizing: border-box;

					.line {
						background: #FFA000;
						height: 15rpx;
						width: 100%;
						position: absolute;
						top: 50%;
						left: 0;
						margin-top: -7.5rpx;
					}
				}
			}

			.giftUserContainerActive {
				border: 2px solid #FFA000;
			}
		}
	}

	//分享
	.shareBox {
		padding: 80rpx 20rpx;
		background: #fff;
		border-radius: 20rpx 20rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
	}

	// 创建
	.createRoomContainer {
		width: 100vw;
		background: #fff;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		padding: 85rpx 25rpx;
		box-sizing: border-box;

		.createBtn {
			width: 490rpx;
			height: 85rpx;
			line-height: 85rpx;
			text-align: center;
			color: #fff;
			font-size: 36rpx;
			border-radius: 43rpx;
			background-image: url(@/static/iconImage/btnBg2.png);
			background-position: 100% 100%;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			margin: 0 auto;
			margin-top: 97rpx;
		}
	}

	// 抽屉
	.drawerContainer {
		width: 479rpx;
		height: 100vh;
		background: #000000;
		border-radius: 30rpx 0rpx 0rpx 30rpx;
		padding: var(--status-bar-height) 35rpx 35rpx 35rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;

		.invite {
			color: #fff;
			font-size: 22rpx;
			background: #212121;
			padding: 9rpx 13rpx;
			border-radius: 50rpx;

			.iconfont {
				margin-right: 10rpx;
			}
		}

		.drawerMenu {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			margin-top: 60rpx;

			.menuItem {
				width: 50%;
				display: flex;
				flex-direction: column;
				font-size: 32rpx;
				color: #fff;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				margin-bottom: 70rpx;
			}

			.iconMenu {
				width: 96rpx;
				height: 96rpx;
				background: #212121;
				border-radius: 50rpx;
				text-align: center;
				line-height: 96rpx;
				color: #E2E2E2;
			}
		}

		.drawerOperate {
			color: #BDBDBD;
			font-size: 28rpx;
			display: flex;
			align-items: center;

			.drawerOperateText {
				position: relative;

				.line {
					width: 100%;
					height: 10rpx;
					background: #FFA000;
					position: absolute;
					z-index: 0;
					top: 50%;
					left: 0%;
					transform: translateY(-50%);
				}
			}
		}

		.drawerScroll {
			flex: 1;
			height: 0;
			margin-top: 50rpx;

			.userItem {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 40rpx;
			}
		}
	}

	.tokenContainer {
		width: 682rpx;
		height: 1030rpx;
		background-image: url(@/static/iconImage/dunpai.png);
		background-position: 100% 100%;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		box-sizing: border-box;
		padding: 140rpx 40rpx 0rpx 40rpx;

		.tokenTitle {
			width: 316rpx;
			height: 15rpx;
			background-image: url(@/static/iconImage/jiantou.png);
			background-position: 100% 100%;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 auto;
			position: relative;

			.text {
				font-size: 36rpx;
				color: #FFA000;
				font-family: font-test !important;
			}

			.replace {
				padding: 8rpx;
				box-sizing: border-box;
				text-align: center;
				border: 1px solid #FFA000;
				background: #FFDCA1;
				border-radius: 50rpx;
				color: #333333;
				font-size: 22rpx;
				display: flex;
				align-items: center;
				position: absolute;
				right: -40%;
				top: -15rpx;
			}
		}

		.tokenTextList {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			justify-content: center;
			align-self: center;
			margin-top: 70rpx;
			width: 100%;

			.tokenTextItem {
				width: 150rpx;
				height: 85rpx;
				background: #FFDDA4;
				border-radius: 5rpx;
				opacity: 1;
				border: 1rpx solid #FFA000;
				text-align: center;
				line-height: 85rpx;
				font-size: 46rpx;
				color: #FFA000;
				margin: 20rpx;
				font-family: font-test !important;
			}
		}

		.tokenBens {
			margin-top: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0rpx 50rpx;

			.tokenBen {
				width: 190rpx;
				height: 85rpx;
				text-align: center;
				border: 1rpx solid #FFA000;
				text-align: center;
				line-height: 85rpx;
				font-size: 36rpx;
				color: #FFA000;
				border-radius: 50rpx;
				background: #FFDDA4;
			}
		}

		.resultBox {
			padding: 79rpx 150rpx 105rpx 150rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;

			.resultText {
				font-size: 56rpx;
				font-weight: 400;
				color: #FFA000;
				font-family: font-test !important;
			}
		}

		.PKBox {
			display: flex;
			align-items: center;
			justify-content: center;

			.PKContent {
				background-position: 100% 100%;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				width: 239rpx;
				height: 58rpx;
				padding: 0 30rpx;
				line-height: 58rpx;
				box-sizing: border-box;
				text-align: center;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;

				&:nth-child(1) {
					background-image: url(@/static/iconImage/leftBg.png);
				}

				&:last-child {
					background-image: url(@/static/iconImage/rightBg.png);
				}
			}

			.pkText {
				color: #FFA000;
				font-size: 60rpx;
				margin: 0rpx 10rpx;
				font-family: font-test !important;
			}
		}

		.record {
			margin-top: 110rpx;
			display: flex;
			align-items: center;
			padding: 0rpx 30rpx;
			justify-content: space-between;
			font-size: 23rpx;
			color: #333;
			font-weight: bold;
		}
	}

	.roomHead {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 30rpx;

		.headLeft {
			padding: 0rpx 32rpx;
			box-sizing: border-box;
			height: 65rpx;
			border-radius: 50rpx;
			background: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
	}

	.reportBgBox {
		width: 526rpx;
		height: 315rpx;
		background-image: url(@/static/iconImage/bgimg.png);
		background-position: 100% 100%;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		padding: 95rpx 30rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		color: #FFA000;
		line-height: 40rpx;
	}

	.reportBtn {
		width: 190rpx;
		height: 85rpx;
		background: #FFDDA4;
		border-radius: 48px 48px 48px 48px;
		opacity: 1;
		border: 1px solid #FFA000;
		line-height: 85rpx;
		text-align: center;
		font-size: 36rpx;
		font-weight: bold;
		color: #FFA000;
	}

	.stageContainer {
		height: 360rpx;
		margin-top: 1.3rem;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		opacity: 1;
		border: 1rpx solid;
		border-image: linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)) 1 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0rpx 16rpx 0rpx 16rpx;
		box-sizing: border-box;
		position: relative;

		.markContainer {
			position: absolute;
			top: 10rpx;
			left: 16rpx;
			right: 16rpx;

			.okNums {
				width: 40rpx;
				height: 10rpx;
				margin-top: 19rpx;
				font-size: 22rpx;
				color: #333;
				align-items: center;
				display: flex;
				padding: 0rpx 5rpx;
				box-sizing: border-box;
				justify-content: space-between;
			}

			.markBox {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.markStatus {
				width: 89rpx;
				height: 43rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background: rgba(255, 255, 255, 0.2);
				border-radius: 20rpx;
				font-size: 23rpx;
				color: #FF9429;
				font-weight: 500;
			}
		}

		.stageCenter {
			flex: 1;
			position: relative;

			.shanziBox {
				position: relative;
				text-align: center;
				position: absolute;
				top: -35%;
				left: 50%;
				transform: translate(-50%, -50%);
			}

			.stageCenterTextBox {
				height: 210rpx;
				display: flex;
				flex-direction: column;
				padding: 0rpx 10rpx;
				box-sizing: border-box;

				.stageCenterUserOne {
					padding: 5rpx 22rpx;
					box-sizing: border-box;
					width: 100%;
					font-size: 32rpx;
					color: #FFA000;
					font-family: font-test !important;
					border-radius: 2rpx 20rpx 20rpx 20rpx;
					border: 1rpx solid #FFA000;
					background: #FFF7E9;
					text-align: left;
					margin-top: 40rpx;
				}

				.stageCenterUserTwo {
					padding: 5rpx 22rpx;
					box-sizing: border-box;
					width: 100%;
					font-size: 32rpx;
					color: #FFA000;
					font-family: font-test !important;
					border-radius: 20rpx 2rpx 20rpx 20rpx;
					border: 1rpx solid #FFA000;
					background: #FFF7E9;
					text-align: left;
					margin-top: 32rpx;
				}
			}
		}


		.stageText {
			font-family: font-test !important;
			font-size: 60rpx;
			color: #fff;
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-70%);
			text-align: center;
			z-index: 5;
			width: 100%;
		}

		.stageStatus {
			width: 96rpx;
			color: #666;
			font-size: 26rpx;
			border-radius: 50rpx;
			background: #fff;
			text-align: center;
			padding: 6rpx 0rpx;
			margin-top: 15rpx;
		}

		.stageBox {
			display: flex;
			align-items: center;
			margin-top: 25rpx;

			.positionNumBox {
				width: 36rpx;
				height: 95rpx;
				background: #fff;
				border-radius: 50rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				color: #333;
				font-size: 28rpx;
			}

			.positionBox {
				width: 125rpx;
				display: flex;
				flex-direction: column;
				align-items: center;

				.empty {
					padding: 6rpx 8rpx;
					background: #fff;
					box-sizing: border-box;
					font-size: 23rpx;
					color: #666;
					border-radius: 50rpx;
					margin-top: 20rpx;
				}

				.userName {
					height: 50rpx;
					font-size: 22rpx;
					color: #333;
					width: 135rpx;
					text-align: center;
					margin-top: 10rpx;
					position: relative;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					display: flex;
					align-items: center;
					justify-content: center;


					.line {
						height: 21rpx;
						width: 100%;
						background: #FFA000;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
						z-index: 0;
					}
				}
			}
		}
	}

	.contentContainer {
		flex: 1;
		height: 0;
		margin-top: 1.5rem;
		display: flex;
		justify-content: space-between;
		padding-bottom: 72+50rpx;

		.contentLeft {
			flex: 1;
			margin-right: 22rpx;

			.chatContainer {
				height: 100%;
				overflow: hidden;
				display: flex;
				flex-direction: column;

				&::-webkit-scrollbar {
					display: block;
					width: 0 !important;
					height: 0 !important;
					-webkit-appearance: auto !important;
					background: transparent;
					overflow: auto !important;
				}

				.systemMessage {
					font-size: 22rpx;
					margin-bottom: 50rpx;
					background: rgba(0, 0, 0, 0.18);
					border-radius: 50rpx 50rpx;
					padding: 6px 10rpx;
					box-sizing: border-box;
				}

				.giftMessage {
					height: 50rpx;
					font-size: 22rpx;
					color: #FFDDA4;
					margin-bottom: 50rpx;
					background: rgba(0, 0, 0, 0.18);
					border-radius: 50rpx 50rpx;
					padding: 6px 10rpx 6rpx 10rpx;
					box-sizing: border-box;

					.giftImgs {
						width: 100rpx;
						height: 100rpx;
					}
				}
			}

			.chatContent {
				display: flex;
				margin-bottom: 16rpx;

				.userImg {
					width: 52rpx;
					height: 52rpx;
					overflow: hidden;
					border-radius: 50%;
					margin-right: 15rpx;
				}

				.userName {
					font-size: 23rpx;
					color: #333;
					margin-bottom: 15rpx;
				}

				.chatMessageBox {
					background: rgba(0, 0, 0, 0.18);
					padding: 11rpx 45rpx;
					border-radius: 0rpx 50rpx 50rpx 50rpx;
					box-sizing: border-box;
					font-size: 23rpx;
					color: #fff;
				}
			}

		}


		.contentRight {
			display: flex;
			flex-direction: column;
			align-items: end;

			.maiUser {
				display: flex;
				align-items: center;
				margin-bottom: 0.5rem;

				.positionNumBox {
					width: 50rpx;
					height: 4.5rem;
					border-radius: 50rpx;
					background: #FFA000;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					color: #fff;
					margin-left: 20rpx;
				}
			}
		}
	}

	.bottomBar {
		position: absolute;
		left: 30rpx;
		right: 30rpx;
		bottom: 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.bottomInput {
			flex: 1;
			margin-right: 20rpx;
			background: rgba(255, 255, 255, 0.8);
			border-radius: 50rpx;
			display: flex;
			align-items: center;
			padding: 10rpx 30rpx;
			box-sizing: border-box;
			height: 70rpx;
		}

		.bottomBarIcon {
			width: 72rpx;
			height: 72rpx;
			text-align: center;
			margin-right: 20rpx;
		}

		.maiBtn {
			height: 62rpx;
			padding: 0rpx 20rpx;
			box-sizing: border-box;
			border-radius: 50rpx;
			background: #FFA000;
			color: #fff;
			text-align: center;
			line-height: 62rpx;
		}
	}


	.inputContainer {
		position: absolute;
		left: 0;
		bottom: 0;
		background: #F2F2F2;
		z-index: 20;
		border-radius: 20rpx 20rpx 0rpx 0rpx;

		.inputBox {
			width: 100vw;
			padding: 21rpx 15rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.textAreaBox {
				background: #fff;
				border-radius: 50rpx;
				min-height: 70rpx;
				max-height: 200rpx;
				padding: 15rpx 30rpx;
				box-sizing: border-box;
				overflow: hidden;
				display: flex;
				margin-right: 20rpx;
			}

			.myTextArea {
				flex: 1;
			}

			.inputBtn {
				background: #FFA000;
				border-radius: 50rpx;
				text-align: center;
				line-height: 62rpx;
				width: 125rpx;
				height: 62rpx;
				color: #fff;
				font-size: 30rpx;
			}
		}
	}

	.log {
		width: 578rpx;
		height: 525rpx;
		border-radius: 16rpx;
		padding: 50rpx 27rpx 62rpx 37rpx;
		background: #fff;
		box-sizing: border-box;
	}
</style>