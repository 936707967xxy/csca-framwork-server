<template>
	<div class="role-box application-entry"  v-loading.fullscreen.lock="fullscreenLoading">
		<el-row class="search-box">
			<el-col :span="24">
				<div class="box-centenr">
					<el-form :inline="true" :model="listQuery" class="demo-form-inline">
						<el-form-item label="申请编号">
				            <el-input v-model="listQuery.loanId" placeholder="申请编号" size="small" style="width:160px;"></el-input>
				        </el-form-item>

						<el-form-item label="客户姓名">
							<el-input v-model="listQuery.custName" placeholder="客户姓名" size="small" style="width:100px;"></el-input>
						</el-form-item>

						<el-form-item label="客户手机号">
							<el-input v-model="listQuery.custMobile" placeholder="客户手机号" size="small" style="width:120px;"></el-input>
						</el-form-item>

						<el-form-item label="客户经理">
							<el-input v-model="listQuery.salesEmpName" placeholder="客户经理" size="small" style="width:100px;"></el-input>
						</el-form-item>
						<!--<el-form-item label="证件号">
            <el-input v-model="listQuery.idNumber" placeholder="证件号" size="small"></el-input>
          </el-form-item>-->
						<el-form-item label="提交状态">
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
					<el-button type="primary" size="small" @click="claimTask">签收</el-button>
					<el-button type="warning" size="small" @click="transferTask" v-if="checkPermiss('qc_transfer')">转办</el-button>
					<el-button type="danger" size="small" @click="handleEdit" v-if="checkPermiss('suppl_update')">修改</el-button>
					<el-button type="success" size="small" @click="submitEdit" v-if="checkPermiss('suppl_submit')">提交</el-button>
					<el-button type="danger" size="small" @click="uploadEdit">附件上传</el-button>
					<el-button type="info" size="small" @click="detailEdit">详情</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-table :data="tableData" border stripe style="width:100%;" cell-class-name="cell-class" ref="tableData" @select-all="selectAll"  @select="selectChange" @current-change="handleCurrentRow" highlight-current-row>
						<el-table-column type="selection" min-width="30"></el-table-column>
						<el-table-column prop="loanId" label="申请编号" min-width="190"></el-table-column>
						<el-table-column prop="custName" label="客户姓名" min-width="90"></el-table-column>
						<el-table-column prop="custMobile" label="联系电话" min-width="120"></el-table-column>
						<el-table-column prop="idNumber" label="证件号" min-width="180px"></el-table-column>
						<el-table-column prop="productName" label="申请产品" min-width="100"></el-table-column>
						<el-table-column prop="applyAmount" label="申请金额" min-width="100"></el-table-column>
						<el-table-column prop="salesEmpName" label="客户经理" min-width="90"></el-table-column>
						<el-table-column prop="createEmployeeVal" label="录单人" min-width="90"></el-table-column>
						<el-table-column prop="procStatusVal" label="状态" min-width="100"></el-table-column>
						<el-table-column prop="sourcesValue" label="来源" min-width="100"></el-table-column>
						<el-table-column label="操作" fixed="right" width="280px">
							<template slot-scope="scope">
								<el-button type="text" @click="claimTask(scope.row)">签收</el-button>
								<el-button type="text" @click="handleEdit(scope.row)" v-if="checkPermiss('suppl_update')">修改</el-button>
								<el-button type="text" @click="submitEdit(scope.row)" v-if="checkPermiss('suppl_submit')">提交</el-button>
								<el-button type="text" @click="uploadEdit(scope.row)">附件上传</el-button>
								<el-button type="text" @click="detailEdit(scope.row)" v-if="checkPermiss('apply_update')">详情</el-button>
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
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :showClose="false"  :close-on-click-modal="false" class="annex">
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
				<el-form-item label="附件描述：" prop="applyTypeId" :rules="[
		      { required: true, message: '请选择附件'}
		    ]">
					<el-select v-model="annexModel.applyTypeId" placeholder="请选择" @change="typeChange">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					</el-cascader>
				</el-form-item>
				<el-form-item label="附件图片：">
					<el-upload ref="upload" :on-remove="pictureRemove" :file-list="alreadyFileList"
						action="/sys/supplement/multiupload.do" multiple accept='image/x-png,image/gif,image/jpeg,image/bmp'
						list-type="picture-card" :on-preview="preview" :data='annexModel' :auto-upload="false"
						:on-success="handleSuccess" :on-error="handleError" :show-file-list="true"
						:batchUpload="true">
						<!-- :limit="10" :on-exceed="exceedCount" -->
						<i class="el-icon-plus"></i>
					</el-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="giveUpUpload">关闭</el-button>
				<el-button v-if="dialogStatus=='create'" type="primary" @click="submitUpload('annexModel')">确定上传</el-button>
			</div>
		</el-dialog>
		<el-dialog :visible.sync="imgDialog" size="tiny">
	  		<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
		<el-dialog title="提示" :visible.sync="dialogVisible"   width="30%">
	    <el-form :model="empModel" size="mini" :rules="rules" ref="empModel">
	      <el-form-item label="办理人：" prop="userId">
	          <el-select v-model="empModel.userId">
	              <el-option  v-for="item in groups" :key="item.empId"  :label="item.empName" :value="item.empId">
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
import {
	formatDate
} from '@/utils/date'
import {
	queryPostJson
} from '../../apis/httpapis.js'

