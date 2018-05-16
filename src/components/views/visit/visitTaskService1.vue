<!--
	Created by yangfei on 2018/05/08.
    外访任务
-->
<template>
  <div id="normal-type-box" class="wrap-box money-daihou-style">
		<div class="crumbs hander-class">
			<el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>贷后管理</el-breadcrumb-item>
				<el-breadcrumb-item>外访任务</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="handle-box hander-class">
			<el-form :inline="true" :model="listQuery" ref="listQuery" label-width="100px">
				<el-form-item label="进件编号:" prop="loanId">
					<el-input v-model="listQuery.loanId"  placeholder="进件编号" size="small" ></el-input>
				</el-form-item>
				<el-form-item label="合同编号:" prop="applyId">
					<el-input v-model="listQuery.applyId"  placeholder="申请编号" size="small" ></el-input>
				</el-form-item>
				<el-form-item label="合同编号:" prop="conNo">
					<el-input v-model="listQuery.conNo"  placeholder="合同编号" size="small" ></el-input>
				</el-form-item>
				<el-form-item label="客户姓名:" prop="castName">
					<el-input v-model="listQuery.castName" placeholder="客户姓名" size="small"></el-input>
				</el-form-item>
				<el-form-item label="身份证号码:" prop="cardNo">
					<el-input v-model="listQuery.cardNo" placeholder="身份证号" size="small"></el-input>
				</el-form-item>
				<el-form-item label="手机号码:" prop="tel">
					<el-input v-model="listQuery.tel" placeholder="手机号码" size="small"></el-input>
				</el-form-item>
        <el-form-item label="是否分配:" prop="isTask">
          <el-select v-model="listQuery.isTask" placeholder="请选择" size="small">
            <el-option label="已分配" value="0"></el-option>
            <el-option label="未分配" value="1"></el-option>
          </el-select>
				</el-form-item>
        <el-form-item class="form-r-btn">
          <el-button type="primary" @click="searchProductType" size="small">查询</el-button>
          <el-button type="primary" @click="resetSearch('listQuery')" size="small">重置 </el-button>
        </el-form-item>
        <div>
          <el-form-item class="form-r-btn">
            <el-button type="primary" @click="monthDeduct('0')" size="small">外访提醒</el-button>
            <el-button type="primary" @click="monthDeduct('1')" size="small">外访留案</el-button>
            <!-- <el-button type="primary" @click="downloadExcel" size="small">导出</el-button> -->
          </el-form-item>
        </div>
			</el-form>
		</div>
    <!-- 列表 -->
    <el-table :data="tableData" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
              :stripe="true" border style="width:100%" cell-class-name="cell-class" @select="selchage" height="500" size="medium">
				<el-table-column type="selection" width="46" align="center"></el-table-column>
				<el-table-column prop="loanId" label="进件编号" min-width="200" align="center" fixed></el-table-column>
				<el-table-column prop="applyId" label="申请编号" min-width="200" align="center" fixed></el-table-column>
				<el-table-column prop="castName" label="客户姓名" min-width="120" align="center" fixed></el-table-column>
				<el-table-column prop="conNo" label="合同编号" min-width="230" align="center"></el-table-column>
				<el-table-column prop="tel" label="手机号码" min-width="170" align="center" :formatter="phoneFor" ></el-table-column>
				<el-table-column prop="cardNo" label="身份证号" min-width="170" align="center" :formatter="idCardFor"></el-table-column>
				<el-table-column prop="loanPeriod" label="贷款期数" min-width="100" align="center"></el-table-column>
				<el-table-column prop="currentPeriod" label="当前期数" min-width="100" align="center"></el-table-column>
				<el-table-column prop="loanMoney" label="放款金额" min-width="120" align="center"></el-table-column>
        <el-table-column prop="dalayFlag" label="是否逾期" min-width="100" align="center">
          <template  slot-scope="props">
              <span v-show="props.row.dalayFlag=='0'">逾期</span>
              <span v-show="props.row.dalayFlag=='1'">未逾期</span>
          </template>
        </el-table-column>
				<el-table-column prop="managerCast" label="客服名称" min-width="100" align="center"></el-table-column>
				<el-table-column prop="loanManagerCast" label="贷后客服" min-width="100" align="center"></el-table-column>
				<el-table-column prop="mSection" label="M段" min-width="100" align="center"></el-table-column>
				<el-table-column prop="statementDate" label="账单日" min-width="170" align="center"></el-table-column>
				<el-table-column prop="conMoney" label="合同金额" min-width="120" align="center"></el-table-column>
				<el-table-column prop="outboundAddress" label="申请地址" min-width="200" align="center"></el-table-column>
				<el-table-column prop="overdueStatus" label="催收状态" min-width="100" align="center"></el-table-column>
				<el-table-column prop="outboundDate" label="建议上门时间" min-width="180" align="center"></el-table-column>
				<el-table-column prop="overdueDesc" label="催收详情" min-width="180" align="center"></el-table-column>
				<el-table-column prop="applyDesc" label="申请备注" min-width="170" align="center"></el-table-column>
				<el-table-column prop="surplusPeriod" label="剩余期数" min-width="100" align="center"></el-table-column>
				<el-table-column prop="loanManagerCastName" label="贷后客服" min-width="170" align="center"></el-table-column>
				<el-table-column prop="outboundStatus" label="外访申请状态" min-width="120" align="center">
          <template  slot-scope="props">
              <span v-show="props.row.settleFlag=='0'">通过</span>
              <span v-show="props.row.settleFlag=='1'">失效</span>
              <span v-show="props.row.settleFlag=='3'">申请中</span>
              <span v-show="props.row.settleFlag=='4'">催收结束转正常时效</span>
          </template>
        </el-table-column>
				<el-table-column prop="outboundId" label="外访人员编号" min-width="170" align="center"></el-table-column>
				<el-table-column prop="outboundName" label="外访人员姓名" min-width="120" align="center"></el-table-column>
				<el-table-column prop="outboundDesc" label="外访情况说明" min-width="170" align="center"></el-table-column>
				<el-table-column prop="createTime" label="申请时间" min-width="170" align="center"></el-table-column>
				<el-table-column prop="updateTime" label="分配时间" min-width="170" align="center"></el-table-column>
		</el-table>
    <!-- 分页 -->
    <el-row style="margin-top:20px;">
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="1"
					:page-sizes="[30, 60, 90]"
					:page-size="2" layout="total, sizes, prev,pager, next, jumper"
					:total="total">
					</el-pagination>
				</div>
			</el-col>
		</el-row>

    <visit-remind  ref="visitRemindDialog" @init="getPager" :visitRemind="visitRemind"></visit-remind>
    <leaveapply-one ref="leaveApplyDialog" @init="getPager" :leaveApply="leaveApply"></leaveapply-one>

  </div>
