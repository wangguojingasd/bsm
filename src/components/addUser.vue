<template>
    <div class="introCon">
        <div class="infoTit">
            <div class="titBox"></div>
            <div class="titIn">新增用户</div>
        </div>
        <div class="addCon">
            <div class="addList">
                <input type="text" placeholder="用户名">
                <input type="text" placeholder="密码">
            </div>
            <div class="addList">
                <input type="text" placeholder="工号">
                <select name="" id="">
                    <option v-bind:key="index" v-for="(item,index) in usList" value="">{{item}}</option>
                </select>
            </div>
            <div class="tjBtn" @click="adduser()">提交</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'addUser',
  data () {
    return {
      usList: ['请选择类型...', '学生', '教师', '管理员']
    }
  },
  methods:{
      adduser () {
        this.$axios({
        method: 'post',
        url: '/users/add',
        }).then((res) => {
        console.log('数据是：', res)
        }).catch((e) => {
            console.log('用户添加失败')
        })
      }
  }
}
</script>

<style scoped lang="scss">
.introCon{
    width:66%;
    height:91%;
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
    .addCon{
        width:100%;
        height:40%;
        background:url('../assets/bg2.jpg');
        padding:.2rem;
        padding-top: .4rem;
        .addList{
            width:47%;
            height:.4rem;
            margin: 0 auto;
            margin-bottom: .1rem;
            font-size: 0;
            margin-top: .1rem;
        }
        input{
            width: 1.8rem;
            height: .32rem;
            padding-left: .1rem;
            box-sizing: border-box;
            background: 0 0;
            line-height: .32rem;
            font-size: 16px;
            color: #333;
            border: 1px solid #7b7b7b;
            float: left;
        }
        input:last-child{
            float: right;
        }
        /* WebKit browsers */
        input::-webkit-input-placeholder {
            color: #333;
            font-size: 14px;
        }
        /* Mozilla Firefox 4 to 18 */
        input:-moz-placeholder {
            color: #333;
            opacity: 1;
            font-size: 14px;
        }
        /* Mozilla Firefox 19+ */
        input::-moz-placeholder {
            color: #333;
            opacity: 1;
            font-size: 14px;
        }
        /* Internet Explorer 10+ */
        input:-ms-input-placeholder {
            color: #333;
            font-size: 14px;
        }
        select{
            float: right;
            width: 1.8rem;
            height: .3rem;
            padding: 0 .1rem;
            box-sizing: border-box;
            background: 0 0;
            line-height: .3rem;
            font-size: 16px;
            color: #333;
            border: 1px solid #7b7b7b;
            direction: ltr;//字体超出省略号表示
            text-overflow: ellipsis;//字体超出省略号表示
            option{
                direction: ltr;//字体超出省略号表示
            }
        }
        .tjBtn{
            width:47%;
            height:.3rem;
            background: #7d8ef7;
            color:#fff;
            font-size: .16rem;
            text-align: center;
            line-height: .3rem;
            cursor: pointer;
            margin: 0 auto;
        }
    }
}
</style>
