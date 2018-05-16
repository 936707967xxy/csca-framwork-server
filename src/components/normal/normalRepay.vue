<!--
	作者：liuzhiwen
	时间：2017-12-19
	描述：正常还款客户列表
-->
<template>
	<div id="normal-type-box" class="money-daihou-style">
		<div class="crumbs hander-class">
			<el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>贷后管理</el-breadcrumb-item>
				<el-breadcrumb-item>正常客户列表</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="handle-box hander-class">
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
					<el-input v-model="listQuery.cardNo" placeholder="身份证号" size="small"></el-input>
				</el-form-item>
				<el-form-item label="手机号码:" prop="tel" >
					<el-input v-model="listQuery.tel" placeholder="手机号" size="small"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" @click="searchProductType" size="small">查询</el-button>
					<el-button type="primary" @click="resetSearch('listQuery')" size="small">重置 </el-button>
				</el-form-item>
				<div>
					<el-form-item>
						<el-button type="success" @click="monthDeduct" size="small" v-if="checkPermiss('normal_single_deduct')">发起单笔划扣</el-button>
						<el-button type="success" @click="totalDeduct" size="small" v-if="checkPermiss('normal_qh_deduct')">提前结清划扣</el-button>
						<el-button type="warning" @click="saveComonmonthDeduct" size="small" v-if="checkPermiss('normal_dbcg_deduct')">发起单笔存公</el-button>
						<el-button type="warning" @click="saveComontotalDeduct" size="small" v-if="checkPermiss('normal_qhcg_deduct')">提前结清存公</el-button>
						<el-button type="primary" @click="normalRepaymentRecord" size="small" v-if="checkPermiss('normal_hkjl_deduct')">客户还款记录</el-button>
                        <el-button type="warning" @click="successHuaKou" icon="el-icon-time" size="small" v-if="checkPermiss('fy_success')" >月还富友成功</el-button>
						<el-button type="warning" @click="successCunGong" icon="el-icon-time" size="small" v-if="checkPermiss('sp_success')" >月还存公成功</el-button>
						<el-button type="warning" @click="successHuaKouAll" size="small" v-if="checkPermiss('fy_total_success')"  >结清富友成功</el-button>
						<el-button type="warning" @click="successCunGongAll" size="small" v-if="checkPermiss('sp_total_success')"  >结清存公成功</el-button>
						<el-button type="success" @click="custImages" size="small" v-if="checkPermiss('view_imgInfo')" >查看影像资料</el-button>
						<el-button type="info" @click="downLoadExcel" size="small" icon="el-icon-download" v-if="checkPermiss('download_excel_model')" >下载模板</el-button>

						<el-button type="info" @click="downUserInfoExcel" icon="el-icon-download" size="small" v-if="checkPermiss('standingbook_exp')" >台账导出</el-button>

						<el-button type="danger" @click="repayRemid" icon="el-icon-download" size="small" v-if="checkPermiss('repay_remid')" >还款短信提醒</el-button> &nbsp;&nbsp;
						<div style="float: right;">
						<el-upload
						  action="/after/nomal/batchNomalDeduct.do"
						  Content-Type="multipart/form-data;boundary=----WebKitFormBoundarybbVGmBFrBjkoTcMq;charset=UTF-8"
						  :on-change="handleChange"
						  :on-error="excelhandleError"
						  :on-success="excelhandleSuccess"
						  accept=".xls"
						  :limit="1"
						  >
						  <el-button size="small"   type="success" icon="el-icon-upload2" v-if="checkPermiss('batch_deduct_upload')">客户还款批量确认</el-button>
						</el-upload>
						</div>
					</el-form-item>
				</div>
			</el-form>
		</div>

		<!--
        	描述：弹出框
        -->
		<div>
    	<el-dialog title="请选择要导出的账单日" :visible.sync="dialogTableVisible" width="30%">
	      	<div align="center">
				<el-checkbox-group v-model="listQuery.checkList">
			    <el-checkbox label="第5日"></el-checkbox>
			    <el-checkbox label="第15日"></el-checkbox>
			    <el-checkbox label="第22日"></el-checkbox>
			    <el-checkbox label="第30日"></el-checkbox>
			    </el-checkbox-group>
			<div>
				<div style="margin-top: 5%;">
					<el-button type="success" @click="downBillDayExcel" size="small">确认导出</el-button>
				</div>
				</div>
			</div>
			<div style="margin-top: 50px;"></div>
        </el-dialog>
        </div>

		<!-- 列表 -->
		<el-row>
			<el-table :data="tableData" :stripe="true" border style="width: 100%" cell-class-name="cell-class" @selection-change="selchage" height="563" size="medium">
				<el-table-column type="selection"></el-table-column>
				<el-table-column prop="serialId" label="进件编号" align="center" min-width="270"></el-table-column>
				<el-table-column prop="conNo" label="合同编号" align="center" min-width="270" fixed ></el-table-column>
				<el-table-column prop="castName" label="客户姓名" align="center" min-width="90" fixed ></el-table-column>
				<el-table-column prop="cardNo" label="身份证号码" align="center" min-width="170" :formatter="idCardFor"></el-table-column>
				<el-table-column prop="tel" label="联系电话" align="center" min-width="120" :formatter="phoneFor" ></el-table-column>
				<el-table-column prop="bank" label="客户银行名称" align="center" min-width="120"></el-table-column>
				<el-table-column prop="bankAccount" label="客户银行账号" align="center" min-width="200"></el-table-column>
				<el-table-column prop="productName" label="产品类型" align="center" min-width="200"></el-table-column>
				<el-table-column prop="loanPeriod" label="期数" align="center"  min-width="100"></el-table-column>
				<el-table-column prop="currentPeriod" label="当前期次" align="center" min-width="90"></el-table-column>
				<el-table-column prop="surplusPeriod" label="剩余期数" align="center" min-width="90"></el-table-column>
				<el-table-column prop="loanMoney" label="放款金额" align="center" min-width="100"></el-table-column>
				<el-table-column prop="loanDate" label="放款日期" align="center" min-width="200" :formatter="dateFor"></el-table-column>
				<el-table-column prop="contractAccount" label="合同金额" align="center" min-width="100"></el-table-column>
				<el-table-column prop="amt" label="月还款额" align="center" min-width="90"></el-table-column>
				<el-table-column prop="bal" label="账户余额" align="center" min-width="90"></el-table-column>
				<el-table-column prop="advanceShould" label="提前还款应还总额" align="center" min-width="180"></el-table-column>
				<el-table-column prop="replaymentDate" label="应还款日期" align="center" min-width="200" :formatter="dateFor"></el-table-column>
				<el-table-column prop="reviceCast" label="签约客服" align="center" min-width="100"></el-table-column>
				<el-table-column prop="castLeader" label="客户经理" align="center" min-width="90"></el-table-column>
			</el-table>
		</el-row>

		<el-row style="margin-top:20px;">
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="1"
					:page-sizes="[30, 60, 90]"
					:page-size="2" layout="total, sizes, prev,pager, next, jumper"
					:total="total">
					</el-pagination>
				</div>
			</el-col>
		</el-row>

		<!--划扣进度条-->
		<el-dialog title="正在划扣中" :visible.sync="dialogVisible" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false" width="30%" center>
			<div class="msg-class">
				<span class="font-class">窗口自动关闭前请勿进行其它操作！！！</span>
			</div>
			<div style='' class="msg-class">
				<img src="../../assets/image/load.gif" />
			</div>
		</el-dialog>

		<!-- 存公表单  -->
		<el-dialog :title="this.titleSP" :visible.sync="scdialogVisible"  width="65%" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false" center >
		<fieldset style="border-color: #fff;">
			<legend style="color: #409EFF;">客户基本信息:</legend>
				<el-form class="small-space" label-position="right"  label-width="150px" size="mini">
					<el-row>
						<el-col :span="8">
							<el-form-item label="进件编号：" >
								{{this.normalModel.serialId}}
						</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="客户姓名：" >
								{{this.normalModel.castName}}
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="身份证号码：" >
								{{this.normalModel.cardNo}}
						</el-form-item>
						</el-col>
					</el-row>
					<div v-if="saveComonMonthModel.paymentType === '0'" >
						<el-row>
							<el-col :span="10">
								<el-form-item label="还款日期：" >
									{{this.normalModel.replaymentDate}}
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="本期应还总金额：" >
									{{this.normalModel.amt}}
							</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="账户余额：" >
									{{this.normalModel.bal}}
								</el-form-item>
							</el-col>
							</el-row>
							<el-row>
							<el-col :span="5">
								<el-form-item label="当前期次：" >
									{{this.normalModel.currentPeriod}}
							</el-form-item>
							</el-col>
						</el-row>
					</div>
					<div v-else-if="saveComonMonthModel.paymentType === '1'" >
						<el-row>
							<el-col :span="4">
								<el-form-item label="结清总金额：" >
									{{this.normalModel.advanceShould}}
							</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item label="账户余额：" >
									{{this.normalModel.bal}}
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="当前期次：" >
									{{this.normalModel.currentPeriod}}
							</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-form>
		</fieldset>
		<fieldset style="border-color: #fff;">
			<legend style="color: #409EFF;">存公回执单信息:</legend>
			<el-form class="small-space" :model="saveComonMonthModel" ref="saveComonMonthForm" :rules="SCMrules" label-position="right" label-width="150px" size="mini">
				<el-row>
					<el-col :span="10">
						<el-form-item label="转入公户账户：" prop="corporateAccount">
					    <el-select v-model="saveComonMonthModel.corporateAccount" placeholder="请选择转入公户" >
									<el-option label="招商银行" value="129905992710707"></el-option>
									<el-option label="恒丰银行" value="857110010122837199"></el-option>
					    </el-select>
					  </el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="流水号：" prop="refnbr" >
						    <el-input v-model="saveComonMonthModel.refnbr"></el-input>
						 </el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="10">
						<el-form-item label="付方帐号：" prop="rpyacc">
						    <el-input v-model="saveComonMonthModel.rpyacc"></el-input>
						 </el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="付方开户行名：" prop="rpybnk">
						    <el-input v-model="saveComonMonthModel.rpybnk"></el-input>
						 </el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="10">
						<el-form-item label="付方开户行地址：" prop="rpyadr">
						    <el-input v-model="saveComonMonthModel.rpyadr"></el-input>
						 </el-form-item>
					</el-col>
					<!--<el-col :span="10">
						<el-form-item label="摘要：" prop="naryur">
						    <el-input v-model="saveComonMonthModel.naryur" type="textarea"></el-input>
						 </el-form-item>
					</el-col>		-->
					<el-col :span="10">
					<el-form-item label="转入时间：" prop="etytim">
						<el-date-picker type="datetime" placeholder="选择时间" :editable="false" style="cursor: pointer;" v-model="saveComonMonthModel.etytim"  size="mini"></el-date-picker>
					</el-form-item>
				</el-col>
				</el-row>
				<el-row>
					<el-col :span="10">
				      <el-form-item label="存公期数：" >
						    <el-input  v-model="saveComonMonthModel.ductStream" :readonly="true" ></el-input>
				      </el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="存公金额：" prop="ductMoney">
						    <el-input v-model="saveComonMonthModel.ductMoney" ></el-input>
						 </el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="10">
				      <el-form-item label="付方姓名：" prop="rrCustname">
						    <el-input  v-model="saveComonMonthModel.rrCustname" ></el-input>
				      </el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="付方身份证号：" prop="rrIdcard">
						    <el-input v-model="saveComonMonthModel.rrIdcard" ></el-input>
						 </el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="20">
						<el-form-item label="摘要：" prop="naryur">
						    <el-input v-model="saveComonMonthModel.naryur" type="textarea"></el-input>
						 </el-form-item>
					</el-col>
					</el-row>
					<el-row>
					<el-col :span="10">
					<el-form-item label="存公凭证:">
						<el-upload
							ref="upImg"
						  action="/after/changeInfo/upload.do"
						  :data="imgModel"
						  list-type="picture-card"
						  accept=".gif,.png,.jpg,.jpeg,.bmp"
						  :on-preview="handlePictureCardPreview"
						  :on-success="handleSuccess"
						  :on-remove="handleRemove"
						  :on-error="handleError" multiple
						  >
						   <i class="el-icon-plus"></i>
						</el-upload>
					</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<div style="float: right;margin-bottom: 12px;margin-right: 100px;">
						<!--
							作者：zhiwenliu
							时间：2018-01-10
							描述：除清除表单外，还需清除影像资料model
						-->
						<el-button @click="clearSPForm('saveComonMonthForm')" size="mini">取消</el-button>
						<el-button type="primary" @click="submitAddSPM('saveComonMonthForm')" size="mini" >提交</el-button>
					</div>
				</el-row>
			</el-form>
		</fieldset>

		</el-dialog>
		<!--图片预览-->
		<el-dialog :visible.sync="imgdialogVisible" size="tiny">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>


    <!--客户还款记录 -->
		<el-dialog title="客户还款记录" :visible.sync="RepaydialogVisible"  width="60%" center>
		<el-row>
			<div style="margin: 0px 0px 20px 20px;">
				<span style="font-size: 16px; font-style: inherit;" >客户姓名：{{this.normalModel.castName}}</span>
				<span style="font-size: 16px; font-style: inherit;padding-left: 30px;">身份证号： {{this.normalModel.cardNo}}</span>
			</div>
				<el-table :data="loanBookData" :stripe="true" border style="width: 100%" header-cell-class-name="header-cell-class" cell-class-name="cell-class"  size="medium" height="683">
					<el-table-column prop="receiveRepayDate" label="应还款日期" min-width="170"></el-table-column>
					<el-table-column prop="repayDate" label="还款期次" align="center" width="min-width"></el-table-column>
					<el-table-column prop="receiveCorpus" label="应还本金" align="center" min-width="170"></el-table-column>
					<el-table-column prop="receiveInterest" label="应还利息" align="center" min-width="170"></el-table-column>
					<el-table-column prop="overplusCorpus" label="剩余本金" align="center" min-width="170"></el-table-column>
					<el-table-column prop="repayTypeVal" label="还款类型" align="center" min-width="170"></el-table-column>
					<el-table-column prop="actualMoney" label="应还金额" align="center" min-width="170"></el-table-column>
					<el-table-column prop="deductMoney" label="减免金额" align="center" min-width="170"></el-table-column>
					<el-table-column prop="overdueInterest" label="逾期应还罚息" align="center" min-width="170"></el-table-column>
					<el-table-column prop="overduePenalty" label="逾期应还违约金" align="center" min-width="170"></el-table-column>
					<el-table-column prop="overdueActualMoney" label="实还金额" align="center" min-width="170"></el-table-column>
					<el-table-column prop="overdueDays" label="逾期天数" align="center" min-width="170"></el-table-column>
					<el-table-column prop="createDate" label="交易日期" align="center" min-width="170"></el-table-column>
				</el-table>
		</el-row>
		</el-dialog>
		<el-dialog title="客户影像资料" :visible.sync="custImagesdialogVisible"  width="60%" center>
			<fieldset style="border-color: #fff;">
				<legend style="color: #409EFF;">客户影像分类:</legend>
				<el-row>
					<el-select v-model="selectedCustType" filterable placeholder="请选择" size="small" @change="changeImages" style="width:300px;">
						 <el-option
					      v-for="item in custTypeData"
					      :key="item.imageUploadId"
					      :label="item.itemName"
					      :value="item.imageUploadId">
					    </el-option>
				  </el-select>
				</el-row>
				<el-row style="margin-bottom: 10px;"></el-row>
			</fieldset>

			<fieldset style="border-color: #fff;">
				<legend style="color: #409EFF;">影像:</legend>
				<el-row>
					<template>
					  <el-carousel indicator-position="outside">
					    <el-carousel-item v-for="item in custImagesInfo" :key="item">
					    	<h3><img :src="item" width="100%" height="500"  @click="custImgPreview(item)" /></h3>
					    </el-carousel-item>
					  </el-carousel>
					</template>
				</el-row>
			</fieldset>
		</el-dialog>
		<!--图片预览-->
		<el-dialog :visible.sync="previewScrVisible" size="tiny">
			<img width="100%" :src="previewScr" alt="">
		</el-dialog>
		<!--
			月还划扣信息框
        -->
		<el-dialog title="月还划扣详细信息" :visible.sync="monthDeductVisible" size="tiny" center >
			<el-form class="small-space" label-position="right" label-width="150px" size="mini" :model="normalModel" ref="monthDeductForm" >
				<el-tabs type="border-card">
					<el-tab-pane label="详细信息">
						<el-row>
							<el-col :span="10">
								<el-form-item label="进件编号:">
									<el-input v-model="normalModel.serialId" :readonly='true'></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="10">
								<el-form-item label="客户姓名:">
									<el-input v-model="normalModel.castName" :readonly='true'></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="10">
								<el-form-item label="身份证号:">
									<el-input v-model="normalModel.cardNo" :readonly='true'></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="10">
								<el-form-item label="电话号码:">
									<el-input v-model="normalModel.tel" :readonly='true'></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="10">
								<el-form-item label="产品名称:">
									<el-input v-model="normalModel.productName" :readonly='true'></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="10">
								<el-form-item label="贷款期数:">
									<el-input v-model="normalModel.loanPeriod" :readonly='true'></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="10">
								<el-form-item label="签约金额:">
									<el-input v-model="normalModel.contractAccount" :readonly='true'></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="10">
								<el-form-item label="剩余本金:">
									<el-input v-model="normalModel.surplusPrincipal" :readonly='true'></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="10">
								<el-form-item label="当前期次:">
									<el-input v-model="normalModel.currentPeriod" :readonly='true'></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="10">
								<el-form-item label="应还款日期:">
									<el-input v-model="normalModel.replaymentDate" :readonly='true'></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="10">
								<el-form-item label="月还金额:">
									<el-input v-model="normalModel.amt" :readonly='true'></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="10">
								<el-form-item label="账户余额:">
									<el-input v-model="normalModel.bal" :readonly='true'></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					<el-row>
						<el-col :span="20" style="padding-top: 10px;">
								<div style="float: right;">
									<el-button @click="monthDeductVisible=false" size="mini" >取 消</el-button>
									<el-button type="primary" @click="monthDeduct1" size="mini" >提交</el-button>
								</div>
						</el-col>
					</el-row>
					</el-tab-pane>
					</el-tabs>
			</el-form>
		</el-dialog>
		<!--
			结清划扣对话框
        -->
        <el-dialog title="结清划扣详细信息" :visible.sync="totalDeductVisible" size="tiny" center  >
			<el-form class="small-space" label-position="right" label-width="150px" size="mini" :model="normalModel" ref="totalDeductForm" >
				<el-tabs type="border-card">
					<el-tab-pane label="详细信息">
						<el-row>
							<el-col :span="10">
								<el-form-item label="进件编号:">
									<el-input v-model="normalModel.serialId" :readonly='true'></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="10">
								<el-form-item label="客户姓名:">
									<el-input v-model="normalModel.castName" :readonly='true'></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="10">
								<el-form-item label="身份证号:">
									<el-input v-model="normalModel.cardNo" :readonly='true'></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="10">
								<el-form-item label="电话号码:">
									<el-input v-model="normalModel.tel" :readonly='true'></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="10">
								<el-form-item label="产品名称:">
									<el-input v-model="normalModel.productName" :readonly='true'></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="10">
								<el-form-item label="贷款期数:">
									<el-input v-model="normalModel.loanPeriod" :readonly='true'></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="10">
								<el-form-item label="签约金额:">
									<el-input v-model="normalModel.contractAccount" :readonly='true'></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="10">
								<el-form-item label="剩余本金:">
									<el-input v-model="normalModel.surplusPrincipal" :readonly='true'></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="10">
								<el-form-item label="当前期次:">
									<el-input v-model="normalModel.currentPeriod" :readonly='true'></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="10">
								<el-form-item label="提前结清应还总额:">
									<el-input v-model="normalModel.advanceShould" :readonly='true'></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="10">
								<el-form-item label="账户余额:">
									<el-input v-model="normalModel.bal" :readonly='true'></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					<el-row>
						<el-col :span="20" style="padding-top: 10px;">
								<div style="float: right;">
									<el-button @click="totalDeductVisible=false" size="mini" >取 消</el-button>
									<el-button type="primary" @click="totalDeduct1" size="mini" >提交</el-button>
								</div>
						</el-col>
					</el-row>
					</el-tab-pane>
					</el-tabs>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import {
  fetchData,
  createDataJson,
  getRequest,
  findById
} from "@/apis/httpapis";
import { formatDate } from "@/utils/date";
import axios from "axios";
import { formatIdCard, formatPhone } from "@/utils/InfoFormat.js";
export default {
  name: "ProductType1",
  data() {
    return {
      tableData: [],
      loanBookData: [],
      custTypeData: [],
      custImagesInfo: [],
      selectedCustType: "",
      previewScrVisible: false,
      dialogTableVisible: false,

      previewScr: "",
      total: 0,
      listQuery: {
        page: 1,
        pageSize: 30,
        serialId: "",
        conNo: "",
        castName: "",
        cardNo: "",
        tel: "",
        checkList: []
      },
      //列表Model
      normalModel: {
        id: "",
        loanId: "",
        castName: "",
        tel: "",
        cardNo: "",
        sex: "",
        bank: "",
        bankPhone: "",
        bankAccount: "",
        bankCode: "",
        posType: "",
        castSource: "",
        productId: "",
        productName: "",
        contractAccount: "",
        loanMoney: "",
        loanDate: "",
        amt: "",
        startTime: "",
        endTime: "",
        loanPeriod: "",
        currentPeriod: "",
        surplusPeriod: "",
        surplusPrincipal: "",
        replaymentDate: "",
        statementDate: "",
        bigArea: "",
        department: "",
        salesDeptment: "",
        teamLeader: "",
        castLeader: "",
        businessDepartment: "",
        reviceCast: "",
        managerCast: "",
        managerCastId: "",
        publicAccountFour: "",
        settleFlag: "",
        delayFlag: "",
        shouldCapi: "",
        shouldInte: "",
        bal: "",
        advanceShould: "",
        hangUp: "",
        hangUpDate: "",
        hangUpStream: "",
        bybySubMoney: "",
        bybyDate: "",
        serialId: "",
        conNo: ""
      },
      //存公
      saveComonMonthModel: {
        id: "",
        refnbr: "",
        rpyacc: "",
        rpybnk: "",
        rpyadr: "",
        naryur: "",
        etytim: "",
        corporateAccount: "",
        loanId: "",
        paymentType: "",
        operatorId: "",
        operatorName: "",
        creatDate: "",
        checkState: "",
        ductStream: "",
        ductMoney: "",
        rrCustname: "",
        rrIdcard: "",
        imgId: "",
        rrCustname: "",
        rrIdcard: "",
        imgId: ""
      },
      //存公影像资料
      imgModel: {
        applyTypeIdVal: "D1",
        applicationId1: ""
      },
      //存公表单标题
      titleSP: "",
      //删除影像
      delImgModel: {
        applyId: "",
        Id: "",
        diskUrl: ""
      },
      //结算核查
      checkSPloanId: {
        loanId: ""
      },
      statementDateModel: {
        statementDate: ""
      },
      dialogVisible: false,
      scdialogVisible: false,
      RepaydialogVisible: false,
      imgdialogVisible: false,
      monthDeductVisible: false,
      totalDeductVisible: false,
      dialogImageUrl: "",
      setIntervalId: "",
      multipleSelection: [],
      batchDeduct: [],
      custImagesdialogVisible: false,
      //存公测试
      SCMrules: {
        //转入公户账户
        corporateAccount: [
          { required: true, message: "请选择转入公户", trigger: "change" }
        ],
        //流水号
        refnbr: [{ required: true, message: "请输入流水号", trigger: "blur" }],
        //付方帐号
        rpyacc: [
          { required: true, message: "请输入付方账号", trigger: "blur" }
        ],
        //付方开户行名
        rpybnk: [
          { required: true, message: "请输入付方开户行姓名", trigger: "blur" }
        ],
        //付方开户行地址
        //					rpyadr : [
        //					{ required: true, message: '请输入付方开户行地址', trigger: 'blur' },
        //					],
        //摘要
        naryur: [{ required: true, message: "请输入摘要", trigger: "blur" }],
        //交易时间（精确到小时）
        etytim: [
          { required: true, message: "请选择交易时间", trigger: "blur" }
        ],
        //存公金额
        ductMoney: [
          { required: true, message: "请输入转入金额", trigger: "blur" },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "金额输入有误",
            trigger: "blur"
          }
        ],
        //付方姓名
        rrCustname: [
          { required: true, message: "请输入账户姓名", trigger: "blur" }
        ]
        //付方身份证号
        //					rrIdcard : [
        //					{ required: true, message: '请输入付方身份证号码', trigger: 'blur' },
        //					]
      }
    };
  },
  created() {
    this.getPager();
  },
  methods: {
    /****************   分页及查询相关   ********************/
    getPager() {
      fetchData("/after/nomal/nomalList.do", this.listQuery).then(response => {
        this.tableData = response.data.pageData;
        this.total = response.data.recordCount;
      });
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
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
    resetSearch(formName) {
      this.$refs[formName].resetFields();
      //				this.listQuery.loanId = '';
      //				this.listQuery.castName = '';
      //				this.listQuery.cardNo = '';
      //				this.listQuery.tel = '';
    },

    /***************  formatter区域  ******************/
    /*********日期格式化**************/
    dateFor(row, column, cellValue) {
      if (typeof cellValue != "undefined") {
        return formatDate(new Date(cellValue), "yyyy-MM-dd hh:mm:ss");
      }
    },
    /***************  公共触发区  ******************/
    selchage(selection) {
      if (selection.length > 0) {
        this.multipleSelection = selection;
        this.normalModel = this.multipleSelection[0];
      }
    },

    checkPermiss(cpt) {
      return this.checkAction(cpt);
    },
    //正常还款划扣

    monthDeduct() {
      //必须选择数据
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "警告,请选择数据!",
          type: "warning"
        });
        return;
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          message: "警告,只允许单笔划扣!",
          type: "warning"
        });
        return;
      } else {
        //显示客户信息
        //this.normalModel = this.multipleSelection[0];
        this.monthDeductVisible = true;
      }
    },
    monthDeduct1() {
      //月还划扣
      var deductMoney = (this.normalModel.amt - this.normalModel.bal).toFixed(2);
      //弹框提示
      this.$confirm(
        "减去账户余额，实际划扣" + deductMoney + "元, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          //选择确定，显示进度条，同时请求后台
          this.dialogVisible = true;
          createDataJson(
            "/after/nomal/nomalDeduct.do",
            this.multipleSelection[0]
          ).then(response => {
            var result = response.data;
            if (result.success) {
              //请求完成，隐藏进度条，刷新界面
              this.dialogVisible = false;
              this.$message({
                message: result.msg,
                type: "success", //success/warning/info/error
                duration: 7000
              });
              this.multipleSelection = [];
              this.monthDeductVisible = false;
              this.getPager();
            } else {
              this.$message({
                message: result.msg,
                type: "warning",
                duration: 7000
              });
              this.dialogVisible = false;
              //this.multipleSelection = [];
              //this.monthDeductVisible = false;
              //this.getPager();
            }
          });

          this.$message({
            type: "success",
            message: "发起划扣!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消划扣！"
          });
        });
    },

    //一次性结清划扣
    totalDeduct() {
      //必须选择数据
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "警告,请选择数据!",
          type: "warning"
        });
        return;
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          message: "警告,只允许单笔划扣!",
          type: "warning"
        });
        return;
      } else {
        //this.normalModel = this.multipleSelection[0];
        this.totalDeductVisible = true;
      }
    },

    totalDeduct1() {
      //划扣
      //弹框提示
      var totalDeductMoney = (
        this.normalModel.advanceShould - this.normalModel.bal
      ).toFixed(2);

      this.$confirm(
        "减去账户余额，本次结清实际划扣" + totalDeductMoney + "元, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          //选择确定，显示进度条，同时请求后台
          this.dialogVisible = true;
          createDataJson(
            "/after/early/earlyRepayApply.do",
            this.multipleSelection[0]
          ).then(response => {
            var result = response.data;
            if (result.success) {
              //请求完成，隐藏进度条，刷新界面
              this.dialogVisible = false;
              this.$message({
                message: result.msg,
                type: "success", //success/warning/info/error
                duration: 7000
              });
              this.multipleSelection = [];
              this.totalDeductVisible = false;
              this.getPager();
            } else {
              this.$message({
                message: result.msg,
                type: "warning",
                duration: 7000
              });
              this.dialogVisible = false;
              //this.multipleSelection = [];
              //this.getPager();
            }
          });

          this.$message({
            type: "success",
            message: "发起认定!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消划扣！"
          });
        });
    },
    //月还存公
    saveComonmonthDeduct() {
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "警告,请选择数据!",
          type: "warning"
        });
        return;
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          message: "警告,只支持单数据!",
          type: "warning"
        });
        return;
      } else {
        //还款期次
        this.saveComonMonthModel.ductStream = this.multipleSelection[0].currentPeriod;
        //设置存公标识（正常月还）
        this.saveComonMonthModel.paymentType = "0";
        //设置表单标题
        this.titleSP = "月还存公";
        this.scdialogVisible = true;
      }
    },
    //总还存公
    saveComontotalDeduct() {
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "警告,请选择数据!",
          type: "warning"
        });
        return;
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          message: "警告,只支持单数据!",
          type: "warning"
        });
        return;
      } else {
        this.saveComonMonthModel.ductStream = this.multipleSelection[0].currentPeriod;
        //设置存公标识（正常月还）
        this.saveComonMonthModel.paymentType = "1";
        this.titleSP = "结清存公";
        this.scdialogVisible = true;
      }
    },

    //存公表单提交表单
    submitAddSPM(formName) {
      this.saveComonMonthModel.loanId = this.multipleSelection[0].loanId;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitAddSPM1();
        } else {
          return false;
        }
      });
    },

    //存公提交
    submitAddSPM1() {
      createDataJson(
        "/after/savePublic/savePublic.do",
        this.saveComonMonthModel
      ).then(response => {
        var result = response.data;
        if (result.success) {
          this.$message({
            message: result.msg,
            type: "success" //success/warning/info/error
          });

          this.cancel();
          this.$refs["saveComonMonthForm"].resetFields();
          this.$refs["upImg"].clearFiles();
          this.getPager();
          this.scdialogVisible = false;
        } else {
          this.$message({
            message: result.msg,
            type: "warning"
          });
          //this.getPager();
          //this.dialogVisible = false
        }
      });
    },

    //清除表单
    cancel() {
      //清空数据
      this.scdialogVisible = false;
    },

    clearSPForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs["upImg"].clearFiles();

      this.imgModel.applicationId1 = "";
      this.scdialogVisible = false;
    },

    //富友还款
    successHuaKou() {
      //必须选择数据
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "警告,请选择数据!",
          type: "warning"
        });
        return;
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          message: "警告,只允许单笔划扣!",
          type: "warning"
        });
        return;
      } else {
        this.checkSPloanId.loanId = this.multipleSelection[0].loanId;

        fetchData("/after/backDoor/choiceSuccess.do", this.checkSPloanId).then(
          response => {
            var result = response.data;
            if (result.success) {
              //弹框提示
              this.$confirm(
                "请确保客户账期、天数、金额等信息准确无误，确定操作后将移除当前状态, 是否继续?",
                "提示",
                {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                }
              )
                .then(() => {
                  //选择确定，显示进度条，同时请求后台
                  this.dialogVisible = true;
                  fetchData(
                    "/after/backDoor/successHuaKou.do",
                    this.checkSPloanId
                  ).then(response => {
                    var result = response.data;
                    if (result.success) {
                      //请求完成，隐藏进度条，刷新界面
                      this.dialogVisible = false;
                      this.$message({
                        message: result.msg,
                        type: "success", //success/warning/info/error
                        duration: 7000
                      });
                      this.multipleSelection = [];
                      this.getPager();
                    } else {
                      this.$message({
                        message: result.msg,
                        type: "warning",
                        duration: 7000
                      });
                      this.dialogVisible = false;
                      this.multipleSelection = [];
                      this.getPager();
                    }
                  });
                  this.$message({
                    type: "success",
                    message: "发起划扣!"
                  });
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "取消划扣！"
                  });
                });
            } else {
              this.$message({
                message: result.msg,
                type: "warning"
              });
              return;
            }
          }
        );
      }
    },

    //客户存公
    successCunGong() {
      //必须选择数据
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "警告,请选择数据!",
          type: "warning"
        });
        return;
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          message: "警告,只允许单笔划扣!",
          type: "warning"
        });
        return;
      } else {
        this.checkSPloanId.loanId = this.multipleSelection[0].loanId;

        fetchData("/after/backDoor/choiceSuccess.do", this.checkSPloanId).then(
          response => {
            var result = response.data;
            if (result.success) {
              //弹框提示
              this.$confirm(
                "请确保客户账期、天数、金额等信息准确无误，确定操作后将移除当前状态, 是否继续?",
                "提示",
                {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                }
              )
                .then(() => {
                  //选择确定，显示进度条，同时请求后台
                  this.dialogVisible = true;
                  fetchData(
                    "/after/backDoor/successCunGong.do",
                    this.checkSPloanId
                  ).then(response => {
                    var result = response.data;
                    if (result.success) {
                      //请求完成，隐藏进度条，刷新界面
                      this.dialogVisible = false;
                      this.$message({
                        message: result.msg,
                        type: "success", //success/warning/info/error
                        duration: 7000
                      });
                      this.multipleSelection = [];
                      this.getPager();
                    } else {
                      this.$message({
                        message: result.msg,
                        type: "warning",
                        duration: 7000
                      });
                      this.dialogVisible = false;
                      this.multipleSelection = [];
                      this.getPager();
                    }
                  });
                  this.$message({
                    type: "success",
                    message: "发起划扣!"
                  });
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "取消划扣！"
                  });
                });
            } else {
              this.$message({
                message: "警告,该用户账单日未到不能进行此操作!",
                type: "warning"
              });
              return;
            }
          }
        );
      }
    },

    //富友还款
    successHuaKouAll() {
      //必须选择数据
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "警告,请选择数据!",
          type: "warning"
        });
        return;
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          message: "警告,只允许单笔划扣!",
          type: "warning"
        });
        return;
      } else {
        this.checkSPloanId.loanId = this.multipleSelection[0].loanId;

        //弹框提示
        this.$confirm(
          "请确保客户账期、天数、金额等信息准确无误，确定操作后将移除当前状态, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            //选择确定，显示进度条，同时请求后台
            this.dialogVisible = true;
            fetchData(
              "/after/backDoor/successHuaKouAll.do",
              this.checkSPloanId
            ).then(response => {
              var result = response.data;
              if (result.success) {
                //请求完成，隐藏进度条，刷新界面
                this.dialogVisible = false;
                this.$message({
                  message: result.msg,
                  type: "success", //success/warning/info/error
                  duration: 7000
                });
                this.multipleSelection = [];
                this.getPager();
              } else {
                this.$message({
                  message: result.msg,
                  type: "warning",
                  duration: 7000
                });
                this.dialogVisible = false;
                this.multipleSelection = [];
                this.getPager();
              }
            });
            this.$message({
              type: "success",
              message: "发起划扣!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消划扣！"
            });
          });
      }
    },

    //客户存公
    successCunGongAll() {
      //必须选择数据
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "警告,请选择数据!",
          type: "warning"
        });
        return;
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          message: "警告,只允许单笔划扣!",
          type: "warning"
        });
        return;
      } else {
        this.checkSPloanId.loanId = this.multipleSelection[0].loanId;
        //弹框提示
        this.$confirm(
          "请确保客户账期、天数、金额等信息准确无误，确定操作后将移除当前状态, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            //选择确定，显示进度条，同时请求后台
            this.dialogVisible = true;
            fetchData(
              "/after/backDoor/successCunGongAll.do",
              this.checkSPloanId
            ).then(response => {
              var result = response.data;
              if (result.success) {
                //请求完成，隐藏进度条，刷新界面
                this.dialogVisible = false;
                this.$message({
                  message: result.msg,
                  type: "success", //success/warning/info/error
                  duration: 7000
                });
                this.multipleSelection = [];
                this.getPager();
              } else {
                this.$message({
                  message: result.msg,
                  type: "warning",
                  duration: 7000
                });
                this.dialogVisible = false;
                this.multipleSelection = [];
                this.getPager();
              }
            });
            this.$message({
              type: "success",
              message: "发起划扣!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消划扣！"
            });
          });
      }
    },

    //还款记录
    normalRepaymentRecord() {
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "警告,请选择数据!",
          type: "warning"
        });
        return;
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          message: "警告,只支持单数据!",
          type: "warning"
        });
        return;
      } else {
        fetchData(
          "/after/loanbook/loanbookList.do",
          this.multipleSelection[0]
        ).then(response => {
          this.loanBookData = response.data.data;

          console.log(this.loanBookData);
        });
        this.RepaydialogVisible = true;
      }
    },

    //上传影像资料成功
    handleSuccess(response, file, fileList) {
      if (response.success) {
        this.$notify({
          title: "提示",
          message: file.name + response.msg,
          type: "success"
        });
        this.saveComonMonthModel.imgId = response.data.applyId;
        this.imgModel.applicationId1 = response.data.applyId;
      } else {
        (file.status = "fail"),
          this.$notify.error({
            title: "提示",
            message: file.name + response.msg
          });
        //alert(response.data);
      }
    },
    //上传印象资料失败
    handleError(response, file, fileList) {
      this.$message({
        message: file.name + "上传失败",
        type: "warning"
      });
    },
    //影像资料预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.imgdialogVisible = true;
    },
    //删除影像资料
    handleRemove(file, fileList) {
      this.delImgModel = file.response.data;
      fetchData(
        "/after/changeInfo/deleteimageassortments.do",
        this.delImgModel
      ).then(response => {
        var result = response.data;
        if (result.success) {
          this.$message({
            message: result.msg,
            type: "success" //success/warning/info/error
          });
          //this.dialogVisible = false
        } else {
          this.$message({
            message: result.msg,
            type: "warning"
          });
          //this.dialogVisible = false
        }
      });
    },

    excelhandleError(response, file, fileList) {
      this.$message({
        message: file.name + "上传失败",
        type: "warning"
      });
    },
    excelhandleSuccess(response, file, fileList) {
      if (response.success) {
        this.$message({
          title: "提示",
          message: response.msg,
          type: "success",
          duration: 7000
        });
      } else {
        this.$message({
          title: "提示",
          message: response.msg,
          type: "warning",
          duration: 7000
        });
      }
    },

    phoneFor(row, column, cellValue) {
      if (typeof cellValue != "undefined") {
        return formatPhone(cellValue);
      }
    },

    idCardFor(row, column, cellValue) {
      if (typeof cellValue != "undefined") {
        return formatIdCard(cellValue);
      }
    },

    handleChange(response, file, fileList) {
      //this.fileList3 = fileList.slice(-3);
    },
    downLoadExcel() {
      window.location.href = "/afterTemplate/template.xls";
    },
    downUserInfoExcel() {
      this.dialogTableVisible = true;

      /*
			        axios.post("/after/nomal/excelNomalList.do",this.listQuery,{responseType: 'arraybuffer'}).then((res) => {
						  var fileDownload = require('js-file-download');
				          fileDownload(res.data, "贷后台账"+ formatDate(new Date(), 'yyyyMMddhhmmss') +".xlsx");
				      });
				      */
    },
    downBillDayExcel() {
      axios
        .post("/after/nomal/excelNomalList.do", this.listQuery, {
          responseType: "arraybuffer"
        })
        .then(res => {
          var fileDownload = require("js-file-download");
          fileDownload(
            res.data,
            "正常客户列表" + formatDate(new Date(), "yyyyMMddhhmmss") + ".xlsx"
          );
        });
    },
    custImages() {
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "警告,请选择数据!",
          type: "warning"
        });
        return;
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          message: "警告,只支持单数据!",
          type: "warning"
        });
        return;
      } else {
        this.selectedCustType = "";
        this.custImagesInfo = [];
        fetchData("/after/cust/types.do", this.multipleSelection[0]).then(
          response => {
            this.custTypeData = response.data.data;

            console.log(this.custTypeData);
          }
        );
        this.custImagesdialogVisible = true;
      }
    },
    changeImages(value) {
      findById("/after/cust/images.do?typeId=" + value).then(response => {
        //console.info("^^^^^ :" + JSON.stringify(response));
        console.log(response.data.data);
        this.custImagesInfo = [];
        //this.custImagesInfo = response.data.data;
        for (var i = 0; i < response.data.data.length; i++) {
          var preUrl = "http://113.200.100.220/hoomsun.credit/resources/annex";
          var annexPath = response.data.data[i].annexPath;
          var annexCname = response.data.data[i].annexCname;
          this.custImagesInfo.push(preUrl + annexPath + annexCname);
        }
      });
    },
    custImgPreview(previewScr) {
      this.previewScr = previewScr;
      this.previewScrVisible = true;
    },
    repayRemid() {
      this.$prompt("请输账单日", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        //inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        //inputErrorMessage: '邮箱格式不正确'
      })
        .then(({ value }) => {
          //发送短信
          this.statementDateModel.statementDate = value;
          //打开遮蔽层
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          //发送请求
          fetchData(
            "/after/sendMsM/sendRepayment.do",
            this.statementDateModel
          ).then(response => {
            var msmResult = response.data;
            if (msmResult.success) {
              loading.close();
            }
            this.$message({
              message: msmResult.msg,
              type: "success"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消发送"
          });
        });
    }
  }
};
</script>

<style scoped>
.el-table td,
.el-table th {
  padding: 6px 0px;
  align: center;
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

.msg-class {
  text-align: center;
  padding: 10px 10px 10px 10px;
}

.font-class {
  font-size: 20px;
  color: red;
}

.hander-class {
  margin: 15px 0px 15px 10px;
}
.money-daihou-style .el-table th {
  background-color: #409eff;
  color: #ffffff;
}
.money-daihou-style .el-table--border th {
  border-right: 1px solid #c0c4cc;
}
.money-daihou-style .el-input__inner {
  border: 1px solid #409eff;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
