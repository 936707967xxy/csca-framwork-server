<!--
	Created by yangfei on 2018/4/17.
    入账时间确定
-->
<template>
    <el-dialog title="逾期还款列表" :visible.sync="dialogDetailTable" width="60%" center :show-close='false' :close-on-click-modal='false'>
      <el-table :data="tableData" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
              :stripe="true" border style="width:100%" cell-class-name="cell-class" @selection-change="selchage" height="350" size="medium">
        <el-table-column type="selection" width="46" align="center"></el-table-column>
        <el-table-column prop="loanId" label="进件编号" min-width="180" align="center" fixed></el-table-column>
        <el-table-column prop="conNo" label="合同编号" min-width="200" align="center" fixed></el-table-column>
        <el-table-column prop="castName" label="客户姓名" min-width="100" align="center" fixed></el-table-column>
        <el-table-column prop="overdueNum" label="逾期期数" min-width="100" align="center"></el-table-column>
        <el-table-column prop="overdueDays" label="逾期天数" min-width="100" align="center"></el-table-column>
        <el-table-column prop="realOverDays" label="实际逾期天数" min-width="140" align="center">
          <template slot-scope="props">
            <el-input v-model.number="props.row.realOverDays" readonly rplaceholder="输入逾期天数" size="mini" ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="receivePenalty" label="应收违约金" min-width="120" align="center"></el-table-column>
        <el-table-column prop="receiveInterest" label="应收罚息" min-width="120" align="center"></el-table-column>
        <el-table-column prop="receivePenaltyInterest" label="应收违罚金" min-width="120" align="center"></el-table-column>
        <el-table-column prop="receiveCorpus" label="应还本金" min-width="120" align="center"></el-table-column>
        <el-table-column prop="receiveShouldinte" label="应还利息" min-width="120" align="center"></el-table-column>
        <el-table-column prop="amt" label="月还金额" min-width="120" align="center"></el-table-column>
        <el-table-column prop="receiveMoney" label="应收总额" min-width="120" align="center"></el-table-column>
        <el-table-column prop="settleFlag" label="结清标识" min-width="100" align="center">
          <template  slot-scope="props">
              <span v-show="props.row.settleFlag=='0'">已结清</span>
              <span v-show="props.row.settleFlag=='1'">未结清</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建日期" min-width="170" align="center"></el-table-column>
        <el-table-column prop="updateDate" label="修改时间" min-width="170" align="center"></el-table-column>
      </el-table>
      <fieldset class="fieldset-box">
			  <legend style="color: #409EFF;">实际打款日:</legend>
            <span>
              实际打款日：
              <el-date-picker v-model="nowDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="实际打款日" size="small" :picker-options="pickerOptions"></el-date-picker>
              <el-button type="primary" @click="nowDateFun" size="small">确定日期</el-button>
            </span>
            <span v-if="nomalFlag == '1'" style="margin-left:50px;">
              是否逾期转正：
              <el-select v-model="nomal"  placeholder="请选择" label="是否逾期转正" size="small">
                  <el-option label="不转正常" value="0"></el-option>
                  <el-option label="转正常" value="1" ></el-option>
              </el-select>
            </span>
      </fieldset>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelFun">取 消</el-button>
        <el-button type="primary" @click="submitFun">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
import { fetchData,createDataJson } from "@/apis/httpapis";
import { formatDate } from "@/utils/date";
import axios from "axios";

export default {
  data() {
    return {
      loading:true,
      dialogDetailTable: false,
      formLabelWidth: "150px",
      tableData:[],
      overdueModel : {
        overdueRecords:[],
      },
      nowDate:"",
      nomal:'',
      nomalFlag:"0",
      pickerOptions: {//限制日期
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      }
    };
  },
  props:{
    overdueDay:{
      loanId: String, //进件编号
    }
  },
  methods: {
    show(){
      this.dialogDetailTable = true;
      this.getList()
    },
    //逾期列表
    getList() {
      let data =  {
        loanId : this.overdueDay.loanId
      };
      fetchData("/after/overdue/overduedaysrollbacklist.do", data).then(
        response => {
          this.tableData = response.data;
          this.loading = false;
      });
    },
    // 实际打款日
    nowDateFun() {
      let data = {
        overdueRecords: this.tableData,
        nowDate: this.nowDate
      }
      createDataJson("/after/overdue/overduedaysrollbacklist2.do", data).then(
        response => {
          this.tableData = response.data.overdueRecords;
          this.nomalFlag = response.data.nomal;
          this.loading = false;
        });
    },
    // 逾期天数 确定
    submitFun() {
      this.overdueModel.overdueRecords = this.tableData;
      createDataJson("/after/overdue/overduedaysrollback.do", this.overdueModel).then(
        response => {
           if (!response.data.success) {
              this.$message({
                message: response.data.msg,
                type: "warning",
                duration:5000
              });
            }else {
              this.$message({
                message: response.data.msg,
                type: "success",
                duration:5000
              });
              this.dialogDetailTable = false;
              this.nowDate = "";
              this.nomalFlag = "0";
              this.nomal = "";
              this.$emit('init');
            }
        });
    },
    //逾期天数 取消
    cancelFun() {
      this.nowDate = "";
      this.nomalFlag = "0";
      this.nomal = "";
      this.dialogDetailTable = false;
      this.$emit('init');
    },
    //列表选择变化
    selchage(selection) {
      if (selection.length > 0) {
        this.selectList = selection;
      }
    },
     /**************** 工具栏调用 **********************/
    resetSearch(formName) {
      this.$refs[formName].resetFields();
    },
    phoneFor(row, column, cellValue) {//手机号中间*
      if (typeof cellValue != "undefined") {
        return formatPhone(cellValue);
      }
    },
    idCardFor(row, column, cellValue) {//身份证中间*
      if (typeof cellValue != "undefined") {
        return formatIdCard(cellValue);
      }
    },
  }
};
</script>

<style scoped>
.el-input--suffix .el-input__inner {
  padding-right: 18px;
}
.el-table td,
.el-table th {
  padding: 6px 0px;
  text-align: center;
}

.search-box {
  padding: 20px 30px 20px 30px;
}

.toolbar {
  padding: 0px 20px 30px 20px;
}

.cell-class {
  height: 20px;
  padding: 6px 0px;
}

.hander-class {
  margin: 15px 0px 15px 10px;
}
.money-daihou-style .el-table th {
  background-color: #409eff;
  color: #ffffff;
}
.money-daihou-style .el-table--border th {
  border-right: 1px solid #c0c4cc;
}
.money-daihou-style .el-input__inner {
  border: 1px solid #409eff;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.form-r-btn {
  margin-left: 30px;
}
.fieldset-box {
  padding: 10px;
  border-color: #fff;
}
</style>
