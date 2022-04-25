<template lang="pug">
router-view
</template>

<script setup>
</script>

<style lang="stylus">
// 背景图
body
  background url(./assets/images/bg.jpg) no-repeat top center
// 字体
@font-face
  font-family electronicFont
  src url(./assets/fonts/DS-DIGIT.TTF)
/* 约束屏幕尺寸 */
@media screen and (max-width 1024px)
  html
    font-size 102.5px !important
@media screen and (min-width 1920px)
  html
    font-size 192px !important
</style>
