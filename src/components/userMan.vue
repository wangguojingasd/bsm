<template>
    <div class="introCon">
        <div class="infoTit">
            <div class="titBox"></div>
            <div class="titIn">用户管理</div>
        </div>
        <div class="zjCon">
            <div class="tbCon">
                <table width="100%" cellspacing="0">
                    <tbody>
                        <tr style="border:0">
                            <th>ID</th>
                            <th>用户名</th>
                            <th>密码</th>
                            <th>类型</th>
                            <th>工号</th>
                            <th>操作</th>
                        </tr>
                        <tr v-bind:key="index" v-for="(item,index) in dataShow">
                            <td>{{item.id}}</td>
                            <td>{{item.username}}</td>
                            <td>{{item.password}}</td>
                            <td>{{item.position}}</td>
                            <td>{{item.jn}}</td>
                            <td class="zjEdit">
                                <div class="toEdit" @click="edit(index)">编辑</div>
                                <div class="toDel" @click="del(index)">删除</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="zjPage">
                <div class="pageBtn" @click="firstPage()">首页</div>
                <div class="pageBtn" @click="prePage()">上一页</div>
                <div class="pageShow"><span class="nowPage">{{currentPage+1}}</span>/<span class="totalPage">{{pageNum}}</span></div>
                <div class="pageBtn" @click="nextPage()">下一页</div>
                <div class="pageBtn" @click="lastPage()">尾页</div>
            </div>
        </div>
        <div class="editMain" v-show="editShow">
            <div class="editCon">
                <div class="editTop">
                    <div class="topTxt">编辑用户信息</div>
                    <div class="topImg" @click="close(1)"><img src="../assets/close.png" alt=""></div>
                </div>
                <div class="inputCon" v-if="dataShow[txNum]">
                    <div class="inputList"><label for="">姓名：</label><input type="text" :placeholder=dataShow[txNum].username v-model="username"></div>
                    <div class="inputList"><label for="">密码：</label><input type="text" :placeholder=dataShow[txNum].password v-model="pass"></div>
                    <div class="inputList"><label for="">工号：</label><input type="text" :placeholder=dataShow[txNum].jn v-model="number"></div>
                    <div class="inputList"><label for="">类型：</label><input type="text" :placeholder=dataShow[txNum].position v-model="position"></div>
                </div>
                <!-- v-if解决username 报错undefined问题 -->
                <div class="editConBtn" @click="edituser(userNum,username,pass,position,number)">提交</div>
            </div>
        </div>
        <div class="del" v-show="delShow">
            <div class="delCon">
                <div class="editTop">
                    <div class="topTxt">删除用户</div>
                    <div class="topImg" @click="close(2)"><img src="../assets/close.png" alt=""></div>
                </div>
                <div class="deltxt">确定删除该用户吗？</div>
                <div class="delBtn">
                    <div class="delok" @click="deluser(userNum)">确定</div>
                    <div class="delno" @click="close(2)">取消</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'userMan',
  data () {
    return {
      userList: [],
      userNum: '0',
      editShow: false,
      delShow: false,
      totalPage: [], // 所有页面的数据 按页分组
      pageSize: 2, // 每页显示数量
      pageNum: 3, // 共几页
      dataShow: '', // 当前显示的数据
      currentPage: 0, // 默认显示第几页
      username:'',
      pass:'',
      position:'',
      number:''
    }
  },
  methods: {
    edit (index) {
      this.userNum = index
      this.editShow = true
    },
    close (id) {
      if (id === 1) {
        this.editShow = false
      } else {
        this.delShow = false
      }
    },
    del (index) {
      this.userNum = index
      this.delShow = true
    },
    firstPage () {
      this.currentPage = 0
      this.dataShow = this.totalPage[this.currentPage]
    },
    nextPage () {
      if (this.currentPage === this.pageNum - 1) return
      this.dataShow = this.totalPage[++this.currentPage]
    },
    prePage () {
      if (this.currentPage === 0) return
      this.dataShow = this.totalPage[--this.currentPage]
    },
    lastPage () {
      this.currentPage = this.pageNum - 1
      this.dataShow = this.totalPage[this.currentPage]
    },
    deluser (id) {
        let formData = new FormData()
        formData.append('id', id)
        this.$axios({
        method: 'get',
        url: '/users/delete',
        data:id,
        }).then((res) => {
        console.log('数据是：', res)
        }).catch((e) => {
            console.log('用户删除失败')
        })
    },
    edituser (id,name,pass,position,number) {
        let formData = new FormData()
        formData.append('id', id)
        formData.append('username', name)
        formData.append('password', pass)
        formData.append('position', position)
        formData.append('number', number)
        this.$axios({
        method: 'post',
        url: '/users/update',
        data:formData,
        }).then((res) => {
        console.log('数据是：', res)
        }).catch((e) => {
            console.log('用户更新失败')
        })
    }
  },
  mounted () {
      this.$axios({
        method: 'get',
        url: '/users/all',
      }).then((res) => {
        console.log(res)
        for (let i = 0; i < res.data.length; i++) {
            this.userList.push(res.data[i])
            this.pageNum = Math.ceil(this.userList.length / this.pageSize) || 1
        }
        for (let i = 0; i < this.pageNum; i++) {
        // 每一页都是一个数组 形如 [['第一页的数据'],['第二页的数据'],['第三页数据']]
        this.totalPage[i] = this.userList.slice(this.pageSize * i, this.pageSize * (i + 1))
        // slice(start,end) start 包含 end 不包含
        }
        // 获取到数据后显示第一页内容
        this.dataShow = this.totalPage[this.currentPage]
      }).catch((e) => {
        console.log('数据获取失败')
      })
    
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
    .zjCon{
        width:100%;
        height:65%;
        background: #e8e9fd;
        padding:.2rem;
        .tbCon{
            width:100%;
            height:82%;
            overflow: hidden;
            margin-bottom: .3rem;
        }
        table{
            display: block;
            th{
                width:2rem;
                height:.4rem;
                font-size: .2rem;
                color:#fff;
                text-align: center;
                line-height: .4rem;
                background: #7d8ef7;
                font-weight: normal; // !important 优先使用
            }
            td{
                width:2rem;
                height:.4rem;
                background: #fff;
                font-size: .18rem;
                color:#333;
                text-align: center;
                line-height: .4rem;
                border: .01rem solid #e8e9fd;
                .toEdit,.toDel{
                    width:50%;
                    height:100%;
                    float: left;
                    cursor: pointer;
                }
            }
            td:last-child{
                border-right:0;
            }
        }
    }
    .zjPage{
        width:41%;
        height:.3rem;
        margin: 0 auto;
        .pageBtn{
            width:.62rem;
            height:100%;
            background: #fff;
            font-size: .16rem;
            color:#333;
            line-height: .3rem;
            margin-right: .1rem;
            text-align: center;
            float: left;
            cursor: pointer;
        }
        .pageShow{
            width:.62rem;
            height:100%;
            font-size: .16rem;
            color:#333;
            line-height: .3rem;
            float: left;
            text-align: center;
            margin-right: .1rem;
        }
    }
    .editMain{
        position: fixed;
        background: rgba(3,3,3,.3);// 解决子元素对父元素透明度的继承
        left:0;
        top:0;
        right:0;
        bottom:0;
        z-index: 999;
        .editCon{
            width:4.4rem;
            height:3rem;
            position: absolute;
            background: #7d8ef7;
            top:10%;
            left:50%;
            transform:translate(-50%,50%);
            .editTop{
                width:100%;
                height:.36rem;
                margin-bottom: .2rem;
                .topTxt{
                    width: 80%;
                    height: 100%;
                    float: left;
                    font-size:.16rem;
                    color:#fff;
                    line-height: .36rem;
                    padding-left: .1rem;
                }
                .topImg{
                    width: 20%;
                    height:100%;
                    float: left;
                    padding-right: .05rem;
                    padding-top: .05rem;
                    cursor: pointer;
                    img{
                        display: block;
                        width:.2rem;
                        height: .2rem;
                        float: right;
                    }
                }
            }
            .inputCon{
                width:100%;
                height: auto;
                text-align: center;
                color:#fff;
                font-size: .18rem;
                margin-bottom: .3rem;
                .inputList{
                    width:100%;
                    height:auto;
                    margin-bottom: .1rem;
                }
            }
            input{
                display: inline-block;
                width: 1.77rem;
                height: .32rem;
                padding-left: .1rem;
                box-sizing: border-box;
                background: 0 0;
                line-height: .32rem;
                font-size: 16px;
                color: #fff;
                border: 1px solid #fff;
                margin:0 auto;
            }
            /* WebKit browsers */
            input::-webkit-input-placeholder {
                color: #fff;
                font-size: 14px;
            }
            /* Mozilla Firefox 4 to 18 */
            input:-moz-placeholder {
                color: #fff;
                opacity: 1;
                font-size: 14px;
            }
            /* Mozilla Firefox 19+ */
            input::-moz-placeholder {
                color: #fff;
                opacity: 1;
                font-size: 14px;
            }
            /* Internet Explorer 10+ */
            input:-ms-input-placeholder {
                color: #fff;
                font-size: 14px;
            }
            .editConBtn{
                width:.64rem;
                height: .3rem;
                background: #fff;
                text-align: center;
                line-height: .3rem;
                color:#7d8ef7;
                font-size: .16rem;
                margin: 0 auto;
                cursor: pointer;
            }
        }
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
            height:3rem;
            position: absolute;
            background: #7d8ef7;
            top:10%;
            left:50%;
            transform:translate(-50%,50%);
            .editTop{
                width:100%;
                height:.36rem;
                margin-bottom: .2rem;
                .topTxt{
                    width: 80%;
                    height: 100%;
                    float: left;
                    font-size:.16rem;
                    color:#fff;
                    line-height: .36rem;
                    padding-left: .1rem;
                }
                .topImg{
                    width: 20%;
                    height:100%;
                    float: left;
                    padding-right: .05rem;
                    padding-top: .05rem;
                    cursor: pointer;
                    img{
                        display: block;
                        width:.2rem;
                        height: .2rem;
                        float: right;
                    }
                }
            }
            .deltxt{
                width:100%;
                height:.3rem;
                margin-top: .8rem;
                margin-bottom: .3rem;
                text-align: center;
                font-size: .2rem;
                color:#fff;
            }
            .delBtn{
                width:2.2rem;
                height:.3rem;
                margin: 0 auto;
                .delok,.delno{
                    float: left;
                    width:.8rem;
                    height:.3rem;
                    background: #fff;
                    color: #7d8ef7;
                    text-align: center;
                    line-height: .3rem;
                    font-size: .18rem;
                    margin-right: .2rem;
                    cursor: pointer;
                }
                .delno{
                    float: right;
                    margin-right: 0;
                }
            }
        }
    }
}
</style>
