<template>
	<div class="role-box">
		<el-row class="search-box">
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-form :inline="true" :model="listQuery" class="demo-form-inline">
						<!-- <el-form-item label="申请编号">
							<el-input v-model="listQuery.loanId" placeholder="申请编号" size="small" style='width:160px;'></el-input>
						</el-form-item> -->

						<el-form-item label="客户姓名">
							<el-input v-model="listQuery.custName" placeholder="客户姓名" size="small" style='width:160px;'></el-input>
						</el-form-item>

						<el-form-item label="手机号">
							<el-input v-model="listQuery.custMobile" placeholder="手机号" size="small" style='width:160px;'></el-input>
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

					<el-button type="primary" size="small" @click="claimTask">申请</el-button>
					<el-button type="success" size="small" @click="detail">详情</el-button>

				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-table :data="tableData" height="630" border stripe fit style="width: 100%" cell-class-name="cell-class" ref="tableData" @select-all="selectAll" @select="selectChange" @current-change="handleCurrentRow" highlight-current-row>
						<el-table-column type="selection" min-width="35"></el-table-column>
						<el-table-column prop="loanId" label="申请编号" min-width="190"></el-table-column>
						<el-table-column prop="custName" label="客户姓名" min-width="170"></el-table-column>
						<el-table-column prop="idNumber" label="身份证号码" min-width="170"></el-table-column>
						<el-table-column prop="custMobile" label="手机号码" min-width="170"></el-table-column>
						<el-table-column prop="productName" label="申请产品名称" min-width="160"></el-table-column>
						<el-table-column prop="applyAmount" label="申请金额" min-width="100"></el-table-column>
						<el-table-column prop="salesEmpName" label="客户经理" min-width="100"></el-table-column>
						<el-table-column prop="createEmployeeVal" label="录单人" min-width="100"></el-table-column>
						<el-table-column prop="procStatusVal" label="流程走向" min-width="170"></el-table-column>
						<el-table-column label="操作" fixed="right" width="240">
							<template slot-scope="scope">
								<el-button @click="claimTask(scope.row)" size="mini" type="text">申请</el-button>
								<el-button @click="detail(scope.row)" size="mini" type="text">详情</el-button>
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

		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :showClose="false" :close-on-click-modal="false">
			<el-form :model="annexModel" ref="annexModel" class="review-popup">
				<el-form-item label="附件图片：">
					<el-upload :action="uploadUrl" list-type="picture-card" :show-file-list="showFileList" multiple :file-list="fileList" :on-success="onUploadSuccess" :on-error="uploadError" :on-remove="uploadRemove" accept="image/x-png,image/gif,image/jpeg,image/jpg,image/bmp" style="margin-bottom:20px;">
						<!--v-if="checkPermiss('con_upload')"-->
						<i class="el-icon-plus"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="复议类型" prop="reviewType" :rules="[
	      { required: true, message: '请选择复议类型', trigger: 'blur' }]">

					<el-select v-model="annexModel.reviewType" placeholder="请选择" ref="handleValue">
						<el-option v-for="item in options" :key="item.id" :label="item.value" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<!--  <div class="text item textarea-cont">-->
				<el-form-item label="备注" prop="remark" :rules="[
	      { required: true, message: '请输入备注信息', trigger: 'blur' }
	    ]">
					<el-input type="textarea" size="medium" :autosize="{ minRows: 4, maxRows: 6}" v-model="annexModel.remark"></el-input>
				</el-form-item>
				<!--</div>-->

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="giveUpUpload">关闭</el-button>
				<el-button v-if="dialogStatus=='create'" type="primary" @click="submitUpload('annexModel')">确定申请</el-button>
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
				applyId: '',
				showFileList: true,
				fileList: [],
				tableData: null,
				total: null,
				currentRow: null,
				listQuery: {
					page: 1,
					rows: 30,
					custName: '',
					idNumber: ''
				},
				annexModel: {
					remark: '',
					reviewType: '',
					reviewTypeVal: ''
				},
				rulesApplyModel: { //验证规则
					applyTypeId: [{
						required: true,
						message: '请选择附件描述',
						trigger: 'change'
					}]
				},
				options: [{
						"id": 0,
						"value": "额度异议"
					},
					{
						"id": 1,
						"value": "期限异议"
					},
					{
						"id": 2,
						"value": "利率异议"
					},
					{
						"id": 3,
						"value": "批核异议"
					}
				],
				multipleSelection: [],
				dialogStatus: '',
				textMap: {
					create: '申请数据'
				},
				dialogFormVisible: false,
			}
		},
		created() {
			this.getPager()
		},
		computed: {
			uploadUrl: function() {
				return "/sys/review/upload.do?applyId=" + this.applyId;
			}
		},
		methods: {
			getPager() {
				fetchData('/sys/review/pager.do', this.listQuery).then(response => {
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
				if(applyId != null) {
					this.applyId = applyId;
					findById('/sys/review/compare.do?applyId=' + this.applyId)
						.then(response => {
							var result = response.data;
							if(result.success) {
								this.dialogStatus = 'create';
								this.dialogFormVisible = true;
							} else {
								this.$message({
									message: result.msg,
									type: 'warning'
								});
							}
						});
				}
			},
			submitUpload(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						const reject = this.$refs['handleValue'].selectedLabel;
						this.annexModel.reviewTypeVal = reject;
						var url = "/sys/review/save.do";
						fetchData(url, {
							applyId: this.applyId,
							remark: this.annexModel.remark,
							reviewType: this.annexModel.reviewType,
							reviewTypeVal: reject
						}).then(response => {
							if(response.data.success) {
								this.dialogFormVisible = false;
								this.getPager();
								this.$message({
									message: response.data.msg,
									type: 'success'
								});

							} else {
								this.$message({
									message: response.data.msg,
									type: 'warning'
								});
							}
						});

					} else {
						this.$message({
							message: '请检查所填信息格式是否正确',
							type: 'warning'
						});
						return false;
					}
				});
			},
			detail(row) {
				let applyId = this.selectUtil(row);
				if(applyId != null) {
					this.applyId = applyId;
					//	const applyId = row.applyId;
					this.$router.push({
						path: 'detailView/' + applyId
					});
				}
			},

			/*----------------------文件上传-----------------------------------*/
			onUploadSuccess(response, file, fileList) {
				if(response.success) {
					this.$notify({
						title: '提示',
						message: file.name + response.msg,
						type: 'success'
					});
				} else {
					file.status = 'fail',
						this.$notify.error({
							title: '提示',
							message: file.name + response.msg,
						});
				}
			},
			uploadError(err, file, fileList) {
				this.$message({
					type: 'error ',
					message: "文件上传异常!(" + file.name + ")"
				});
				file.status = 'fail'
			},
			uploadRemove(file, fileList) {
				const id = file.response.data.uid;
				let url = "/sys/review/delete.do?id=" + id;
				findById(url).then(res => {
					const result = res.data;
					if(result.success) {
						this.$message({
							type: "success",
							message: "删除成功!"
						});
					} else {
						this.$message({
							type: "warning",
							message: "删除失败!"
						});
					}
				});
			},
			giveUpUpload() {
				this.dialogFormVisible = false;

			},

			searchApply() {
				this.getPager();
			},
			selectChange(selection, row) {
				this.$refs.tableData.toggleRowSelection(row, true);
			},
			selectAll(selection) {
				this.$refs.tableData.clearSelection();
				this.$refs.tableData.setCurrentRow(null)
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
			checkPermiss(cpt) {
				return this.checkAction(cpt);
			},
			dateFor(row, column, cellValue) {
				if(typeof(cellValue) != "undefined") {
					return formatDate(new Date(cellValue), 'yyyy-MM-dd hh:mm:ss');
				}

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
	
	.review-popup {
		padding: 30px;
	}
</style>
<style>
	.review-popup .el-form-item__error {
		left: 100px;
	}
	
	.review-popup .el-form-item__label {
		width: 100px;
	}
	
	.review-popup .el-textarea__inner {
		width: 600px !important;
	}
	
	@media only screen and (max-width:1366px) {
		.review-popup {
			padding: 0px !important;
		}
		.review-popup .el-textarea__inner {
			width: 480px !important;
		}
	}
</style>