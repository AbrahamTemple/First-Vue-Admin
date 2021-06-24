import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import store from '../store/index'

if (sessionStorage.getItem('token')) {

    store.commit('set_token', sessionStorage.getItem('token'))
    // console.log(this.$store.state.token)
}

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import (
                "../views/Dashboard.vue")
            }, {
                path: "/ou-table",
                name: "olife-user",
                meta: {
                    title: '表格',
                    permission: true
                },
                component: () => import (
                "../views/tables/UserTable")
            }, {
                path: "/of-table",
                name: "olife-family",
                meta: {
                    title: '表格',
                    permission: true
                },
                component: () => import (
                    "../views/tables/FamilyTable")
            }, {
                path: "/od-table",
                name: "olife-doctor",
                meta: {
                    title: '表格',
                    permission: true
                },
                component: () => import (
                    "../views/tables/ExpertTable")
            }, {
                path: "/oh-table",
                name: "olife-hospital",
                meta: {
                    title: '表格',
                    permission: true
                },
                component: () => import (
                    "../views/tables/HospitalTable")
            }, {
                path: "/os-table",
                name: "olife-staff",
                meta: {
                    title: '表格',
                    permission: true
                },
                component: () => import (
                    "../views/tables/StaffTable")
            }, {
                path: "/oad-table",
                name: "olife-chat",
                meta: {
                    title: '表格',
                    permission: true
                },
                component: () => import (
                    "../views/tables/AdvisoryTable")
            }, {
                path: "/oca-table",
                name: "olife-call",
                meta: {
                    title: '表格',
                    permission: true
                },
                component: () => import (
                    "../views/tables/CalloutTable")
            }, {
                path: "/ore-table",
                name: "olife-register",
                meta: {
                    title: '表格',
                    permission: true
                },
                component: () => import (
                    "../views/tables/RegisterTable")
            }, {
                path: "/oes-table",
                name: "olife-escort",
                meta: {
                    title: '表格',
                    permission: true
                },
                component: () => import (
                    "../views/tables/EscortTable")
            }, {
                path: "/enter",
                name: "enter",
                meta: {
                    title: '其他入口'
                },
                component: () => import (
                "../views/OtherEnter.vue")
            }, {
                path: "/chat",
                name: "chat",
                meta: {
                    title: '开始聊天'
                },
                component: () => import (
                "../views/WsChat.vue")
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: '任务消息'
                },
                component: () => import (
                "../views/Tabs.vue")
            }, {
                path: "/contact",
                name: "contact",
                meta: {
                    title: '鼓励作者'
                },
                component: () => import (
                "../views/Contact.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permission: 'admin'
                },
                component: () => import (
                "../views/Permission.vue")
            }, {
                path: "/i18n",
                name: "i18n",
                meta: {
                    title: '国际化语言'
                },
                component: () => import (
                "../views/I18n.vue")
            }, {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件'
                },
                component: () => import (
                "../views/Upload.vue")
            }, {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '图标样式'
                },
                component: () => import (
                "../views/Icon.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: '页面丢失'
                },
                component: () => import (
                '../views/404')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import (
                    '../views/403.vue')
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import (
        /* webpackChunkName: "login" */
        "../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 亚伯拉罕的家`;
    const role = localStorage.getItem('username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入
        store.state.permission==='admin'
            ? next(): next('/403');
    } else {
        next();
    }

});

export default router;
