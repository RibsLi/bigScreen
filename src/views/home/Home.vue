<template lang="pug">
.head 我是大标题
.content
  .column 左盒子
  .column
    .map
      .map-item(v-for="(item, index) in 4" :key="index" :class="{chart: index === 3}")
  .column 右盒子
</template>

<script setup>
import { getCurrentInstance, onMounted } from "vue"
import { chinaMap } from "common/china.js"
let { proxy } = getCurrentInstance()
onMounted(() => {
  let myChart = proxy.$echarts.init(document.querySelector(".map .chart"))
  proxy.$echarts.registerMap('chinaMap', chinaMap)
  let option = {
    geo: {
      map: "chinaMap",
    },
  }
  myChart.setOption(option)
  window.addEventListener("resize", function() {
    myChart.resize()
  })
})
</script>

<style lang="stylus" scoped>
.head
  width 100%
  height .5208rem
  line-height .5208rem
  text-align center
  font-size .2083rem
  color #fff
  background url(../../assets/images/head_bg.png) no-repeat top center
  background-size 100%, 100%
.content
  display flex
  margin .0521rem auto
  .column
    flex 3
    &:nth-child(1), &:nth-child(3)
      background-color #f00
    &:nth-child(2)
      flex 5
      .map
        position relative
        height 4.2188rem
        .map-item
          &:nth-child(1)
            width 2.7083rem
            height 2.7083rem
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
            background url(../../assets/images/map.png)
            background-size 100% 100%
            opacity 0.3
          &:nth-child(2)
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
            width 3.1rem
            height 3.1rem
            background url(../../assets/images/lbx.png)
            animation rotate1 15s linear infinite
            opacity 0.6
            background-size 100% 100%
          &:nth-child(3)
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
            width 2.9479rem
            height 2.9479rem
            background url(../../assets/images/jt.png)
            animation rotate2 10s linear infinite
            opacity 0.6
            background-size 100% 100%
.chart
  position absolute
  top 0
  left 0
  width 100%
  height 4.2188rem
@keyframes rotate1
  form
    transform translate(-50%, -50%) rotate(0deg)
  to
    transform translate(-50%, -50%) rotate(360deg)
@keyframes rotate2
  form
    transform translate(-50%, -50%) rotate(0deg)
  to
    transform translate(-50%, -50%) rotate(-360deg)
</style>
