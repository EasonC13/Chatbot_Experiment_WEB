<template>
    <div class="container">
    <b-card title="歡迎" sub-title="實驗說明">
        <b-card-text>
        Some quick example text to build on the <em>card title</em> and make up the bulk of the card's
        content.
        </b-card-text>

        <b-card-text>A second paragraph of text in the card.</b-card-text>

        
        <a href="#" class="card-link btn btn-link">我有問題</a>
        <router-link to="/start" class="card-link btn btn-primary">開始實驗</router-link>
    </b-card>
    </div>

</template>
<script>
import { BCard} from 'bootstrap-vue'
export default {
  name: 'Intro',
  components: {
    BCard, 
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      user: 'pricean01@gmail.com'
    }
  },
  methods: {

  }
}
</script>
<style lang="">
    
</style>