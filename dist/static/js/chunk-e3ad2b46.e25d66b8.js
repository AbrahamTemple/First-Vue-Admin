(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e3ad2b46"],{"071e":function(e,t,o){"use strict";o.r(t);var c=o("7a23"),n=Object(c["withScopeId"])("data-v-4b9c287a");Object(c["pushScopeId"])("data-v-4b9c287a");var a={class:"crumbs"},s=Object(c["createVNode"])("i",{class:"el-icon-lx-messagefill"},null,-1),r=Object(c["createTextVNode"])(" 开始聊天 "),i=Object(c["createTextVNode"])("健康咨询"),l={class:"container"},u={class:"form-box"},d={class:"adapter"},b={class:"List",id:"msg-list"},f={class:"Avatar"},m=Object(c["createVNode"])("img",{src:"http://8.135.100.252/image/2020-7-14/8afbf1a9-a4f1-4274-a24d-103869365b5b.png",class:"Avatar-image"},null,-1),h={class:"Messages"},O={class:"Message"},g={class:"Message-inner"},j=Object(c["createTextVNode"])("取消");Object(c["popScopeId"])();var v=n((function(e,t,o,v,p,V){var w=Object(c["resolveComponent"])("el-breadcrumb-item"),N=Object(c["resolveComponent"])("el-breadcrumb"),k=Object(c["resolveComponent"])("el-option"),x=Object(c["resolveComponent"])("el-select"),y=Object(c["resolveComponent"])("el-button"),S=Object(c["resolveComponent"])("el-form-item"),T=Object(c["resolveComponent"])("el-input"),C=Object(c["resolveComponent"])("el-form");return Object(c["openBlock"])(),Object(c["createBlock"])("div",null,[Object(c["createVNode"])("div",a,[Object(c["createVNode"])(N,{separator:"/"},{default:n((function(){return[Object(c["createVNode"])(w,null,{default:n((function(){return[s,r]})),_:1}),Object(c["createVNode"])(w,null,{default:n((function(){return[i]})),_:1})]})),_:1})]),Object(c["createVNode"])("div",l,[Object(c["createVNode"])("div",u,[Object(c["createVNode"])(C,{ref:"form",model:p.form,"label-width":"80px"},{default:n((function(){return[Object(c["createVNode"])(S,{label:"选择用户"},{default:n((function(){return[Object(c["createVNode"])(x,{modelValue:p.value,"onUpdate:modelValue":t[1]||(t[1]=function(e){return p.value=e}),clearable:"",placeholder:"请选择",onChange:V.onLoading},{default:n((function(){return[(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(p.options,(function(e){return Object(c["openBlock"])(),Object(c["createBlock"])(k,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","onChange"]),Object(c["createVNode"])(y,{type:"success",loading:p.loading,onClick:V.onLoading,class:"m-left"},{default:n((function(){return[Object(c["createTextVNode"])(Object(c["toDisplayString"])(p.selectText),1)]})),_:1},8,["loading","onClick"])]})),_:1}),Object(c["createVNode"])(S,{label:"咨询消息"},{default:n((function(){return[Object(c["createVNode"])("div",d,[Object(c["createVNode"])("ul",b,[(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(p.messages,(function(e,t){return Object(c["openBlock"])(),Object(c["createBlock"])("li",{class:e.mode,key:t},[Object(c["withDirectives"])(Object(c["createVNode"])("div",f,[m],512),[[c["vShow"],e.showPs]]),Object(c["createVNode"])("div",h,[Object(c["createVNode"])("div",O,[Object(c["createVNode"])("div",g,Object(c["toDisplayString"])(e.message),1)])])],2)})),128))])])]})),_:1}),Object(c["createVNode"])(S,{label:"文本框"},{default:n((function(){return[Object(c["createVNode"])(T,{type:"textarea",rows:"5",modelValue:p.form.desc,"onUpdate:modelValue":t[2]||(t[2]=function(e){return p.form.desc=e})},null,8,["modelValue"])]})),_:1}),Object(c["createVNode"])(S,null,{default:n((function(){return[Object(c["createVNode"])(y,{type:"primary",loading:p.loading,onClick:V.onSubmit},{default:n((function(){return[Object(c["createTextVNode"])(Object(c["toDisplayString"])(p.submitText),1)]})),_:1},8,["loading","onClick"]),Object(c["createVNode"])(y,null,{default:n((function(){return[j]})),_:1})]})),_:1})]})),_:1},8,["model"])])])])})),p=(o("a9e3"),o("159b"),o("99af"),o("365c")),V={name:"WsChat",data:function(){return{wsObj:"",wsUri:"",userId:0,sendBody:"",form:{ws:"",desc:""},query:{address:"",username:"",password:"",client_id:"",sex:"",phone:"",identify:"",pageIndex:1,pageSize:10,access_token:this.$store.state.token},connection:"",options:[],messages:[],value:"",loading:!1,selectText:"确定链接",loadText:"加载中",submitText:"发送消息"}},created:function(){this.getData()},methods:{createWebSocket:function(){var e="124.71.82.74:8083";this.wsUri="ws://"+e+"/websocket/"+this.userId;try{this.wsObj=new WebSocket(this.wsUri),this.initWsEvent()}catch(t){this.buildMessage(!1,!0,!1,"WebSocket创建失败:"+t)}},sendMessageBody:function(){var e=""!==this.value?[this.userId,this.value]:[],t={persons:e,msg:this.form.desc,ism:!1};this.buildMessage(!1,!0,!1,this.form.desc),this.wsObj.send(JSON.stringify(t))},initWsEvent:function(){var e=this;try{this.wsObj.onopen=function(){e.buildMessage(!1,!0,!1,"WebSocket连接成功:\n"+e.wsUri)},this.wsObj.onmessage=function(t){document.getElementById("msg-list").append(),t.data!==e.form.desc&&e.buildMessage(!0,!1,!0,t.data)},this.wsObj.onclose=function(){e.buildMessage(!1,!0,!1,"WebSocket执行了关闭事件，连接已断开")},this.wsObj.onerror=function(){e.buildMessage(!1,!0,!1,"WebSocket执行时发生错误，连接已断开")}}catch(t){e.buildMessage(!1,!0,!1,"WebSocket连接失败:"+t)}},getData:function(){var e=this;Object(p["h"])(this.query).then((function(t){var o=Object(c["reactive"])(t);e.userId=-Number(o.data.id),console.log(e.userId),e.createWebSocket()})),Object(p["k"])(this.query).then((function(t){var o=Object(c["reactive"])(t);o.data.forEach((function(t){var o={value:Number(t.id),label:t.username};e.options=e.options.concat(o)})),console.log(e.options)}))},buildMessage:function(e,t,o,c){var n={mode:{Item:!0,"Item--left":e,"Item--right":t},showPs:o,message:c};this.messages=this.messages.concat(n)},onSubmit:function(){var e=this;this.loading=!0,this.submiText=this.loadText;try{setTimeout((function(){e.loading=!1,e.submitText="发送消息",e.sendMessageBody(),e.$message.success("提交成功！")}),1e3)}catch(t){console.log(t),this.$message.error("提交失败！")}},onLoading:function(){var e=this;this.loading=!0,this.selectText=this.loadText,setTimeout((function(){e.loading=!1,e.selectText="确定连接",e.$message.success("已修改发送目标为"+e.value+"号用户")}),1e3)}},mounted:function(){}};o("4945");V.render=v,V.__scopeId="data-v-4b9c287a";t["default"]=V},"159b":function(e,t,o){var c=o("da84"),n=o("fdbc"),a=o("17c2"),s=o("9112");for(var r in n){var i=c[r],l=i&&i.prototype;if(l&&l.forEach!==a)try{s(l,"forEach",a)}catch(u){l.forEach=a}}},"17c2":function(e,t,o){"use strict";var c=o("b727").forEach,n=o("a640"),a=n("forEach");e.exports=a?[].forEach:function(e){return c(this,e,arguments.length>1?arguments[1]:void 0)}},4945:function(e,t,o){"use strict";o("d8c2")},"99af":function(e,t,o){"use strict";var c=o("23e7"),n=o("d039"),a=o("e8b5"),s=o("861d"),r=o("7b0b"),i=o("50c4"),l=o("8418"),u=o("65f0"),d=o("1dde"),b=o("b622"),f=o("2d00"),m=b("isConcatSpreadable"),h=9007199254740991,O="Maximum allowed index exceeded",g=f>=51||!n((function(){var e=[];return e[m]=!1,e.concat()[0]!==e})),j=d("concat"),v=function(e){if(!s(e))return!1;var t=e[m];return void 0!==t?!!t:a(e)},p=!g||!j;c({target:"Array",proto:!0,forced:p},{concat:function(e){var t,o,c,n,a,s=r(this),d=u(s,0),b=0;for(t=-1,c=arguments.length;t<c;t++)if(a=-1===t?s:arguments[t],v(a)){if(n=i(a.length),b+n>h)throw TypeError(O);for(o=0;o<n;o++,b++)o in a&&l(d,b,a[o])}else{if(b>=h)throw TypeError(O);l(d,b++,a)}return d.length=b,d}})},a640:function(e,t,o){"use strict";var c=o("d039");e.exports=function(e,t){var o=[][e];return!!o&&c((function(){o.call(null,t||function(){throw 1},1)}))}},d8c2:function(e,t,o){}}]);