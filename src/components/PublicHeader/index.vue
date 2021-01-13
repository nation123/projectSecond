<template>
  <div class="base-header">
    <div class="btw header public-header w100 shadow center-col b-white">
      <div class="row align">
        <img
          class="curpoint"
          style="height:50px;margin:auto 10px; vertical-align: middle;"
          :src="curHeaderMessage.platformIcon"
          alt
          v-router="{ path: '/' }"
        />
        <div class="col hx-text">
          <span style="font-size:16px;margin-bottom:5px;font-weight:bold">{{
            curHeaderMessage.platformTitle
          }}</span>
          <span style="font-size:14px;color:#000;">{{
            curHeaderMessage.systemRemark
          }}</span>
        </div>
        <!-- <span style="height:60px;line-height:60px;text-align:center;color:#000;">{{title}}</span> -->
      </div>
      <div class="align row">
        <div class="mr-30">
          <HxNav v-if="navList" :navList="navList" :curCode="curCode"></HxNav>
        </div>
        <div class="right-menu" v-if="username">
          <el-dropdown class="avatar-container" trigger="hover">
            <div class="avatar-wrapper row">
              <p style="margin:0 10px;">{{ username }}</p>
              <img
                src="../../assets/images/icon_user.png"
                class="user-avatar"
              />
              <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown" class="user-dropdown">
              <el-dropdown-item>
                <span style="display:block;" v-router="{ path: '/home' }"
                  >个人主页</span
                >
              </el-dropdown-item>
              <el-dropdown-item>
                <span style="display:block;" @click="logout">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <el-button
          v-else
          type="primary"
          size="mini"
          @click="dialogLoginVisible = true"
          >登录管理平台</el-button
        >
      </div>
    </div>

    <el-dialog title="登录" width="600px" :visible.sync="dialogLoginVisible">
      <el-form
        autocomplete="on"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="left"
        label-width="0px"
        class="card-box login-form"
      >
        <!--todo 测试用-->
        <div class="col start" style="text-align: left;">
          常用测试账号，点击填充
          <div>
            <el-link
              class="mt-20"
              type="primary"
              @click="
                () => {
                  loginForm.phone = '18026386230';
                  loginForm.password = '123456';
                }
              "
            >
              18026386230————超管
            </el-link>
          </div>
          <div>
            <el-link
              class="mt-20"
              type="primary"
              @click="
                () => {
                  loginForm.phone = '13413400002';
                  loginForm.password = '123456';
                }
              "
            >
              13413400002————机电老师
            </el-link>
          </div>
          <div>
            <el-link
              class="mt-20"
              type="primary"
              @click="
                () => {
                  loginForm.phone = '13427523529';
                  loginForm.password = '123456';
                }
              "
            >
              13427523529————演示老师
            </el-link>
          </div>
          <div>
            <el-link
              class="mt-20"
              type="primary"
              @click="
                () => {
                  loginForm.phone = '13802725555';
                  loginForm.password = '123456';
                }
              "
            >
              13802725555————jacob
            </el-link>
          </div>
          <div class="mb-20"></div>
        </div>

        <el-form-item prop="phone">
          <span class="svg-container svg-container_login">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            v-model="loginForm.phone"
            placeholder="请输入账号"
            autocomplete="on"
          />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password"></svg-icon>
          </span>
          <el-input
            type="password"
            placeholder="请输入密码"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.password"
            autocomplete="on"
          ></el-input>
        </el-form-item>
        <el-form-item class="btw borderNone bigButton">
          <el-button
            type="primary"
            style="width: 240px;height: 40px;"
            :loading="loading"
            @click.native.prevent="handleLogin"
            >登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { setSeArrCache } from "_u/cache";

export default {
  data() {
    return {
      navList: [],
      curCode: "project-management",
      curHeaderMessage: {},
      loading: false,
      dialogLoginVisible: false,
      loginForm: {
        phone: "",
        password: ""
      },
      loginRules: {
        phone: [
          {
            required: true,
            trigger: "blur",
            message: "请输入手机号"
          }
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "请输入密码"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["avatar", "username"])
  },
  mounted() {
    this.getNavList();
  },
  methods: {
    getNavList() {
      let _this = this;
      _this.$api.c.rscenter.getRscenterApiV1PlatformSystemList().then(res => {
        _this.navList = res.data;
        res.data.map(v => {
          if (v.systemCode === _this.curCode) {
            _this.curHeaderMessage = v;
            // setSeArrCache('systemMessage',v)
            document.title = v.systemRemark || "后台系统";
          }
        });
      });
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      location.reload(); // 为了重新实例化vue-router对象 避免bug
    },

    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(data => {
              this.loading = false;
              this.dialogLoginVisible = false;
              this.$message({
                message: "登录成功",
                type: "success"
              });
              setTimeout(() => {
                location.reload();
              }, 600);
              // this.$router.push({
              //   path: this.redirect || "/",
              //   query: this.otherQuery
              // });
              // this.$router.push({ path: "/" });
            })
            .catch(e => {
              this.loading = false;
              // this.$confirm(e)
              //   .then(_ => {})
              //   .catch(_ => {});
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
$bg: #f0f2f5;
$dark_gray: #72b7ff;
$light_gray: #000000;
.base-header {
  .public-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background: #fff;
    .header {
      width: 100%;
      margin: 0 auto;
      align-items: center;
      font-size: 22px;
      height: 60px;
      color: #363636;
      background: #fff;
      padding: 0 20px;
    }

    .right-menu {
      /*float: right;*/
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }

  .el-input__inner {
    border: none;
  }
  .school-news {
    margin: 10px 0%;
    width: 100%;
  }
  .flex-base {
    flex: 0 0 48%;
    margin: 10px 1%;
    overflow: hidden;
  }
  .item {
    font-size: 14px;
    margin-bottom: 5px;
    color: #666;
    cursor: pointer;
    &:hover {
      color: skyblue;
    }
  }
  .fixcss {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  .header {
    width: 100%;
    margin: 0 auto;
    align-items: center;
    font-size: 22px;
    height: 60px;
    color: #363636;
    background: #fff;
    padding: 0 20px;
  }

  .wrap-body {
    width: 80%;
    min-width: 720px;
    margin: 20px auto;
    position: relative;
  }

  .box-card {
    background: white;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;

    &_login {
      font-size: 20px;
    }
  }

  .login-form {
    width: 60%;
    padding: 15px 15px;
    margin: 0 auto;
  }

  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: $light_gray;
    height: 47px;
  }

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }
  .el-form-item {
    border: 1px solid rgba(16, 16, 16, 0.5);
    background: rgba(0, 0, 0, 0);
    border-radius: 5px;
    color: #454545;
  }

  .borderNone {
    border: none;
    background: none;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
  }

  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }

  .notice_item {
    display: flex;
    width: 100%;
    flex-direction: row;
    margin-bottom: 2px;
    margin-top: 2px;
    align-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dfdfdf;
    div {
      width: 100%;
    }
    .item_time {
      padding: 0 5px;
      line-height: 30px;
      color: #454545;
    }

    .item_title {
      line-height: 30px;
      flex: 1;
      color: #454545;
      margin-right: 20px;
    }
  }

  .common-copy-right {
    font-size: 13px;
    color: #999;
  }
}
</style>
