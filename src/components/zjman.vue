<template>
    <div class="introCon">
        <div class="infoTit">
            <div class="titBox"></div>
            <div class="titIn">章节管理</div>
        </div>
        <div class="zjCon">
            <div class="tbCon">
                <table width="860" cellspacing="0">
                    <tbody>
                        <tr style="border:0">
                            <th>章节名称</th>
                            <th>易</th>
                            <th>中</th>
                            <th>难</th>
                            <th>操作</th>
                        </tr>
                        <tr v-bind:key="index" v-for="(item,index) in dataShow">
                            <td>{{item.zjname}}</td>
                            <td>{{item.num1}}</td>
                            <td>{{item.num2}}</td>
                            <td>{{item.num3}}</td>
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
        <div class="zjAdd">
            <div class="inputCon">
                <label for="">增加章节：第</label><input type="text"><label for="">章</label>
                <label style="margin-left:.5rem" for="">章节名称：</label><input type="text">
            </div>
            <div class="addbtn">提交</div>
        </div>
        <div class="editMain" v-show="editShow">
            <div class="editCon">
                <div class="editTop">
                    <div class="topTxt">编辑章节信息</div>
                    <div class="topImg" @click="close(1)"><img src="../assets/close.png" alt=""></div>
                </div>
                <div class="inputName">章节名称修改为：</div>
                <input type="text" :placeholder=dataShow[zjNum].zjname >
                <div class="editConBtn">提交</div>
            </div>
        </div>
        <div class="del" v-show="delShow">
            <div class="delCon">
                <div class="editTop">
                    <div class="topTxt">删除题型</div>
                    <div class="topImg" @click="close(2)"><img src="../assets/close.png" alt=""></div>
                </div>
                <div class="deltxt">确定删除该章节吗？</div>
                <div class="delBtn">
                    <div class="delok">确定</div>
                    <div class="delno" @click="close(2)">取消</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'zjman',
  data () {
    return {
      zjNum: '0',
      userList: [],
      editShow: false,
      delShow: false,
      totalPage: [], // 所有页面的数据 按页分组
      pageSize: 6, // 每页显示数量
      pageNum: 3, // 共几页
      dataShow: '', // 当前显示的数据
      currentPage: 0 // 默认显示第几页
    }
  },
  methods: {
    edit (index) {
      this.zjNum = index
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
      this.txNum = index
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
    }
  },
  mounted () {
    for (let i = 0; i < 1; i++) {
      this.userList.push(
        { zjname: '数据库基础概述', num1: '10', num2: '20', num3: '30' },
        { zjname: 'SQL Sever环境', num1: '10', num2: '20', num3: '30' },
        { zjname: 'T-SQL语言', num1: '10', num2: '20', num3: '30' },
        { zjname: '触发器及其管理', num1: '10', num2: '20', num3: '30' },
        { zjname: '存储过程及其管理', num1: '10', num2: '20', num3: '30' },
        { zjname: '管理安全性', num1: '10', num2: '20', num3: '30' },
        { zjname: '视图及其管理', num1: '10', num2: '20', num3: '30' }
      )
      this.pageNum = Math.ceil(this.userList.length / this.pageSize) || 1
    }
    for (let i = 0; i < this.pageNum; i++) {
      // 每一页都是一个数组 形如 [['第一页的数据'],['第二页的数据'],['第三页数据']]
      this.totalPage[i] = this.userList.slice(this.pageSize * i, this.pageSize * (i + 1))
      // slice(start,end) start 包含 end 不包含
    }
    // 获取到数据后显示第一页内容
    this.dataShow = this.totalPage[this.currentPage]
  }
}
</script>

<style scoped lang="scss">
.introCon{
    width:64%;
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
        width:42%;
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
    .zjAdd{
        width:100%;
        height:1rem;
        padding-top: .3rem;
        font-size: .18rem;
        color:#333;
        .inputCon{
            width:75%;
            height: 100%;
            float: left;
             input{
                width: 1.6rem;
                height: .3rem;
                padding-left: .1rem;
                box-sizing: border-box;
                background: 0 0;
                line-height: .3rem;
                font-size: 16px;
                color: #333;
                border: 1px solid #ddd;
                margin:0 .1rem .2rem .1rem;
            }
        }
        .addbtn{
            width:.64rem;
            height:.3rem;
            float: left;
            background: #7d8ef7;
            font-size: .16rem;
            color:#fff;
            text-align: center;
            line-height: .3rem;
            cursor: pointer;
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
                margin-bottom: .34rem;
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
            .inputName{
                width:100%;
                height: .5rem;
                text-align: center;
                color:#fff;
                font-size: .18rem;
            }
            input{
                display: block;
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
                margin-top: .5rem;
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
