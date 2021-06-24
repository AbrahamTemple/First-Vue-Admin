<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem, i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
// import bus from "../common/bus";
export default {
    data() {
        return {
            items: [
                {
                    icon: "el-icon-lx-home",
                    index: "dashboard",
                    title: "系统首页"
                },
                {
                    icon: "el-icon-lx-friend",
                    index: "table",
                    title: "基础表格",
                    subs: [
                        {
                            index: "ou-table",
                            title: "OLife用户表单"
                        },
                        {
                            index: "of-table",
                            title: "OLife亲属表单"
                        },
                        {
                            index: "oh-table",
                            title: "OLife医院表单"
                        },
                        {
                            index: "od-table",
                            title: "OLife医生表单"
                        },
                        {
                            index: "os-table",
                            title: "OLife护工表单"
                        },
                        {
                            index: "oes-table",
                            title: "OLife预约表单"
                        },
                        {
                            index: "oca-table",
                            title: "OLife通话表单"
                        },
                        {
                            index: "ore-table",
                            title: "OLife挂号表单"
                        },
                        {
                            index: "oad-table",
                            title: "OLife咨询表单"
                        },
                    ]
                },
                {
                    icon: "el-icon-lx-info",
                    index: "tabs",
                    title: "任务消息"
                },
                {
                    icon: "el-icon-lx-message",
                    index: "chat",
                    title: "开始聊天"
                },
                {
                    icon: "el-icon-lx-emoji",
                    index: "icon",
                    title: "图标样式"
                },
                {
                    icon: "el-icon-lx-forward",
                    index: "enter",
                    title: "其它入口"
                },
                {
                    icon: "el-icon-lx-global",
                    index: "i18n",
                    title: "国际化"
                },
                {
                    icon: "el-icon-lx-warn",
                    index: "7",
                    title: "错误页面",
                    subs: [
                        {
                            index: "403",
                            title: "401页面"
                        },
                        {
                            index: "404",
                            title: "404页面"
                        }
                    ]
                },
                {
                    icon: "el-icon-lx-crown",
                    index: "/contact",
                    title: "联系作者"
                }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace("/", "");
        },
        collapse(){
            return this.$store.state.collapse
        }
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
