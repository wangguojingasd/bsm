<template>
    <div class="introCon">
        <div class="infoTit">
            <div class="titBox"></div>
            <div class="titIn">系统介绍</div>
        </div>
        <div class="infoOne">
            <div class="infoList">
                <img src="../assets/show11.png" alt="">
                <div class="listTit">题型数</div>
                <div class="listNum">6</div>
            </div>
            <div class="infoList">
                <img src="../assets/show22.png" alt="">
                <div class="listTit">章节数</div>
                <div class="listNum">20</div>
            </div>
            <div class="infoList">
                <img src="../assets/show33.png" alt="">
                <div class="listTit">试卷数</div>
                <div class="listNum">100</div>
            </div>
            <div class="infoList">
                <img src="../assets/show44.png" alt="">
                <div class="listTit">试题数</div>
                <div class="listNum">1000</div>
            </div>
        </div>
        <div class="infoTwo">
            <div class="twoList">
                <div class="listCon"><div class="dian"></div> 本系统可根据用户对题型、题目、章节、题目分值和题目难度等选项选择，自动生成试卷及答案并可将生成的试卷按标准word文档格式保存。</div>
                <div class="listCon"><div class="dian"></div>本系统可根据用户需求，随时对题库题目进行增加、删除和修改。</div>
            </div>
            <div class="twoList">
                <div class="listCon"><div class="dian"></div>本系统可对已生成的试卷文件进行、打开、删除、刷新。</div>
                <div class="listCon"><div class="dian"></div>本系统的用户分为管理员、教师和学生三种权限，管理员拥有系统所有操作权限，教师拥有出题生成试卷的权限，学生可在线学习和测试。</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'info',
  data () {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
.introCon{
    width:66%;
    overflow: hidden;
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
    .infoOne{
        width:100%;
        height:.85rem;
        margin-bottom: .5rem;
        .infoList{
            width:2.1rem;
            height:1.1rem;
            float: left;
            margin-right: .1rem;
            position: relative;
            overflow: hidden;
            img{
                display: block;
                width:100%;
                height:100%;
            }
            .listTit{
                font-size: .22rem;
                color:#fff;
                position: absolute;
                top:35%;
                left:5%;
            }
            .listNum{
                width:40%;
                height:50%;
                font-size: .34rem;
                color:#fff;
                position: absolute;
                top:5%;
                left:50%;
                text-align: right;
            }
        }
    }
    .infoTwo{
        width:100%;
        overflow: hidden;
        .twoList{
            width:4.3rem;
            height:3rem;
            background: #fff;
            float: left;
            margin-right: .1rem;
            padding:.2rem .2rem .2rem .1rem;
            .listCon{
                width:100%;
                height:1.2rem;
                font-size: .18rem;
                color:#333;
                line-height: .3rem;
                position: relative;
                padding-left: .22rem;
                .dian{
                    width:.14rem;
                    height:.14rem;
                    border-radius: 50%;
                    background: #7d8ef7;
                    position: absolute;
                    top:4%;
                    left:1%;
                }
            }
        }
    }
}
</style>
