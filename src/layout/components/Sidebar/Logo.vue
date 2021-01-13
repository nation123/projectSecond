<template>
  <div class="sidebar-logo-container curpoint" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <div v-if="collapse" key="collapse" class="sidebar-logo-link">
        <i class="el-icon-s-home"></i>
        <h1 class="sidebar-title">{{ title }}</h1>
      </div>
      <div v-else key="expand" class="sidebar-logo-link">
        <!-- <i class="el-icon-s-home"></i> -->
        <h1 class="sidebar-title tac">后台系统</h1>
      </div>
    </transition>
  </div>
</template>

<script>
import logo from "../../../assets/images/icon_logo.png";

export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: "首页",
      logo
    };
  }
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;
  font-size: 18px;

  & .sidebar-logo-link {
    width: 100%;
    height: 100%;
    position: relative;

    & i {
      width: 32px;
      height: 32px;
      float: left;
      margin: 15px 5px 0px 12px;
      vertical-align: middle;
      color: white;
    }

    & .sidebar-title {
      display: inline-block;
      float: left;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 16px;
      margin-left: 20px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