export default {
	name:'Dept',
data() {
		return {
			fullscreenLoading: false,
			applyId:'',
			dialogImageUrl: '',
      		imgDialog: false,
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
			nodeOption: [{
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
			alreadyFileList: [],
			tableData: null,
			total: null,
			annexModel: {
				applyId:'',
				custName: '',
				idNumber: '',
				applyTypeId: '',
				applyTypeIdVal: ''
			},
			options: [],
			multipleSelection: [],
			dialogStatus: '',
			textMap: {
				create: '上传附件'
			},
			dialogFormVisible: false,
			flag: true,
			dialogVisible:false,
      groups: [],
      empModel:{
        userId:null
      },
			rules:{
        userId: [
              { required: true, message: '请选择办理人', trigger: 'change' }
        ]
      }
		}
	},
	created() {
		this.getPager();
		findById("/sys/annex/imgtype.do").then(response => {
			var imgType = response.data;
			this.options = imgType;
		});
	},
	methods: {
		exceedCount(file,fileList){
			if(file.length>10){
				this.$message({
					message: "附件单次最多上传10个!",
					type: 'warning'
				});
				return false;
			}
			return true;
		},
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
		preview(file) {
			this.dialogImageUrl = file.url;
      		this.imgDialog = true;
/*			if(file.status == 'success') {
				this.$notify.success({
					title: '提示',
					message: file.name + file.response.msg,
				});
			} else {
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
			fetchData('/sys/supplement/select.do', this.listQuery).then(response => {
				// console.info("^^^^^ :  " + JSON.stringify(response.data));

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
      			this.alreadyFileList=data;
      			//console.log(JSON.stringify(data));
      		})
			////console.log("^^^"+this.annexModel.applyTypeVal);
		},

		handleSuccess(response, file, fileList) {
			if(response.success) {
				this.fullscreenLoading = false;
				this.$notify({
					title: '提示',
					message: file.name + response.msg,
					type: 'success'
				});

				this.getPager();
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
		uploadEdit(row) {
			let applyId = this.selectUtil(row);
			if(applyId != null) {
				findById('/sys/supplement/claim.do?applyId=' + applyId)
						.then(res => {
							const result = res.data;
							if(result.success) {
								this.uploadUtil(applyId);
							} else {
								this.$message({
									message: result.msg,
									type: 'warning'
								});
							}
				})
			}
		},
		uploadUtil(applyId) {
			findById('/sys/supplement/iscurrentnode.do?applyId=' + applyId) //判断当前节点
				.then(response => {
					var result = response.data
					if(result.success) {
						findById('/sys/supplement/upselectapplybyid.do?applyId=' + applyId) //修改回显
							.then(response => {
								this.dialogStatus = 'create';
								this.dialogFormVisible = true;
								this.annexModel = response.data
							})
					} else {
						this.$message({
							message: result.msg,
							type: 'warning'
						});
					}
				})
		},
		findById(id) {
			findById('/sys/supplement/iscurrentnode.do?applyId=' + id) //判断当前节点
				.then(response => {
					var result = response.data
					if(result.success) {
						findById('/sys/applymodel/selectapplybyid.do?applyId=' + id) //修改回显
							.then(response => {
								this.annexModel = response.data
							})
					} else {
						this.$message({
							message: result.msg,
							type: 'warning'
						});
					}
				})
		},
		submitUpload(formName) {
			//console.log(this.$refs.upload)
			this.$refs[formName].validate((valid) => {
				if(valid) {
					//console.log(this.pictureUpload.length)
					this.fullscreenLoading = true;
					this.$refs.upload.submit();
				} else {
					this.$message({
						message: '请检查所填信息格式是否正确',
						type: 'warning'});
			return false;
			}
		});
	},
	selchange(selection) {
		this.multipleSelection = selection;
	},
	handleEdit(row) {
		let applyId = this.selectUtil(row);
		if(applyId != null) {
			findById('/sys/supplement/claim.do?applyId=' + applyId)
			.then(res => {
				const result = res.data;
				if(result.success) {
					this.updateUtil(applyId);
				} else {
					this.$message({
						message: result.msg,
						type: 'warning'
					});
				}
			})
		}
	},
	detailEdit(row) {
		let applyId = this.selectUtil(row);
		if(applyId != null) {
			findById('/sys/supplement/claim.do?applyId=' + applyId)
						.then(res => {
							const result = res.data;
							if(result.success) {
							       this.$router.push({
									path: '/detailsupplement/' +applyId
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
	 updateUtil(applyId) {
	 		findById('/sys/supplement/isconaudit.do?applyId=' + applyId) //判断是否是协议审批退回
 			.then(response => {
 				var result = response.data
 				if(result.success) {
 					findById('/sys/supplement/iscurrentnode.do?applyId=' + applyId) //判断当前节点
 						.then(response => {
 							var result = response.data
 							if(result.success) {
 								this.$router.push({
 									path: '/supplementupdate/' + applyId
 								});
 							} else {
 								this.$message({
 									message: result.msg,
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
 			})
 	},
 	dateFor(row, column, cellValue) {
 		if(typeof(cellValue) !="undefined") {
			return formatDate(new Date(cellValue), 'yyyy-MM-dd hh:mm:ss');
	}

	},
	submitEdit(row) {
			let applyId = this.selectUtil(row);
			if(applyId != null) {
				this.submitUtil(applyId)
			}
		},
	submitUtil(applyId) {
		findById('/sys/supplement/iscurrentnode.do?applyId=' + applyId) //判断当前节点
			.then(response => {
				var result = response.data
				if(result.success) {
					findById('/sys/supplement/claim.do?applyId=' + applyId)
						.then(res => {
							const result = res.data;
							if(result.success) {
								this.$router.push({
									path: '/submitsupplement/' + applyId
								});
							} else {
								this.$message({
									message: result.msg,
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
			}).catch(error => {
				this.$message({
					message: '签收异常!',
					type: 'error'
				});
			})

	},
	pictureRemove(file, fileList) {
		if(file != null&&file.response!=null&&file.status=='success') {
			const anxId = file.response.data.anxId;
			if(anxId != null&&anxId!=undefined) {
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
	claimTaskUtil(applyId) {
		findById('/sys/supplement/claim.do?applyId=' + applyId)
			.then(res => {
				const result = res.data;
				if(result.success) {
					this.$message({
						message: result.msg,
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
	},
	claimTask(row) { //签收
		let applyId = this.selectUtil(row);
		if(applyId != null) {
			this.claimTaskUtil(applyId);
		}
	},
	transferTask(row){//转办
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
	submitTransfer(row){
		const applyId = this.currentRow.applyId;
		this.$refs['empModel'].validate((valid) => {
			if (!valid) {
				this.$message({
					message: '请选择办理人!',
					type: 'error'
				});
				return false;
			}else{
				var url = "/sys/supplement/saveassignee.do";
				createData(url,{applyId:applyId,userId:this.empModel.userId})
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
		})
	},
	checkPermiss(cpt) {
		return this.checkAction(cpt);
	}
}
}</script>

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

	.box-centenr {
		width: 100%;
	}
	.annex-form {
		padding: 30px;
		margin-left: 3%;
	}
</style>
<style>
	.application-entry .el-table td {
		padding:1px 0 !important;
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
