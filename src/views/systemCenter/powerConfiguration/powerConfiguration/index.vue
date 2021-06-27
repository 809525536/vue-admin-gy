<template>
  <div class="app-containerjsmind">
    <el-card class="box-card searchCondition">
      <div class="text item">
        <!-- format="yyyy 年 MM 月 dd 日" -->
        <span><i>所挂设备名称: </i>vfvfv</span>

        <span class="endTime"><i>所挂监测点名称: </i>crcrvrvr</span>

        <div class="searchCondition">
          <el-button class="DatSearch" size="small" plain>保存</el-button>
          <el-button
            type="primary"
            @click="search"
            class="DatSearch"
            size="small"
            >连线</el-button
          >
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <!-- <div slot="header" class="clearfix">
        <span>用电报表</span>
        <el-button style="float: right; padding: 3px 0" type="text"
          >导出</el-button
        >
      </div> -->
      <div class="text item" style="width:600px">
        <div id="jsmind_container"></div>
        <div class="btn-box">
          <button class="getDataBtn" @click="getData();">获取数据</button>
          <button @click="alignType('full');">两端对齐</button>
          <button @click="alignType('side');">右对齐</button>
          <button id="downloadJson">导出生成json文件</button>
          <button id="downloadTxt">导出生成文本</button>
          <button id="downloadYtm">导出生成自定义格式</button>
          <button id="importData">导入数据</button>
          <input id="importInput" type="file" @change="importFn(this)" />
        </div>

        <!--上传文件框-->
        <input id="fileInput" type="file" hidden />

        <!--右键菜单-->
        <ul id="right_menu">
          <li onclick="add_subNode();">
            <em class="iconfont">&#xe639;</em><span>同级</span>
          </li>
          <li onclick="add_node();">
            <em class="iconfont">&#xe639;</em><span>下级</span>
          </li>
          <li onclick="delete_node();">
            <em class="iconfont">&#xe618;</em><span>删除</span>
          </li>
          <li onclick="showRemark();">
            <em class="iconfont">&#xe7d1;</em><span>备注</span>
          </li>
          <li onclick="delRemark();">
            <em class="iconfont">&#xe618;</em><span>删除备注</span>
          </li>
          <li onclick="addFile();">
            <em class="iconfont">&#xe620;</em><span>添加附件</span>
          </li>
          <li onclick="delFile();">
            <em class="iconfont">&#xe618;</em><span>删除附件</span>
          </li>
        </ul>
        <!--备注弹框-->
        <div id="remark_box" class="remarkBox">
          <div class="remarkHint"></div>
          <div class="remarkContent">
            <h5 class="rmarkTitle">请录入节点备注</h5>
            <div class="remarkBtn">
              <button id="remark_sureBtn">确定</button>
              <button id="remark_canaelBtn">取消</button>
            </div>
            <textarea id="remark_input" class="remarkInput"></textarea>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getEleReport } from "@/api/ele";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      mind: null, //初始数据
      jm: null, //思维图对象
      thisNodeData: null, //当前节点数据
      //var newmarksId = [];,//新增的备注或附件标记
      testData: {
        data: [
          {
            id: "root",
            topic: "2018年工作计划",
            expanded: true,
            isroot: true,
            remarkText: "这是一个备注",
          },
          {
            id: "41abefefbc9da005",
            topic: "第一季度",
            expanded: true,
            parentid: "root",
            direction: "left",
            remarkText: "这也是一个备注",
            fileInfo: "C:\fakepath微信图片_20180710151642.png",
          },
          {
            id: "41abf045666386de",
            topic: "第二季度",
            expanded: true,
            parentid: "root",
            direction: "left",
            remarkText: "这还是一个备注",
          },
          {
            id: "41abf2e6b681d777",
            topic: "4月",
            expanded: true,
            parentid: "41abf045666386de",
            remarkText: "啦啦啦啦",
            fileInfo: "C:\fakepath微信图片_20180710151642.png",
          },
          {
            id: "41abf31d2a52a487",
            topic: "5月份",
            expanded: true,
            parentid: "41abf045666386de",
            remarkText: null,
            fileInfo: "C:\fakepath微信图片_20180710151642.png",
          },
          {
            id: "41abf35b4a50500c",
            topic: "6月",
            expanded: true,
            parentid: "41abf045666386de",
            remarkText: "",
          },
          {
            id: "41ac73446cb9d4c5",
            topic: "第一周",
            expanded: true,
            parentid: "41abf35b4a50500c",
            remarkText: "啦啦啦啦",
          },
          {
            id: "41ac76f4df7f4302",
            topic: "第二周",
            expanded: true,
            parentid: "41abf35b4a50500c",
          },
          {
            id: "41ac7a8d9f8d1f25",
            topic: "第三周",
            expanded: true,
            parentid: "41abf35b4a50500c",
          },
          {
            id: "41ac7d3228f11975",
            topic: "6.19",
            expanded: true,
            parentid: "41ac7a8d9f8d1f25",
          },
          {
            id: "41ac7fb666ec9382",
            topic: "6.20",
            expanded: true,
            parentid: "41ac7a8d9f8d1f25",
          },
          {
            id: "41ac80c516080250",
            topic: "哈哈哈哈哈哈",
            expanded: true,
            parentid: "41ac7fb666ec9382",
          },
          {
            id: "41ac7b82db2036ca",
            topic: "第四周",
            expanded: true,
            parentid: "41abf35b4a50500c",
          },
          {
            id: "41abf06a31f0dd6d",
            topic: "第三季度",
            expanded: true,
            parentid: "root",
            direction: "right",
          },
          {
            id: "41abf08a75e0a392",
            topic: "第四季度",
            expanded: true,
            parentid: "root",
            direction: "right",
          },
        ],
        format: "node_array",
        meta: { author: "hizzgdev@163.com", name: "example", version: "0.2" },
      },
      options: {
        container: "jsmind_container", // [必选] 容器的ID
        editable: true, // 是否启用编辑,添加、删除、修改、移动
        theme: "clouds", // 主题,15中主题可选,	[primary,warning,danger,success,info,greensea,nephrite,belizehole,wisteria,asphalt,orange,pumpkin,pomegranate,clouds,asbestos]
        mode: "side", // 显示模式,full两侧分步、side右侧分步
        support_html: true, // 是否支持节点里的HTML元素
        view: {
          hmargin: 100, // 思维导图距容器外框的最小水平距离，px
          vmargin: 50, // 思维导图距容器外框的最小垂直距离
          line_width: 1, // 思维导图线条的粗细
          line_color: "#666", // 思维导图线条的颜色
        },
        layout: {
          hspace: 30, // 节点之间的水平间距
          vspace: 22, // 节点之间的垂直间距
          pspace: 13, // 节点与连接线之间的水平间距（用于容纳节点收缩/展开控制器）
        },
        shortcut: {
          enable: true, // 是否启用快捷键
          handles: {}, // 命名的快捷键事件处理器
          mapping: {
            // 快捷键映射
            addchild: 45, // <Insert>
            addbrother: 13, // <Enter>
            editnode: 113, // <F2>
            delnode: 46, // <Delete>
            toggle: 32, // <Space>
            left: 37, // <Left>
            up: 38, // <Up>
            right: 39, // <Right>
            down: 40, // <Down>
          },
        },
      },
      from: {
        type: "day",
        startTime: new Date(),
        endTime: new Date(),
        uid: "",
      },
    };
  },
  computed: {
    ...mapGetters(["uid"]),
  },
  mounted() {
    // this.search();
    // this.getNowTime();
    this.mind = this.testData;
    this.jm = new jsMind(this.options);
    this.jm.show(this.mind);
    // this.rightMenuFn(); //鼠标右键事件
    // this.remarkMove(); //备注弹框移动
    // downloadFile.btnClick(); //导出数据文件到本地?
  },
  methods: {
    //rightMenuFn(); //鼠标右键事件
rightMenuFn() {
	// 右键鼠标
	var rightMenu = document.getElementById('right_menu');
	var rightScope = document.getElementById('jsmind_container');

	rightScope.oncontextmenu = function(e) {
		var e = event || window.event;
		rightMenu.style.display = "block";
		rightMenu.style.left = e.clientX + 'px';
		rightMenu.style.top = e.clientY + 'px';
		return false; //取消右键点击的默认事件
	}

	document.onclick = function() {
		rightMenu.style.display = "none";
	}
},
    //思维导图对齐方式
alignType(aType) {
  var rightScope = document.getElementById("jsmind_container");
	var newMind = this.jm.get_data('node_array'); //获取页面数据
	// rightScope.html(''); //思维导图父容器置空
	this.options.mode = aType; //对齐方式,full:左右对齐，side:右对齐
	this.jm = new jsMind(this.options); //重载jsmind
	this.jm.show(newMind);
},
    //rightMenuFn(); //鼠标右键事件
    rightMenuFn() {
      // 右键鼠标
      var rightMenu = document.getElementById("right_menu");
      var rightScope = document.getElementById("jsmind_container");

      rightScope.oncontextmenu = function (e) {
        var e = event || window.event;
        rightMenu.style.display = "block";
        rightMenu.style.left = e.clientX + "px";
        rightMenu.style.top = e.clientY + "px";
        return false; //取消右键点击的默认事件
      };

      document.onclick = function () {
        rightMenu.style.display = "none";
      };
    },
    //备注弹框移动
    remarkMove() {
      var clicked = "Nope."; //鼠标是否选中按住元素
      var mausx = "0"; //鼠标相对文档坐标
      var mausy = "0";
      var winx = "0"; //元素相对文档坐标
      var winy = "0";
      var difx = mausx - winx;
      var dify = mausy - winy;
      var moveBoxChild = document.getElementsByClassName("rmarkTitle");
      var moveBox = document.getElementsByClassName("remarkContent");
      var HTMLBox = document.getElementsByClassName("app-containerjsmind");
      HTMLBox.mousemove(function (event) {
        mausx = event.pageX; //鼠标指针相对文档左边缘的位置
        mausy = event.pageY; //鼠标指针相对文档上边缘的位置
        winx = moveBox.offset().left; //元素距离文档左边距离
        winy = moveBox.offset().top; //元素相对文档上边距离
        if (clicked == "Nope.") {
          difx = mausx - winx;
          dify = mausy - winy;
        } else {
          var newx =
            event.pageX - difx - moveBox.css("marginLeft").replace("px", "");
          var newy =
            event.pageY - dify - moveBox.css("marginTop").replace("px", "");
          moveBox.css({
            top: newy,
            left: newx,
          });
        }
      });

      moveBoxChild.mousedown(function (event) {
        clicked = "Yeah.";
      });

      HTMLBox.mouseup(function (event) {
        clicked = "Nope.";
      });
    },
    search() {},
    messages(mes) {
      this.$message({
        message: mes,
        type: "warning",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
.searchCondition {
  margin-bottom: 10px;
  span {
    margin-right: 5px;
  }
  .endTime {
    margin-left: 30px;
  }
  .DatSearch {
    float: right;
    margin-left: 10px;
  }
  i {
    display: inline-block;
    font-style: normal;
    color: #a79c9c;
    margin-right: 5px;
  }
}

/*mind容器*/
#jsmind_container {
  width: 1000px;
  height: 800px;
  overflow: auto;
}

/*备注*/




</style>