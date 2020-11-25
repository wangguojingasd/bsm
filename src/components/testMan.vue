<template>
    <div class="testMan">
      <div class="infoTit">
          <div class="titBox"></div>
          <div class="titIn">试卷管理</div>
      </div>
      <div class="zjCon">
          <table width="100%" cellspacing="0">
              <tbody>
                  <tr style="border:0">
                      <th>试卷名称</th>
                      <th>生成时间</th>
                      <th>操作</th>
                  </tr>
                  <tr v-bind:key="index" v-for="(item,index) in zjList">
                      <td>{{item.sjname}}</td>
                      <td>{{item.time}}</td>
                      <td class="zjEdit">
                          <div class="toEdit">下载</div>
                          <div class="toDel">删除</div>
                      </td>
                  </tr>
              </tbody>
          </table>
          <div class="zjPage">
              <div class="pageBtn">首页</div>
              <div class="pageBtn">下一页</div>
              <div class="pageShow"><span class="nowPage">{{pageDefault}}</span>/<span class="totalPage">{{pageMsg}}</span></div>
              <div class="pageBtn">上一页</div>
              <div class="pageBtn">尾页</div>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'testMan',
  data () {
    return {
      zjList: [
        { sjname: '甲卷', time: '2020-11-2 19:05' },
        { sjname: '甲卷', time: '2020-11-2 19:05' },
        { sjname: '甲卷', time: '2020-11-2 19:05' },
        { sjname: '甲卷', time: '2020-11-2 19:05' },
        { sjname: '甲卷', time: '2020-11-2 19:05' },
        { sjname: '甲卷', time: '2020-11-2 19:05' },
        { sjname: '甲卷', time: '2020-11-2 19:05' }
      ],
      pageDefault: '1',
      pageMsg: '9',
      zjNum: '0'
    }
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
        height:72%;
        background: #e8e9fd;
        padding:.2rem;
        table{
            display: block;
            margin-bottom: .3rem;
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
        width:100%;
        height:.3rem;
        padding-left: 24%;
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
}
</style>
