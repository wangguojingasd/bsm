<template>
    <div class="introCon">
        <div class="infoTit">
            <div class="titBox"></div>
            <div class="titIn">新增用户</div>
        </div>
        <div class="addCon">
            <div class="addList">
                <input type="text" placeholder="用户名" v-model="username">
                <input type="text" placeholder="密码" v-model="pass">
            </div>
            <div class="addList">
                <input type="text" placeholder="工号" v-model="number">
                <select name="" id="" v-model="position">
                    <option value="">请选择...</option>
                    <option v-bind:key="index" v-for="(item,index) in usList" :value="item">{{item}}</option>
                </select>
            </div>
            <div class="tjBtn" @click="adduser(username,pass,position,number)">提交</div>
        </div>
        <div class="warn" v-show="warnShow">
            <div class='warnBox'>
                <div class="text1">提示</div>
                <div class="text">{{msg}}</div>
                <div class="btn" @click="close()">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'addUser',
  data () {
    return {
      usList: ['学生', '教师', '管理员'],
      username:'',
      pass:'',
      position:'',
      number:'',
      warnShow:false,
      msg:''
    }
  },
  methods:{
    getValue (e) {
        // this.position = e.target.value
    },
    close () {
      this.warnShow = false
    },
    adduser (username,pass,position,number) {
        let formData = new FormData()
        formData.append('username', username)
        formData.append('password', pass)
        formData.append('position', position)
        formData.append('number', number)
        if(username == '' || pass == '' || position == '' || number == ''){
            this.msg = '请完善信息，不允许为空'
            this.warnShow = true
        }else{
            this.$axios({
            method: 'post',
            url: '/users/add',
            data:formData
            }).then((res) => {
            this.msg = res.data.msg
            this.warnShow = true
            this.username = ''
            this.pass = ''
            this.position = ''
            this.number = ''
            }).catch((e) => {
                console.log('用户添加失败')
            })
        }
    }
  }
}
</script>

<style scoped lang="scss">
.introCon{
    width:82%;
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
        background: #e8e9fd;
        padding:.2rem;
        padding-top: .4rem;
        .addList{
            width:80%;
            height:.4rem;
            margin: 0 auto;
            margin-bottom: .1rem;
            font-size: 0;
            margin-top: .1rem;
        }
        input{
            width: 3.8rem;
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
            width: 3.8rem;
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
            width:80%;
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
    .warn{
        position: fixed;
        background: rgba(3,3,3,.3);// 解决子元素对父元素透明度的继承
        left:0;
        top:0;
        right:0;
        bottom:0;
        z-index: 999;
        .warnBox{
            width:4.4rem;
            height: 1.4rem;
            background: #fff;
            border-radius: 5px;
            border:1px solid #c3c3c3;
            position: absolute;
            top:0;
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
