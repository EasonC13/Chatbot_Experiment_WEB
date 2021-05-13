<template>
    <div class="container">
    <b-card title="歡迎來到實驗平台" sub-title="使用說明">
        <b-card-text>
        恭喜您成功登入，您現在的帳號為 XXX
        </b-card-text>

        <b-card-text>本實驗旨在探討聊天機器人的設計與使用體驗關係之研究。</b-card-text>

        
        <a href="#" class="card-link btn btn-link">我有問題</a>
        <router-link to="/start" class="card-link btn btn-primary">開始實驗</router-link>
        <router-link to="/logout" class="card-link btn btn-link">登出帳號</router-link>

        <div v-if="true">
          <router-link to="/multi_anonymous" class="card-link btn btn-link">multi_anonymous</router-link>
          <router-link to="/single_anonymous" class="card-link btn btn-link">single_anonymous</router-link>
          <router-link to="/single_anime" class="card-link btn btn-link">single_anime</router-link>
          <router-link to="/single_real_boy" class="card-link btn btn-link">single_real_boy</router-link>
          <router-link to="/single_real_girl" class="card-link btn btn-link">single_real_girl</router-link>
        </div>
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