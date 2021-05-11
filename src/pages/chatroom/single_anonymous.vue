<template lang="">
    <div class="">
      
      <div class="row">
        <!-- <div class="col-sm" style="background-image: url('https://i.imgur.com/YsufPQH.png')"> -->
        <Chatroom 
        :bot="this.bot"
        :bot_amount="this.bot_amount"></Chatroom>
        <div class="col-sm">
          <div class=" overflow-hidden">
            
          </div>
          <h1>實驗提示</h1>
          One of three columns

          <div style="height: 100vh" v-if="true"></div>
        </div>
      </div>
    </div>
</template>
<script>
import chatroom from "./chatroom"
// 在這裡，會先從後端讀取使用者的隨機狀態，再把使用者轉送到對應的隨機狀態中
import { BCard} from 'bootstrap-vue'

export default {
  name: 'single_real_girl',
  components: {
    BCard, 
    "Chatroom": chatroom,
  },
  data () {
    return {
      
      bot: [{
        emotion: "positive",
        displayName: "",
        picture_url: "https://i.imgur.com/pqrLeJW.png"
      }],
      bot_amount: 1
    }
  },
  computed: {
    
  },
  mounted() {
    },
  methods: {
  }
}
</script>
<style lang="">
</style>