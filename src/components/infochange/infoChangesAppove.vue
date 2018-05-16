<!--
	作者：zhiwenliu
	时间：2017-12-19
	描述：信息变更审批
-->
<template>
	<div id="infochange-type-box" class="infochange-approve-style">
		<el-row>
			<div class="crumbs" style="margin-top: 15px;margin-left: 10px;margin-bottom: 15px;">
				<el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
					<el-breadcrumb-item>贷后管理</el-breadcrumb-item>
					<el-breadcrumb-item>信息变更审批</el-breadcrumb-item>
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
					<el-form-item label="客户姓名:" prop="castName" >
						<el-input v-model="listQuery.castName" placeholder="客户姓名" size="small"></el-input>
					</el-form-item>
					<el-form-item label="身份证号码:" prop="cardNo" >
						<el-input v-model="listQuery.cardNo" placeholder="身份证号码" size="small"></el-input>
					</el-form-item>
					<el-form-item label="手机号码:" prop="tel" >
						<el-input v-model="listQuery.tel" placeholder="手机号码" size="small"></el-input>
					</el-form-item>					
					<el-form-item>
						<el-button type="primary" icon="el-icon-search" @click="searchProductType" size="small">查询</el-button>
						<el-button type="primary" @click="resetSearch('listQuery')" size="small">重置 </el-button>
					</el-form-item>
				<div>
					<el-form-item>
						<el-button type="warning" @click="applyDialog" size="small" v-if="checkPermiss('user_update_audit')" >审批</el-button>
					</el-form-item>					
				</div>	

				</el-form>
			</div>
			<el-table :data="tableData" border style="width: 100%" cell-class-name="cell-class" @selection-change="selchage" height='580' size="medium">
				<el-table-column type="selection"> </el-table-column>
				<!--<el-table-column prop="id" label="主键" min-width="180" align="center"></el-table-column>-->
				<el-table-column prop="applicationId" label="申请单号" min-width="180" align="center"></el-table-column>
				<el-table-column prop="serialId" label="进件编号" min-width="230" align="center"></el-table-column>
				<el-table-column prop="conNo" label="合同编号" min-width="230" align="center"></el-table-column>				
				<el-table-column prop="castName" label="客户姓名" min-width="180" align="center"></el-table-column>
				<el-table-column prop="cardNo" label="身份证号" min-width="180" align="center"></el-table-column>
				<el-table-column prop="changeTypeval" label="变更类型" min-width="180" align="center"></el-table-column>
				<el-table-column prop="oldPhone" label="原手机号" min-width="180" align="center"></el-table-column>
				<el-table-column prop="newPhone" label="新手机号" min-width="180" align="center"></el-table-column>
				<el-table-column prop="oldBankCode" label="原开户行编码" min-width="180" align="center"></el-table-column>
				<el-table-column prop="oldBankName" label="原开户行名称" min-width="180" align="center"></el-table-column>
				<el-table-column prop="oldBankCardNo" label="原银行卡号" min-width="180" align="center"></el-table-column>
				<el-table-column prop="oldBankPhone" label="原银行预留手机号" min-width="180" align="center"></el-table-column>
				<el-table-column prop="newBankCode" label="新开户行编码" min-width="180" align="center"></el-table-column>
				<el-table-column prop="newBankName" label="新开户行名称" min-width="180" align="center"></el-table-column>
				<el-table-column prop="newBankCardNo" label="新银行卡号" min-width="180" align="center"></el-table-column>
				<el-table-column prop="newBankPhone" label="银新预留手机号" min-width="180" align="center"></el-table-column>
				<el-table-column prop="applicationCastName" label="申请客服名称" min-width="180" align="center"></el-table-column>
				<el-table-column prop="applicationDate" label="申请日期" min-width="180" align="center"></el-table-column>
				<el-table-column prop="applicationDesc" label="申请备注" min-width="180" align="center" :formatter="shortFor" ></el-table-column>
				<el-table-column prop="noStatus" label="申请单状态" min-width="180" align="center"></el-table-column>
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

		<el-dialog title="信息变更申请登记单" :visible.sync="dialogVisible" :lock-scroll='true' :model="applyModel" width="48%"  @close="clearApplyForm('ruleForm')"	>
			<el-tabs type="border-card" @tab-click="initImg">
				<el-tab-pane label="登记单">
					<el-form class="small-space" :model="applyModel" :rules="rules" ref="ruleForm" label-position="right" label-width="150px" size="mini">
						<el-row>
							<el-col :span="12">
								<div class="grid-content bg-purple">
									<el-form-item label="变更号码类型:">
										<el-input v-model="applyModel.changeTypeval" :readonly='true'></el-input>
									</el-form-item>
								</div>
							</el-col>
							<el-col :span="12">
								<div class="grid-content bg-purple-light">
									<el-form-item label="进件号码:">
										<el-input v-model="applyModel.serialId" :readonly='true'></el-input>
									</el-form-item>

								</div>
							</el-col>
						</el-row>


						<el-row>
							<el-col :span="12">
								<div class="grid-content bg-purple">
									<el-form-item label="客户姓名:">
										<el-input v-model="applyModel.castName" :readonly='true'></el-input>
									</el-form-item>
								</div>
							</el-col>
							<el-col :span="12">
								<div class="grid-content bg-purple-light">
									<el-form-item label="身份证号:">
										<el-input v-model="applyModel.cardNo" :readonly='true'></el-input>
									</el-form-item>

								</div>
							</el-col>
						</el-row>




						<el-row>

							<div class="grid-content bg-purple">

								<el-form-item label="备注:">
									<el-input v-model="applyModel.applicationDesc" :readonly='true' type='textarea'></el-input>
								</el-form-item>
							</div>

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
									<el-col :span="12">
										<div class="grid-content bg-purple-light">

											<el-form-item label="原手机号码:">
												<el-input v-model="applyModel.oldPhone" :readonly='true'></el-input>
											</el-form-item>

										</div>
									</el-col>
									<el-col :span="12">
										<div class="grid-content bg-purple">

											<el-form-item label="新手机号码:">
												<el-input v-model="applyModel.newPhone" :readonly='true'></el-input>
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
									<el-col :span="12">
										<div class="grid-content bg-purple">
											<el-form-item label="原开户行名称:">
												<el-input v-model="applyModel.oldBankName" :readonly='true'></el-input>
											</el-form-item>
										</div>
									</el-col>
									<el-col :span="12">
										<div class="grid-content bg-purple">
											<el-form-item label="原账户账号:">
												<el-input v-model="applyModel.oldBankCardNo" :readonly='true'></el-input>
											</el-form-item>
										</div>
									</el-col>
								</el-row>
								<el-row>

									<el-col :span="12">
										<div class="grid-content bg-purple-light">

											<el-form-item label="原银行预留手机号码:">
												<el-input v-model="applyModel.oldBankPhone" :readonly='true'></el-input>
											</el-form-item>

										</div>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<div class="grid-content bg-purple">
											<el-form-item label="新开户行名称:">
												<el-input v-model="applyModel.newBankName" :readonly='true'></el-input>
											</el-form-item>
										</div>
									</el-col>
									<el-col :span="12">
										<div class="grid-content bg-purple">
											<el-form-item label="新账户账号:">
												<el-input v-model="applyModel.newBankCardNo" :readonly='true'></el-input>
											</el-form-item>
										</div>
									</el-col>
								</el-row>
								<el-row>

									<el-col :span="12">
										<div class="grid-content bg-purple-light">

											<el-form-item label="新预留手机号码:">
												<el-input v-model="applyModel.newBankPhone" :readonly='true'></el-input>
											</el-form-item>

										</div>
									</el-col>
								</el-row>
								  <el-row>
                			</el-row>
							</fieldset>
						</div>
						<div >
							<fieldset style="border-color: #fff;">
								<legend style="color: #409EFF;">审批意见:</legend>
									
									<el-form-item label="审批意见:" prop="approveOpinion">
										<el-select v-model="applyModel.approveOpinion" placeholder="请选择" style="width: 273px;">
											<el-option label="同意" value="0"></el-option>
											<el-option label="拒绝" value="1"></el-option>
										</el-select>
									</el-form-item>
									
									
									
									<div class="grid-content bg-purple">
										<el-form-item label="审批备注:" prop="approveDesc" >
											<el-input v-model="applyModel.approveDesc" type='textarea'></el-input>
										</el-form-item>
									</div>
								</fieldset>
						</div>
						
						
						
						
						<el-row>
							<div style="float: right;">
								<el-button @click="cancel">取消</el-button>
								<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
							</div>
						</el-row>

					</el-form>
				</el-tab-pane>
				<el-tab-pane label="查阅影像资料">
					
					
				<fieldset style="border-color: #fff;">
					<legend style="color: #409EFF;">身份证:</legend>
					<el-row>
					 
									<el-col :span="8" v-for="item in imgSrcModel.A1" :key="o" :offset="item > 0 ? 2 : 0">
										<el-card :body-style="{ padding: '0px' }">
											
											
											<img :src="item" width="200px" height="100px" @click="imgPreview(item)" />
											
											<div style="padding: 14px;">
											</div>
										</el-card>
									</el-col>
					</el-row>
					</fieldset>
					<fieldset style="border-color: #fff;">
					<legend style="color: #409EFF;">银行卡:</legend>
					<el-row>
						<el-col :span="4">
						</el-col>
									<el-col :span="8" v-for="item in imgSrcModel.B1" :key="o" :offset="item > 0 ? 2 : 0">
										<el-card :body-style="{ padding: '0px' }">
												<img :src="item" width="200px" height="100px" @click="imgPreview(item)" />
											<div style="padding: 14px;">
											</div>
										</el-card>
									</el-col>
					</el-row>
					</fieldset>
				</el-tab-pane>
			</el-tabs>
			</span>
		</el-dialog>
		<!--图片预览-->
		<el-dialog :visible.sync="previewScrVisible" size="tiny">
			<img width="100%" :src="previewScr" alt="">
		</el-dialog>
	</div>
