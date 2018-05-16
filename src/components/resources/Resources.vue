<template>
	<div class="resources-box">
		<el-row class="search-box">
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-form :inline="true" :model="query" class="demo-form-inline">
						<el-form-item label="组件名称">
							<el-input v-model="query.modelName" placeholder="组件名称" size="small"></el-input>
						</el-form-item>

						<el-form-item>
							<el-button type="primary" @click="searchResource" size="small">查询</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-col>
		</el-row>

		<el-row class="toolbar">
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-button type="primary" size="small" @click="handleCreate" v-if="checkPermiss('cpt_create')">添加</el-button>
					<el-button type="success" size="small" @click="handleUpdate" v-if="checkPermiss('cpt_update')">修改</el-button>
					<el-button type="danger" size="small" @click="remove" v-if="checkPermiss('cpt_remove')">删除</el-button>
				</div>
			</el-col>
		</el-row>

		<el-tree :data="treeData" :props="defaultProps" node-key="nodeKey" ref="tree" node-click="handleNodeClick" show-checkbox :auto-expand-parent="autoExpandParent" :check-strictly="checkStrictly"></el-tree>

		<!-- 弹窗 -->
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
			<el-form class="small-space" :model="componentModel" :rules="rules" ref="componentModel" label-position="left" label-width="70px" style='padding:20px 40px;'>
				<el-form-item label="组件名称" prop="name" :label-width="formLabelWidth">
					<el-input v-model="componentModel.name"></el-input>
				</el-form-item>

				<el-form-item label="组件类型" prop="cptType" :label-width="formLabelWidth">
					<el-select v-model="componentModel.cptType" placeholder="请选择">
						<el-option v-for="item in cptTypes" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="是否隐藏" prop="hidden" :label-width="formLabelWidth">
					<el-radio-group v-model="componentModel.hidden">
						<el-radio :label="1">隐藏</el-radio>
						<el-radio :label="0">不隐藏</el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item label="组件" prop="component" :label-width="formLabelWidth">
					<el-input v-model="componentModel.component"></el-input>
				</el-form-item>

				<el-form-item label="组件值" prop="cptValue" :label-width="formLabelWidth">
					<el-input v-model="componentModel.cptValue"></el-input>
				</el-form-item>
				<el-form-item label="排序值" prop="sort" :label-width="formLabelWidth">
					<el-input v-model="componentModel.sort"></el-input>
				</el-form-item>

				<el-form-item label="路径" prop="path" :label-width="formLabelWidth">
					<el-input v-model="componentModel.path"></el-input>
				</el-form-item>

				<el-form-item label="上级" :label-width="formLabelWidth">
					<el-cascader v-model="parents" placeholder="上级组件" :options="treeData" :props="cascaderProps" change-on-select></el-cascader>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible=false">取 消</el-button>
				<el-button v-if="dialogStatus=='create'" type="primary" @click="create('componentModel')">确 定</el-button>
				<el-button v-else type="primary" @click="update('componentModel')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { fetchData, findById, updateData, batchRemoveData, createData } from '@/apis/httpapis'
	import store from '../../store/store'

	export default {
		data() {
			return {
				parents: [],
				changeOnSelect: true,
				showAllLevels: false,
				autoExpandParent: false,
				checkStrictly: true,
				query: {
					modelName: ''
				},
				treeData: [{}],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				cascaderProps: {
					children: 'children',
					value: 'nodeKey',
					label: 'label'
				},
				componentModel: {
					componentsId: '',
					name: '',
					cptType: '',
					hidden: 1,
					component: '',
					cptValue: '',
					iconcls: '',
					sort: '',
					path: '/',
					parentId: []
				},
				dialogStatus: '',
				textMap: {
					update: '修改组件',
					create: '创建组件'
				},
				dialogFormVisible: false,
				cptTypes: [{
						label: "菜单",
						value: "menu"
					},
					{
						label: "操作",
						value: "action"
					},
				],
				rules: {
					name: [{
						required: true,
						message: "请填写组件名称",
						trigger: "blur"
					}],
					cptType: [{
						required: true,
						message: "请选择组件操作类型",
						trigger: "change"
					}, ],
					hidden: [{
						required: true,
						message: "请选择是否隐藏",
						trigger: "change"
					}, ],
					component: [{
						required: true,
						message: "请填写组件",
						trigger: "blur"
					}, ],
					cptValue: [{
						required: true,
						message: "请填写组件值",
						trigger: "blur"
					}, ],
					sort: [{
						required: true,
						message: "请填写排序值",
						trigger: "blur"
					}, ],
					path: [{
						required: true,
						message: "请填写路径",
						trigger: "blur"
					}, ]
				},
				formLabelWidth: '100px',
				checkSign:false,
			}
		},
		created() {
			this.loadTree();
		},
		methods: {
			loadTree() {
				fetchData('/sys/components/tree.do', this.query).then(response => {
					this.treeData = response.data
					//console.info(JSON.stringify(response.data));
				})
			},
			handleNodeClick(data) { //节点被点击时的回调
				console.log(data)
			},
			searchResource() {
				this.loadTree()
			},
			handleCreate() { //添加点击弹窗
				this.componentModel = {
					componentsId: '',
					name: '',
					cptType: '',
					hidden: 1,
					component: '',
					cptValue: '',
					iconcls: '',
					sort: '',
					path: '/',
					parentId: []
				}
				this.parents = []
				this.dialogStatus = 'create'
				this.dialogFormVisible = true
				if(this.checkSign){
					this.$refs['componentModel'].resetFields();
				}
			},
			handleUpdate() { //添加点击弹窗
				var nodes = this.checkedNodes();
				if(null === nodes || '' === nodes || nodes.length < 1) {
					this.$message({
						message: '警告,请选择要修改的组件!',
						type: 'warning'
					});
					return;
				}
				if(nodes.length > 1) {
					this.$message({
						message: '警告,只支持单数据修改!',
						type: 'warning'
					});
					return;
				}
				var id = nodes[0].nodeKey;
				this.findById(id);
				this.dialogStatus = 'update'
				this.dialogFormVisible = true
				if(this.checkSign){
					this.$refs['componentModel'].resetFields();
				}
			},
			create(formName) {
				this.$refs[formName].validate(valid => {
					if(valid) {
						var url = "/sys/components/create.do";
						var index = this.parents.length;
						this.componentModel.parentId = this.parents[index - 1];
						createData(url, this.componentModel)
							.then(response => {
								var result = response.data
								if(result.success) {
									this.$message({
										message: result.msg,
										type: 'success' //success/warning/info/error
									});
									this.checkSign = false
									this.dialogFormVisible = false
									this.loadTree();
								} else {
									this.$message({
										message: result.msg,
										type: 'warning'
									});
								}
							})
					} else {
						this.checkSign = true;
						return false;
					}
				});

			},
			update(formName) {
				this.$refs[formName].validate(valid => {
					if(valid) {
						var url = "/sys/components/update.do";
						var index = this.parents.length;
						this.componentModel.parentId = this.parents[index - 1];
						updateData(url, this.componentModel)
							.then(response => {
								var result = response.data
								if(result.success) {
									this.$message({
										message: result.msg,
										type: 'success' //success/warning/info/error
									});
									this.checkSign = false
									this.dialogFormVisible = false
									this.loadTree();
								} else {
									this.$message({
										message: result.msg,
										type: 'warning'
									});
								}
							})
					} else {
						this.checkSign = true
						return false;
					}
				});
			},
			remove() {
				var nodes = this.checkedNodes();
				if(null === nodes || '' === nodes || nodes.length < 1) {
					this.$message({
						message: '警告,请选择要删除的组件!',
						type: 'warning'
					});
					return;
				}
				var ids = [];
				for(var i = 0; i < nodes.length; i++) {
					ids[i] = nodes[i].nodeKey
				}
				batchRemoveData('/sys/components/removes.do', ids)
					.then(response => {
						var result = response.data
						if(result.success) {
							this.$message({
								message: result.msg,
								type: 'success' //success/warning/info/error
							});
							this.dialogFormVisible = false
							this.loadTree();
						} else {
							this.$message({
								message: result.msg,
								type: 'warning'
							});
						}
					})
				console.info("删除")
			},
			findById(id) {
				findById('/sys/components/query.do?id=' + id)
					.then(response => {
						this.componentModel = response.data;
						this.parents[0] = response.data.parentId;
					})
			},
			checkedNodes() {
				return this.$refs.tree.getCheckedNodes();
			},
			checkPermiss(cpt) {
				return this.checkAction(cpt);
			},
			initRules() {
				this.rules = {
					name: [{
						required: true,
						message: "请填写组件名称",
						trigger: "blur"
					}],
					cptType: [{
						required: true,
						message: "请选择组件操作类型",
						trigger: "change"
					}, ],
					hidden: [{
						required: true,
						message: "请选择是否隐藏",
						trigger: "change"
					}, ],
					component: [{
						required: true,
						message: "请填写组件",
						trigger: "blur"
					}, ],
					cptValue: [{
						required: true,
						message: "请填写组件值",
						trigger: "blur"
					}, ],
					sort: [{
						required: true,
						message: "请填写排序值",
						trigger: "blur"
					}, ],
					path: [{
						required: true,
						message: "请填写路径",
						trigger: "blur"
					}, ]
				}
			}
		}
	}
</script>

<style scoped>
	.search-box,
	.toolbar {
		margin: 10px 5px 10px 30px;
	}
</style>