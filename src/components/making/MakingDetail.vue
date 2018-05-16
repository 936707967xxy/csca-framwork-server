<template>
<div id="making-detail-box" v-loading.fullscreen.lock="fullscreenLoading">
	<el-form ref="contractModel" :model="contractModel" label-width="140px" size="mini" :inline="true">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>借款需求</span>
			</div>
			<div class="text item">
				<el-form-item label="申请金额">
					<el-input v-model="contractModel.applyMoney" disabled></el-input>
				</el-form-item>
				<el-form-item label="客户姓名">
					<el-input v-model="contractModel.custName" disabled></el-input>
				</el-form-item>
				<el-form-item label="身份证号">
					<el-input v-model="contractModel.idNumber" disabled></el-input>
				</el-form-item>
				<el-form-item label="产品">
					<el-input v-model="contractModel.productName" disabled></el-input>
				</el-form-item>
				<el-form-item label="批核期限">
					<el-input v-model="contractModel.productPeriod" disabled></el-input>
				</el-form-item>
				<el-form-item label="综合年化成本">
					<el-input v-model="contractModel.irrVal" disabled></el-input>
				</el-form-item>
				<el-form-item label="批核金额">
					<el-input v-model="contractModel.loanAmount" disabled></el-input>
				</el-form-item>
				<el-form-item label="批核费率">
					<el-input v-model="contractModel.realRate" disabled></el-input>
				</el-form-item>
				<el-form-item label="合同金额">
					<el-input v-model="contractModel.conAmount" disabled></el-input>
				</el-form-item>
				<!-- <el-form-item label="咨询费">
						<el-input v-model="applyModel.productPeriod" ></el-input>
					</el-form-item>
					<el-form-item label="审核费">
						<el-input v-model="applyModel.productPeriod"></el-input>
					</el-form-item>
					<el-form-item label="服务费">
						<el-input v-model="applyModel.productPeriod" ></el-input>
					</el-form-item>
					<el-form-item label="开户行代码">
						<el-input v-model="contractModel.bank"></el-input>
					</el-form-item>-->
				<el-form-item label="开户行名称">
					<el-input v-model="contractModel.bank" disabled></el-input>
				</el-form-item>
				<el-form-item label="支行名称">
					<el-input v-model="contractModel.backBranch" disabled></el-input>
				</el-form-item>
				<el-form-item label="账户户名">
					<el-input v-model="contractModel.custName" disabled></el-input>
				</el-form-item>
				<el-form-item label="银行卡卡号">
					<el-input v-model="contractModel.bankNo" disabled></el-input>
				</el-form-item>
				<el-form-item label="银行卡预留手机号">
					<el-input v-model="contractModel.bankPhoneNo" disabled></el-input>
				</el-form-item>
				<el-form-item label="签约日期">
					<el-input v-model="contractModel.signTime" disabled></el-input>
				</el-form-item>
				<el-form-item label="每月还款日">
					<el-input v-model="contractModel.payDate" disabled></el-input>
				</el-form-item>
				<el-form-item label="起息日期">
					<el-input v-model="contractModel.startTime" disabled></el-input>
				</el-form-item>
				<el-form-item label="到期日期">
					<el-input v-model="contractModel.endTime" disabled></el-input>
				</el-form-item><br/>
				<el-form-item label="支行地址">
					<el-input v-model="contractModel.proName" disabled style="width:120px;"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="contractModel.cityName" disabled style="width:120px;"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="contractModel.backBranchAddr" disabled style="width:242px;"></el-input>
				</el-form-item>
			</div>
		</el-card>

		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>处理意见</span>
			</div>
			<el-select v-model="imageModel.imgId" placeholder="请选择影像类型" style="margin:0 0 10px 52px;background:#777;" size="mini" @change="changeImgType">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-upload ref="upload"
			:action="uploadUrl"
			list-type="picture-card"
			:show-file-list="showFileList"
			multiple
			:file-list="fileList"
			:on-success="onUploadSuccess"
			:on-error="uploadError"
			:on-remove="uploadRemove"
			accept="image/x-png,image/gif,image/jpeg,image/jpg,image/bmp"
			 style="margin:0 0 20px 52px;"
			 :data="imageModel"
			 :before-upload="beforeAvatarUpload"
			 :batchUpload="true">
			 <!-- :limit="10" :on-exceed="exceedCount" -->
				<i class="el-icon-plus"></i>
			</el-upload>
			</el-form-item>
			<div class="text item textarea-cont">
				<el-form-item label="备注" prop="remarks" :rules="[
			      { required: true, message: '请输入备注信息', trigger: 'blur' }
			    ]">
					<el-input type="textarea" size="medium" :autosize="{ minRows: 4, maxRows: 6}" v-model="contractModel.remarks" style="width:690px;"></el-input>
				</el-form-item>
			</div>

			<el-form-item style="margin-left:55px;">
				<el-button type="success" size="small" @click="onSubmit('contractModel')" v-if="checkPermiss('con_submit')">确定提交</el-button>
				<!-- <el-button type="info" size="small" @click="roolback('contractModel')" v-if="checkPermiss('con_rollback')">退回</el-button> -->
				<el-button type="warning" @click="reject('contractModel')" v-if="checkPermiss('con_reject')">拒贷</el-button>
				<el-button type="danger" size="small" @click="waiver('contractModel')" v-if="checkPermiss('con_waiver')">客户放弃</el-button>
				<el-button @click="backApply">取消</el-button>
			</el-form-item>
		</el-card>

		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>审核意见</span>
			</div>
			<el-table :data="listRemarks" border style="width: 100%" cell-class-name="cell-class">
				<el-table-column prop="taskId" label="审核节点" min-width="80"></el-table-column>
				<el-table-column prop="handleRemarks" label="备注" min-width="80"></el-table-column>
				<el-table-column prop="checkDate" label="审核时间" min-width="80"></el-table-column>
			</el-table>
		</el-card>

		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>还款计划</span>
			</div>
			<el-table :data="contractModel.repaymentPlans" border style="width: 100%" cell-class-name="cell-class">
				<!-- <el-table-column prop="shouldTerm" label="期数"></el-table-column> -->
				<el-table-column prop="shouldTerm" label="期数"></el-table-column>
				<el-table-column prop="strShouldDate" label="应还日期"></el-table-column>
				<el-table-column prop="shouldInte" label="月还利息"></el-table-column>
				<el-table-column prop="shouldCapi" label="月还本金"></el-table-column>
				<el-table-column prop="shouldAmt" label="月还金额"></el-table-column>
				<el-table-column prop="endBal" label="剩余本金"></el-table-column>
				<el-table-column prop="advanceMoney" label="提前还款额"></el-table-column>
			</el-table>
		</el-card>
	</el-form>
