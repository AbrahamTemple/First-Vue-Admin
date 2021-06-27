import {createStore} from 'vuex'

export default createStore({
    state: {
        name: "Abraham",
        token:'',
        permission: '',
        tagsList: [],
        collapse: false
    },
    mutations: {
        setPermission(state, permission) {
            state.permission = permission;
            sessionStorage.token = permission
        },
        delPermission(state) {
            state.token = '';
            sessionStorage.removeItem('permission')
        },
        setToken(state, token) {
            state.token = token;
            sessionStorage.token = token
        },
        delToken(state) {
            state.token = '';
            sessionStorage.removeItem('token')
        },
        delTagsItem(state, data) {
            state
                .tagsList
                .splice(data.index, 1);
        },
        setTagsItem(state, data) {
            state
                .tagsList
                .push(data)
        },
        clearTags(state) {
            state.tagsList = []
        },
        closeTagsOther(state, data) {
            state.tagsList = data;
        },
        closeCurrentTag(state, data) {
            for (let i = 0, len = state.tagsList.length; i < len; i++) {
                const item = state.tagsList[i];
                if (item.path === data.$route.fullPath) {
                    if (i < len - 1) {
                        data
                            .$router
                            .push(state.tagsList[i + 1].path);
                    } else if (i > 0) {
                        data
                            .$router
                            .push(state.tagsList[i - 1].path);
                    } else {
                        data
                            .$router
                            .push("/");
                    }
                    state
                        .tagsList
                        .splice(i, 1);
                    break;
                }
            }
        },
        // 侧边栏折叠
        hadndleCollapse(state, data) {
            state.collapse = data;
        }
    },
    actions: {},
    modules: {}
})
