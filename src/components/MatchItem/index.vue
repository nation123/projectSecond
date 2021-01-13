<template>
  <div class="match-item m10" @click="onClick">
    <el-card :body-style="{ padding: '0px' }">
      <!-- <img
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        class="matpic"
      />-->
      <div class="mat-nav" style>
        <div class="mat-bg">
          <p style="font-size:20px;">{{item.name}}</p>
          <!-- <i v-if="item.status!==2" class="el-icon-setting setting" @click.stop="toSetting(item)"></i> -->
        </div>
        <div class="mt10 ph10 btw">
          <!-- <slot></slot> -->
          <div style="font-size:16px;color:#999;">
            <i class="el-icon-time"></i>
            {{item.startTime | formatSe}}
            <br>
            ~{{item.endTime | formatSe}}
          </div>
          <el-button type="primary" v-show="status(item)===0" size="mini" class="button" round>未开始</el-button>
          <el-button
            type="success"
            v-show="status(item)===1"
            size="mini"
            class="button"
            @click="onClick()"
            round
          >进行中</el-button>
          <el-button
            type="danger"
            v-show="status(item)===2"
            size="mini"
            class="button"
            round
            @click="onClick()"
          >已结束</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { nowInDateBetwen } from "_u/index";

export default {
  name: "MatchItem",
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  methods: {
    status(item) {
      return nowInDateBetwen(item.startTime, item.endTime);
    },
    onClick() {
      this.$emit("click");
    },
    // toSetting(item) {
    //   this.$router.push({
    //     name: "config",
    //     query: {
    //       id: item.id,
    //       matchName: item.name
    //     }
    //   });
    // }
  }
};
</script>

<style scoped lang="scss">
.match-item {
  flex: 0 0 23%;
  .matpic {
    width: 100%;
    height: 12vw;
  }

  .mat-nav {
    padding-bottom: 10px;
    padding-top: 0;
    overflow: hidden;
    width: 100%;

    > p {
      height: 50px;
      line-height: 25px;
      font-size: 14px;
    }
  }
  .mat-bg {
    height: 140px;
    // border-radius: 6px;
    text-align: justify;
    padding: 5px 10px;
    line-height: 26px;
    background-image: linear-gradient(
      156deg,
      #0d1d40 4%,
      #0f2455 55%,
      #122968 100%
    );
    color: #fff;
    overflow: hidden;
    position: relative;
  }
  .setting {
    position: absolute;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    right: 10px;
    bottom: 5px;
    cursor: pointer;
    font: 20px sans-serif;
  }
}
</style>
