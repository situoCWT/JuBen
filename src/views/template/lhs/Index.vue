<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-03-09 00:20:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-03-11 00:04:00
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-03-09 00:20:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-03-09 22:00:35
-->
<template>
  <div class="lhs">
      <div v-if="data && data.userList" class="content">
        <div class="item" v-for="(item,index) in data.userList" v-show="!item.isDm || (item.isDm && isDm)" :key="index" @click="selectUser(item)">
            <img class="img" :src="require('@/assets/screenPlay/lhs/person' + item.img)" :alt="item.name">
            <div class="name">{{item.name}}</div>
            <div class="select">{{item.user}}</div>
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
            isDm:window.localStorage.getItem('role') == 'DM'?true:false,
            data:null,
            userinfo:localStorage.getItem('jubenshaUser'),
		};
	},
	watch: {},
	computed: {
        ...mapState(['ws'])
    },
	created() {},
	mounted() {
        console.log(this.ws)
        console.log(this.$route.query)
        if(this.ws){
            if (this.$route.query.type && this.$route.query.type == 'createRoom') {
                this.ws.send(JSON.stringify({name:"lhs",user:this.userinfo,type:'createRoom'}))
            }else if(this.$route.query.type && this.$route.query.type == 'joinRoom'){
                this.ws.send(JSON.stringify({name:"lhs",user:this.userinfo,type:'join'}))
            }
            this.ws.onmessage=(e)=>{
                let data = JSON.parse(e.data);
                if(data.type == 'info'){
                    this.$message(data.msg)
                }else if(data.type == 'userSelect'){
                    this.$message({message:data.msg,type:'success'})
                    this.data = data.data;
                }else if(data.type == 'error'){
                    this.$message({message:data.msg,type:'error'})
                }else if(data.type == 'update'){
                    this.data = data.msg
                }
            }
        }
    },
	methods: {
        selectUser(item){
            if(this.ws){
                this.ws.send(JSON.stringify({name:"lhs",user:this.userinfo,type:'selectUser',person:item.name}))
            }
        }
    },
}
</script>

<style lang="scss">
.lhs{
    .content{
        margin-top: 20px;
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
            .select{
                margin-top: 10px;
                font-size: 14px;
                text-align: center;
                color: #aaaaaa;
            }
            
        }
    }
}
</style>
