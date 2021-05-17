<template lang="">
    <div class="">
      <div class="container" v-if="step=='fill_form'" style="text-align: left">
          <b-card title="" sub-title="" align="left">
            <h2>事後解釋</h2>
            <b-card-text>
            感謝你完成實驗，這邊是關於本次實驗設計背後的理論與假設：
            </b-card-text>

            <b-card-text>本實驗旨在探討聊天機器人的設計與使用體驗關係之研究。以下是這次的實驗背後解釋。</b-card-text>

            <Debrief-Explain></Debrief-Explain>

            <b-card-text>再次感謝您參與實驗，希望您能從中受益。</b-card-text>

            <b-card-text>接下來要請你填寫事後回饋表單</b-card-text>

            

            <b-card-text>
            請於「受試者帳號（信箱）」欄位<br>輸入您的信箱 {{user_email}}
            </b-card-text>

            <div v-if="fill_step=='not_yet'">
            <button @click="open_form" class="card-link btn btn-primary">前往表單</button>
            </div>
            
            <div v-if="fill_step=='open'">
            <b-card-text>如果已經填寫完成，請按「下一步」</b-card-text>
            <button @click="open_form" class="card-link btn btn-secondary">再次前往表單</button>
            <button @click="finish_form" class="card-link btn btn-primary">下一步</button>
            </div>
            <div v-if="checking_form_fill">
            請稍候，系統正在確認你剛剛填寫的資料
            </div>
        
        </b-card>
      </div>
    </div>
</template>
<script>
// 在這裡，會先從後端讀取使用者的隨機狀態，再把使用者轉送到對應的隨機狀態中
import { BCard} from 'bootstrap-vue'
const axios = require('axios');
const $ = require("jquery")
const Cookies = require("js-cookie")
import firebase from "firebase"
import debrief_text from "./debrief_text"

export default {
  name: 'debrief',
  components: {
    BCard, 
    'Debrief-Explain': debrief_text,
  },
  props: {
  },
  data () {
    return {
        status: "post_experiment",
        remain: "",
        step: "fill_form",
        fill_step:'not_yet',
        form_url: "",
        checking_form_fill: false,
    }
  },
  computed: {
    bots_amount_total: function(){
        window.vm = this
        return this.bots.length * this.bot_amount
    },
    user_email: function(){
      return firebase.auth().currentUser.email
    }
  },
  mounted() {
      try{
        this.init()
      }catch(e){
        alert("網路錯誤，按下確定後重試")
        this.init()
      }
    },
  methods: {
      next(){
          this.$router.replace('start');
      },
      open_form(){
        window.open(this.form_url)
        this.fill_step = "open"
      },
      finish_form(){
        this.checking_form_fill = true
        axios({
          method: "GET",
          url: `https://chatbot.experiment.eason.tw/api/v1/user/${firebase.auth().currentUser.email}/isfill/form/${this.status}`, 
          headers: {
                  "accept": "application/json",
                  'Content-Type': 'application/json'
          },
        }).catch(function (error){
            alert("網路錯誤，請再試一次")
            return "error"
        })
        .then(response => {
          if(response=="error"){
              return 0
          }
          if(response.data.is_fill){
            this.user_move_next()
            this.$emit("finish")
          }else{
            alert("您尚未完成表單填寫！")
          }
        })
      },
      user_move_next(){
        axios({
          method: "PUT",
          url: `https://chatbot.experiment.eason.tw/api/v1/status/user/${firebase.auth().currentUser.email}`, 
          headers: {
                  "accept": "application/json",
                  'Content-Type': 'application/json'
          },
        }).catch(function (error){
            alert("網路錯誤，請再試一次")
            this.move_next()
            return "error"
        })
        .then(response => {
          if(response=="error"){
              return 0
          }
          this.$router.replace("start")
        })
      },
      init: function(){
        let vm = this
        axios({
          method: "GET",
          url: `https://chatbot.experiment.eason.tw/api/v1/status/user/${firebase.auth().currentUser.email}`, 
          headers: {
                  "accept": "application/json",
                  'Content-Type': 'application/json'
          },
        }).catch(function (error){
            alert("網路錯誤，按下確定後重試")
            vm.init()
            return "error"
        })
        .then(response => {
          if(response=="error"){
              return 0
          }
          vm.remain = response.data.remain.length
        })
      axios({
        method: "GET",
        url: `https://chatbot.experiment.eason.tw/api/v1/url/form/${this.status}`, 
        headers: {
                "accept": "application/json",
                'Content-Type': 'application/json'
        },
        }).catch(function (error){
          alert("網路錯誤，按下確定後重試")
          vm.init()
          return "error"
        })
        .then(response => {
          if(response=="error"){
              return 0
          }
          vm.form_url = response.data.url
        })
      }
      
  }
}
</script>
<style lang="">
</style>