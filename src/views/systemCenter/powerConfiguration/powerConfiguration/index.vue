<template>
  <div class="app-containerjsmind">
    <el-card class="box-card searchCondition">
      <div class="text item">
        <!-- format="yyyy 年 MM 月 dd 日" -->
        <span>
          <i>所挂设备名称:</i>vfvfv
        </span>

        <span class="endTime">
          <i>所挂监测点名称:</i>crcrvrvr
        </span>

        <div class="searchCondition">
          <el-button class="DatSearch" size="small" plain>保存</el-button>
          <el-button type="primary" @click="search" class="DatSearch" size="small">连线</el-button>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <!-- <div slot="header" class="clearfix">
        <span>用电报表</span>
        <el-button style="float: right; padding: 3px 0" type="text"
          >导出</el-button
        >
      </div>-->
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
          <li @click="add_subNode();">
            <!-- <em class="iconfont">&#xe639;</em> -->
            <span>新增同级节点</span>
          </li>
          <li @click="add_node();">
            <!-- <em class="iconfont">&#xe639;</em> -->
            <span>新增下级节点</span>
          </li>
          <li @click="delete_node();">
            <!-- <em class="iconfont">&#xe618;</em> -->
            <span>删除此节点</span>
          </li>

          <li @click="monitoringPoint();">
            <!-- <em class="iconfont">&#xe618;</em> -->
            <span>关联监测点</span>
          </li>

          <li @click="deviceContext();">
            <!-- <em class="iconfont">&#xe618;</em> -->
            <span>关联设备</span>
          </li>
          <!-- <li @click="showRemark();">
            <em class="iconfont">&#xe7d1;</em>
            <span>备注</span>
          </li>
          <li @click="delRemark();">
            <em class="iconfont">&#xe618;</em>
            <span>删除备注</span>
          </li>
          <li @click="addFile();">
            <em class="iconfont">&#xe620;</em>
            <span>添加附件</span>
          </li>
          <li @click="delFile();">
            <em class="iconfont">&#xe618;</em>
            <span>删除附件</span>
          </li>-->
        </ul>

        <!--关联监测点弹框-->
        <el-dialog title="选择监测点" :visible.sync="centerDialogVisible" width="50%" center>
          <el-card class="box-card monitoringPointDatSearch">
            <div class="text item">
              <el-form :model="form">
                <el-form-item label="监测点名称" :label-width="formLabelWidth">
                  <el-input
                    placeholder="请输入内容"
                    v-model="form.type"
                    class="monitoringPointInput"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-form>

              <div class="monitoringPoint">
                <el-button @click="resetForm()" class="DatSearch" size="small">重置</el-button>
                <el-button type="primary" @click="search" class="DatSearch" size="small">查询</el-button>
              </div>
            </div>
          </el-card>

          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>用户监测点信息</span>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
            </div>
            <div class="text item">
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                height="250"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="监测点名称" width="120">
                  <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column prop="name" label="监测设备" width="120"></el-table-column>
                <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
              </el-table>
              <div style="margin-top: 20px">
                <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
                <el-button @click="toggleSelection()">取消选择</el-button>
              </div>
            </div>
          </el-card>

          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>

        <!--关联设备弹框-->
        <el-dialog title="选择用能设备" :visible.sync="contextDialogVisible" width="50%" center>
          <el-card class="box-card monitoringPointDatSearch">
            <div class="text item">
              <el-radio-group v-model="radio" @change="energyUsing">
                <el-radio :label="1">配电设备</el-radio>
                <el-radio :label="2">用能设备</el-radio>
              </el-radio-group>
            </div>
          </el-card>

          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>设备信息</span>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
            </div>
            <div class="text item">
              <el-table
                v-if="radio == 1"
                ref="singleTable"
                :data="tableData1"
                highlight-current-row
                @current-change="handleCurrentChange"
                style="width: 100%"
              >
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column property="date" label="设备名称" width></el-table-column>
                <el-table-column property="name" label="设备类型" width></el-table-column>
              </el-table>

              <el-table
                v-if="radio == 2"
                ref="singleTable"
                :data="tableData1"
                highlight-current-row
                @current-change="handleCurrentChange"
                style="width: 100%"
              >
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column property="date" label="设备名称" width></el-table-column>
                <el-table-column property="name" label="模板名称" width></el-table-column>
              </el-table>
              <div style="margin-top: 20px">
                <el-button @click="setCurrent(tableData1[1])">选中第二行</el-button>
                <el-button @click="setCurrent()">取消选择</el-button>
              </div>
            </div>
          </el-card>

          <span slot="footer" class="dialog-footer">
            <el-button @click="contextDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="contextDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>

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
      contextDialogVisible: false, //选择用能设备
      radio: 1,
      centerDialogVisible: false, //用户监测点信息
      form: { type: "" },
      formLabelWidth: "100px",
      tableData1: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ],
      currentRow: null,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: [],
      mind: null, //初始数据
      jm: null, //思维图对象
      thisNodeData: null, //当前节点数据
      newmarksId: [], //新增的备注或附件标记
      testData: {
        data: [
          {
            id: "root",
            topic: "2018年工作计划",
            expanded: true,
            isroot: true,
            remarkText: "这是一个备注"
          },
          {
            id: "41abefefbc9da005",
            topic: "第一季度",
            expanded: true,
            parentid: "root",
            direction: "left",
            remarkText: "这也是一个备注",
            fileInfo: "C:\fakepath微信图片_20180710151642.png"
          },
          {
            id: "41abf045666386de",
            topic: "第二季度",
            expanded: true,
            parentid: "root",
            direction: "left",
            remarkText: "这还是一个备注"
          },
          {
            id: "41abf2e6b681d777",
            topic: "4月",
            expanded: true,
            parentid: "41abf045666386de",
            remarkText: "啦啦啦啦",
            fileInfo: "C:\fakepath微信图片_20180710151642.png"
          },
          {
            id: "41abf31d2a52a487",
            topic: "5月份",
            expanded: true,
            parentid: "41abf045666386de",
            remarkText: null,
            fileInfo: "C:\fakepath微信图片_20180710151642.png"
          },
          {
            id: "41abf35b4a50500c",
            topic: "6月",
            expanded: true,
            parentid: "41abf045666386de",
            remarkText: ""
          },
          {
            id: "41ac73446cb9d4c5",
            topic: "第一周",
            expanded: true,
            parentid: "41abf35b4a50500c",
            remarkText: "啦啦啦啦"
          },
          {
            id: "41ac76f4df7f4302",
            topic: "第二周",
            expanded: true,
            parentid: "41abf35b4a50500c"
          },
          {
            id: "41ac7a8d9f8d1f25",
            topic: "第三周",
            expanded: true,
            parentid: "41abf35b4a50500c"
          },
          {
            id: "41ac7d3228f11975",
            topic: "6.19",
            expanded: true,
            parentid: "41ac7a8d9f8d1f25"
          },
          {
            id: "41ac7fb666ec9382",
            topic: "6.20",
            expanded: true,
            parentid: "41ac7a8d9f8d1f25"
          },
          {
            id: "41ac80c516080250",
            topic: "哈哈哈哈哈哈",
            expanded: true,
            parentid: "41ac7fb666ec9382"
          },
          {
            id: "41ac7b82db2036ca",
            topic: "第四周",
            expanded: true,
            parentid: "41abf35b4a50500c"
          },
          {
            id: "41abf06a31f0dd6d",
            topic: "第三季度",
            expanded: true,
            parentid: "root",
            direction: "right"
          },
          {
            id: "41abf08a75e0a392",
            topic: "第四季度",
            expanded: true,
            parentid: "root",
            direction: "right"
          }
        ],
        format: "node_array",
        meta: { author: "hizzgdev@163.com", name: "example", version: "0.2" }
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
          line_color: "#666" // 思维导图线条的颜色
        },
        layout: {
          hspace: 30, // 节点之间的水平间距
          vspace: 22, // 节点之间的垂直间距
          pspace: 13 // 节点与连接线之间的水平间距（用于容纳节点收缩/展开控制器）
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
            down: 40 // <Down>
          }
        }
      },
      from: {
        type: "day",
        startTime: new Date(),
        endTime: new Date(),
        uid: ""
      }
    };
  },
  computed: {
    ...mapGetters(["uid"])
  },
  mounted() {
    // this.search();
    // this.getNowTime();
    this.mind = this.testData;
    this.jm = new jsMind(this.options);
    this.jm.show(this.mind);
    this.rightMenuFn(); //鼠标右键事件
    this.remarkMove(); //备注弹框移动
    // downloadFile.btnClick(); //导出数据文件到本地?
  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //单选用能设备
    energyUsing(a) {
      console.log(a);
    },
    //关联监测点重置
    resetForm(formName) {
      this.form.type = "";
    },
    //关联监测点
    monitoringPoint() {
      this.centerDialogVisible = true;
    },
    //关联设备
    deviceContext() {
      this.contextDialogVisible = true;
    },
    //显示备注
    showRemark() {
      //显示备注
      var selected_node = this.jm.get_selected_node(); //选中的节点
      // 判断是否有选中节点
      if (!selected_node) {
        alert("请选择一个节点");
        return;
      }

      var nodeid = selected_node.id; //选中节点的id
      var remarkBox = document.getElementById("remark_box"); //备注弹框
      var remarkInput = document.getElementById("remark_input"); //文本域
      // document.querySelector('div[data-id="222"]')
      var remarkNode = document.querySelector(
        'remark[nodeid="rmk_' + nodeid + '"]'
      ); //当前备注节点
      var selectedNode = document.getElementsByClassName(".selected"); //当前选中节点

      this.jm.select_clear(); //清除节点选中
      selectedNode.className = "selected"; //给当前选中节点添加类
      // dom.setAttribute('属性名','属性值')
      // dom.getAttribute('属性名')
      // dom.removeAttribute('属性名')
      //判断是否有备注，并进行内容赋值
      console.log(remarkNode);
      // if (remarkNode.length > 0) {
      //   //修改备注
      //   var remarkText = remarkNode.getAttribute("title");
      //   remarkInput.value = remarkText;
      // } else {
      //   //新增备注
      //   remarkInput.value = "";
      // }
      remarkBox.style.display = "block";
      this.remarkBtnClick(
        remarkBox,
        remarkNode,
        nodeid,
        remarkInput,
        selected_node
      ); //备注确定和取消
    },
    remarkBtnClick(remarkBox, remarkNode, nodeid, remarkInput, selected_node) {
      //备注确定和取消
      var remarkCanaelBtn = document.getElementById("remark_canaelBtn"); //取消按钮
      var remarkSureBtn = document.getElementById("remark_sureBtn"); //确定按钮

      //取消
      remarkCanaelBtn.onclick = function() {
        remarkBox.style.display = "none";
        this.jm.select_node(selected_node); //选中节点
      };

      //确定
      remarkSureBtn.onclick = function() {
        if (remarkNode.length > 0) {
          //修改备注
          remarkNode.attr("title", remarkInput.value);
        } else {
          //新增备注
          var addRemarkNode = $(
            '<remark class="remarksN" nodeid="rmk_' +
              nodeid +
              '" title="' +
              remarkInput.value +
              '"></remark>'
          );
          var selectedNode = document.getElementsByClassName("selected"); //选中的节点
          var mindMarkBox = selectedNode.children(".mindMarkBox");
          mindMarkBox.prepend(addRemarkNode);
          mindMarkBox.css("height", "20px");
        }
        remarkBox.style.display = "none";
        thisNodeData.data.remarkText = remarkInput.value;
        this.jm.select_node(selected_node); //选中当前节点
      };
    },
    // 删除节点
    delete_node() {
      // 删除节点
      var selected_node = this.jm.get_selected_node(); //选中的节点
      // 判断是否有选中节点
      if (!selected_node) {
        alert("请选择一个节点");
        return;
      }
      if (selected_node.id == "root") {
        alert("根节点不能删除");
      } else {
        var childNode = selected_node.children;
        if (childNode != "") {
          //判断是否有子节点
          if (confirm("该节点下包含子节点，您确定删除吗？")) {
            this.jm.remove_node(selected_node); //删除选中的节点
          }
        } else {
          this.jm.remove_node(selected_node); //删除选中的节点
        }
      }
    },
    //添加下级节点
    add_node() {
      // 新增子节点
      var selected_node = this.jm.get_selected_node(); //选中的节点
      // 判断是否有选中节点
      if (!selected_node) {
        alert("请选择一个节点");
        return;
      }
      var nodeid = jsMind.util.uuid.newid(); //节点id
      var topic = "新节点"; //新节点标题
      this.jm.add_node(selected_node, nodeid, topic); //在选中的节点下新增子节点
    },
    //添加同级节点
    add_subNode() {
      // 新增同级节点
      var selected_node = this.jm.get_selected_node(); //选中的节点
      // 判断是否有选中节点
      if (!selected_node) {
        alert("请选择一个节点");
        return;
      }
      var nodeid = jsMind.util.uuid.newid(); //节点id
      var topic = "新节点"; //新节点标题
      if (selected_node.id == "root") {
        alert("根节点不能添加同级节点");
      } else {
        this.jm.insert_node_after(selected_node, nodeid, topic); //在选中的节点下新增子节点
      }
    },
    //鼠标右键事件
    rightMenuFn() {
      // 右键鼠标
      var rightMenu = document.getElementById("right_menu");
      var rightScope = document.getElementById("jsmind_container");

      rightScope.oncontextmenu = function(e) {
        var e = event || window.event;
        rightMenu.style.display = "block";
        rightMenu.style.left = e.clientX - 210 + "px";
        rightMenu.style.top = e.clientY + 20 + "px";
        return false; //取消右键点击的默认事件
      };

      document.onclick = function() {
        rightMenu.style.display = "none";
      };
    },
    //思维导图对齐方式
    alignType(aType) {
      var rightScope = document.getElementById("jsmind_container");
      var newMind = this.jm.get_data("node_array"); //获取页面数据
      // rightScope.html(''); //思维导图父容器置空
      this.options.mode = aType; //对齐方式,full:左右对齐，side:右对齐
      this.jm = new jsMind(this.options); //重载jsmind
      this.jm.show(newMind);
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
      HTMLBox.mousemove(function(event) {
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
            left: newx
          });
        }
      });

      moveBoxChild.mousedown(function(event) {
        clicked = "Yeah.";
      });

      HTMLBox.mouseup(function(event) {
        clicked = "Nope.";
      });
    },
    search() {},
    messages(mes) {
      this.$message({
        message: mes,
        type: "warning"
      });
    }
  }
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
  width: 1500px;
  height: 1000px;
  overflow: auto;
}
/*鼠标右键菜单*/

