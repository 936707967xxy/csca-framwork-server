<template>
	<div class="components-container Contract-information-scrollbar" id="components-container">
		<el-select v-model="imgType" placeholder="请选择影像类型" style="margin-bottom:20px;background:#777;" size="mini" @change="changeImgType">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
			</el-option>
		</el-select>
		<split-pane v-on:resize="resize" :min-percent='35' :default-percent='0' split="vertical">
			<template slot="paneL">
				<div class="left-container" :default-percent='100' ref="paneLbox">
					<div id="images">
						<img src="../../assets/image/default.png" alt="No Image"/>
					</div>
				</div>
			</template>
			<template slot="paneR">
				<div class="right-box" ref="paneRbox">
					<div class="arrow-box" @click="toggleIcon">
						<div :class="{'fa fa-angle-left arrowIcon':!init,'fa fa-angle-right arrowIcon':init}" ref="arrowIcon"></div>
					</div>
					<!-- 数据展示区域 -->
					<el-tabs v-model="activeName" type="card" style="padding-left: 10px;">
						<el-tab-pane label="资料修改" name="first">
							<div class="right-container">
								<update-info :apply-id="applyId"></update-info>
							</div>
						</el-tab-pane>
						<el-tab-pane label="认证清单" name="six">
							<div class="right-container">
								<audit-list :apply-id="applyId"></audit-list>
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
	import UpdateInfo from '@/components/supplement/UpdateInfo.vue'
	import AuditList from '@/common/display/AuditList.vue'
	import { imgType, getImgTypeLabel } from '../../utils/imagetype.js'
	import { queryPostJson } from '../../apis/httpapis.js'
	import {
		findById
	} from '@/apis/httpapis'
	import CallRecords from '@/common/display/CallRecords.vue'

	//注册组件
	Viewer.setDefaults({
		inline: true,
		fullscreen: true,
		button: true
	})
	//console.info("#####   " + document.getElementById('images-id'))
	export default {
		name: 'preaudit',
		data() {
			return {
				init: true, //切换button的class样式
				applyId: '', //571b6c1d22ea4ea69adc68355ac6ad9b
				activeName: 'first',
				textarea: '',
				imgType: 5,
				imgData: [],
				options: [],
				viewer_: null
			}
		},
		components: {
			splitPane,
			UpdateInfo,
			AuditList,
		},
		created() {
			this.applyId = this.$route.params.applyId;
			//console.log("applyId...:" + this.applyId);
			findById("/sys/annex/imgtype.do").then(response => {
				var imgType = response.data;
				this.options = imgType;
			});
			this.changeImgType();
		},
		mounted: function() { //viewerData

			//console.info(viewer);
		},
		methods: {
			resize(percent) {

			},
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
					document.getElementById('images').innerHTML = "<img src='./front-design/image/default.png' alt='No image'/>";
					// let img = {};
					// img.imgSrc = "../../src/assets/image/1.png";
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
					var images = document.getElementById('images').childNodes
					for(var i = 0; i < images.length; i++) {
						var _this = this.viewer_
						images[i].onerror = function() {
							this.onerror = null;
							this.src = "./front-design/image/404.png";
							_this.update()
						}
					}
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
		height: 80vh;
		min-width: 28rem;
	}
	
	.right-container {
		/*background-color: #FCE38A;line-height:780px;*/
		height: 74vh;
		overflow: auto;
	}
	
	#images {
		display: none;
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
	@media only screen and (max-width:1366px) {
		.Contract-information-scrollbar .vertical {
			overflow-y: hidden !important;
		}
		#components-container {
			height: 78vh !important;
			overflow: hidden !important;
		}
		.right-container {
			height: 63vh !important;
		}
		.left-container {
			height: 72vh !important;
		}
		.arrow-box {
			top: 45% !important;
			left: 7px !important;
		}
		.arrowIcon {
			top: 46% !important;
			left: 46% !important;
		}
	 #components-container .el-card {
			width: 1111px !important;
		}
	}
</style>