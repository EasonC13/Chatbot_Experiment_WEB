<template>
    <div class="container">
    <b-card title="歡迎來到實驗平台" sub-title="使用說明" class="text-right">
        <b-card-text>
        恭喜您成功登入，您現在的帳號為 {{user_email}}<br>請確認此信箱與您報名時使用的 Email 相同
        </b-card-text>

        <b-card-text>本實驗旨在探討聊天機器人的設計與使用體驗關係之研究。</b-card-text>

        <b-card-text>在接下來的四輪對話中，你會分別加入不同的聊天室與機器人對話，並填寫量表評估成效。</b-card-text>

        <b-card-text>我們使用的聊天機器人採用最先進的 AI，因此請想像你在跟朋友用群組聊天，自然地說任何你想說的話即可。</b-card-text>

        <b-card-text>如針對實驗有問題、出現錯誤、彈出式視窗不斷跳出、系統沒有反應，請隨時透過信箱中提到的聯絡方式，聯絡實驗執行者</b-card-text>

        <b-card-text>按下「開始實驗」後，你將進入暖身階段，將進行十次對話，確保你熟悉系統操作。</b-card-text>

        
        <button @click="alert('請透過電郵中提供的聯絡方式，與實驗執行者聯絡，謝謝你的配合')" class="card-link btn btn-link">我有問題</button>
        <router-link to="/start" class="card-link btn btn-primary">開始實驗</router-link>
        <router-link to="/logout" class="card-link btn btn-link">切換帳號</router-link>

        <div v-if="false">
          <router-link to="/warm_up" class="card-link btn btn-link">warmup</router-link>
          <router-link to="/multi_anonymous" class="card-link btn btn-link">multi_anonymous</router-link>
          <router-link to="/single_anonymous" class="card-link btn btn-link">single_anonymous</router-link>
          <router-link to="/single_anime" class="card-link btn btn-link">single_anime</router-link>
          <router-link to="/multi_anime" class="card-link btn btn-link">multi_anime</router-link>
          <!-- <router-link to="/single_real_boy" class="card-link btn btn-link">single_real_boy</router-link>
          <router-link to="/single_real_girl" class="card-link btn btn-link">single_real_girl</router-link> -->
        </div>
    </b-card>
    </div>

</template>
<script>

const axios = require('axios');
const $ = require("jquery")
const Cookies = require("js-cookie")
import firebase from "firebase"

import { BCard} from 'bootstrap-vue'
export default {
  name: 'Intro',
  components: {
    BCard, 
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      user_email: firebase.auth().currentUser.email
    }
  },
  mounted: function(){
    axios({
      method: "POST",
      url: `https://chatbot.experiment.eason.tw/api/v1/user`, 
      headers: {
              "accept": "application/json",
              'Content-Type': 'application/json'
      },
      data: {
          account: firebase.auth().currentUser.email
      },
    }).catch(function (error){
        alert("對不起，網路錯誤，請重新登入")
        this.$router.replace('logout');
    })
    .then(response => {
        console.log("註冊成功", response)
    })
  },
  methods: {
    alert: function(text){
      alert(text)
    }
  }
}
</script>
<style lang="">
    
</style>