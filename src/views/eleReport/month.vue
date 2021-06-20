<template>
  <div class="app-container">
    <el-card class="box-card searchCondition">
      <div class="text item">
        <!-- format="yyyy 年 MM 月 dd 日" -->
        <span>开始时间</span>
        <el-date-picker
          v-model="from.startTime"
          type="month"
          placeholder=""
          default-value=""
          :picker-options="pickerOptions0"
        >
        </el-date-picker>
        <span class="endTime">结束时间</span>
        <el-date-picker
          v-model="from.endTime"
          type="month"
          placeholder=""
          :picker-options="pickerOptions1"
        >
        </el-date-picker>
        <div class="searchCondition">
          <el-button
            type="primary"
            @click="search"
            class="DatSearch"
            size="small"
            >查询</el-button
          >
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用电报表</span>
        <el-button style="float: right; padding: 3px 0" type="text"
          >导出</el-button
        >
      </div>
      <div class="text item">
        <el-table
          :data="tableData1"
          style="width: 100%"
          row-key="id"
          border
          lazy
          :load="load"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column fixed prop="id" type="" width="50">
          </el-table-column>
          <el-table-column fixed prop="name" label="名称" width="180">
          </el-table-column>
          <el-table-column
            v-for="(item, index) in cols"
            :key="index"
            :label="item.prop"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.list[index].num }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column> -->
        </el-table>
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

      from: {
        type:'month',
        startTime: '',
        endTime: '',
        uid: "",
      },

      pickerOptions0: {
        disabledDate: (time) => {
          if (this.from.endTime != "") {
            return (
              time.getTime() > Date.now() || time.getTime() > this.from.endTime
            );
          } else {
            return time.getTime() > Date.now();
          }
        },
      },
      pickerOptions1: {
        disabledDate: (time) => {
          return (
            time.getTime() < this.from.startTime || time.getTime() > Date.now()
          );
        },
      },
      cols: [],
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
          ],
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          id: 5,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          id: 5,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          id: 6,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      tableData1: [],
    };
  },
  computed: {
    ...mapGetters(["uid"]),
  },
  mounted() {
    // this.search();
    // this.getNowTime();
  },
  methods: {
    getNowTime() {
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth(); //得到月份
      var date = now.getDate(); //得到日期
      month = month + 1;
      month = month.toString().padStart(2, "0");
      date = date.toString().padStart(2, "0");
      var defaultDate = `${year}-${month}-${date}`;
      this.$set(this.from, "startTime", defaultDate);
      this.$set(this.from, "endTime", defaultDate);
    },
    getData(d){
           return d.getFullYear() + '-' + (d.getMonth() + 1);
    },
    search() {
      console.log(this.from)
      if (this.from.startTime == null && this.from.endTime) {
        return this.messages("请填写开始时间");
      } else if (this.from.startTime && this.from.endTime == null) {
        return this.messages("请填写结束时间");
      }
    //   if (this.from.startTime && this.from.endTime) {
    //     this.from.startTime = this.getData(this.from.startTime);
    //     this.from.endTime = this.getData(this.from.endTime);
    //   }
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
        console.log(this.from)
      const res = await getEleReport(this.from);
      if (res.code == 20000) {
        console.log(res);
        const { data } = res;
        this.tableData1 = data.row;
        this.cols = data.row[0].list;
        console.log(this.cols);
      }
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            id: 32,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
        ]);
      }, 1000);
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
  }
}
</style>