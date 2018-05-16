<!--
	Created by yangfei on 2018/3/23.
    划扣记录
-->
<template>
  <div id="normal-type-box" class="wrap-box money-daihou-style">
		<div class="crumbs hander-class">
			<el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>贷后管理</el-breadcrumb-item>
				<el-breadcrumb-item>划扣记录列表</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="handle-box hander-class">
			<el-form :inline="true" :model="listQuery" class="demo-form-inline" ref="listQuery" label-width="100px">
        <el-form-item label="客户姓名:" prop="castName" >
					<el-input v-model="listQuery.castName" placeholder="客户姓名" size="small"></el-input>
				</el-form-item>
        <el-form-item label="身份证号码:" prop="cardNo" >
					<el-input v-model="listQuery.cardNo" placeholder="身份证号" size="small"></el-input>
				</el-form-item>
        <el-form-item label="进件编号:" prop="loanId" >
					<el-input v-model="listQuery.loanId"  placeholder="进件编号" size="small" ></el-input>
				</el-form-item>
				<el-form-item label="合同编号:" prop="conNo" >
					<el-input v-model="listQuery.conNo"  placeholder="合同编号" size="small" ></el-input>
				</el-form-item>
				<el-form-item label="POS类型:" prop="posType" >
          <el-select v-model="listQuery.posType" placeholder="请选择" size="small">
            <el-option label="旧POS转新POS模式" value="0"></el-option>
            <el-option label="旧POS划扣模式" value="1" ></el-option>
            <el-option label="线上POS模式" value="2" ></el-option>
            <el-option label="新放款客户" value="3" ></el-option>
            <el-option label="新POS模式" value="4" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="划扣渠道:" prop="deductChannel" >
          <el-select v-model="listQuery.deductChannel" placeholder="请选择" size="small">
              <el-option label="线下宝付" value="XXBF"></el-option>
              <el-option label="线下富有" value="XXFY" ></el-option>
              <el-option label="线下存公" value="XXCG" ></el-option>
              <el-option label="线上宝付" value="XSBF" ></el-option>
              <el-option label="线上富友" value="XSFY" ></el-option>
              <el-option label="线上存公" value="XSCG" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="划扣状态:" prop="deductState" >
          <el-select v-model="listQuery.deductState" placeholder="请选择" size="small">
              <el-option label="成功" value="0"></el-option>
              <el-option label="失败" value="1" ></el-option>
              <el-option label="待定" value="2" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="划扣类型:" prop="deductType" >
          <el-select v-model="listQuery.deductType" placeholder="请选择" size="small">
              <el-option label="正常月还" value="1"></el-option>
              <el-option label="提前还款" value="2" ></el-option>
              <el-option label="逾期月还" value="3" ></el-option>
              <el-option label="余额充值" value="4" ></el-option>
          </el-select>
        </el-form-item>
				<el-form-item label="起始日期:" prop="startDate" >
					<el-date-picker style="width:200px;" v-model="listQuery.startDate" type="date" placeholder="选择日期" size="small"
                          format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
				</el-form-item>
				<el-form-item label="截止日期:" prop="endDate" >
					<el-date-picker style="width:200px;" v-model="listQuery.endDate" type="date" placeholder="选择日期" size="small"
                          format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
				</el-form-item>
        <el-form-item class="form-r-btn">
            <el-button type="primary" @click="searchProductType" size="small">查询</el-button>
            <el-button type="primary" @click="resetSearch('listQuery')" size="small">重置 </el-button>
        </el-form-item>
        <div>
          <el-form-item class="form-r-btn">
            <el-button type="primary" @click="downloadExcel" size="small">导出</el-button>
          </el-form-item>
        </div>
			</el-form>
		</div>
    <!-- 列表 -->
        <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :data="tableData" :stripe="true" border style="width:100%" cell-class-name="cell-class" @selection-change="selchage" height="570" size="medium">
				<el-table-column type="selection" width="46" align="center"></el-table-column>
				<el-table-column prop="loanId" label="进件编号" min-width="200" align="center" fixed></el-table-column>
				<el-table-column prop="conNo" label="合同编号" min-width="230" align="center" fixed></el-table-column>
				<el-table-column prop="castName" label="客户姓名" min-width="120" align="center" fixed></el-table-column>
				<el-table-column prop="castId" label="客户ID" min-width="230" align="center"></el-table-column>
				<el-table-column prop="posType" label="POS类型" min-width="100" align="center"></el-table-column>
				<el-table-column prop="bankAcount" label="开户行账号" min-width="170" align="center"></el-table-column>
				<el-table-column prop="bankName" label="银行名称" min-width="170" align="center"></el-table-column>
				<el-table-column prop="cardNo" label="身份证号" min-width="170" align="center" :formatter="idCardFor"></el-table-column>
				<el-table-column prop="tel" label="手机号码" min-width="170" align="center" :formatter="phoneFor" ></el-table-column>
				<el-table-column prop="deductChannel" label="划扣渠道" min-width="170" align="center"></el-table-column>
				<el-table-column prop="orderNo" label="订单号" min-width="170" align="center"></el-table-column>
				<el-table-column prop="deductMoney" label="划扣金额" min-width="170" align="center"></el-table-column>
				<el-table-column prop="dedutStream" label="划扣期数" min-width="170" align="center"></el-table-column>
				<el-table-column prop="deductState" label="划扣状态" min-width="170" align="center">
          <template  slot-scope="props">
              <span v-show="props.row.deductState=='0'">成功</span>
              <span v-show="props.row.deductState=='1'">失败</span>
              <span v-show="props.row.deductState=='2'">待定</span>
          </template>
        </el-table-column>
				<el-table-column prop="deductStateVal" label="划扣结果信息" min-width="170" align="center"></el-table-column>
				<el-table-column prop="deductDate" label="划扣时间" min-width="170" align="center"></el-table-column>
				<el-table-column prop="checkDate" label="查证时间" min-width="170" align="center"></el-table-column>
				<el-table-column prop="deductType" label="划扣类型" min-width="170" align="center"></el-table-column>
				<el-table-column prop="deductSercerMoney" label="划扣手续费" min-width="170" align="center"></el-table-column>
				<el-table-column prop="deductBal" label="划扣前账户存在余额" min-width="170" align="center"></el-table-column>
				<el-table-column prop="applicationCastName" label="划扣客服名称" min-width="170" align="center"></el-table-column>
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
        loanId: "",
        conNo: "",
        castName: "",
        cardNo: "",
        posType: "",
        deductChannel:"",
        deductState:"",
        startDate:"",
        endDate:"",
      },
      //列表Model
      listModel: {
        id: "",
        loanId:"",//进件编号
        conNo: "", //合同编号
        castName: "", //客户姓名
        castId:"",//客户ID
        posType:"",//POS类型
        bankAcount: "", //开户行账户
        bankName: "", //银行名称
        tel: "", //手机号码
        cardNo: "", //身份证号
        deductChannel: "", //划扣渠道
        orderNo: "", //订单号
        deductMoney: "", //划扣金额
        dedutStream: "", //划扣期数
        deductState: "", //划扣状态
        deductStateVal: "", //划扣结果信息
        deductDate: "", //划扣时间
        checkDate: "", //查证时间
        deductType: "", // 划扣类型
        deductSercerMoney: "", //划扣手续费
        deductBal: "", //划扣前账户存在余额
        applicationCastName: "" //划扣客服名称
      },
      queryType:"",
    };
  },
  created() {
    this.getPager();
  },
  methods: {
    getPager() {
      fetchData("/after/deduct/customerDeductService.do", this.listQuery).then(
        response => {
          this.tableData = response.data.pageData;
          this.total = response.data.recordCount;
          this.loading = false;
        }
      );
    },

    //导出
    downloadExcel() {
      axios.post("/after/deduct/downloadCusDeductService.do", this.listQuery, {
          responseType: "arraybuffer"
        })
        .then(res => {
          var fileDownload = require("js-file-download");
          fileDownload(
            res.data,
            "划扣记录列表" + formatDate(new Date(), "yyyyMMddhhmmss") + ".xlsx"
          );
        });
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
      if(this.listQuery.startDate > this.listQuery.endDate){
				 	this.$message({
            message: "起始时间不能大于结束时间！",
            type: 'warning',
            duration: 3000
          });
				 	return;
			}
      this.getPager();
    },

    /**************** 工具栏调用 **********************/
    resetSearch(formName) {
      this.$refs[formName].resetFields();
    },

    selchage(selection) {
      if (selection.length > 0) {
        this.multipleSelection = selection;
        this.listModel = this.multipleSelection[0];
      }
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
