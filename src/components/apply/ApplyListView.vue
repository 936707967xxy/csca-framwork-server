<template>
	<div class="role-box application-entry" v-loading.fullscreen.lock="fullscreenLoading">
		<el-row class="search-box">
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-form :inline="true" :model="listQuery" class="demo-form-inline">
						<el-form-item label="申请编号">
            				<el-input v-model="listQuery.loanId" placeholder="申请编号" size="small" style="width:160px;"></el-input>
          				</el-form-item>
						<el-form-item label="客户姓名">
							<el-input v-model="listQuery.custName" placeholder="客户姓名" size="small" style="width:100px;"></el-input>
						</el-form-item>

						<el-form-item label="客户手机号">
							<el-input v-model="listQuery.custMobile" placeholder="客户手机号" size="small" style="width:140px;"></el-input>
						</el-form-item>

						<el-form-item label="客户经理">
							<el-input v-model="listQuery.salesEmpName" placeholder="客户经理" size="small" style="width:100px;"></el-input>
						</el-form-item>
						<el-form-item label="客户来源">
							<el-select v-model="listQuery.source" placeholder="请选择" size="small" style="width:100px;">
								<el-option v-for="item in sourcesSelect" :key="item.value" :label="item.text" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="申请产品">
							<el-select v-model="listQuery.productType" placeholder="请选择" size="small" @change="changeProductType" style="width:100px;">
								<el-option v-for="item in productType" :key="item.prodId" :label="item.prodName" :value="item.prodId">
								</el-option>
							</el-select>
							<el-select v-model="listQuery.product" placeholder="请选择" size="small" style="width:140px;">
								<el-option v-for="item in product" :key="item.prodId" :label="item.prodName" :value="item.prodId">
								</el-option>
							</el-select>
						</el-form-item>

						<!--<el-form-item label="证件号">
            <el-input v-model="listQuery.idNumber" placeholder="证件号" size="small"></el-input>
          </el-form-item>-->
						<el-form-item label="审核状态">
							<el-select v-model="listQuery.nodeStatus" placeholder="请选择" size="small" style="width:100px;">
								<el-option v-for="item in nodeOption" :key="item.value" :label="item.label" :value="item.value">
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
					<el-button type="primary" size="small" @click="handleCreate" v-if="checkPermiss('apply_create')">添加</el-button>
					<el-button type="danger" size="small" @click="handleEdit" v-if="checkPermiss('apply_update')">修改</el-button>
					<el-button type="info" size="small" @click="handleClickDel">删除</el-button>
					<el-button type="success" size="small" @click="handleClickAudit" v-if="checkPermiss('apply_submit')">提交</el-button>
					<el-button type="warning" size="small" @click="trackTask">追踪</el-button>
					<el-button type="danger" size="small" @click="handleClickUpload" v-if="checkPermiss('apply_upload')">附件上传</el-button>
					<el-button type="info" size="small" @click="handleClickDetail">详情</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-table :data="tableData"  height="630" border style="width:100%;" cell-class-name="cell-class" ref="tableData" @select-all="selectAll" @select="selectChange" @current-change="handleCurrentRow" highlight-current-row>
						<el-table-column type="selection" min-width="35"></el-table-column>
						<el-table-column prop="loanId" label="申请编号" min-width="160"></el-table-column>
						<el-table-column prop="custName" label="客户姓名" min-width="120"></el-table-column>
						<el-table-column prop="custMobile" label="联系电话" min-width="120"></el-table-column>
						<el-table-column prop="idNumber" label="证件号" min-width="180"></el-table-column>
						<el-table-column prop="productName" label="申请产品" min-width="160"></el-table-column>
						<el-table-column prop="applyAmount" label="申请金额" min-width="120"></el-table-column>
						<el-table-column prop="salesEmpName" label="客户经理" min-width="120"></el-table-column>
						<el-table-column prop="createEmployeeVal" label="录单人" min-width="110"></el-table-column>
						<el-table-column prop="procStatusVal" :formatter="statusFormat" label="状态" min-width="120"></el-table-column>
						<el-table-column prop="sourcesValue" label="来源" min-width="100"></el-table-column>
						<el-table-column label="操作" fixed="right" width="300">
							<template slot-scope="scope">
								<el-button @click="handleEdit(scope.row)" type="text" v-if="checkPermiss('apply_update')">修改</el-button>
								<el-button @click="handleClickDel(scope.row)" type="text">删除</el-button>
								<el-button @click="handleClickAudit(scope.row)" type="text" v-if="checkPermiss('apply_submit')">提交</el-button>
								<el-button @click="handleClickUpload(scope.row)" type="text" v-if="checkPermiss('apply_upload')">附件上传</el-button>
								<el-button @click="handleClickDetail(scope.row)" type="text">详情</el-button>
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
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :showClose="false" :close-on-click-modal="false" class="annex">
			<el-form :model="annexModel" ref="annexModel" class="annex-form">
				<el-row>
					<el-col :span="12">
						<el-form-item label="客户姓名：">
							<el-input v-model="annexModel.custName" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="身份证号：">
							<el-input v-model="annexModel.idNumber" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="附件描述：" prop="applyTypeId" :rules="[{ required: true, message: '请选择附件'}]">
					<el-select v-model="annexModel.applyTypeId" placeholder="请选择" @change="typeChange">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					</el-cascader>
				</el-form-item>
				<el-form-item label="附件图片：">
					<el-upload ref="upload" name="file" :file-list="alreadyFileList" action="/sys/applymodel/multiupload.do" multiple accept='image/x-png,image/gif,image/jpeg,image/bmp' list-type="picture-card" :on-preview="preview"
						:data='annexModel'
						:auto-upload="false"
						:on-success="handleSuccess" :on-error="handleError"
						:show-file-list="true" :on-remove="pictureRemove" :batchUpload="true"
						><!--:before-upload="exceedCount"-->
						<i class="el-icon-plus"></i>
					</el-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="giveUpUpload">关闭</el-button>
				<el-button v-if="dialogStatus=='create'" type="primary" @click="submitUpload('annexModel')">确定上传</el-button>
			</div>
		</el-dialog>
		<el-dialog :visible.sync="dialogVisible" size="tiny">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
		<el-dialog title="追踪" :visible.sync="trackVisible" width="38%">
			<div>
				<el-table :data="tasks" border stripe fit style="width:100%;" cell-class-name="cell-class">
					<el-table-column type="index" width="50"></el-table-column>
					<el-table-column prop="description" label="状态"></el-table-column>
					<el-table-column prop="handelTime" label="时间"></el-table-column>

				</el-table>

				<!-- <el-steps direction="vertical" :active="tasks.length - 1">
        <el-step :title="item.title" :description="item.description" v-for="(item,index) in tasks" :key="index"></el-step>
      </el-steps> -->
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
	import {
		queryPostJson
	} from '../../apis/httpapis.js'

	export default {
		name: 'Dept',
		data() {
			return {
				fullscreenLoading: false,
				applyId:'',
				dialogImageUrl: '',
				dialogVisible: false,
				alreadyFileList: [],
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
					salesEmpName: '',
					productType: '',
					product: '',
					source: ''
				},
				trackVisible: false,
				tasks: [{
					title: '未知',
					description: '未提交或已结束',
					handelTime: '',
					handelOption: '',
					nodeStatus: '',
					taskId: ''
				}],
				nodeOption: [{
					value: '-1',
					label: '全部'
				}, {
					value: '0',
					label: '未提交'
				}, {
					value: '1',
					label: '已提交'
				}],
				sourcesSelect: [{
						value: 1,
						text: "app"
					},
					{
						value: 2,
						text: "门店"
					},
					{
						value: 3,
						text: "主动拜访"
					},
					{
						value: 4,
						text: "客户推荐"
					},
					{
						value: 5,
						text: "派单"
					},
					{
						value: 6,
						text: "推广活动"
					},
					{
						value: 7,
						text: "其他"
					}
				],
				annexModel: {
					applyId: '',
					custName: '',
					idNumber: '',
					applyTypeId: '',
					applyTypeIdVal: ''
				},
				productType: [],
				product: [],
				rulesApplyModel: { //验证规则
					applyTypeId: [{
						required: true,
						message: '请选择附件描述',
						trigger: 'change'
					}]
				},
				options: [],
				multipleSelection: [],
				dialogStatus: '',
				textMap: {
					create: '上传附件'
				},
				dialogFormVisible: false,
				flag: true,
				currentRow: null,

			}
		},
		created() {
			this.getPager();
			findById("/sys/annex/imgtype.do").then(response => {
				var imgType = response.data;
				this.options = imgType;
			});
			findById("/sys/producttype/queryalltype.do") //初始化产品类型
				.then(response => {
					//console.info("^^^^^ :" + JSON.stringify(response.data));
					this.productType = response.data;
				});
		},
		methods: {
			checkPermiss(cpt) {
				return this.checkAction(cpt);
			},
			selectChange(selection, row) {
				this.$refs.tableData.clearSelection();
				this.$refs.tableData.toggleRowSelection(row, true);
				this.currentRow = row;
			},
			selectAll(selection) {
				this.$refs.tableData.clearSelection();
				this.$refs.tableData.setCurrentRow(null)
				//    this.currentRow = null;
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
			handleClickDetail(row) {
				let applyId = this.selectUtil(row);
				if(applyId != null) {
					this.handleClickDetailUtil(applyId);
				}
			},
			handleClickDetailUtil(applyId) {
				findById('sys/applymodel/logincomparecreate.do?applyId=' + applyId) //判断是登录人录单人是否一致
					.then(response => {
						var result = response.data
						if(result.success) {
							this.$router.push({
								path: '/applydetails/' + applyId
							});
						} else {
							this.$message({
								message: result.msg,
								type: 'warning'
							});
						}
					});
			},
			changeProductType(value) {
				//根据大产品生产小产品
				this.listQuery.productId = "";
				findById("/sys/product/querybytype.do?prodTypeId=" + value).then(response => {
					//console.info("^^^^^ :" + JSON.stringify(response));
					this.product = response.data;
				});
			},
			preview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
				/*    	if(file.status=='success'){
				    		this.$notify.success({
				        title: '提示',
				        message: file.name + file.response.msg,
				      });
				    	}else{
					    		this.$notify.error({
					        title: '提示',
					        message: file.name + file.response.msg,
					    	});
				    	}*/
			},
			giveUpUpload() {
				this.dialogFormVisible = false;
				this.$refs.upload.clearFiles(); // 清空上传列表
			},
			getPager() {
				fetchData('/sys/applymodel/selectapply.do', this.listQuery).then(response => {
					//console.info("^^^^^ :  " + JSON.stringify(response));
					var result = response.data;
					this.tableData = result.pageData;
					this.total = result.recordCount

				})
			},
			statusFormat(row, column, cellValue) {
				if(cellValue == null || cellValue == '' || cellValue == 'undefined') {
					return "未提交";
				}
				return cellValue;
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
			typeChange(value) {
				this.$refs.upload.clearFiles(); // 清空上传列表
				var opt = this.options;
				var lab = null;
				for(var i = 0; i < opt.length; i++) {
					if(opt[i].value == value) {
						lab = opt[i].label;
					}
				}
				this.annexModel.applyTypeIdVal = lab;
				const imgType = value;
				const applyId = this.annexModel.applyId;
				const url = "/sys/annex/queryreview.do";
				queryPostJson(url, {
					applyId: applyId,
					imgType: imgType
				}).then(response => {
					const data = response.data;
					this.alreadyFileList = data;
					//console.log(JSON.stringify(data));
				})
				//console.log("^^^"+this.annexModel.applyTypeVal);
			},
			handleSuccess(response, file, fileList) {
				/*console.log("###up success response###" , response);
				console.log("###up success file###" ,file);
				console.log("###up success fileList###",fileList);*/
				if (file.response.success) {
					this.fullscreenLoading = false;
					this.$notify({
						title: '提示',
						message: file.name + response.msg,
						type: 'success'
					});
				} else {
					this.fullscreenLoading = false;
					file.status = 'fail',
					this.$notify.error({
						title: '提示',
						message: file.name + response.msg,
					});
				}
			},
			handleError(err, file, fileList) {
				this.fullscreenLoading = false;
				this.$message({
					message: "上传失败",
					type: 'warning'
				})
			},
			searchApply() {
				//console.log('submit!');
				this.getPager();
			},
			handleClick(row) {
				//console.dir(row);
			},
			uploadUtil(applyId) {
				findById('sys/blackinfo/lduinterceptor.do?applyId=' + applyId) //判断节点+登录、录单是否一致规则
					.then(response => {
						var result = response.data
						if(result.success) {
							this.dialogStatus = 'create';
							this.dialogFormVisible = true;
							this.upfindById(applyId);
						} else {
							this.$message({
								message: result.msg,
								type: 'warning'
							});
						}
					});

			},
			pictureRemove(file, fileList) {
				if(file != null&&file.response!=null&&file.status=='success') {
					const anxId = file.response.data.anxId;
					if(anxId != null && anxId != undefined) {
						const url = "/sys/annex/deletebyanxid.do";
						queryPostJson(url, {
							anxId: anxId,
						}).then(response => {
							const result = response.data;
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
				}
			},
			handleClickUpload(row) {
				let applyId = this.selectUtil(row);
				this.annexModel.applyId = applyId;
				if(applyId != null) {
					this.uploadUtil(applyId);
				}
			},
			upfindById(id) {
				findById('/sys/applymodel/upselectapplybyid.do?applyId=' + id)
					.then(response => {
						this.annexModel = response.data
					})
			},
			findById(id) {
				findById('/sys/applymodel/selectapplybyid.do?applyId=' + id)
					.then(response => {
						this.annexModel = response.data
					})
			},
			submitUpload(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.fullscreenLoading = true;
						this.$refs.upload.submit();
					} else {
						this.fullscreenLoading = false;
						this.$message({
							message: '请检查所填信息格式是否正确',
							type: 'warning'
						});
						return false;
					}
				});
			},
			create() { //添加
				var url = "";
				createData(url, this.annexModel)
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
			},
			selchange(selection) {
				this.multipleSelection = selection;
			},
			remove() {
				var applyId = this.selectUtil();
				if(applyId != null) {
					this.removeOne(applyId);
				}
			},
			handleClickDel(row) {
				let applyId = this.selectUtil(row);
				if(applyId != null) {
					this.removeOne(applyId);
				}
			},
			exceedCount(file,fileList){
				console.log(this.alreadyFileList)
				if(file.length>10){
					this.$message({
						message: "附件单次最多上传10个!",
						type: 'warning'
					});
					return false;
				}
				return true;
			},
			removeOne(applyId) {
				findById('sys/blackinfo/lduinterceptor.do?applyId=' + applyId) //判断节点+登录、录单是否一致规则
					.then(response => {
						var result = response.data
						if(result.success) {
							var url = "/sys/applymodel/deleteapply.do?applyId=" + applyId;
							this.$confirm('确定要删除此条数据?', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
							}).then(() => {
								removeData(url).then(response => {
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

							}).catch(() => {
								this.dialogFormVisible = false;
								this.$message({
									type: 'info',
									message: '已取消删除!'
								});
							});
						} else {
							this.$message({
								message: result.msg,
								type: 'warning'
							});
						}
					});

			},
			handleClickAudit(row) {
				let applyId = this.selectUtil(row);
				if(applyId != null) {
					this.trSubVue(applyId)
				}
			},
			handleEdit(row) {
				let applyId = this.selectUtil(row);
				if(applyId != null) {
					this.handleUpdateUtil(applyId);
				}
			},
			handleUpdateUtil(applyId) {
				findById('sys/blackinfo/lduinterceptor.do?applyId=' + applyId) //判断节点+登录、录单是否一致规则
					.then(response => {
						var result = response.data
						if(result.success) {
							this.$router.push({
								path: '/updateapply/' + applyId
							});
						} else {
							this.$message({
								message: result.msg,
								type: 'warning'
							});
						}
					});
			},
			handleCreate() { //进入新增页面
				this.$router.push({
					path: '/createapply'
				});
			},
			dateFor(row, column, cellValue) {
				if(typeof(cellValue) != "undefined") {
					return formatDate(new Date(cellValue), 'yyyy-MM-dd hh:mm:ss');
				}

			},
			handleClickSub(row) {
				let applyId = this.selectUtil(row);
				if(applyId != null) {
					this.trSubVue(row.applyId);
				}
			},
			trSubVue(applyId) {
				findById('sys/blackinfo/submitinterceptor.do?applyId=' + applyId) //验证提交校验规则
					.then(response => {
						var result = response.data
						if(result.success) {
							this.$router.push({
								path: '/applyaudit/' + applyId
							});
						} else {
							this.$message({
								message: result.msg,
								type: 'warning'
							});
						}
					});

			},
			trackTask(row) { //trackVisible:false,
				//tasks:null,
				var applyId = this.selectUtil(row);
				if(applyId != null) {
					findById('sys/applymodel/logincomparecreate.do?applyId=' + applyId) //判断是登录人录单人是否一致
						.then(response => {
							var result = response.data
							if(result.success) {
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
							} else {
								this.$message({
									message: result.msg,
									type: 'warning'
								});
							}
						});
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

	.annex-form {
		padding: 30px;
		margin-left: 3%;
	}
</style>
<style>
	.application-entry .el-table td {
		padding: 1px 0 !important;
	}

	.annex .el-input.is-disabled .el-input__inner {
		width: 216px;
	}

	.annex .el-form-item__content {
		display: inline-block;
	}

	.annex .el-form-item__label {
		width: 120px;
		text-align: right;
	}

	@media only screen and (max-width:1366px) {
		.annex .el-input.is-disabled .el-input__inner {
			width: 180px !important;
		}
		.annex-form {
			padding: 0px !important;
			margin-left: 0 !important;
		}
		.annex .el-select:hover .el-input__inner {
			width: 180px !important;
		}
		.annex .el-input--suffix .el-input__inner {
			width: 180px !important;
		}
	}

	.el-loading-parent--relative {
		position: static !important;
	}

	.el-loading-mask {
		background-color: rgba(0, 0, 0, .1);
	}
</style>
