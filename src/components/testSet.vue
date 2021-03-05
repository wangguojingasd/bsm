<template>
    <div class="setCon">
        <div class="inputCon">
            <label for="">试卷名称：</label><input type="text" v-model="testName">
            <label style="margin-left:.5rem" for="">试卷等级：</label>
            <select name="" id="" @change='getValue($event)'>
                <option v-bind:key="index" v-for="(item,index) in setList" :value="item">{{setList[index]}}</option>
            </select>
        </div>
        <div class="addbtn" @click="proTest(testName,level)">生成试卷</div>
    </div>
</template>

<script>
export default {
    name: 'testSet',
    data () {
        return {
            setList: ['请选择...','甲', '乙', '丙', '重修'],
            testName:'',
            level:'',
            selZjList:[],
            selTxlist:[],
            testList:[
                [
                    {type:'',id:'',question:'asfnsdkjngflsdkgndjsgnksdgnksdfgsd',answer:'11'},
                    {type:'',id:'',question:'nfbjsdkfnkdsfnhkdsfhksdjksdfhsdklhfksdhfkdshfdshfdsfhkdslfhsdlkhfkdshfklsdhfkdshfkldshfdsfjdshfldsfjlsdhfhdsklfhkdslsdfjksldfl;dsfjlsdfals;',answer:'22'},
                    {type:'',id:'',question:'sdfdsf',answer:'33'},
                ],
                [
                    {type:'',id:'',question:'1',answer:'44'},
                    {type:'',id:'',question:'2',answer:'55'},
                    {type:'',id:'',question:'3',answer:'6677'},
                ]
            ],
        }
    },
    methods:{
        getValue (e) {
            this.level = e.target.value
        },
        // 生成试卷接口
        proTest(name,level){
            let formData = new FormData()
            formData.append('paperName', name)
            formData.append('paperLevel', level)
            formData.append("list",JSON.stringify(this.testList));//数组转换成json字符串
            this.$axios({
                method: 'post',
                url: '/papers/create',
                data:formData
            }).then((res) => {
                console.log('成功')
            }).catch((e) => {
                console.log('失败')
            })
        }
    },
    mounted () {
        //抽题组卷
        this.selZjList = sessionStorage.getItem('selzjList')
        this.selTxlist = sessionStorage.getItem('seltxList')
        let formData = new FormData()
        formData.append("charpter",JSON.stringify(this.selZjList));//数组转换成json字符串
        formData.append("type",JSON.stringify(this.selTxlist));//数组转换成json字符串
        this.$axios({
            method: 'post',
            url: '/papers/extract',
            data:formData
        }).then((res) => {
            console.log('数据是：', res)
            for (let i = 0; i < res.data.length; i++) {
                this.testList.push(
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
