<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb10" style="height:252px;">
                    <div class="user-info">
                        <img src="../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{ name }}</div>
                            <div>{{ role }}</div>
                        </div>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <template #header>
                        <div class="clearfix">
                            <span>语言详情</span>
                        </div>
                    </template>
                    Vue
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>JavaScript
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>CSS
                    <el-progress :percentage="13.7"></el-progress>HTML
                    <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-s-custom grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">201</div>
                                    <div>今日访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-s-comment grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">618</div>
                                    <div>总消息量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-s-opportunity grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1874</div>
                                    <div>业务完成量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                        <schart class="schart" canvasId="pie" :options="options3"></schart>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover" class="mgb0">
                    <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover" class="mgb0">
                    <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from "vue-schart";
export default {
    name: "dashboard",
    data() {
        return {
            name: localStorage.getItem("username"),
            data: [
                {
                    name: "2018/09/04",
                    value: 1083
                },
                {
                    name: "2018/09/05",
                    value: 941
                },
                {
                    name: "2018/09/06",
                    value: 1139
                },
                {
                    name: "2018/09/07",
                    value: 816
                },
                {
                    name: "2018/09/08",
                    value: 327
                },
                {
                    name: "2018/09/09",
                    value: 228
                },
                {
                    name: "2018/09/10",
                    value: 1065
                }
            ],
            options: {
                type: "bar",
                title: {
                    text: "最近一周各业务销售图"
                },
                xRorate: 25,
                labels: ["周一", "周二", "周三", "周四", "周五"],
                datasets: [
                    {
                        label: "陪诊",
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: "挂号",
                        data: [164, 178, 190, 135, 160]
                    },
                    {
                        label: "咨询",
                        data: [144, 198, 150, 235, 120]
                    }
                ]
            },
            options2: {
                type: "line",
                title: {
                    text: "最近几个月各业务销售趋势图"
                },
                labels: ["6月", "7月", "8月", "9月", "10月"],
                datasets: [
                    {
                        label: "陪诊",
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: "挂号",
                        data: [164, 178, 150, 135, 160]
                    },
                    {
                        label: "咨询",
                        data: [74, 118, 200, 235, 90]
                    }
                ]
            },
            options3: {
                type: 'pie',
                title: {
                    text: '亚伯拉罕的总贡献图'
                },
                legend: {
                    position: 'left'
                },
                bgColor: '#fbfbfb',
                labels: ['Docker', 'RabbitMQ', 'Java', 'Spring', 'Vue', 'Linux', 'Golang'],
                datasets: [
                    {
                        data: [420, 230, 989, 679, 361, 440, 146]
                    }
                ]
            },
        };
    },
    components: {
        Schart
    },
    computed: {
        role() {
            return this.name === "admin" ? "超级管理员" : "普通用户";
        }
    },
    mounted() {

    },
    methods: {
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() +
                    1}/${date.getDate()}`;
            });
        },
    }
};
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.mgb10 {
    margin-bottom: -20px;
}

.mgb0 {
    margin-top: -60px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
#charts {
    position: fixed;
    width: 100%;
    height: 90%;
}
</style>
