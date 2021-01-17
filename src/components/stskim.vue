<template>
    <div class="introCon">
        <div class="infoTit">
            <div class="titBox"></div>
            <div class="titIn">试题浏览</div>
            <!-- 还没写 -->
        </div>
        <div class="zjCon">
            <div class="stsel">
                <div class="inputCon">
                    <label for="">试题类型：</label>
                    <select name="" id="" @change='getValuetx($event)'>
                        <option value="">请选择...</option>
                        <option v-bind:key="index" v-for="(item,index) in skimtx1" :value="item.txname">{{item.txname}}</option>
                        <!-- <option v-bind:key="index" v-for="(item,index) in skimtx" :value="item.name">{{item.name}}</option> -->
                    </select>
                    <label for="">试题章节：</label>
                    <select name="" id="" @change='getValue($event)'>
                        <option value="">请选择...</option>
                        <option v-bind:key="index" v-for="(item,index) in skimtx1" :value="item.zjname">{{item.zjname}}</option>
                        <!-- <option v-bind:key="index" v-for="(item,index) in skimzj" :value="item.id">{{item.name}}</option> -->
                    </select>
                </div>
            </div>
            <div class="tbCon">
                <table width="100%" cellspacing="0">
                    <tbody>
                        <tr style="border:0">
                            <th>试题</th>
                            <th>答案</th>
                            <th>章节</th>
                            <th>难度</th>
                            <th>操作</th>
                        </tr>
                        <tr v-bind:key="index" v-for="(item,index) in dataShow">
                            <td>{{item.question}}</td>
                            <td>{{item.answer}}</td>
                            <td>{{item.charpter}}</td>
                            <td>{{item.difficulty}}</td>
                            <td class="zjEdit">
                                <div class="tbBtnCon">
                                    <div class="toEdit" @click="edit(index,item.question,item.answer,item.charpter,item.difficulty)">编辑</div>
                                    <div class="toDel" @click="del(index)">删除</div>
                                </div>
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
                <div class="qusCon">
                    <div class="qusTit">试题</div>
                    <textarea class="qusMain" v-model="qus"></textarea>
                </div>
                <div class="ansCon">
                    <div class="qusTit">答案</div>
                    <textarea class="qusMain" v-model="ans"></textarea>
                </div>
                <div class="selCon">
                    <label for="">试题类型：</label>
                    <select v-model="txsel">
                        <option v-bind:key="index" v-for="(item,index) in skimtx1" :value="item.txname">{{item.txname}}</option>
                        <!-- <option v-bind:key="index" v-for="(item,index) in skimtx" :value="item.txname">{{item}}</option> -->
                    </select>
                    <label for="">试题章节：</label>
                    <select v-model="zjNum">
                        <option v-bind:key="index" v-for="(item,index) in skimtx1" :value="item.zjname">{{item.zjname}}</option>
                        <!-- <option v-bind:key="index" v-for="(item,index) in skimzj" :value="item.zjname">{{item.name}}</option> -->
                    </select>
                    <label for="">难度：</label>
                    <select v-model="nd">
                        <option v-bind:key="index" v-for="(item,index) in ndList" :value="item">{{item}}</option>
                        <!-- <option v-bind:key="index" v-for="(item,index) in ndList" :value="item">{{item}}</option> -->
                    </select>
                </div>
                <div class="btn" @click="close(1)">提交</div>
            </div>
        </div>
        <div class="del" v-show="delShow">
            <div class="delCon">
                <div class="editTop">
                    <div class="topTxt">删除题型</div>
                    <div class="topImg" @click="close(2)"><img src="../assets/close.png" alt=""></div>
                </div>
                <div class="deltxt">确定删除该试题吗？</div>
                <div class="delBtn">
                    <div class="delok" @click="del(dataShow[txNum].id)">确定</div>
                    <div class="delno" @click="close(2)">取消</div>
                </div>
            </div>
        </div>
        <editor-bar v-model="detail" :isClear="isClear" @change="change"></editor-bar>
    </div>
</template>

