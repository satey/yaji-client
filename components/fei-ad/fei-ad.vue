<template>
	<view style="height: 100%;">
		<swiper :indicator-dots="false" :circular="true"
			style="width: 100%;height: 100%;border-radius: 8rpx;overflow: hidden;" :autoplay="true" :interval="3000"
			:duration="1000">
			<block v-for="(item,index) in adList" :key="index">
				<swiper-item style="width: 100%;height: 100%;">
					<view class="swiper-item" style="width: 100%;height: 100%;">
						<image @click="adClick(item)" :src="item.image"
							style="width: 100%;height: 100%;border-radius: 8rpx;" mode="aspectFill">
						</image>
					</view>
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: ['type'],
		data() {
			return {
				adList: []
			}
		},
		mounted() {
			this.getAd()
		},
		methods: {
			//广告位
			getAd() {
				this.$api("adv.lists", {
					type: this.type
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.adList = res.data;
						this.$emit("changeAd", this.adList)
					}
				})
			},
			//点击广告
			adClick(item) {
				//0-》栈内   1=》默认浏览器打开   2=》app内WebView打开
				console.log(item)
				switch (item.is_external_links) {
					case 0:
						this.$u.route(item.url)
						break;
					case 1:
						// #ifdef H5
						window.location.href = item.url
						// #endif
						// #ifdef APP
						plus.runtime.openURL(item.url)
						// #endif
						break;
					case 2:
						this.$u.route("pages/joy/activity", {
							url: item.url,
							title: item.title
						})
						break;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>