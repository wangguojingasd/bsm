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
            <div class="inputInfo">
                <div class="quesInput">
                    <div class="quesTxt">试题</div>
                    <editor-bar ref="ques" v-model="ques" :isClear="isClear" @change="change"></editor-bar>
                </div>
                <div class="ansInput">
                    <div class="ansTxt">答案</div>
                    <editor-bar ref="anw" v-model="anw" :isClear="isClear" @change="change"></editor-bar>
                </div>
            </div>
           <div class="tjBtn" @click="xtinput(ques,anw,zj,nd,txsel)">提交</div>
        </div>
        <div class="warn" v-show="warnShow">
            <div class='warnBox'>
                <div class="text1">提示</div>
                <div class="text">{{msg}}</div>
                <div class="btn" @click="close()">确定</div>
            </div>
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
      warnShow:false,
      msg:''
    }
  },
  methods:{
    close () {
      this.warnShow = false
    },
    //输入的文本内容
    change(val) {
        this.text = val
    },
    getValuetx (e) {
        this.txsel = e.target.value
    },
    getValue (e) {
        this.zj = e.target.value
    },
    getValueNd (e) {
        this.nd = e.target.value
    },
    xtinput (que,anw,char,diff,type) {
        if(char == '' || type == '' || diff == ''|| que == '' || anw == ''){
            this.msg = '提交内容不能为空'
            this.warnShow = true
        }else{
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
                this.msg = res.data.msg
                this.warnShow = true
                if(res.data.code){
                    this.ques = ''
                    this.anw = ''
                }
            }).catch((e) => {
                this.msg = e
                this.warnShow = true
            })
        }
        
    }
  },
  mounted () {
      this.$axios({
        method: 'get',
        url: '/types/all',
      }).then((res) => {
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
    width:80%;
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
        padding-top: .1rem;
        .stsel{
            width:100%;
            height:.6rem;
            padding:.1rem .2rem 0 .2rem;
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
        .inputInfo{
            width:100%;
            height:4.7rem;
        }
        .quesInput{
            width:49%;
            height:100%;
            float: left;
            .quesTxt{
                width:100%;
                height:.3rem;
                font-size: .18rem;
                color:#333;
                text-align: center;
            }
        }
        .ansInput{
            width:49%;
            height:100%;
            float: right;
            .ansTxt{
                width:100%;
                height:.3rem;
                font-size: .18rem;
                color:#333;
                text-align: center;
            }
        }
        .tjBtn{
            width:.8rem;
            height:.3rem;
            margin: 0 auto;
            margin-top: .2rem;
            background: #7d8ef7;
            color:#fff;
            font-size: .18rem;
            text-align:center;
            line-height: .3rem;
            cursor: pointer;
        }
    }
    .warn{
        position: fixed;
        background: rgba(3,3,3,.3);// 解决子元素对父元素透明度的继承
        left:0;
        top:0;
        right:0;
        bottom:0;
        z-index: 999;
        .warnBox{
            width:4.4rem;
            height: 1.4rem;
            background: #fff;
            border-radius: 5px;
            border:1px solid #c3c3c3;
            position: absolute;
            top:0;
            left:50%;
            transform:translate(-50%,50%);
            padding:0 .2rem;
            .text1{
                width:100%;
                height:.2rem;
                font-size: .16rem;
                color: #000;
                margin-top: .16rem;
                margin-bottom: .14rem;
            }
            .text{
                width:100%;
                height:.2rem;
                font-size: .14rem;
                color: #333;
                margin-bottom: .14rem;
            }
            .btn{
                width:.7rem;
                height:.34rem;
                background: #5e76f3;
                font-size: .14rem;
                color: #fff;
                text-align: center;
                line-height: .34rem;
                border-radius: .05rem;
                float: right;
                cursor: pointer;
            }
        }
    }
}
</style>
