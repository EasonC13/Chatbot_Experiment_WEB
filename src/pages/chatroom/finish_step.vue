<template lang="">
    <div class="">
      <div class="container" v-if="step=='fill_form'">
          <b-card title="說明" sub-title="" align="left">
              <b-card-text>
              恭喜您，您已完成聊天
              </b-card-text>
              <b-card-text>
              接下來要請您填寫本輪的使用體驗量表
              </b-card-text>

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
      <div class="container" v-if="step=='finish'">
        <b-card title="說明" sub-title="" align="left">
            <b-card-text>
            感謝您，您已完成本階段的實驗
            </b-card-text>
            <b-card-text>
            本實驗總共有 6 個階段，您目前還剩下 {{remain - 1}} 個。
            </b-card-text>

            

            <b-card-text>準備好後，請按「開始」</b-card-text>
            <button @click="next" class="card-link btn btn-primary">開始</button>
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

export default {
  name: 'finish_step',
  components: {
    BCard, 
  },
  props: {
      status: String
  },
  data () {
    return {
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
            this.step = 'finish'
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