<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-03-08 21:50:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-03-08 22:24:17
-->
<template>
  <div class="home">
    <el-button type="primary" @click="creatPlay">
      <div class="icon"><i class="el-icon-star-on"></i></div>
      创建房间
    </el-button>
    <el-button type="success" @click="toRooms">
      <div class="icon"><i class="el-icon-s-ticket"></i></div>
      加入房间
    </el-button>
  </div>
</template>

<script>
import websocket from "@/js/websocket";
import { mapState, mapActions } from "vuex";
export default {
  components: {},
  props: {},
  data() {
    return {
      userinfo: localStorage.getItem("jubenshaUser"),
    };
  },
  watch: {},
  computed: {
    ...mapState(["ws"]),
  },
  created() {
    websocket.Init(localStorage.getItem("jubenshaUser"));
    this.changeWs(websocket.getWebSocket());
    let inter = setInterval(() => {
      if (
        websocket.getWebSocket().readyState &&
        websocket.getWebSocket().readyState === 1
      ) {
        clearInterval(inter);
        websocket.getWebSocket().send(JSON.stringify({ user: this.userinfo, type: "checkInRoom" }));
        websocket.getWebSocket().onmessage = (e) => {
          let data = JSON.parse(e.data);
          if (data.type == "checkInRoom") {
            if (data.msg) {
              this.$confirm("您还有房间在游玩, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              })
							.then(() => {
								//进入房间
							})
							.catch(() => {
								websocket.getWebSocket().send(JSON.stringify({ user: this.userinfo, type: "exitRoom" }));
							});
            }
          }
        };
      }
    }, 100);
  },
  mounted() {},
  methods: {
    creatPlay() {
      this.$router.push("/screenplay");
    },
    toRooms() {
      this.$router.push("/rooms");
    },
    ...mapActions(["changeWs"]),
  },
};
</script>
<style lang="scss">
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .icon {
    margin-bottom: 15px;
    font-size: 26px;
  }
}
</style>