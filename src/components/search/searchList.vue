<template>
    <div class="searchList">
       <div class="searchtitle clearfix">
         <div class="left goBack" @click.prevent="goBack">
           <i class="fa fa-angle-left"></i>
        </div>
         <div class="left">{{title}}</div>
         <div class="right color" @click.prevent="filter">筛选</div>
      </div>
        <div class="content">
          <div  class="tabWrap" v-show="liData.length>0" id="tabWrap">
         <tab :line-width="2">
            <tab-item selected @on-item-click="onItemClickShop">销量</tab-item>
            <tab-item @on-item-click="onItemClickNew">上新</tab-item>
            <tab-item @on-item-click="onItemClickPic">精品</tab-item>
         </tab>
      </div>
       <div class="forat" 
              v-infinite-scroll="loadMore"
              infinite-scroll-disabled="loading"
               infinite-scroll-distance="10" id="forat">
                <div class="clearfix">
                      <div class="itemWrap" v-for="(item,index) in liData">
                         <div style="position:relative;">
                           <router-link :to ="{ path: '/detail',query:{ id: item.id }}">
                             <div class="goodImgwarp">
                                   <img v-lazy="item.imgUrl" forat="item.imgUrl" lazy="loading">
                              </div>
                              <p class="name">
                                <span class="tag">玉石大</span>{{item.name}}
                             </p>
                             <div class="priceWarp">
                                 <span><i class="fa fa-heart"></i> 11</span>
                                         &nbsp&nbsp 
                                 <span><i class="fa fa-eye"></i> 12</span>
                             </div>
                          </router-link>
                        </div>
                    </div>           
                </div>
                <div v-if="liData.length<1" style="background-color:transparent;text-align:center;" v-text="pt"></div>
      </div>
      <div class="spinnerWap" v-show="!isBottom" v-if="liData.length>0">
                    <spinner type="spiral" size="20px"></spinner><span class="jz">努力加载中...</span>
        </div>
         <div class="spinnerWap" v-show="isBottom" v-if="liData.length>0">
                   <span>已全部显示！</span>
        </div>
        </div>


         <popup v-model="filterPoup" position="right" width="100%">
              <div class="wrapPoup">
                 <div class="head clearfix">
                    <span class="left" @click.prevent="closePopus">取消</span>
                    <span class="right">确定</span>
                 </div>
                 <div class="item_content">
                    <ul>
                       <li>
                          <div class="title">
                             分类
                          </div>
                          <ul class="item_ul clearfix">
                             <li class="active">
                               <div>子分类一</div>
                             </li>
                             <li>
                               <div>子分类一</div>
                             </li>
                             <li>
                               <div>子分类一</div>
                             </li>
                             <li>
                               <div>子分类一</div>
                             </li>
                             <li>
                               <div>子分类一</div>
                             </li>
                             <li>
                               <div>子分类一</div>
                             </li>
                          </ul>
                       </li>

                    </ul>
                    <ul>
                       <li>
                          <div class="title">
                             分类
                          </div>
                          <ul class="item_ul clearfix">
                             <li>
                               <div>子分类一</div>
                             </li>
                             <li>
                               <div>子分类一</div>
                             </li>
                             <li>
                               <div>子分类一</div>
                             </li>
                             <li>
                               <div>子分类一</div>
                             </li>
                             <li>
                               <div>子分类一</div>
                             </li>
                             <li>
                               <div>子分类一</div>
                             </li>
                          </ul>
                       </li>

                    </ul>
                 </div>
              </div>
           </popup>
    </div>
   
</template>

