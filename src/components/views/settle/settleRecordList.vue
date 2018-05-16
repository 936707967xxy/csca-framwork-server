<!--
	Created by yangfei on 2018/4/17.
    客户还款记录
-->
<template>
    <el-dialog title="客户还款记录" :visible.sync="dialogDetailTable" width="80%" center :close-on-click-modal='false' @close="cancelFun">
      <el-table :data="tableData" :stripe="true" border style="width:100%" cell-class-name="cell-class" height="550">
        <!-- <el-table-column type="index" label="序号" width="50" fixed></el-table-column> -->
				<el-table-column prop="loanId" label="进件编号" min-width="200" align="center" fixed></el-table-column>
				<el-table-column prop="castName" label="客户姓名" min-width="100" align="center" fixed></el-table-column>
				<el-table-column prop="repayDate" label="应还日期" min-width="170" align="center"></el-table-column>
				<el-table-column prop="stream" label="应还期次" min-width="80" align="center"></el-table-column>
				<el-table-column prop="receiveCorpus" label="当期应还本金" min-width="120" align="center"></el-table-column>
				<el-table-column prop="receiveShouldinte" label="当期应还利息" min-width="120" align="center"></el-table-column>
				<el-table-column prop="amt" label="当期月还款额" min-width="120" align="center"></el-table-column>
				<el-table-column prop="receivePenalty" label="当期应收违约金" min-width="120" align="center"></el-table-column>
				<el-table-column prop="receiveInterest" label="当期应收罚息" min-width="120" align="center"></el-table-column>
				<el-table-column prop="receivePenaltyInterest" label="当期应收违罚金" min-width="120" align="center"></el-table-column>
				<el-table-column prop="receiveMoney" label="当期应收总额" min-width="120" align="center"></el-table-column>
				<el-table-column prop="receiveAdvance" label="提前结清应还金额" min-width="150" align="center"></el-table-column>
				<el-table-column prop="channelServiceFee" label="提前还清减免渠道服务费" min-width="180" align="center"></el-table-column>
				<el-table-column prop="overdueDays" label="逾期天数" min-width="80" align="center"></el-table-column>
				<el-table-column prop="subMoney" label="减免金额" min-width="120" align="center"></el-table-column>
				<el-table-column prop="actualMoney" label="扣除金额" min-width="120" align="center"></el-table-column>
				<el-table-column prop="loanBookType" label="还款类型" min-width="100" align="center">
          <template  slot-scope="props">
              <span v-show="props.row.loanBookType=='1'">正常月还</span>
              <span v-show="props.row.loanBookType=='2'">提前还款</span>
              <span v-show="props.row.loanBookType=='3'">逾期月还</span>
          </template>
        </el-table-column>
		  </el-table>
    </el-dialog>
</template>

<script>
import { fetchData,createDataJson } from "@/apis/httpapis";
import { formatDate } from "@/utils/date";
import axios from "axios";

export default {
  data() {
    return {
      loading:false,
      dialogDetailTable: false,
      changeFlag:false,
      formLabelWidth: "150px",
      tableData:[],
      queryType:"",
      overdueModel : {
        overdueRecords:[]
      }
    };
  },
  props:{
    settleRecord:{
      loanId: String, //进件编号
    }
  },
  methods: {
    show(){
      this.dialogDetailTable = true;
      this.getList();
    },
    //逾期列表
    getList() {
      let data =  {
        loanId : this.settleRecord.loanId
      };
      fetchData( "/after/settle/loanBookCustomerService.do",data).then(response => {
        if(response.data.success) {
          this.tableData = response.data.data;
        }
      });
    },
    //逾期天数 取消
    cancelFun() {
      this.dialogDetailTable = false;
      this.$emit('init');
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
/* .money-daihou-style .el-table th {
  background-color: #409eff;
  color: #ffffff;
}
.money-daihou-style .el-table--border th {
  border-right: 1px solid #c0c4cc;
}
.money-daihou-style .el-input__inner {
  border: 1px solid #409eff;
} */
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
</style>
