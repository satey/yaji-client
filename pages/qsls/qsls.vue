<template>
	<view class="qsls">
		<feiauthority ref="authority" @imageEmpower='imageEmpower' @audioEmpower="audioEmpower"></feiauthority>
		<view class="roomHead">
			<view style="height: var(--status-bar-height);"></view>
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<view class="headLeft">
					<text v-if="roomData!=null"
						style="color: #333333;font-size: 26rpx;">{{roomData.room_info.room_name}}</text>
					<text v-if="roomData!=null"
						style="color: #666666;font-size: 23rpx;">ID{{roomData.room_info.room_id}}</text>
				</view>
				<i class="iconfont icon-gengduo1" @click="openDrawer" style="font-size: 46rpx;color: #fff;"></i>
			</view>
		</view>
		<!-- 道具 -->
		<u-popup :show="popsShow" @close="popsShow = false" mode="center" :closeable="false" :round="20">
			<view class="popupContainer">
				<view style="display: flex;align-items: center;justify-content: center;">
					<view class="title">
						<text style="position: relative;z-index: 5;">使用道具</text>
						<view class="line"></view>
					</view>
				</view>
				<view class="subTitle"></view>
				<view class="prop">
					<block v-for="(item,index) in popsList" :key="index">
						<view style="display: flex;align-items: center;margin-bottom: 63rpx;"
							:style="{border:popsIndex==index?'1px solid #FFA000':'1px solid transparent'}"
							@click="popsIndex=index">
							<image style="width: 110rpx;height: 118rpx;margin-right: 25rpx;"
								src="@/static/iconImage/dangTian.png" mode="aspectFill"></image>
							<view style="flex: 1;">
								<view style="display: flex;align-items: center;justify-content: space-between;">
									<view>{{item.title}}</view>
									<view style="display: flex;align-items: center;">
										<image style="width: 25rpx;height: 25rpx;margin-right: 5rpx;"
											src="../../static/qian.png" mode=""></image>
										<text style="color: #333;font-size: 20rpx;">x{{item.price}}</text>
									</view>
								</view>
								<view style="color:#666666 ;font-size:26rpx ;margin-top: 10rpx;">
									{{item.introduction}}
								</view>
							</view>
						</view>
					</block>
					<view
						style="display: flex;align-items: center;justify-content: space-between;padding: 0rpx 110rpx;box-sizing: border-box;">
						<view @click="popsShow = false;" class="hitBtn"
							style="background: #FFDDA4;color: #FFA000;margin-right: 25rpx;">取消
						</view>
						<view class="hitBtn" @click="useProp"
							style="background: #FFA000;color: #fff;margin-left: 25rpx;">使用
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 抽屉 -->
		<u-popup :show="drawerShow" @close="drawerShow = false" mode="right" :closeable="false" :round="20">
			<view class="drawerContainer">
				<view style="height: 30rpx;"></view>
				<block v-for="(item,index) in allUserList.prop_list" :key="index">
					<view style="font-size: 22rpx;color: #fff;">
						<text>{{item.title}}</text>
						<text style="margin:0 10rpx;">生效中</text>
						<text style="color: #FFA000;">{{item.used_str.slice(4,item.used_str.length)}}</text>
					</view>
				</block>

				<view class="drawerMenu">
					<view class="menuItem" @click="openProp">
						<view class="iconMenu">
							<i class="iconfont icon-ICON-38" style="font-size: 50rpx;color: #E2E2E2;"></i>
						</view>
						<text style="margin-top: 15rpx;">使用道具</text>
					</view>
					<view class="menuItem" @click="exitRoom">
						<view class="iconMenu">
							<i class="iconfont icon-tuichu" style="font-size: 50rpx;color: #E2E2E2;"></i>
						</view>
						<text style="margin-top: 15rpx;">退出房间</text>
					</view>
				</view>
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<view style="color: #fff;font-size: 32rpx;">在线用户（{{allUserList.user_count}}人）</view>
					<view class="drawerOperate">
						<!-- <view class="drawerOperateText" v-if="roomData!=null&&roomData.permission.remove_user!=0"
										@click="drawerTabIndex=1" :style="{color:drawerTabIndex==1?'#fff':'#BDBDBD'}"
										style="margin-right: 10rpx;">
										<text style="z-index: 2;position: relative;">踢人</text>
										<view class="line" v-if="drawerTabIndex==1"></view>
									</view> -->
						<view class="drawerOperateText" @click="drawerTabIndex=2"
							:style="{color:drawerTabIndex==2?'#fff':'#BDBDBD'}" style="margin-left: 10rpx;">
							<text style="z-index: 2;position: relative;">举报</text>
							<view class="line" v-if="drawerTabIndex==2"></view>
						</view>
					</view>
				</view>
				<scroll-view scroll-y="true" class="drawerScroll">
					<block v-for="(item,index) in allUserList.user_list" :key="index">
						<view class="userItem">
							<view style="display: flex;align-items: center;" @click="openUserBox3(item)">
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
								<!-- 	<text v-if="drawerTabIndex==1 && item.user_id!=userInfo.id"
									@click="removeUser(item)">踢人</text> -->
								<text v-if="drawerTabIndex==2 && item.user_id!=userInfo.id"
									@click="$u.route('/pages/public/report',{user_id:item.user_id,type:'曲水流觞',selectId:roomData.room_info.room_id})">举报</text>
							</view>
						</view>
					</block>
				</scroll-view>
			</view>
		</u-popup>
		<view class="qslsBg">
			<feiQsls v-if="roomData!=null" :roomId='roomData.room_info.room_id' :qslsUserList="allStageUser" ref="qsls">
			</feiQsls>
			<view class="headContainerFooter">
				<!-- 人不够3人 -->

				<block v-if="allStageUser.length <3&& taskData.type==undefined">
					<view style="display: flex;align-items: center;justify-content: center;height: 100%;">
						<text class="ri-cup-fill" style="font-size: 50rpx;color: #FFA000;margin-right: 15rpx;"></text>
						<text style="color:#FFA000;font-size: 32rpx;font-weight: bold;">房间满3人后发杯</text>
					</view>
				</block>
				<!-- 发杯 -->
				<block v-if="allStageUser.length>=3">
					<block v-if="taskData.type==undefined">
						<view @click="yuHairCup"
							style="display: flex;align-items: center;justify-content: center;height: 100%;">
							<view class="fabei">
								发杯
							</view>
						</view>
					</block>
				</block>
				<block v-if="ori_user_info.user_id!=undefined||taskData.type =='cup_task_run'">
					<view style="display: flex;align-items: center;justify-content: center;height: 100%;">
						<view class="refuse" v-if="taskData.last_event.remark ==undefined">
							<block>
								<text
									style="color: #FFA000;">{{ori_user_info.role_realname}}·{{ori_user_info.role_dynasty}}</text>
								发杯了 杯子继续顺溪而流
							</block>

						</view>
						<view v-else>
							<block>
								<text
									style="color: #FFA000;">{{taskData.last_event.user_info.role_realname}}·{{taskData.last_event.user_info.role_dynasty}}</text>
								{{taskData.last_event.remark}}
							</block>
						</view>
					</view>
				</block>
				<!-- 拒绝了任务 -->
				<block v-if="refuseData.length!=0&&taskData.type =='cup_task_refuse'">
					<view style="display: flex;align-items: center;justify-content: center;height: 100%;">
						<view class="refuse">
							<text
								style="color: #FFA000;">{{taskData.user_info.role_realname}}·{{taskData.user_info.role_dynasty}}</text>
							拒绝了任务 杯子继续顺溪而流
						</view>
					</view>
				</block>
				<!-- 挡杯卡 -->
				<block v-if="taskData.type =='cup_task_skip'">
					<view style="display: flex;align-items: center;justify-content: center;height: 100%;">
						<view class="refuse">
							<text
								style="color: #FFA000;">{{taskData.user_info.role_realname}}·{{taskData.user_info.role_dynasty}}</text>
							使用了挡杯卡 杯子继续顺溪而流
						</view>
					</view>
				</block>
				<!-- 命中 -->
				<block v-if="taskData.type!=undefined&&taskData.type=='cup_task_hit'||taskData.type=='cup_task_accept'">
					<view class="hit">
						<view style="flex: 1;">
							<view style="color: #333;font-size: 26rpx;">
								{{taskData.ori_user_info.role_realname}}·{{taskData.ori_user_info.role_dynasty}}将杯子放入小溪中，
								杯子顺溪而流，命中了：
							</view>
							<view style="display: flex;align-items: center;margin-top: 10rpx;">
								<image :src="taskData.user_info.avatar"
									style="width: 58rpx;height: 58rpx;margin-right: 22rpx;border-radius: 50%;"
									mode="aspectFill">
								</image>
								<view style="color: #333;font-size: 26rpx;">
									{{taskData.user_info.role_realname}}·{{taskData.user_info.role_dynasty}}
								</view>
								<i class="iconfont icon-nan"
									style="font-size: 26rpx;color: #00C2FF;margin-left: 5rpx ;"></i>
								<image :src="taskData.user_info.mw_img"
									style="width: 26rpx;height: 26rpx;margin-left: 15rpx ;margin-right: 10rpx;"
									mode="aspectFill">
								</image>
								<text style="color: #000;font-size: 26rpx;">{{taskData.user_info.total_mw}}</text>
								<!-- <i class="iconfont icon-nv" style="font-size: 22rpx;color: #FFA000;"></i> -->
							</view>
						</view>
						<view style="color: #FFA000;font-size: 26rpx;">
							<block v-if="taskData.type=='cup_task_hit'">
								等待接收任务
							</block>
							<block v-if="taskData.type=='cup_task_accept'">
								正在完成任务
							</block>
						</view>
					</view>
				</block>
				<!-- 完成 -->
				<block v-if="taskCompleteData.length!=0 && taskData.type=='cup_task_complete'">
					<view class="complete">
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<view style="color: #333;font-size: 23rpx;">
								<text
									style="color: #FFA000;">{{taskCompleteData.user_info.role_realname}}·{{taskCompleteData.user_info.role_dynasty}}</text>
								完成任务，{{taskCompleteData.task_info.type_str}}：
							</view>
							<view class="time">
								<i class="iconfontcolor icon-shaloudaojishi"></i>
								<text style="margin-left: 5rpx;">{{taskCompleteTime}}s</text>
							</view>
						</view>
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<view class="taskAudioLine" @click="completeAudio">
								<text
									style="font-size: 23rpx;margin-right: 10rpx;">{{taskCompleteData.task_info.duration_time}}''</text>
								<block v-if="taskCompleteData.isPlay==false">
									<view class="ri-voiceprint-line" style="color: #fff;font-size: 39rpx;"
										v-for="(item,index) in 2" :key="index">
									</view>
								</block>
								<block v-else>
									<image src="../../static/bofang.gif" style="width: 90rpx;height: 25rpx;">
									</image>
								</block>
							</view>
							<view style="display: flex;align-items: center;">
								<view style="text-align: center;margin-right: 10rpx;" @click="zan"
									v-if="taskCompleteData.is_cai!=1">
									<i class="iconfont  icon-31dianzan" v-if="taskCompleteData.is_zan==0"
										style="font-size: 45rpx;color: #231F20;"></i>
									<i class="iconfont  icon-dianzan_kuai" v-else
										style="font-size: 45rpx;color: #FFA000;"></i>
									<view style="color: #333333;font-size: 22rpx;">名望+1</view>
								</view>
								<view style="margin-right:10rpx;text-align: center;" @click="cai"
									v-if="taskCompleteData.is_zan!=1">
									<i class="iconfont  icon-cai" v-if="taskCompleteData.is_cai==0"
										style="font-size: 45rpx;color: #231F20;"></i>
									<i class="iconfontcolor  icon-cai1" v-else style="font-size: 45rpx;"></i>
									<view style="color: #333333;font-size: 22rpx;">名望-1</view>
								</view>
								<view style="text-align: center;">
									<i class="iconfont  icon-31dianzan" v-if="false"
										style="font-size: 45rpx;color: #231F20;"></i>
									<i class="iconfont  icon-liwu2" @click="openUserBox2" style="font-size: 45rpx;"></i>
									<view style="color: #333333;font-size: 22rpx;">送礼物</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>

		<!-- 聊天 -->
		<view class="qslsChat">
			<!-- <view class="systemMsg">系统：当前为自由模式，任何人均可发杯。</view> -->
			<scroll-view scroll-y="true" class="chatContainer" :scroll-into-view="scrollInto"
				:scroll-with-animation="true" :show-scrollbar="false">
				<view v-for="(item,index) in messageList" :key="index">
					<!-- 别人 -->
					<block v-if="item.message.type=='text'">
						<view class="mesageItem" v-if="item.from_user_info.user_id !=userInfo.id">
							<image :src="item.from_user_info.avatar" @click="openUserBox(item)"
								style="width: 52rpx;height: 52rpx;border-radius: 50%;margin-right: 16rpx;"
								mode="aspectFill">
							</image>
							<view>
								<view style="font-size: 26rpx;color: #333;margin-bottom: 10rpx;">
									{{item.from_user_info.role_realname}}·{{item.from_user_info.role_dynasty}}
								</view>
								<view class="messageTextBox" style="color: #323232;background: #fff;">
									{{item.message.content}}
								</view>
							</view>

						</view>
						<!-- 自己 -->
						<view class="mesageItem" v-if="item.from_user_info.user_id ==userInfo.id">
							<image :src="item.from_user_info.avatar"
								style="width: 52rpx;height: 52rpx;border-radius: 50%;margin-right: 16rpx;"
								mode="aspectFill">
							</image>
							<view>
								<view style="font-size: 26rpx;color: #333;margin-bottom: 10rpx;">
									{{item.from_user_info.role_realname}}·{{item.from_user_info.role_dynasty}}
								</view>
								<view class="messageTextBox" style="color: #fff;">{{item.message.content}}</view>
							</view>
						</view>
					</block>
					<view class="mesageItem" v-if="item.message.type=='image'">
						<image :src="item.from_user_info.avatar" @click="openUserBox(item)"
							style="width: 52rpx;height: 52rpx;border-radius: 50%;margin-right: 16rpx;"
							mode="aspectFill">
						</image>
						<view>
							<view style="font-size: 26rpx;color: #333;margin-bottom: 10rpx;">
								{{item.from_user_info.role_realname}}·{{item.from_user_info.role_dynasty}}
							</view>
							<u-album :urls="item.message.content.split(',')" multipleSize="300" @imgLoad="imgLoad"
								rowCount="1"></u-album>
						</view>
					</view>
					<view style="display: flex;align-items: center;" v-if="item.message.type=='entry_room'">
						<view class="giftMessage" style="display: flex;align-items: center;padding: 0rpx 15rpx;">
							<text>*{{item.user_info.role_realname}}·{{item.user_info.role_dynasty}}进入房间</text>
						</view>
					</view>
					<view style="display: flex;align-items: center;" v-if="item.message.type=='gift'">
						<view class="giftMessage" style="display: flex;align-items: center;">
							<text>*{{item.from_user_info.role_realname}}·{{item.from_user_info.role_dynasty}}给{{item.to_user_info.role_realname}}·{{item.to_user_info.role_dynasty}}送出一朵</text>
							<image :src="item.message.gift_image" class="giftImgs" mode="aspectFill"></image>
						</view>
					</view>
					<view class="mesageItem" style="" v-if="item.message.type === 'audio'">
						<image :src="item.from_user_info.avatar" @click="openUserBox(item)"
							style="width: 52rpx;height: 52rpx;border-radius: 50%;margin-right: 16rpx;"
							mode="aspectFill">
						</image>
						<view>
							<view style="font-size: 26rpx;color: #333;margin-bottom: 10rpx;">
								{{item.from_user_info.role_realname}}·{{item.from_user_info.role_dynasty}}
							</view>
							<view class="flex items-center justify-center w-32 bg-gradient-to-r to-rose-400"
								@click="handlePlayAudio(item,index)"
								style="background: #FFA000;border-radius: 20rpx;height: 65rpx;">
								<block v-if="item.message.isPlay==false">
									<view class="ri-voiceprint-line" style="color: #fff;font-size: 39rpx;"
										v-for="(item,index) in 2" :key="index">
									</view>
								</block>
								<block v-else>
									<image src="../../static/bofang.gif" style="width: 100rpx;height: 35rpx;">
									</image>
								</block>
							</view>
						</view>
					</view>
				</view>
				<view id="scrollBottom"></view>
			</scroll-view>
		</view>
		<!-- 底部 -->
		<view style="position: fixed;width: 100vw;left: 0;bottom: 0;z-index: 5;">
			<view class="footer">
				<view class="flex items-center" @click="handleVoice">
					<image src="@/static/laba.png" style="width: 49rpx;height: 49rpx;margin-right: 30rpx;" mode="">
					</image>
				</view>
				<view class="flex items-center" @click="handleImage2">
					<image src="@/static/tupian.png" style="width: 44rpx;height: 44rpx;margin-right: 25rpx" mode="">
					</image>
				</view>
				<view class="bottomInput" @click="showInput = true;showRecord = false">
					<text style="color: #FFA000;white-space: nowrap;font-size: 28rpx;"></text>
				</view>
			</view>
			<!-- 语音 -->
			<view class="flex flex-col items-center bg-gray-100 p-4 h-60 overflow-y-scroll" v-if="showRecord">
				<view class="text-xs leading-none text-gray-500">{{ recordTip }}</view>
				<view class="flex justify-center items-center mt-16" @touchstart="handleRecordStart('audio')"
					@touchmove.stop.prevent="handleRecordDoing" @touchend="handleRecordStop">
					<view class="relative flex justify-center items-center rounded-full">
						<view class="flex justify-center items-center rounded-full w-20 h-20  z-10"
							style="background: #FFA000 !important;">
							<i class="ri-mic-fill text-4xl leading-none text-white"></i>
						</view>
						<view v-if="recording" class="animate-ping absolute rounded-full p-2 bg-fuchsia-200 opacity-50"
							style="background: #FFA000 !important;">
							<view class="rounded-full w-20 h-20 p-2 opacity-50">
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 发布 -->
		<u-popup :show="showPopup" @close="hidePopup" :closeOnClickOverlay="false" mode="center" :closeable="true"
			:round="20">
			<view class="popupContainer">
				<!-- 选择任务 -->
				<view style="display: flex;align-items: center;justify-content: center;">
					<view class="title">
						<text style="position: relative;z-index: 5;">指定任务</text>
						<view class="line"></view>
					</view>
				</view>
				<view class="subTitle">请指定被命中者需要完成的任务类型：</view>
				<view class="selsectTask">
					<view>
						<block v-for="(item,index) in yuTaskData.cup_task_type" :key="index">
							<view class="selsectTaskItem" @click="taskSelectIndex=index">
								<image v-if="taskSelectIndex == index" src="../../static/iconImage/dian.png"
									style="width: 26rpx;height: 26rpx;margin-right: 15rpx;" mode=""></image>
								<view v-else
									style="width: 26rpx;height: 26rpx;margin-right: 15rpx;background: #D9D9D9;border-radius: 50%;">
								</view>
								<view :style="{color:taskSelectIndex == index?'#FFA000':''}">{{item.value}}
								</view>
							</view>
						</block>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<view class="releaseType" @click="releaseTypeIndex = 0"
							:class="releaseTypeIndex==0?'releaseTypeActive':''">
							<view style="margin-bottom: 5rpx;">使用发杯卡</view>
							<view style="display: flex;align-items: center;">
								<image src="@/static/iconImage/fabeika.png" style="width: 38rpx;height: 38rpx;" mode="">
								</image>
								<text>x{{yuTaskData.cup_task_prop_num}}</text>
							</view>
						</view>
						<view class="releaseType" @click="releaseTypeIndex = 1"
							:class="releaseTypeIndex==1?'releaseTypeActive':''">
							<view style="margin-bottom: 5rpx;">使用铜钱×{{yuTaskData.cup_task_price}}</view>
							<view style="display: flex;align-items: center;">
								<image src="@/static/qian.png" style="width: 30rpx;height: 30rpx;margin-right: 5rpx;"
									mode="">
								</image>
								<text>余额{{yuTaskData.wallet_balance}}</text>
							</view>
						</view>
					</view>
					<view class="releaseBtn" @click="HairCup">选好了，发杯</view>
				</view>
			</view>
		</u-popup>
		<!-- 命中弹框 -->
		<u-popup :show="hitShow" @close="hitShow" :closeOnClickOverlay="false" mode="center" :closeable="false"
			:round="20">
			<view class="popupContainer">
				<block v-if="taskData.type!=undefined||taskData.type=='cup_task_accept'">
					<view
						style="background: rgba(255, 255, 255, 0.5);border-radius: 50rpx;padding: 8rpx 12rpx;box-sizing: border-box;position: absolute;right: 20rpx;top: 20rpx;z-index: 2;">
						<i class="iconfontcolor icon-shaloudaojishi" style="font-size: 25rpx;margin-right: 5rpx;"></i>
						<text style="color: #FF9429;font-size: 25rpx;">{{taskTime}}S</text>
					</view>
					<view style="display: flex;align-items: center;justify-content: center;">
						<view class="title">
							<text style="position: relative;z-index: 5;">{{taskData.task_info.type_str}}</text>
							<view class="line"></view>
						</view>
					</view>
					<view class="subTitle">请完成任务，完成后可能会收到点赞和礼物哦~</view>
					<!-- 文案任务 -->
					<block v-if="taskData.task_info.type==4">
						<view class="taskCenter2">
							<view
								style="color:#000000 ;font-size:23rpx ;margin-top: 60rpx;padding: 0rpx 32rpx;box-sizing: border-box;text-align: center;">
								{{taskData.task_info.content}}
							</view>
							<view style="padding: 0rpx 82rpx;box-sizing: border-box;">
								<view style="display: flex;align-items: center;"
									:style="{opacity:taskContent.audioUrl==''?'0':'1'}">
									<view class="taskAudioLine" @click="handlePlayAudioTwo">
										<text
											style="font-size: 23rpx;margin-right: 10rpx;">{{taskContent.duration_time}}''</text>
										<block v-if="taskContent.isPlay==false">
											<view class="ri-voiceprint-line" style="color: #fff;font-size: 39rpx;"
												v-for="(item,index) in 2" :key="index">
											</view>
										</block>
										<block v-else>
											<image src="../../static/bofang.gif" style="width: 90rpx;height: 25rpx;">
											</image>
										</block>
									</view>
									<text class="ri-close-line" @click="clearTaskAudio"
										style="padding: 0rpx;background: rgba(0,0,0,0.5);color: #fff;font-size: 30rpx;border-radius: 50%;box-sizing: border-box;width: 35rpx;height: 35rpx;text-align: center;line-height: 35rpx;">
									</text>
								</view>

								<view class="flex justify-center items-center" style="margin-top: 30rpx;"
									@touchstart="handleRecordStart('task')" @touchmove.stop.prevent="handleRecordDoing"
									@touchend="handleRecordStop">
									<view class="relative flex justify-center items-center rounded-full">
										<view class="flex justify-center items-center rounded-full w-20 h-20  z-10"
											style="background: #FFA000 !important;">
											<i class="ri-mic-fill text-4xl leading-none text-white"></i>
										</view>
										<view v-if="recording"
											class="animate-ping absolute rounded-full p-2 bg-fuchsia-200 opacity-50"
											style="background: #FFA000 !important;">
											<view class="rounded-full w-20 h-20 p-2 opacity-50">
											</view>
										</view>
									</view>
								</view>
								<view style="text-align: center;color: #333;font-size: 28rpx;margin-top: 25rpx;">
									长按录音
								</view>
								<view class="releaseBtn" @click="completeCupTask">发送</view>
							</view>
						</view>
					</block>
					<!-- 任务 -->
					<block v-else>
						<view class="taskCenter">
							<view style="display: flex;align-items: center;"
								:style="{opacity:taskContent.audioUrl==''?'0':'1'}">
								<view class="taskAudioLine" @click="handlePlayAudioTwo">
									<text
										style="font-size: 23rpx;margin-right: 10rpx;">{{taskContent.duration_time}}''</text>
									<block v-if="taskContent.isPlay==false">
										<view class="ri-voiceprint-line" style="color: #fff;font-size: 39rpx;"
											v-for="(item,index) in 2" :key="index">
										</view>
									</block>
									<block v-else>
										<image src="../../static/bofang.gif" style="width: 90rpx;height: 25rpx;">
										</image>
									</block>
								</view>
								<text class="ri-close-line" @click="clearTaskAudio"
									style="padding: 0rpx;background: rgba(0,0,0,0.5);color: #fff;font-size: 30rpx;border-radius: 50%;box-sizing: border-box;width: 35rpx;height: 35rpx;text-align: center;line-height: 35rpx;">
								</text>
							</view>
							<view class="flex justify-center items-center" style="margin-top: 75rpx;"
								@touchstart="handleRecordStart('task')" @touchmove.stop.prevent="handleRecordDoing"
								@touchend="handleRecordStop">
								<view class="relative flex justify-center items-center rounded-full">
									<view @click=""
										class="flex justify-center items-center rounded-full w-20 h-20  z-10"
										style="background: #FFA000 !important;">
										<i class="ri-mic-fill text-4xl leading-none text-white"></i>
									</view>
									<view v-if="recording"
										class="animate-ping absolute rounded-full p-2 bg-fuchsia-200 opacity-50"
										style="background: #FFA000 !important;">
										<view class="rounded-full w-20 h-20 p-2 opacity-50">
										</view>
									</view>
								</view>
							</view>
							<view style="text-align: center;color: #333;font-size: 28rpx;margin-top: 25rpx;">
								{{recordTip}}
							</view>
							<view class="releaseBtn" @click="completeCupTask">发送</view>
						</view>
					</block>
				</block>
			</view>
		</u-popup>
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
		<!-- 礼物动画 -->
		<view v-show="showSvga" id="svgaPlayer"
			style="z-index: 99999;box-sizing: border-box;position: fixed;top:0;left: 0;width: 100%;height: 100%;">
			<l-svga ref="svgaPlayer" style="width: 100%;height: 100%;box-sizing: border-box;"></l-svga>
		</view>
		<!-- 充值弹窗 -->
		<recharge ref="recharge"></recharge>
		<userContainer ref="userContainer"></userContainer>
		<!-- 命中 -->
		<feiqslsHit></feiqslsHit>
	</view>
