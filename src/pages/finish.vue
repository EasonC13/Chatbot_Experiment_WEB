<template>
    <div class="container">
    <b-card title="" sub-title="" style="text-align: left">
      <h1>實驗結束</h1>
      <b-card-text>
      感謝你，你已經完成全部實驗。<br>
      實驗報酬將於兩週內轉帳，轉帳後將會以 Email 方式通知您！
      </b-card-text>
      <b-card-text>希望您能從中受益。</b-card-text>

      <b-card-text>如針對實驗有其他問題或建議，請透過電郵中提供的聯絡方式，與實驗執行者聯絡，謝謝你的配合。</b-card-text>


      <Debrief-Explain></Debrief-Explain>
      


      
      <button @click="alert('請透過電郵中提供的聯絡方式，與實驗執行者聯絡，謝謝你的配合')" class="card-link btn btn-link">我有問題</button>
      <router-link to="/logout" class="card-link btn btn-primary">結束實驗</router-link>
    </b-card>
    </div>

</template>
<script>

const axios = require('axios');
const $ = require("jquery")
const Cookies = require("js-cookie")
import firebase from "firebase"
import debrief_text from "./debrief_text"

import { BCard} from 'bootstrap-vue'
export default {
  name: 'finish',
  components: {
    BCard, 
    'Debrief-Explain': debrief_text,
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      user: firebase.auth().currentUser.email
    }
  },
  mounted: function(){
    
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