<template>
	<div class="role-box">
		<el-row class="search-box">
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-form :inline="true" :model="listQuery" class="demo-form-inline">
						<el-form-item label="员工姓名">
							<el-input v-model="listQuery.empName" placeholder="员工姓名" size="small"></el-input>
						</el-form-item>
						<el-form-item label="员工工号">
							<el-input v-model="listQuery.empWorkNum" placeholder="员工工号" size="small"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="searchDept()" size="small" v-if="checkPermiss('emp_query')">查询</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-col>
		</el-row>

		<el-row class="toolbar">
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-button @click="handleGrant" size="mini" type="warning" v-if="checkPermiss('emp_grant')">授权</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-table :data="tableData" border style="width: 100%" cell-class-name="cell-class" @selection-change="selchage">
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column prop="userCode" label="工号" min-width="150"></el-table-column>
						<el-table-column prop="userName" label="姓名" min-width="100"></el-table-column>
						<el-table-column prop="status" label="状态" min-width="100"></el-table-column>
						<el-table-column prop="mobile" label="电话" min-width="200"></el-table-column>
						<el-table-column prop="companyEmail" label="邮箱" min-width="230"></el-table-column>
						<el-table-column prop="partName" label="部门" min-width="200"></el-table-column>
						<el-table-column prop="comName" label="公司" min-width="300"></el-table-column>
						<el-table-column label="操作" fixed="right" width="300">
							<template slot-scope="scope">
								<el-button @click="handleGrant(scope.row)" size="mini" type="warning" v-if="checkPermiss('emp_grant')">授权</el-button>
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

		<el-dialog title="授权" :visible.sync="dialogGrantVisible" width="30%" style="padding-left:40px;">
			<el-tree :data="treeData" ref="roleTree" :props="defaultProps" show-checkbox node-key="id" default-expand-all></el-tree>

			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogGrantVisible=false" size="small">取 消</el-button>
				<el-button type="primary" @click="grant" size="small">确 定</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script>
	import { fetchData, findById, updateData, postData, createData } from '@/apis/httpapis'

	export default {
		name: 'preaudit',
		data() {
			return {
				tableData: null,
				total: null,
				listQuery: {
					page: 1,
					rows: 30,
					empName: '',
					empWorkNum: ''
				},
				multipleSelection: [],
				dialogGrantVisible: false,
				treeData: [{}],
				defaultProps: {
					children: 'children',
					label: 'text'
				}
			}
		},
		created() {
			this.getPager()
		},
		methods: {
			/***************** 分页查询相关  ********************/
			getPager() {
				fetchData('/sys/emp/oa/datagrid.do', this.listQuery).then(response => {
					//console.info("^^^^^ :  " + JSON.stringify(response));
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
			searchDept(val) {
				this.getPager();
			},
			/************************************************/
			/***************** 公共调用区 ********************/
			checkPermiss(cpt) {
				return this.checkAction(cpt);
			},
			selchage(selection) {
				this.multipleSelection = selection;
			},
			/***********************************************/

			/***************** 工具栏区 ********************/

			/***********************************************/

			/***************** 每行操作区 ********************/
			handleGrant(node) {
				var id = node.userId;
				this.componentModel = node;
				if(undefined === id || null === id || '' === id) {
					var nodes = this.multipleSelection;
					if(null === nodes || '' === nodes || nodes.length < 1) {
						this.$message({
							message: '警告,请选择要授权的角色!',
							type: 'warning'
						});
						return;
					}
					if(nodes.length > 1) {
						this.$message({
							message: '警告,只支持单数据授权!',
							type: 'warning'
						});
						return;
					}
					id = nodes[0].userId;
					this.componentModel = nodes[0];
				}
				this.dialogGrantVisible = true;
				fetchData('/sys/role/treenode.do').then(response => {
					this.treeData = response.data
				})
				//console.log("员工工号" + id)
				//获取该角色的资源 /sys/role/permiss.do
				fetchData('/sys/emp/oa/roleid.do?empId=' + id).then(response => {
					//console.info("#######" + JSON.stringify(response.data))
					this.$refs.roleTree.setCheckedKeys(response.data);
				})

			},
			grant() {
				//角色ID
				const empId = this.componentModel.userId; // 采用工号授权角色

				//获取所有选择的树
				const cptKeys = this.$refs.roleTree.getCheckedKeys();

				const data = {
					empId: empId,
					roleIds: cptKeys.join(',')
				}
				//console.log("授权角色" + data.roleIds);
				fetchData('/sys/emp/grant.do', data).then(response => {
					const result = response.data;
					if(result.success) {
						this.$message({
							message: result.msg,
							type: 'success' //success/warning/info/error
						});
						this.dialogGrantVisible = false;
					} else {
						this.$message({
							message: result.msg,
							type: 'warning' //success/warning/info/error
						});
					}
				})
			},
			/***********************************************/

			statusFor(value, row, index) {
				var str = " ";
				if(value == '1' || value == 1) {
					str = "<a href='javascript:void(0)' style='color: green;'>正常</a>";
				} else {
					str = "<a href='javascript:void(0)' style='color: red;'>停用</a>";
				}
				return str;
			}
		}

	}
</script>

<style scoped>
	.el-table td,
	.el-table th {
		padding: 6px 0px;
	}
	
	.search-box,
	.toolbar {
		margin: 10px 5px 10px 30px;
	}
	
	.cell-class {
		height: 20px;
		padding: 6px 0px;
	}
</style>