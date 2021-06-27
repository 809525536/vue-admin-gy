<template>
  <div class="app-container">
    <el-card class="box-card">
      <div class="text item">
        <div @click="choosetype" class="searchbox">
          <span
            v-for="(item, index) in dataTime"
            :key="index"
            :class="curtype == item.type ? 'active' : ''"
            :data-type="item.type"
            >{{ item.name }}</span
          >
          <!-- <span :class="curtype==1?'active':''" data-i="1">日</span>
            <span :class="curtype==2?'active':''" data-i="2">周</span>
            <span :class="curtype==3?'active':''" data-i="3">月</span>
            <span :class="curtype==4?'active':''" data-i="4">年</span> -->
        </div>
        <div class="datePicker">
          <el-date-picker
            v-model="from.startTime"
            :type="curtype"
            placeholder=""
            :default-value="new Date()"
          >
          </el-date-picker>
        </div>
        <el-button type="primary" @click="search" class="DatSearch" size="small"
          >查询</el-button
        >
      </div>
    </el-card>

    <el-card class="box-card">
      <!-- <div slot="header" class="clearfix">
        <span>用电报表</span>
        <el-button style="float: right; padding: 3px 0" type="text"
          >导出</el-button
        >
      </div> -->
      <div class="text item">
        <el-card class="tree-card">
          <div class="text item">
            <el-tree
              :data="data"
              :props="defaultProps"
              @node-click="handleNodeClick"
            ></el-tree>
          </div>
        </el-card>
        <el-card class="par-card">
          <div class="text item">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane label="用量分析" name="first">
                <div
                  class="business-panel-box topline"
                  style="border-top: 3px solid #e7eaec"
                >
                  <div class="box-bar">
                    <p class="box-volumeHistogram">
                      <span class="volumeHistogram">用量构成分析图</span
                      ><span class="volumeHistogramDate"
                        >( {{ from.startTime }} )</span
                      >
                    </p>
                    <div
                      id="myChart"
                      :style="{ width: '100%', height: '300px' }"
                    ></div>
                  </div>
                  <div class="electricityConsumption">
                    <div class="electricityConsumptionCon">
                      <p class="averageTitle">月日均用电量</p>
                      <div style="width: 100%; height: 88px">
                        <div class="analysis-month">
                          <p style="margin-top: 23px">本月日均</p>
                          <p class="analysis-month-num">10051.11</p>
                        </div>
                        <div class="analysis-month-top" style="">
                          <p style="margin-top: 23px">上月日均</p>
                          <p class="analysis-month-top-num">9416.77</p>
                        </div>
                      </div>
                      <div style="width: 100%; height: 16%; margin-top: 30px">
                        <div class="analysis-ring">
                          <span style="font-size: 18px">环比</span>
                          <i class="analysis-fa fa fa-arrow-circle-up"></i>
                          <i
                            class="analysis-circle fa fa-arrow-circle-down"
                          ></i>
                          <span class="analysis-circle-num">6.74%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <el-row :gutter="20">
                    <el-col :span="13" :offset="6"
                      ><div class="grid-content bg-purple">
                        <div class="col-xs-10" style="height: 150px">
                          <div class="analisis-total">
                            <div>总计电量</div>
                            <div>180920.00</div>
                          </div>
                          <div class="analisis-peak">
                            <div>峰时电量</div>
                            <p>64220</p>
                            <div>35.5%</div>
                          </div>
                          <div class="analisis-flat">
                            <div>平时电量</div>
                            <div>76920</div>
                            <div>42.52%</div>
                          </div>
                          <div class="analisis-valley">
                            <div>谷时电量</div>
                            <div>39780</div>
                            <div>21.99%</div>
                          </div>
                          <div class="analisis-tip">
                            <div>尖峰电量</div>
                            <div></div>
                            <div></div>
                          </div>
                        </div></div
                    ></el-col>
                  </el-row>
                  <div style="height: 1px"></div>
                </div>

                <div
                  class="business-panel-box"
                  style="height: 220px; margin-top: 20px"
                >
                  <div
                    class="business-panel business-panel-parent topline"
                    id="mk-panel-38610ce999924c3283d41a2ec1243b54"
                  >
                    <div class="row business-panel-header">
                      <div class="pull-left">用量同环比增长率</div>
                      <div class="pull-right"></div>
                    </div>
                    <div class="business-panel-body" style="height: 172px">
                      <el-table
                        
                        :data="tableData"
                        border
                        style="width: 100%"
                        :row-class-name="tableRowClassName"
                      >
                        <el-table-column prop="date" label="日期" width="180">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="180">
                        </el-table-column>
                        <el-table-column prop="address" label="地址">
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="设备信息" name="second">设备信息</el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
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
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
      ],
      myChart: null,
      activeName: "first",
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      dataTime: [
        {
          name: "日",
          type: "date",
        },
        {
          name: "周",
          type: "week",
        },
        {
          name: "月",
          type: "month",
        },
        {
          name: "年",
          type: "year",
        },
      ],
      curtype: "date", //默认显示第一个
      from: {
        startTime: "",
        uid: "",
      },
    };
  },
  computed: {
    ...mapGetters(["uid"]),
  },
  mounted() {
    this.search();
    this.initChart();
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      console.log(rowIndex)
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 0) {
        return "success-row";
      }
      return "";
    },
    initChart() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      this.myChart = myChart;
      myChart.setOption({
        // title: { text: '在Vue中使用echarts' },
        color: ["#5470C6", "#91CC75", "#EE6666"],
        trigger: "axis",
        legend: {
          data: ["总电量", "峰", "平", "谷"],
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        xAxis: {
          data: [
            "11",
            "222",
            "333",
            "444",
            "455",
            "666",
            "777",
            "8888",
            "9999",
            "101010",
          ],
        },
        yAxis: {
          name: "kW·h",
          position: "left",
        },
        series: [
          {
            name: "峰",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: ["320", 302, 301, 334, 390, 330, 320, 100, 0, 0, 0],
          },
          {
            name: "平",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210, 80, 0, 0],
          },
          {
            name: "谷",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310, 70, 0, 0],
          },
          {
            name: "总电量",
            type: "line",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310, 10, 30, 0],
          },
        ],
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    choosetype(e) {
      console.log(e.target.nodeName);
      if (e.target.nodeName == "SPAN") {
        this.curtype = e.target.dataset.type;
        console.log(e.target.dataset);
      }
    },
    search() {
      this.from.uid = this.uid;
      this.initData();
    },
    messages(mes) {
      this.$message({
        message: mes,
        type: "warning",
      });
    },
    async initData() {
      const res = await getEleReport(this.from);
      if (res.code == 20000) {
        console.log(res);
        const { data } = res;
        this.tableData1 = data.row;
        this.cols = data.row[0].list;
        console.log(this.cols);
      }
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
.DatSearch {
  margin-left: 10px;
}
.box-card {
  width: 100%;
  margin-bottom: 10px;
}
.tree-card {
  float: left;
  width: 200px;
  height: 100%;
}
.par-card {
  margin-left: 205px;
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
  }
}

