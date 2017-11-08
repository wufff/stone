<template>
       <div class="Cwrap clearfix" id="Category">
         <ul class="list left">
            <li v-for="(item,index) in classDate" :class="{active:index == tabNow}" @click.prevent="goTab(index,item.id)">{{item.name}}</li>
         </ul>
         <div class="right">
           <!--  <span v-for="item in TowDetailList">
                <router-link :to="{path:'/list',query:{id:item.id}}">
                     {{item.name}}
                </router-link>
            </span> -->
            <div class="wrap clearfix">
                <div v-for="item in TowDetailList">
                      <div style="background-color:#eee;">
                        <router-link :to="{path:'/searchList',query:{cate:item.id}}">
                            <x-img :src="item.picUrl" error-class="ximg-class" ></x-img>
                            <span>{{item.name}}</span>
                       </router-link>
                      </div>
                </div>
            </div>
         </div>
      </div>
</template> 

<script type="ecmascript-6">
import api from '@/api';
import { XImg } from 'vux';
import { Indicator } from 'mint-ui';
    export default {
    name: '',
    data(){
      return {
      	/*classDate:["手机相机","大家电","食品酒水","电脑办公","厨卫电器","居家生活","食品酒水"],*/
        classDate:[],
        TowDetailList:[],
        tabNow:0,
        
      }
    },

    created:function(){
      Indicator.open();
    api.ajax('',
      "Category/getItemDetailList",{}
    ).then(res=>{
      var data = res.data.result.list;
      this.classDate = data.map( item => {
         return {
                   id: item.id,
                   name: item.name
                }
      });
    api.ajax('',
      "Category/getTowDetailList",{"id":this.classDate[0].id}
    ).then(res=>{
     Indicator.close();
      var data = res.data.result.list;
      this.TowDetailList = data.map( item => {
         return {
                   id: item.id,
                   name: item.name,
                   picUrl: item.picUrl
                }
      });
    }).catch(()=>{
      console.log("失败");
    });
    }).catch(()=>{
      console.log("失败");
    })
    },


    methods:{
      goTab(index,id){
        if(this.tabNow == index){
           return;
        }
        this.tabNow = index;
      api.ajaxLaoding('',
         "Category/getTowDetailList",{"id":id}
    ).then(res=>{
      console.log(res);
      var data = res.data.result.list;
      this.TowDetailList = data.map( item => {
         return {
                   id: item.id,
                   name: item.name,
                   picUrl: item.picUrl
                }
      });
      
    }).catch(()=>{
      console.log("失败");
    });

      }
    },

    components: {
      XImg
  }

  }
</script>

<style lang="less" scoped>
@rem: 23.45rem;
  .Cwrap{
     width: 100%;
     height: 100%;
     background-color: #fff;
     .list {
       width: 30%;
       background-color: #eee;
       min-height: 92%;
       li {
         height: 50/@rem;
         line-height: 52/@rem;
         margin-bottom: 1px;
         background-color: #e5e3e3;
         text-align: center;
         font-size: 14/@rem;
         color: #545352;
       }
       li.active {
        /* background-color: #fbf9fe;*/
        background-color: #fff;
         border-left: 2px red solid;
         color: red;
       }
     } 
     .right{
      /* background-color: green;*/
       width: 69%;
       min-height: 92%;
       background-color: #fff;
       padding-right: 3/@rem;
       .wrap > div {
          width: 33.33%;
          float: left;
          padding: 3/@rem;
         
       }
       .wrap > div > div{
         padding: 10/@rem 0;
       }
       a {
         text-align: center;
         font-size: 13/@rem;
         img {
           width: 40/@rem;
           height: 40/@rem;
           margin: 0 auto;
           display: block;
           margin-bottom: 8/@rem;
         }
       }
     }
  }
</style>