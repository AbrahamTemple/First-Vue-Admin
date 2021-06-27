<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-crownfill"></i> 联系作者
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">如果你就觉得还可以，那就加个wx聊一下吧。</div>
            <div>
                <el-image
                        style="width: 250px; height: 250px"
                        :src="qr"
                        :fit="fill"></el-image>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "donate",
    data(){
        return{
            qr: 'http://8.135.100.252/image/2020-7-14/8afbf1a9-a4f1-4274-a24d-103869365b5b.png'
        }
    }
};
</script>

<style>
</style>
