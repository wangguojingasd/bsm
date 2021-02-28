<template>
    <div class="introCon">
        <div class="infoTit">
            <div class="titBox"></div>
            <div class="titIn">测试试题设置</div>
        </div>
        <div class="setCon">
            <div class="ceTime">
                <label for="">试卷名称：</label><input class="grInput" type="text" v-model="sjName">
                 <label for="">测试时间：</label>
                 <select name="" id="" v-model="ceTime">
                    <option value="">请选择...</option>
                    <option v-bind:key="index" v-for="(item,index) in time" :value="item">{{item}}</option>
                </select>
            </div>
            <div class="ceSel">
                <div class="selTie">选择题</div>
                <label for="">分值：</label><input class="grInput" type="text" v-model="selgrade">
                <div class="selCon">
                    <label for="">章节：</label>
                     <p v-bind:key="index" v-for="(item,index) in txList1"><input type="checkbox" @change="handleChange($event,item.zjId,1)">{{item.zjname}}</p>
                </div>
                <div class="numInput">
                    <label for="">数量：</label><label for="">难</label><input class="grInput" type="text" v-model="seldiff">
                    <label for="">中</label><input class="grInput" type="text" v-model="selmid">
                    <label for="">易</label><input class="grInput" type="text" v-model="seleasy">
                </div>
            </div>
            <div class="ceTf">
                <div class="selTie">判断题</div>
                <label for="">分值：</label><input class="grInput"  type="text" v-model="tfgrade">
                <div class="selCon">
                    <label for="">章节：</label>
                    <p v-bind:key="index" v-for="(item,index) in txList1"><input type="checkbox" @change="handleChange($event,item.zjId,2)">{{item.zjname}}</p>
                </div>
                <div class="numInput">
                    <label for="">数量：</label><label for="">难：</label><input class="grInput" type="text" v-model="tfdiff">
                    <label for="">中：</label><input class="grInput" type="text" v-model="tfmid">
                    <label for="">易：</label><input class="grInput" type="text" v-model="tfeasy">
                </div>
            </div>
            <div class="tjBtn" @click="setbtn()">提交</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'onlineTestSet',
    data () {
        return {
            ceTime:'',
            selgrade:'',
            tfgrade:'',
            time:['0.5小时','1小时','1.5小时','2小时','2.5小时','3小时'],
            zjList:[],
            seldiff:'',
            selmid:'',
            seleasy:'',
            tfdiff:'',
            tfmid:'',
            tfeasy:'',
            sjName:'',
            selList:[],
            tfList:[],
            cap1:[],
            cap2:[],
            conditions:[],
            txList1: [
                { zjId: '1',zjname: '数据库基础概述' },
                { zjId: '2',zjname: 'SQL Sever环境' },
                { zjId: '3',zjname: 'T-SQL语言' },
                { zjId: '4',zjname: '触发器及其管理'},
                { zjId: '5',zjname: '存储过程及其管理' },
                { zjId: '6',zjname: '管理安全性'}
            ],
        }
    },
    methods:{
        // 提交接口
        setbtn(){
            this.selList = []
            this.tfList = []
            this.conditions = []
            this.selList.push(
                {type:'选择',score:this.selgrade,caps:this.cap1,simple:this.seleasy,normal:this.selmid,difficult:this.seldiff}
            )
            this.tfList.push(
                {type:'判断',score:this.tfgrade,caps:this.cap2,simple:this.tfeasy,normal:this.tfmid,difficult:this.tfdiff}
            )
            this.conditions.push(this.selList,this.tfList)
            console.log(this.conditions)
            let formData = new FormData()
            formData.append('testName', this.sjName)
            formData.append('duration', this.ceTime)
            formData.append("conditions",JSON.stringify(this.conditions));//数组转换成json字符串
            this.$axios({
            method: 'post',
            url: '/test/condition',
            data:formData
            }).then((res) => {
            console.log('数据是：', res)
            }).catch((e) => {
                console.log('测试设置请求数据失败')
            })
        },
        // 选择的章节放到相应的数组中
        handleChange:function(e,id,i) {
            if(e.target.checked&&i==1){
                this.cap1.push({id:id})
            }else if(e.target.checked&&i==2){
                this.cap2.push({id:id})
            }else{ // 不选择的时候执行删除数组中元素
                if(i==1){
                    this.del(id,this.cap1)
                }else{
                    this.del(id,this.cap2)
                }
            }
        },
        // 多选框取消选择时执行
        del(id,arr){
            var index = arr.findIndex(item => {
                if ( item.id == id) {
                return true;
                }
            });
            arr.splice(index,1)
        },
    },
    mounted () {
        //章节显示接口
        this.$axios({
        method: 'get',
        url: '/charpters/count',
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
.introCon{
    width:70%;
    height:90%;
    float: left;
    padding: .1rem;
    .infoTit{
        width:100%;
        height: .2rem;
        margin-bottom: .15rem;
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
    .setCon{
        width:100%;
        height:90%;
        background: #e8e9fd;
        padding:.2rem;
        font-size: .16rem;
        overflow: hidden;
        .grInput{
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
        .ceTime{
            width:100%;
            height:.5rem;
            padding-top: .1rem;
            font-size: .18rem;
            color:#333;
            select{
                width: 1.6rem;
                height: .24rem;
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
        .ceSel,.ceTf{
            width:100%;
            height:1.8rem;
            padding-top: .1rem;
            font-size: .16rem;
            color:#333;
            .selCon{
                width:100%;
                height:.3rem;
                font-size: .16rem;
                color:#333;
                margin-bottom: .2rem;
                line-height: .3rem;
                p{
                    display: inline;
                    margin-right: .1rem;
                }
                input{
                    margin-right: .05rem;
                    width: .12rem;
                    height: .12rem;
                    border: 1px solid #ddd;
                }
            }
            .selTie{
                width:.6rem;
                height:.3rem;
                background: #7d8ef7;
                color:#fff;
                text-align: center;
                line-height: .3rem;
                margin-bottom: .1rem;
            }
        }
        .tjBtn{
            width:8.3rem;
            height:.4rem;
            background: #7d8ef7;
            color:#fff;
            text-align: center;
            line-height: .4rem;
            font-size: .18rem;
            cursor: pointer;
            margin-top: .5rem;
        }
    }
}
</style>
