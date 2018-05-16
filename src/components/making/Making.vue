<template>
	<div class="role-box miking-box">
		<el-row class="search-box">
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-form :inline="true" :model="listQuery" class="demo-form-inline">
						<el-form-item label="申请编号">
							<el-input v-model="listQuery.loanId" placeholder="申请编号" size="small" style='width:160px;'></el-input>
						</el-form-item>

						<el-form-item label="客户姓名">
							<el-input v-model="listQuery.custName" placeholder="客户姓名" size="small" style='width:160px;'></el-input>
						</el-form-item>

						<el-form-item label="手机号">
							<el-input v-model="listQuery.custMobile" placeholder="手机号" size="small" style='width:160px;'></el-input>
						</el-form-item>

						<el-form-item label="审核状态">
							<el-select v-model="listQuery.nodeStatus" placeholder="请选择" size="small" style='width:100px;'>
								<el-option v-for="item in nodeStatus" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>

						<el-form-item>
							<el-button type="primary" @click="searchApply()" size="small">查询</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-col>
		</el-row>

		<el-row class="toolbar">
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-button type="primary" size="small" @click="claimTask" v-if="checkPermiss('con_sign')">签收</el-button>
					<el-button type="success" size="small" @click="createCon">拟制</el-button>
					<el-button type="warning" size="small" @click="completeTask">提交</el-button>
					<el-button type="danger" size="small" @click="transferTask" v-if="checkPermiss('con_sign')">转办</el-button>
					<el-button type="danger" size="small" @click="withdrawTask" v-if="checkPermiss('con_withdraw')">撤回</el-button>
					<el-button type="danger" size="small" @click="handleDownload">下载合同</el-button>
					<el-button type="info" size="small" @click="detail" v-if="checkPermiss('con_detail')">详情</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-table :data="tableData" border stripe fit style="width: 100%" cell-class-name="cell-class" @select-all="selectAll"  @select="selectChange" @current-change="handleCurrentRow" ref="tableData">
						<el-table-column type="selection" min-width="35"></el-table-column>
						<el-table-column prop="loanId" label="客户编号" min-width="190"></el-table-column>
						<el-table-column prop="custName" label="客户姓名" min-width="120"></el-table-column>
						<el-table-column prop="applyProductName" label="申请产品名称" min-width="160"></el-table-column>
						<el-table-column prop="applyAmount" label="申请金额" min-width="100"></el-table-column>
						<el-table-column prop="productName" label="批核产品" min-width="150"></el-table-column>
						<el-table-column prop="approvedAmount" label="批核金额" min-width="100"></el-table-column>
						<el-table-column prop="realRate" label="批核费率" min-width="100"></el-table-column>
						<el-table-column prop="salesEmpName" label="客户经理" min-width="100"></el-table-column>
						<el-table-column prop="createEmployeeVal" label="录单人" min-width="100"></el-table-column>
						<el-table-column prop="precessStatusVal" label="状态" min-width="120"></el-table-column>
						<el-table-column prop="isOnlineVal" label="标识" min-width="120"></el-table-column>
						<el-table-column label="操作" fixed="right" min-width="280">
							<template slot-scope="scope">
								<el-button @click="claimTask(scope.row)" size="mini" type="text" v-if="checkPermiss('con_sign')  && !checkShowClaim(scope.row)">签收</el-button>
								<el-button @click="createCon(scope.row)" size="mini" type="text">拟制</el-button>
								<el-button @click="completeTask(scope.row)" size="mini" type="text">提交</el-button>
								<el-button @click="transferTask(scope.row)" size="mini" type="text" v-if="checkPermiss('con_sign')  && checkShowClaim(scope.row)">转办</el-button>
								<el-button @click="withdrawTask(scope.row)" size="mini" type="text" v-if="checkPermiss('con_withdraw')  && checkShowClaim(scope.row)">撤回</el-button>
								<el-button @click="detail(scope.row)" size="mini" type="text" v-if="checkPermiss('con_detail')  && checkShowClaim(scope.row)">详情</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</el-col>
		</el-row>

		<el-row style="margin-top:20px;">
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[30, 60, 90, 120]" :page-size="30" layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>
			</el-col>
		</el-row>
		<!--转办弹出框-->
		<el-dialog :title="textMapOne[dialogStatusOne]" :visible.sync="dialogFormVisibleOne" :showClose="false" width="30%">
			<el-form :model="annexModelOne">
				<el-form-item label="转办为：">
					<el-select v-model="annexModelOne.userId" placeholder="请选择" @change="typeChangeOne">
						 <el-option  v-for="item in groups" :key="item.empId"  :label="item.empName" :value="item.empId">
						</el-option>
					</el-select>
					</el-cascader>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibleOne=false">取 消</el-button>
				<el-button type="primary" @click="submitUploadOne">确 定</el-button>
			</div>
		</el-dialog>
		<!--合同下载弹出框 -->
		<el-dialog :visible.sync="dialogFormVisible" :showClose="false" width="30%">
			<a :href="pladUrl">还款管理书</a><br>
			<a :href="twoUrl">借款协议(借款人声明)书</a><br>
			<a :href="threeUrl">授权委托书</a><br>
			<a :href="fourUrl">信用咨询与管理服务协议书</a><br>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible=false">取 消</el-button>
				<!-- <el-button type="primary" @click="">确 定</el-button> -->
			</div>
		</el-dialog>

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
	import {
		formatDate
	} from '@/utils/date'

	export default {
		name: 'making',
		data() {
			return {
				groups: [],
				applyId: '',
				isOnline: '',
				tableData: null,
				total: null,
				currentRow: null,
				listQuery: {
					page: 1,
					rows: 30,
					custName: '',
					loanId: '',
					nodeStatus: '1',
					idNumber: ''
				},
				rulesApplyModel: { //验证规则
					applyTypeId: [{
						required: true,
						message: '请选择附件描述',
						trigger: 'change'
					}]
				},
				nodeStatus: [{
	        value: '0',
	        label: '待签收'
	      }, {
	        value: '1',
	        label: '待审核'
	      }, {
	        value: '2',
	        label: '已审核'
	      }, {
	        value: '3',
	        label: '全部'
	      }],
				annexModelOne: {
					userId: '',
					userName: ''
				},
				annexModel: {
					contracts: '1'
				},

				dialogStatusOne: '',
				textMapOne: {
					create: '转办为'
				},
				dialogFormVisibleOne: false,
				dialogStatus: '',
				textMap: {
					create: '请选择合同类别'
				},
				dialogFormVisible: false
			}
		},
		created() {
			this.getPager()
		},
		computed: {
			pladUrl: function() {
				if(this.isOnline == 0) {
					return "/sys/making/downloadone.do?applyId=" + this.applyId;
				}
				if(this.isOnline == 1) {
					return "/sys/making/downloadhxbone.do?applyId=" + this.applyId;
				}
			},
			twoUrl: function() {
				if(this.isOnline == 0) {
					return "/sys/making/downloadtwo.do?applyId=" + this.applyId;
				}
				if(this.isOnline == 1) {
					return "/sys/making/downloadhxbtwo.do?applyId=" + this.applyId;
				}
			},
			threeUrl: function() {
				if(this.isOnline == 0) {
					return "/sys/making/downloadthree.do?applyId=" + this.applyId;
				}
				if(this.isOnline == 1) {
					return "/sys/making/downloadhxbthree.do?applyId=" + this.applyId;
				}
			},
			fourUrl: function() {
				if(this.isOnline == 0) {
					return "/sys/making/downloadfour.do?applyId=" + this.applyId;
				}
				if(this.isOnline == 1) {
					return "/sys/making/downloadhxbfour.do?applyId=" + this.applyId;
				}
			}
		},
		methods: {
			getPager() {
				fetchData('/sys/making/pager.do', this.listQuery).then(response => {
					this.tableData = response.data.pageData
					this.total = response.data.recordCount
				})
			},
			handleSizeChange(val) { //每页N条
				this.listQuery.rows = val
				this.getPager();
			},
			handleCurrentChange(val) { //当前页
				this.listQuery.page = val;
				this.getPager();
			},

			/*---------------------签收代码----------------------------*/
			//签收操作菜单
			claimTask(row) {
		      let applyId = this.selectUtil(row);
			    if(applyId!=null){
				this.applyId = applyId;
				//const applyId = row.applyId;
				var url = "/sys/making/claim.do?applyId=" + applyId;
				//this.$router.push({path: '/apply'});
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
			createCon(row) {
		      let applyId = this.selectUtil(row);
			    if(applyId!=null){
						const url = "/sys/making/checkclaim.do?applyId=" + applyId;
						createDataJson(url).then(response => {
							const result = response.data
							if(result.success) {
								this.$router.push({
									path: 'createcon/' + applyId
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
			completeTask(row) {
		      let applyId = this.selectUtil(row);
			    if(applyId!=null){
				const url = "/sys/making/checkclaim.do?applyId=" + applyId;
				createDataJson(url).then(response => {
					const result = response.data
					if(result.success) {
						this.$router.push({
							path: 'submitcon/' + applyId
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
			/*----------------下载合同-----------------------*/
			handleDownload(row) {
				let applyId = this.selectUtil(row);
	    		if(applyId!=null){
					this.downloadUtil(this.currentRow.isOnline, this.currentRow.applyId);
				}
			},
			download(row) {
				let applyId = row.applyId;
				let isOnline = row.isOnline;
				this.downloadUtil(applyId, isOnline);
			},
			downloadUtil(isOnline,applyId) {
				if(applyId == null || applyId == undefined || applyId == "") {
					applyId = this.currentRow.applyId;
					if(applyId == null || applyId == undefined || applyId == "") {
						this.$message({
							message: '请选取要操作的数据！',
							type: 'warning'
						});
						return false;
					}
				}
				this.applyId = applyId;
				this.isOnline = isOnline;
				var url = "/sys/making/selectcontracts.do";
				fetchData(url, {
						applyId: this.applyId
					})
					.then(response => {
						var result = response.data
						if(result.success) {
							this.$message({
								message: result.msg,
								type: 'success' //success/warning/info/error
							});
							this.dialogFormVisible = true;
						} else {
							this.$message({
								message: result.msg,
								type: 'warning'
							});
						}
					})
			},
			/*----------------------转办代码-----------------------------------*/
			//转办操作代码
			transferTask(row) {
				let applyId = this.selectUtil(row);
	    		if(applyId!=null){
				this.annexModelOne = {
					userId: '',
					userName: ''
				}
				var url = "/sys/emp/deptemp.do";
				//this.$router.push({path: '/apply'});
				createDataJson(url)
					.then(response => {
						var result = response.data
						this.dialogFormVisibleOne = true;
						this.groups = response.data;
					})
				}
			},
			//转办提交代码
			submitUploadOne() {
				const applyId = this.applyId;
				var url = "/sys/making/savecomplaint.do";
				//this.$router.push({path: '/apply'});
				fetchData(url, {
						applyId: this.applyId,
						userId: this.annexModelOne.userId
					})
					.then(response => {
						var result = response.data
						if(result.success) {
							this.$message({
								message: result.msg,
								type: 'success' //success/warning/info/error
							});
							this.dialogFormVisibleOne = false;
							this.getPager();
						} else {
							this.$message({
								message: result.msg,
								type: 'warning'
							});
						}
					})

			},
			//转办选择时给下拉框赋值
			typeChangeOne(value) {
				var opt = this.groups;
				var lab = null;
				for(var i = 0; i < opt.length; i++) {
					if(opt[i].value == value) {
						lab = opt[i].label;
					}
				}
				this.annexModelOne.userName = lab;
				//console.log("^^^"+this.annexModel.applyTypeVal);
			},
			/*-------------------撤回代码------------------------------*/
			//撤回操作代码
			withdrawTask(row) {
		      let applyId = this.selectUtil(row);
			    if(applyId!=null){
				this.applyId = applyId;
				//	const applyId = row.applyId;
				var url = "/sys/making/withdraw.do";
				//this.$router.push({path: '/apply'});
				fetchData(url, {
						applyId: applyId,
						remark: '3'
					})
					.then(response => {
						var result = response.data
						if(result.success) {
							this.$message({
								message: result.msg,
								type: 'success' //success/warning/info/error
							});
							this.getPager();
						} else {
							this.$message({
								message: result.msg,
								type: 'warning'
							});
						}
					})
					}
			},
			findById(id) {
				findById('/sys/applymodel/upselectapplybyid.do?applyId=' + id)
					.then(response => {
						this.annexModel = response.data;
					})
			},

			detail(row) {
		      let applyId = this.selectUtil(row);
			    if(applyId!=null){
				this.applyId = applyId;
				//	const applyId = row.applyId;
				this.$router.push({
					path: 'detail/' + applyId
				});
				}
			},
			searchApply() {
				this.getPager();
			},
		   selectChange(selection, row) {
				this.$refs.tableData.clearSelection();
				this.$refs.tableData.toggleRowSelection(row, true);
				this.currentRow = row;
			},
		    selectAll(selection){
		      this.$refs.tableData.clearSelection();
		      this.$refs.tableData.setCurrentRow(null)
		    },
		    handleCurrentRow(val) {
		      this.$refs.tableData.clearSelection();
		      this.$refs.tableData.toggleRowSelection(val,true);
		      this.currentRow = val;
		    },
		    selectUtil(row){
		    	let applyId = row.applyId;
		      if(null == applyId || applyId == "" || applyId == undefined){//进入则为头部方法进入
		        if(this.currentRow != null && this.currentRow != undefined && this.currentRow!= ""){
		          applyId = this.currentRow.applyId;
		        }else{
		          this.$message({
		            message: '警告，请选择审核数据!',
		            type: 'warning'
		          });
		          return null;
		        }
		      }
		      return applyId;
		    },
			checkPermiss(cpt) {
				return this.checkAction(cpt);
			},
			dateFor(row, column, cellValue) {
				if(typeof(cellValue) != "undefined") {
					return formatDate(new Date(cellValue), 'yyyy-MM-dd hh:mm:ss');
				}

			},
	    checkShowClaim(row){
	      const assignee = row.assignee;
	      if(null == assignee || assignee == "" || assignee == undefined){
	        return false;
	      }else{
	        return true;
	      }
	    },
		selectUtil(row){
          let applyId = row.applyId;
          if(null == applyId || applyId == "" || applyId == undefined){//进入则为头部方法进入
            if(this.currentRow != null && this.currentRow != undefined && this.currentRow!= ""){
              applyId = this.currentRow.applyId;
            }else{
              this.$message({
                message: '警告，请选择审核数据!',
                type: 'warning'
              });
              return null;
            }
          }
          this.applyId = applyId;
          return applyId;
        }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.cell-class {
		padding: 6px 0px;
	}

	.search-box,
	.toolbar {
		margin: 10px 5px 10px 30px;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 120px;
		height: 120px;
		line-height: 120px;
		text-align: center;
	}
	.avatar {
		width: 120px;
		height: 120px;
		display: block;
	}
	.el-dialog .el-input,
	.el-textarea {
		width: 50%;
	}
</style>
<style>
	.miking-box .el-table td {
		padding: 7px 0 !important;
	}
</style>
