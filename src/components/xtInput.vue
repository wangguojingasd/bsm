<template>
    <div class="inputAll">
        <div class="infoTit">
            <div class="titBox"></div>
            <div class="titIn">录入习题</div>
        </div>
        <div class="inputMain">
            <div class="stsel">
                <div class="inputCon">
                    <label for="">试题类型：</label>
                    <select name="" id="" @change='getValuetx($event)'>
                        <option value="">请选择...</option>
                        <option v-bind:key="index" v-for="(item,index) in txList" :value="item.name">{{item.name}}</option>
                    </select>
                    <label for="">试题章节：</label>
                    <select name="" id="" @change='getValue($event)'>
                        <option value="">请选择...</option>
                        <option v-bind:key="index" v-for="(item,index) in zjList" :value="item.name">{{item.name}}</option>
                    </select>
                    <label for="">难度：</label>
                    <select name="" id="" @change='getValueNd($event)'>
                        <option value="">请选择...</option>
                        <option v-bind:key="index" v-for="(item,index) in levList" :value="item">{{item}}</option>
                    </select>
                </div>
            </div>
            <div class="quesInput">
                <div class="quesTxt">试题</div>
                <editor-bar v-model="ques" :isClear="isClear" @change="change"></editor-bar>
            </div>
            <div class="ansInput">
                <div class="ansTxt">答案</div>
                <editor-bar v-model="anw" :isClear="isClear" @change="change"></editor-bar>
            </div>
           <div class="tjBtn" @click="xtinput(ques,anw,zj,nd,txsel)">提交</div>
        </div>
    </div>
</template>

<script>
import EditorBar from './wangEditor'
export default {
  name: 'xtinput',
  components:{
      EditorBar,
  },
  data () {
    return {
      text:'',
      isClear: false,
      levList: ['难', '中', '易'],
      txNum: '0',
      txList: [],
      zjList: [],
      ques:'',
      anw:'',
      txsel:'',
      zj:'',//章节名字
      nd:'',
    }
  },
  methods:{
    //输入的文本内容
    change(val) {
        this.text = val
        console.log(val)
    },
    getValuetx (e) {
        this.txsel = e.target.value
        console.log(this.txsel)
    },
    getValue (e) {
        this.zj = e.target.value
        console.log(this.zj)
    },
    getValueNd (e) {
        this.nd = e.target.value
        console.log(this.nd)
    },
    xtinput (que,anw,char,diff,type) {
        if(char == '' || type == ''){
            alert("题型章节不能为空")
        }else{
            console.log(que,anw)
            let formData = new FormData()
            formData.append('question', que)
            formData.append('answer', anw)
            formData.append('charpter', char)
            formData.append('difficulty', diff)
            formData.append('type', type)
            this.$axios({
            method: 'post',
            url: '/questions/add',
            data:formData
            }).then((res) => {
                if(res.data.code){
                    console.log('成功，数据是：', res)
                    this.ques = ''
                    this.anw = ''
                }else{
                    alert(res.data.msg)
                }
            }).catch((e) => {
                console.log('录入失败')
            })
        }
        
    }
  },
  mounted () {
      this.$axios({
        method: 'get',
        url: '/types/all',
      }).then((res) => {
        console.log('数据是：', res)
        for (let i = 0; i < res.data.length; i++) {
            this.txList.push(
                res.data[i]
            )
        }
      }).catch((e) => {
          console.log('数据获取失败')
      })
      this.$axios({
        method: 'get',
        url: '/charpters/all',
      }).then((res) => {
        console.log('数据是：', res)
        for (let i = 0; i < res.data.length; i++) {
            this.zjList.push(
                res.data[i]
            )
        }
      }).catch((e) => {
          console.log('数据获取失败')
      })
  }
}
</script>

<style scoped lang="scss">
.inputAll{
    width:60%;
    height:91%;
    float: left;
    padding: .1rem;
    .infoTit{
        width:100%;
        height: .2rem;
        .titBox{
            width:.02rem;
            height: .2rem;
            background: #7d8ef7;
            float: left;
            margin-right: .1rem;
        }
        .titIn{
            font-size: .16rem;
            color:#333;
        }
    }
    .inputMain{
        width:100%;
        height:98%;
        // background: #e8e9fd;
        overflow: hidden;
        padding:.2rem;
        padding-top: .1rem;
        .stsel{
            width:100%;
            height:.6rem;
            padding-top: .1rem;
            font-size: .18rem;
            color:#333;
            .inputCon{
                width:100%;
                height: 100%;
                float: left;
                select{
                    width: 1.6rem;
                    height: .3rem;
                    padding: 0 .1rem;
                    box-sizing: border-box;
                    background: 0 0;
                    line-height: .3rem;
                    font-size: 16px;
                    color: #333;
                    border: 1px solid #7b7b7b;
                    margin:0 .1rem .2rem 0;
                    direction: ltr;//字体超出省略号表示
                    text-overflow: ellipsis;//字体超出省略号表示
                    option{
                        direction: ltr;//字体超出省略号表示
                    }
                }
            }
        }
        .quesInput{
            width:100%;
            height:2.3rem;
            margin-bottom: .2rem;
            .quesTxt{
                width:7%;
                height:100%;
                float: left;
                font-size: .2rem;
                color:#333;
            }
            .quesBox{
                width:80%;
                height:100%;
                background: #fff;
                float: left;
            }
        }
        .ansInput{
            width:100%;
            height:2.3rem;
            margin-bottom: .2rem;
            .ansTxt{
                width:7%;
                height:100%;
                float: left;
                font-size: .2rem;
                color:#333;
            }
            .ansBox{
                width:80%;
                height:100%;
                background: #fff;
                float: left;
            }
        }
        .tjBtn{
            width:.8rem;
            height:.3rem;
            margin: 0 auto;
            margin-top: .1rem;
            background: #7d8ef7;
            color:#fff;
            font-size: .18rem;
            text-align:center;
            line-height: .3rem;
            cursor: pointer;
        }
    }
}
</style>
