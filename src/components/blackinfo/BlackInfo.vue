<template>
	<div class="resources-box">
		<el-row class="search-box">
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-form :inline="true" :model="listQuery" class="demo-form-inline">
						<el-form-item label="客户姓名">
							<el-input v-model="listQuery.custname" placeholder="客户姓名" size="small"></el-input>
						</el-form-item>
						<el-form-item label="手机号">
							<el-input v-model="listQuery.phone" placeholder="手机号" size="small"></el-input>
						</el-form-item>
						<el-form-item label="身份证号">
							<el-input v-model="listQuery.idnumber" placeholder="身份证号" size="small"></el-input>
						</el-form-item>
						<el-form-item label="审核状态">
							<el-select v-model="listQuery.custstate" placeholder="请选择" size="small">
								<el-option v-for="item in checkOption" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>

						<el-form-item>
							<el-button type="primary" @click="searchBlackInfo" size="small">查询</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-col>
		</el-row>
		<el-row class="toolbar">
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-button type="primary" size="small" @click="handleCreate">转入</el-button>
					<el-button type="success" size="small" @click="handleUpdate">转出</el-button>
					<el-button type="danger" size="small" @click="removeOne">删除</el-button>
				</div>
			</el-col>
		</el-row>
		<!--数据展示-->
		<el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
				<el-table :data="tableData" border style="width: 100%" cell-class-name="cell-class" ref="tableData" @select-all="selectAll"  @select="selectChange"  @current-change="handleCurrentRow" highlight-current-row>
						<el-table-column type="selection" min-width="35"></el-table-column>
						<el-table-column prop="custname" label="客户姓名" min-width="120"></el-table-column>
						<el-table-column prop="phone" label="手机号" min-width="120"></el-table-column>
						<el-table-column prop="idnumber" label="身份证" min-width="170"></el-table-column>
						<el-table-column prop="rollinDate" label="转入时间" min-width="170" :formatter="dateFor"></el-table-column>
						<el-table-column prop="rollinCause" label="转入原因" min-width="120"></el-table-column>
						<el-table-column prop="operator" label="录入人员" min-width="120"></el-table-column>
						<el-table-column prop="dealopinionsval" label="审批意见" min-width="120"></el-table-column>
						<el-table-column prop="companyName" label="公司名称" min-width="150"></el-table-column>
						<el-table-column prop="companyShortName" label="公司简称" min-width="120"></el-table-column>
						<el-table-column prop="orgcode" label="公司机构代码" min-width="110"></el-table-column>
						<el-table-column prop="blackRemark" label="备注信息" min-width="120"></el-table-column>
						<el-table-column label="操作" fixed="right" min-width="260">
							<template slot-scope="scope">
								<el-button size="mini" type="success" @click="handleEdit(scope.row)">转出</el-button>
								<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</el-col>
		</el-row>
		<!--分页-->
		<el-row style="margin-top:20px;">
			<el-col :span="12">
				<div class="grid-content bg-purple-dark">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[30, 60, 90, 120]" :page-size="30" layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>
			</el-col>
		</el-row>
		<!-- 弹窗 -->
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
			<div class="components-container" id="components-container" style="height:600px;">
				<el-form class="small-space" :model="blackinfoModel" ref="blackinfoModel" label-position="left" label-width="120px" style="padding:20px 20px;height:100%">
					<div class="right-box">
						<el-tabs v-model="activeName" type="card">
							<!--个人信息-->

							<el-tab-pane label="个人信息" name="first">
								<div class>
									<el-row>
										<el-col :span="12">
											<el-form-item label="客户姓名：" prop="custname" :rules="{required: true, message: '请填客户姓名', trigger: 'blur',max:30}" size='small'>
												<el-input v-model="blackinfoModel.custname"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="手机号：" prop="phone" :rules="{required: true, message: '请填正确的手机号', trigger: 'blur', pattern: /^1[34578]\d{9}$/,}" size='small'>
												<el-input v-model="blackinfoModel.phone"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="12">
											<el-form-item label="身份证：" prop="idnumber" :rules="{required: true, pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号', trigger: 'blur'}" size='small'>
												<el-input v-model="blackinfoModel.idnumber"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="住宅电话：" size='small'>
												<el-input v-model="blackinfoModel.houseAddressPhone" placeholder="住宅电话"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row class="resident">
										<el-col :span="24">
											<el-form-item label="住宅地址：" prop="houseProvName" :rules="{required: true, message: '请选择省', trigger: 'change'}" style="width:230px;" class="prsidentOption" size='small'> 
												<el-select v-model="blackinfoModel.houseProvName" placeholder="请选择省" @change="housePchange" style="width:110px;">
													<el-option v-for="item in houseP" :key="item.PROVINCEID" :label="item.PROVINCE" :value="item.PROVINCEID">
													</el-option>
												</el-select>
											</el-form-item>
											<el-form-item prop="houseCityName" :rules="{required: true, message: '请选择市', trigger: 'change'}">
												<el-select v-model="blackinfoModel.houseCityName" placeholder="请选择市" @change="houseCchange" style="width:110px;" size='small'>
													<el-option v-for="item in houseC" :key="item.CITYID" :label="item.CITY" :value="item.CITYID">
													</el-option>
												</el-select>
											</el-form-item>
											<el-form-item prop="houseAreaName" :rules="{required: true, message: '请选择区', trigger: 'change'}">
												<el-select v-model="blackinfoModel.houseAreaName" placeholder="请选择区" @change="houseAchange" style="width:110px;" size='small'>
													<el-option v-for="item in houseA" :key="item.AREAID" :label="item.AREA" :value="item.AREAID">
													</el-option>
												</el-select>
											</el-form-item>
											<el-form-item  class="detailPositiontwo" prop="houseAddressDetail" :rules="{required: true, message: '请填写详细地址', trigger: 'blur'}" size='small'>
												<el-input class="detailPosition" v-model="blackinfoModel.houseAddressDetail" placeholder="请填写详细地址" style="width:339px;"></el-input>
											</el-form-item>

										</el-col>
									</el-row>
									
									<el-row style="height:90px;">
										<el-col :span="22">
											<el-form-item label="转入原因：" v-if="rollShow" prop="rollinCause" :rules="{required: true, message: '请填转入原因', trigger: 'blur',max:200}" size='small'>
												<el-input type="textarea" v-model="blackinfoModel.rollinCause"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="22">
											<el-form-item label="转出原因：" v-if="isShow" prop="rolloutCause" :rules="{required: true, message: '请填转入原因', trigger: 'blur',max:200}" size='small'>
												<el-input type="textarea" v-model="blackinfoModel.rolloutCause"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="22">
											<el-form-item label="备注：" prop="blackRemark" :rules="{required: true, message: '请填备注', trigger: 'blur',max:200}" size='small'>
												<el-input type="textarea" v-model="blackinfoModel.blackRemark"></el-input>
											</el-form-item>
										</el-col>

									</el-row>
									<div slot="footer" class="dialog-footer" style="float: right;margin-top:10%;">
										<el-button v-if="dialogStatus=='create'" @click="dialogFormVisible=false">取 消</el-button>	
										<el-button v-if="dialogStatus=='update'" @click="dialogFormVisible=false">取 消</el-button>									
										<el-button v-if="dialogStatus=='create'" type="primary" @click="create('blackinfoModel')">转入</el-button>
										<el-button v-if="dialogStatus=='update'" type="primary" @click="update('blackinfoModel')">转出</el-button>	
									</div>
								</div>

							</el-tab-pane>

							<!--公司信息-->

							<el-tab-pane label="公司信息" name="second">
								<div class="right-container">
									<el-row>
										<el-col :span="12">
											<el-form-item label="公司名称：" prop="companyName"  size='small'>
												<el-input v-model="blackinfoModel.companyName"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="公司简称：" prop="companyShortName"  size='small'> 
												<el-input v-model="blackinfoModel.companyShortName"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>

										<el-col :span="12">
											<el-form-item label="公司机构代码：" prop="orgcode"  size='small'>
												<el-input v-model="blackinfoModel.orgcode"></el-input>
											</el-form-item>

										</el-col>
										<el-col :span="12">
											<el-form-item label="公司电话："  size='small'>
												<el-input v-model="blackinfoModel.companyPhone" placeholder="公司电话"></el-input>
											</el-form-item>
										</el-col>

									</el-row>
									<el-row class="resident">
										<el-col :span="24">
											<el-form-item label="公司地址：" prop="companyProvName"  style="width:230px;" class="prsidentOption">
												<el-select v-model="blackinfoModel.companyProvName" placeholder="请选择省" @change="companyPchange" style="width:110px;" size='small'> 
													<el-option v-for="item in companyP" :key="item.PROVINCEID" :label="item.PROVINCE" :value="item.PROVINCEID">
													</el-option>
												</el-select>
											</el-form-item>
											<el-form-item prop="companyCityName"  size='small'>
												<el-select v-model="blackinfoModel.companyCityName" placeholder="请选择市" @change="companyCchange" style="width:110px;">
													<el-option v-for="item in companyC" :key="item.CITYID" :label="item.CITY" :value="item.CITYID">
													</el-option>
												</el-select>
											</el-form-item>
											<el-form-item prop="companyAreaName"  size='small'>
												<el-select v-model="blackinfoModel.companyAreaName" placeholder="请选择区" @change="companyAchange" style="width:110px;">
													<el-option v-for="item in companyA" :key="item.AREAID" :label="item.AREA" :value="item.AREAID">
													</el-option>
												</el-select>
											</el-form-item>
											<el-form-item class="detailPositiontwo" prop="companyAddressDetail"  size='small'>
												<el-input class="detailPosition" v-model="blackinfoModel.companyAddressDetail" placeholder="请填写详细地址" style="width:339px;"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="10">
											<el-form-item label="公司法人：" prop="legalPersonName"  size='small'>
												<el-input v-model="blackinfoModel.legalPersonName"></el-input>
											</el-form-item>

										</el-col>
									</el-row>
									<div slot="footer" class="dialog-footer" style="float: right;margin-top:20%;">
										<el-button v-if="dialogStatus=='create'" @click="dialogFormVisible=false">取 消</el-button>	
										<el-button v-if="dialogStatus=='update'" @click="dialogFormVisible=false">取 消</el-button>									
										<el-button v-if="dialogStatus=='create'" type="primary" @click="create('blackinfoModel')">转入</el-button>
										<el-button v-if="dialogStatus=='update'" type="primary" @click="update('blackinfoModel')">转出</el-button>
									</div>
								</div>

							</el-tab-pane>

						</el-tabs>
					</div>
				</el-form>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	import { fetchData, findById, updateDataJson, removeData, createDataJson, getRequest } from '@/apis/httpapis'
	import { formatDate } from '@/utils/date'
	//注册组件
	//Vue.component('apply-info', ApplyInfo);
	export default {
		data() {
			return {
				activeName: 'first',
				tableData: null,
				total: null,
				isShow: false,
				rollShow: false,
				listQuery: {
					page: 1,
					rows: 30,
					custname: '',
					phone:'',
					idnumber:'',
					custstate:''
				},
				//审批意见
				 checkOption: [{
			          value: '1',
			          label: '待审核'
			        }, {
			          value: '2',
			          label: '已审核'
			        },{
			          value: '3',
			          label: '全部'
      			}],
				blackinfoModel: {
					custname: '',
					phone: '',
					sex: '',
					sexVal: '',
					idnumber: '',
					isblackflag: '',
					custstateVal: '',
					custtypeVal: '',
					rollinDate: '',
					rollinCause: '',
					rolloutDate: '',
					rolloutCause: '',
					operator: '',
					companyName: '',
					companyShortName: '',
					orgcode: '',
					blackRemark: '',
					houseAddress: '',
					houseProvCode: '',
					houseProvName: '',
					houseCityCode: '',
					houseCityName: '',
					houseAreaCode: '',
					houseAreaName: '',
					houseAddressDetail: '',
					houseAddressPhone: '',
					companyAddress: '',
					companyProvCode: '',
					companyCityCode: '',
					companyCityName: '',
					companyAreaCode: '',
					companyAreaName: '',
					companyAddressDetail: '',
					companyPhone: '',
					legalPersonId: '',
					legalPersonName: '',
					dealopinions: '',
					dealopinionsval: '',
					dealPersonId:'',
					dealPersonName:''
				},
				houseP: [],
				houseC: [],
				houseA: [],
				companyP: [],
				companyC: [],
				companyA: [],
				dialogStatus: '',
				textMap: {
					update: '转出黑名单',
					create: '转入黑名单',
				},
				multipleSelection: [],
				dialogFormVisible: false,
				id:'',
			}
		},
		created() {
			this.getPager(),

				findById("/sys/blackinfo/findallprovinces.do") //初始化省市联动
				.then(response => {
					//console.info("^^^^^ :" + JSON.stringify(response));

					this.houseP = response.data;
					this.companyP = response.data;
				});
		},
		methods: {
			//处理意见选择事件
			changeOption(value) {
				var opt = this.blackOpinions;
				var lab = null;
				var id = null;
				for(var i = 0; i < opt.length; i++) {
					if(opt[i].value == value) {
						lab = opt[i].label;
						id = opt[i].value;

					}
				}

				this.blackinfoModel.dealopinionsval = lab;
				this.blackinfoModel.dealopinions = id;
			},
			getPager() {
				fetchData('sys/blackinfo/page.do', this.listQuery).then(response => {
					//console.info("^^^^^ :  " + JSON.stringify(response));
					this.tableData = response.data.pageData
					this.total = response.data.recordCount
				})

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
			selectUtil(row) {
				let id = row.id;
				if(null == id || id == "" || id == undefined) { //进入则为头部方法进入
					if(this.currentRow != null && this.currentRow != undefined && this.currentRow != "") {
						id = this.currentRow.id;
					} else {
						this.$message({
							message: '警告，请选择要操作的数据!',
							type: 'warning'
						});
						return null;
					}
				}
				this.id = id;
				
				return id;
			},
			searchBlackInfo() {
				//console.log('submit!');
				this.getPager();
			},
			// selchange(selection) {
			// 	//console.log('选择时触发^^^');
			// 	this.multipleSelection = selection;

			// },
			sexChange(value) {
				var sex = this.sexRadio[value - 1].text;
				this.blackinfoModel.sexVal = sex;
			},
			//转出
			handleUpdate(row) {
				
				this.rollShow = false; //转入
				this.isShow = true; //转出
				//修改弹框
			    let id = this.selectUtil(row);


				if(id!=null){
				this.findById(id);
				this.dialogStatus = 'update'
				this.dialogFormVisible = true
				}

			},
			findById(id) {
				
				findById('sys/blackinfo/findbyid.do?id=' + id)
					.then(response => {
						console.log('双向绑定到' + JSON.stringify(response.data));
						this.blackinfoModel = response.data
					})
			},
			update(formName) {
				this.$refs[formName].validate((valid) => {
					var url = "sys/blackinfo/update.do";
					if(valid) {
						updateDataJson(url, this.blackinfoModel)
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
					} else {
						this.$message({
							message: '请检查所填信息格式是否正确',
							type: 'warning'
						});
						return false;
					}
				})
			},
			handleCreate() {
				this.blackinfoModel = {
					custname: '',
					phone: '',
					sex: '',
					sexVal: '',
					idnumber: '',
					isblackflag: '',
					custstateVal: '',
					custtypeVal: '',
					rollinDate: '',
					rollinCause: '',
					rolloutDate: '',
					rolloutCause: '',
					operator: '',
					companyName: '',
					companyShortName: '',
					orgcode: '',
					blackRemark: '',
					houseAddress: '',
					houseProvCode: '',
					houseProvName: '',
					houseCityCode: '',
					houseCityName: '',
					houseAreaCode: '',
					houseAreaName: '',
					houseAddressDetail: '',
					houseAddressPhone: '',
					companyAddress: '',
					companyProvCode: '',
					companyCityCode: '',
					companyCityName: '',
					companyAreaCode: '',
					companyAreaName: '',
					companyAddressDetail: '',
					companyPhone: '',
					legalPersonId: '',
					legalPersonName: '',
					dealopinions: '',
					dealopinionsval: '',
					dealPersonId:'',
					dealPersonName:''

				}

				this.dialogStatus = 'create'
				this.dialogFormVisible = true
				this.rollShow = true; //转入
				this.isShow = false; //转出
			},
			create(formName) { //添加
				this.setAddress();
				this.$refs[formName].validate((valid) => {
					var url = "sys/blackinfo/add.do";
					if(valid) {
						createDataJson(url, this.blackinfoModel)
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
					} else {
						this.$message({
							message: '请检查所填信息格式是否正确',
							type: 'warning'
						});
						return false;
					}
				})

			},
			removeOne(row) { //批量删除
			    let id = this.selectUtil(row);
				//console.log("^^^^^删除的id:  " + id);
				removeData('sys/blackinfo/delete.do?id=' + id)

				this.getPager(); //更新页面
			},
			handleDelete(index, row) { //单条删除
				 let id = this.selectUtil(row);
				//console.log("^^^^^删除的id:  " + id);
				removeData('sys/blackinfo/delete.do?id=' + id)
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
			handleEdit(row) {

				this.rollShow = false; //转入
				this.isShow = true; //转出
				var id = row.id;
				this.findById(id);
				this.dialogStatus = 'update'
				this.dialogFormVisible = true
			},
			dateFor(row, column, cellValue) {
				if(typeof(cellValue) != "undefined") {
					return formatDate(new Date(cellValue), 'yyyy-MM-dd hh:mm:ss');
				}

			},
			// 住宅地址
			housePchange(value) {
				//console.log("选中省获取下级市 :  "+value);
				this.blackinfoModel.houseCityCode = "";
				this.blackinfoModel.houseAreaCode = "";
				this.houseC = "";
				this.houseA = "";
				findById(
					"/sys/blackinfo/findcitiebypro.do?provinceId=" + value
				).then(response => {
					this.houseC = response.data;
				});
				//获取省名称---赋值给对象
				for(var i = 0; i < this.houseP.length; i++) {
					if(value == this.houseP[i].PROVINCEID) {
						this.blackinfoModel.houseProvName = this.houseP[i].PROVINCE;		
						this.blackinfoModel.houseProvCode = this.houseP[i].PROVINCEID;


					}
				}
			},

			houseCchange(value) {
				this.blackinfoModel.houseAreaCode = "";
				this.houseA = "";
				findById(
					"/sys/blackinfo/findareabycity.do?cityId=" + value
				).then(response => {
					this.houseA = response.data;
				});
				//获取市名称---赋值给对象
				for(var i = 0; i < this.houseC.length; i++) {
					if(value == this.houseC[i].CITYID) {
						this.blackinfoModel.houseCityName = this.houseC[i].CITY;
						this.blackinfoModel.houseCityCode = this.houseC[i].CITYID;

						
					}
				}
			},
			houseAchange(value) {
				//获取区名称---赋值给对象
				for(var i = 0; i < this.houseA.length; i++) {
					if(value == this.houseA[i].AREAID) {
						this.blackinfoModel.houseAreaName = this.houseA[i].AREA;
						this.blackinfoModel.houseAreaCode = this.houseA[i].AREAID;
						//console.log(this.houseA[i].AREA)
					}
				}
			},

			//公司地址
			companyPchange(value) {
				//console.log("选中省获取下级市 :  " + value);
				this.blackinfoModel.companyCityCode = "";
				this.blackinfoModel.companyAreaCode = "";
				this.companyC = "";
				this.companyA = "";
				findById(
					"/sys/blackinfo/findcitiebypro.do?provinceId=" + value
				).then(response => {
					this.companyC = response.data;
				});
				//获取省名称---赋值给对象
				for(var i = 0; i < this.companyP.length; i++) {
					if(value == this.companyP[i].PROVINCEID) {
						this.blackinfoModel.companyProvName = this.companyP[i].PROVINCE;
						this.blackinfoModel.companyProvCode = this.companyP[i].PROVINCEID;


					}
				}
			},

			companyCchange(value) {
				this.blackinfoModel.companyAreaCode = "";
				this.companyA = "";
				findById(
					"/sys/blackinfo/findareabycity.do?cityId=" + value
				).then(response => {
					this.companyA = response.data;
				});
				//获取市名称---赋值给对象
				for(var i = 0; i < this.companyC.length; i++) {
					if(value == this.companyC[i].CITYID) {
						this.blackinfoModel.companyCityName = this.companyC[i].CITY;
						this.blackinfoModel.companyCityCode = this.companyC[i].CITYID;
					}
				}
			},
			companyAchange(value) {
				//获取区名称---赋值给对象
				for(var i = 0; i < this.companyA.length; i++) {
					if(value == this.companyA[i].AREAID) {
						this.blackinfoModel.companyAreaName = this.companyA[i].AREA;
						this.blackinfoModel.companyAreaCode = this.companyA[i].AREAID;


					}
				}
			},

			setAddress() {

				var houseProvName = this.blackinfoModel.houseProvName;
				var houseCityName = this.blackinfoModel.houseCityName;
				var houseAreaName = this.blackinfoModel.houseAreaName;
				var houseAddressDetail = this.blackinfoModel.houseAddressDetail;
				//住宅地址
				if(houseProvName==""||houseCityName==""||houseAreaName==""||houseAddressDetail==""){
					this.blackinfoModel.houseAddress ="";
				}else{
				this.blackinfoModel.houseAddress = houseProvName + houseCityName + houseAreaName + houseAddressDetail;

				}
				//公司地址
				var companyProvName = this.blackinfoModel.companyProvName;
				var companyCityName = this.blackinfoModel.companyCityName;
				var companyAreaName = this.blackinfoModel.companyAreaName;
				var companyAddressDetail = this.blackinfoModel.companyAddressDetail;
				
				if(companyProvName==""||companyCityName==""||companyAreaName==""||companyAddressDetail==""){	
				this.blackinfoModel.companyAddress = "";
				}else{
				 this.blackinfoModel.companyAddress = companyProvName + companyCityName + companyAreaName + companyAddressDetail;

				}
			}
		}

	}
</script>

<style scoped>
	.resources-box .toolbar{
		padding:0px 20px 30px 20px;
	}
</style>
<style>
	.resources-box .el-form-item__label{
		text-align: right;
	}
	.resources-box .resident .el-form-item{
		display:inline-block;
	}
	.resources-box .resident .el-form-item__content{
		margin-left: 0px !important;
	}
	.resources-box .prsidentOption .el-form-item__error{
		left: 120px;
	}
	.resources-box .el-form-item--small .el-form-item__error{
		padding-top:5px;
	}
	@media screen and (max-width: 1919px) {
		.resources-box .detailPosition{
			margin-left: 120px;
			
		}
		.resources-box .detailPositiontwo .el-form-item__error{
			left: 120px;
		}
	}
	
</style>