</template>

<script>
	import recharge from "@/components/fei-recharge/fei-recharge.vue"
	import feiQsls from "@/components/fei-qsls/fei-qsls.vue"
	import permision from "@/js_sdk/wa-permission/permission.js"
	import userContainer from "@/components/fei-userContainer/fei-userContainer.vue"
	export default {
		components: {
			feiQsls,
			userContainer,
			recharge
		},
		data() {
			return {
				hitShow: false,
				popsShow: false,
				popsList: [],
				popsIndex: 0,
				qslsUserList: [],
				showSvga: false,
				scrollInto: '',
				inputMessage: '',
				showRecord: false,
				showInput: false,
				popupTitle: "",
				popupSubTitle: "",
				roomData: null, //房间信息
				releaseShow: false,
				popupShowClose: false,
				drawerShow: false,
				propsShow: false,
				taskSelectIndex: 0,
				releaseTypeIndex: 0,
				drawerTabIndex: 1,
				allUserList: [],
				userInfo: uni.getStorageSync("userInfo"),
				keyboardHeight: 0,
				messageList: [],
				recordTip: "按住说话",
				recording: false,
				recorder: uni.getRecorderManager(),
				audio: uni.createInnerAudioContext(),
				recordPoint: {
					identifier: 0,
					Y: 0
				},
				allStageUser: [],
				// -----
				taskCompleteInterVal: null,
				taskCompleteTime: 60,
				showPopup: false,
				showPopupColseIcon: false,
				yuTaskData: [],
				taskData: [],
				ori_user_info: [],
				taskInterVal: null,
				taskTime: 60,
				taskContent: {
					audioUrl: '',
					duration_time: 0,
					isPlay: false,
				},
				audioType: '',
				recordTimer: null,
				recordLength: 0,
				taskCompleteData: [],
				taskCompleteTime: 60,
				taskCompleteInterVal: null,
				refuseData: [],
				cupInterVal: null,
				taskSkip: []
			}
		},
		onLoad(e) {
			getApp().globalData.socketTask._callbacks.message.splice(1);
			var that = this;
			that.init(e.roomId)
			that.initScoket();
			that.setFontFamily()
			that.watchKeyboard()
			uni.$on("changeRoom", (data) => {
				if (data.msg == 'qsls') {
					that.init(e.roomId)
					that.initScoket();
				}
			})
			// #ifdef APP-PLUS
			that.watchRecorder()
			// 保持屏幕常亮
			uni.setKeepScreenOn({
				keepScreenOn: true
			});
			plus.device.setWakelock(true);
			// #endif
			uni.$on("qslsAccept", function(data) {
				clearInterval(that.taskCompleteInterVal)
				clearInterval(that.taskCompleteInterVal)
				clearInterval(that.recordTimer)
				that.$api("qsls.acceptCupTask", {
					room_id: data.taskData.room_id,
					task_id: data.taskData.task_info.task_id
				}).then(res => {
					if (res.code == 1) {
						console.log(res)
					}
				})
			})
		},
		onUnload() {
			clearInterval(this.taskCompleteInterVal)
			clearInterval(this.taskCompleteInterVal)
			clearInterval(this.recordTimer)
			// #ifdef APP-PLUS
			// 保持屏幕常亮
			uni.setKeepScreenOn({
				keepScreenOn: false
			});
			plus.device.setWakelock(false);
			// #endif
			if (this.audio != null) {
				this.audio.destroy();
				this.audio = null;
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
						that.roomData = res.data;
						uni.setStorageSync("roomData", res.data)
						that.allStageUser = res.data.profile_list.stage_list;
						if (res.data.task_info.length != 0) {
							that.taskData = res.data.task_info;
							if (res.data.task_info.type == 'cup_task_complete') {
								res.data.task_info.isPlay = false;
								that.taskCompleteData = res.data.task_info;
								that.taskCompleteTime = res.data.task_info.duration_time;
								that.interval()
							}
							// this.$store.commit("setQslsCupType", "1")
							// clearTimeout(that.cupInterVal)
							// this.cupInterVal = setTimeout(() => {
							// 	this.$store.commit("setQslsCupType", "2")
							// 	clearTimeout(this.cupInterVal)
							// }, res.data.task_info.run_time * 1000)
						}
						res.data.message_list.reverse().forEach((item, index) => {
							if (item.message.type == 'audio') {
								item.message.isPlay = false;
							}
							that.messageList.push(item);
						})
						that.$forceUpdate()
						that.scrollBottom();
					} else {
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
					// #ifdef APP
					that.$refs.authority.show('recorde')
					// #endif
				})
			},
			//发杯
			HairCup() {
				var that = this;
				that.$api("qsls.createCupTask", {
					room_id: that.roomData.room_info.room_id,
					pay_type: that.releaseTypeIndex == 0 ? 1 : 2,
					cup_task_type: that.yuTaskData.cup_task_type[this.taskSelectIndex].key,
				}).then(res => {
					that.hidePopup()
					uni.showToast({
						icon: "none",
						title: res.msg
					})
					if (res.code == 3001) {
						that.$refs.recharge.show()
					}
				})
			},
			//预发杯
			yuHairCup() {
				this.$api("qsls.createCupTaskOption", {
					room_id: this.roomData.room_info.room_id
				}).then(res => {
					if (res.code == 1) {
						this.showPopup = true;
						this.yuTaskData = res.data;
						this.showPopupColseIcon = true;
					}
				})
			},
			//退出房间
			exitRoom() {
				var that = this;
				that.$api("room.exitRoom", {
					room_id: that.roomData.room_info.room_id
				}).then(res => {
					if (res.code == 1) {
						uni.removeStorageSync('roomData')
						that.$u.route({
							type: 'navigateBack',
							delta: 1
						})
					}
				})
			},
			//初始化scoket
			initScoket() {
				const that = this;
				getApp().globalData.socketTask.onMessage((res) => {
					var socketData = JSON.parse(res.data);
					console.log(socketData)
					if (socketData.cate == "room") {
						switch (socketData.data.type) {
							case "entry_room":
								var item = socketData.data;
								item.message = {}
								item.message.type = "entry_room"
								that.messageList.push(item);
								that.scrollBottom();
								break;
							case "profile_change_one":
								if (socketData.data.user_info.length != 0) {
									that.allStageUser.push(socketData.data.user_info)
								}
								that.$forceUpdate()
								break;
							case "exit_room":
								that.allStageUser.forEach((item, index) => {
									if (item.user_id == socketData.data.user_info.user_id) {
										that.allStageUser.splice(index, 1)
									}
								})
								break;
							case "cup_task_run":
								this.taskData = socketData.data;
								this.ori_user_info = socketData.data.ori_user_info;
								this.$store.commit("setQslsCupType", "1")
								this.$store.commit("setRoomId", socketData.data.room_id)
								this.taskCompleteData = [];
								this.taskCompleteTime = 60;
								this.taskCompleteInterVal = null;
								this.showPopup = false;
								this.taskContent = {
									audioUrl: '',
									duration_time: 0,
									isPlay: false,
								};
								// this.cupInterVal = setTimeout(() => {
								// 	this.$store.commit("setQslsCupType", "2")
								// 	clearTimeout(this.cupInterVal)
								// }, socketData.data.duration_time * 1000)
								break;
							case "cup_task_hit":
								this.ori_user_info = [];
								this.$store.commit("setQslsCupType", "2")
								this.$store.commit("setRoomId", socketData.data.room_id)
								this.taskData = socketData.data;

								that.$nextTick(() => {
									if (socketData.data.user_info.user_id == this.userInfo.id) {
										that.$store.commit("setShowHif", true)
										uni.$emit('qslsTaskHit', {
											taskData: socketData.data
										})
									}
								})
								break;
							case 'cup_task_accept':
								clearInterval(that.taskCompleteInterVal)
								clearInterval(that.taskInterVal)
								clearInterval(that.recordTimer)
								this.taskData = socketData.data;
								this.taskCompleteData = [];
								this.taskContent = {
									audioUrl: '',
									duration_time: 0,
									isPlay: false,
								};
								this.taskTime = 60;
								this.taskCompleteTime = 60;
								if (socketData.data.user_info.user_id == this.userInfo.id) {
									this.hitShow = true;
									this.taskInterVal = setInterval(() => {
										this.taskTime = --this.taskTime;
										if (this.taskTime <= 0) {
											this.taskTimeout()
											clearInterval(this.taskInterVal)
										}
									}, 1000)
								}
								break;
							case "cup_task_end":
								this.$store.commit("setQslsCupType", "3");
								this.$store.commit("setRoomId", socketData.data.room_id)
								this.isDriftCup = false;
								this.showPopup = false;
								this.ori_user_info = [];
								this.taskData = [];
								this.refuseData = [];
								this.taskCompleteData = [];
								this.taskCompleteTime = 60;
								this.taskTime = 60;
								this.refuseData = [];
								this.hitShow = false;
								clearInterval(this.taskCompleteInterVal)
								clearInterval(this.taskInterVal)
								break;
							case "cup_task_complete":
								this.$store.commit("setQslsCupType", "3")
								this.$store.commit("setRoomId", socketData.data.room_id)
								this.taskData = socketData.data;
								socketData.data.isPlay = false;
								socketData.data.is_cai = 0;
								socketData.data.is_zan = 0;
								this.taskCompleteData = socketData.data;
								this.refuseData = [];
								this.hitShow = false
								this.interval()

								break;
							case 'cup_task_refuse':
								this.ori_user_info = [];
								this.taskData = socketData.data;
								this.refuseData = socketData.data;
								break;
							case 'cup_task_skip':
								this.taskData = socketData.data;
								this.refuseData = [];
								this.ori_user_info = [];
								break;
						}
					} else if (socketData.cate == "chat") {
						if (socketData.data.room_id != undefined) {
							socketData.data.message.isPlay = false;
							if (socketData.data.message.type == "gift") {
								that.showSvga = true;
								that.$refs.svgaPlayer.render(async (parser, player) => {
									let videoItem = await parser.load(socketData.data.message
										.gift_svga);
									await player.setVideoItem(videoItem)
									player.loops = 1;
									player.setContentMode(socketData.data.message.is_full_screen == 1 ?
										"AspectFill" :
										"AspectFit")
									player.startAnimation();
									player.onFinished(() => {
										that.showSvga = false
									})
								})
							}
							that.messageList.push(socketData.data);
							that.scrollBottom();
						}
					}
				})
			},
			//结束倒计时
			interval() {
				this.taskCompleteInterVal = setInterval(() => {
					this.taskCompleteTime = --this.taskCompleteTime;
					if (this.taskCompleteTime <= 0) {
						this.isDriftCup = false;
						this.showPopup = false;
						this.ori_user_info = [];
						this.taskData = [];
						this.refuseData = [];
						this.taskCompleteData = [];
						this.taskCompleteTime = 60;
						this.taskTime = 60;
						clearInterval(this.taskCompleteInterVal)
						clearInterval(this.taskInterVal)
					}
				}, 1000)
			},
			//任务超时
			taskTimeout() {
				this.$api("qsls.timeOutCupTask", {
					room_id: this.taskData.room_id,
					task_id: this.taskData.task_info.task_id
				}).then(res => {
					if (res.code == 1) {
						clearInterval(this.taskInterVal)
						this.taskTime = 60;
						this.isDriftCup = false;
						this.showPopup = false;
						this.ori_user_info = [];
						this.taskData = [];
						this.refuseData = [];
						this.hitShow = false;
					}
				})
			},
			//发送消息
			sendTextMessage() {
				if (this.inputMessage == '') {
					uni.showToast({
						icon: "none",
						title: "请输入内容"
					})
				} else {
					this.sendMessage({
						type: "text",
						content: this.inputMessage
					})
					this.showInput = false;
					this.inputMessage = '';
				}
			},
			//打开抽屉
			openDrawer() {
				this.drawerShow = true;
				this.$api("room.moreinfo", {
					room_id: this.roomData.room_info.room_id,
				}).then(res => {
					if (res.code == 1) {
						this.allUserList = res.data;
					}
				})
				this.$api("qsls.preuseprop").then(res => {
					if (res.code == 1) {
						this.popsList = res.data
					}
				})
			},
			//打开道具
			openProp() {
				this.resetting()
				this.popsShow = true;
				this.popupTitle = '使用道具'
			},
			//重置
			resetting() {
				this.showInput = false;
				this.drawerShow = false;
				this.releaseShow = false;
				this.popupShowClose = false;
				this.propsShow = false;
			},
			//发送socket信息
			sendMessage(data) {
				let that = this;
				let params = {
					cate: "chat",
					code: 1,
					msg: "success",
					data: {
						room_id: that.roomData.room_info.room_id,
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
			//打开用户弹窗
			openUserBox(item) {
				if (item.user_id == this.userInfo.id) {
					uni.showToast({
						icon: "none",
						title: "这是您自己"
					})
				} else {
					this.$refs.userContainer.show(item.from_user_info.user_id, this.roomData.room_info.room_id)
				}
			},
			openUserBox2() {
				if (this.taskCompleteData.user_info.user_id == this.userInfo.id) {
					uni.showToast({
						icon: "none",
						title: "这是您自己"
					})
				} else {
					this.$refs.userContainer.show(this.taskCompleteData.user_info.user_id, this.roomData.room_info.room_id)
				}
			},
			openUserBox3(item) {
				if (item.user_id == this.userInfo.id) {
					uni.showToast({
						icon: "none",
						title: "这是您自己"
					})
				} else {
					this.$refs.userContainer.show(item.user_id, this.roomData.room_info.room_id)
				}
			},
			//使用道具
			useProp() {
				this.$api('qsls.useprop', {
					prop_id: this.popsList[this.popsIndex].prop_id
				}).then(res => {
					uni.showToast({
						icon: "none",
						title: res.msg,
					})
					this.popsShow = false;
					if (res.code == 3001) {
						this.$refs.recharge.show()
					}
				})
			},
			handleImage2() {
				// #ifdef APP
				this.$refs.authority.show('image')
				// #endif
				// #ifdef H5
				this.handleImage()
				// #endif
			},
			imageEmpower() {
				this.handleImage()
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
								url: uni.getStorageSync("hostData").host + "/api/hey/" +
									'index/upload',
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
			//点赞
			zan() {
				this.$api("qsls.likeCupTask", {
					task_log_id: this.taskCompleteData.task_info.task_log_id
				}).then(res => {
					if (res.code == 1) {
						this.taskCompleteData.is_zan = 1;
						this.$forceUpdate()
					}
					uni.showToast({
						icon: "none",
						title: res.msg
					})
				})
			},
			//点踩
			cai() {
				this.$api("qsls.dislikeCupTask", {
					task_log_id: this.taskCompleteData.task_info.task_log_id
				}).then(res => {
					if (res.code == 1) {
						this.taskCompleteData.is_cai = 1;
						this.$forceUpdate()
					}
					uni.showToast({
						icon: "none",
						title: res.msg
					})
				})
			},
			//播放语音
			handlePlayAudio(item, index) {
				let that = this;
				if (!item.message.content) {
					that.$u.toast('语音不能为空');
					return false
				} else {
					that.audio.stop();
					that.messageList.forEach((val, index) => {
						if (val.message.type == 'audio') {
							val.message.isPlay = false;
						}
					})
					that.audio = uni.createInnerAudioContext();
					that.audio.src = item.message.content;
					that.messageList[index].message.isPlay = true;
					that.audio.play()
					that.$forceUpdate()
					that.audio.onEnded((e) => {
						that.messageList[index].message.isPlay = false;
						that.$forceUpdate()
					})
				}
			},
			completeAudio() {
				let that = this;
				if (that.taskCompleteData.task_info.user_content == '') {
					that.$u.toast('语音不能为空');
					return false
				} else {
					if (that.taskCompleteData.isPlay == false) {
						that.audio.destroy();
						that.audio = uni.createInnerAudioContext();
						that.audio.src = that.taskCompleteData.task_info.user_content;
						that.taskCompleteData.isPlay = true;
						that.audio.play()
						that.audio.onEnded((e) => {
							that.taskCompleteData.isPlay = false;
							that.$forceUpdate()
						})
						that.$forceUpdate()
					}
				}
			},
			//完成任务
			completeCupTask() {
				this.$api("qsls.completeCupTask", {
					room_id: this.taskData.room_id,
					task_id: this.taskData.task_info.task_id,
					content: this.taskContent.audioUrl,
					duration_time: this.taskContent.duration_time
				}).then(res => {
					if (res.code == 1) {
						this.showPopup = false;
						this.taskTime = 60;
						clearInterval(this.taskInterVal);
						if (this.audio != null) {
							this.audio.stop();
						}
						this.taskContent = {
							audioUrl: "",
							duration_time: 0,
							isPlay: false
						}
					}
				})
			},
			//清除录音
			clearTaskAudio() {
				if (this.audio != null) {
					this.audio.destroy();
				}
				this.taskContent = {
					audioUrl: "",
					duration_time: 0,
					isPlay: false
				}
			},
			handlePlayAudioTwo() {
				let that = this;
				console.log(that.taskContent)
				if (that.taskContent.audioUrl == '') {
					that.$u.toast('语音不能为空');
					return false
				} else {
					that.audio.destroy();
					that.audio = uni.createInnerAudioContext();
					that.audio.src = that.taskContent.audioUrl;
					that.taskContent.isPlay = true;
					that.audio.play()
					that.audio.onEnded((e) => {
						that.taskContent.isPlay = false;
					})
				}
			},
			//监听录音
			watchRecorder() {
				var that = this;
				that.recorder.onStart((e) => {
					if (that.audioType == 'task') {
						if (that.taskContent.audioUrl != '') {
							uni.showToast({
								icon: "none",
								title: '已经录制'
							})
						} else {
							that.recordStart(e)
						}
					}
				})
				that.recorder.onStop((e) => {
					that.recordStop(e)
				})
			},
			recordStart(e) {
				let that = this
				console.log('recorder start' + JSON.stringify(e));
				that.recordLength = 0
				that.recordTimer = setInterval(() => {
					that.recordLength++
				}, 1000)
			},
			recordStop(e) {
				let that = this
				console.log('recorder stop' + JSON.stringify(e))
				var token = uni.getStorageSync("token");
				that.recording = false
				clearInterval(that.recordTimer)
				uni.uploadFile({
					url: uni.getStorageSync("hostData").host + "/api/hey/" + 'index/upload',
					filePath: e.tempFilePath,
					name: 'file',
					formData: {
						"token": token
					},
					success: res => {
						res = JSON.parse(res.data)
						if (res.code === 1) {
							if (that.audioType == 'audio') {
								that.sendMessage({
									type: "audio",
									content: res.data.fullurl
								})
								that.audioType = ''
								that.showRecord = false;
							} else if (that.audioType == 'task') {
								that.taskContent = {
									audioUrl: res.data.fullurl,
									duration_time: that.recordLength,
									isPlay: false
								}
								that.audioType = ''
							}

						} else {
							that.$u.toast(res.msg)
						}
					},
					complete: e => {}
				})
			},
			handleRecordStop(e) {
				let that = this
				console.log('touch stop')
				if (!that.recording) {
					return
				}
				that.recording = false
				that.recordTip = '按住说话'
				that.recorder.stop()
			},
			handleRecordDoing(e) {

			},
			handleRecordStart(type) {
				let that = this;
				that.audioType = type;
				// #ifdef APP-PLUS || MP-WEIXIN
				that.recording = true
				that.recordStoping = false
				that.recordTip = '正在录制…'
				that.recorder.start({
					format: "mp3"
				})
				// #endif
			},
			//录音
			async handleVoice() {
				let that = this;
				if (uni.getSystemInfoSync().platform == "ios") {
					var appAuthorizeSetting = uni.getAppAuthorizeSetting();
					if (appAuthorizeSetting.microphoneAuthorized == 'authorized' || appAuthorizeSetting
						.microphoneAuthorized == 'not determined') {
						that.scrollBottom();
						that.showRecord = !that.showRecord
						that.floatHeight = that.showRecord == true ? '40' : "15"
						return
					} else {
						uni.showModal({
							title: "请开启录音权限",
							content: "请去设置里面开启录音权限！",
							success(res1) {
								if (res1.confirm) {
									permision.gotoAppPermissionSetting()
								}
							}
						})
					}
				} else {
					var result = await permision.requestAndroidPermission('android.permission.RECORD_AUDIO');
					if (result == 1) {
						this.scrollBottom();
						that.showRecord = !that.showRecord
						that.floatHeight = that.showRecord == true ? '40' : "15"
						return
					} else {
						uni.showModal({
							title: "请开启录音权限",
							content: "请去设置里面开启录音权限！",
							success(res1) {
								if (res1.confirm) {
									permision.gotoAppPermissionSetting()
								}
							}
						})
					}
				}
			},
			//监听键盘
			watchKeyboard() {
				var that = this;
				uni.onKeyboardHeightChange(res => {
					that.keyboardHeight = res.height;
					if (res.height == 0) {
						this.showInput = false
					}
				})
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
			//图片记载
			imgLoad() {
				this.scrollBottom()
			},
			hidePopup() {
				this.showPopup = false;
				this.releaseTypeIndex = 0;
				this.taskSelectIndex = 0;
				this.taskData = [];
				this.taskContent = {
					audioUrl: '',
					duration_time: 0,
					isPlay: false,
				};
				this.showPopupColseIcon = false;
			},
			//设置字体
			setFontFamily() {
				// #ifdef APP-PLUS
				uni.loadFontFace({
					family: 'font-test',
					// 本地字体路径需转换为平台绝对路径
					source: `url(${plus.io.convertLocalFileSystemURL('_www/static/AaHouDiHei.ttf')})`,
					success() {},
					fail(e) {
						console.log('fail')
					}
				})
				// #endif
			},
		}
	}
</script>

<style lang="scss" scoped>
	.qsls {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
	}

	.roomHead {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		z-index: 20;
		padding: 30rpx;
		box-sizing: border-box;

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

	.qslsChat {
		height: calc(100% - 1033rpx - 120rpx);
		background: #F2F2F2;
		width: 100vw;
		padding: 25rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;

		.chatContainer {
			height: 0;
			flex: 1;

			.mesageItem {
				display: flex;
				margin-bottom: 28rpx;

				.messageTextBox {
					max-width: 405rpx;
					padding: 16rpx 20rpx;
					box-sizing: border-box;
					background: #FFA000;
					border-radius: 2rpx 35rpx 35rpx 35rpx;
					font-size: 28rpx;
				}
			}

			.giftMessage {
				height: 50rpx;
				font-size: 22rpx;
				color: #FFA000;
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

		.systemMsg {
			color: #999999;
			font-size: 28rpx;
			margin-bottom: 28rpx;
		}
	}

	.footer {
		width: 100vw;
		height: 120rpx;
		padding: 21rpx 40rpx;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		align-items: center;

		.bottomInput {
			flex: 1;
			background: #F8F8F7;
			border-radius: 50rpx;
			min-height: 70rpx;
			max-height: 200rpx;
			padding: 15rpx 30rpx;
			box-sizing: border-box;
			overflow: hidden;
			display: flex;
			margin-right: 20rpx;
		}
	}

	// --------

	.popupContainer {
		width: 655rpx;
		height: 828rpx;
		background-image: url(@/static/iconImage/bg.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;

		.title {
			position: relative;
			text-align: center;
			font-size: 32rpx;
			color: #333333;
			font-family: font-test !important;
			display: inline;
			margin-top: 50rpx;

			.line {
				width: 100%;
				height: 16rpx;
				background: #FFA000;
				position: absolute;
				left: 0;
				bottom: 0;
			}
		}

		.subTitle {
			text-align: center;
			color: #666666;
			font-size: 23rpx;
			margin-top: 25rpx;
			margin-bottom: 16rpx;
		}

		.selsectTask {
			margin-top: 100rpx;
			padding: 0 80rpx;
			box-sizing: border-box;
			height: 665rpx;

			.selsectTaskItem {
				font-size: 28rpx;
				color: #666666;
				display: flex;
				align-items: center;
				margin-bottom: 21rpx;
			}

			.releaseType {
				width: 220rpx;
				height: 96rpx;
				background: #F3F3F3;
				border: 1px solid transparent;
				font-size: 23rpx;
				color: #666666;
				display: flex;
				flex-direction: column;
				align-content: center;
				justify-content: center;
				align-items: center;
				border-radius: 10rpx;
				margin-top: 80rpx;

				&Active {
					background: #FFDDA4 !important;
					border: 1px solid #FFA000 !important;
					color: #333 !important;
				}
			}

			.releaseBtn {
				width: 100%;
				height: 72rpx;
				background-image: url(@/static/iconImage/btnBg2.png);
				background-position: 100% 100%;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				text-align: center;
				line-height: 72rpx;
				font-weight: bold;
				color: #fff;
				margin-top: 53rpx;
			}
		}

		.popupHit {
			padding-bottom: 50rpx;
			height: 665rpx;
			box-sizing: border-box;
			border: 1px solid transparent;

			.hitTopic {
				font-size: 56rpx;
				color: #FFA000;
				text-align: center;
				margin: 161rpx 0rpx;
				font-family: font-test !important;
			}

			.hitBtn {
				width: 190rpx;
				height: 85rpx;
				border: 1px solid #FFA000;
				text-align: center;
				line-height: 85rpx;
				border-radius: 50rpx;
				font-size: 36rpx;
			}
		}

		.taskCenter {
			height: 665rpx;
			padding: 125rpx 82rpx 50rpx 82rpx;
			box-sizing: border-box;

			.taskAudioLine {
				width: 336rpx;
				height: 65rpx;
				line-height: 65rpx;
				background: #FFA000;
				border-radius: 50rpx;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 23rpx;
				margin: 0 auto;
			}

			.soundBtn {
				width: 128rpx;
				height: 128rpx;
				border-radius: 50%;
				border: 1px solid #333333;
				text-align: center;
				line-height: 128rpx;
				font-size: 55rpx;
				margin: 0 auto;
				margin-top: 98rpx;
			}

			.releaseBtn {
				width: 100%;
				height: 72rpx;
				background-image: url(@/static/iconImage/btnBg2.png);
				background-position: 100% 100%;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				text-align: center;
				line-height: 72rpx;
				font-weight: bold;
				color: #fff;
				margin-top: 67rpx;
			}
		}

		.taskCenter2 {
			.taskAudioLine {
				width: 336rpx;
				height: 65rpx;
				line-height: 65rpx;
				background: #FFA000;
				border-radius: 50rpx;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 23rpx;
				margin: 0 auto;
				margin-top: 50rpx;
			}

			.soundBtn {
				width: 128rpx;
				height: 128rpx;
				border-radius: 50%;
				border: 1px solid #333333;
				text-align: center;
				line-height: 128rpx;
				font-size: 55rpx;
				margin: 0 auto;
				margin-top: 38rpx;
			}

			.releaseBtn {
				width: 100%;
				height: 72rpx;
				background-image: url(@/static/iconImage/btnBg2.png);
				background-position: 100% 100%;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				text-align: center;
				line-height: 72rpx;
				font-weight: bold;
				color: #fff;
				margin-top: 26rpx;
			}
		}

		.prop {
			height: 665rpx;
			padding: 105rpx 30rpx 89rpx 30rpx;
			box-sizing: border-box;

			.hitBtn {
				width: 190rpx;
				height: 85rpx;
				border: 1px solid #FFA000;
				text-align: center;
				line-height: 85rpx;
				border-radius: 50rpx;
				font-size: 36rpx;
				margin-top: 89rpx;
			}
		}
	}

	.drawerContainer {
		width: 479rpx;
		height: 100vh;
		background: #000000;
		border-radius: 30rpx 0rpx 0rpx 30rpx;
		padding: var(--status-bar-height) 35rpx 35rpx 35rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;

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

	.inputContainer {
		position: absolute;
		left: 0;
		bottom: 0;
		background: #F2F2F2;
		z-index: 20;
		z-index: 9;
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

	// --------------
	.qslsBg {
		position: relative;

		.headContainerFooter {
			height: 165rpx;
			width: 100%;
			background-image: url(/static/qslsCupBg.png);
			background-position: 100% 100%;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			position: absolute;
			left: 0;
			bottom: -5rpx;
			z-index: 1;

			.fabei {
				background-image: url(@/static/iconImage/fabeiBg.png);
				width: 198rpx;
				height: 58rpx;
				text-align: center;
				line-height: 58rpx;
				font-size: 30rpx;
				color: #fff;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				background-position: 100% 100%;
			}

			.refuse {
				width: 430rpx;
				color: #333;
				font-size: 26rpx;
			}

			.hit {
				padding: 18rpx 30rpx 10rpx 23rpx;
				box-sizing: border-box;
				height: 100%;
				display: flex;
				align-items: center;
			}

			.complete {
				padding: 12rpx 25rpx 7rpx 23rpx;
				box-sizing: border-box;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.taskAudioLine {
					width: 336rpx;
					height: 65rpx;
					line-height: 65rpx;
					background: #FFA000;
					border-radius: 50rpx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 23rpx;
				}
			}

			.time {
				width: 89rpx;
				height: 43rpx;
				border-radius: 50rpx;
				background: rgba(255, 255, 255, 0.72);
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 23rpx;
				color: #FF9429;
			}

			.audioLine {
				width: 336rpx;
				height: 65rpx;
				border-radius: 50rpx;
				background: #FFA000;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>