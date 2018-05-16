<template>
<div class="main-box">

  <el-row :gutter="20" style="margin:20px 0px;">
    <el-col :span="12">
      <el-card class="box-card">
    		<div slot="header" class="clearfix">
    			<span>任务待办</span>
    			<el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
    		</div>
        <el-table :data="tableData" border stripe fit style="width: 100%" cell-class-name="cell-class" ref="tableData" highlight-current-row>
          <el-table-column prop="loanId" label="申请编号" width="150"></el-table-column>
          <el-table-column prop="custName" label="客户姓名" min-width="90"></el-table-column>
          <el-table-column prop="idNumber" label="身份证号码" width="155"></el-table-column>
          <el-table-column prop="applyDate" label="申请时间" width="155"></el-table-column>
          <el-table-column prop="taskName" label="状态" min-width="90"></el-table-column>
          <el-table-column prop="assignee" label="签收人" min-width="80"></el-table-column>
          <el-table-column label="操作" min-width="50" fixed="right">
            <template slot-scope="scope">
              <el-button v-if="!checkShowClaim(scope.row)"  @click="claimTask(scope.row)" size="mini" type="text" >签收</el-button>
              <el-button  @click="completeTask(scope.row)" size="mini" type="text" >审核</el-button>

              
            </template>
          </el-table-column>
        </el-table>
    	</el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card">
    		<div slot="header" class="clearfix">
    			<span>通知公告</span>
    			<el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
    		</div>
        <div class="text item">
    			<h4>开发中......</h4>
    		</div>
    	</el-card>
    </el-col>
  </el-row>

  <el-row :gutter="20" style="margin:20px 0px;">
    <el-col :span="12">
      <el-card class="box-card">
    		<div slot="header" class="clearfix">
    			<span>资料共享</span>
    			<el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
    		</div>
    		<div class="text item">
    			<h4>开发中......</h4>
    		</div>
    	</el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card">
    		<div slot="header" class="clearfix">
    			<span>更新日志</span>
    			<el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
    		</div>
    		<div class="text item">
    			<p>1、加强权限的验证</p>
          <p>2、咨询页面的优化</p>
          <p>3、申请页面选取咨询数据</p>
          <p>4、申请列表、质检列表、补充资料列表查询优化</p>
    		</div>
    	</el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
import {
  fetchData,
  findById,
  updateData,
  removeData,
  createDataJson
} from '@/apis/httpapis'

export default {
	name: 'mainView',
	data() {
		return {
      applyId: '',
      tableData:[]
		}
	},
  created() {
    this.getPager()
  },
  methods: {
    getPager() {
      fetchData('/sys/upcomingtask/page.do', this.listQuery).then(response => {
        //console.log(response.data); 
        this.tableData = response.data
        //this.total = response.data.recordCount taskKey判断页面跳转显示  businessKey== applyId
      })
    },
    checkShowClaim(row){
        const assignee = row.assignee;
        if(null == assignee || assignee == "" || assignee == undefined){
          return false;
        }else{
          return true;
        }
    },
    claimTask(row) {
      const applyId = row.businessKey;
        if(applyId!=null){
          var url = "/sys/upcomingtask/claim.do?applyId=" + applyId;
          createDataJson(url)
            .then(response => {
              var result = response.data
              if(result.success) {
                this.$message({
                  message: result.msg,
                  type: 'success' //success/warning/info/error
                });
              } else {
                this.$message({
                  message: result.msg,
                  type: 'warning'
                });
              }
            })
        }
     },
     completeTask(row){//审核
      const applyId = row.businessKey;
        if(applyId!=null){
        //验证签收
        var url ="/sys/upcomingtask/checkclaim.do?applyId="+applyId;
        findById(url)
        .then(res => {
          const result = res.data;
          if(result.success){
              var taskKey = row.taskKey;//makeCon   qcCheck   addData
              if(taskKey != null && taskKey=="qcCheck"){
                  this.$router.push({path: '/qccheck'});
              }
              if(taskKey != null && taskKey=="makeCon"){
                  this.$router.push({
                      path: '/making' 
                  });
              }
              if(taskKey != null && taskKey=="addData"){
                  this.$router.push({
                      path: '/supplement' 
                  });
              }
          }else{
            this.$message({
              message: result.msg,
              type: 'warning'
            });
          }
        }).catch(error => {
          this.$message({
            message: result.msg,
            type: 'error'
          });
        })
        }
    }


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
	font-weight: normal;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	display: inline-block;
	margin: 0 10px;
}

a {
	color: #42b983;
}

.clearfix span{
  font-size: 18px;
  font-weight: 600;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

.box-card{
  min-height: 360px;
}
.text p{
  font-size: 14px;
  font-weight: 600;
}
</style>
<style>
	.main-box .el-table td {
		padding: 7px 0 !important;
	}
</style>
