<template lang="">
    <div class="">
      
      <div class="row">
        <!-- <div class="col-sm" style="background-image: url('https://i.imgur.com/YsufPQH.png')"> -->
        <Chatroom 
        :bot="this.bot"
        :bot_amount="this.bot_amount"
        :status="this.name"
        @chat_round_out="finish"></Chatroom>
        <div class="col-sm">
          <div class=" overflow-hidden">
            
          </div>
          <h1>實驗提示</h1>
          本階段要確保你已經習慣聊天室操作<br>
          請輸入十次任意內容<br>
          完成暖身階段<br>

          <div style="height: 100vh" v-if="true"></div>
        </div>
      </div>
    </div>
</template>
<script>
import chatroom from "./warmup_chatroom"
import firebase from "firebase"

const axios = require('axios');
const $ = require("jquery")
import { BCard} from 'bootstrap-vue'

export default {
  name: 'single_real_girl',
  components: {
    BCard, 
    "Chatroom": chatroom,
  },
  data () {
    return {
      name: 'single_real_girl',
      bot: [{
        emotion: "positive",
        displayName: "",
        picture_url: "https://i.imgur.com/OGPH5eF.png"
      }],
      bot_amount: 1
    }
  },
  computed: {
    
  },
  mounted() {
    },
  methods: {
    finish: function(){
      //pop up window, said that is how you will do in experiment.
      axios({
        method: "PUT",
        url: `https://chatbot.experiment.eason.tw/api/v1/status/user/${firebase.auth().currentUser.email}`, 
        headers: {
                "accept": "application/json",
                'Content-Type': 'application/json'
        },
      }).catch(function (error){
          alert("對不起，網路錯誤，請重新登入")
          this.$router.replace('logout');
      })
      .then(response => {
          console.log("任務已完成", response)
          this.$router.replace("start")
      })
      
    }
  }
}
</script>
<style lang="">
</style>