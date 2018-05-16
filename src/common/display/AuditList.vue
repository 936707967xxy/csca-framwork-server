<template>
	<div id="audit-list-box">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>认证清单</span>
			</div>
			<div class="grid-content bg-purple-dark">
				<el-table :data="authTable" border style="width:80%;margin:0 auto;" cell-class-name="cell-class">
					<el-table-column label="认证名称">
						<template slot-scope="scope">
								<div class="title-box" v-if="scope.row.auKey === 'creditInvestigation'">
									<span>{{scope.row.auName}}</span>
								  <a type="primary" style="padding: 3px 5px;cursor:pointer;color:#409EFF;" class="el-icon-share" v-bind:href="'/sys/pbccrc/html.do?applyId='+applyId" target="_blank"></a>
								</div>
								<div class="title-box" v-else>
									<span>{{scope.row.auName}}</span>
								</div>
							</template>
					</el-table-column>
					<el-table-column label="认证结果">
						<template slot-scope="scope">
	        			<span v-show="scope.row.auValue==0"><img src="@/assets/image/yrz.png"  title="已认证" style="width: 24px;height: 24px"></span>
	        			<span v-show="scope.row.auValue==1"><img src="@/assets/image/wrz.png"  title="未认证" style="width: 24px;height: 24px"></span>
	        			<span v-show="scope.row.auValue==2"><img src="@/assets/image/rzsb.png" title="认证失败" style="width: 24px;height: 24px"></span>
	        			<span v-show="scope.row.auValue==3"><img src="@/assets/image/rzz.png"  title="认证中" style="width: 24px;height: 24px"></span>
	        			<span v-show="scope.row.auValue==4"><img src="@/assets/image/rzgq.jpg" title="认证过期" style="width: 24px;height: 24px"></span>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-card>
	</div>
</template>

<script>
	import {
	findById,
	fetchData,
	removeData
} from '@/apis/httpapis'
export default {
	name: 'auditList',
	props: {
		applyId: String
	},
	data() {
		return {
			applyModel: {
				remarks: '',
				handleOpinionVal: '提交'
			},
			submitTypeText: '',
			authTable: null,
		}
	},
	created() {
		const applyId = this.applyId
		var url = "/sys/userallauthinfo/selectallauthbyapplyid.do?applyId=" + applyId;
		findById(url).then(response => {
			this.authTable = response.data;
		})
	},
	methods: {
	}
}
</script>

<style>
	.sub-form,
	.el-textarea {
		font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
	}
	
	.clearfix {
		font-size: 18px;
		font-weight: 600;
	}
	
	.btn {
		margin-left: 42%;
		margin-top: 10px;
	}
	
	.btn .el-button {
		font-size: 14px;
	}
	
	.el-tabs__content {
		height: 75vh;
		overflow: auto;
	}
	
	#au-apply-box {
		padding-bottom: 20px;
	}
</style>