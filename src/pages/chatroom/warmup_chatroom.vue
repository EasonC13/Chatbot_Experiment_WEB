<template lang="">
    <div class="col-sm" style="background-color: rgb(250,250,250);">
          <div class="chatroom_chat_container overflow-scroll">

       
        <!-- 使用 Telegram 樣式 -->
        <div class="cu chat" data-style="telegram" id="chatroom">
            <div class="message text" v-for="(item, index) in already_messages" :key="'test'+index">
                <!-- 大頭貼 -->
                <div class="avatar">
                    <img src="https://i.imgur.com/OGPH5eF.png"/>
                </div>
                <!-- 內容 -->
                <div class="content">
                    <!-- 傳訊者 -->
                    <div class="author">
                        陳怡升
                    </div>
                    <!-- 文字 -->
                    <div class="text" style="text-align:left;">
                        <p>你好，我是實驗的執行者 Eason<br>
                        現在是暖身階段。<br><br>
                        我們要確保你熟悉聊天室的操作<br>
                        請輸入十次任意內容<br>完成本階段。</p>
                    </div>
                    <!-- 中繼資料 -->
                    <div class="meta">
                        <div class="item">
                            --:--
                        </div>
                    </div>
                </div>
            </div>
            <div class="message text" :class="{right: message.right, read: message.right}" v-for="(message, index) in messages" 
             :key="index" :id='message.random_id'>
                <!-- 大頭貼 -->
                <div class="avatar">
                    <img :src="message.author_img"/>
                </div>
                <!-- 內容 -->
                <div class="content">
                    <!-- 傳訊者 -->
                    <div class="author">
                        {{message.author}}
                    </div>
                    <!-- 文字 -->
                    <div class="text" style="text-align:left;">
                        <p v-for="(text, index) in message.text.split('\n')">{{text}}</p>
                    </div>
                    <!-- 中繼資料 -->
                    <div class="meta">
                        <div class="item">
                            {{message.displaytime}}
                        </div>
                    </div>
                </div>
            </div>
            <div id="msg_end" style="height: 5%" v-if="true"><p><br></p></div>
        </div>
        </div>
        <div id="input_area" v-if="can_chat">
            <div id="text_area">
                <div class="textarea" id="chatroom_div_text_area" role="textbox" contenteditable
                 ></div>
            </div>
            <div id="send_button" class="align-items-right" @click="send_msg">
                <i class="now-ui-icons ui-1_send"></i>
            </div>
        </div>
        <div id="input_area" v-if="can_chat==false">
            <button id="text_area"
             class="btn btn-primary"
             @click="move_next">進入下一階段</button>
        </div>
    </div>
</template>
<script>
const axios = require('axios');
const $ = require("jquery")
const Cookies = require("js-cookie")
import firebase from "firebase"

function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

let emotion_map_to_chinese = {
    "😃 Positive":"喜歡",
    "🤗 Empathic":"悲傷",
    "🥰 Lovely":"喜歡",
    "😤 Unfriendly":"噁心",
    "😡 Angry": "憤怒",
    "😂 Laughing": "開心"
}

let API_emotion_mapping = {'其它': 0, '喜歡': 1, '悲傷': 2, '噁心': 3, '憤怒': 4, '開心': 5}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class Message{
    constructor(text, author, author_img, isright = false) {
        this.text = text
        this.time = new Date();
        this.displaytime = this.time.getHours() + ":" + this.time.getMinutes()
        this.author = author
        this.author_img = author_img
        this.random_id = author_img + Math.random().toString(36).substring(7)
        this.right = isright;
    }
}

