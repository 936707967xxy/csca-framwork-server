 <!--
	作者：zhiwenliu
	时间：2017-12-19
	描述：信息变更申请
-->
<template>
	<div id="infochange-type-box" class="infochange-apploy-style">
		<el-row>
			<div class="crumbs" style="margin-top: 15px;margin-left: 10px;margin-bottom: 15px;">
				<el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
					<el-breadcrumb-item>贷后管理</el-breadcrumb-item>
					<el-breadcrumb-item>信息变更申请</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="handle-box" style="margin-left: 10px;">
				<el-form :inline="true" :model="listQuery" class="demo-form-inline" ref="listQuery">
					<el-form-item label="进件编号:" prop="serialId" >
						<el-input v-model="listQuery.serialId"  placeholder="进件编号" size="small" ></el-input>
					</el-form-item>
					<el-form-item label="合同编号:" prop="conNo" >
						<el-input v-model="listQuery.conNo"  placeholder="合同编号" size="small" ></el-input>
					</el-form-item>
					<el-form-item label="客户姓名:"prop="castName" >
						<el-input v-model="listQuery.castName" placeholder="客户姓名" size="small"></el-input>
					</el-form-item>
					<el-form-item label="身份证号码:"prop="cardNo" >
						<el-input v-model="listQuery.cardNo" placeholder="身边证号码" size="small"></el-input>
					</el-form-item>
					<el-form-item label="手机号码:"prop="tel" >
						<el-input v-model="listQuery.tel" placeholder="手机号码" size="small"></el-input>
					</el-form-item>					
					<el-form-item>
						<el-button type="primary" icon="el-icon-search" @click="searchProductType" size="small">查询</el-button>
						<el-button type="primary"  @click="reset('listQuery')" size="small">重置 </el-button>
					</el-form-item>
					
			<div>
					<el-form-item>
						<el-button type="warning" @click="applyDialog" size="small" v-if="checkPermiss('user_update_apply')" >发起申请</el-button>
					</el-form-item>				
				
			</div>		

				</el-form>
			</div>
			<el-table :data="tableData" border style="width: 100%"  cell-class-name="cell-class" :stripe="true"   @selection-change="selchage" height='580' size="medium">
				<el-table-column type="selection"> </el-table-column>
				<el-table-column prop="serialId" label="进件编号" min-width="230" align="center"></el-table-column>
				<el-table-column prop="conNo" label="合同编号" min-width="230" align="center"></el-table-column>
				<el-table-column prop="castName" label="客户姓名" min-width="180" align="center"></el-table-column>
				<el-table-column prop="tel" label="联系电话" min-width="180" align="center"></el-table-column>
				<el-table-column prop="cardNo" label="身份证号" min-width="180" align="center"></el-table-column>
				<el-table-column prop="sex" label="性别" min-width="180" align="center"></el-table-column>
				<el-table-column prop="bank" label="所属银行" min-width="180" align="center"></el-table-column>
				<el-table-column prop="bankPhone" label="银行预留手机号" min-width="180" align="center"></el-table-column>
				<el-table-column prop="bankAccount" label="开户行账号" min-width="180" align="center"></el-table-column>
				<el-table-column prop="bankCode" label="开户行编码" min-width="180" align="center"></el-table-column>
				<el-table-column prop="posType" label="POS类型" min-width="180" align="center"></el-table-column>
				<el-table-column prop="castSource" label="客户来源" min-width="180" align="center"></el-table-column>
				
				<el-table-column prop="productId" label="产品id" min-width="180" align="center"></el-table-column>
				<el-table-column prop="productName" label="产品名称" min-width="180" align="center"></el-table-column>
				<el-table-column prop="contractAccount" label="合同金额" min-width="180" align="center"></el-table-column>
				
				<el-table-column prop="loanMoney" label="放款金额" min-width="180" align="center"></el-table-column>
				<el-table-column prop="loanDate" label="放款日期" min-width="180" align="center"></el-table-column>
				<el-table-column prop="amt" label="月还金额" min-width="180" align="center"></el-table-column>
				<el-table-column prop="startTime" label="起始还款日期" min-width="180" align="center"></el-table-column>
				<el-table-column prop="endTime" label="结束还款日期" min-width="180" align="center"></el-table-column>
				<el-table-column prop="loanPeriod" label="贷款期数" min-width="180" align="center"></el-table-column>
				<el-table-column prop="currentPeriod" label="当前期数" min-width="180" align="center"></el-table-column>
				<el-table-column prop="surplusPeriod" label="剩余期数" min-width="180" align="center"></el-table-column>
				<el-table-column prop="shouldCapi" label="应还本金" min-width="180" align="center"></el-table-column>
				<el-table-column prop="shouldInte" label="应还利息" min-width="180" align="center"></el-table-column>
				<el-table-column prop="surplusPrincipal" label="剩余本金" min-width="180" align="center"></el-table-column>
				<el-table-column prop="replaymentDate" label="应还款日期" min-width="180" align="center"></el-table-column>
				
				<el-table-column prop="statementDate" label="账单日" min-width="180" align="center"></el-table-column>
				<el-table-column prop="bigArea" label="所属大区" min-width="180" align="center"></el-table-column>
				
				<el-table-column prop="department" label="所属分部" min-width="180" align="center"></el-table-column>
				<el-table-column prop="salesDeptment" label="销售营业部" min-width="180" align="center"></el-table-column>
				<el-table-column prop="teamLeader" label="团队经理姓名" min-width="180" align="center"></el-table-column>
				<el-table-column prop="castLeader" label="客户经理姓名" min-width="180" align="center"></el-table-column>
				<el-table-column prop="businessDepartment" label="管理营业部" min-width="180" align="center"></el-table-column>
				<el-table-column prop="reviceCast" label="签约客服" min-width="180" align="center"></el-table-column>
				<el-table-column prop="businessDepartment" label="管理客服" min-width="180" align="center"></el-table-column>
				<el-table-column prop="publicAccountFour" label="对应公户后四位" min-width="180" align="center"></el-table-column>

				
				
			</el-table>
		</el-row>

		<el-row style="margin-top:20px;">
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[30, 60, 90]" :page-size="2" layout="total, sizes, prev, 