</template>

<script>
	import { fetchData, createDataJson } from '@/apis/httpapis'
	import { formatApplicationDesc } from '@/utils/InfoFormat'
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
				applyModel: {
					id : '',
					applicationId : '',
					loanId : '',
					changeType : '',
					changeTypeval : '',
					oldPhone : '',
					newPhone : '',
					oldBankCode : '',
					oldBankName : '',
					oldBankCardNo : '',
					oldBankPhone : '',
					newBankCode : '',
					newBankName : '',
					newBankCardNo : '',
					newBankPhone : '',
					applicationCastId : '',
					applicationCastName : '',
					applicationDate : '',
					applicationDesc : '',
					approveId : '',
					approveName : '',
					approveDate : '',
					approveDesc : '',
					approveOpinion : '',
					noStatus : '',
					castName : '',
					cardNo : ''

				},
				imgSrcModel : {
					A1 : [],
					B1 : []
				},
				imgappliaction :{
					applicationId : ''
				},
				//图片预览路径
				previewScr : '',
				dialogVisible: false,
				previewScrVisible : false,
				multipleSelection: [],
				rules: {
					approveOpinion:[
					 { required: true, message: '请选择审批意见', trigger: 'change' }
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
				fetchData('/after/changeInfo/approvelist.do', this.listQuery).then(response => {
					console.log("response" +JSON.stringify(response));
					this.tableData = response.data.pageData
					this.total = response.data.recordCount
				})
			},
			handleSizeChange(val) {
				this.listQuery.pageSize = val
				this.getPager();
			},
			handleCurrentChange(val) {
				this.listQuery.page = val;
				this.getPager();
			},
			searchProductType() {
				this.getPager();
			},

			/**************** 工具栏调用 **********************/
			//清空搜索
			resetSearch(formName){
			this.$refs[formName].resetFields();	
				
				this.listQuery.loanId = '';
				this.listQuery.castName = '';
				this.listQuery.cardNo = '';
				this.listQuery.tel = '';				
			},
			
			/***************  formatter区域  ******************/
			computeTypeFunc(row, column, cellValue) {
				for(var i in this.computeType) {
					if(i == cellValue) {
						return this.computeType[i];
					}
				}
				return '';
			},
			earningInterestFunc(row, column, cellValue) {
				for(var i in this.earningInterest) {
					if(i == cellValue) {
						return this.earningInterest[i];
					}
				}
				return '';
			},
			/*********************  每行调用区域  ***********************/

			/***************  公共触发区  ******************/
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
						message: '警告,请选择审批数据!',
						type: 'warning'
					});
					return;					
				}else{
					this.applyModel = this.multipleSelection[0];
					this.dialogVisible = true;
				}
				
				

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
				
				        this.$confirm('是否确定提交审批结果?', '提示', {
					          confirmButtonText: '确定',
					          cancelButtonText: '取消',
					          type: 'warning'
					        }).then(() => {
					         	createDataJson('/after/changeInfo/approve.do', this.applyModel).then(response => {
									var result = response.data
									if(result.success) {
										this.$message({
											message: result.msg,
											type: 'success' //success/warning/info/error
										});
										this.getPager();
										this.dialogVisible = false;
									} else {
										this.$message({
											message: result.msg,
											type: 'warning',
										});
										this.dialogVisible = false
									}
				
								}) 
					        }).catch(() => {
					          this.$message({
					            type: 'info',
					            message: '已取消提交'
					          });          
					        });
			},
			
			//取消按钮
			cancel(){
				this.imgSrcModel.A1 = '';
				this.imgSrcModel.B1 = '';
				this.dialogVisible = false;
				this.applyModel.approveOpinion = '';
				this.applyModel.approveDesc = '';
				
				
				
			},
			clearApplyForm(formName){
				this.$refs[formName].resetFields();
			},
			
			//初始化印象资料
			initImg(){
				this.imgappliaction = this.multipleSelection[0];
				
				fetchData('/after/changeInfo/selectimageassortments.do', this.imgappliaction).then(response => {
						this.imgSrcModel = response.data.data;

				})
			},
			imgPreview(previewScr){
				this.previewScr = previewScr;
				this.previewScrVisible = true;
				
			},
		shortFor(row, column, cellValue) {
			if(typeof(cellValue) != "undefined") {
				return formatApplicationDesc(cellValue);
			}
		},			

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
		width: 680px;
		height: 30px;
	}
	
.el-upload-dragger{
    width:680px;
    height: 30px;
  }
  .infochange-approve-style .el-table th {
		background-color: #409EFF;
		color:#ffffff;
	}
	.infochange-approve-style .el-table--border th{
		    border-right: 1px solid #c0c4cc;
	}
	 .infochange-approve-style .el-input__inner{
		    border: 1px solid #409EFF;
	}
</style>