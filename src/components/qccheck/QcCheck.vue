<template>
	<div class="preAudit-box preaudit-body">
		<el-row class="search-box">
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-form :inline="true" :model="listQuery" class="demo-form-inline">
						<!--<el-form-item label="申请编号">
            <el-input v-model="listQuery.loanId" placeholder="申请编号" size="small"></el-input>
          </el-form-item>-->

						<el-form-item label="客户姓名">
							<el-input v-model="listQuery.custName" placeholder="客户姓名" size="small" style="width:160px;"></el-input>
						</el-form-item>

						<el-form-item label="客户手机号">
							<el-input v-model="listQuery.custMobile" placeholder="客户手机号" size="small" style="width:160px;"></el-input>
						</el-form-item>

						<el-form-item label="客户经理">
							<el-input v-model="listQuery.salesEmpName" placeholder="客户经理" size="small" style="width:160px;"></el-input>
						</el-form-item>

						<!--<el-form-item label="证件号">
            <el-input v-model="listQuery.idNumber" placeholder="证件号" size="small"></el-input>
          </el-form-item>-->

						<el-form-item label="审核状态">
							<el-select v-model="listQuery.nodeStatus" placeholder="请选择" size="small" style="width:100px;">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>

						<el-form-item>
							<el-button type="primary" @click="search" size="small">查询</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-col>
		</el-row>

		<el-row class="toolbar">
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-button type="primary" size="small" @click="claimTask" v-if="checkPermiss('qc_sign')">签收</el-button>
					<el-button type="success" size="small" @click="completeTask" v-if="checkPermiss('qc_audit')">审核</el-button>
					<el-button type="warning" size="small" @click="transferTask" v-if="checkPermiss('qc_transfer')">转办</el-button>
					<el-button type="danger" size="small" @click="withdrawTask" v-if="checkPermiss('qc_withdraw')">撤回</el-button>
					<el-button type="info" size="small" @click="showAuditDetails" v-if="checkPermiss('qc_show')">详情</el-button>
				</div>
			</el-col>
		</el-row>

		<el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-table ref="tableData" :data="tableData" border stripe style="width: 100%" cell-class-name="cell-class" @select-all="selectAll" @select="selectChange" @current-change="handleCurrentRow" highlight-current-row>
						<el-table-column type="selection" min-width="20">
						</el-table-column>
						<el-table-column prop="loanId" label="申请编号" min-width="150"></el-table-column>
						<el-table-column prop="custName" label="客户姓名" min-width="90"></el-table-column>
						<el-table-column prop="custMobile" label="联系电话" min-width="120"></el-table-column>
						<el-table-column prop="idNumber" label="证件号" min-width="180"></el-table-column>
						<el-table-column prop="productName" label="申请产品" min-width="120"></el-table-column>
						<el-table-column prop="applyAmount" label="申请金额" min-width="90"></el-table-column>
						<el-table-column prop="salesEmpName" label="客户经理" min-width="90"></el-table-column>
						<el-table-column prop="applyDate" label="申请时间" min-width="150"></el-table-column>
						<el-table-column prop="createEmployeeVal" label="录单人" min-width="90"></el-table-column>
						<el-table-column prop="procStatusVal" label="状态" min-width="90"></el-table-column>
						<el-table-column prop="sourcesValue" label="来源" min-width="90"></el-table-column>
						<el-table-column label="操作" fixed="right" width="240">
							<template slot-scope="scope">
								<el-button @click="claimTask(scope.row)" size="small" type="text" v-if="checkPermiss('qc_sign') && !checkShowClaim(scope.row)">签收</el-button>
								<el-button @click="completeTask(scope.row)" size="small" type="text" v-if="checkPermiss('qc_audit')">审核</el-button>
								<el-button @click="transferTask(scope.row)" size="small" type="text" v-if="checkPermiss('qc_transfer') && checkShowClaim(scope.row)">转办</el-button>
								<el-button @click="withdrawTask(scope.row)" size="small" type="text" v-if="checkPermiss('qc_withdraw') && checkShowClaim(scope.row)">撤回</el-button>
								<el-button @click="showAuditDetails(scope.row)" size="small" type="text" v-if="checkPermiss('qc_show') && checkShowClaim(scope.row)">详情</el-button>
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

		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			<el-form :model="empModel" size="mini" :rules="rules" ref="empModel">
				<el-form-item label="办理人：" prop="userId">
					<el-select v-model="empModel.userId">
						<el-option v-for="item in groups" :key="item.empId" :label="item.empName" :value="item.empId">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="submitTransfer" size="mini">确 定</el-button>
    </span>
		</el-dialog>
	</div>
</template>

