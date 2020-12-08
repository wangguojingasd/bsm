<template>
    <div class="creAll">
        <div class="zjCon">
            <div class="stsel">
                <label for="">题型：</label>
                <p v-bind:key="index" v-for="(item,index) in txList"><input type="checkbox" @change="handleChange($event,index,item.txname,1)">{{item.txname}}</p>
            </div>
            <div class="stsel">
                <label for="">章节：</label>
                <p v-bind:key="index" v-for="(item,index) in txList"><input type="checkbox" @change="handleChange($event,index,item.zjId,2)">{{item.zjId}}</p>
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
                        <td><input type="text" v-model=easy[index] @input="get($event)"></td>
                        <td><input type="text" v-model=mid[index] @input="get($event)"></td>
                        <td><input type="text" v-model=diff[index] @input="get($event)"></td>
                        <td><input type="text" v-model=points[index] @input="get($event)"></td>
                        <!-- input可以实时监测input数据的变化 @change只有在焦点改变时才会监测到 -->
                    </tr>
                </tbody>
            </table>
            <div class="testFenBtn">
                <div class="testTxt">试卷总分：<span>{{testGrade}}</span></div>
                <router-link :to="{path:'/skimTest'}" tag="div" class="skimBtn">浏览试卷</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'createTest',
  data () {
    return {
      txList: [
        { zjId: '第1章', txname: '单项选择题', zjname: '数据库基础概述好的海的' },
        { zjId: '第2章', txname: '填空题', zjname: 'SQL Sever环境' },
        { zjId: '第3章', txname: '判断题', zjname: 'T-SQL语言' },
        { zjId: '第4章', txname: '简答题', zjname: '触发器及其管理'},
        { zjId: '第5章', txname: '综合应用题', zjname: '存储过程及其管理' },
        { zjId: '第6章', txname: '名词解释', zjname: '管理安全性'}
      ],
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
    }
  },
  methods: {
    skim () {
      this.fenShow = true
      var seltx = JSON.stringify(this.seltxList);
      sessionStorage.setItem('seltxList',seltx)
    },
    handleChange:function(e,id,name,i) {
      if(e&&i==1){
        this.seltxList.push({name})
      }else if(e&&i==2){
          this.selzjList.push({id,name})
      }else{
          this.del(name)
      }
    },
    del(name){
        var index = this.checkedData.findIndex(item => {
          if ( item == name) {
          return true;
        }
      });
        this.checkedData.splice(index,1)
    },
    get(e){
        for(let i=0;i<this.seltxList.length;i++){
            this.sinGrade[i] = (Number(this.easy[i]) + Number(this.mid[i]) + Number(this.diff[i])) * Number(this.points[i])
        }
        let a = 0
        for(let i=0;i<this.sinGrade.length;i++){
            a = a + Number(this.sinGrade[i])
        }
        this.testGrade = a
    }
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
}
</style>
