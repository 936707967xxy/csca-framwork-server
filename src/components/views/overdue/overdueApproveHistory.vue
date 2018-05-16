<!--
	Created by yangfei on 2018/4/27.
    减免申请记录列表
-->
<template>
  <div id="normal-type-box" class="wrap-box money-daihou-style">
		<div class="crumbs hander-class">
			<el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>贷后管理</el-breadcrumb-item>
				<el-breadcrumb-item>减免申请记录</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="handle-box hander-class">
			<el-form :inline="true" :model="listQuery" class="demo-form-inline" ref="listQuery" label-width="100px">
				<el-form-item label="客户姓名:" prop="castName" >
					<el-input v-model="listQuery.castName" placeholder="客户姓名" size="small"></el-input>
				</el-form-item>
        <el-form-item label="进件编号:" prop="loanId" >
					<el-input v-model="listQuery.loanId"  placeholder="进件编号" size="small" ></el-input>
				</el-form-item>
				<el-form-item label="合同编号:" prop="conNo" >
					<el-input v-model="listQuery.conNo"  placeholder="合同编号" size="small" ></el-input>
				</el-form-item>
        <el-form-item label="申请类型:" prop="applyType" >
          <el-select v-model="listQuery.applyType" placeholder="请选择" size="small">
            <el-option label="请选择" value=""></el-option>
            <el-option label="单月减免申请" value="overdueSingle"></el-option>
            <el-option label="多月减免申请" value="overdueAll" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审批状态:" prop="applyStatus" >
						<el-select v-model="listQuery.applyStatus" placeholder="请选择" size="small">
							<el-option label="请选择" value=""></el-option>
							<el-option label="审批通过" value="0000"></el-option>
							<el-option label="审批拒绝" value="1111" ></el-option>
							<el-option label="待一级审批" value="2" ></el-option>
							<el-option label="待二级审批 " value="3" ></el-option>
						</el-select>
					</el-form-item>
        <el-form-item label="创建日期:" prop="createTime" >
					<el-date-picker style="width:200px;" v-model="listQuery.createTime" type="date" placeholder="选择日期" size="small"
                          format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
				</el-form-item>
        <el-form-item class="form-r-btn">
            <el-button type="primary" @click="searchProductType" size="small">查询</el-button>
            <el-button type="primary" @click="resetSearch('listQuery')" size="small">重置 </el-button>
        </el-form-item>
        <el-row>
          <el-col class="form-r-btn">
            <el-form-item>
              <el-button type="warning" @click="applyDialog(typeFlag)" size="small">减免申请详情</el-button>
              <el-button type="warning" @click="applyVotedownDialog(typeFlag)" size="small">减免否决</el-button>
              <!-- <el-button type="primary" @click="downloadExcel" size="small">导出</el-button> -->
            </el-form-item>
          </el-col>
        </el-row>

			</el-form>
		</div>
    <!-- 列表 -->
    <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :data="tableData"
              :stripe="true" border style="width:100%" cell-class-name="cell-class" @selection-change="selchage" height="500" size="medium">
        <el-table-column type="selection" width="46" align="center"></el-table-column>
        <el-table-column prop="applyId" label="申请单号" min-width="230" align="center" fixed></el-table-column>
        <el-table-column prop="applyType" label="申请类型" min-width="120" align="center" fixed>
          <template  slot-scope="props">
              <span v-show="props.row.applyType=='overdueSingle'">单月减免申请</span>
              <span v-show="props.row.applyType=='overdueAll'">多月减免申请</span>
          </template>
        </el-table-column>
        <el-table-column prop="loanId" label="进件编号" min-width="180" align="center"></el-table-column>
        <el-table-column prop="conNo" label="合同编号" min-width="180" align="center"></el-table-column>
        <el-table-column prop="applyStatus" label="审批状态" width="100" align="center">
            <template  slot-scope="props">
                <span v-show="props.row.applyStatus=='0000'">审批通过</span>
                <span v-show="props.row.applyStatus=='1111'">审批拒绝</span>
                <span v-show="props.row.applyStatus=='2'">待一级审批</span>
                <span v-show="props.row.applyStatus=='3'">待二级审批</span>
            </template>
        </el-table-column>
        <el-table-column prop="applicationCastId" label="申请人ID" min-width="120" align="center"></el-table-column>
        <el-table-column prop="applicationCastName" label="申请人姓名" min-width="120" align="center"></el-table-column>
        <el-table-column prop="applicationDesc" label="申请备注" min-width="100" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="castName" label="客户姓名" min-width="100" align="center"></el-table-column>
        <el-table-column prop="createTime" label="申请日期" min-width="170" align="center"></el-table-column>
        <el-table-column prop="updateDate" label="审批日期" min-width="170" align="center"></el-table-column>
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

    <overdueapply-one ref="overdueApplyOneDialog" @init="getPager" :overdueApplyParams="overdueApplyParams"></overdueapply-one>
    <overdueapply-more ref="overdueApplyMoreDialog" @init="getPager" :overdueApplyParams="overdueApplyParams"></overdueapply-more>
    <votedown-one ref="votedownOneDialog" @init="getPager" :overdueApplyParams="overdueApplyParams"></votedown-one>
    <votedown-more ref="votedownMoreDialog" @init="getPager" :overdueApplyParams="overdueApplyParams"></votedown-more>

  </div>
