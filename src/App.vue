<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-03-08 21:50:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-03-09 00:28:10
-->
<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import "./assets/css/common.css";
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.el-message {
  min-width: 300px !important;
}
.el-message-box{
  width: 80% !important;
}
</style>
