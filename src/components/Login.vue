<template>
	<div class="login-box">
		<div class="login-header">
			<div class="logo">
			</div>
		</div>
		<div class="login-main">
			<div class="login-mainIn">
				<div class="logobg">
					<div class="bg">

					</div>
				</div>
				<div class="loginBox">
					<div class="login-system">销售管理系统</div>
					<div class="login-input">
						<el-form :model="loginForm" status-icon :rules="rulesLogin" ref="loginForm" label-width="48px" class="login-form">
							<el-form-item prop="number">
								<el-input type="text" v-model="loginForm.number" auto-complete="off" prefix-icon="fa fa-user-circle"></el-input>
							</el-form-item>
							<el-form-item prop="pass">
								<el-input type="password" v-model="loginForm.pass" auto-complete="off" @keyup.enter.native="submitForm('loginForm')" prefix-icon="fa fa-unlock-alt"></el-input>
							</el-form-item>
							<el-form-item class="submitBtn">
								<el-button @click="submitForm('loginForm')" class="loginBtn">登陆</el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</div>
		</div>
		<div class="login-footer">&copy;&nbsp;版权所有&nbsp;红上金融服务（上海）有限公司</div>
	</div>

</template>

<script>
	export default {
		name: 'Login',
		data() {
			var checkNumber = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('账号不能为空'));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					callback();
				}
			};
			return {
				loginForm: {
					number: '',
					pass: ''
				},
				rulesLogin: {
					number: [{
						validator: checkNumber,
						trigger: 'blur'
					}],
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {

					if(valid) {
						//登录
						this.$store.dispatch('LoginByNumber', this.loginForm).then(() => {

							this.$router.push({
								path: '/main'
							});
						}).catch(() => {

						})
					} else {
						// 方法的执行失败
						this.$alert('验证失败！', '提示', {
							confirmButtonText: '确定',
							type: 'warning'
						});
						return false
					}
				});

			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
		}
	}
</script>

<style scoped lang="scss">
	.login-box {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		background: url('../assets/background.png') center -40px;
		background-size: cover;
		padding-top: 94px;
		>.login-header {
			width: 100%;
			height: 7.5rem;
			padding-left: 8rem;
			box-sizing: border-box;
			>.logo {
				width: 365px;
				height: 68px;
				background: url('../assets/logonew.png') no-repeat;
				background-size: cover
			}
		}
		>.login-main {
			width: 100%;
			height: 24rem;
			min-height: 370px;
			background: #35363a;
			>.login-mainIn {
				display: flex;
				width: 1400px;
				height: 100%;
				margin: 0 auto;
				>.logobg {
					box-sizing: border-box;
					margin-right: -200px;
					position: relative;
				}
				>.loginBox {
					margin-left: 23rem;
					padding-top: 1.8rem;
					box-sizing: border-box;
					>.login-system {
						height: 80px;
						line-height: 80px;
						padding-left: 50px;
						font-size: 20px;
						font-family: "楷书";
						font-weight: bold;
						width: 100%;
						color: #fff;
					}
					.loginBtn {
						background: #c80010;
						border-color: #c80010;
						color: white;
						width: 18rem;
						height: 50px;
						font-size: 17px;
						box-shadow: black 4px 4px 4px;
					}
					.loginBtn:active {
						box-shadow: none;
					}
					.loginBtn:hover {
						opacity: 0.9
					}
				}
				>div {
					flex: 1;
					>.bg {
						position: absolute;
						top: 50%;
						right: -2rem;
						transform: translateY(-50%);
						width: 33rem;
						height: 18rem;
						background: url('../assets/bg.png') no-repeat;
						background-size: cover;
					}
				}
			}
		}
		>.login-footer {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 30px;
			text-align: center;
		}
	}
</style>
<style>
	input:-webkit-autofill {
		-webkit-text-fill-color: #979797 !important;
		-webkit-box-shadow: 0 0 0px 1000px #2a2b2d inset !important;
		-webkit-border-radius: 0px;
		-webkit-background-color: red;
	}
	
	.login-box .el-input {
		color: #979797;
		width: 21rem;
	}
	
	.login-box .el-input__inner {
		font-family: 'Times New Roman';
		letter-spacing: 2px;
		box-shadow: black 0px 0px 5px;
		border: none;
		font-weight: bold !important;
		width: 18rem !important;
		height: 45px !important;
		background-color: #2a2b2d !important;
		padding-left: 40px;
	}
	
	.login-box .el-form-item:first-of-type {
		margin-top: 1.8rem;
		margin-bottom: 2rem;
	}
	
	.login-box .el-form-item:last-of-type {
		margin-top: 2rem;
		margin-bottom: 1.5rem;
	}
	
	.login-box .el-form-item__error {
		padding-top: 10px;
	}
	
	.login-box .fa-user-circle:before {
		content: "\F2BD";
		font-size: 17px;
		line-height: 45px;
	}
	
	.login-box .fa-unlock-alt:before {
		font-size: 17px;
		line-height: 45px;
	}
	
	.login-box {
		height: 100%;
		height: auto;
		overflow: hidden !important;
	}
</style>