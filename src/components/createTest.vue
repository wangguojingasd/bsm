<template>
    <div class="creAll">
        <div class="zjCon">
            <div class="stsel">
                <label for="">题型：</label>
                <p v-bind:key="index" v-for="(item,index) in txList"><input type="checkbox" @change="handleChange($event,index,item.name,1)">{{item.name}}</p>
            </div>
            <div class="stsel">
                <label for="">章节：</label>
                <p v-bind:key="index" v-for="(item,index) in zjList"><input type="checkbox" @change="handleChange($event,index,item.name,2)">{{item.name}}</p>
            </div>
            <div class="tjBtn" @click="skim()">提交</div>
        </div>
        <div class="testFen" v-show="fenShow">
            <table width="100%" cellspacing="0">
                <tbody>
                    <tr style="border:0">
                        <th>题型</th>
                        <th>本题总分</th>
                        <th>易</th>
                        <th>中</th>
                        <th>难</th>
                        <th>分值</th>
                    </tr>
                    <tr v-bind:key="index" v-for="(item,index) in seltxList">
                        <td>{{item.name}}</td>
                        <td>{{sinGrade[index]}}</td>
                        <td><input type="text" v-model=easy[index] @input="get($event,index)"></td>
                        <td><input type="text" v-model=mid[index] @input="get($event,index)"></td>
                        <td><input type="text" v-model=diff[index] @input="get($event,index)"></td>
                        <td><input type="text" v-model=points[index] @input="get($event,index)"></td>
                        <!-- input可以实时监测input数据的变化 @change只有在焦点改变时才会监测到 -->
                    </tr>
                </tbody>
            </table>
            <div class="testFenBtn">
                <div class="testTxt">试卷总分：<span>{{testGrade}}</span></div>
                <router-link to='' tag="div" class="skimBtn" @click.native="skimTest()">浏览试卷</router-link>
            </div>
        </div>
        <div class="del" v-show="delShow">
            <div class="delCon">
                <div class="editTop">
                    <div class="topTxt">提示</div>
                    <div class="topImg" @click="close()"><img src="../assets/close.png" alt=""></div>
                </div>
                <div class="deltxt">{{skimWord}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'createTest',
  data () {
    return {
      txList:[],
      zjList:[],
      seltxList:[],
      selzjList:[],
      zz:[0],
      fenShow: false,
      testGrade: 0,
      sinGrade:[0,0,0,0,0,0],
      easy:[0,0,0,0,0,0],
      mid:[0,0,0,0,0,0],
      diff:[0,0,0,0,0,0],
      points:[0,0,0,0,0,0],
      address:'',
      delShow:false,
      skimWord:'',
      arrcs:{},
      txsel:[]
    }
  },
  methods: {
    skim () {
        if(this.seltxList.length < 4){
            this.skimWord = '请至少选择4种题型',
            this.delShow = true
        }else{
            this.fenShow = true
        }
    },
    // 选择的题型和章节放到相应的数组中
    handleChange:function(e,id,name,i) {
      if(e.target.checked&&i==1){
        this.seltxList.push({name:name})
      }else if(e.target.checked&&i==2){
          this.selzjList.push({id:name})
      }else{ // 不选择的时候执行删除数组中元素
          if(i==1){
              this.del(name,this.seltxList)
          }else{
              this.del(name,this.selzjList)
          }
      }
    },
    // 多选框取消选择时执行
    del(name,arr){
        var index = arr.findIndex(item => {
            if ( item.name == name) {
            return true;
            }
        });
        arr.splice(index,1)
    },
    get(e,index){
        this.seltxList[index].simple = this.easy[index]
        this.seltxList[index].normal = this.mid[index]
        this.seltxList[index].difficult = this.diff[index]
        this.seltxList[index].score = this.points[index]
        // 每种题型的总分
        for(let i=0;i<this.seltxList.length;i++){
            this.sinGrade[i] = (Number(this.easy[i]) + Number(this.mid[i]) + Number(this.diff[i])) * Number(this.points[i])
        }
        // 试卷总分
        let a = 0
        for(let i=0;i<this.sinGrade.length;i++){
            a = a + Number(this.sinGrade[i])
        }
        this.testGrade = a
    },
    close () {
      this.delShow = false
    },
    //浏览试卷
    skimTest () {
        this.arrcs.charpter = this.selzjList // 对象中添加属性
        this.arrcs.type = this.seltxList 
        sessionStorage.setItem('arr',JSON.stringify(this.arrcs))
        sessionStorage.setItem('isSelectMin',0) //导航默认样式

        if(this.testGrade==0){
            this.skimWord = '请填写正确的试题数量和分值',
            this.delShow = true
        }else{
            this.$router.push('/skimTest')
        }
    },
  },
  mounted () {
      //获取题型
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
      //获取章节
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
.creAll{
    width:100%;
    height:91%;
    float: left;
    padding: .1rem;
    .zjCon{
        width:100%;
        height:38%;
        background: #e8e9fd;
        padding:.2rem;
        margin-bottom: .1rem;
        .stsel{
            width:100%;
            height:.3rem;
            background: #fff;;
            font-size: .16rem;
            color:#333;
            margin-bottom: .2rem;
            line-height: .3rem;
            padding: 0 .1rem;
            p{
                display: inline;
                margin-right: .1rem;
            }
            input{
                margin-right: .05rem;
            }
        }
        .tjBtn{
            width:.84rem;
            height:.3rem;
            background: #7d8ef7;
            text-align: center;
            line-height: .3rem;
            color:#fff;
            font-size: .16rem;
            margin-top: .3rem;
            float: right;
            cursor: pointer;
        }
    }
    .testFen{
        width:100%;
        height:auto;
        overflow: hidden;
        background: #e8e9fd;
        padding:.2rem;
        padding-bottom: 0;
        table{
            display: block;
            margin-bottom: .2rem;
            th{
                width:1.8rem;
                height:.4rem;
                font-size: .2rem;
                color:#fff;
                text-align: center;
                line-height: .4rem;
                background: #7d8ef7;
                font-weight: normal; // !important 优先使用
            }
            td{
                width:1.8rem;
                height:.4rem;
                background: #fff;
                font-size: .18rem;
                color:#333;
                text-align: center;
                line-height: .4rem;
                border: .01rem solid #e8e9fd;
                input{
                    display: block;
                    width: 1.5rem;
                    height: .3rem;
                    padding-left: .1rem;
                    box-sizing: border-box;
                    background: 0 0;
                    line-height: .32rem;
                    font-size: 16px;
                    color: #333;
                    border: 1px solid #e8e9fd;
                    margin:0 auto;
                }
            }
            td:last-child{
                border-right:0;
            }
        }
        .testFenBtn{
            width:100%;
            height:.3rem;
        }
        .testTxt{
            width:80%;
            height:.3rem;
            float: left;
            margin-bottom: .2rem;
            text-align: right;
            font-size: .2rem;
            color:#333;
        }
        .skimBtn{
            width:.84rem;
            height:.3rem;
            float: right;
            background: #7d8ef7;
            text-align: center;
            line-height: .3rem;
            color:#fff;
            font-size: .16rem;
            float: right;
            cursor: pointer;
            margin-bottom: .16rem;
        }
    }
    .del{
        position: fixed;
        background: rgba(3,3,3,.3);// 解决子元素对父元素透明度的继承
        left:0;
        top:0;
        right:0;
        bottom:0;
        z-index: 999;
        .delCon{
            width:4.4rem;
            height:3rem;
            position: absolute;
            background: #7d8ef7;
            top:10%;
            left:50%;
            transform:translate(-50%,50%);
            .editTop{
                width:100%;
                height:.36rem;
                margin-bottom: .2rem;
                .topTxt{
                    width: 80%;
                    height: 100%;
                    float: left;
                    font-size:.16rem;
                    color:#fff;
                    line-height: .36rem;
                    padding-left: .1rem;
                }
                .topImg{
                    width: 20%;
                    height:100%;
                    float: left;
                    padding-right: .05rem;
                    padding-top: .05rem;
                    cursor: pointer;
                    img{
                        display: block;
                        width:.2rem;
                        height: .2rem;
                        float: right;
                    }
                }
            }
            .deltxt{
                width:100%;
                height:.3rem;
                margin-top: .8rem;
                margin-bottom: .3rem;
                text-align: center;
                font-size: .2rem;
                color:#fff;
            }
        }
    }
}
</style>
