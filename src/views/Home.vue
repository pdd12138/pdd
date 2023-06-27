<template>
    <div class="box">
        <div class="box_left">
          <el-card class="box-card">
        <div slot="header" class="clearfix">
            <div class="title">
                <div class="im">
                <img src="https://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20170821/3fcf2f22bf69448fb4a004362252ab06.jpeg" alt="">
                </div>
                <h2>程序员</h2>
            </div>
           
        </div>
            <div class="item_text">
               <p>
                  <span>上次登录时间</span>
                  <span>2021.11.23</span>
               </p>
               <p>
                <span>上次登录地点</span>
                <span>武安</span>
               </p>
            </div>
        </el-card>
        <!-- 购买统计 -->
        <el-card class="box-card" style="height: 516px;">
          <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="名称"
            width="100">
          </el-table-column>
          <el-table-column
            prop="todayBuy"
            label="今日购买"
            width="100">
          </el-table-column>
          <el-table-column
            prop="monthBuy"
            label="本月购买">
          </el-table-column>
          <el-table-column
            prop="totalBuy"
            label="总购买">
          </el-table-column>
        </el-table>
     
        </el-card>
        </div>
        <el-col :span="16">
          <div class="num">
            <el-card class="box-card" v-for=" item in icon" :key="item.id" :body-style="{display:'flex'}">
            <i class="icon" :class=item.icon :style="{background:item.color}"></i>
            <div class="detail">
           
              <h3 class="price">￥{{ item.price }}</h3> 
           
              <p class="deta_name">
                {{ item.name }}
              </p>
            </div>
          </el-card>
          </div>
          <div class="client">
            <el-card style="height: 240px;">
              <div ref="echarts1" style="height: 240px;"></div>
          </el-card>
          <div class="graph">
            <el-card class="box-card" style="height: 260px;">
              <div  ref="echarts2" style="height: 260px;"></div>
            </el-card>
            <el-card class="box-card" style="height: 260px;">
              <div  ref="echarts3" style="height: 260px;"></div>
            </el-card>
          </div>
          </div>
        </el-col>
        
    </div>
</template>
<script>

import AsideVue from "../components/Aside.vue";
import {getData} from '../api/index'
import * as Echarts from 'echarts'
export default{
    name:'Home',
    data() {
        return {
          tableData: [],
          icon:[
            {
              name:"今日支付订单",
              icon:'el-icon-s-goods',
              price:1234,
              color:"#2ec7c9"
            },
            {
              name:"今日收藏订单",
              icon:'el-icon-platform-eleme',
              price:134,
              color:"#5ab1ef"
            },
            {
              name:"今日未支付订单",
              icon:'el-icon-s-cooperation',
              price:124,
              color:"#ffb980"
            },
            {
              name:"本月收藏订单",
              icon:'el-icon-s-shop',
              price:123,
              color:"#2ec7c9"
            },
            {
              name:"本月支付订单",
              icon:'el-icon-s-shop',
              price:123,
              color:"#5ab1ef"
            },
            {
              name:"本月未支付订单",
              icon:'el-icon-s-shop',
              price:123,
              color:"#ffb980"
            },
          ],
            
     
        }
    },
    components:{
        AsideVue
    }
    ,mounted(){
      getData().then(({data})=>{
        this.tableData=data.getStatisticalData.data.tableData
        // 折线图
        const echarts= Echarts.init(this.$refs.echarts1)
        // 柱状图
        const echarts2=Echarts.init(this.$refs.echarts2)
        // 饼图
        const echarts3=Echarts.init(this.$refs.echarts3)
        // 柱状图数据
        this.$nextTick(function(){
          echarts.setOption(this.$options.methods.ecLine(data,'line','销量'))
        })
        this.$nextTick(function(){
          echarts2.setOption(this.$options.methods.ecBar(data,'bar','用户增长'))
        })
        this.$nextTick(function(){
          echarts3.setOption(this.$options.methods.ecBar2(data,'pie'))
        })
     
   
      })
   
    },
    methods:{
      ecLine(data,type,sales){
                // 折线图数据
       const {orderData}=data.getStatisticalData.data
       const xAxis=Object.keys(orderData.data[0])
       var opctions={
        title:{
          text:sales
        },
        
        tooltip:{},
        xAxis:{
          data:xAxis
        },
        legend:{
          data:xAxis
        },
        yAxis:{},
        series:[]
        
       }
       xAxis.forEach(key=>{
          opctions.series.push({
                    name: key,
                    data: orderData.data.map(item => item[key]),
                    type: type
                })
        })
       
        return opctions
      },
      ecBar(data,type,day){
        const {userData}=data.getStatisticalData.data
        
       console.log(userData)
        var optons={
          title:{
            text:day
          },
          xAxis:{
            data:userData.map(item=>item.date)
          },
          tooltip:{

          },
          yAxis:{

          },
          series:[
            {
            name:"新增用户",
            data:userData.map(item=>item.new),
            type:type
            },
            {
              name:"活跃用户",
              data:userData.map(item=>item.active),
              type:type
            }
          ],
          legend:{
            daat:['新增用户',"活跃用户"]
          }

        }
        return optons

      },
      ecBar2(data,type){
        const {videoData}=data.getStatisticalData.data
        console.log(videoData)
        let options={
          title:{
            text:'月销量',
          
          },
          tooltip:{
            
          },
          series:[
            {
             data:videoData,
             type:type
            }
          ]
        }
        return options
      }
      
    }
}
</script>
<style lang="less" scoped>

    .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

 .box_left{
  .box-card {
    width: 480px;
  }
 }
  .im{
    width: 150;
    height: 150px;
    display: flex;
    overflow: hidden;
    border-radius: 95%;
  
  }
  .title{
    display: flex;
    justify-content: space-around;
  }
  .item_text{
      display: flex;
      flex-direction: column;
      align-items: start;
      
    p{
      width: 100%;
      line-height: 20px;  
      display: flex;
      justify-content: space-between;
    }
  }
  .box-card{
    margin-bottom: 20px;
  }
  .box{
    display: flex;
    
  }
  .num{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-left: 20px;
    .box-card{
      width: 32%;
      .icon{
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: white;
      }
      .detail{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 20px;
        line-height: 20px;
        .price{
          margin-bottom: 20px;
        }
        .deta_name{
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
.client{
  margin-left: 26px;
  .graph{
    margin-top: 20px;
    display: flex;
    justify-content:space-between;
    .box-card{
      width: 480px;
    }
  }

}
</style>
