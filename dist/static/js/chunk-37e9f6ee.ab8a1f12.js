(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-37e9f6ee"],{"04b9":function(e,t,i){"use strict";i.d(t,"c",(function(){return n})),i.d(t,"a",(function(){return r})),i.d(t,"d",(function(){return o})),i.d(t,"e",(function(){return s})),i.d(t,"b",(function(){return c}));var a=i("b775");function n(e){return Object(a["a"])({url:"/electric/data/getEleDetail",method:"get",params:e})}function r(e){return Object(a["a"])({url:"/electric/data/addMonitoringName",method:"get",params:e})}function o(e){return Object(a["a"])({url:"/electric/data/getMonitoringList",method:"get",params:e})}function s(e){return Object(a["a"])({url:"/electric/data/removeMonitoring",method:"get",params:e})}function c(e){return Object(a["a"])({url:"/electric/data/getDeviceList",method:"get",params:e})}},"163d":function(e,t,i){"use strict";i("cd2d")},"63ec":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container"},[i("el-card",{staticClass:"box-card"},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",[e._v("用户监测点信息")]),i("div",{staticClass:"header-btn",staticStyle:{float:"right"}},[i("el-button",{staticStyle:{padding:"3px 0"},attrs:{type:"text"},on:{click:e.addMonitoring}},[e._v("新增监测点")]),i("el-button",{staticStyle:{padding:"3px 0"},attrs:{type:"text"},on:{click:e.removeMonitoring}},[e._v("删除监测点")])],1)]),i("el-table",{staticStyle:{width:"100%"},attrs:{data:e.monitoringList,stripe:"",border:""}},[e._v(" > "),i("el-table-column",{attrs:{width:"30"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-radio",{attrs:{label:t.row.id},model:{value:e.selectRadio,callback:function(t){e.selectRadio=t},expression:"selectRadio"}},[i("span")])]}}])}),i("el-table-column",{attrs:{prop:"name",label:"监测点名称"}}),i("el-table-column",{attrs:{prop:"equipmentList",label:"监测点设备"}})],1)],1),i("el-card",{staticClass:"box-card"},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",[e._v("监测点设备信息")]),i("div",{staticClass:"header-btn",staticStyle:{float:"right"}},[i("el-button",{staticStyle:{padding:"3px 0"},attrs:{type:"text"},on:{click:e.addDevice}},[e._v("新增")]),i("el-button",{staticStyle:{padding:"3px 0"},attrs:{type:"text"},on:{click:e.removeDevice}},[e._v("删除")])],1)])]),i("el-dialog",{attrs:{title:"新增监测点",visible:e.monitoringVisible},on:{"update:visible":function(t){e.monitoringVisible=t}}},[i("el-form",{ref:"form",attrs:{model:e.formMonitoringName,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"监测点名称",prop:"name"}},[i("el-input",{model:{value:e.formMonitoringName.name,callback:function(t){e.$set(e.formMonitoringName,"name",t)},expression:"formMonitoringName.name"}})],1)],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.monitoringVisible=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:e.saveName}},[e._v("确 定")])],1)],1),i("el-dialog",{attrs:{title:"新增监测点",visible:e.deviceVisible,width:"80%"},on:{"update:visible":function(t){e.deviceVisible=t}}},[i("el-form",{ref:"form",attrs:{model:e.formDevice,"label-width":"80px",inline:!0}},[i("el-form-item",{attrs:{label:"设备名称",prop:"name"}},[i("el-input",{model:{value:e.formDevice.name,callback:function(t){e.$set(e.formDevice,"name",t)},expression:"formDevice.name"}})],1),i("el-form-item",{attrs:{label:"设备类型",prop:"name"}},[i("el-input",{model:{value:e.formDevice.type,callback:function(t){e.$set(e.formDevice,"type",t)},expression:"formDevice.type"}})],1),i("el-button",{attrs:{type:"primary"},on:{click:e.searchDevice}},[e._v("选择设备")])],1)],1),i("el-dialog",{attrs:{title:"查询设备",visible:e.searchDeviceVisible,width:"80%"},on:{"update:visible":function(t){e.searchDeviceVisible=t}}},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:e.deviceList,stripe:"",border:""}},[e._v(" > "),i("el-table-column",{attrs:{width:"30"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-radio",{attrs:{label:t.row.id},model:{value:e.selectRadio,callback:function(t){e.selectRadio=t},expression:"selectRadio"}},[i("span")])]}}])}),i("el-table-column",{attrs:{prop:"name",label:"设备名称",width:"300"}}),i("el-table-column",{attrs:{prop:"desc",label:"设备描述"}}),i("el-table-column",{attrs:{prop:"platform_address",label:"平台地址"}}),i("el-table-column",{attrs:{prop:"area_code",label:"区域码",width:"100"}}),i("el-table-column",{attrs:{prop:"enable",label:"是否启用",width:"50"}}),i("el-table-column",{attrs:{prop:"dev_type",label:"设备类型"}}),i("el-table-column",{attrs:{prop:"passageway",label:"所属通道"}})],1),i("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:1e3}})],1)],1)},n=[],r=i("1da1"),o=i("5530"),s=(i("b0c0"),i("96cf"),i("04b9")),c=i("2f62"),l={name:"electircSafety",data:function(){return{monitoringList:[],selectRadio:"",monitoringVisible:!1,deviceVisible:!1,searchDeviceVisible:!1,formMonitoringName:{name:""},formDevice:{name:"",type:""},deviceList:[{id:123,name:"abc"}],deviceTotal:0}},computed:Object(o["a"])({},Object(c["b"])(["uid"])),mounted:function(){this.getMonitoring()},methods:{addMonitoring:function(){this.monitoringVisible=!0},initDeviceList:function(e,t){var i=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var n,r,o,c,l;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n={pageNum:e,pageSize:t},a.next=3,Object(s["b"])(n);case 3:r=a.sent,console.log(r),2e4==r.code&&(o=r.data,c=o.count,l=o.list,i.deviceTotal=c,i.deviceList=l);case 6:case"end":return a.stop()}}),a)})))()},getMonitoring:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var i,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(s["d"])({uid:e.uid});case 2:i=t.sent,i.code,a=i.data,e.monitoringList=a,console.log(111,a);case 7:case"end":return t.stop()}}),t)})))()},saveName:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var i,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.formMonitoringName.name){t.next=3;break}return e.$message({message:"请填写监测点名称",type:"warning"}),t.abrupt("return");case 3:return console.log(e.uid),t.next=6,Object(s["a"])({name:e.formMonitoringName.name,uid:e.uid});case 6:i=t.sent,a=i.code,i.data,2e4==a?(e.getMonitoring(),e.$message({message:"添加成功",type:"success"}),e.monitoringVisible=!1):e.$message.error("添加失败"),console.log(a);case 11:case"end":return t.stop()}}),t)})))()},removeMonitoring:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var i,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.selectRadio){t.next=3;break}return e.$message.error("请选择要删除的监测点"),t.abrupt("return");case 3:return console.log(e.selectRadio),t.next=6,Object(s["e"])({id:e.selectRadio});case 6:i=t.sent,a=i.code,2e4==a&&(e.$message({message:"删除成功",type:"success"}),e.getMonitoring());case 9:case"end":return t.stop()}}),t)})))()},addDevice:function(){this.selectRadio?this.deviceVisible=!0:this.$message.error("请选择监测点")},removeDevice:function(){},searchDevice:function(){this.initDeviceList(0,10),this.searchDeviceVisible=!0}}},d=l,u=(i("163d"),i("2877")),m=Object(u["a"])(d,a,n,!1,null,"7d447da2",null);t["default"]=m.exports},cd2d:function(e,t,i){}}]);