/* 搜索专区 */
.searchbox {
  display: inline-block;
  margin-right: 10px;
  span {
    display: inline-block;
    width: 42px;
    height: 42px;
    line-height: 42px;
    text-align: center;

    font-weight: bold;
  }
}
/* 点击显示样式 */
.searchbox .active {
  background: rgb(44, 113, 216);
  color: #fff;
}
.datePicker {
  display: inline-block;
}
.business-panel-box .topline {
  border-top: 3px solid #e7eaec !important;
}

.volumeHistogram {
  font-weight: bold;
  margin-right: 5px;
}
.volumeHistogramDate {
  font-size: 12px;
  color: rgb(172, 165, 165);
}
.box-bar {
  float: left;
  width: 60%;
}
.electricityConsumption {
  width: 40%;
  margin-left: 60%;
  height: 300px;
}
.electricityConsumptionCon {
  width: 100%;
  margin-right: 15px;
  margin-top: 30px;
  border-radius: 10px;
  background: #ffbbb9;
  height: 250px;
}
.averageTitle {
  border-radius: 10px;
  text-align: center;
  font-size: 18px;
  margin-top: 0px;
  height: 70px;
  line-height: 70px;
  background-color: #ff8886;
  color: white;
  font-weight: 300;
  border-bottom: 1px solid white;
}
.analysis-month {
  display: inline-block;
  float: left;
  margin-left: 8%;
  font-size: 18px;
  width: 150px;
  height: 103px;
  background: white;
  border-radius: 10px;
  text-align: center;
}
.analysis-month-num {
  text-align: center;
  color: #ea712b;
  font-weight: bolder;
  font-size: 21px;
}
.analysis-month-top {
  display: inline-block;
  float: right;
  margin-right: 7%;
  font-size: 18px;
  width: 150px;
  background: white;
  border-radius: 10px;
  height: 104px;
  text-align: center;
}
.analysis-month-top-num {
  text-align: center;
  color: #ea712b;
  font-weight: bolder;
  font-size: 21px;
}
.analysis-ring {
  width: 309px;
  height: 39px;
  margin: 0 auto;
  bottom: 12px;
  background-color: white;
  border-radius: 10px;
  text-align: center;
  line-height: 39px;
}
.analysis-fa {
  color: red;
  font-size: 20px;
  margin-left: 15px;
}
.analysis-circle {
  color: green;
  font-size: 20px;
  margin-left: 15px;
  display: none;
}
.analysis-circle-num {
  font-size: 18px;
  margin-left: 13px;
}
.analisis-total {
  background-color: white;
  border: 5px solid #000;
  border-radius: 10px;
  width: 22%;
  height: 100%;
  float: left;
  margin-right: 10px;
  & > div:nth-of-type(1) {
    text-align: center;
    margin-top: 45px;
    font-size: 16px;
  }
  & > :nth-of-type(2) {
    color: #ea712b;
    font-size: 22px;
    font-weight: bolder;
    margin-top: 10px;
    text-align: center;
  }
}
.analisis-peak {
  background-color: white;
  border: 5px solid #ff5f56;
  border-radius: 10px;
  width: 22%;
  height: 100%;
  float: left;
  margin-right: 10px;
  p {
    color: #ea712b;
    font-size: 22px;
    font-weight: bolder;
    margin-top: 13px;
    text-align: center;
    margin-bottom: 0px;
  }
  & > div:nth-of-type(1) {
    text-align: center;
    margin-top: 23px;
    font-size: 16px;
  }
  & > div:nth-of-type(2) {
    margin-top: 12px;
    text-align: center;
    color: #ea712b;
    font-size: 19px;
    font-weight: bolder;
  }
}
.analisis-flat {
  background-color: white;
  border: 5px solid #0ca7dc;
  border-radius: 10px;
  width: 22%;
  height: 100%;
  float: left;
  margin-right: 10px;
  & > div:nth-of-type(1) {
    text-align: center;
    margin-top: 23px;
    font-size: 16px;
  }
  & > div:nth-of-type(2) {
    color: #ea712b;
    font-size: 22px;
    font-weight: bolder;
    margin-top: 13px;
    text-align: center;
  }
  & > div:nth-of-type(3) {
    margin-top: 12px;
    text-align: center;
    color: #ea712b;
    font-size: 19px;
    font-weight: bolder;
  }
}
.analisis-valley {
  background-color: white;
  border: 5px solid #115283;
  border-radius: 10px;
  width: 22%;
  height: 100%;
  float: left;
  margin-right: 10px;
  & > div:nth-of-type(1) {
    text-align: center;
    margin-top: 23px;
    font-size: 16px;
  }
  & > div:nth-of-type(2) {
    color: #ea712b;
    font-size: 22px;
    font-weight: bolder;
    margin-top: 13px;
    text-align: center;
  }
  & > div:nth-of-type(3) {
    margin-top: 12px;
    text-align: center;
    color: #ea712b;
    font-size: 19px;
    font-weight: bolder;
  }
}
.analisis-tip {
  background-color: white;
  border: 5px solid rgb(17, 82, 131);
  border-radius: 10px;
  width: 22%;
  height: 100%;
  float: left;
  margin-right: 10px;
  display: none;
  & > div:nth-of-type(1) {
    text-align: center;
    margin-top: 23px;
    font-size: 16px;
  }
  & > div:nth-of-type(2) {
    color: #ea712b;
    font-size: 22px;
    font-weight: bolder;
    margin-top: 13px;
    text-align: center;
  }
  & > div:nth-of-type(3) {
    margin-top: 12px;
    text-align: center;
    color: #ea712b;
    font-size: 19px;
    font-weight: bolder;
  }
}
.business-panel-header {
  height: 30px;
  margin-left: 10px !important;
  margin-right: 10px !important;
  font-size: 14px;
  font-weight: 700;
  line-height: 35px;
}
.business-panel-header .pull-left {
  color: #454444;
  height: 30px;
  font-weight: bold;
}

</style>
<style scoped>
.el-table .warning-row {
  background: rgb(196, 28, 64) !important;
}

.el-table .success-row {
  background: #f0f9eb !important;
}
</style>