<script>
	import {
		fetchData,
		findById,
		updateData,
		removeData,
		createDataJson,
		createData
	} from '@/apis/httpapis'
	//import { fetchData, fetchPv } from '@/apis/httpapis'
	export default {
		name: 'Role',
		data() {
			return {
				options: [{
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
				tableData: null,
				total: null,
				listQuery: {
					page: 1,
					rows: 30,
					custName: '',
					loanId: '',
					nodeStatus: '1',
					idNumber: '',
					custMobile: '',
					salesEmpName: ''
				},
				currentRow: null,
				dialogVisible: false,
				groups: [],
				empModel: {
					userId: null
				},
				rules: {
					userId: [{
						required: true,
						message: '请选择办理人',
						trigger: 'change'
					}]
				}
			}

		},
		created() {

			this.getPager()
		},
		methods: {
			selectChange(selection, row) {
				this.$refs.tableData.clearSelection();
				this.$refs.tableData.toggleRowSelection(row, true);
				this.currentRow = row;
			},
			selectAll(selection) {
				this.$refs.tableData.clearSelection();
				this.$refs.tableData.setCurrentRow(null);
			},
			handleCurrentRow(val) {
				this.$refs.tableData.clearSelection();
				this.$refs.tableData.toggleRowSelection(val, true);
				this.currentRow = val;
			},
			selectUtil(row) {
				let applyId = row.applyId;
				if(null == applyId || applyId == "" || applyId == undefined) { //进入则为头部方法进入
					if(this.currentRow != null && this.currentRow != undefined && this.currentRow != "") {
						applyId = this.currentRow.applyId;
					} else {
						this.$message({
							message: '警告，请选择审核数据!',
							type: 'warning'
						});
						return null;
					}
				}
				this.applyId = applyId;
				return applyId;
			},
			getPager() {
				fetchData('/sys/qccheck/datagrid.do', this.listQuery).then(response => {
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
			search() {
				this.getPager();
			},
			selchage(selection) {
				this.multipleSelection = selection;
			},
			claimTask(row) { //签收
				let applyId = this.selectUtil(row);
				if(applyId != null) {
					findById('/sys/qccheck/claim.do?applyId=' + applyId)
						.then(res => {
							const result = res.data;
							if(result.success) {
								this.$message({
									message: '签收成功!',
									type: 'success'
								});
							} else {
								this.$message({
									message: result.msg,
									type: 'warning'
								});
							}
						}).catch(error => {
							this.$message({
								message: '签收异常!',
								type: 'error'
							});
						})
				}
			},
			completeTask(row) { //审核
				let applyId = this.selectUtil(row);
				if(applyId != null) {
					//验证签收
					let url = "/sys/qccheck/checkClaim.do?applyId=" + applyId;
					findById(url)
						.then(res => {
							const result = res.data;
							if(result.success) {
								this.$router.push({
									path: '/qcaudit/' + applyId
								});
							} else {
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
			},
			transferTask(row) { //转办
				let applyId = this.selectUtil(row);
				if(applyId != null) {
					this.empModel.userId = '';
					const url = "/sys/emp/deptemp.do";
					createDataJson(url).then(response => {
						this.groups = response.data;
						this.dialogVisible = true;
					}).catch(error => {
						this.$message({
							message: '数据获取异常!',
							type: 'warning'
						});
					})
				}
			},
			withdrawTask(row) { //撤回
				let applyId = this.selectUtil(row);
				if(applyId != null) {
					findById('/sys/qccheck/withdraw.do?applyId=' + applyId)
						.then(res => {
							const result = res.data;
							if(result.success) {
								this.$message({
									message: '撤回成功!',
									type: 'success'
								});
								this.getPager();
							} else {
								this.$message({
									message: '撤回失败!',
									type: 'warning'
								});
							}
						}).catch(error => {
							this.$message({
								message: '撤回异常!',
								type: 'error'
							});
						})
				}
			},
			submitTransfer(row) {
				const applyId = this.currentRow.applyId;
				this.$refs['empModel'].validate((valid) => {
					if(!valid) {
						this.$message({
							message: '请选择办理人!',
							type: 'error'
						});
						return false;
					} else {
						var url = "/sys/qccheck/complaint.do";
						createData(url, {
								applyId: applyId,
								userId: this.empModel.userId
							})
							.then(response => {
								var result = response.data
								if(result.success) {
									this.$message({
										message: result.msg,
										type: 'success' //success/warning/info/error
									});
									this.dialogVisible = false;
								} else {
									this.$message({
										message: result.msg,
										type: 'warning'
									});
								}
							})
					}
				});
			},
			showAuditDetails(row) {
				let applyId = this.selectUtil(row);
				if(applyId != null) {
					this.$router.push({
						path: '/qcdetails/' + applyId
					});
				}
			},
			checkPermiss(cpt) {
				return this.checkAction(cpt);
			},
			checkShowClaim(row) {
				const assignee = row.assignee;
				if(null == assignee || assignee == "" || assignee == undefined) {
					return false;
				} else {
					return true;
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.search-box,
	.toolbar {
		margin: 10px 5px 10px 30px;
	}
	
	.cell-class {
		height: 20px;
		padding: 6px 0px;
	}
	
	.splitter-paneR {
		overflow: auto;
	}
</style>
<style>
	.preaudit-body .el-table td {
		padding: 5px 0 !important;
	}
</style>