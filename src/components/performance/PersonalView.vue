<template>
	<div class="role-box">
		<el-row class="search-box">
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-form :inline="true" :model="listQuery" class="demo-form-inline">
						<el-form-item label="开始时间">
							<el-date-picker
							  	v-model="listQuery.startDate"
							  	type="date"
							  	placeholder="选择日期"
							  	value-format="yyyy-MM-dd">
						    </el-date-picker>
						</el-form-item>

						<el-form-item label="结束时间">
							<el-date-picker
							  	v-model="listQuery.endDate"
							  	type="date"
							  	placeholder="选择日期"
							  	value-format="yyyy-MM-dd">
						    </el-date-picker>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="search" size="small">查询</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-col>
		</el-row>
		
		
		<el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-table v-loading="loading"
					    element-loading-text="拼命加载中"
					    element-loading-spinner="el-icon-loading"
					    element-loading-background="rgba(0, 0, 0, 0.8)" 
					    :data="tableData" border style="width:100%;" cell-class-name="cell-class">
						<el-table-column type="selection" min-width="35" fixed></el-table-column>
						<el-table-column prop="appoperName" label="录入人员" min-width="100" fixed></el-table-column>
						<el-table-column prop="teamName" label="所属团队" min-width="100" fixed></el-table-column>
						<el-table-column prop="storeName" label="所属营业部" min-width="100" fixed></el-table-column>
						<el-table-column prop="record" label="放款数" min-width="100"></el-table-column>
						<el-table-column prop="loanAmount" label="放款额" min-width="100"></el-table-column>
						<el-table-column prop="conAmount" label="合同额" min-width="100"></el-table-column>
						<el-table-column prop="loanCount" label="进件数" min-width="100"></el-table-column>
						<el-table-column prop="finalBack" label="退件数" min-width="100"></el-table-column>
						<el-table-column prop="finalAudit" label="批核数" min-width="100"></el-table-column>
						<el-table-column prop="approvedAmount" label="批核额" min-width="100"></el-table-column>
						<el-table-column prop="finalConAmount" label="批核合同额" min-width="100"></el-table-column>
						<el-table-column prop="deniedLoans" label="拒贷数" min-width="100"></el-table-column>
						<el-table-column prop="giveNum" label="放弃数" min-width="100"></el-table-column>
						<el-table-column prop="giveMoney" label="放弃额" min-width="100"></el-table-column>
						<el-table-column prop="giveConAmount" label="放弃合同额" min-width="100"></el-table-column>
					</el-table>
				</div>
			</el-col>
		</el-row>

	</div>
</template>

<script>
	import {
		fetchData,
	} from '@/apis/httpapis'
	export default {
		name: 'person',
		data() {
			return {
				tableData: null,
				total: null,
				loading:true,
				listQuery:{
					startDate:'',
					endDate:''
				}
			}
		},
		created() {
			this.getPager()
		},
		methods: {
			getPager() {
				this.loading = true,
				fetchData('/sys/saleschart/findperson.do', this.listQuery).then(response => {
					this.loading = false,
					this.tableData = response.data.pageData
					this.total = response.data.recordCount
				})
			},
			handleSizeChange(val) {
				//console.log(`每页 ${val} 条`);
				this.listQuery.rows = val
				this.getPager();
			},
			handleCurrentChange(val) {
				//console.log(`当前页: ${val}`);
				this.listQuery.page = val;
				this.getPager();
			},
			search(){
				this.getPager();
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.el-table td,
	.el-table th {
		padding: 6px 0px;
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
</style>