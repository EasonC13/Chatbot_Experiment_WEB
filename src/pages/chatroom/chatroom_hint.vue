<template lang="">
    <div class="col-sm">
          <div id="hint" class="container">
            <br>
            <h3>實驗提示</h3>
            <p>跟對方聊聊天吧</p>

            <p>目前你已經聊了 {{round}} 輪<br>再聊 {{remain}} 輪可以結束此輪聊天</p>
            
            <p>聊完十輪以後，會進入下一階段<br>在那之前請盡情的聊天吧！</p>

            <p class="text-secondary">
            如果有多個回應<br>請想像你在群組跟一群人聊天<br>
            如果對方沒有頭像與名字<br>是正常的，請繼續操作</p>

          </div>
    </div>
</template>
<script>
// 在這裡，會先從後端讀取使用者的隨機狀態，再把使用者轉送到對應的隨機狀態中
import { BCard} from 'bootstrap-vue'
const axios = require('axios');

export default {
  name: 'chatroom_hint',
  components: {
    BCard, 
  },
  props: {
  },
  data () {
    return {
        
    }
  },
  computed: {
      round: function(){
          return this.$route.query.round
      },
      remain: function(){
          return this.$route.query.max_round - this.$route.query.round
      }
    
  },
  watch: {

  },
  mounted() {
     
    },
  methods: {

  }
}
</script>
<style lang="">
#hint{
    position: fixed;
    text-align: left;
}
</style>