<script type="ecmascript-6">
import {Spinner} from 'vux';
import { Tab, TabItem } from 'vux';
import { Popup } from 'vux';
import api from '@/api';
function initP(p){
          if(p){
            return p;
          }else {
            return "";
          }
      }
    export default {
    name: 'searchList',
    data(){
      return {
      	title:"",
        storeName:"",
        index:0,
        liData:[],
        sort:10,
        isBottom:false,
        scroll:false,
        isAcive: false,
        page:1,
        pt:"",
        filterPoup:false
      }
    },
    created:function(){
      if(this.$route.query.word){
        this.title = this.$route.query.word;
      }else {
         this.title = "全部商品";
      }
       if(this.$route.query.storeName){
        this.storeName = this.$route.query.storeName;
      }else {
         this.storeName = "";
      }


      api.ajaxLaoding('',
        "Search/SearchResultList",{"searchKey":initP(this.$route.query.word),"storeId":initP(this.$route.query.storeId),"cateId":initP(this.$route.query.cate),"sort":10,"pageIndex":this.page,"pageSize":5}
          ).then(res=>{
            var data = res.data.result.data;
            this.hasnext = res.data.result.hasNext;
            console.log(res);
            this.pt = "无匹配~！";
            this.liData = data.map( item => {
                     return {
                               id:item.id,
                               name: item.title,
                               sells: item.salesCount,
                               price: item.price,
                               s:item.marketPrice,
                               imgUrl:item.pic
                            }
                 });
        this.scroll = true;
        this.page++;
        if(!this.hasnext){
              this.isBottom = true;
              this.scroll = false ;
         }
         }).catch(()=>{
          console.log("失败");
        });
    },
    methods:{
    	goBack(){
    		window.history.go(-1);
    	},
      filter(){
        this.filterPoup = true;
      },
      closePopus(){
        this.filterPoup = false;
      },
      onItemClickShop(index){
        if(this.index == 0){
            return
        }
        this.isBottom = false;
        this.index = index;
        this.isAcive = false;
        this.page = 1;
        this.sort = 10;
        api.ajax('',
            "Search/SearchResultList",{"searchKey":initP(this.$route.query.word),"storeId":initP(this.$route.query.storeId),"cateId":initP(this.$route.query.cate),"sort":this.sort,"pageIndex":this.page,"pageSize":5}
                ).then(res=>{
                  var data = res.data.result.data;
                  this.hasnext = res.data.result.hasNext;
                  this.liData = data.map( item => {
                           return {
                                     id:item.id,
                                     name: item.title,
                                     sells: item.salesCount,
                                     price: item.price,
                                     s:item.marketPrice,
                                     imgUrl:item.pic
                                  }
                       });
                  this.page ++;
                  this.scroll = true;
                  if(!this.hasnext){
                    this.isBottom = true;
                    this.scroll = false ;
                  }
               }).catch(()=>{
                console.log("失败");
              });  
      },
      onItemClickNew (index) {
        if(this.index == 1){
          return;
        }
         this.index = index;
         this.isBottom = false;
        this.isAcive = false;
        this.page = 1;
        this.sort = 20;
        api.ajax('',
           "Search/SearchResultList",{"searchKey":initP(this.$route.query.word),"storeId":initP(this.$route.query.storeId),"cateId":initP(this.$route.query.cate),"sort":20,"pageIndex":this.page,"pageSize":5}
                ).then(res=>{
                
                  var data = res.data.result.data;
                  this.hasnext = res.data.result.hasNext;
                  this.liData = data.map( item => {
                           return {
                                     id:item.id,
                                     name: item.title,
                                     sells: item.salesCount,
                                     price: item.price,
                                     s:item.marketPrice,
                                     imgUrl:item.pic
                                  }
                       });
                  this.page ++;     
                  this.scroll = true; 
                  if(!this.hasnext){
                    this.isBottom = true;
                    this.scroll = false ;
                  }  
               }).catch(()=>{
                console.log("失败");
              });  
          
      },
       onItemClickPic(index) {
        if(this.index == 2){
          return;
        }
         this.index = index;
         this.isBottom = false;
        this.isAcive = false;
        this.page = 1;
        this.sort = 30;
        api.ajax('',
           "Search/SearchResultList",{"searchKey":initP(this.$route.query.word),"storeId":initP(this.$route.query.storeId),"cateId":initP(this.$route.query.cate),"sort":30,"pageIndex":this.page,"pageSize":5}
                ).then(res=>{
                
                  var data = res.data.result.data;
                  this.hasnext = res.data.result.hasNext;
                  this.liData = data.map( item => {
                           return {
                                     id:item.id,
                                     name: item.title,
                                     sells: item.salesCount,
                                     price: item.price,
                                     s:item.marketPrice,
                                     imgUrl:item.pic
                                  }
                       });
                  this.page ++;     
                  this.scroll = true; 
                  if(!this.hasnext){
                    this.isBottom = true;
                    this.scroll = false ;
                  }  
               }).catch(()=>{
                console.log("失败");
              });  
          
      },
      loadMore() {
      if(this.scroll == false){
           return;
      }
        console.log("进入更多");
        this.loading = true; 
        api.ajax('',
            "Search/SearchResultList",{"searchKey":initP(this.$route.query.word),"storeId":initP(this.$route.query.storeId),"cateId":initP(this.$route.query.cate),"sort":this.sort,"pageIndex":this.page,"pageSize":5}
                ).then(res=>{
                    console.log(res);
                  var data = res.data.result.data;
                  this.hasnext = res.data.result.hasNext;
                  var item = data.map( item => {
                           return {
                                     id:item.id,
                                     name: item.title,
                                     sells: item.salesCount,
                                     price: item.price,
                                     s:item.marketPrice,
                                     imgUrl:item.pic
                                  }
                       });
                  this.liData.push(...item);
                  this.loading = false; 
                  this.page ++;
                  if(!this.hasnext){
                     this.isBottom = true;
                     this.scroll = false ;
                  }
        }).catch(()=>{
                console.log("失败");
       });  
      }
    },
    components: {
     Spinner,
     Tab, 
     TabItem,
     Popup
  }
  }