export default {
  name: 'warmup_chatroom',
  bodyClass: 'warmup_chatroom',
  components: {
  },
  props: {
      bot: Array,
      bot_amount: Number,
      max_round: {
          type: Number,
          default: 10
      },
      status: {
          type: String,
          default: "none"
      },
  },
  data () {
    return {
      user: 'pricean01@gmail.com',
      already_messages: [1],
      messages: [],
      round: 0,
      can_chat: true,
      can_send_msg: true,
    }
  },
  computed: {
    bots: function () {
        return Array(this.bot_amount).fill(this.bot).flat()
    }
      
  },
  mounted() {
        let vm = this
        window.vm = this
        document.getElementById("chatroom_div_text_area").focus()
        $("#chatroom_div_text_area").keypress(function(e){
            if(e.which == 13 && e.shiftKey){
                
            }else if(e.which == 13){
                e.preventDefault()
                vm.send_msg()
            }
        })
    },
  methods: {
    send_msg: function(){
            let target = document.getElementById("chatroom_div_text_area")
            let out_text = target.innerText
            if(out_text.length == 0){
                return 0
            }else if(this.can_chat == false){
                return 0
            }else if(this.can_send_msg == false){
                return 0
            }

            var enter = String.fromCharCode(10);
            out_text = replaceAll(out_text, enter, "\n")

            target.innerText = ""
            console.log("SEND", out_text)
            
            var profile = firebase.auth().currentUser
            
            let message = new Message(out_text, profile.displayName, profile.photoURL, true)

            console.log(profile, message)
            this.messages.push(message)
            this.scroll_to_msg(message)
            this.round += 1
            this.can_send_msg = false
            let vm = this

            if(this.round >= this.max_round){
                
                this.can_chat = false
                //alert("你已經用完聊天額度了")
            }
            
            // shuffle(this.bots)

            this.bots.forEach(bot => {
                console.log("EEE", bot)

                
                        
                        let text = `你已經聊了 ${this.round} 輪\n再聊 ${this.max_round-this.round} 輪可完成暖身`
                        let message = new Message(text, bot.display_name, bot.picture_url)
                        
                        
                        setTimeout(()=> {
                            this.messages.push(message)
                            this.can_send_msg = true
                            this.scroll_to_msg(message)
                            if(this.can_chat == false){
                                this.export_messages()
                            }
                        }, Math.random()*35)
            });
        },
        scroll_to_msg(message){
            setTimeout(()=> {
                
                let target = document.getElementById(message.random_id)
                target.scrollIntoView({behavior: "smooth", block: "end"})
                let target_rect = target.getBoundingClientRect()
                let text_area = document.getElementById("input_area")
                let text_area_rect = text_area.getBoundingClientRect()
                var overlap = !(target_rect.right < text_area_rect.left || 
                                target_rect.left > text_area_rect.right || 
                                target_rect.bottom < text_area_rect.top || 
                                target_rect.top > text_area_rect.bottom)
                console.log("overlap", overlap)
                
                if(overlap){
                  target.scrollIntoView({behavior: "smooth"})
                }
                
            }, 300)
        },
        export_messages: function(){
            

            var profile = firebase.auth().currentUser
            axios({
                        method: "POST",
                        url: `https://chatbot.experiment.eason.tw/api/v1/message`, 
                        headers: {
                                "accept": "application/json",
                                'Content-Type': 'application/json'
                        },
                        data: {
                            account: profile.email,
                            status: this.status,
                            messages: JSON.stringify(this.messages),
                        },
                    }).then(response => {
                        console.log("已經成功匯出訊息")
                    })
        },
        move_next: function(){
            this.$emit("chat_round_out")
        }

  }
}
</script>
<style lang="">
    #chatroom{
      height: 100%;
      padding-bottom: 11vh;
    }
    #chatroom_div_text_area{
        padding-top: 5px;
        min-height: 2em;
        line-height: 1.1;
    }
    #input_area{
        position: fixed;
        bottom: 0px;
        width: 50%;
        background-color: white;
        text-align: left;
    }
    #input_area > #text_area{
        width: 100%;
        min-height: 10vh;
        font-size: 2em;
    }
    #input_area > #text_area > br{
        padding-top: 1em;
    }
    #input_area > #send_button{
        position: absolute;
        right: 0px;
        top: 0px;
        height: 100%;
    }
    #input_area > #send_button > i{
        font-size: 3em;
    }
    .chatroom_chat_container{
        height:100% !important;
    }
    .input,
    .textarea {
    border: 1px solid #ccc;
    font-family: inherit;
    font-size: inherit;
    padding: 1px 6px;
    }
    .textarea {
        display: block;
        width: 100%;
        overflow: hidden;
        resize: both;
        min-height: 40px;
        line-height: 20px;
        padding-right: 10%;
    }

    .textarea[contenteditable]:empty::before {
    content: "請輸入聊天內容";
    color: gray;
    } 
</style>