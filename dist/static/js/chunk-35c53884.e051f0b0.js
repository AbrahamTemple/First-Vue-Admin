(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-35c53884"],{"071e":function(e,t,o){"use strict";o.r(t);var n=o("7a23"),c=Object(n["withScopeId"])("data-v-48ed5642");Object(n["pushScopeId"])("data-v-48ed5642");var l={class:"crumbs"},a=Object(n["createVNode"])("i",{class:"el-icon-lx-calendar"},null,-1),s=Object(n["createTextVNode"])(" 咨询 "),r=Object(n["createTextVNode"])("健康咨询"),i={class:"container"},u={class:"form-box"},d=Object(n["createTextVNode"])("取消");Object(n["popScopeId"])();var b=c((function(e,t,o,b,f,m){var j=Object(n["resolveComponent"])("el-breadcrumb-item"),O=Object(n["resolveComponent"])("el-breadcrumb"),p=Object(n["resolveComponent"])("el-option"),h=Object(n["resolveComponent"])("el-select"),v=Object(n["resolveComponent"])("el-button"),g=Object(n["resolveComponent"])("el-form-item"),V=Object(n["resolveComponent"])("el-input"),w=Object(n["resolveComponent"])("el-form");return Object(n["openBlock"])(),Object(n["createBlock"])("div",null,[Object(n["createVNode"])("div",l,[Object(n["createVNode"])(O,{separator:"/"},{default:c((function(){return[Object(n["createVNode"])(j,null,{default:c((function(){return[a,s]})),_:1}),Object(n["createVNode"])(j,null,{default:c((function(){return[r]})),_:1})]})),_:1})]),Object(n["createVNode"])("div",i,[Object(n["createVNode"])("div",u,[Object(n["createVNode"])(w,{ref:"form",model:f.form,"label-width":"80px"},{default:c((function(){return[Object(n["createVNode"])(g,{label:"选择用户"},{default:c((function(){return[Object(n["createVNode"])(h,{modelValue:f.value,"onUpdate:modelValue":t[1]||(t[1]=function(e){return f.value=e}),clearable:"",placeholder:"请选择",onChange:m.onLoading},{default:c((function(){return[(Object(n["openBlock"])(!0),Object(n["createBlock"])(n["Fragment"],null,Object(n["renderList"])(f.options,(function(e){return Object(n["openBlock"])(),Object(n["createBlock"])(p,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","onChange"]),Object(n["createVNode"])(v,{type:"success",loading:f.loading,onClick:m.onLoading,class:"m-left"},{default:c((function(){return[Object(n["createTextVNode"])(Object(n["toDisplayString"])(f.selectText),1)]})),_:1},8,["loading","onClick"])]})),_:1}),Object(n["createVNode"])(g,{label:"咨询消息"},{default:c((function(){return[Object(n["createVNode"])(V,{type:"textarea",rows:"10",modelValue:f.form.ws,"onUpdate:modelValue":t[2]||(t[2]=function(e){return f.form.ws=e}),id:"scroll_text"},null,8,["modelValue"])]})),_:1}),Object(n["createVNode"])(g,{label:"文本框"},{default:c((function(){return[Object(n["createVNode"])(V,{type:"textarea",rows:"5",modelValue:f.form.desc,"onUpdate:modelValue":t[3]||(t[3]=function(e){return f.form.desc=e})},null,8,["modelValue"])]})),_:1}),Object(n["createVNode"])(g,null,{default:c((function(){return[Object(n["createVNode"])(v,{type:"primary",loading:f.loading,onClick:m.onSubmit},{default:c((function(){return[Object(n["createTextVNode"])(Object(n["toDisplayString"])(f.submitText),1)]})),_:1},8,["loading","onClick"]),Object(n["createVNode"])(v,null,{default:c((function(){return[d]})),_:1})]})),_:1})]})),_:1},8,["model"])])])])})),f=(o("a9e3"),o("365c")),m={name:"JWChat",data:function(){return{wsObj:"",wsUri:"",userId:0,sendBody:"",form:{ws:"",desc:""},query:{address:"",username:"",password:"",client_id:"",sex:"",phone:"",identify:"",pageIndex:1,pageSize:10,access_token:this.$store.state.token},options:[{value:"1",label:"黄金糕"},{value:"2",label:"双皮奶"},{value:"3",label:"蚵仔煎"},{value:"4",label:"龙须面"},{value:"5",label:"北京烤鸭"}],value:"",loading:!1,selectText:"确定链接",loadText:"加载中",submitText:"发送消息"}},created:function(){this.getData()},methods:{createWebSocket:function(){var e="124.71.82.74:8083";this.wsUri="ws://"+e+"/websocket/"+this.userId,console.log(this.wsUri);try{this.wsObj=new WebSocket(this.wsUri),this.initWsEvent()}catch(t){console.log("创建失败:"+t)}},sendMessageBody:function(){var e=""!==this.value?[this.userId,this.value]:[],t={persons:e,msg:this.form.desc,ism:!1};this.wsObj.send(JSON.stringify(t))},initWsEvent:function(){try{this.wsObj.onopen=function(){console.log("WebSocket连接成功")},this.wsObj.onmessage=function(e){document.getElementById("scroll_text").append(e.data+"\n")},this.wsObj.onclose=function(){console.log("执行关闭事件，开始重连")},this.wsObj.onerror=function(){console.log("执行发生错误，开始重连")}}catch(e){console.log("连接失败:"+e)}},getData:function(){var e=this;Object(f["j"])(this.query).then((function(t){var o=Object(n["reactive"])(t);e.userId=-Number(o.data.id),console.log(e.userId),e.createWebSocket()}))},onSubmit:function(){var e=this;this.loading=!0,this.submiText=this.loadText;try{setTimeout((function(){e.loading=!1,e.submitText="发送消息",e.sendMessageBody(),e.$message.success("提交成功！")}),1e3)}catch(t){console.log(t),this.$message.error("提交失败！")}},onLoading:function(){var e=this;this.loading=!0,this.selectText=this.loadText,setTimeout((function(){e.loading=!1,e.selectText="确定连接",e.$message.success("已修改发送目标为"+e.value+"号用户")}),1e3)}},mounted:function(){this.$nextTick((function(){setTimeout((function(){var e=document.getElementById("scroll_text");e.scrollTop=e.scrollHeight}),13)}))}};o("d505");m.render=b,m.__scopeId="data-v-48ed5642";t["default"]=m},"80f8":function(e,t,o){},d505:function(e,t,o){"use strict";o("80f8")}}]);