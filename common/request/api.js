export default {
	ad: {
		lists: {
			url: 'adv/lists',
			auth: false,
			method: 'GET',
			desc: '广告列表',
		},
	},
	renew: {
		init: {
			url: 'version/index',
			auth: false,
			method: 'POST',
			desc: '更新版本',
		},
	},
	game: {
		match_success: {
			url: 'game_room/match_success',
			auth: false,
			method: 'GET',
			desc: '曲水流觞匹配房间成功',
		},
		cancel_match_room: {
			url: 'game_room/cancel_match_room',
			auth: false,
			method: 'GET',
			desc: '曲水流觞取消匹配房间',
		},
		match_room: {
			url: 'game_room/match_room',
			auth: false,
			method: 'GET',
			desc: '曲水流觞匹配房间',
		},
		joinRoom: {
			url: 'game_room/join_room',
			auth: false,
			method: 'GET',
			desc: '加入曲水流觞房间',
		},
		is_in_game_room: {
			url: 'game_room/is_in_game_room',
			auth: false,
			method: 'POST',
			desc: '是否在游戏房间',
		},
		countNum: {
			url: "game_room/game_room_user_count",
			auth: false,
			method: 'GET',
			desc: '房间总人数',
		}
	},
	poetry: {
		isRelease: {
			url: 'poetry/today_is_exist_data',
			auth: false,
			method: 'GET',
			desc: '诗词结缘字是否发过',
		},
		textList: {
			url: 'poetry_word/lists',
			auth: false,
			method: 'GET',
			desc: '诗词结缘字列表',
		},
		poetryAdd: {
			url: 'poetry/add',
			auth: false,
			method: 'POST',
			desc: '诗词结缘字添加诗词',
		},
		details: {
			url: 'poetry/details',
			auth: false,
			method: 'GET',
			desc: '诗词结缘详情',
		},
		lists: {
			url: 'poetry/lists',
			auth: false,
			method: 'GET',
			desc: '诗词结缘列表',
		},
		single: {
			url: '/poetry_chat_log/details',
			auth: false,
			method: 'POST',
			desc: '诗词结缘聊天',
		},
		zan: {
			url: 'poetry/zan',
			auth: false,
			method: 'GET',
			desc: '诗词结缘赞',
		},
		myList: {
			url: 'poetry/my_poetry_list',
			auth: false,
			method: 'GET',
			desc: '我的诗词结缘列表',
		},
		today_poetry_count: {
			url: 'poetry/today_poetry_count',
			auth: false,
			method: 'GET',
			desc: '今日发布诗词总数',
		}
	},
	stat: {
		init: {
			url: 'user/today_last_online_time',
			auth: false,
			method: 'POST',
			desc: '统计数据',
		},
	},
	index: {
		init: {
			url: 'index/init',
			auth: false,
			method: 'GET',
			desc: '初始化数据',
		},
		upload: {
			url: 'index/upload',
			auth: false,
			method: 'POST',
			desc: '上传',
		},
		asyncLink: {
			url: 'index/asyncLink',
			auth: false,
			method: 'POST',
			desc: '路由表',
		},
		debug: {
			url: 'index/debug',
			auth: false,
			method: 'POST',
		}
	},
	post: {
		search: {
			url: 'post_cate/find_post_cate',
			auth: false,
			method: 'GET',
			desc: '搜索话题',
		},
		recommend: {
			url: 'post/recommend',
			auth: false,
			method: 'GET',
			desc: '推荐话题',
		},
		follow: {
			url: 'post/follow',
			auth: true,
			method: 'GET',
			desc: '推荐话题',
		},
		user: {
			url: 'post/user',
			auth: false,
			method: 'GET',
			desc: '话题列表',
		},
		mine: {
			url: 'post/mine',
			auth: false,
			method: 'GET',
			desc: '话题列表',
		},
		detail: {
			url: 'post/detail',
			auth: false,
			method: 'GET',
			desc: '话题详情',
		},
		del: {
			url: 'post/del',
			auth: false,
			method: 'GET',
			desc: '删除动态',
		},
		add: {
			url: 'post/add',
			auth: true,
			method: 'POST',
			desc: '发布话题',
		},
		dig: {
			url: 'post/dig',
			auth: true,
			method: 'POST',
			desc: '点赞',
		},
		cai: {
			url: 'post/cai',
			auth: true,
			method: 'POST',
			desc: '点踩',
		},
		is_add: {
			url: 'post/is_add',
			auth: true,
			method: 'POST',
			desc: '能否显示动态',
		},
		follow_user_post_list: {
			url: 'post/follow_user_post_list',
			auth: true,
			method: 'GET',
			desc: '关注列表',
		}
	},
	post_cate: {
		add: {
			url: 'post_cate/add',
			auth: true,
			method: 'POST',
			desc: '添加话题',
		},
		search_list: {
			url: 'post_cate/search_list',
			auth: true,
			method: 'GET',
			desc: '搜索话题',
		},
		lst: {
			url: 'post_cate/lst',
			auth: true,
			method: 'GET',
			desc: '话题列表',
		},
		hot_list: {
			url: 'post_cate/hot_list',
			auth: true,
			method: 'GET',
			desc: '热门话题列表',
		}

	},
	group: {
		recommend: {
			url: 'group/recommend',
			auth: false,
			method: 'GET',
			desc: '推荐圈子',
		},
		mine: {
			url: 'group/mine',
			auth: true,
			method: 'GET',
			desc: '圈子列表',
		},
		detail: {
			url: 'group/detail',
			auth: true,
			method: 'GET',
			desc: '圈子详情',
		},
		add: {
			url: 'group/add',
			auth: true,
			method: 'POST',
			desc: '发布圈子',
		},
		lists: {
			url: 'group/lists',
			auth: true,
			method: 'GET',
			desc: '群聊列表',
		}
	},
	comment: {
		add: {
			url: 'post_comment/add',
			auth: true,
			method: 'POST',
			desc: '发布评论',
		},
		lists: {
			url: 'post_comment/lists',
			auth: false,
			method: 'GET',
			desc: '评论列表',
		},
		listsMore: {
			url: 'post_comment/reply_comment_list',
			auth: false,
			method: 'GET',
			desc: '评论列表更多',
		},
	},
	post_comment: {
		dig: {
			url: 'post_comment/dig',
			auth: true,
			method: 'POST',
			desc: '评论点赞',
		},
		lists: {
			url: 'post_comment/lists',
			auth: false,
			method: 'GET',
			desc: '评论列表',
		},
	},
	gift: {
		lists: {
			url: 'gift/lists',
			auth: true,
			method: 'GET',
			desc: '礼物列表',
		},
		giveGift: {
			url: 'user_gift/give_gift',
			auth: true,
			method: 'POST',
			desc: '送礼物',
		},
	},
	chat: {
		single: {
			url: 'chat/single',
			auth: true,
			method: 'GET',
			desc: '单聊详情',
		},
		group: {
			url: 'chat/group',
			auth: true,
			method: 'GET',
			desc: '群聊详情',
		},
		voice: {
			url: 'chat/voice',
			auth: true,
			method: 'GET',
			desc: '语音详情',
		},
		live: {
			url: 'chat/live',
			auth: true,
			method: 'GET',
			desc: '视频详情',
		},
		lists: {
			url: 'chat/lists',
			auth: true,
			method: 'GET',
			desc: '会话列表',
		},
	},
	message: {
		lists: {
			url: 'message/lists',
			auth: true,
			method: 'GET',
			desc: '消息列表',
		},
		trendsMsg: {
			url: 'message/post_message_count',
			auth: true,
			method: 'GET',
			desc: '动态消息',
		},
		trendsMsgLists: {
			url: 'message/post_message_list',
			auth: true,
			method: 'GET',
			desc: '动态消息列表',
		},
		readall: {
			url: 'message/readall',
			auth: true,
			method: 'GET',
			desc: '标记已读',
		},
		topping: {
			url: 'message/topping_user',
			auth: true,
			method: 'POST',
			desc: '消息置顶',
		},
		disturbList: {
			url: 'chat_message_no_disturb/is_no_disturb',
			auth: true,
			method: 'GET',
			desc: '消息免打扰列表',
		},
		addDisturbList: {
			url: 'chat_message_no_disturb/add',
			auth: true,
			method: 'GET',
			desc: '添加消息免打扰',
		},
	},
	help: {
		lists: {
			url: 'help/lists',
			auth: false,
			method: 'GET',
			desc: '帮助列表',
		},
		detail: {
			url: 'help/detail',
			auth: false,
			method: 'GET',
			desc: '帮助列表',
		},
	},
	adv: {
		lists: {
			url: 'adv/lists',
			auth: false,
			method: 'GET',
			desc: '广告列表',
		},
	},
	role: {
		recommend: {
			url: 'role/recommend',
			auth: false,
			method: 'GET',
			desc: '推荐角色',
		},
		lists: {
			url: 'role/lists',
			auth: false,
			method: 'GET',
			desc: '角色列表',
		},

		match: {
			url: 'role/match',
			auth: true,
			method: 'GET',
			desc: '角色匹配',
		},
	},
	richtext: {
		lists: {
			url: 'richtext/lists',
			auth: false,
			method: 'GET',
			desc: '文本列表',
		},
		detail: {
			url: 'richtext/detail',
			auth: false,
			method: 'GET',
			desc: '文本详情',
		},
	},
	feedback: {
		lists: {
			url: 'feedback/lists',
			auth: false,
			method: 'GET',
			desc: '反馈列表',
		},
		add: {
			url: 'feedback/add',
			auth: false,
			method: 'POST',
			desc: '提交反馈',
		},
		detail: {
			url: 'feedback/detail',
			auth: false,
			method: 'GET',
			desc: '反馈内容',
		},
	},
	wechat: {
		jssdk: {
			url: 'wechat/jssdk',
			auth: false,
			method: 'POST',
			desc: '微信Jssdk',
		},
	},
	user: {
		openBox: {
			url: 'user/open_blind_box',
			auth: false,
			method: 'GET',
			desc: '开盲盒',
		},
		look_user_home: {
			url: 'user/look_user_home',
			auth: false,
			method: 'POST',
			desc: '名望加减',
		},
		recommend: {
			url: 'user/recommend',
			auth: false,
			method: 'GET',
			desc: '推荐用户',
		},
		recommend_user: {
			url: 'user/recommend_user',
			auth: false,
			method: 'GET',
			desc: '推荐用户1',
		},
		profile: {
			url: 'user/profile',
			auth: false,
			method: 'GET',
			desc: '用户信息',
		},
		role: {
			url: 'user/role',
			auth: false,
			method: 'GET',
			desc: '用户角色',
		},
		data: {
			url: 'user/data',
			auth: true,
			method: 'GET',
			desc: '关注数据',
		},

		smslogin: {
			url: 'user/smslogin',
			auth: false,
			method: 'POST',
			desc: '手机登录',
		},
		register: {
			url: 'user/register',
			auth: false,
			method: 'POST',
			desc: '会员注册',
		},

		info: {
			url: 'user/info',
			auth: true,
			method: 'GET',
			desc: '会员信息',
		},
		update: {
			url: 'user/update',
			auth: true,
			method: 'POST',
			desc: '修改信息',
		},
		bindrole: {
			url: 'user/bindrole',
			auth: true,
			method: 'POST',
			desc: '绑定角色',
		},
		changemobile: {
			url: 'user/changemobile',
			auth: true,
			method: 'POST',
			desc: '修改手机号',
		},
		search_log: {
			url: 'user/search_log',
			auth: true,
			method: 'POST',
			desc: '搜索记录',
		},
		only_choose_gender: {
			url: 'user/only_choose_gender',
			auth: true,
			method: 'POST',
			desc: '只是性别提交',
		},
		logout: {
			url: 'user/logout',
			auth: true,
			method: 'POST',
			desc: '退出登录',
		},
		off: {
			url: 'user/cancle_user',
			auth: true,
			method: 'GET',
			desc: '注销账号',
		},
		update_avatar: {
			url: 'user/update_avatar',
			auth: true,
			method: 'POST',
			desc: '更换头像',
		}
	},
	user_gift: {
		lists: {
			url: 'user_gift/lists',
			auth: true,
			method: 'GET',
			desc: '礼物列表',
		},
	},
	user_recharge: {
		moneyList: {
			url: 'user_recharge/money_exchange_copper',
			auth: true,
			method: 'GET',
			desc: '充值铜钱列表',
		},
		apply: {
			url: 'user_recharge/apply',
			auth: true,
			method: 'PUT',
			desc: '充值',
		},
		lists: {
			url: 'user_wallet_log/lists',
			auth: true,
			method: 'GET',
			desc: '充值记录',
		},
		balance: {
			url: 'api/hey',
			auth: true,
			method: 'GET',
			desc: '余额',
		}
	},
	user_wallet_log: {
		lists: {
			url: 'user_wallet_log/lists',
			auth: true,
			method: 'GET',
			desc: '明细记录',
		},
	},
	user_view: {
		lists: {
			url: 'user_view/lists',
			auth: true,
			method: 'GET',
			desc: '收藏记录',
		},
	},
	user_follow: {
		lists: {
			url: 'user_follow/lists',
			auth: true,
			method: 'GET',
			desc: '关注列表',
		},
		follow: {
			url: 'user_follow/follow',
			auth: true,
			method: 'POST',
			desc: '取消关注',
		},
	},
	role_dynasty: {
		lists: {
			url: 'role_dynasty/lists',
			auth: false,
			method: 'GET',
			desc: '朝代列表',
		},
	},
	role_achievement: {
		lists: {
			url: 'role_achievement/lists',
			auth: false,
			method: 'GET',
			desc: '成就列表',
		},
	},
	role_title: {
		lists: {
			url: 'role_title/lists',
			auth: false,
			method: 'GET',
			desc: '称号列表',
		},
	},
	sms: {
		send_sms: {
			url: 'sms/send_sms',
			auth: false,
			method: 'POST',
			desc: '发送短信',
		},
	},
	pay: {
		order: {
			url: 'user_recharge/order',
			auth: true,
			method: 'POST',
			desc: '创建订单',
		},
		prepay: {
			url: 'pay/pay_order',
			auth: true,
			method: 'POST',
			desc: '发起支付',
		},
	},
	share: {
		add: {
			url: 'share/add',
			auth: false,
			method: 'POST',
			desc: '添加分享记录',
		}
	},
	user_gift_log: {
		lists: {
			url: 'user_gift_log/lists',
			auth: false,
			method: 'GET',
			desc: '礼物记录',
		}
	},
	user_black: {
		lists: {
			url: 'user_black/lists',
			auth: false,
			method: 'GET',
			desc: '黑名单列表',
		},
		add: {
			url: 'user_black/add',
			auth: false,
			method: 'GET',
			desc: '添加/取黑名单',
		},
	},
	versions: {
		index: {
			url: 'version/index',
			auth: false,
			method: 'POST',
			desc: '版本更新',
		}
	}
};