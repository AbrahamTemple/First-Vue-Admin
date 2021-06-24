<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 咨询
                </el-breadcrumb-item>
                <el-breadcrumb-item>健康咨询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="选择用户">
                        <el-select v-model="value" clearable placeholder="请选择" @change="onLoading">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button type="success" :loading="loading" @click="onLoading" class="m-left">{{selectText}}</el-button>
                    </el-form-item>
                    <el-form-item label="咨询消息">
                        <el-input type="textarea" rows="10" v-model="form.ws" id="scroll_text"></el-input>
                    </el-form-item>
                    <el-form-item label="文本框">
                        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :loading="loading" @click="onSubmit">{{submitText}}</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import { userData } from "@/api/index";
    import {reactive} from "vue";
    export default {
        name: "JWChat",
        data() {
            return {
                wsObj: '',
                wsUri: '',
                userId: 0,
                sendBody: '',
                form: {
                    ws: '',
                    desc: '',
                },
                query: {
                    address: "",
                    username: "",
                    password: "",
                    client_id: "",
                    sex: "",
                    phone: "",
                    identify: "",
                    pageIndex: 1,
                    pageSize: 10,
                    access_token: this.$store.state.token
                },
                options: [{
                    value: '1',
                    label: '黄金糕'
                }, {
                    value: '2',
                    label: '双皮奶'
                }, {
                    value: '3',
                    label: '蚵仔煎'
                }, {
                    value: '4',
                    label: '龙须面'
                }, {
                    value: '5',
                    label: '北京烤鸭'
                }],
                value: '',
                loading: false,
                selectText: '确定链接',
                loadText: '加载中',
                submitText: '发送消息'
            };
        },
        created() {
            this.getData();
        },
        methods: {
            createWebSocket() {
                let host = "124.71.82.74:8083";
                this.wsUri = "ws://" + host + "/websocket/" +this.userId;
                console.log(this.wsUri);
                try {
                    this.wsObj = new WebSocket(this.wsUri);
                    this.initWsEvent();
                } catch (e) {
                    console.log("创建失败:"+e);
                }
            },
            sendMessageBody() {
                //如果指定发送对象就定点推送，如果没有则群发
                let personList=this.value!==''?[this.userId,this.value]:[];
                let data = {
                    "persons": personList,
                    "msg": this.form.desc,
                    "ism": false
                };
                this.wsObj.send(JSON.stringify(data));
            },
            initWsEvent(){
                try {
                    this.wsObj.onopen = function () {
                        console.log("WebSocket连接成功");
                    };
                    this.wsObj.onmessage = function (event) {
                        document.getElementById('scroll_text').append(event.data + '\n')
                    };
                    this.wsObj.onclose = function () {
                        console.log("执行关闭事件，开始重连");
                    };
                    this.wsObj.onerror = function () {
                        console.log("执行发生错误，开始重连");
                    };
                }catch (e) {
                    console.log("连接失败:"+e);
                }
            },
            getData() {
                userData(this.query).then(res => {
                    let body = reactive(res);
                    this.userId = -Number(body.data.id);
                    console.log(this.userId);
                    this.createWebSocket();
                });
            },
            onSubmit() {
                this.loading = true;
                this.submiText = this.loadText;
                try {
                    setTimeout(() => {
                        this.loading = false;
                        this.submitText = '发送消息';
                        this.sendMessageBody();
                        this.$message.success('提交成功！');
                    },1000);
                } catch (e) {
                    console.log(e);
                    this.$message.error('提交失败！');
                }
            },
            onLoading(){
                this.loading = true;
                this.selectText = this.loadText;
                setTimeout(() => {
                   this.loading = false;
                   this.selectText = '确定连接';
                   this.$message.success('已修改发送目标为'+this.value+'号用户');
                },1000);
            }
        },
        mounted() {
            this.$nextTick(() => {
                setTimeout(() => {
                    const textarea = document.getElementById('scroll_text');
                    textarea.scrollTop = textarea.scrollHeight;
                }, 13)
            });
        }
    }
</script>

<style scoped>
.m-left{
    margin-left: 2vh;
}
</style>
