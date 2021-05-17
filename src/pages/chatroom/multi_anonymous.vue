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

        <Hint></Hint>
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
import chatroom_hint from "./chatroom_hint"
import { BCard} from 'bootstrap-vue'

export default {
  name: 'multi_anonymous',
  components: {
    BCard, 
    "Chatroom": chatroom,
    "Favorite": process_fav_rate,
    "Instruction": instruction,
    "Finish": finish_step,
    "Hint": chatroom_hint,
  },
  data () {
    return {
      step: "pre_test",
      name: 'multi_anonymous',
      bot: [{
        emotion: "positive",
        displayName: "",
        picture_url: "https://i.imgur.com/pqrLeJW.png"
      }],
      bot_amount: 5
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