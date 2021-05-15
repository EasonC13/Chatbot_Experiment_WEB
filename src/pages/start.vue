<template lang="">
    <div class="container">
        <b-card title="正在分派下一個實驗任務" sub-title="請稍候，頁面馬上跳轉">
            <br>
        <b-card-text>
        如果等超過 30 秒，請重新登入系統，如重登入無效，請聯絡實驗方
        </b-card-text>

        <a href="#" class="card-link btn btn-link">聯絡實驗方</a>
    </b-card>
    </div>
</template>
<script>

const axios = require('axios');
const $ = require("jquery")
import Cookies from "js-cookie"
import firebase from "firebase"

// 在這裡，會先從後端讀取使用者的隨機狀態，再把使用者轉送到對應的隨機狀態中
import { BCard} from 'bootstrap-vue'
export default {
  name: 'start',
  components: {
    BCard, 
  },
  data () {
    return {
      user: firebase.auth().currentUser
    }
  },
  mounted: function(){
    axios({
      method: "GET",
      url: `https://chatbot.experiment.eason.tw/api/v1/status/user/${firebase.auth().currentUser.email}`, 
      headers: {
              "accept": "application/json",
              'Content-Type': 'application/json'
      },
    }).catch(function (error){
        alert("對不起，網路錯誤，請重新整理頁面")
        window.location.reload()
    })
    .then(response => {
        this.$router.replace(response.data.status);
    })
  }
}
</script>
<style lang="">
    
</style>