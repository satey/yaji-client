<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="bg-gray-200">
        <u-navbar title="编辑个人信息" :safeAreaInsetTop="true" :placeholder="true">
            <view slot="left">
                <i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
            </view>
            <view slot="right">
                <view class="py-4 px-4 rounded-full text-base text-white bg-gradient-to-r from-rose-400 to-rose-500" @click="handleUpdate()">完成</view>
            </view>
        </u-navbar>
        <view class="flex mt-10">
            <image @click="changeImage" class="block m-auto w-24 h-24 rounded-full" :src="userInfo.avatar"></image>
        </view>
        <view class="bg-white mt-10">
            <u-cell-group>
                <u-cell title="昵称" :value="userInfo.nickname" :isLink="true" @click="showNickname = true"></u-cell>
                <u-cell title="出生日期" :value="$u.timeFormat(userInfo.birthday, 'yyyy-mm-dd')" :isLink="true" @click="showBirthday = true"></u-cell>
                <u-cell title="星座" :value="$u.timeFormat(userInfo.birthday, 'yyyy-mm-dd')" :isLink="true" @click="showBirthday = true"></u-cell>
                <u-cell title="个性签名" :value="userInfo.bio" :isLink="true" @click="showBio = true"></u-cell>
            </u-cell-group>
        </view>

        <u-datetime-picker :show="showBirthday" v-model="userInfo.birthday" :confirm="showBirthday = false" mode="date"></u-datetime-picker>
        <u-modal :show="showNickname" :showConfirmButton="false" :showCancelButton="false">
            <view class="w-full">
                <view class="text-2xl mt-4 text-center">修改昵称</view>
                <view class="mt-6 bg-gray-100 rounded-lg p-2">
                    <u-input maxlength="20" type="text" v-model="userInfo.nickname" :showWordLimit="true"></u-input>
                </view>
                <view class="grid grid-cols-2 gap-4 mt-10 text-center">
                    <view class="rounded-full p-6 text-base leading-none bg-gray-100" @click="showNickname = false">取消
                    </view>
                    <view class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500" @click="showNickname = false">确定</view>
                </view>
            </view>
        </u-modal>

        <u-modal :show="showBio" :showConfirmButton="false" :showCancelButton="false">
            <view class="w-full">
                <view class="text-2xl mt-4 text-center">修改个性签名</view>
                <view class="mt-6 bg-gray-100 rounded-lg p-2">
                    <u-input maxlength="20" type="text" v-model="userInfo.bio" :showWordLimit="true"></u-input>
                </view>
                <view class="grid grid-cols-2 gap-4 mt-10 text-center">
                    <view class="rounded-full p-6 text-base leading-none bg-gray-100" @click="showBio = false">取消</view>
                    <view class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500" @click="showBio = false">确定</view>
                </view>
            </view>
        </u-modal>
		<feiqslsHit></feiqslsHit>
    </view>
</template>
<script>
import { mapActions, mapState } from 'vuex'
    // import COS from '../../../yaji-app/dist/cos.js';
	import COS from 'cos-js-sdk-v5';
	
	var cos = new COS({
	  SecretId: 'AKID5KWSK8sdK4kNxSF0joldRAoNrHbr2BDB',
	  SecretKey: '2zqbHrR0VyLet6FIMfzIawEUgpuxwsk5'
	});
export default {
    name: 'profile',
    data() {
        return {
            showNickname: false,
            showBirthday: false,
            showBio: false,
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
        })
    },
    onLoad(option) {
        let that = this
        that.getUserInfo()
    },
    methods: {
        ...mapActions(['getUserInfo']),
        handleUpdate() {
            let that = this
            that.$api('user.update', {
                nickname: that.userInfo.nickname,
                birthday: that.userInfo.birthday,
                bio: that.userInfo.bio,
            }).then(res => {
                if (res.code === 1) {
                    that.$u.toast('更新成功')
                    that.getUserInfo()
                } else {
                    that.$u.toast(res.msg)
                }
            })
        },
		changeImage(){
			uni.chooseImage({
							  //   count: 1, //默认9
							  //   sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
							  //   sourceType: ['album'], //从相册选择
							  //   success: function (res) {
							// let filePath = res.tempFiles[0].path;
									// let filename = filePath.substr(filePath.lastIndexOf('/') + 1);
									// COS.uploadFileToTencentClound(filename,filePath).then((res)=>{
									// 	console.log("[修改头像]",res)
									// 	that.avatarUrl=res
									// })
							  //   }
// 					count: 1,
// 					  success: function(res) {
// 						var file = res.tempFiles[0];
// 						console.log('file',file);
// 						if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
// 						  console.log('文件格式不正确');
// 						  return;
// 						}
// 						if (file.size > 5 * 1024 * 1024) {
// 						  console.log('文件大小超过限制');
// 						  return;
// 						}
// 						var cos = new COS({
// 						  SecretId: 'AKID5KWSK8sdK4kNxSF0joldRAoNrHbr2BDB',
// 						  SecretKey: '2zqbHrR0VyLet6FIMfzIawEUgpuxwsk5'
// 						});
// 						var key = 'uploads/' + file.name;
// 						cos.putObject({
// 						  Bucket: 'yaji-1318192409',
// 						  Region: 'ap-shanghai',
// 						  Key: key,
// 						  FilePath: file.path,
// 						  onProgress: function(progressData) {
// 							console.log('上传进度：', progressData);
// 						  },
// 						  success: function(data) {
// 							console.log('上传成功：', data);
// 						  },
// 						  error: function(err) {
// 							console.log('上传失败：', err);
// 						  }
// 						});
// 					  }
									});
							
							}
						}
}
</script>
<style lang="scss" scoped>

</style>