#right_menu {
  width: 160px;
  position: absolute;
  display: none;
  list-style: none;
  border: 1px solid #b3b3b3;
  font-size: 16px;
  background-color: #ebebeb;
  -webkit-box-shadow: 4px 4px 4px rgba(6, 0, 1, 0.1);
  box-shadow: 4px 4px 4px rgba(6, 0, 1, 0.1);
  z-index: 999;
}

#right_menu li {
  cursor: pointer;
  border: 1px solid transparent;
  overflow: hidden;
  box-sizing: border-box;
}

#right_menu li:hover {
  border-color: #0279f6;
}

#right_menu em,
#right_menu span {
  display: inline-block;
  float: left;
  height: 28px;
  line-height: 28px;
}

#right_menu em {
  width: 35px;
  color: #0278f4;
  border-right: 1px solid #d9d9d9;
  text-align: center;
}

#right_menu span {
  width: 110px;
  padding-left: 10px;
  border-left: 1px solid #fff;
}

/*备注*/
.remarkBox {
  display: none;
}
.remarkHint,
.remarkContent {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 666;
}

.remarkContent {
  width: 400px;
  height: 300px;
  border: 1px solid #1883d7;
  background-color: #fff;
}
.rmarkTitle {
  height: 27px;
  font-weight: 400;
  line-height: 27px;
  cursor: move;
}
.rmarkTitle img {
  height: 18px;
  vertical-align: middle;
  margin: 0 6px;
}
.remarkBtn {
  padding: 5px;
  background-color: #b6d1f8;
}
.remarkBtn button {
  width: 60px;
  height: 30px;
}
.remarkInput {
  width: 99.6%;
  height: 77%;
}

.monitoringPoint {
  margin-bottom: 10px;
  .DatSearch {
    float: right;
    margin-left: 10px;
    margin-bottom: 10px;
  }
}
.monitoringPointInput {
  width: 200px;
}
.monitoringPointDatSearch {
  margin-bottom: 10px;
}
</style>