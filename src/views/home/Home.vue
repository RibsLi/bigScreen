<template lang="pug">
.content
  img.bg-img(src="~assets/images/bg.jpg")
  .head
    //- img.head-img(src="~assets/images/logo.png")
  
</template>

<script setup>

</script>

<style lang="stylus" scoped>
.content
  position relative
  width 100vw
  height 100vh
  overflow hidden
  .bg-img
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    z-index -1
  .head
    width 100%
    .head-img
      position absolute
      top 0
      left 50%
      transform translateX(-50%)
      width 100%

</style>
