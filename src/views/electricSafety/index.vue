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
      <el-table :data="monitoringList" stripe border style="width: 100%">
        >
        <el-table-column width="30">
          <template slot-scope="scope">
            <el-radio :label="scope.row" v-model="selectRadio" @change="selectChange">
              <span></span>
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="监测点名称"></el-table-column>
        <el-table-column label="监测点设备">
          <template slot-scope="scope">{{parsingDevice(scope.row.deviceList)}}</template>
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
      <el-table
        :data="deviceMapData"
        stripe
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="displayName" label="监测数据项"></el-table-column>
        <el-table-column prop="deviceName" label="所属设备"></el-table-column>
        <el-table-column prop="deviceType" label="设备类型"></el-table-column>
      </el-table>
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
          <el-input disabled v-model="formDevice.name"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="name">
          <el-input disabled v-model="formDevice.type"></el-input>
        </el-form-item>
        <el-button type="primary" @click="searchDevice">选择设备</el-button>
      </el-form>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>请选择数据项</span>
        </div>
        <el-row :gutter="10">
          <el-col :span="8" v-for="(item, index) in displayList" :key="index">
            <el-checkbox
              :label="item.displayId"
              v-model="checkDisplay"
              name="display"
            >{{item.displayName}}</el-checkbox>
          </el-col>
        </el-row>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deviceVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveMonitoring">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查询设备" :visible.sync="searchDeviceVisible" width="80%" top="10vh">
      <el-table :data="deviceList" stripe border style="width: 100%">
        <el-table-column width="30">
          <template slot-scope="scope">
            <el-radio :label="scope.row" v-model="deviceRadio">
              <span></span>
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="设备名称" width="260"></el-table-column>
        <el-table-column prop="desc" label="设备描述"></el-table-column>
        <el-table-column prop="platform_address" label="平台地址"></el-table-column>
        <el-table-column prop="area_code" label="区域码" width="100"></el-table-column>
        <el-table-column prop="enable" label="是否启用" width="50"></el-table-column>
        <el-table-column prop="type" label="设备类型"></el-table-column>
        <el-table-column prop="passageway" label="所属通道"></el-table-column>
      </el-table>
      <el-pagination
        class="fenye"
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="deviceTotal"
      ></el-pagination>
      <div slot="footer" class="dialog-footer">
        <el-button @click="searchDeviceVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveDevice">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  addMonitoringName,
  getMonitoringList,
  removeMonitoring,
  getDeviceList,
  getdisplayList,
  bindDevice,
  getDisplayId,
  removeDisplayId
} from "@/api/ele";
import { mapGetters } from "vuex";
export default {
  name: "electircSafety",
  data() {
    return {
      monitoringList: [],
      displayList: [],
      checkDisplay: [],
      deviceMapData: [],
      checkDeviceMapData: [],
      checkDisplayIds: [],
      deviceIds: [],
      selectRadio: "",
      deviceRadio: "",
      monitoringVisible: false,
      deviceVisible: false,
      searchDeviceVisible: false,
      formMonitoringName: {
        name: ""
      },
      formDevice: {
        name: "",
        type: ""
      },
      deviceList: [
        {
          id: 123,
          name: "abc"
        }
      ],
      deviceTotal: 0
    };
  },
  computed: {
    ...mapGetters(["uid"])
  },
  mounted() {
    this.getMonitoring();
  },
  methods: {
    addMonitoring() {
      this.monitoringVisible = true;
    },
    async initDeviceList(pageNum, pageSize) {
      const { deviceList = [] } = this.selectRadio;
      const devId = deviceList.map(item => {
        return item.deviceId;
      });
      const notId = devId.join(",");
      console.log(notId);
      const params = {
        pageNum,
        pageSize,
        notId
      };
      const data = await getDeviceList(params);
      console.log(data);
      if (data.code == 20000) {
        const { count, list } = data.data;
        this.deviceTotal = Number(count);
        this.deviceList = list;
      }
    },
    async initDsplayList(groupId) {
      const params = {
        groupId
      };
      const data = await getdisplayList(params);
      if (data.code == 20000) {
        this.displayList = data.data;
      }
      console.log(this.displayList);
    },
    async initDisplayId(val, monitoringId) {
      console.log(val);
      const data = await getDisplayId({ deviceId: val, monitoringId });
      this.deviceMapData = data.data;
      console.log(data);
    },
    async getMonitoring() {
      const { code, data } = await getMonitoringList({ uid: this.uid });
      this.monitoringList = data;
      console.log(111, data);
    },
    async saveName() {
      if (!this.formMonitoringName.name) {
        this.$message({
          message: "请填写监测点名称",
          type: "warning"
        });
        return;
      }
      console.log(this.uid);
      const { code, data } = await addMonitoringName({
        name: this.formMonitoringName.name,
        uid: this.uid
      });
      // this.monitoringList = data
      if (code == 20000) {
        this.getMonitoring();
        this.$message({
          message: "添加成功",
          type: "success"
        });
        this.monitoringVisible = false;
      } else if (code == 20002) {
        this.$message.error("监测点名称重复，请更换名称");
      } else {
        this.$message.error("添加失败");
      }
      console.log(code);
    },
    async removeMonitoring() {
      if (!this.selectRadio) {
        this.$message.error("请选择要删除的监测点");
        return;
      }
      console.log(this.selectRadio);
      const { code } = await removeMonitoring({ id: this.selectRadio.id });
      if (code == 20000) {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.getMonitoring();
      }
      // console.log(data)
    },
    addDevice() {
      if (!this.selectRadio) {
        this.$message.error("请选择监测点");
        return;
      }
      console.log(this.selectRadio);
      this.deviceVisible = true;
    },
    removeDevice() {
      console.log(this.checkDisplayIds);
      if (this.checkDisplayIds.length == 0) {
        this.$message.error("请选择数据项");
        return;
      }
      const params = {
        id: JSON.stringify(this.checkDisplayIds)
      };
      this.$confirm("此操作将永久删除该数据项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        removeDisplayId(params).then(res => {
          console.log(res);
          this.selectChange(this.deviceIds);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        });
      });
    },
    searchDevice() {
      this.initDeviceList(0, 10);
      this.deviceRadio = "";
      this.checkDisplay = [];
      this.searchDeviceVisible = true;
    },
    handleCurrentChange(val) {
      console.log(val);
      this.initDeviceList(val - 1, 10);
    },
    saveDevice() {
      console.log(this.deviceRadio);
      if (!this.deviceRadio) {
        this.$message.error("请选择设备");
        return;
      }
      this.formDevice.name = this.deviceRadio.name;
      this.formDevice.type = this.deviceRadio.type;
      this.searchDeviceVisible = false;
      this.initDsplayList(this.deviceRadio.groupId);
    },
    async saveMonitoring() {
      // 保存设备
      if (!this.formDevice.name) {
        this.$message.error("请选择设备");
        return;
      }
      console.log(this.checkDisplay);
      const params = {
        uid: this.uid,
        deviceId: this.deviceRadio.id,
        deviceName: this.deviceRadio.name,
        monitoringId: this.selectRadio.id,
        displayId: JSON.stringify(this.checkDisplay)
      };
      console.log(params);
      const data = await bindDevice(params);
      this.getMonitoring();
      this.formDevice = {
        name: "",
        type: ""
      };
      this.$message({
        type: "success",
        message: "新增成功!"
      });
      this.displayList = [];
      this.deviceVisible = false;
    },
    parsingDevice(device) {
      // console.log(device);
      const arr = [];
      device.map(item => {
        if (item.deviceName) arr.push(item.deviceName);
      });

      return arr.join("，");
    },
    selectChange(val) {
      this.deviceIds = val;
      const { id } = val;
      console.log(11111, id);
      const deviceIds = val.deviceList.map(item => {
        return item.deviceId;
      });
      this.initDisplayId(deviceIds.join(","), id);
    },
    handleSelectionChange(val) {
      const ids = val.map(item => {
        return item.mapId;
      });
      this.checkDisplayIds = ids;

      console.log(val);
    }
  }
};
</script>
<style scoped lang="scss">
.box-card {
  margin-bottom: 20px;
}
.fenye {
  margin-top: 20px;
  text-align: left;
}
</style>