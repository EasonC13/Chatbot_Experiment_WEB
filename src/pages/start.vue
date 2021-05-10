<template lang="">
    <div class="container">
        <b-card title="正在分派下一個實驗任務" sub-title="請稍候，頁面馬上跳轉">
            <br>
        <b-card-text>
        如果等超過 30 秒，請重新登入系統，如重登入無效，請聯絡實驗方
        </b-card-text>

        <a href="#" class="card-link btn btn-link">聯絡實驗方</a>
    </b-card>
    </div>
</template>
<script>
// 在這裡，會先從後端讀取使用者的隨機狀態，再把使用者轉送到對應的隨機狀態中
import { BCard} from 'bootstrap-vue'
export default {
  name: 'start',
  components: {
    BCard, 
  },
  data () {
    return {
      user: 'pricean01@gmail.com'
    }
  },
  methods: {

  }
}
</script>
<style lang="">
    
</style>