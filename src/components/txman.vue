<template>
    <div class="introCon">
        <div class="infoTit">
            <div class="titBox"></div>
            <div class="titIn">题型管理</div>
        </div>
        <div class="zjCon">
            <div class="tbCon">
                <table width="100%" cellspacing="0">
                    <tbody>
                        <tr style="border:0">
                            <th>类型名称</th>
                            <th>易</th>
                            <th>中</th>
                            <th>难</th>
                            <th>操作</th>
                        </tr>
                        <tr v-bind:key="index" v-for="(item,index) in dataShow">
                            <td>{{item.type}}</td>
                            <td>{{item.simple}}</td>
                            <td>{{item.normal}}</td>
                            <td>{{item.difficult}}</td>
                            <td class="zjEdit">
                                <div class="toEdit" @click="edit(index,item.type)">编辑</div>
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
                <label for="">增加题型：</label><input type="text" v-model="addname">
            </div>
            <div class="addbtn" @click="submit(addname)">提交</div>
        </div>
        <div class="editMain" v-show="editShow">
            <div class="editCon">
                <div class="editTop">
                    <div class="topTxt">编辑题型信息</div>
                    <div class="topImg" @click="close(1)"><img src="../assets/close.png" alt=""></div>
                </div>
                <div class="inputName">试题类型修改为：</div>
                <input type="text" v-model="editname">
                <div class="editConBtn" @click="updateok(dataShow[txNum].id,dataShow[txNum].type,editname)">提交</div>
            </div>
        </div>
        <div class="del" v-show="delShow">
            <div class="delCon">
                <div class="editTop">
                    <div class="topTxt">删除题型</div>
                    <div class="topImg" @click="close(2)"><img src="../assets/close.png" alt=""></div>
                </div>
                <div class="deltxt">确定删除该题型吗？</div>
                <div class="delBtn">
                    <div class="delok" @click="delok(dataShow[txNum].id)">确定</div>
                    <div class="delno" @click="close(2)">取消</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'txman',
  data () {
    return {
      userList: [],
      txNum: '0',
      editShow: false,
      delShow: false,
      totalPage: [], // 所有页面的数据 按页分组
      pageSize: 6, // 每页显示数量
      pageNum: 0, // 共几页
      dataShow: '', // 当前显示的数据
      currentPage: 0, // 默认显示第几页
      addname:'',
      editname:''//编辑后的新名字
    }
  },
  methods: {
    edit (index,name) {
      this.txNum = index
      this.editShow = true
      this.editname = name
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
    delok (id) {
        console.log(id)
        let formData = new FormData()
        formData.append('id', id)
        console.log(formData.get("id"))
        this.$axios({
        method: 'post',
        url: '/types/delete',
        data:formData
        }).then((res) => {
        console.log('数据是：', res)
        this.close(2)
        this.show()
        }).catch((e) => {
            console.log('删除失败')
        })
    },
    updateok (id,oldname,newname) {
        console.log(newname)
        let formData = new FormData()
        formData.append('id', id)
        formData.append('oldstr', oldname)
        formData.append('newstr', newname)
        this.$axios({
        method: 'post',
        url: '/types/update',
        data:formData
        }).then((res) => {
        this.close(1)
        this.show()
        console.log('数据是：', res)
        }).catch((e) => {
            console.log('更新失败')
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
    submit (name) {
        let formData = new FormData()
        formData.append('name', name)
        this.$axios({
        method: 'post',
        url: '/types/add',
        data:formData
        }).then((res) => {
        console.log('数据是：', res)
        this.show()
        this.addname = ''
        }).catch((e) => {
            console.log('增加失败')
        })
    },
    show () {
        this.$axios({
        method: 'get',
        url: '/types/count',
        }).then((res) => {
        console.log('数据是：', res)
        this.userList = []
        for (let i = 0; i < res.data.length; i++) {
            this.userList.push(
                res.data[i]
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
        }).catch((e) => {
            console.log('数据获取失败')
        })
    }
  },
  mounted () {
    this.show()
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
        height:65%;
        background: #e8e9fd;
        padding:.2rem;
        .tbCon{
            width:100%;
            height:82%;
            overflow: hidden;
            margin-bottom: .3rem;
            display: flex;
            justify-content: center;
        }
        table{
            // display: block;
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
        width:100%;
        height:.3rem;
        display: flex;
        justify-content: center;
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
            width:34%;
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
