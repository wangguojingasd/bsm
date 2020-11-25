<template>
    <div class="creAll">
        <div class="zjCon">
            <div class="stsel">
                <label for="">题型：</label>
                <p v-bind:key="index" v-for="(item,index) in txList"><input type="checkbox">{{item.txname}}</p>
            </div>
            <div class="stsel">
                <label for="">章节：</label>
                <p v-bind:key="index" v-for="(item,index) in txList"><input type="checkbox">{{item.zjId}}</p>
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
                    <tr v-bind:key="index" v-for="(item,index) in txList">
                        <td>{{item.txname}}</td>
                        <td>{{sinGrade}}</td>
                        <td><input type="text" ref="easy"></td>
                        <td><input type="text" ref="mid"></td>
                        <td><input type="text" ref="diff"></td>
                        <td><input type="text" ref="points"></td>
                    </tr>
                </tbody>
            </table>
            <div class="testTxt">试卷总分：<span>{{testGrade}}</span></div>
            <router-link :to="{path:'/skimTest'}" tag="div" class="skimBtn">浏览试卷</router-link>
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
        { zjId: '第2章', txname: '填空题', zjname: 'SQL Sever环境' }
        // { zjId: '第3章', txname: '判断题', zjname: 'T-SQL语言' },
        // { zjId: '第4章', txname: '简答题', zjname: '触发器及其管理'},
        // { zjId: '第5章', txname: '综合应用题', zjname: '存储过程及其管理' },
        // { zjId: '第6章', txname: '名词解释', zjname: '管理安全性'}
      ],
      fenShow: false,
      sinGrade: 0,
      testGrade: 0
    }
  },
  methods: {
    skim () {
      this.fenShow = true
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
        .testTxt{
            width:100%;
            height:.3rem;
            margin-bottom: .2rem;
            text-align: right;
            font-size: .2rem;
            color:#333;
        }
        .skimBtn{
            width:.84rem;
            height:.3rem;
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
