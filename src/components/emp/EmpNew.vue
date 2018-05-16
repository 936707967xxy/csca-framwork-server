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
		                  	<el-button type="primary" @click="searchEmp()" size="small" v-if="checkPermiss('emp_query')">查询</el-button>
		                </el-form-item>
					</el-form>
				</div>
			</el-col>
		</el-row>

		<el-row class="toolbar">
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-button type="primary" size="small" @click="handleCreate" >添加</el-button>
					<el-button type="success" size="small" @click="handleUpdate" >修改</el-button>
					<el-button type="warning" size="mini"  @click="handleGrant"  >授权</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-table ref="tableData" :data="tableData" border stripe style="width: 100%" cell-class-name="cell-class" @current-change="handleCurrentRow">
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column prop="empWorkNum" label="工号" width="150"></el-table-column>
						<el-table-column prop="empName" label="姓名" width="100"></el-table-column>
						<el-table-column prop="empMobile" label="电话" width="200"></el-table-column>
						<el-table-column prop="empEmail" label="邮箱" width="220"></el-table-column>
						<el-table-column prop="comName" label="公司" width="300"></el-table-column>
						<el-table-column prop="deptName" label="部门" width="100"></el-table-column>
						<el-table-column prop="jobName" label="岗位" width="160"></el-table-column>
						<el-table-column prop="empStatus" label="状态" :formatter="handleEmpStatus">
						</el-table-column>
						<el-table-column label="操作" fixed="right" width="150">
							<template slot-scope="scope">
								<el-button @click="handleGrant(scope.row)" size="mini" type="text" >授权</el-button>
								<el-button @click="handleUpdate(scope.row)" size="mini" type="text">修改</el-button>
								<el-button @click="handleDelete(scope.row)" size="mini" type="text">删除</el-button>
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

		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
			<el-form :model="empModel" ref="empModel">
				<el-form-item label="工号" :label-width="formLabelWidth">
					<el-input v-model="empModel.empWorkNum" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="姓名" :label-width="formLabelWidth">
					<el-input v-model="empModel.empName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item  v-if="dialogStatus=='update'" label="员工状态" :label-width="formLabelWidth">
					<el-select v-model="empModel.empStatus"  placeholder="请选择">
						<el-option
						v-for="item in empStatus"
						:key="item.status"
						:label="item.value"
						:value="item.status">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="性别" :label-width="formLabelWidth">
					<el-input v-model="empModel.empSex" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="年龄" :label-width="formLabelWidth">
					<el-input v-model="empModel.empAge" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" :label-width="formLabelWidth">
					<el-input v-model="empModel.empEmail" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机号" :label-width="formLabelWidth">
					<el-input v-model="empModel.empMobile" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="地址" :label-width="formLabelWidth">
					<el-input v-model="empModel.empAddress" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="公司" :label-width="formLabelWidth">
					<el-autocomplete
					  	:fetch-suggestions="comQuerySearch"
					  	v-model="empModel.comName"
					  	placeholder="请选择公司">
					  	<template slot-scope="props_">
					  		<el-tree
						  		ref="comTree"
							  	:props="props"
									:load="comLoadNode"
							  	node-key="nodeKey"
							  	lazy
							  	check-strictly
							  	show-checkbox
							  	accordion
							  	@check-change="comHandleCheckChange"
							  	>
							</el-tree>
					  	</template>
					</el-autocomplete>
			  	</el-form-item>
			  	<el-form-item label="部门" :label-width="formLabelWidth">
			    	<el-autocomplete
						:fetch-suggestions="deptQuerySearch"
						v-model="empModel.deptName"
						placeholder="请选择部门">
						<template slot-scope="props_">
						  	<el-tree
							  		ref="deptTree"
								  	:props="props"
								  	:load="deptLoadNode"
								  	node-key="nodeKey"
								  	lazy
								  	check-strictly
								  	show-checkbox
								  	accordion
								  	@check-change="deptHandleCheckChange"
								  	>
							</el-tree>
						</template>
					</el-autocomplete>
			    </el-form-item>
			    <el-form-item label="作用域" :label-width="formLabelWidth">
			    	<el-autocomplete
						:fetch-suggestions="scopeQuerySearch"
						v-model="empModel.empScopeName"
						placeholder="请选择">
						<template slot-scope="props_">
						  	<el-tree
							  		ref="scopeTree"
								  	:props="props"
								  	:load="scopeLoadNode"
								  	node-key="nodeKey"
								  	lazy
								  	check-strictly
								  	show-checkbox
								  	accordion
								  	@check-change="scopeHandleCheckChange"
								  	>
							</el-tree>
						</template>
					</el-autocomplete>
			    </el-form-item>
			    <el-form-item label="职位" :label-width="formLabelWidth">
					<el-autocomplete
						v-model="empModel.jobName"
					  	:fetch-suggestions="jobQuerySearch"
					  	placeholder="请选择上级职位">
					  	<template slot-scope="props_">
					  		<el-tree
					  			ref="jobTree"
							  	:props="props"
								:load="jobLoadNode"
							  	node-key="nodeKey"
							  	lazy
							  	check-strictly
							  	show-checkbox
							  	accordion
							  	@check-change="jobHandleCheckChange"
							  	>
							</el-tree>
					  	</template>
					</el-autocomplete>
			  	</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible=false">取 消</el-button>
				<el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
				<el-button v-else type="primary" @click="update">确 定</el-button>
			</div>
		</el-dialog>

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
	import { fetchData, findById, removeData,createData, updateDataJson } from '@/apis/httpapis'

	export default {
		name: 'empNew',
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
				currentRow: null,
				dialogStatus:'',
				dialogFormVisible: false,
				dialogGrantVisible: false,
				formLabelWidth: '120px',
				empModel: {
					empId:'',
					empName:'',
					empWorkNum:'',
					empMobile:'',
					empEmail:'',
					comId:'',
					deptId:'',
					jobId:'',
					empStatus:'',
					comName:'',
					deptName:'',
					jobName:'',
					empScope:'',
					empScopeName:''
			    },
			    scopeName:'',
			    textMap: {
			        update: '修改组件',
			        create: '创建组件'
			    },
			    empStatus:[
			    	{status:0, value:'删除'},
			    	{status:1, value:'离职'},
			    	{status:2, value:'停用'},
			    	{status:3, value:'正常'}
			    ],
				treeData: [{}],
				defaultProps: {
					children: 'children',
					label: 'text'
				},
				props: {
		      		label: 'name',
		      		children: 'zones'
		   		},
			}
		},
		created() {
			this.getPager()
		},
		methods: {
			/************ 上级关系区    ***************/
			comQuerySearch(queryString, cb){
				findById('/sys/company/vuetreedata.do')
				.then(response => {
					var date = [
						{"name":"父级测试","nodeKey":"c7215f8895ec496893c66998edb7a012"}
					];
					cb(date);
				})
			},
			comHandleCheckChange(data, checked, indeterminate) {
				if(!checked){
					var checkedNodes = this.$refs.comTree.getCheckedKeys();
					if(checkedNodes.length ==0){
						this.$message({
								message: "必须选择一个公司",
								type: 'warning'
						});
						this.empModel.comId = data.nodeKey;
						this.empModel.comName = data.name;
						this.$refs.comTree.setCheckedKeys([data.nodeKey], false);
					}
					return;
				}
				if(checked){
					this.empModel.comId = data.nodeKey;
					this.empModel.comName = data.name;
					var checkedNodes = this.$refs.comTree.getCheckedKeys();
					if(checkedNodes.length >1){
						this.$refs.comTree.setCheckedKeys([data.nodeKey], false);
					}else{
						return;
					}
				}
			},
			comLoadNode(node, resolve) {
				if(node.level === 0) {
					findById('/sys/company/vuetreedata.do')
					.then(response => {
						node.childNodes = [];
						return resolve(response.data);
					})
				}else {
					findById('/sys/company/vuetreedata.do?parentId=' + node.data.nodeKey)
					.then(response => {
						return resolve(response.data);
					})
				}
			},
			// 部门
			deptQuerySearch(queryString, cb){
				findById('/sys/dept/vuetreedata.do')
				.then(response => {
					var date = [
						{"name":"父级测试","nodeKey":"c7215f8895ec496893c66998edb7a012"}
					];
					cb(date);
				})
			},
			deptHandleCheckChange(data, checked, indeterminate) {
				if(!checked){
					var checkedNodes = this.$refs.deptTree.getCheckedKeys();
					// 当不选择，并且没有被选择的时候，将公司设置为
					if(checkedNodes.length ==0){
						this.$message({
								message: "必须选择一个部门",
								type: 'warning'
						});
						this.empModel.deptId = data.nodeKey;
						this.empModel.deptName = data.name;
						this.$refs.deptTree.setCheckedKeys([data.nodeKey], false);
					}
					return;
				}
				if(checked){
					this.empModel.deptId = data.nodeKey;
					this.empModel.deptName = data.name;
					var checkedNodes = this.$refs.deptTree.getCheckedKeys();
					if(checkedNodes.length >1){
						this.$refs.deptTree.setCheckedKeys([data.nodeKey], false);
					}else{
						return;
					}
				}
			},
			deptLoadNode(node, resolve) {
				if(node.level === 0) {
					findById('/sys/dept/vuetreedata.do?parentId=root')
					.then(response => {
						node.childNodes = [];
						return resolve(response.data);
					})
				}else {
					findById('/sys/dept/vuetreedata.do?parentId=' + node.data.nodeKey)
					.then(response => {
						return resolve(response.data);
					})
				}
			},
			// 作用域
			scopeQuerySearch(queryString, cb){
				findById('/sys/dept/vuetreedata.do')
				.then(response => {
					var date = [
						{"name":"父级测试","nodeKey":"c7215f8895ec496893c66998edb7a012"}
					];
					cb(date);
				})
			},
			scopeHandleCheckChange(data, checked, indeterminate) {
				var checkedNodes = this.$refs.scopeTree.getCheckedKeys();
				this.empModel.empScope = checkedNodes.join(",");
				var nodes = this.$refs.scopeTree.getCheckedNodes();
				this.empModel.empScopeName = '';
				for (var i = 0; i < nodes.length; i++) {
					this.empModel.empScopeName =  this.empModel.empScopeName + nodes[i].name + ","
				}
				//this.empModel.empScopeName = this.empModel.empScopeName data.name;
				/*if(!checked){
					var checkedNodes = this.$refs.scopeTree.getCheckedKeys();
					// 当不选择，并且没有被选择的时候，将公司设置为
					if(checkedNodes.length ==0){
						this.$message({
								message: "必须选择一个部门",
								type: 'warning'
						});
						this.empModel.empScope = data.nodeKey;
						this.empModel.empScopeName = data.name;
						this.$refs.scopeTree.setCheckedKeys([data.nodeKey], false);
					}
					return;
				}
				if(checked){
					this.empModel.empScope = data.nodeKey;
					this.empModel.empScopeName = data.name;
					var checkedNodes = this.$refs.scopeTree.getCheckedKeys();
					if(checkedNodes.length >1){
						this.$refs.scopeTree.setCheckedKeys([data.nodeKey], false);
					}else{
						return;
					}
				}*/
			},
			scopeLoadNode(node, resolve) {
				if(node.level === 0) {
					findById('/sys/dept/vuetreedata.do?parentId=root')
					.then(response => {
						node.childNodes = [];
						return resolve(response.data);
					})
				}else {
					findById('/sys/dept/vuetreedata.do?parentId=' + node.data.nodeKey)
					.then(response => {
						return resolve(response.data);
					})
				}
			},
			// 职位
			jobQuerySearch(queryString, cb){
				findById('/sys/job/vuetreedata.do')
				.then(response => {
					var date = [
						{"name":"父级测试","nodeKey":"c7215f8895ec496893c66998edb7a012"}
					];
					cb(date);
				})
			},
			jobHandleCheckChange(data, checked, indeterminate) {
				if(!checked){
					var checkedNodes = this.$refs.jobTree.getCheckedKeys();
					// 当不选择，并且没有被选择的时候，将公司设置为
					if(checkedNodes.length ==0){
						this.$message({
								message: "必须选择一个职位",
								type: 'warning'
						});
						this.empModel.jobId = data.nodeKey;
						this.empModel.jobName = data.name;
						this.$refs.jobTree.setCheckedKeys([data.nodeKey], false);
					}
					return;
				}
				if(checked){
					this.empModel.jobId = data.nodeKey;
					this.empModel.jobName = data.name;
					var checkedNodes = this.$refs.jobTree.getCheckedKeys();
					if(checkedNodes.length >1){
						this.$refs.jobTree.setCheckedKeys([data.nodeKey], false);
					}else{
						return;
					}
				}
			},
			jobLoadNode(node, resolve) {
				if(node.level === 0) {
					findById('/sys/job/vuetreedata.do')
					.then(response => {
						node.childNodes = [];
						return resolve(response.data);
					})
				}else {
					findById('/sys/job/vuetreedata.do?parentId=' + node.data.nodeKey)
					.then(response => {
						return resolve(response.data);
					})
				}
			},

			/***************** 分页查询相关  ********************/
			getPager() {
				fetchData('/sys/emp/datagrid.do', this.listQuery).then(response => {
					//console.info("^^^^^ :  " + JSON.stringify(response));
					this.tableData = response.data.pageData
					this.total = response.data.recordCount
				})
			},
			handleSizeChange(val) {
				this.listQuery.rows = val
				this.getPager();
			},
			handleCurrentChange(val) {
				this.listQuery.page = val;
				this.getPager();
			},
			searchEmp(val) {
				this.getPager();
			},
			/******** 增加、修改 **************/
			handleCreate() { //添加点击弹窗
				this.empModel= {
					empId:'',
					empName:'',
					empWorkNum:'',
					empMobile:'',
					empEmail:'',
					empSex:'',
					empAge:'',
					empAddress:'',
					comId:'',
					deptId:'',
					jobId:'',
					empStatus:'',
					comName:'',
					deptName:'',
					jobName:'',
					empScope:'',
					empScopeName:''
			    },
		  		this.dialogStatus = 'create'
		  		this.dialogFormVisible = true
			},
			handleUpdate(row) { //添加点击弹窗
				let empId = row.empId;
				if(null === empId || empId === "" || empId === undefined) {
					empId = this.currentRow.empId;
					if(null === empId || empId === "" || empId === undefined) {
						this.$message({
							message: '警告，请选择要修改的员工!',
							type: 'warning'
						});
						return;
					}
				}
				this.findById(empId);
				this.dialogStatus = 'update'
				this.dialogFormVisible = true
			},

			handleDelete(row) {
				removeData('/sys/emp/remove.do?empId=' + row.empId)
					.then(response => {
						var result = response.data
						if(result.success) {
							this.$message({
								message: result.msg,
								type: 'success' //success/warning/info/error
							});
							this.dialogFormVisible = false
							this.getPager();
						} else {
							this.$message({
								message: result.msg,
								type: 'warning'
							});
						}
				})
			},
			handleGrant(row) {
				let empId = row.empId;
				this.empModel = row;
				if(null === empId || empId === "" || empId === undefined) {
					empId = this.currentRow.empId;
					this.empModel = this.currentRow;
					if(null === empId || empId === "" || empId === undefined) {
						this.$message({
							message: '警告，请选择要授权的角色!',
							type: 'warning'
						});
						return;
					}
				}else{
					this.empModel = row
				}
				this.dialogGrantVisible = true;
				fetchData('/sys/role/treenode.do').then(response => {
					this.treeData = response.data
				})
				//获取该角色的资源 /sys/role/permiss.do
				fetchData('/sys/emp/roleid.do?empId=' + empId).then(response => {
					this.$refs.roleTree.setCheckedKeys(response.data);
				})

			},
			/************* dialog区域 ***************/
			create() {
				var url = "/sys/emp/create.do";
				createData(url, this.empModel)
					.then(response => {
						var result = response.data
						if(result.success) {
							this.$message({
								message: result.msg,
								type: 'success' //success/warning/info/error
							});
							this.dialogFormVisible = false
							this.getPager();
						} else {
							this.$message({
								message: result.msg,
								type: 'warning'
							});
						}
					})
			},
			update() {
				var url = "/sys/emp/update.do";
				updateDataJson(url, this.empModel)
					.then(response => {
						var result = response.data
						if(result.success) {
							this.$message({
								message: result.msg,
								type: 'success' //success/warning/info/error
							});
							this.dialogFormVisible = false
							this.getPager();
						} else {
							this.$message({
								message: result.msg,
								type: 'warning'
							});
						}
					})
			},
			grant() {
				//角色ID
				const empId = this.empModel.empId;

				//获取所有选择的树
				const cptKeys = this.$refs.roleTree.getCheckedKeys();

				const data = {
					empId: this.empModel.empId,
					roleIds: cptKeys.join(',')
				}

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
			/***************** 公共调用区 ********************/
			findById(id) {
				findById('/sys/emp/query.do?empId=' + id)
					.then(response => {
						this.empModel = response.data
					})
			},
			checkPermiss(cpt) {
				return this.checkAction(cpt);
			},
			handleCurrentRow(val) {
				this.$refs.tableData.clearSelection();
				this.$refs.tableData.toggleRowSelection(val);
				this.currentRow = val;
			},
			handleEmpStatus(row, column, value){
        		var str = " ";
        		if(value == '3' || value == 3){
        			str="正常";
        		}else if(value == '2' || value == 2){
        			str="停用";
        		}else if(value == '1' || value == 1){
        			str="离职";
        		}else if(value == '0' || value == 0){
        			str="正常";
        		}else {
        			str = "错误状态"
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
<style>
	div.el-popper {width:400px !important}
</style>
