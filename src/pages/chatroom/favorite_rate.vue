<template lang="">
    <div class="">
      <div class="container">
        <b-card title="好感度測量" align="left" style="text-align: left;">
            <div v-if="phase=='pre_test'">
              <b-card-text>
                這是{{bot.displayName}}，你接下來聊天的對象。
              </b-card-text>
              <img :src="bot.picture_url" width="30%">
              <b-card-text><br>
                在開始前我們想知道你對他的好感度。
              </b-card-text>
            </div>
            <div v-if="phase=='post_test'">
              <b-card-text>
                這是{{bot.displayName}}，你剛剛聊天的對象。
              </b-card-text>
              <img :src="bot.picture_url" width="30%">
              <b-card-text><br>
                在結束後我們想知道你對他的好感度。
              </b-card-text>
            </div>
            <br>
            <h4>親近度指標</h4>

            <p>
            請輸入你認為你現在跟他的親近程度（1-7）。<br>
            數字與對應的圖片，請參考下圖的提示：</p>

            <img src="https://i.imgur.com/1N02iEe.png" width="100%">

            <div class="input-group mb-3">
              <div class="input-group-prepend">
              </div>
              <input type="text" class="form-control" placeholder="親近程度（數字 1 - 7）"
              aria-label="Default" aria-describedby="inputGroup-sizing-default"
              v-model="IOS_score">
            </div>
            
            <br>
            <h4>好感度評分</h4>
            <b-card-text>另外，如果給滿分是 100 分，你覺得你現在對他的好感度是幾分？</b-card-text>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
              </div>
              <input type="text" class="form-control" placeholder="好感度（數字 0 - 100 分）"
              aria-label="Default" aria-describedby="inputGroup-sizing-default"
              v-model="favorite">
            </div>
            <br>
            <p class="text-secondary">完成後，請按「下一步」</p>

            <b-card-text></b-card-text>

            
            <button @click="next" class="card-link btn btn-primary">下一步</button>
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
  name: 'favorite_rate',
  components: {
    BCard, 
  },
  props: {
      bot: Object,
      status: {
          type: String,
          default: "none"
      },
      phase: {
          type: String,
          default: "pre_test"
      },
  },
  data () {
    return {
        IOS_score: "",
        favorite: ""
    }
  },
  computed: {
    
  },
  mounted() {
      console.log("AAA")
    },
  methods: {
      next: function(){
          console.log("next")

          if(this.IOS_score == ""){
              alert("親近度不能為空")
              return 0
          }
          if(this.favorite == ""){
              alert("好感度不能為空")
              this.favorite = ""
              return 0
          }

          this.IOS_score = parseInt(this.IOS_score)
          this.favorite = parseInt(this.favorite)
          console.log(this.favorite == NaN)
          
          if(this.IOS_score.toString() == "NaN"){
              alert("親近度格式錯誤")
              this.IOS_score = ""
              return 0
          }
          if(this.favorite.toString() == "NaN"){
              alert("好感度格式錯誤")
              this.favorite = ""
              return 0
          }

          if(![1,2,3,4,5,6,7].includes(this.IOS_score)){
              this.IOS_score = ""
              alert("親近度分數須為 1 - 7 的數字")
              return 0
          }else if(this.favorite < 0 && this.favorite > 100){
              this.favorite = ""
              alert("好感度分數須為 1 - 100 的數字")
              return 0
          }
          axios({
            method: "POST",
            url: `https://chatbot.experiment.eason.tw/api/v1/rate/bot`, 
            headers: {
                    "accept": "application/json",
                    'Content-Type': 'application/json'
            },
            data: {
                "account": firebase.auth().currentUser.email,
                "status": this.status,
                "displayName": this.bot.displayName,
                "img_url": this.bot.picture_url,
                "phase": this.phase,
                "IOS_Score": this.IOS_score,
                "score_100": this.favorite
            },
            }).catch(function (error){
                alert("對不起，網路錯誤，請稍後再嘗試送出", error)
                return "error"
            })
            .then(response => {
                if(response == "error"){
                  return 0
                }
                this.$emit("finish")
            })
      }
  }
}
</script>
<style lang="">
</style>