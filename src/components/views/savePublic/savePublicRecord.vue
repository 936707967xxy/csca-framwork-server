<!--
	Created by yangfei on 2018/5/02.
    存公记录
-->
<template>
  <div id="normal-type-box" class="wrap-box money-daihou-style">
		<div class="crumbs hander-class">
			<el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>贷后管理</el-breadcrumb-item>
				<el-breadcrumb-item>存公记录列表</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="handle-box hander-class">
			<el-form :inline="true" :model="listQuery" class="demo-form-inline" ref="listQuery" label-width="100px">
        <el-form-item label="客户姓名:" prop="castName" >
					<el-input v-model="listQuery.castName" placeholder="客户姓名" size="small"></el-input>
				</el-form-item>
        <el-form-item label="流水号:" prop="refnbr" >
					<el-input v-model="listQuery.refnbr" placeholder="流水号" size="small"></el-input>
				</el-form-item>
        <el-form-item label="交易日期:" prop="transactionDate" >
					<el-date-picker style="width:200px;" v-model="listQuery.transactionDate" type="date" placeholder="选择日期" size="small"
                          format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
				</el-form-item>
				<el-form-item label="合同编号:" prop="conNo" >
					<el-input v-model="listQuery.conNo"  placeholder="合同编号" size="small" ></el-input>
				</el-form-item>
				<el-form-item label="数据来源:" prop="dataSources" >
          <el-select v-model="listQuery.dataSources" placeholder="请选择" size="small">
            <el-option label="银企直连" value="银企直连"></el-option>
            <el-option label="结算导入" value="结算导入" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="借贷标示:" prop="amtcdr" >
          <el-select v-model="listQuery.amtcdr" placeholder="请选择" size="small">
              <el-option label="收入" value="C"></el-option>
              <el-option label="支出" value="B" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否认领:" prop="verificationStatus" >
          <el-select v-model="listQuery.verificationStatus" placeholder="请选择" size="small">
              <el-option label="未认领" value="0"></el-option>
              <el-option label="已认领" value="1" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-r-btn">
            <el-button type="primary" @click="searchProductType" size="small">查询</el-button>
            <el-button type="primary" @click="resetSearch('listQuery')" size="small">重置 </el-button>
        </el-form-item>
        <div>
          <el-form-item class="form-r-btn">
            <el-button type="primary" @click="downloadExcel" size="small">导出</el-button>
            <el-upload
              ref="excelUpload"
              style="display:inline-block;margin-left:10px;"
						  action="/after/cungong/addCungongRecordService.do"
						  Content-Type="multipart/form-data;boundary=----WebKitFormBoundarybbVGmBFrBjkoTcMq;charset=UTF-8"
						  :on-error="excelhandleError"
						  :on-success="excelhandleSuccess"
						  accept=".xls"
						  :limit="1"
						  >
						  <el-button size="small" type="success">存公导入</el-button>
						</el-upload>
          </el-form-item>
        </div>
			</el-form>
		</div>
    <!-- 列表 -->
      <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :data="tableData" :stripe="true" border style="width:100%" cell-class-name="cell-class" @selection-change="selchage" height="570" size="medium">
				<el-table-column type="selection" width="46" align="center"></el-table-column>
				<el-table-column prop="rpynam" label="收/付方名称" min-width="170" align="center" fixed></el-table-column>
				<el-table-column prop="rpyacc" label="收/付方帐号" min-width="170" align="center" fixed></el-table-column>
				<el-table-column prop="trsamtc" label="贷方金额" min-width="100" align="center" fixed></el-table-column>
				<el-table-column prop="refnbr" label="流水号" min-width="200" align="center"></el-table-column>
				<el-table-column prop="transactionDate" label="交易日期" min-width="170" align="center"></el-table-column>
				<el-table-column prop="etytim" label="交易时间" min-width="120" align="center" ></el-table-column>
				<el-table-column prop="trscod" label="交易类型" min-width="120" align="center"></el-table-column>
				<el-table-column prop="amtcdr" label="借贷标示" min-width="80" align="center">
          <template  slot-scope="props">
              <span v-show="props.row.amtcdr=='C'">收入</span>
              <span v-show="props.row.amtcdr=='B'">支出</span>
          </template>
        </el-table-column>
				<el-table-column prop="trsblv" label="公户余额" min-width="120" align="center"></el-table-column>
				<!-- <el-table-column prop="reqnbr" label="流程实例号" min-width="170" align="center"></el-table-column> -->
				<!-- <el-table-column prop="busnam" label="业务名称" min-width="120" align="center"></el-table-column> -->
				<el-table-column prop="narext" label="扩展摘要" min-width="170" align="center"></el-table-column>
				<el-table-column prop="trsamt" label="交易金额" min-width="100" align="center"></el-table-column>
				<el-table-column prop="creatTime" label="导入时间" min-width="170" align="center"></el-table-column>
				<el-table-column prop="rpybnk" label="银行名称" min-width="170" align="center"></el-table-column>
				<el-table-column prop="rpyadr" label="开户行地址" min-width="170" align="center">
        </el-table-column>
				<el-table-column prop="corporateBankAccount" label="对应公户" min-width="170" align="center"></el-table-column>
				<el-table-column prop="dataSources" label="数据来源" min-width="170" align="center"></el-table-column>
				<el-table-column prop="verificationStatus" label="是否认领" min-width="80" align="center">
          <template  slot-scope="props">
              <span v-show="props.row.verificationStatus=='0'">未认领</span>
              <span v-show="props.row.verificationStatus=='1'">已认领</span>
          </template>
        </el-table-column>
				<el-table-column prop="naryur" label="摘要" min-width="180" align="center"></el-table-column>
				<!-- <el-table-column prop="castId" label="客户ID" min-width="170" align="center"></el-table-column> -->
				<el-table-column prop="verificationPeopleId" label="认领人ID" min-width="170" align="center"></el-table-column>
				<el-table-column prop="verificationPeopleName" label="认领人姓名" min-width="100" align="center"></el-table-column>
				<el-table-column prop="castName" label="客户姓名" min-width="100" align="center"></el-table-column>
				<el-table-column prop="loanId" label="进件编号" min-width="170" align="center"></el-table-column>
				<el-table-column prop="stream" label="认领期次" min-width="100" align="center"></el-table-column>
				<el-table-column prop="verificationPeopleDate" label="认领时间" min-width="170" align="center"></el-table-column>
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
  </div>
