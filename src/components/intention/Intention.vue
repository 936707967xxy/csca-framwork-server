<template>
	<div class="resources-box resources-body">
		<el-row class="search-box">
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-form :inline="true" :model="listQuery" class="demo-form-inline">
						<el-form-item label="姓名" prop="custname">
							<el-input v-model="listQuery.custname" placeholder="姓名" size="small"></el-input>

						</el-form-item>
						<el-form-item label="手机号">
							<el-input v-model="listQuery.mobile" placeholder="手机号" size="small"></el-input>

						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="searchIntention" size="small">查询</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-col>
		</el-row>

		<el-row class="toolbar">
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-button type="primary" size="small" @click="handleCreate">添加</el-button>
					<el-button type="success" size="small" @click="handleUpdate">修改</el-button>
					<!-- <el-button type="danger" size="small" @click="removeAll">批量删除</el-button> -->
					<el-button type="danger" size="small" @click="visitorCreate">回访</el-button>
				</div>
			</el-col>
		</el-row>
		<el-dialog :title="textMap[dialogvisitorStatus]" :visible.sync="dialogvisitoVisible">

			<!--<el-row class="">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-form :inline="true" :model="visitorQuery" class="demo-form-inline">
            <el-form-item label="时间" prop="visTime">
              <el-input v-model="visitorQuery.visTime" placeholder="时间" size="small"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="searchVisitor" size="small">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>-->

			<el-row class="toolbar">
				<el-col :span="24">
					<div class="grid-content bg-purple-dark">

						<el-button type="success" size="small" @click="handleUpdateVisitor">修改</el-button>
						<el-button type="danger" size="small" @click="removeOne">删除</el-button>

					</div>
				</el-col>
			</el-row>
			<el-table :data="visitorData" border style="width: 100%" cell-class-name="cell-class" ref="tableData" @select-all="selectAll"  @select="selectChange"  @current-change="handleCurrentRow" highlight-current-row>
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column property="visTime" label="日期" width="180" :formatter="dateFor"></el-table-column>
				<el-table-column property="visRecord" label="回访内容" width="500" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" fixed="right">
					<template slot-scope="scope">

						<el-button size="mini" type="success" @click="handleEditVisitor(scope.row)">修改</el-button>
						<el-button size="mini" type="danger" @click="handleDeleteVisitor(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-row style="margin-top:20px;">
				<el-col :span="12">
					<div class="grid-content bg-purple-dark">
						<el-pagination @size-change="handleSizeChangeVisitor" @current-change="handleCurrentChangeVisitor" :current-page="1" :page-sizes="[3, 6, 9, 12]" :page-size="3" layout="total, sizes, prev, pager, next, jumper" :total="totalVisitor">
						</el-pagination>
					</div>
				</el-col>

			</el-row>

			<el-form :model="visitorModel" :rules="rules" ref="visitorModel" label-position="left" label-width="80px" style="margin-top:20px;">
				<el-form-item label="回访内容" prop="visRecord">
					<el-input type="textarea" v-model="visitorModel.visRecord"></el-input>
				</el-form-item>
				<el-row :gutter="10">
					<el-button v-if="dialogvisitorStatus=='createVisitor'" type="primary" @click="createVisitor('visitorModel')">添加</el-button>
					<el-button v-else type="primary" @click="updateVisitor('visitorModel')">修改</el-button>
					<el-button @click="dialogvisitoVisible=false">取消</el-button>
				</el-row>
			</el-form>
		</el-dialog>
		<!--数据展示-->
		<el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-table :data="tableData" height="650" border stripe style="width: 100%"  ref="tableData" @select-all="selectAll"  @select="selectChange"  @current-change="handleCurrentRow">
						<el-table-column type="selection" min-width="30"></el-table-column>
						<el-table-column prop="applyid" label="预约单申请号" min-width="150"></el-table-column>
						<el-table-column prop="applydate" label="预约日期" min-width="150" :formatter="dateFor"></el-table-column>
						<el-table-column prop="custname" label="客户姓名" min-width="90"></el-table-column>
						<el-table-column prop="paperid" label="证件号码" min-width="170"></el-table-column>
						<el-table-column prop="mobile" label="手机号" min-width="130"></el-table-column>
						<el-table-column prop="prodname" label="产品名称" min-width="160"></el-table-column>
						<el-table-column prop="appliststatval" label="预约单状态" min-width="100"></el-table-column>
						<el-table-column label="操作" min-width="180">
							<template slot-scope="scope">

								<el-button size="mini" type="text" @click="handleEdit(scope.row)">修改</el-button>
								<el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[30, 60, 90, 120]" :page-size="3" layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>
			</el-col>

		</el-row>
		<!-- 弹窗 -->
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
			<el-form class="small-space create-body" :model="intentionModel" :rules="rules" ref="intentionModel" label-position="left" label-width="120px" style='padding:20px 40px;text-align:left'>

				<el-row :gutter="20">
					<el-col :span="11">
						<el-form-item label="是否循环贷：" prop="isroundloanval">
							<el-select v-model="intentionModel.isroundloanval" prop="isroundloanval">
								<el-option value="非循环"></el-option>
								<el-option value="循环"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="11" :offset="2">
						<el-form-item label="客户姓名：" prop="custname">
							<el-input v-model="intentionModel.custname"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="20">
					<el-col :span="11">
						<el-form-item label="性别：" prop="sexval">
							<el-radio-group v-model="intentionModel.sexval">
								<el-radio label="男">男</el-radio>
								<el-radio label="女">女</el-radio>
							</el-radio-group>

							<!-- <el-radio-group @change="sexChange" v-model="intentionModel.sex">
								<el-radio v-for="item in sexRadio" :label="item.value" :key="item.value">{{item.text}}</el-radio>

						     </el-radio-group>-->
						</el-form-item>
					</el-col>
					<el-col :span="11" :offset="2">
						<el-form-item label="身份证号码：" prop="paperid">
							<el-input id="paperid" v-model="intentionModel.paperid" @blur="findByNumber()"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="20">
					<el-col :span="11">
						<el-form-item label="客户来源：" prop="sourceval">
							<el-select v-model="intentionModel.sourceval" placeholder="请选择" @change="sourcesChange">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="11" :offset="2">
						<el-form-item label="手机号：" prop="mobile">
							<el-input id="mobile" v-model.number="intentionModel.mobile" @blur="findByMobile()"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="11">
						<el-form-item label="产品名称：" prop="prodid">
							<el-select placeholder="请选择" v-model="intentionModel.prodid" @change="changeProductType">
								<el-option v-for="item in productType" :key="item.prodId" :label="item.prodName" :value="item.prodId">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible=false">取 消</el-button>
				<el-button v-if="dialogStatus=='create'" type="primary" @click="create('intentionModel')">确 定</el-button>
				<el-button v-else type="primary" @click="update('intentionModel')">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	import { fetchData, findById, updateDataJson, removeData, createDataJson, getRequest } from '@/apis/httpapis'
	import { formatDate } from '@/utils/date'

	export default {
		data() {

			return {
				visitorData: null,
				tableData: null,
				total: null,
				totalVisitor: null,
				listQuery: {
					page: 1,
					rows: 30,
					custname: '',
					mobile: ''
				},
				visitorQuery: {
					page: 1,
					rows: 3,
					visFkid: '',
				},
				productType: [],
				intentionModel: {

					isroundloanval: '非循环',
					applydate: '',
					custname: '',
					sexval: '',
					paperid: '',
					mobile: '',
					source: '',
					sourceval: '',
					prodid: '',
					prodname: '',
					appopername: '',
					appoperphone: '',
					loanpurposeval: '',
					operid: '',
					deptname: '',
					teamid: '',
					leadername: '',
					leaderid: ''
				},
				visitorModel: {
					visFkid: '',
					visTime: '',
					visRecord: ''

				},

				// sexRadio: [{
				// 		value: 1,
				// 		text: "男"
				// 	},
				// 	{
				// 		value: 2,
				// 		text: "女"
				// 	}
				// ],
				options: [{
						value: 1,
						label: 'app'
					},
					{
						value: 2,
						label: '门店'
					},
					{
						value: 3,
						label: '客户推荐'
					},
					{
						value: 4,
						label: '客户推荐'
					},
					{
						value: 5,
						label: '派单'
					},
					{
						value: 6,
						label: '推广活动'
					}, {
						value: 7,
						label: "其他"
					}
				],
				rules: {
					isroundloanval: [{
						required: true,
						trigger: 'change'
					}, ],
					visRecord: [

						{
							required: true,
							message: '请输入回访内容',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 200,
							message: '长度在 2 到 200 个字符',
							trigger: 'blur'
						}
					],
					applydate: [{
						type: 'date',
						required: true,
						message: '请输入日期',
						trigger: 'change'
					}, ],
					custname: [{
							required: true,
							message: '请输入客户名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 15,
							message: '长度在 2 到 15 个字符',
							trigger: 'blur'
						}
					],
					// sexval: [
					// 	{ required: true, message: '请选择', trigger: 'blur' },
					// ],
					paperid: [{
							required: true,
							message: '请输入身份证号',
							trigger: 'blur'
						},
						{
							pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
							message: '请输入正确的身份证号',
							trigger: 'blur'
						}
					],
					mobile: [{
							required: true,
							message: '请输入手机号',
							trigger: 'blur'
						},
						{
							pattern: /^1[34578]\d{9}$/,
							message: '请输入正确的手机号',
							trigger: 'blur'
						}
					],
					sourceval: [{
						required: true,
						message: '请选择活动区域',
						trigger: 'change'
					}],
					prodname: [
						// { required: true, message: '请选择活动区域', trigger: 'change' }
					],
					appopername: [{
						required: true,
						message: '请选择活动区域',
						trigger: 'change'
					}],
					appoperphone: [{
							required: true,
							message: '请输入手机号',
							trigger: 'blur'
						},
						{
							pattern: /^1[34578]\d{9}$/,
							message: '请输入正确的手机号',
							trigger: 'blur'
						}
					],
					prodid: [{
						required: true,
						message: '请选择活动区域',
						trigger: 'change'
					}],
					loanpurposeval: [{
						required: true,
						message: '请选择活动区域',
						trigger: 'change'
					}],
					operid: [{
							required: true,
							message: '请输入客服编号',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 15,
							message: '长度在 3 到1 5 个字符',
							trigger: 'blur'
						}
					],
					deptname: [{
							required: true,
							message: '请输入客户名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 15,
							message: '长度在 2 到15 个字符',
							trigger: 'blur'
						}
					],
					teamid: [{
							required: true,
							message: '请输入团队编号',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 15,
							message: '长度在 3 到 15 个字符',
							trigger: 'blur'
						}
					],
					leadername: [{
							required: true,
							message: '请输入团队经理名字',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 15,
							message: '长度在 2 到15 个字符',
							trigger: 'blur'
						},

					],
					leaderid: [{
							required: true,
							message: '请输入团队经理编号',
							trigger: 'blur'
						},
						{
							trigger: 'blur'
						},
						{
							min: 3,
							max: 15,
							message: '长度在 3 到15 个字符',
							trigger: 'blur'
						}
					],
				},

				dialogStatus: '',

				textMap: {
					update: '修改预约信息',
					create: '添加预约信息',
					visitorCreate: '展示回访',

				},
				dialogvisitorStatus: '',
				multipleSelection: [],
				dialogFormVisible: false,
				dialogvisitoVisible: false,
				ordplyId:'',
			}
		},
		created() {
			this.getPager();
			findById('/sys/producttype/queryalltype.do')
				.then(response => {

					this.productType = response.data;
				});

		},
		methods: {
			getPager() {
				fetchData('/sys/intention/intentionpager.do', this.listQuery).then(response => {
					
					this.tableData = response.data.pageData
					this.total = response.data.recordCount
				})
			},
			// sexChange(value) {
			// 	var sex = this.sexRadio[value - 1].text;
			// 	this.intentionModel.sexval = sex;
			// },
			sourcesChange(value) {
				var opt = this.options;
				var lab = null;
				var sourceId = null;
				for(var i = 0; i < opt.length; i++) {
					if(opt[i].value == value) {
						lab = opt[i].label;
						sourceId = opt[i].value;

					}
				}
				this.intentionModel.source = sourceId;
				this.intentionModel.sourceval = lab;

			},

			changeProductType(value) {
				for(var i = 0; i < this.productType.length; i++) { //添加预约给model产品赋name
					if(value == this.productType[i].prodId) {
						this.intentionModel.prodname = this.productType[i].prodName;

					}
				}

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
				let ordplyId = row.ordplyId;
				if(null == ordplyId || ordplyId == "" || ordplyId == undefined) { //进入则为头部方法进入
					if(this.currentRow != null && this.currentRow != undefined && this.currentRow != "") {
						ordplyId = this.currentRow.ordplyId;
					} else {
						this.$message({
							message: '警告，请选择要操作的数据!',
							type: 'warning'
						});
						return null;
					}
				}
				this.ordplyId = ordplyId;
				
				return ordplyId;
			},

			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.listQuery.rows = val
				this.getPager();

			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.listQuery.page = val;
				this.getPager();

			},
			searchIntention() {

				this.getPager();
			},

			handleSizeChangeVisitor(val) {

				this.visitorQuery.rows = val
				this.findPage();
			},
			handleCurrentChangeVisitor(val) {;
				this.visitorQuery.page = val;
				this.findPage();
			},
			// searchVisitor(){
			//     this.findPage();
			// },
		
			findById(ordplyId) {
				findById('sys/intention/findintentionbyid.do?ordplyId=' + ordplyId)
					.then(response => {

						this.intentionModel = response.data
					})
			},
			handleUpdate(row) {
				//修改弹框
				
				let ordplyId = this.selectUtil(row);
				if(ordplyId!=null){
				this.findById(ordplyId);
				this.dialogStatus = 'update'
				this.dialogFormVisible = true
				}
			},
			update() {
				var url = "sys/intention/updateintention.do";
				updateDataJson(url, this.intentionModel)
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
			handleCreate() {
				this.intentionModel = {
					isroundloanval: '非循环',
					applydate: '',
					custname: '',
					sexval: '',
					paperid: '',
					mobile: '',
					source: '',
					sourceval: '',
					prodid: '',
					prodname: '',
					appopername: '',
					appoperphone: '',
					loanpurposeval: '',
					operid: '',
					deptname: '',
					teamid: '',
					leadername: '',
					leaderid: ''

				}
				this.dialogStatus = 'create'
				this.dialogFormVisible = true

			},
			create(formName) { //添加
				this.$refs[formName].validate((valid) => {
					var url = "sys/intention/addintention.do";
					if(valid) {
						createDataJson(url, this.intentionModel)
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
			//回访
			visitorCreate(row) {

				let ordplyId = this.selectUtil(row);

				this.visitorModel.visfkid = ordplyId;
				this.visitorQuery.visfkid = ordplyId;
				this.visitorModel = {

					visFkid: ordplyId,
					visRecord: ''
				}

				this.visitorQuery = {
					page: 1,
					rows: 3,
					visFkid: ordplyId,
				}
				if(ordplyId!=null){
					this.dialogvisitorStatus = 'createVisitor'
					this.dialogvisitoVisible = true
					this.findPage();
				}
			},
			findPage() {
				fetchData('sys/visitor/findpagevisitor.do', this.visitorQuery).then(response => {
					//console.log('双向绑定到' + JSON.stringify(response.data));

					this.visitorData = response.data.pageData
					this.totalVisitor = response.data.recordCount
				})
			},
			createVisitor(formName) {
				this.$refs[formName].validate((valid) => {
					var url = "sys/visitor/add.do";
					if(valid) {
						createDataJson(url, this.visitorModel)
							.then(response => {
								var result = response.data
								if(result.success) {
									this.$message({
										message: result.msg,
										type: 'success' //success/warning/info/error
									});
									this.dialogvisitoVisible = false
									this.findPage();
									
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
			removeOne() { //删除
				var visId = this.currentRow.visId;
				
				if(visId == null ||visId=='') {
					this.$message({
						message: '警告,请选择要删除的回访记录!',
						type: 'warning'
					});
					return;
				}

				removeData('sys/visitor/delete.do?visId=' + visId)

				this.findPage(); //更新页面
			},
			findVisitorById(visId) {
				findById('sys/visitor/findvisitorbyid.do?visId=' + visId)
					.then(response => {

						this.visitorModel = response.data
					})
			},
			handleUpdateVisitor() {
				//修改弹框
				var visId = this.currentRow.visId;

				if(visId==null ||visId=='') {
					this.$message({
						message: '警告,请选择要修改的回访记录!',
						type: 'warning'
					});
					return;
				}
			
				this.findVisitorById(visId);
				this.dialogvisitorStatus = 'updateVisitor'
				//this.dialogvisitoVisible = true
			},
			//修改回访
			updateVisitor(formName) {
				this.$refs[formName].validate((valid) => {
					var url = "sys/visitor/update.do";
					if(valid) {
						updateDataJson(url, this.visitorModel)
							.then(response => {
								var result = response.data
								if(result.success) {
									this.$message({
										message: result.msg,
										type: 'success' //success/warning/info/error
									});
									this.dialogvisitoVisible = false
									this.findPage();
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
			handleEditVisitor(row) {

				var visId = row.visId;
				this.findVisitorById(visId);
				this.dialogvisitorStatus = 'updateVisitor'
				//this.dialogvisitoVisible = true
			},
			
			handleDeleteVisitor(index, row) { //单条删除

				removeData('sys/visitor/delete.do?visId=' + row.visId)
					.then(response => {
						var result = response.data
						if(result.success) {
							this.$message({
								message: result.msg,
								type: 'success' //success/warning/info/error
							});
							this.dialogFormVisible = false
							this.findPage();
							this.getPager();
						} else {
							this.$message({
								message: result.msg,
								type: 'warning'
							});
						}
					})
			},
			handleDelete(index, row) { //单条删除

				removeData('sys/intention/deleteintention.do?ordplyId=' + row.ordplyId)
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

				var ordplyId = row.ordplyId;
				this.findById(ordplyId);
				this.dialogStatus = 'update'
				this.dialogFormVisible = true
			},
			dateFor(row, column, cellValue) {
				if(typeof(cellValue) != "undefined") {
					return formatDate(new Date(cellValue), 'yyyy-MM-dd hh:mm:ss');
				}

			},
			findByMobile: function() {
				var mobile = document.getElementById("mobile").value;
				var regPhone = /^1[34578]\d{9}$/;
				if(mobile != "" && mobile != null) {
					if(regPhone.test(mobile)) {

						findById('sys/blackinfo/findbyphone.do?phone=' + mobile)
							.then(response => {
								var result = response.data
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
									this.dialogFormVisible = false
								}

							})
					}

				}

			},
			findByNumber: function() {
				var paperid = document.getElementById("paperid").value;
				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				if(paperid != "" && paperid != null) {

					if(reg.test(paperid)) {
						findById('sys/intention/checkidnumber.do?idnumber=' + paperid)
							.then(response => {
								var result = response.data
								if(result.success) {
									this.dialogFormVisible = false
									this.$message({
										message: result.msg,
										type: 'warning'
									});
									this.dialogFormVisible = false
								} else {
									this.$message({
										message: result.msg,
										type: 'success'
									});
								}

							})
					}

				}
			}
		}
	}
</script>

<style scoped>
	.small-space .el-form-item__label {
		text-align: right !important;
	}

	.small-space .el-input__inner {
		width: 200px;
	}

	@media screen and (max-width: 1600px) {
		.small-space .el-input__inner {
			width: 145px;
			height: 30px !important;
		}
	}

	.search-box,
	.toolbar {
		margin: 10px 5px 10px 30px;
	}

	.el-input__inner {
		height: 35px;
	}

	.el-form-item__error {
		width: 150px;
		text-align: left;
	}

	.el-input--small {
		font-size: 13px;
	}

	.el-textarea__inner {
		height: 150px;
	}
</style>
<style>
	.create-body .el-form-item__label {
		text-align: right !important;
	}
	.resources-body .el-table td {
		padding: 7px 0 !important;
	}
</style>