pager, next, jumper" :total="total">
					</el-pagination>
				</div>
			</el-col>
		</el-row>

		<el-dialog title="信息变更申请登记单" :visible.sync="dialogVisible" :lock-scroll='true' :model="applyModel" width="55%" :show-close='false' :close-on-press-escape='false' :close-on-click-modal='false'>
			
			<el-tabs type="border-card">
				<el-tab-pane label="登记单">
					<el-form class="small-space" :model="applyModel" label-position="right" label-width="150px" size="mini"  :rules="rules" ref="ruleForm">
						<el-row>
							<el-col :span="10">
								<div class="grid-content bg-purple">
									<el-form-item label="变更号码类型:" prop="changeType">
										<el-select v-model="applyModel.changeType" placeholder="请选择" @change="changeTye('ruleForm')" >
											<el-option label="银行卡号" value="1"></el-option>
											<el-option label="手机号码" value="0"></el-option>
										</el-select>
									</el-form-item>
								</div>
							</el-col>
							<el-col :span="10">
								<div class="grid-content bg-purple-light">
									<el-form-item label="进件号码:">
										<el-input v-model="applyModel.serialId" ::readonly='true'></el-input>
									</el-form-item>

								</div>
							</el-col>
						</el-row>

						<el-row >
							<el-col :span="20">
								<div class="grid-content bg-purple">
	
									<el-form-item label="备注:">
										<el-input v-model="applyModel.applicationDesc" type='textarea'></el-input>
									</el-form-item>
								</div>								
							</el-col>


						</el-row>
						<!--
                               	作者：贾海勇
                               	时间：2017-12-17
                               	描述：手机信息变更
                               -->
						<div v-if="applyModel.changeType === '0'">
							<fieldset style="border-color: #fff;">
								<legend style="color: #409EFF;">手机信息:</legend>
								<el-row>
									<el-col :span="10">
										<div class="grid-content bg-purple-light">

											<el-form-item label="原手机号码:">
												<el-input v-model="applyModel.oldPhone" :readonly='true'></el-input>
											</el-form-item>

										</div>
									</el-col>
									<el-col :span="10">
										<div class="grid-content bg-purple">

											<el-form-item label="新手机号:"  prop="newPhone">
												<el-input v-model="applyModel.newPhone" placeholder="新手机号" ></el-input>
											</el-form-item>
										</div>
									</el-col>
								</el-row>
							</fieldset>
						</div>
						<!--
                               	作者：贾海勇
                               	时间：2017-12-17
                               	描述：银行信息变更
                               -->
						<div v-else-if="applyModel.changeType === '1'">
							<fieldset style="border-color: #fff;">
								<legend style="color: #409EFF;">银行卡信息:</legend>
								<el-row>
									
								</el-row>
								<el-row>
									<el-col :span="10">
										<div class="grid-content bg-purple">
											<el-form-item label="原开户行名称:">
												<el-input v-model="applyModel.oldBankName" :readonly='true'></el-input>
											</el-form-item>
										</div>
									</el-col>
									<el-col :span="10">
										<div class="grid-content bg-purple-light">

											<el-form-item label="原账户姓名:">
												<el-input v-model="applyModel.castName" :readonly='true'></el-input>
											</el-form-item>

										</div>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="10">
										<div class="grid-content bg-purple">
											<el-form-item label="原账户账号:">
												<el-input v-model="applyModel.oldBankCardNo" :readonly='true'></el-input>
											</el-form-item>
										</div>
									</el-col>
									<el-col :span="10">
										<div class="grid-content bg-purple-light">

											<el-form-item label="原预留手机号:">
												<el-input v-model="applyModel.oldBankPhone" :readonly='true'></el-input>
											</el-form-item>

										</div>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="20">
										<div class="grid-content bg-purple">
											<el-form-item label="新开户行名称:"  prop="newBankName">
												<el-input v-model="applyModel.newBankName" placeholder="新开户行名称"  ></el-input>
											</el-form-item>
										</div>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="10">
										<div class="grid-content bg-purple">
											<el-form-item label="新银行卡号:"  prop="newBankCardNo">
												<el-input v-model="applyModel.newBankCardNo" placeholder="新银行卡号"  ></el-input>
											</el-form-item>
										</div>
									</el-col>
									<el-col :span="10">
										<div class="grid-content bg-purple-light">

											<el-form-item label="新预留手机号:"  prop="newBankPhone">
												<el-input v-model="applyModel.newBankPhone" placeholder="新预留手机号"></el-input>
											</el-form-item>

										</div>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="10">
										<div class="grid-content bg-purple">
											<el-form-item label="上传身份证信息:" required>
												
												<el-upload
												  action="/after/changeInfo/upload.do"
												  :data="idCardModel"
												  list-type="picture-card"
												  accept=".gif,.png,.jpg,.jpeg,.bmp"
												  :on-preview="handlePictureCardPreview"
												  :on-success="handleSuccess"
												  :on-remove="handleRemove"
												  :on-error="handleError" 
												  >
												  <i class="el-icon-plus"></i>
												</el-upload>
												
											</el-form-item>
										</div>
									</el-col>
									<el-col :span="10">
										<div class="grid-content bg-purple">
											<el-form-item label="上传银行卡信息:" required>
												
												<el-upload
												  action="/after/changeInfo/upload.do"
												  :data="bankCardModel"
												  list-type="picture-card"
												  accept=".gif,.png,.jpg,.jpeg,.bmp"
												  :on-preview="handlePictureCardPreview"
												  :on-success="handleSuccess"
												  :on-remove="handleRemove"
												  :on-error="handleError" 
												  >
												  <i class="el-icon-plus"></i>
												</el-upload>	

											</el-form-item>
										</div>
									</el-col>

								</el-row>
							</fieldset>
						</div>
						<div v-else>

						</div>
						<el-row>
							<el-col :span="20" style="padding-top: 20px;">
								<div style="float: right;">
									<el-button @click="cancel">取 消</el-button>
									<!--<el-button type="primary" @click="onSubmit">提交</el-button>-->
									<el-button type="primary"  @click="submitForm('ruleForm')">提交</el-button>
								</div>								
								
								
							</el-col>

						</el-row>

					</el-form>
				</el-tab-pane>

			</el-tabs>
			</span>
		</el-dialog>
	<!--图片预览-->
	<el-dialog :visible.sync="imgdialogVisible" size="tiny">
	  <img width="100%" :src="dialogImageUrl" alt="">
	</el-dialog>



	</div>
