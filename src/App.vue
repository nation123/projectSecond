<template>
  <div id="app">
    <!-- <router-view /> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
      <!-- 利用activated,deactivated 两钩子处理详细的keepAlive-->
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
