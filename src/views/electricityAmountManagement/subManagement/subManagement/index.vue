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
                  <div>
                        <p><span class="volumeHistogram">用量构成分析图</span><span class="volumeHistogramDate">{{from.startTime}}</span></p>
                        <div id="myChart" :style="{width: '60%', height: '300px'}"></div>
                  </div>
                   






              </el-tab-pane>
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
    this.initChart()
  },
  methods: {
      initChart() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      this.myChart = myChart;
      myChart.setOption({
        // title: { text: '在Vue中使用echarts' },
        color: ['#5470C6', '#91CC75', '#EE6666'],
        trigger: "axis",
        legend: {
          data: ["总电量","峰", "平", "谷"]
        },
        tooltip: {
            trigger: 'axis',
        axisPointer: {            // Use axis to trigger tooltip
            type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
        }
        },
        xAxis: {
          data: ["11", "222", "333", "444", "455", "666",'777','8888','9999','101010']
        },
        yAxis: {
            name: 'kW·h',
            position: 'left',
        },
        series: [
          {
            name: "峰",
            type: "bar",
            stack: "total",
            label: {
              show: true
            },
            emphasis: {
              focus: "series"
            },
            data: ["320", 302, 301, 334, 390, 330, 320,100,0,0,0]
          },
          {
            name: "平",
            type: "bar",
            stack: "total",
            label: {
              show: true
            },
            emphasis: {
              focus: "series"
            },
            data: [120, 132, 101, 134, 90, 230, 210,80,0,0,0]
          },
          {
            name: "谷",
            type: "bar",
            stack: "total",
            label: {
              show: true
            },
            emphasis: {
              focus: "series"
            },
            data: [220, 182, 191, 234, 290, 330, 310,70,0,0]
          },
          {
            name: "总电量",
            type: "line",
            stack: "total",
            label: {
              show: true
            },
            emphasis: {
              focus: "series"
            },
            data: [220, 182, 191, 234, 290, 330, 310,10,30,1,70,200]
          },
          
        ]
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
.volumeHistogram{
    font-weight: bold;
    margin-right: 5px;
    
}
.volumeHistogramDate{
    font-size: 12px;
    color: rgb(172, 165, 165);
}
</style>