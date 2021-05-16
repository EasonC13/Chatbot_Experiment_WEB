<template lang="">
    <div class="">
      <Favorite
      :bots="this.bot.slice()"
      :status="this.name"
      phase="pre_test"
      @finish="step='instruction'"
      v-if="step=='pre_test'"></Favorite>

      <Instruction
      v-if="step=='instruction'"
      :bots="this.bot.slice()"
      :bot_amount="this.bot_amount"
      @next="step='chatting'"></Instruction>
      
      <div class="row" v-if="step=='chatting'">
        <!-- <div class="col-sm" style="background-image: url('https://i.imgur.com/YsufPQH.png')"> -->
        <Chatroom 
        :bot="this.bot"
        :bot_amount="this.bot_amount"
        :status="this.name"
        @next="step='post_test'"></Chatroom>

        <div class="col-sm">
          <div class=" overflow-hidden">
            
          </div>
          <h1>實驗提示</h1>
          One of three columns

          <div style="height: 100vh" v-if="true"></div>
        </div>
      </div>
      <Favorite
      :bots="this.bot.slice()"
      :status="this.name"
      phase="post_test"
      @finish="step='finish'"
      v-if="step=='post_test'"></Favorite>
      
      <Finish
      :status="this.name"
      v-if="step=='finish'"
      ></Finish>
    </div>
</template>
<script>
import chatroom from "./chatroom"
import process_fav_rate from "./process_fav_rate"
import instruction from "./instruction"
import finish_step from "./finish_step"
import { BCard} from 'bootstrap-vue'

export default {
  name: 'multi_anime',
  components: {
    BCard, 
    "Chatroom": chatroom,
    "Favorite": process_fav_rate,
    "Instruction": instruction,
    "Finish": finish_step,
  },
  data () {
    return {
      step: "finish",
      name: 'multi_anime',
      bot: [
      {
        emotion: "positive",
        displayName: "亞妮",
        picture_url: "https://i.imgur.com/3pNwzLd.jpg"//Annie
      },
      {
        emotion: "positive",
        displayName: "阿爾敏",
        picture_url: "https://i.imgur.com/8DwxCJE.png"//Armin
      },
      {
        emotion: "positive",
        displayName: "希斯特莉亞",
        picture_url: "https://i.imgur.com/IpJt01c.jpg"
      },
      {
        emotion: "positive",
        displayName: "艾連",
        picture_url: "https://i.imgur.com/eyMrLAJ.png"
      },
      {
        emotion: "positive",
        displayName: "萊納",
        picture_url: "https://i.imgur.com/ub1Dik7.png"
      },
      ],
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