</div>
</template>

<script>
import {
	fetchData,
	findById,
	updateData,
	createDataJson,
	queryPostJson
} from '@/apis/httpapis'
import {
	imgType,
	getImgTypeLabel
} from '../../utils/imagetype.js'
export default {
	name: 'SubmitCon',
	data() {
		return {
			fullscreenLoading: false,
			contact: false,
			showFileList: true,
			remarks: "",
			applyId: "",
			fileList: [],
			listRemarks: [],
			imgType: 18,
			imageModel: {
				imgId: 18,
				imgIdVal: "借款协议(借款人声明)书"
			},
			imgData: [],
			options: [{
					value: 18,
					label: '借款协议(借款人声明)书'
				},
				{
					value: 19,
					label: '委托划款授权书'
				},
				{
					value: 20,
					label: '信用咨询与管理服务协议书'
				},
				{
					value: 22,
					label: '服务记录表'
				},
				{
					value: 23,
					label: '还款事项提醒函'
				},
				// {
				// 	value: 6,
				// 	label: '签约资料'
				// },
				{
					value: 14,
					label: '其他类'
				}
			]
		}
	},
	computed: {
		contractModel: {
			get() {
				return this.$store.getters.contractModel;
			},
			set(value) {
				this.$store.contract.commit('SET_CONTRACT', value)
			}
		},
		uploadUrl: function() {
			return "/sys/making/multiupload.do?applyId=" + this.applyId;
			// return "/sys/making/upload.do?applyId=" + this.applyId;
		}
	},
	created() {
		const applyId = this.$route.params.applyId;
		this.applyId = applyId;
		this.$store.dispatch('LoadContractApp', applyId);
		findById("/sys/rollback/listremarks.do?applyId=" + this.applyId) //初始化省市联动
			.then(response => {
				this.listRemarks = response.data;
			});
		this.changeImgType(18);
	},
	methods: {
		changeImgType(value) {
			for (var i = 0; i < this.options.length; i++) {
				if (value == this.options[i].value) {
					this.imageModel.imgIdVal = this.options[i].label;
				}
			};
			const imgType = value;
			const applyId = this.applyId;
			const url = "/sys/annex/queryreview.do";//    /sys/annex/query.do
			queryPostJson(url, {
				applyId: applyId,
				imgType: imgType
			}).then(response => {
				const data = response.data;
				this.fileList = data;
				// this.fileList = [];
        //
				// const data = response.data;
				// if(data != null && data.length > 0){
				// 	for(var i=0;i<data.length;i++){
				// 		this.fileList.push({
		    //       uid:data[i].anxId,
		    //       name:data[i].fileName,
		    //       url:data[i].preView
		    //     })
				// 	}
				// }else{
				// 	this.fileList = data;
				// }
			})
			// this.$refs.upload.clearFiles(); // 清空上传列表

		},
		//通过
		onSubmit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$confirm('你确定合同数据无误,并提交合同审核?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.fullscreenLoading = true;
						const applyId = this.applyId;
						var url = "/sys/making/constact.do";
						fetchData(url, {
								applyId: applyId,
								remark: this.contractModel.remarks
							})
							.then(response => {
								var result = response.data
								if (result.success) {
									this.$message({
										message: result.msg,
										type: 'success' //success/warning/info/error
									});
									this.gotoListView();
								} else {
									this.$message({
										message: result.msg,
										type: 'warning'
									});
								}
							})
						this.fullscreenLoading = false;
					}).catch(() => {
						this.$message({
							message: "已经取消操作!",
							type: 'info'
						});
					})
				} else {
					console.log('数据格式错误或者未填写必要信息');
					return false;
				}
			})
		},
		//退回
		roolback(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$confirm('你确定退回数据?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.fullscreenLoading = true;
						const applyId = this.applyId
						var url = "/sys/making/rollback.do";
						fetchData(url, {
								applyId: applyId,
								remark: this.contractModel.remarks
							})
							.then(response => {
								var result = response.data
								if (result.success) {
									this.$message({
										message: result.msg,
										type: 'success' //success/warning/info/error
									});
									this.gotoListView();
								} else {
									this.$message({
										message: result.msg,
										type: 'warning'
									});
								}
							})
						this.fullscreenLoading = false;
					}).catch(() => {
						this.$message({
							message: "已经取消操作!",
							type: 'info'
						});
					})

				} else {
					console.log('数据格式错误或者未填写必要信息');
					return false;
				}
			})
		},
		//拒贷
		reject(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$confirm('你确定拒绝客户的签约?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.fullscreenLoading = true;
						const applyId = this.applyId
						var url = "/sys/making/reject.do";
						fetchData(url, {
								applyId: applyId,
								remark: this.contractModel.remarks
							})
							.then(response => {
								var result = response.data
								if (result.success) {
									this.$message({
										message: result.msg,
										type: 'success' //success/warning/info/error
									});
									this.gotoListView();
								} else {
									this.$message({
										message: result.msg,
										type: 'warning'
									});
								}
							})
						this.fullscreenLoading = false;
					}).catch(() => {
						this.$message({
							message: "已经取消操作!",
							type: 'info'
						});
					})
				} else {
					console.log('数据格式错误或者未填写必要信息');
					return false;
				}
			})

		},
		//客户放弃
		waiver(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$confirm('客户确定已经放弃签约?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.fullscreenLoading = true;
						const applyId = this.applyId
						var url = "/sys/making/waiver.do";
						fetchData(url, {
								applyId: applyId,
								remark: this.contractModel.remarks
							})
							.then(response => {
								var result = response.data
								if (result.success) {
									this.$message({
										message: result.msg,
										type: 'success' //success/warning/info/error
									});
									this.gotoListView();
								} else {
									this.$message({
										message: result.msg,
										type: 'warning'
									});
								}
							})
						this.fullscreenLoading = false;
					}).catch(() => {
						this.$message({
							message: "已经取消操作!",
							type: 'info'
						});
					})
				} else {
					console.log('数据格式错误或者未填写必要信息');
					return false;
				}
			})

		},
		beforeAvatarUpload(file) {
			this.fullscreenLoading = true;
			var imgIds = this.imageModel.imgId;
			if (imgIds == '' || imgIds == undefined || imgIds == null) {
				this.fullscreenLoading = false;
				this.$message({
					type: 'warning',
					message: '请选择上传类型!'
				});
				// this.$refs.upload.abort(file);
				return false;
			}else if(file.length>10){
				this.$message({
					message: "附件单次最多上传10个!",
					type: 'warning'
				});
				this.fullscreenLoading = false;
				return false;
			}
			return true;
		},
		exceedCount(files, fileList){
			if(files.length>10){
				this.$message({
					message: "附件单次最多上传10个!",
					type: 'warning'
				});
			}
		},
		onUploadSuccess(response, file, fileList) {
			// console.log("###up success response###" , response);
			// console.log("###up success file###" ,file);
			// console.log("###up success fileList###",fileList);
			this.fullscreenLoading = false;
			if (file.response.success) {
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
			this.fullscreenLoading = false;
			this.$message({
				type: 'error ',
				message: "文件上传异常!(" + file.name + ")"
			});
			// file.status = 'fail'
		},
		uploadRemove(file, fileList) {
			// console.log("####rm file####:",file);
			// console.log("####rm fileList####:",fileList);
			const id = file.response.data.anxId;
			// const id = file.uid;
			let url = "/sys/makingannex/delete.do?id=" + id;
			findById(url).then(res => {
				const result = res.data;
				if (result.success) {
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
		//取消
		backApply() {
			this.gotoListView();
		},
		gotoListView() {
			this.$router.push({
				path: '/making'
			});
		},
		checkPermiss(cpt) {
			return this.checkAction(cpt);
		},
		dateFor(row, column, cellValue) {
			if (typeof(cellValue) != "undefined") {
				return formatDate(new Date(cellValue), 'yyyy-MM-dd');
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#id {
	font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
	font-size: 14px;
}

.el-form-item--mini .el-form-item__content,
.el-form-item--mini .el-form-item__label {
	font-weight: 600;
	color: #2D2F33;
	font-size: 16px;
}

.box-card {
	margin-bottom: 20px;
}

.clearfix span {
	font-size: 18px;
	font-weight: 600;
}

.clearfix i {
	color: #409EFF;
	font-size: 18px;
	font-weight: 600;
	cursor: pointer;
	margin-left: 15px;
}

.icon-minus {
	color: #409EFF;
	font-size: 18px;
	font-weight: 600;
	cursor: pointer;
	margin-left: 15px;
}
</style>
<style>


.el-loading-parent--relative{
	position:static!important
}
.el-loading-mask{
	background-color:rgba(0,0,0,.1);
}
.textarea-cont .el-form-item__label {
	margin-left: -85px !important;

}
</style>
