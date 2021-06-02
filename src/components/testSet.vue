<template>
    <div class="setCon">
        <div class="inputCon">
            <label for="">试卷名称：</label><input type="text" v-model="testName">
            <label style="margin-left:.5rem" for="">试卷等级：</label>
            <select name="" id="" @change='getValue($event)'>
                <option value="">请选择...</option>
                <option v-bind:key="index" v-for="(item,index) in setList" :value="item">{{setList[index]}}</option>
            </select>
        </div>
        <div class="addbtn" @click="proTest(testName,level)">生成试卷</div>
        <div class="del" v-show="delShow">
            <div class="delCon">
                <div class="text1">提示</div>
                <div class="text">{{msg}}</div>
                <div class="btn" @click="close()">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'testSet',
    data () {
        return {
            setList: ['甲', '乙', '丙', '重修'],
            testName:'',
            level:'',
            selZjList:[],
            selTxlist:[],
            arr:{},
            testList:[],
            arrTest:{},
            quandanwArr:[], // 一类题目存放数组
            quandanw:{}, // 题目对象
            delShow:false,
            msg:''
        }
    },
    methods:{
        close () {
            this.delShow = false
        },
        getValue (e) {
            this.level = e.target.value
        },
        // 生成试卷接口
        proTest(name,level){
            this.arrTest.paperName = name
            this.arrTest.paperLevel = level
            var k = 1
            for(var i in this.quandanw){
                var aa = i
                this.$set(this.arrTest,k+aa,this.quandanw[i]); //给对象动态添加属性
                k++;
            }
            this.$axios({
                method: 'post',
                url: '/papers/create',
                data:this.arrTest,
                headers:{
                    'Content-Type':'application/json'
                }
            }).then((res) => {
                this.testName = ''
                this.msg = '生成试卷成功'
                this.delShow = true
            }).catch((e) => {
                this.msg = '生成试卷失败'
                this.delShow = true
            })
            
        }
    },
    mounted () {
        //抽题组卷
        this.arr = sessionStorage.getItem('arr') //json格式
        this.$axios({
            method: 'post',
            url: '/papers/extract',
            data:this.arr,
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res) => {
            if(res.data.code == 1){
                // this.quandanw = []
                for(var i in res.data.list){ // i 对象的属性 res.data.list[i] 属性的值
                    var aa = i
                    this.quandanwArr = []
                    for(let j=0;j<res.data.list[i].length;j++){
                        this.quandanwArr.push(res.data.list[i][j])
                    }
                    this.$set(this.quandanw,aa,this.quandanwArr); //给对象动态添加属性
                    this.$emit('getMessage',this.quandanw); //传对象给父组件skimTest
                    sessionStorage.setItem("responseQ",JSON.stringify(this.quandanw)) //存对象必须转换成字符串再存
                }
            }else{
                alert(res.data.msg)
                this.$router.push('/createTest')
            }
            
        }).catch((e) => {
            console.log('数据请求失败')
        })
    }
}
</script>

<style scoped lang="scss">
.setCon{
    width:80%;
    height:100%;
    background: #e8e9fd;
    padding: .2rem;
    font-size: .16rem;
    color:#333;
    float: left;
    .inputCon{
        width:75%;
        height: 100%;
        float: left;
        input,select{
            width: 1.6rem;
            height: .26rem;
            padding-left: .1rem;
            box-sizing: border-box;
            background: 0 0;
            line-height: .3rem;
            font-size: 16px;
            color: #333;
            border: 1px solid #515151;
            margin:0 .1rem .2rem .1rem;
        }
    }
    .addbtn{
        width:.8rem;
        height:.3rem;
        float: left;
        background: #6c72f3;
        font-size: .16rem;
        color:#fff;
        text-align: center;
        line-height: .3rem;
        cursor: pointer;
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
            height: 1.4rem;
            background: #fff;
            border-radius: 5px;
            border:1px solid #c3c3c3;
            position: absolute;
            top:28%;
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
