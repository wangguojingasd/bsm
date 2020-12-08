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
                    <select name="" id="">
                        <option value="">请选择...</option>
                        <option v-bind:key="index" v-for="(item,index) in txList" value="">{{item.txname}}</option>
                    </select>
                    <label for="">试题章节：</label>
                    <select name="" id="">
                        <option value="">请选择...</option>
                        <option v-bind:key="index" v-for="(item,index) in txList" value="">{{item.zjname}}</option>
                    </select>
                    <label for="">难度：</label>
                    <select name="" id="">
                        <option value="">请选择...</option>
                        <option v-bind:key="index" v-for="(item,index) in levList" value="">{{item}}</option>
                    </select>
                </div>
            </div>
            <div class="quesInput">
                <div class="quesTxt">试题</div>
                <textarea class="quesBox"></textarea>
            </div>
            <div class="ansInput">
                <div class="ansTxt">答案</div>
                <textarea class="ansBox"></textarea>
            </div>
           <div class="tjBtn">提交</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'xtinput',
  data () {
    return {
      txList: [
        { txname: '单项选择题', zjname: '数据库基础概述好的海的', num1: '10', num2: '20', num3: '30' },
        { txname: '填空题', zjname: 'SQL Sever环境', num1: '10', num2: '20', num3: '30' },
        { txname: '判断题', zjname: 'T-SQL语言', num1: '10', num2: '20', num3: '30' },
        { txname: '简答题', zjname: '触发器及其管理', num1: '10', num2: '20', num3: '30' },
        { txname: '综合应用题', zjname: '存储过程及其管理', num1: '10', num2: '20', num3: '30' },
        { txname: '名词解释', zjname: '管理安全性', num1: '10', num2: '20', num3: '30' }
      ],
      levList: ['难', '中', '易'],
      txNum: '0'
    }
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