</template>

<script>
import {fetchData} from "@/apis/httpapis";
import { formatDate } from "@/utils/date";
import axios from "axios";
import { formatIdCard, formatPhone } from "@/utils/InfoFormat.js";
import overdueApplyOne from "./overdueApplyOneDetails3.vue";
import overdueApplyMore from "./overdueApplyMoreDetails3.vue";
import votedownOne from "./votedownOne.vue";
import votedownMore from "./votedownMore.vue";

export default {
  data() {
    return {
      loading:true,
      tableData: [],
      total: 0,
      listQuery: {
        page: 1,
        pageSize: 30,
        loanId: "",
        conNo: "",
        castName: "",
      },
      selectList:[],
      typeFlag:"",
      overdueApplyParams:{
        loanId:"",//申请单号
        applyId:"",//订单ID
        applyStatus:"",//审批状态
        castName:"",
        conNo:""
      }
    };
  },
  components: {
    'overdueapply-one': overdueApplyOne,
    'overdueapply-more': overdueApplyMore,
    'votedown-one': votedownOne,
    'votedown-more': votedownMore,
  },
  created() {
    this.getPager();
  },
  methods: {
    getPager() {
      fetchData("/after/subapply/subapplyHistory.do",this.listQuery).then(response => {
        this.tableData = response.data.pageData;
        this.total = response.data.recordCount;
        this.loading = false;
      });
    },
    //列表选择变化
    selchage(selection) {
      if (selection.length > 0) {
        this.selectList = selection;
        this.typeFlag = this.selectList[0].applyType;
      }
    },
  	applyDialog(typeFlag) {
			if(this.selectList.length > 1) {
					this.$message({
						message: '警告,只支持单数据申请!',
						type: 'warning'
					});
					return;
				}else if(this.selectList.length < 1){
					this.$message({
						message: '警告,请选择审批数据!',
						type: 'warning'
					});
					return;
				}else{
          this.overdueApplyParams.loanId = this.selectList[0].loanId;
          this.overdueApplyParams.applyId = this.selectList[0].applyId;
          this.overdueApplyParams.applyStatus = this.selectList[0].applyStatus;
          this.overdueApplyParams.castName = this.selectList[0].castName;
          this.overdueApplyParams.conNo = this.selectList[0].conNo;
          if(typeFlag == 'overdueSingle') {
            this.$refs.overdueApplyOneDialog.show();
          }else if(typeFlag == 'overdueAll') {
            this.$refs.overdueApplyMoreDialog.show();

          }
				}
      },
    applyVotedownDialog(typeFlag) {
      if(this.selectList.length > 1) {
        this.$message({
          message: '警告,只支持单数据申请!',
          type: 'warning'
        });
        return;
      }else if(this.selectList.length < 1){
        this.$message({
          message: '警告,请选择审批数据!',
          type: 'warning'
        });
        return;
      }else{
        this.overdueApplyParams.loanId = this.selectList[0].loanId;
        this.overdueApplyParams.applyId = this.selectList[0].applyId;
        this.overdueApplyParams.applyStatus = this.selectList[0].applyStatus;
        this.overdueApplyParams.castName = this.selectList[0].castName;
        this.overdueApplyParams.conNo = this.selectList[0].conNo;
        if(typeFlag == 'overdueSingle') {
          this.$refs.votedownOneDialog.show();
        }else if(typeFlag == 'overdueAll') {
          this.$refs.votedownMoreDialog.show();

        }
      }
    },
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
    phoneFor(row, column, cellValue) {
      //手机号中间*
      if (typeof cellValue != "undefined") {
        return formatPhone(cellValue);
      }
    },
    idCardFor(row, column, cellValue) {
      //身份证中间*
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
</style>