</template>

<script>
	import { fetchData, createDataJson } from '@/apis/httpapis'

	export default {
		name: 'ProductType1',
		data() {
			return {
				tableData: [],
				total: 0,
				listQuery: {
					page: 1,
					pageSize: 30,
					serialId: '',
					conNo : '',
					castName: '',
					cardNo: '',
					tel : ''
				},
				LoanBalModel: {
					id: '',
					loanId: '',
					castName: '',
					tel: '',
					cardNo: '',
					sex: '',
					bank: '',
					bankPhone: '',
					bankAccount: '',
					bankCode: '',
					posType: '',
					castSource: '',
					productId: '',
					productName: '',
					contractAccount: '',
					loanMoney: '',
					loanDate: '',
					amt: '',
					startTime: '',
					endTime: '',
					loanPeriod: '',
					currentPeriod: '',
					surplusPeriod: '',
					shouldCapi: '',
					shouldInte: '',
					surplusPrincipal: '',
					replaymentDate: '',
					statementDate: '',
					bigArea: '',
					department: '',
					salesDeptment: '',
					teamLeader: '',
					castLeader: '',
					businessDepartment: '',
					reviceCast: '',
					managerCast: '',
					managerCastId: '',
					publicAccountFour: '',
					settleFlag: '',
					delayFlag: '',
					updownStatus: '',
					conNo : '',
					serialId : ''
				},
				applyModel: {
					id: '',
					castName : '',
					applicationId: '',
					loanId: '',
					changeType: '',
					changeTypeVal: '',
					oldPhone: '',
					newPhone: '',
					oldBankCode: '',
					oldBankName: '',
					oldBankCardNo: '',
					oldBankPhone: '',
					newBankCode: '',
					newBankName: '',
					newBankCardNo: '',
					newBankPhone: '',
					applicationCastId: '',
					applicationCastName: '',
					applicationDate: '',
					applicationDesc: '',
					approveId: '',
					approveName: '',
					approveDate: '',
					approveDesc: '',
					approveOpinion: '',
					noStatus: '',
					cardNo : '',
					conNo : '',
					serialId : ''					

				},
				
				optionsImgModel: [],
				
				checkedTypeModel : {
					pkid : ''
					
				},
				
				upSelect : '',
				dialogVisible: false,
				imgdialogVisible : false,
				bankinfo: false,
				phoneinfo: false,
				multipleSelection: [],
				value8: '',
				imageTypes: '',
				imageTypec: '',
				idCardModel: {
					applyTypeIdVal: 'A1',
					applicationId1 : '',
				},
				bankCardModel: {
					applyTypeIdVal: 'B1',
					applicationId1 : '',
				},
				delImgModel : {
					applyId : '',
					Id : '',
					diskUrl : ''
				},
				dialogImageUrl:'',
				 rules: {
          newPhone: [
            { required: true, message: '请输入新手机号', trigger: 'blur' },
            {
            pattern: /^1[34578]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
           }
          ],
          newBankName: [
            { required: true, message: '请输入新开户行名称', trigger: 'blur' }
          ],
          newBankCardNo: [
            {  required: true, message: '请输入新账户账户', trigger: 'blur' }
          ],
          newBankPhone: [
            { required: true, message: '请输入新预留手机号', trigger: 'blur' },
            {
            pattern: /^1[34578]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
           }
          ],
          changeType: [
            { required: true, message: '请选择变更号码类型', trigger: 'change' }
          ]
          }
		}
		},
		created() {
			this.getPager()
		},
		methods: {

			/****************   分页及查询相关   ********************/
			getPager() {
				fetchData('/after/changeInfo/changeList.do', this.listQuery).then(response => {
					this.tableData = response.data.pageData
					this.total = response.data.recordCount
				})
			},
			
			searchProductType(){
				this.getPager();
			},			
			handleSizeChange(val) {
				this.listQuery.pageSize = val
				this.getPager();
			},
			handleCurrentChange(val) {
				this.listQuery.page = val;
				this.getPager();
			},
			/**************** 工具栏调用 **********************/
			/**
			 * 信息变更申请
			 */
			submitApply() {
				fetchData('/after/changeInfo/application.do', this.applyModel).then(response => {
					var result = response.data
					if(result.success) {
						this.$message({
							message: result.msg,
							type: 'success' //success/warning/info/error
						});
						this.getPager();
						this.dialogVisible = false
					} else {
						this.$message({
							message: result.msg,
							type: 'warning',
						});
						this.dialogVisible = false
					}

				})
			},
			/***************  formatter区域  ******************/
			selchage(selection) {
				this.multipleSelection = selection;
			},
			checkPermiss(cpt) {
				return this.checkAction(cpt);
			},

			/********************************/
			applyDialog() {
				if(this.multipleSelection.length > 1) {
					this.$message({
						message: '警告,只支持单数据申请!',
						type: 'warning'
					});
					return;
				}else if(this.multipleSelection.length < 1){
					this.$message({
						message: '警告,请选择数据!',
						type: 'warning'
					});
					return;					
				}else{


				this.applyModel.loanId = this.multipleSelection[0].loanId;
				this.applyModel.castName = this.multipleSelection[0].castName;
				this.applyModel.cardNo = this.multipleSelection[0].cardNo;
				
				this.applyModel.oldPhone = this.multipleSelection[0].tel;
				this.applyModel.oldBankName = this.multipleSelection[0].bank;
				this.applyModel.oldBankPhone = this.multipleSelection[0].bankPhone;
				this.applyModel.oldBankCardNo = this.multipleSelection[0].bankAccount;
				
				this.applyModel.conNo = this.multipleSelection[0].conNo;
				this.applyModel.serialId = this.multipleSelection[0].serialId;
				
				
				this.dialogVisible = true					
					
				}


			},
			cancel(){
				this.dialogVisible = false;
				this.applyModel.applicationId = '';
				this.applyModel.newPhone = '';
				this.applyModel.newBankName = '';
				this.applyModel.newBankCardNo = '';
				this.applyModel.newBankPhone = '';
				this.applyModel.applicationDesc = '';
				this.applyModel.changeType = '';
				this.idCardModel.applicationId1 = '';
				this.bankCardModel.applicationId1 = '';
			},
			  submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            this.onSubmit();
		          } else {
		            return false;
		          }
		        });
             },
			onSubmit() {
				createDataJson('/after/changeInfo/application.do', this.applyModel).then(response => {
					var result = response.data
					if(result.success) {
						this.$message({
							message: result.msg,
							type: 'success' //success/warning/info/error
						});

						this.cancel();
						this.getPager();	
					} else {
						this.$message({
							message: result.msg,
							type: 'warning',
						});
					}

				})
			},
			//上传影像资料成功
			handleSuccess(response, file, fileList) {
				if(response.success) {
					this.$notify({
						title: '提示',
						message: file.name + response.msg,
						type: 'success'
					});
					
					this.applyModel.applicationId  = response.data.applyId;
					this.idCardModel.applicationId1 = response.data.applyId;
					this.bankCardModel.applicationId1 = response.data.applyId;
				} else {
					file.status = 'fail',
						this.$notify.error({
							title: '提示',
							message: file.name + response.msg,
						});
				}
			},
			//上传印象资料失败
			handleError(response, file, fileList) {
				this.$message({
					message: file.name + "上传失败",
					type: 'warning'
				})

			},
			//影像资料预览
			handlePictureCardPreview(file) {
		        this.dialogImageUrl = file.url;
		        this.imgdialogVisible = true;
		     },
		     //删除影像资料
		     handleRemove(file, fileList) {
		      	
		      	this.delImgModel = file.response.data;
				fetchData('/after/changeInfo/deleteimageassortments.do', this.delImgModel).then(response => {
					var result = response.data
					if(result.success) {
						this.$message({
							message: result.msg,
							type: 'success' //success/warning/info/error
						});
					} else {
						this.$message({
							message: result.msg,
							type: 'warning',
						});
					}

				})		        
		        
		      },
		    //清空查询栏
		    reset(formName){
				
			this.$refs[formName].resetFields();	
//			this.listQuery.loanId = '',
//			this.listQuery.castName = '',
//			this.listQuery.cardNo = '',
//			this.listQuery.tel = ''

				},	
				tableRowClassName({row, rowIndex}) {
		        if (rowIndex/2 === 0) {
		          return 'warning-row';
		        } else{
		          return 'success-row';
		        }
           },
           changeTye(formName){
           	var type = this.applyModel.changeType;
           	 this.$refs[formName].resetFields();
           	 this.applyModel.changeType = type;
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
	
	.el-upload-dragger {
		width: 269px;
		height: 150px;
	}
	
	.el-upload-list__item-name {
		display: none;
	}
	.infochange-apploy-style .el-table th {
	background-color: #409EFF;
		color:#ffffff;
	}
	.infochange-apploy-style .el-table--border th{
		    border-right: 1px solid #c0c4cc;
	}
	 .infochange-apploy-style .el-input__inner{
		    border: 1px solid #409EFF;
	}
	.el-table .warning-row {
    background: #FFFFFF;
  }

  .el-table .success-row {
    background: #3CE66C;
  }
</style>