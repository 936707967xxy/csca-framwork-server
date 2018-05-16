<template>
	<div id="call-records-box" class="Credit-information">
		<el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-table ref="tableData" :data="tableData" border stripe style="width: 100%" cell-class-name="cell-class"  highlight-current-row>
						<el-table-column type="index" width="50"></el-table-column>
						<el-table-column prop="commUser" label="联系人" min-width="50"></el-table-column>
						<el-table-column prop="commPhone" label="手机号" min-width="80"></el-table-column>
						<el-table-column prop="commDate" label="通话时间" min-width="80"></el-table-column>
						<el-table-column prop="commTypeVal" label="通话类型" min-width="80"></el-table-column>
						<el-table-column prop="duration" label="通话时长" :formatter="formatTime" min-width="50"></el-table-column>
						<el-table-column prop="money" label="通话费用" min-width="50"></el-table-column>
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
	export default {
		name: 'callRecordes',
		props:{
    		applyId:String
  		},
		data() {
			return {
				tableData: null,
				total: null,
				listQuery: {
					page: 1,
					rows: 30,
					applyId: '',
				},
			}

		},
		created() {
			this.listQuery.applyId = this.applyId;
			this.getPager()
		},
		methods: {
			getPager() {
				fetchData('/sys/callrecord/pager.do', this.listQuery).then(response => {
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
			formatTime(row, column, seconds) {
			    return [
			        parseInt(seconds / 60 / 60),
			        parseInt(seconds / 60 % 60),
			        parseInt(seconds % 60)
			    ]
		        .join(":")
		        .replace(/\b(\d)\b/g, "0$1");
			}
		}
	}
</script>

<style scoped>
	.el-card__body{
	  padding: 0;
	}
	
	label {
	  font-size: 12px;
	}
	
	.el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__label {
	  font-size: 12px;
	}
	.el-form--inline .el-form-item__label{
	  font-size: 12px;
	}
	.table>tr>td{
	    padding: 5px;
	    vertical-align: top;
	    border-top: 1px solid #ddd;
	}
	table tr, td{
	    border:1px solid #ccc;
	    font-size: 13px;
	    height:30px;
	}
	table tr:first-of-type td{
	    background: #f5f5f5;
	}
	table tr td.zdName{
	
	  font-weight: 600;
	  text-align:center;
	  padding:5px;
	}
	div.el-card__body{
	  padding:0
	}
</style>