<script>
import EditorBar from './wangEditor'
export default {
  name: 'stskim',
  components:{
      EditorBar
  },
  data () {
    return {
        //
      isClear: false,
      detail:"",
      //
      skimtx1: [
        { txname: '单项选择题', zjname: '数据库基础概述好的海的'},
        { txname: '填空题', zjname: 'SQL Sever环境'},
        { txname: '判断题', zjname: 'T-SQL语言'},
        { txname: '简答题', zjname: '触发器及其管理'},
        { txname: '综合应用题', zjname: '存储过程及其管理'},
        { txname: '名词解释', zjname: '管理安全性'}
      ],
      ndList: ['难', '中', '易'],
      skimtx: [],
      skimzj: [],
      userList: [],
      txNum: '0',
      editShow: false,
      delShow: false,
      totalPage: [], // 所有页面的数据 按页分组
      pageSize: 4, // 每页显示数量
      pageNum: 0, // 共几页
      dataShow: '', // 当前显示的数据
      currentPage: 0, // 默认显示第几页
      zjNum:'',//要传给后台的两个数据
      txsel:'',
      qus:'',
      ans:'',
      zj:'',
      nd:''
    }
  },
  methods: {
    //
    change(val) {
      console.log(val)
      
    },
    //
    edit (index,qus,ans,zj,nd) {
      this.txNum = index
      this.qus = qus
      this.ans = ans
      this.zj = zj
      this.nd = nd
      console.log(this.txsel,this.zjNum,this.nd)
      this.editShow = true
    },
    close (id) {
      if (id === 1) {
        let formData = new FormData()
        formData.append('id', id)
        formData.append('question', id)
        formData.append('answer', id)
        formData.append('type', id)
        formData.append('charpter', id)
        formData.append('difficulty', id)
        this.$axios({
        method: 'post',
        url: '/questions/update',
        data:charpter,type
        }).then((res) => {
        console.log('数据是：', res)
        }).catch((e) => {
            console.log('数据编辑失败')
        })
        this.editShow = false
      } else {
        this.delShow = false
      }
    },
    del (index) {
        this.txNum = index
        this.delShow = true

        let formData = new FormData()
        formData.append('id', index)
        this.$axios({
        method: 'post',
        url: '/questions/delete',
        data:formData,
        }).then((res) => {
        console.log('数据是：', res)
        this.close(2)
        window.location.reload();
        }).catch((e) => {
            console.log('数据删除失败')
        })
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
    sel (charpter,type) {
        //
        for (let i = 0; i < 1; i++) {
            this.userList.push(
                { question: 'aaaa111', answer: 'bbb', charpter: '1', difficulty: '难'},
                { question: 'aaaa222', answer: 'bbb', charpter: '2', difficulty: '难'},
                { question: 'aaaa333', answer: 'bbb', charpter: '3', difficulty: '难'},
                { question: 'aaaa444', answer: 'bbb', charpter: '4', difficulty: '中'},
                { question: 'aaaa555', answer: 'bbb', charpter: '5', difficulty: '易'},
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
        //
        // let formData = new FormData()
        // formData.append('charpter', charpter)
        // formData.append('type', type)
        // console.log(formData.get('charpter'),formData.get('type'))
        // this.$axios({
        // method: 'post',
        // url: '/questions/show',
        // data:formData
        // }).then((res) => {
        // console.log('数据是：', res)
        // for (let i = 0; i < res.data.length; i++) {
        //     this.userList.push(
        //         res.data[i]
        //     )
        //     this.pageNum = Math.ceil(this.userList.length / this.pageSize) || 1
        // }
        // for (let i = 0; i < this.pageNum; i++) {
        //     // 每一页都是一个数组 形如 [['第一页的数据'],['第二页的数据'],['第三页数据']]
        //     this.totalPage[i] = this.userList.slice(this.pageSize * i, this.pageSize * (i + 1))
        //     // slice(start,end) start 包含 end 不包含
        // }
        // // 获取到数据后显示第一页内容
        // this.dataShow = this.totalPage[this.currentPage]
        // }).catch((e) => {
        //     console.log('数据请求失败')
        // })
    },
    getValue (e) {
        this.zjNum = e.target.value
        console.log(this.zjNum)
        if(this.txsel){this.sel(this.zjNum,this.txsel)}
            
    },
    getValuetx (e) {
        this.txsel = e.target.value
        console.log(this.txsel)
        if(this.zjNum){this.sel(this.zjNum,this.txsel)}
    }
  },
  mounted () {
      this.$axios({
        method: 'get',
        url: '/types/all',
      }).then((res) => {
        console.log('数据是：', res)
        for (let i = 0; i < res.data.length; i++) {
            this.skimtx.push(
                res.data[i]
            )
        }
      }).catch((e) => {
          console.log('数据获取失败')
      })
      this.$axios({
        method: 'get',
        url: '/charpters/all',
      }).then((res) => {
        console.log('数据是：', res)
        for (let i = 0; i < res.data.length; i++) {
            this.skimzj.push(
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
    .zjCon{
        width:100%;
        height:95%;
        background: #e8e9fd;
        padding:.2rem;
        overflow: hidden;
        .tbCon{
            width:100%;
            height:75%;
            overflow: auto; // 内容超出固定高度 显示滚动条
            margin: 0 auto;
            margin-bottom: .3rem;
        }
        .stsel{
            width:100%;
            height:.6rem;
            padding-top: .1rem;
            font-size: .18rem;
            color:#333;
            .inputCon{
                width:75%;
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
            th:first-of-type{
                width:3rem;
            }
            td{
                width:1.8rem;
                height:auto;
                background: #fff;
                font-size: .18rem;
                color:#333;
                text-align: center;
                line-height: .3rem;
                border: .01rem solid #e8e9fd;
                .tbBtnCon{
                    width:100%;
                    height:.3rem;
                }
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
    .editMain{
        position: fixed;
        background:#f4f4f4;// 解决子元素对父元素透明度的继承
        left:0;
        top:0;
        right:0;
        bottom:0;
        z-index: 999;
        .editCon{
            position: absolute;
            top:-40%;
            left:50%;
            transform:translate(-50%,50%);
            width:100%;
            height:91%;
            padding: .1rem;
        }
        .qusCon,.ansCon{
            width:100%;
            height: auto;
            margin-bottom: .1rem;
            .qusTit{
                width:100%;
                height:.3rem;
                text-align: center;
                line-height: .3rem;
                font-size: .2rem;
                color:#333;
                margin-bottom: .1rem;
            }
            .qusMain{
                display: block;
                width:80%;
                height:2rem;
                margin: 0 auto;
                background: #fff;
                font-size: .14rem;
                line-height: .22rem;
                padding: .1rem;
            }
        }
        .selCon{
            width:55%;
            height: .5rem;
            margin: 0 auto;
            margin-bottom: .2rem;
            font-size: .18rem;
            line-height: .5rem;
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
        .btn{
            width:.8rem;
            height:.3rem;
            background: #7177f3;
            color:#fff;
            font-size: .18rem;
            text-align: center;
            line-height: .3rem;
            cursor: pointer;
            margin: 0 auto;
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
    .wangeditor{
        width:80%;
        height:3rem;
        background: red;
    }
}
</style>