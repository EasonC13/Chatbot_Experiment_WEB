<template lang="">
    <div class="">
      <div class="container">
        <b-card title="說明" sub-title="" align="left">
            <b-card-text>
            你接下來即將與 {{bots_amount_total}} 個對象對話<br>

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
  name: 'instruction',
  components: {
    BCard, 
  },
  props: {
      bots: Array,
      bot_amount: Number
  },
  data () {
    return {
    }
  },
  computed: {
    bots_amount_total: function(){
        window.vm = this
        return this.bots.length * this.bot_amount
    }
  },
  mounted() {
    },
  methods: {
      next(){
          this.$emit("next")
      }
      
  }
}
</script>
<style lang="">
</style>