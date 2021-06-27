<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-forwardfill"></i> 其他入口
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row>
                <el-col :span="4" v-for="(item,index) in enter" :key="index" :offset="1" >
                    <div style="margin-top:15px;text-align: center">
                        <el-card :body-style="{ padding: '0px'}" shadow="hover">
                            <a :href="item.link">
                            <img :src="item.url" class="image">
                            <div>
                                <div class="bottom clearfix">
                                    <time class="time">{{ item.about }}</time>
                                    <el-button type="text" class="button" style="margin: 10px">快捷入口</el-button>
                                </div>
                            </div></a>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import store from '@/store/index'
    export default {
        name: "OtherEnter",
        data() {
            return {
                currentDate: new Date(),
                enter:[
                    {
                        name: 'Nacos',
                        url: require('@/assets/images/nacos.png'),
                        about: 'Alibaba服务注册及服务配置中心',
                        link: 'http://8.135.100.252:8848/nacos'
                    },
                    {
                        name: 'Sentinel',
                        url: require('@/assets/images/sentinel.png'),
                        about: 'Alibaba降级簇点监控面板',
                        link: 'http://8.135.100.252:8849'
                    },
                    {
                        name: 'RabbitMQ',
                        url: require('@/assets/images/rabbitmq.png'),
                        about: 'Spring官方推荐的消息中间件',
                        link: 'http://8.135.100.252:15672'
                    },
                    {
                        name: 'Swagger',
                        url: require('@/assets/images/swagger.png'),
                        about: 'OLife资源服务器所有业务',
                        link: 'http://124.71.82.74:8081/swagger-ui.html?access_token='+store.state.token
                    },
                    {
                        name: 'Github',
                        url: require('@/assets/images/github.png'),
                        about: '详细内容可参阅我的github',
                        link: 'https://github.com/AbrahamTemple'
                    }
                ]
            };
        }
    }
</script>

<style scoped>
    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>
