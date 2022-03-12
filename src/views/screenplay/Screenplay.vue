<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-03-08 22:21:41
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-03-09 21:58:23
-->
<template>
  <div class="screenplay">
    <el-input class="search" placeholder="搜索剧本" v-model="searchInput">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <div class="content">
        <div class="item" v-for="(item,index) in list" :key="index" @click="toCreateRoom(item.dirName)">
            <img class="img" :src="require('@/assets/screenPlay' + item.img)" alt="">
            <div class="name">{{item.textName}}</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    components: {},
	props: {},
	data() {
		return {
            searchInput:'',
            list:[
                {
                    img:'/lhs/bg/bg.jpg',
                    textName:"老槐树",
                    dirName:'lhs',
                }
            ]
		};
	},
	watch: {},
	computed: {},
	created() {},
	mounted() {},
	methods: {
        toCreateRoom(url){
            this.$router.push({ path: '/'+url, query: { type: 'createRoom' }})
            // this.$router.push('/'+url)
        }
    },
};
</script>

<style lang="scss">
.screenplay{
    padding: 15px 15px;
    .search{
        position: fixed;
        top: 15px;
        width: calc(100% - 30px);
    }
    .content{
        margin-top: 50px;
        font-size: 0px;
        .item{
            width: 43%;
            display: inline-block;
            vertical-align: top;
            margin: 3%;
            border: 1px solid #dddddd;
            padding: 14px;
            border-radius: 0px;
            box-sizing: border-box;
            .img{
                width: 100%;
            }
            .name{
                margin-top: 10px;
                font-size: 14px;
                text-align: center;
            }
        }
    }
}
</style>