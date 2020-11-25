<template>
    <div class="setCon">
        <div class="inputCon">
            <label for="">试卷名称：</label><input type="text">
            <label style="margin-left:.5rem" for="">试卷等级：</label>
            <select name="" id="">
                <option v-bind:key="index" v-for="(item,index) in setList" value="">{{setList[index]}}</option>
            </select>
        </div>
        <div class="addbtn">生成试卷</div>
    </div>
</template>

<script>
export default {
  name: 'testSet',
  data () {
    return {
      setList: ['甲', '乙', '丙', '重修']
    }
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
