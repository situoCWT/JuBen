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
    <div class="content">
        <div class="item" v-for="(item,index) in list" :key="index" @click="toCreateRoom(item.dirName)">
            <img class="img" :src="require('@/assets/screenPlay' + item.img)" alt="">
            <div class="name">{{item.textName}}</div>
        </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex';
export default {
  components: {},
	props: {},
	data() {
		return {
				list:[]
		};
	},
	watch: {},
	computed: {
		...mapState(['ws'])
	},
	created() {},
	mounted() {
		//获取剧本
		if(this.ws){
			this.ws.send(JSON.stringify({msg:'',type:'getRoom'}))
			this.ws.onmessage=(e)=>{
				let data = JSON.parse(e.data);
				if(data.type == 'getRoom'){
						this.list = JSON.parse(data.msg)
						console.log(this.list)
				}
			}
		}
	},
	methods: {
		toCreateRoom(url){
				this.$router.push({ name: '/'+url, params: { type: 'joinRoom' }})
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