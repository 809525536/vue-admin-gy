<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户监测点信息</span>
        <div class="header-btn" style="float: right;">
          <el-button style="padding: 3px 0" type="text" @click="addMonitoring">新增监测点</el-button>
          <el-button style="padding: 3px 0" type="text" @click="removeMonitoring">删除监测点</el-button>
        </div>
      </div>
      <el-table
        :data="monitoringList"
        stripe
        border
        style="width: 100%">
      >
        <el-table-column width="30">
          <template slot-scope="scope">
            <el-radio :label="scope.row.id" v-model="selectRadio"><span></span></el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="监测点名称"
        >
        </el-table-column>
        <el-table-column
          prop="equipmentList"
          label="监测点设备"
        >
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>监测点设备信息</span>
        <div class="header-btn" style="float: right;">
          <el-button style="padding: 3px 0" type="text" @click="addDevice">新增</el-button>
          <el-button style="padding: 3px 0" type="text" @click="removeDevice">删除</el-button>
        </div>
      </div>
    </el-card>
    <el-dialog title="新增监测点" :visible.sync="monitoringVisible">
      <el-form ref="form" :model="formMonitoringName" label-width="100px">
        <el-form-item label="监测点名称" prop="name">
          <el-input v-model="formMonitoringName.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="monitoringVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveName">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增监测点" :visible.sync="deviceVisible" width="80%">
      <el-form ref="form" :model="formDevice" label-width="80px" :inline="true">
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="formDevice.name"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="name">
          <el-input v-model="formDevice.type"></el-input>
        </el-form-item>
          <el-button type="primary" @click="searchDevice">选择设备</el-button>
      </el-form>
    </el-dialog>
    <el-dialog title="查询设备" :visible.sync="searchDeviceVisible" width="80%" top="10vh">
      <el-table
        :data="deviceList"
        stripe
        border
        style="width: 100%">
      >
        <el-table-column width="30">
          <template slot-scope="scope">
            <el-radio :label="scope.row.id" v-model="selectRadio"><span></span></el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备名称"
          width="260"
        >
        </el-table-column>
        <el-table-column
          prop="desc"
          label="设备描述"
        >
        </el-table-column>
        <el-table-column
          prop="platform_address"
          label="平台地址"
        >
        </el-table-column>
        <el-table-column
          prop="area_code"
          label="区域码"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="enable"
          label="是否启用"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="dev_type"
          label="设备类型"
        >
        </el-table-column>
        <el-table-column
          prop="passageway"
          label="所属通道"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        class="fenye"
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="deviceTotal">
      </el-pagination>
    </el-dialog>
  </div>
</template>
<script>
import { addMonitoringName, getMonitoringList, removeMonitoring, getDeviceList } from '@/api/ele'
import { mapGetters } from 'vuex'
export default {
  name: 'electircSafety',
  data() {
    return {
      monitoringList: [
        
      ],
      selectRadio: '',
      monitoringVisible: false,
      deviceVisible: false,
      searchDeviceVisible: false,
      formMonitoringName: {
        name: ''
      },
      formDevice: {
        name: '',
        type: ''
      },
      deviceList: [
        {
          id: 123,
          name: 'abc'
        }
      ],
      deviceTotal: 0
    }
  },
  computed: {
    ...mapGetters([
      'uid'
    ])
  },
  mounted() {
    this.getMonitoring()
    
  },
  methods: {
    addMonitoring() {
      this.monitoringVisible = true
    },
    async initDeviceList(pageNum, pageSize) {
      const params = {
        pageNum,
        pageSize
      }
      const data = await getDeviceList(params)
      console.log(data)
      if(data.code == 20000) {
         const {count,list } = data.data
         this.deviceTotal = Number(count)
         this.deviceList = list
      }
     
    },
    async getMonitoring() {
      const { code, data } = await getMonitoringList({uid: this.uid})
      this.monitoringList = data
      console.log(111,data)
    },
    async saveName() {
      if(!this.formMonitoringName.name) {
        this.$message({
          message: '请填写监测点名称',
          type: 'warning'
        })
        return
      }
      console.log(this.uid)
      const {code,data} = await addMonitoringName({name: this.formMonitoringName.name, uid: this.uid})
      // this.monitoringList = data
      if(code == 20000) {
        this.getMonitoring()
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.monitoringVisible = false
      } else {
        this.$message.error('添加失败')
      }
      console.log(code)
    },
    async removeMonitoring() {
      if(!this.selectRadio) {
        this.$message.error('请选择要删除的监测点')
        return
      }
      console.log(this.selectRadio)
      const { code } = await removeMonitoring({id: this.selectRadio})
      if(code == 20000) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getMonitoring()
      }
      // console.log(data)
    },
    addDevice() {
      if(!this.selectRadio) {
        this.$message.error('请选择监测点')
        return
      }
      this.deviceVisible = true
    },
    removeDevice() {

    },
    searchDevice() {
      this.initDeviceList(0,10)
      this.searchDeviceVisible = true
    },
    handleCurrentChange(val) {
      console.log(val)
      this.initDeviceList(val - 1, 10)
    }
  }
}
</script>
<style scoped lang="scss">
  .box-card {
    margin-bottom: 20px;
  }
  .fenye {
    margin-top: 20px;
    text-align: right;
  }
</style>