</template>

<script>
import { fetchData } from "@/apis/httpapis";
import { formatDate } from "@/utils/date";
import axios from "axios";
import { formatIdCard, formatPhone } from "@/utils/InfoFormat.js";

export default {
  data() {
    return {
      loading:true,
      tableData: [],
      total: 0,
      listQuery: {
        page: 1,
        pageSize: 30,
        refnbr: "",
        transactionDate: "",
        amtcdr: "",
        castId: "",
        castName: "",
        dataSources:"",
        verificationStatus:"",
      },
      //列表Model
      selectList:[],
    };
  },
  created() {
    this.getPager();
  },
  methods: {
    getPager() {
      fetchData("/after/cungong/queryCungongRecordService.do", this.listQuery).then(
        response => {
          this.tableData = response.data.pageData;
          this.total = response.data.recordCount;
          this.loading = false;
        }
      );
    },

    // 导入
    excelhandleError(response, file, fileList) {
      this.$message({
        message: file.name + "上传失败",
        type: "warning",
        duration: 5000
      });
      this.$refs.excelUpload.clearFiles();
    },
    excelhandleSuccess(response, file, fileList) {
      if (response.success) {
        this.$message({
          title: "提示",
          message: response.msg,
          type: "success",
          duration: 5000
        });
        this.$refs.excelUpload.clearFiles();
      } else {
        this.$message({
          title: "提示",
          message: "上传失败",
          type: "warning",
          duration: 5000
        });
        this.$refs.excelUpload.clearFiles();
      }
    },
    //导出
    downloadExcel() {
      axios.post("/after/cungong/downloanCungongRecordService.do", this.listQuery, {
          responseType: "arraybuffer"
        })
        .then(res => {
          var fileDownload = require("js-file-download");
          fileDownload(
            res.data,
            "存公记录列表" + formatDate(new Date(), "yyyyMMddhhmmss") + ".xlsx"
          );
        });
    },
    // 分页
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

    //列表选择变化
    selchage(selection) {
      if (selection.length > 0) {
        this.selectList = selection;
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
