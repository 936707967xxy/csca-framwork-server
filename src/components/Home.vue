<template>
	<el-container style="height:100%;position:absolute;width:100%;">
		<el-aside style="height:100%;" width="asideWidth" :class="{'activeAsideBox':!isCollapse,'unactiveAsideBox':isCollapse}">
			<el-menu :default-active="pathNow" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#324157" active-text-color="#20a0ff" text-color="#bfcbd9" router style="height:100%;">
				<template v-for="(item,index) in $store.getters.routers" v-if="!item.hidden">

					<el-menu-item :index="item.redirect" v-if="!item.dropdown">
						<i :class="item.meta.iconCls"></i>
						<span slot="title">{{item.meta.title}}</span>
					</el-menu-item>

					<el-submenu :index="index+''" v-else>

						<template slot="title">
							<i :class="item.meta.iconCls"></i>
							<span slot="title">{{item.meta.title}}</span>
						</template>

						<div v-if="item.children[0]== null || item.children[0].children == null">
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">
								<i :class="child.meta.iconCls"></i>
								<span>{{child.meta.title}}</span>
							</el-menu-item>
						</div>

						<div v-else>
							<el-submenu v-for="cld in item.children" :index="cld.path" :key="cld.path">
								<i :class="cld.meta.iconCls"></i>
								<span slot="title">{{cld.meta.title}}</span>

								<el-menu-item v-for="ci in cld.children" :index="ci.path" :key="cld.path+'/'+ci.path" v-if="!ci.hidden">
									<span>{{ci.meta.title}}</span>
								</el-menu-item>
							</el-submenu>
						</div>

					</el-submenu>

				</template>
			</el-menu>
		</el-aside>

		<el-container style="position:relative;">
			<!-- 导航 eef1f6-->
			<el-header style="height:60px;line-height:60px;background-color:#fff;">
				<el-col :span="16">
					<div class="tools" @click.prevent="collapse">
						<i class="fa fa-align-justify"></i>
					</div>
				</el-col>
				<el-col :span="4" class="userinfo">
					<el-dropdown trigger="hover">
						<span class="el-dropdown-link userinfo-inner"><img src="../assets/head.png" />{{sysUserName}}</span>
						<el-dropdown-menu slot="dropdown" style="margin-top:-10px;">
							<el-dropdown-item>我的消息</el-dropdown-item>
							<!-- <el-dropdown-item>设置</el-dropdown-item> -->
							<el-dropdown-item divided @click.native="changePwd">修改密码</el-dropdown-item>
							<el-dropdown-item divided @click.native="logOut">退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
			</el-header>

			<el-main>
				<div class="grid-content bg-purple-light">
					<!-- tags -->
					<tags-view class='tags-view-container' ref='scrollPane'>
						<router-link ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''" v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path">
							{{tag.title}}
							<span class='el-icon-close' @click='closeViewTags(tag,$event)'></span>
						</router-link>
					</tags-view>

					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
				<el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="40%">
					<el-form :model="pwdMode" ref="pwdMode" :rules="rules" size="small">
						<el-form-item label="原密码" prop="oldpwd">
							<el-input v-model="pwdMode.oldpwd" type="password"></el-input>
						</el-form-item>
						<el-form-item label="新密码" prop="newpwd">
							<el-input v-model="pwdMode.newpwd" type="password"></el-input>
						</el-form-item>
						<el-form-item label="新密码" prop="newCheckPass">
							<el-input v-model="pwdMode.newCheckPass" type="password"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="dialogFormVisible=false" size="small">取 消</el-button>
						<el-button type="primary" @click="onSubmit('pwdMode')" size="small">确 定</el-button>
					</div>
				</el-dialog>
			</el-main>
			 <el-footer style="height:40px;line-height:40px;background-color:#f3f3f4;">&copy; 版本所有 红上金融信息服务(上海)有限公司</el-footer>

		</el-container>
	</el-container>
</template>

<script>
import { getRequest, updateData } from "@/apis/httpapis";
import { removeToken } from "@/utils/auth";
import TagsView from "@/common/TagsView";

