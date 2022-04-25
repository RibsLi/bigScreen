<template lang="pug">
.test(@click="testClick") test
</template>

<script setup>
import { useRouter } from "vue-router";
let router = useRouter()
let testClick = () => router.push('/home')

</script>

<style lang="stylus" scoped>
.test
  width 200px
  height 200px
  background-color #f00
</style>