</template>

<script>
import { fetchData,createDataJson } from "@/apis/httpapis";
import { formatDate } from "@/utils/date";
import axios from "axios";
import { formatIdCard, formatPhone } from "@/utils/InfoFormat.js";
import visitRemind from  "./visitRemind.vue";//外访提醒
import leaveApply from  "./leaveApply.vue";//留案申请


export default {
  data() {
    return {
      loading:true,
      dialogDetailTable:false,
      tableData: [],
      total: 0,
      listQuery: {
        page: 1,
        pageSize: 30,
        loanId: "",
        applyId: "",
        conNo: "",
        castName: "",
        cardNo: "",
        tel: "",
        isTask:"",//是否分配
        queryType:'1'
      },
      selectList:[],//列表选择
      selectList1:[],//职员列表选择
      empList:[],//客户还款记录
      loanIdList:[],
      appointPeopleId:[],
      visitRemind:{//外访提醒
        loanId:'',
        applyId:'',
        conNo:''
      },
      leaveApply:{//留案申请
        loanId:'',
      },
    };
  },
  created() {
    this.getPager();
  },
  components: {
      'visit-remind': visitRemind,
      'leaveapply-one':leaveApply,

  },
  methods: {
    getPager() {
      fetchData( "/after/visit/queryVisitTaskService.do",this.listQuery).then(response => {
        this.tableData = response.data.pageData;
        this.total = response.data.recordCount;
        this.loading = false;
      });
    },
    //导出
    downloadExcel() {
      axios.post("/after/visit/downloanVisitTaskService.do", this.listQuery, {responseType: "arraybuffer"})
        .then(res => {
          var fileDownload = require("js-file-download");
          fileDownload(
            res.data,
            "外访分配列表" + formatDate(new Date(), "yyyyMMddhhmmss") + ".xlsx"
          );
        });
    },
    // 列表选择
    selchage(selection) {
      if (selection.length > 0) {
        this.selectList = selection;
        let len = this.selectList.length;
        let loanId = "";
        let list = {};
        for(let i=0;i<len;i++) {
          loanId = this.selectList[i].loanId;
        }
        list = {
          loanId:loanId,
        }
        this.loanIdList.push(list);
      }
    },
    monthDeduct (state) {
      //必须选择数据
      if (this.selectList.length < 1) {
        this.$message({
          message: "警告,请选择数据!",
          type: "warning",
          duration:5000
        });
        return;
      } else if (this.selectList.length > 1) {
        this.$message({
          message: "警告,只允许单笔划扣!",
          type: "warning",
          duration:5000
        });
        return;
      }else{
        if(state == '0') {
          this.visitRemind.loanId = this.selectList[0].loanId;
          this.visitRemind.applyId = this.selectList[0].applyId;
          this.visitRemind.conNo = this.selectList[0].conNo;
          this.$refs.visitRemindDialog.show();
        }else if(state == '1') {
          this.leaveApply.loanId = this.selectList[0].loanId;
          this.$refs.leaveApplyDialog.show();

        }
      }
    },


    /**************** 分页 **********************/
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getPager();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getPager();
    },
    searchProductType() {
      this.getPager();
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
    }
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
</style>
