<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-03-08 23:38:28
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-03-09 22:44:45
-->
<template>
    <div style="padding:30px">
        <img :src="require('@/assets/screenPlay/lhs/person/赤脚医生/赤脚医生.jpg')" style="width:100%" alt="赤脚医生">
        <div v-html="data"></div>
    </div>
</template>

<script>
import data from '@/assets/screenPlay/lhs/person/赤脚医生/desc.js'
export default {
    components: {},
	props: {},
	data() {
		return {
            data:data
		};
	},
	watch: {},
	computed: {},
	created() {},
	mounted() {
        
    },
	methods: {
	},
};
</script>

<style>
</style>