</script>

<style lang="less" scoped>

@rem: 23.45rem;
.tabWrap {
    position:fixed;
    z-index: 500;
    width: 100%;
    top:43/@rem;
    border-bottom: 1px solid #eee;
} 

.content {
    padding-top: 87/@rem;
}
#storeName {
   padding-right: 15/@rem;
}
.searchtitle {
   height: 43/@rem;
   position: fixed;
   left:0;
   right: 0;
   top:0;
   z-index: 490;
   border-bottom: 1px solid #eee;
   background-color: #fff;
   .left, .right {
    height: 100%;
    line-height: 42/@rem;
   }
   .right {
     padding-right: 15/@rem;
   }
   .goBack {
      width: 40/@rem;
      font-size: 24/@rem;
      text-align: center;
   }
}
.forat {
       padding: 0 2/@rem 3/@rem 2/@rem;
       .itemWrap {
         width: 50%;
         float: left;
         padding:4/@rem 2/@rem 0 2/@rem;
         position: relative;
          .gedang {
              width: 100%;
              height: 100%;
              position: absolute;
              background-color: rgba(0, 0, 0, 0.1);
              top:0;
              left:0;
              z-index: 3;
           }
         a {
           display: block;
           padding-bottom: 10/@rem;
           background-color: #fff;
           position: relative;
         }
         .goodImgwarp {
           margin-bottom:5/@rem;
           height: 182/@rem;
           color: #fff;
           img{ width: 100%;height: 100%;display: block;}
           img[lazy=loading]{
             /* display: block;
              height: 100%;
              width: 50px;
              margin: 0 auto;*/
              background-color: #eee;
           } 

           .goodImg.noImg{
             text-align: center;
             font-size: 32/@rem;
             padding-top: 30/@rem;
             font-weight: bold;
             color: #fff;
             text-shadow:2px 2px 4px #fff;
           }
         }
       .name {
          font-size: 14/@rem;
          margin-bottom: 5/@rem;
          color: #545352;
          padding: 0 10/@rem;
          font-size: 14/@rem;
          height: 36/@rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
         -webkit-line-clamp: 2;
          overflow: hidden;
          padding: 0 5/@rem;
          margin-bottom: 5/@rem;
          line-height: 18/@rem;
          .tag {
             background-color: red;
             color: #fff;
             margin-right: 5/@rem;
             font-size: 12/@rem;
             padding: 1px 4/@rem 1px 4/@rem; 
             border-radius: 5/@rem; 
             display: inline-block;
          }
       }  
       .xzBox {
         position: absolute;
         right: 20/@rem;
         top: 10/@rem;
         width: 30/@rem;
         color: red;
       }
       }
      .priceWarp {
         text-align: center;
      }
      /*.itemWrap:nth-of-type(1){
        padding-top: 2px;
      }
      .itemWrap:nth-of-type(2){
        padding-top:  2px;
      }*/
    }
    .spinnerWap {
    margin: 0 auto;
    text-align:  center;
    background-color: #eee;
    padding: 0 3/@rem;
    color: #fff;
    height: 35/@rem;
    padding-top: 7/@rem;
    color: #fff;
    .jz{
      margin-left: 10/@rem;
      color: #999;
    }
 }
 .wrapPoup {
   background-color: #fff;
   height: 100%;
   .head {
      padding: 10/@rem 15/@rem;
      border-bottom:1px solid #999; 
      margin-bottom: 6/@rem;
     .left {padding:6/@rem 14/@rem;border:1px solid orange; color:orange; border-radius: 5/@rem;}
     .right{padding:6/@rem 14/@rem;border:1px solid #04BE02; color:#04BE02; border-radius: 5/@rem;} 
   }
  .title {
     text-align: center;
     padding: 5/@rem 0;
     border-top:1px solid #999;
     border-bottom: 1px solid #999;
  }
  .item_ul{
     padding: 3/@rem;
     li {
       padding: 3/@rem;
       width: 25%;
       float: left;
       div {
         width: 100%;
         border:1px solid #999;
         border-radius: 5/@rem;
         padding: 6/@rem 0;
         text-align:  center;
       }
     }
     li.active > div {
       background-color: #04BE02;
       color: #fff;
     }
  }
 }
</style>