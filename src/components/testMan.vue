<template>
    <div class="testMan">
      <div class="infoTit">
          <div class="titBox"></div>
          <div class="titIn">试卷管理</div>
      </div>
      <div class="zjCon">
          <div class="tbCon">
              <table width="100%" cellspacing="0">
                <tbody>
                    <tr style="border:0">
                        <th>试卷名称</th>
                        <th>生成时间</th>
                        <th>操作</th>
                    </tr>
                    <tr v-bind:key="index" v-for="(item,index) in dataShow">
                        <td>{{item.sjname}}</td>
                        <td>{{item.time}}</td>
                        <td class="zjEdit">
                            <div class="toEdit" @click="download(index)">下载</div>
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
      <div class="del" v-show="delShow">
        <div class="delCon">
            <div class="editTop">
                <div class="topTxt">删除题型</div>
                <div class="topImg" @click="close()"><img src="../assets/close.png" alt=""></div>
            </div>
            <div class="deltxt">确定删除该试卷吗？</div>
            <div class="delBtn">
                <div class="delok" @click="delTest(testNum)">确定</div>
                <div class="delno" @click="close()">取消</div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'testMan',
  data () {
    return {
      userList: [],
      delShow: false,
      totalPage: [], // 所有页面的数据 按页分组
      pageSize: 6, // 每页显示数量
      pageNum: 3, // 共几页
      dataShow: '', // 当前显示的数据
      currentPage: 0, // 默认显示第几页
      testNum:''
    }
  },
  methods: {
    close () {
      this.delShow = false
    },
    del (index) {
      this.testNum = index
      this.delShow = true
    },
    // 删除试卷接口 未知
    delTest (testNum) {
        let formData = new FormData()
        formData.append('testNum', testNum)
        this.$axios({
        method: 'post',
        url: '/types/update',
        data:formData
        }).then((res) => {
        this.close(1)
        console.log('删除成功')
        }).catch((e) => {
            console.log('删除失败')
        })
    },
    // 下载试卷接口 未知
    download (index) {
        let formData = new FormData()
        formData.append('testNum', index)
        this.$axios({
        method: 'post',
        url: '/types/update',
        data:formData
        }).then((res) => {
        this.close(1)
        console.log('下载数据', res)
        }).catch((e) => {
            console.log('下载失败')
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
    }
  },
  mounted () {
    // 试卷管理请求数据接口 未知
    this.$axios({
    method: 'get',
    url: '/types/count',
    }).then((res) => {
    console.log('数据是：', res)
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
    // 
    for (let i = 0; i < 1; i++) {
      this.userList.push(
        { sjname: '甲卷', time: '2020-11-2 19:05' },
        { sjname: '甲卷', time: '2020-11-2 19:05' },
        { sjname: '甲卷', time: '2020-11-2 19:05' },
        { sjname: '甲卷', time: '2020-11-2 19:05' },
        { sjname: '甲卷', time: '2020-11-2 19:05' },
        { sjname: '甲卷', time: '2020-11-2 19:05' },
        { sjname: '甲卷', time: '2020-11-2 19:05' }
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
.testMan{
    width:67%;
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
        height:66%;
        background: #e8e9fd;
        padding:.2rem;
        .tbCon{
            width:100%;
            height:80%;
            overflow: hidden;
            margin-bottom: .3rem;
        }
        table{
            display: block;
            th{
                width:3rem;
                height:.4rem;
                font-size: .2rem;
                color:#fff;
                text-align: center;
                line-height: .4rem;
                background: #7d8ef7;
                font-weight: normal; // !important 优先使用
            }
            td{
                width:3rem;
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
