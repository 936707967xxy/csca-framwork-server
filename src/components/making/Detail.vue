<template>
	<div class="components-container Contract-scrollbar" id="components-container">
		<el-select v-model="imgType" placeholder="请选择影像类型" style="margin-bottom:10px;background:#777;" size="mini" @change="changeImgType">
		<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
		</el-option>
	</el-select>
		<split-pane :min-percent='35' :default-percent='0' split="vertical">

			<template slot="paneL">
				<div class="left-container" :default-percent='100' ref="paneLbox">
					<div id="images">
						<img src="../../assets/image/default.png" alt="No Image" />
					</div>
				</div>
			</template>
			<template slot="paneR">
				<div class="right-box data-area" ref="paneRbox">
					<div class="arrow-box" @click="toggleIcon">
						<div :class="{'fa fa-angle-left arrowIcon':!init,'fa fa-angle-right arrowIcon':init}" ref="arrowIcon"></div>
					</div>
					<!-- 数据展示区域 -->
					<el-tabs v-model="activeName" type="card" style="padding-left: 10px;">
						<el-tab-pane label="申请信息" name="first">
							<div class="right-container">
								<apply-info :apply-id="applyId"></apply-info>
							</div>
						</el-tab-pane>
						<el-tab-pane label="通话详单" name="second">
							<div class="right-container">
								<call-records :apply-id="applyId"></call-records>
							</div>
						</el-tab-pane>
						
						<el-tab-pane label="认证清单" name="three">
							<div class="right-container">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span style="font-size: 18px;font-weight: bold;">认证清单</span>
									</div>
									<el-table :data="authTable" border style="width:80%;margin:0 auto;" cell-class-name="cell-class">
										<el-table-column label="认证名称">
											<template slot-scope="scope">
													<div class="title-box" v-if="scope.row.auKey === 'creditInvestigation'">
														<span style="font-weight: bold;">{{scope.row.auName}}</span>
														<a type="primary" style="padding: 3px 5px;cursor:pointer;color:#409EFF;" class="el-icon-share" v-bind:href="'/sys/pbccrc/html.do?applyId='+applyId" target="_blank"></a>
													</div>
													<div class="title-box" v-else>
														<span style="font-weight: bold;">{{scope.row.auName}}</span>
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
								</el-card>
							</div>
						</el-tab-pane>

						<el-tab-pane label="合同信息" name="fourth">
							<div class="right-container">
								<detail-details :apply-id="applyId"></detail-details>
							</div>
						</el-tab-pane>
					</el-tabs>
				</div>
			</template>
		</split-pane>
	</div>
</template>
<script>
	import splitPane from 'vue-splitpane'
	import 'viewerjs/dist/viewer.css'
	import Viewer from 'viewerjs'
	import ApplyInfo from '@/common/display/ApplyInfo.vue'
	import DetailDetails from './DetailDetails.vue'
	import {
		imgType,
		getImgTypeLabel
	} from '../../utils/imagetype.js'
	import {
		queryPostJson
	} from '../../apis/httpapis.js'
	import {
		fetchData,
		findById,
		updateData,
		createDataJson
	} from '@/apis/httpapis'
	import CallRecords from '@/common/display/CallRecords.vue'
	
	
	//注册组件
	//Vue.component('apply-info', ApplyInfo);
	Viewer.setDefaults({
		inline: true,
		fullscreen: true,
		button: true
	})
	//console.info("#####   " + document.getElementById('images-id'))
	export default {
		name: 'detail',
		data() {
			return {
				init: true, //切换button的class样式
				applyId: '',
				activeName: 'first',
				textarea: '',
				imgType: 5,
				imgData: [],
				options : [],
				viewer_: null,
				authTable: null
			}
		},
		components: {
			splitPane,
			ApplyInfo,
			DetailDetails,
			CallRecords
		},
		created() {
			this.applyId = this.$route.params.applyId;
			findById("/sys/annex/imgtype.do").then(response => {
				var imgType = response.data;
				this.options = imgType;
			});
			this.changeImgType();

			var url = "/sys/userallauthinfo/selectallauthbyapplyid.do?applyId=" + this.applyId;
			findById(url).then(response => {
				this.authTable = response.data;
			})
		},
		mounted: function() { //viewerData

			//console.info(viewer);
		},
		methods: {
			toggleIcon() {
				if(this.init == true) {
					this.$refs.paneRbox.parentNode.style.width = "65%"
					this.$refs.paneLbox.parentNode.style.width = "35%"
					var box = document.getElementsByClassName("splitter-pane-resizer")[0].style.left = "35%"
				} else {
					this.$refs.paneRbox.parentNode.style.width = "100%"
					this.$refs.paneLbox.parentNode.style.width = "0%"
					var box = document.getElementsByClassName("splitter-pane-resizer")[0].style.left = "0%"
				}
				this.init = !this.init
			},
			changeImgType() {
				const imgType = this.imgType;
				const applyId = this.applyId;
				const url = "/sys/annex/query.do";
				queryPostJson(url, {
					applyId: applyId,
					imgType: imgType
				}).then(response => {
					const data = response.data;
					let imgHtml = [];
					if(data == null || data == '' || data == undefined || data.length < 1) {
						// let img = {};
						// img.imgSrc = "../../src/assets/image/1.jpeg";
						// img.imgAlt = "No image"
						// imgHtml.push(img);
					} else {
						for(var index in data) {
							let img = {};
							img.imgSrc = data[index].preView;
							img.imgAlt = data[index].fileName;
							imgHtml.push(img);
						}
						var str = "";
						for(var index in imgHtml) {
							str = str + "<img src=" + imgHtml[index].imgSrc + " alt=" + imgHtml[index].imgAlt + "/>";
						}
						document.getElementById('images').innerHTML = str;
					}

					if(null == this.viewer_) {
						var viewer = new Viewer(document.getElementById('images'));
						this.viewer_ = viewer;
					} else {
						this.viewer_.update();
					}
				})
			}
		}
	}
</script>

<style scoped>
	.components-container {
		position: relative;
		height: 84vh;
		overflow: hidden;
	}
	
	.left-container {
		position: relative;
		height: 81vh;
		min-width: 28rem;
	}
	
	.right-container {
		height: 100%;
		height: 75vh;
		overflow: auto;
		overflow-x: hidden;
	}
	
	#images {
		display: none;
	}
	
	split-pane {
		overflow: auto;
	}
	
	.right-box {
		background: #FFFFFF;
	}
	
	.arrow-box {
		position: absolute;
		width: 30px;
		height: 60px;
		background-color: #656667;
		border-radius: 0 50px 50px 0;
		/* 左上、右上、右下、左下 */
		top: 50%;
		z-index: 999;
		transform: translateY(-50%);
		left: 7px;
		border-left: 0;
		opacity: 0.5;
	}
	
	.arrowIcon {
		width: 10px;
		height: 20px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #d7dce6;
		font-size: 20px;
		font-weight: bold;
		opacity: 0.5;
	}
</style>
<style>
	.Contract-scrollbar .vertical {
		overflow-y: hidden !important;
	}
	@media only screen and (max-width:1366px) {
		.components-container {
			height: 78vh !important;
			overflow: hidden !important;
		}
		.right-container {
			height:65vh !important;
		}
		.left-container {
			height: 73vh !important;
		}
		.arrow-box {
			top: 50% !important;
			left: 7px !important;
		}
		.arrowIcon {
			top: 50% !important;
			left: 50% !important;
		}
		 .Contract-scrollbar .vertical {
			overflow-y: hidden !important;
	}
}
</style>
