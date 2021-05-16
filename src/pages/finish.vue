<template>
    <div class="container">
    <b-card title="實驗結束" sub-title="" class="text-right">
        <b-card-text>
        感謝你，你已經完成全部實驗。<br>
        實驗報酬將於兩週內轉帳，轉帳後將會以 Email 方式通知您！
        </b-card-text>
        <b-card-text>希望您能從中受益。</b-card-text>

        <b-card-text>如針對實驗有其他問題或建議，請透過電郵中提供的聯絡方式，與實驗執行者聯絡，謝謝你的配合。</b-card-text>


        <b-card-text><h3>補充：流程解釋</h3><p class="text-left">在剛剛的四輪對話中，你分別加入不同的聊天室與機器人對話，他們是控制組與實驗組。控制組是匿名頭像，或只有一組聊天對象。<br>實驗者想知道，比起對象不特定、單一回應，在聊天時，有特定對象或者提供多重回應，是不是會有更好的使用體驗？</p></b-card-text>

        <b-card-text><h3>為什麼聊天時，有特定對象會有較好體驗？</h3>此設計理念源自Pavlov (1927) 提出的古典制約。在 Pavlov 的實驗中，狗聽到鈴聲的刺激後會肚子餓。同樣的，在與聊天機器人互動時，如果能跟有好感的人物互動，將能激發使用者內部的正向情感，帶來較正向的使用體驗。（簡單來說，你開心時看什麼都開心）</b-card-text>
        <b-card-text><h3>為什麼聊天時，多回應會有較好的體驗？</h3>假設針對使用者的輸入 x，模型生成讓使用者滿意的回應的機率為 p(x)（在此假設為 0.7），則模型生成無法讓使用者滿意的回應的機率就是 1-p(x)（0.3），然而，本系統對於使用者的輸入，會一次生成並回傳五個不同的回應。因此，模型生成無法讓使用者滿意的回應的機率將為 (1-p(x))^5（0.3^5 = 0.00243），相較於單一回應的 1-p(x)，使用者收不到滿意的回應的機率將大幅降低，這是假設回應彼此獨立，且使用者僅關心多個回應之中，能否得到滿意回應之情況。</b-card-text>

        


        
        <button @click="alert('請透過電郵中提供的聯絡方式，與實驗執行者聯絡，謝謝你的配合')" class="card-link btn btn-link">我有問題</button>
        <router-link to="/logout" class="card-link btn btn-primary">結束實驗</router-link>
    </b-card>
    </div>

</template>
<script>

const axios = require('axios');
const $ = require("jquery")
import Cookies from "js-cookie"
import firebase from "firebase"

import { BCard} from 'bootstrap-vue'
export default {
  name: 'finish',
  components: {
    BCard, 
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