<template lang="">
    <div class="">
      <div v-if="display">
        <Rating
        :bot="current_bot"
        :status="status"
        :phase="phase"
        @finish="next"></Rating>
      </div>
    </div>
</template>
<script>
import favorite_rate from "./favorite_rate.vue"

export default {
  name: 'process_fav_rate',
  components: {
    "Rating": favorite_rate
  },
  props: {
      bots: Array,
      status: {
          type: String,
          default: "none"
      },
      phase: {
          type: String,
          default: "none"
      },
  },
  data () {
    return {
      current_bot: this.bots[0],
      display: true
    }
  },
  computed: {
    
  },
  mounted() {
      this.display = false
      let vm = this
      setTimeout(x => {vm.display = true}, 3)
      
      this.bots.shift()
      console.log(this.bots)
      console.log("status",this.status)
      console.log("phase",this.phase)
    },
  methods: {
    next: function(){
      let next_bot = this.bots.shift()
      if(next_bot){
        this.current_bot = next_bot
        this.display = false
        let vm = this
        setTimeout(x => {vm.display = true}, 3)
        
      }else{
        this.$emit("finish")
      }
    }
  }
}
</script>
<style lang="">
</style>