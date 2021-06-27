<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-messagefill"></i> 开始聊天
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
                        <div class="adapter">
                            <ul class="List" id="msg-list">
                                <li :class="msg.mode" v-for="(msg,index) in messages" :key="index">
                                    <div class="Avatar" v-show="msg.showPs">
                                        <img src="http://8.135.100.252/image/2020-7-14/8afbf1a9-a4f1-4274-a24d-103869365b5b.png" class="Avatar-image" />
                                    </div>
                                    <div class="Messages">
                                        <div class="Message">
                                            <div class="Message-inner">{{msg.message}}</div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
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
    import { userData,loginUser } from "@/api/index";
    import {reactive} from "vue";
    export default {
        name: "WsChat",
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
                connection: "",
                options: [],
                messages: [],
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
                try {
                    this.wsObj = new WebSocket(this.wsUri);
                    this.initWsEvent();
                } catch (e) {
                    this.buildMessage(false,true,false,"WebSocket创建失败:"+e);
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
                this.buildMessage(false,true,false,this.form.desc);
                this.wsObj.send(JSON.stringify(data));
            },
            initWsEvent(){
                let _this = this;
                try {
                    this.wsObj.onopen = function () {
                        _this.buildMessage(false,true,false,"WebSocket连接成功:"+'\n'+_this.wsUri);
                    };
                    this.wsObj.onmessage = function (event) {
                        document.getElementById('msg-list').append();
                        if(event.data !== _this.form.desc) {
                            _this.buildMessage(true, false, true, event.data);
                        }
                    };
                    this.wsObj.onclose = function () {
                        _this.buildMessage(false,true,false,"WebSocket执行了关闭事件，连接已断开");
                    };
                    this.wsObj.onerror = function () {
                        _this.buildMessage(false,true,false,"WebSocket执行时发生错误，连接已断开");
                    };
                }catch (e) {
                    _this.buildMessage(false,true,false,"WebSocket连接失败:"+e);
                }
            },
            getData() {
                loginUser(this.query).then(res=>{
                    let body = reactive(res);
                    this.userId = -Number(body.data.id);
                    console.log(this.userId);
                    this.createWebSocket();
                });
                userData(this.query).then(res => {
                    let body = reactive(res);
                    body.data.forEach(d =>{
                        let option = {
                            value: Number(d.id),
                            label: d.username
                        };
                        this.options = this.options.concat(option);
                    });
                    console.log(this.options);
                });
            },
            buildMessage(left,right,show,msg){
                let message = {
                    mode:{
                        'Item': true,
                        'Item--left': left,
                        'Item--right': right
                    },
                    showPs: show,
                    message: msg
                };
                this.messages = this.messages.concat(message);
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
        }
    }
</script>

<style scoped>
.adapter{ height: 50vh;width: 100%;background: #111;box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);max-height: 720px;overflow: hidden scroll;}
.m-left{ margin-left: 2vh; }
.List {  list-style: none;  margin: 0;  padding: 20px;}
.Item {  display: -webkit-box;  display: flex;  -webkit-box-align: end;          align-items: flex-end;}
.Item + .Item {  margin-top: 8px;}
.Avatar {  border-radius: 50%;  overflow: hidden;  flex-shrink: 0;  -webkit-box-flex: 0;          flex-grow: 0;  height: 32px;  width: 32px;}
.Avatar-image {  display: block;  width: 100%;}
.Messages {  display: -webkit-box;  display: flex;  -webkit-box-orient: vertical;  -webkit-box-direction: normal;          flex-direction: column;}
.Message {  color: white;  letter-spacing: 0.5px;  line-height: 1.25;  font-weight: 300;  margin: 1px;}
.Message-inner {  background: #333;  display: inline-block;  max-width: 260px;  padding: 8px 16px;}
.Item--left .Messages {  margin-left: 16px;}
.Item--left .Message-inner {  border-radius: 0 16px 16px 0;}
.Item--left .Message:first-child .Message-inner {  border-top-left-radius: 16px;}
.Item--left .Message:last-child .Message-inner {  border-bottom-left-radius: 16px;}
.Item--right {  -webkit-box-pack: end;          justify-content: flex-end;}
.Item--right .Messages {  -webkit-box-align: end;          align-items: flex-end;}
.Item--right .Message-inner {  background-attachment: fixed;  background-image: -webkit-gradient(linear, left top, left bottom, from(#4A00E0), to(#FC466B));  background-image: linear-gradient(#4A00E0, #FC466B);  background-size: 100vw 100vh;  border-radius: 16px 0 0 16px;}
.Item--right .Message:first-child .Message-inner {  border-top-right-radius: 16px;}
.Item--right .Message:last-child .Message-inner {  border-bottom-right-radius: 16px;}
</style>
