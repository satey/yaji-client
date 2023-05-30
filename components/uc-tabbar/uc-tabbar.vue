<template>
    <u-tabbar style="" :value="current" @change="changeTab" :fixed="true" :placeholder="true" :border="true" activeColor="#ef4444" :safeAreaInsetBottom="true">
        <u-tabbar-item text="首页" name="/pages/index/index">
            <i class="ri-home-smile-fill text-3xl leading-none bg-gradient-to-b from-rose-500 to-rose-400 bg-clip-text text-transparent" slot="active-icon"></i>
            <i class="ri-home-smile-line text-3xl leading-none" slot="inactive-icon"></i>
        </u-tabbar-item>
        <u-tabbar-item text="动态" name="/pages/index/square">
            <i class="ri-compass-3-fill text-3xl leading-none bg-gradient-to-b from-rose-500 to-rose-400 bg-clip-text text-transparent" slot="active-icon"></i>
            <i class="ri-compass-3-line text-3xl leading-none" slot="inactive-icon"></i>
        </u-tabbar-item>
        <u-tabbar-item text="消息" name="/pages/index/message">
            <i class="ri-message-3-fill text-3xl leading-none bg-gradient-to-b from-rose-500 to-rose-400 bg-clip-text text-transparent" slot="active-icon"></i>
            <i class="ri-message-3-line text-3xl leading-none" slot="inactive-icon"></i>
        </u-tabbar-item>
        <u-tabbar-item text="我的" name="/pages/index/mine">
            <i class="ri-user-smile-fill text-3xl leading-none bg-gradient-to-b from-rose-500 to-rose-400 bg-clip-text text-transparent" slot="active-icon"></i>
            <i class="ri-user-smile-line text-3xl leading-none" slot="inactive-icon"></i>
        </u-tabbar-item>
    </u-tabbar>
</template>

<script>
export default {
    name: 'tabbar',
    components: {},
    data() {
        return {
            current: '/pages/index/index',
        }
    },
    mounted() {
        let that = this
        // console.log('path：' + this.$Route.path)
        that.current = that.$Route.path
    },
    computed: {},
    methods: {
        changeTab(name) {
            let that = this
            // console.log(name)
            that.current = name
            uni.redirectTo({
                url: name
            })
        },
    }
}
</script>

<style lang="scss">

</style>
