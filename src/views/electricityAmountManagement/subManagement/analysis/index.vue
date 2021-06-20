<template>
  <div class="app-container">
    <el-card class="box-card searchCondition">
      <div class="text item">
        dwhjewdhwej
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
      from:{
          startTime:'',
          uid:''
      }
      
      
    };
  },
  computed: {
    ...mapGetters(["uid"]),
  },
  mounted() {
    this.search();
    
  },
  methods: {
   
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