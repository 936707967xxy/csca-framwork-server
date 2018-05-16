<template>
	<div class="role-box into-pieces">
		<el-row class="search-box">
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-form :inline="true" :model="listQuery" class="demo-form-inline">
						<el-form-item label="申请编号">
							<el-input v-model="listQuery.loanId" placeholder="申请编号" size="small" style='width:160px;'></el-input>
						</el-form-item>

						<el-form-item label="客户姓名">
							<el-input v-model="listQuery.custName" placeholder="客户姓名" size="small" style='width:100px;'></el-input>
						</el-form-item>

						<el-form-item label="客户手机号">
							<el-input v-model="listQuery.custMobile" placeholder="客户手机号" size="small" style='width:115px;'></el-input>
						</el-form-item>

						<el-form-item label="客户经理">
							<el-input v-model="listQuery.salesEmpName" placeholder="客户经理" size="small" style='width:100px;'></el-input>
						</el-form-item>
						<el-form-item label="证件号">
							<el-input v-model="listQuery.idNumber" placeholder="证件号" size="small" style='width:160px;'></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="searchApply()" size="small">查询</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-col>
		</el-row>

		<el-row class="toolbar">
			<el-button type="warning" size="small" @click="trackTask">追踪</el-button>
		</el-row>

		<el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-table ref="singleTable" height="630" :data="tableData" border stripe style="width:100%;" cell-class-name="cell-class" highlight-current-row @current-change="selchange">
						<el-table-column type="selection" min-width="35"></el-table-column>
						<el-table-column prop="loanId" label="申请编号" min-width="160"></el-table-column>
						<el-table-column prop="custName" label="客户姓名" min-width="100"></el-table-column>
						<el-table-column prop="custMobile" label="联系电话" min-width="120"></el-table-column>
						<el-table-column prop="idNumber" label="证件号" min-width="160"></el-table-column>
						<el-table-column prop="productName" label="申请产品" min-width="120"></el-table-column>
						<el-table-column prop="applyAmount" label="申请金额" min-width="120"></el-table-column>
						<el-table-column prop="salesEmpName" label="客户经理" min-width="100"></el-table-column>
						<el-table-column prop="createEmployeeVal" label="录单人" min-width="100"></el-table-column>
						<el-table-column prop="applyDate" label="申请时间" min-width="160"></el-table-column>
						<el-table-column prop="procStatusVal" :formatter="statusFormat" label="状态" min-width="100"></el-table-column>
						<el-table-column prop="sourcesValue" label="来源" min-width="100"></el-table-column>
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

		<el-dialog title="追踪" :visible.sync="trackVisible" width="38%">
			<div>
				<el-table :data="tasks" border stripe fit style="width:100%;" cell-class-name="cell-class">
					<el-table-column type="index" width="50"></el-table-column>
					<el-table-column prop="description" label="状态"></el-table-column>
					<el-table-column prop="handelTime" label="时间"></el-table-column>
				</el-table>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="trackVisible = false" size="mini">关闭</el-button>
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
		createData
	} from '@/apis/httpapis'
	import {
		formatDate
	} from '@/utils/date'

	export default {
		name: 'Dept',
		data() {
			return {
				tableData: null,
				total: null,
				listQuery: {
					page: 1,
					rows: 30,
					custName: '',
					loanId: '',
					nodeStatus: '0',
					idNumber: '',
					custMobile: '',
					salesEmpName: ''
				},
				currentRow: null,
				trackVisible: false,
				tasks: [{
					title: '未知',
					description: '未提交或已结束',
					handelTime: '',
					handelOption: '',
					nodeStatus: '',
					taskId: ''
				}],
			}
		},
		created() {
			this.getPager()
		},
		methods: {
			getPager() {
				fetchData('/sys/apply/track.do', this.listQuery).then(response => {
					var result = response.data;
					this.tableData = result.pageData;
					this.total = result.recordCount
				})
			},
			statusFormat(row, column, cellValue) {
				if(cellValue == null) {
					return "未提交";
				}else{
					return cellValue;
				}
			},
			handleSizeChange(val) {
				this.listQuery.rows = val
				this.getPager();
			},
			handleCurrentChange(val) {
				this.listQuery.page = val;
				this.getPager();
			},
			searchApply() {
				this.getPager();
			},
			selchange(val) {
				if(val) {
					this.$refs.singleTable.toggleRowSelection(val);
				} else {
					this.$refs.singleTable.clearSelection();
				}
				this.currentRow = val;
			},
			trackTask() {
				var applyId = this.currentRow.applyId;
				if(applyId != null && applyId != undefined && applyId != '') {
					findById('/sys/track/simplquery.do?applyId=' + applyId)
						.then(res => {
							const result = res.data;
							if(result != null && result != "" && result != undefined) {
								this.tasks = result;
								this.trackVisible = true;
							} else {
								this.$message({
									message: '该申请单未提交审核',
									type: 'warning'
								});
							}
						})
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
	.el-table__body-wrapper {
		overflow: inherit;
	}

	.search-box,
	.toolbar {
		margin: 10px 5px 5px 30px;
	}

	.cell-class {
		height: 20px;
		padding: 6px 0px;
	}
</style>
<style>
	.into-pieces .el-table td {
		padding: 10px 0 !important;
	}
</style>
