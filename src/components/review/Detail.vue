<template>
	<div class="components-container information-scrollbar" id="components-container">

		<split-pane :min-percent='35' :default-percent='0' split="vertical">

			<template slot="paneL">
				<div class="left-container" :default-percent='100' ref="paneLbox">
					<div id="images">
						<img src="../../assets/image/default.png" alt="No Image" />
					</div>
				</div>
			</template>
			<template slot="paneR">
				<div class="right-box" ref="paneRbox">
					<div class="arrow-box" @click="toggleIcon">
						<div :class="{'fa fa-angle-left arrowIcon':!init,'fa fa-angle-right arrowIcon':init}" ref="arrowIcon"></div>
					</div>
					<!-- 数据展示区域 -->
					<el-tabs v-model="activeName" type="card" style="padding-left:10px;">
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
						<el-tab-pane label="合同信息" name="third">
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
				imgType: 17,
				imgData: [],
				viewer_: null
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
			console.log("applyId" + this.applyId);
			this.changeImgType();
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
		height: 83vh;
		overflow: hidden;
	}
	
	.left-container {
		position: relative;
		height: 83vh;
		min-width: 28rem;
	}
	
	.right-container {
		height: 78vh;
		overflow: auto;
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
	.information-scrollbar .vertical {
		overflow-y: hidden !important;
	}
	
	@media only screen and (max-width:1366px) {
		#components-container {
			height: 77vh !important;
			overflow: hidden !important;
		}
		.right-container {
			height: 69vh !important;
		}
		.left-container {
			height: 77vh !important;
		}
		.arrow-box {
			top: 47% !important;
			left: 7px !important;
		}
		.arrowIcon {
			top: 50% !important;
			left: 50% !important;
		}
		.information-scrollbar .vertical {
			overflow-y: hidden !important;
		}
	}
</style>