export default {
  components: {
    TagsView
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews;
    },
    sysUserName() {
      return this.$store.getters.empName;
    }
  },
  data() {
    var checkSamePwd = (rule, value, callback) => {
      console.log("newpwd" + this.newpwd);
      console.log("newpwd" + this.pwdMode.newpwd);
      if (this.pwdMode.newCheckPass != "" && this.pwdMode.newpwd != "") {
        if (this.pwdMode.newCheckPass == this.pwdMode.newpwd) {
          return callback();
        } else {
          return callback(new Error("两次输入密码不一致"));
        }
      } else {
        return callback();
      }
    };
    return {
      pathNow: "",

      asideWidth: 200,
      isCollapse: false,
      sysUserAvatar: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      pwdMode: {
        newpwd: "",
        oldpwd: "",
        newCheckPass: ""
      },
      newpwd: "",
      dialogFormVisible: false,
      rules: {
        oldpwd: [
          {
            required: true,
            message: "请输入原密码",
            trigger: "blur"
          }
        ],
        newpwd: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur"
          },
          {
            validator: checkSamePwd,
            trigger: "blur"
          }
        ],
        newCheckPass: [
          {
            required: true,
            message: "请再次输入新密码",
            trigger: "blur"
          },
          {
            validator: checkSamePwd,
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.checkRoute();
  },
  methods: {
    checkRoute() {
     this.pathNow = this.$route.path||"";
    },
    closeViewTags(view, $event) {
      this.$store.dispatch("delVisitedViews", view).then(views => {
        if (this.isActive(view)) {
          const latestView = views.slice(-1)[0];
          if (latestView) {
            this.$router.push(latestView.path);
          } else {
            this.$router.push("/");
          }
        }
      });
      $event.preventDefault();
    },
    generateRoute() {
      if (this.$route.name) {
        return this.$route;
      }
      return false;
    },
    addViewTags() {
      const route = this.generateRoute();
      if (!route) {
        return false;
      }
      this.$store.dispatch("addVisitedViews", route);
    },
    isActive(route) {
      return route.path === this.$route.path || route.name === this.$route.name;
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      //console.info(JSON.stringify(tags));
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag.$el);
            break;
          }
        }
      });
    },
    onSubmit() {
      console.log("submit!");
    },
    handleOpen() {
      //console.log('handleopen');
    },
    handleClose() {
      //console.log('handleclose');
    },
    handleselect: function(a, b) {},
    //退出登录
    logOut: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("FedLogOut").then(() => {
            this.$router.push({ path: "/login" });
            this.$message({
              type: "info",
              message: "登出成功,请重新登录!"
            });
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
        })
        .catch(() => {});
    },
    changePwd: function() {
      this.dialogFormVisible = true;
      this.pwdMode = {
        newpwd: "",
        oldpwd: "",
        newCheckPass: ""
      };
    },
    //折叠导航栏
    collapse: function() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.asideWidth = 200;
      } else {
        this.asideWidth = 64;
      }
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var url = "/web/emp/updatepwd.do";
          updateData(url, this.pwdMode).then(response => {
            var result = response.data;
            if (result.success) {
              this.$message({
                message: result.msg,
                type: "success" //success/warning/info/error
              });
              this.dialogFormVisible = false;
            } else {
              this.$message({
                message: result.msg,
                type: "warning"
              });
            }
          });
        } else {
          //console.log('数据格式错误或者未填写必要信息');
          return false;
        }
      });
    }
  },
  watch: {
    $route() {
      this.addViewTags();
      this.moveToCurrentTag();
    }
  },
  mounted() {
    this.addViewTags();
    var user = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.name || "";
      this.sysUserAvatar = user.avatar || "";
    }
  }
};
</script>
<style scoped>
.activeAsideBox {
  overflow-y: scroll;
}

.unactiveAsideBox {
  overflow: visible;
}

a {
  text-decoration: none;
}

.el-menu--collapse .el-submenu .el-menu {
  margin-left: 0;
  border-left: 0;
}

.content-wrapper {
  padding: 5px;
  background-color: #fff;
  position: relative;
  border-radius: 5px;
}

.breadcrumb-container {
  background-color: #fff;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-size: 14px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu-vertical-demo {
  border-right: 0px;
}

.tools {
  padding: 0px 23px;
  width: 14px;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
}

.userinfo {
  text-align: right;
  padding-right: 35px;
  float: right;
}

.userinfo .userinfo-inner {
  cursor: pointer;
  color: #555;
}

.el-aside::-webkit-scrollbar {
  width: 0em;
}

.el-main {
  padding: 0;
}

.userinfo .userinfo-inner img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 10px 0px 20px 10px;
  float: right;
}

</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu--collapse .el-submenu .el-menu {
  border: none;
  margin-left: 2px;
}
.tags-view-container {
  background: #fff;
  height: 34px;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &.active {
      background-color: #42b983;
      color: #fff;
      border-color: #42b983;
      &::before {
        content: "";
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 2px;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
.el-menu--collapse .el-submenu .el-menu {
  border: none;
  margin-left: 2px;
}
.tags-view-container {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
