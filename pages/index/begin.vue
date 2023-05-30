<template>
	<view class="">
		初始化
	</view>
</template>

<script>
	export default {
		name: 'begin',
		data() {
			return {
				
			}
		},
		computed: {
	
		},
		methods: {
			
		},
		created() {
		
		},
		onLaunch: function() {
			// this.requestAn()
			let token=Boolean( uni.getStorageSync('token'))
			let that=this
			that.$api('user.info').then(res => {
				
				console.log('ewxq',res.data.gender);
				if(token&&res.data.gender==0 ){
					uni.reLaunch({
						url:'/pages/auth/s1',
						success: (res) => {
						},
						fail: (err) => {
							console.log(err);
						}
					}) 
				}
				if (!Boolean(res.data.realname)&&!Boolean(res.data.dynasty)&&res.data.gender!=0&&res.data.choose_num!=4 ){
								 console.log('cs',res.data.choose_num);
								 uni.reLaunch({
								 	url:'/pages/index/index',
								 	success: (res) => {
								 	},
								 	fail: (err) => {
								 		console.log(err);
								 	}
								 }) 
								 
				}
				console.log('cs',res.data.choose_num);
				 if (!Boolean(res.data.realname)&&!Boolean(res.data.dynasty)&&res.data.gender!=0){
					 uni.reLaunch({
					 	url:'/pages/auth/s2',
					 	success: (res) => {
					 	},
					 	fail: (err) => {
					 		console.log(err);
					 	}
					 }) 
				 }
				// 如果没角色有性别的话 跳到角色页面
				 if (!Boolean(res.data.realname)&&!Boolean(res.data.dynasty)&&res.data.gender!=0&&res.data.choose_num==4 ){
					 console.log('cs',res.data.choose_num);
					 uni.reLaunch({
					 	url:'/pages/auth/s2',
					 	success: (res) => {
					 	},
					 	fail: (err) => {
					 		console.log(err);
					 	}
					 }) 
					 
				 }
				 //如果有角色有性别的话  就跳到首页
			    if (Boolean(res.data.realname)&&Boolean(res.data.dynasty)&&res.data.gender!=0 ) {
			       uni.reLaunch({
			       	url:'/pages/index/index',
			       	success: (res) => {
			       	},
			       	fail: (err) => {
			       		console.log(err);
			       	}
			       }) 
			    }
				//如果有性别的话就跳到角色
				else if(res.data.gender!=0 ){
					uni.reLaunch({
						url:'/pages/auth/s2',
						success: (res) => {
						},
						fail: (err) => {
							console.log(err);
						}
					}) 
				}else{
					uni.reLaunch({
						url:'/pages/auth/s1',
						success: (res) => {
						},
						fail: (err) => {
							console.log(err);
						}
					})
				}
			})}
		
	}
</script>

<style>
</style>