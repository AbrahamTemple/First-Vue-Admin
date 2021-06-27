<template>
    <div class="about">
        <v-header />
        <v-sidebar />
        <div class="content-box" :class="{ 'content-collapse': collapse }">
            <v-tags></v-tags>
            <div class="content">
                <router-view v-slot="{ Component }">
                    <transition name="move" mode="out-in">
                        <keep-alive :include="tagsList">
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
                <!-- <el-backtop target=".content"></el-backtop> -->
            </div>
        </div>
    </div>
</template>
<script>
import vHeader from "../components/Header";
import vSidebar from "../components/Sidebar";
import vTags from "../components/Tags.vue";
export default {
    components: {
        vHeader,
        vSidebar,
        vTags
    },
    computed: {
        tagsList() {
            return this.$store.state.tagsList.map(item => item.name);
        },
        collapse() {
            return this.$store.state.collapse;
        }
    },
    mounted() {
        let wsObj = null;
        let wsUri = null;
        let userId = -1;

        function createWebSocket() {
            // let host = window.location.host;
            let host = "localhost:8079";
            userId = GetQueryString("userId");
            wsUri = "ws://" + host + "/ws/websocket/" +userId;
            // wsUri = "ws://" + host + "/websocket/6";
            console.log(wsUri);
            try {
                wsObj = new WebSocket(wsUri);
                initWsEvent();
            } catch (e) {
                setMessageBody("创建失败:"+e);
            }
        }

        function initWsEvent() {
            try {
                wsObj.onopen = function () {
                    setMessageBody("WebSocket连接成功");
                };
                wsObj.onmessage = function (event) {
                    setMessageBody(event.data);
                };
                wsObj.onclose = function () {
                    setMessageBody("执行关闭事件，开始重连");
                };
                wsObj.onerror = function () {
                    setMessageBody("执行发生错误，开始重连");
                };
            }catch (e) {
                setMessageBody("连接失败:"+e);
            }
        }

        function setMessageBody(body){
            console.log(body);
        }
        /**
         * @return {string}
         */
        function GetQueryString(name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
            let r = window.location.search.substr(1).match(reg); //获取url中的?后的字符串并正则
            let context = "";
            if (r != null){
                context = r[2];
            }
            reg = null;
            r = null;
            return context == null || context === "" || context === "undefine"?"":context;
        }

        createWebSocket();
    }
};
</script>
