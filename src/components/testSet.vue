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
            quandanw:{} // 题目对象
        }
    },
    methods:{
        getValue (e) {
            this.level = e.target.value
        },
        // 生成试卷接口
        proTest(name,level){
            this.arrTest.paperName = name
            this.arrTest.paperLevel = level
            console.log('生成xccccc',this.quandanw)
            var k = 1
            for(var i in this.quandanw){
                var aa = i
                this.$set(this.arrTest,k+aa,this.quandanw[i]); //给对象动态添加属性
                k++;
            }
            console.log('sssssss',this.arrTest)
            this.$axios({
                method: 'post',
                url: '/papers/create',
                data:this.arrTest,
                headers:{
                    'Content-Type':'application/json'
                }
            }).then((res) => {
                console.log('成功')
            }).catch((e) => {
                console.log('失败')
            })
            
        }
    },
    mounted () {
        //抽题组卷
        this.arr = sessionStorage.getItem('arr') //json格式
        console.log(this.arr)
        this.$axios({
            method: 'post',
            url: '/papers/extract',
            data:this.arr,
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res) => {
            console.log('数据是：', res)
            console.log('数据是：', res.data.msg)
            if(res.data.code == 1){
                // this.quandanw = []
                for(var i in res.data.list){ // i 对象的属性 res.data.list[i] 属性的值
                    var aa = i
                    this.quandanwArr = []
                    for(let j=0;j<res.data.list[i].length;j++){
                        this.quandanwArr.push(res.data.list[i][j])
                    }
                    console.log(this.quandanwArr)
                    console.log(aa)
                    this.$set(this.quandanw,aa,this.quandanwArr); //给对象动态添加属性
                    console.log(this.quandanw)
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
}
</style>
