<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>用能统计</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div class="list">
            <div class="list-data">
              <div class="left bg-green-l">昨日</div>
              <div class="right bg-green-r">
                <span v-if="eleData">{{getSum(eleData.yesterday)}}</span> kw·h
              </div>
            </div>
            <div class="list-data">
              <div class="left bg-blur-l">当月</div>
              <div class="right bg-blur-r">
                <span v-if="eleData">{{getSum(eleData.month)}}</span> kw·h
              </div>
            </div>
            <div class="list-data">
              <div class="left bg-blur-l">上月</div>
              <div class="right bg-blur-r">
                <span v-if="eleData">{{getSum(eleData.upMoth)}}</span> kw·h
              </div>
            </div>
            <div class="list-data">
              <div class="left bg-yellow-l">今年</div>
              <div class="right bg-yellow-r">
                <span v-if="eleData">{{getSum(eleData.years)}}</span> kw·h
              </div>
            </div>
            <div class="list-data">
              <div class="left bg-yellow-l">去年</div>
              <div class="right bg-yellow-r">0 kw·h</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>预告警数量统计</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>近30天预告警趋势</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>近30天用能趋势</span>
          </div>
          <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>2021年5月峰平谷用电占比</span>
          </div>
          <div id="myChart2" :style="{width: '100%', height: '300px'}"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
</style>
<script>
// const net = require('net');
import { getEleData } from "@/mock/index";
import { getEleDetail } from "@/api/ele";
import { mapGetters } from "vuex";
export default {
  name: "test",
  data() {
    return {
      myChart: null,
      myChart2: null,
      eleData: null
    };
  },
  computed: {
    ...mapGetters(["passagewayId", "uid"])
  },
  sockets: {
    connect() {
      // alert('socket已建立链接')
      console.log("socket connected");
    },
    disconnect() {
      // alert('sokect链接已断开')
      console.log("已断开连接");
    },
    test(res) {
      console.log("已收到推送", res);
    }
  },
  async mounted() {
    console.log(this.passagewayId);
    // console.log(this.$socket)
    // this.$socket.emit('connect', function(res) {
    //   console.log(res)
    // })
    // this.$socket.emit('connect')
    // this.$soket.onopen
    console.log(this.$socket);
    setTimeout(() => {
      this.$socket.emit("test", 111);
    }, 3000);
    this.initChart();
    this.initData();
  },
  methods: {
    onSokentMessge(val) {
      console.log(val);
    },
    getSum(res) {
      console.log(res);
      if (res.length == 2) {
        return Math.floor(res[0].Epp - res[1].Epp);
      } else {
        return 0;
      }
    },
    connect() {
      // alert(3)
      console.log("");
    },
    initChart() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      this.myChart = myChart;
      myChart.setOption({
        // title: { text: '在Vue中使用echarts' },
        trigger: "axis",
        legend: {
          data: ["峰", "平", "谷"]
        },
        tooltip: {},
        xAxis: {
          data: ["", "", "", "", "", ""]
        },
        yAxis: {},
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
            data: ["320", 302, 301, 334, 390, 330, 320]
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
            data: [120, 132, 101, 134, 90, 230, 210]
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
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      });
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      this.myChart2 = myChart2;
      myChart2.setOption({
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          left: "left"
        },
        series: []
      });
    },
    async initData() {
      const eleData = await getEleDetail({ uid: this.uid });
      if (eleData.code == 20000) {
        this.eleData = eleData.data;
      }
      const seriesOne = [];
      const seriesTwo = [];
      const seriesThere = [];
      const time = [];
      let fengTotal = 0;
      let pingTotal = 0;
      let guTotal = 0;
      // const { barData } = getEleData.data;
      // barData.map((item, index) => {
      //   // console.log(item)
      //   seriesOne.push(item["峰"]);
      //   seriesTwo.push(item["平"]);
      //   seriesThere.push(item["谷"]);
      //   fengTotal += Number(item["平"]);
      //   pingTotal += Number(item["峰"]);
      //   guTotal += Number(item["谷"]);
      //   time.push(item.time);
      // });
      if (this.eleData) {
        console.log(1111, this.eleData);
        this.eleData.sums = this.eleData.sums.reverse();
        this.eleData.sums.map((item, index) => {
          if (item.datas.length == 2) {
            const feng = Math.floor(item.datas[0].maxNum);
            const ping = Math.floor(
              (item.datas[0].maxNum - item.datas[0].maxNum) / 2 +
                item.datas[0].maxNum
            );
            const gu = Math.floor(item.datas[1].maxNum);
            seriesOne.push(feng);
            seriesTwo.push(ping);
            seriesThere.push(gu);
            fengTotal += Number(feng);
            pingTotal += Number(ping);
            guTotal += Number(gu);
            time.push(item.time);
          }
        });
      }
      this.myChart.setOption({
        xAxis: {
          data: time
        },
        series: [
          {
            name: "峰",
            type: "bar",
            stack: "total",
            label: {
              show: false
            },
            emphasis: {
              focus: "series"
            },
            data: seriesOne
          },
          {
            name: "平",
            type: "bar",
            stack: "total",
            label: {
              show: false
            },
            emphasis: {
              focus: "series"
            },
            data: seriesTwo
          },
          {
            name: "谷",
            type: "bar",
            stack: "total",
            label: {
              show: false
            },
            emphasis: {
              focus: "series"
            },
            data: seriesThere
          }
        ]
      });
      console.log(fengTotal);
      this.myChart2.setOption({
        series: [
          {
            name: "峰平谷用电占比",
            type: "pie",
            radius: "50%",
            data: [
              { value: fengTotal, name: "峰时" },
              { value: pingTotal, name: "平时" },
              { value: guTotal, name: "谷时" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
// const client = new net.Socket();
// client.connect(3000,'127.0.0.1',function(){
//     console.log('已连接到服务器端。');
//     client.write('你好。');
// })
// client.setEncoding('utf8');
// console.log(net)
</script>
<style lang="scss" scoped>
.list {
  .list-data {
    width: 100%;
    height: 40px;
    display: flex;
    margin-bottom: 15px;
  }
  .left {
    width: 80px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #fff;
  }
  .right {
    flex: 1;
    line-height: 40px;
    text-align: right;
    padding-right: 15px;
  }
}
.bg-green-l {
  background: #20b797;
}
.bg-green-r {
  background: #bdf2e8;
}
.bg-blur-l {
  background: #1f96d5;
}
.bg-blur-r {
  background: #afdcf2;
}
.bg-yellow-l {
  background: #ffaf0a;
}
.bg-yellow-r {
  background: #feefb9;
}
.el-card {
  min-height: 376px;
  margin-bottom: 20px;
}
</style>