<template>
    <div>
      <div  class="tabWrap" v-show="liData.length>0" :class="{tabfix:thisProps.tabfixClass}" id="tabWrap">
         <tab :line-width="2">
            <tab-item selected @on-item-click="onItemClickShop">销量</tab-item>
            <tab-item @on-item-click="onItemClickNew">上新</tab-item>
            <tab-item @on-item-click="onItemClickPic">精品</tab-item>
         </tab>
      </div>
   <!-- <div class="listWrap"  
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
               <ul :class="{tabfixUl:!thisProps.tabfixClass}">
                   <li v-for="(item,index) in liData">
                     <router-link :to="{path:'/detail',query:{id:item.id}}" class="clearfix">
                        <div class="left imgWrap">
                             <div class="imgbox" :style="{backgroundImage: 'url('+item.imgUrl+')'}"></div>
                        </div>
                        <div class="right infoWrap">
                           <h5>{{item.name}}</h5>
                           <p>已售出<span> {{item.sells}}</span> 件 <s>￥<span>{{item.s}}</span></s></p>                   
                           <div><span class="price">￥{{item.price}}</span></div>
                        </div>  
                        <span @click.prevent="popusShow(index)" class="addCartBt"><span class="icon-购物袋"></span></span>
                     </router-link>
                   </li>
                   <li v-if="liData.length<1" style="background-color:transparent;text-align:center;" v-text="pt"></li>
               </ul>  
    </div> -->
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
                                {{item.name}}
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
</template>

<script type="ecmascript-6">
import api from '@/api';
import { Tab, TabItem , Checker , CheckerItem , Group, XNumber ,XButton } from 'vux';
import { Popup } from 'vux';
import {Spinner} from 'vux';
function initP(p){
          if(p){
            return p;
          }else {
            return "";
          }
      }
    export default {
    name: 'listShare',
    props:['action','thisProps'],
    data(){
      return {
        index:0,
        upOrDown:true,
        isAcive: false,
        showSeclet:false,
        liData:[],
        page:1,
        sort:10,
        seclet:1,
        num:1,
        maxShore:7,
        amount:"",
        thisStand:0,
        thisGoodId:"",
        loading:false,
        scroll:false,
        hasnext:true,
        isBottom:false,
        selectData: [],
        selectVule: {},
        thisGoodImg:"",
        thisGoodTitle:"",
        show2:false,
        pt:"",
        userCartNum:0
      }
    },
    created:function(){
      api.ajaxLaoding('',
        this.action,{"searchKey":initP(this.$route.query.word),"storeId":initP(this.$route.query.storeId),"cateId":initP(this.$route.query.cate),"sort":10,"pageIndex":this.page,"pageSize":5}
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
       /*价格格式化*/
       price(value){
           var value=Math.round(parseFloat(value)*100)/100;
           var xsd=value.toString().split(".");
           if(xsd.length==1){
           value=value.toString()+".00";
           return value;
           }
           if(xsd.length>1){
           if(xsd[1].length<2){
            value=value.toString()+"0";
           }
           return value;
           }
       },

    /* 弹出购物车*/
      popusShow(index){
        this.thisGoodId = this.liData[index].id;
        this.thisGoodImg = this.liData[index].imgUrl;
        this.thisGoodTitle = this.liData[index].name;
         api.ajaxLaoding('',
           "Goods/SkuInfo",{"goodId":this.liData[index].id}
          ).then(res=>{
                 console.log(res);
                var data = res.data.result;              
                this.selectData = data;
                this.selectVule = this.selectData[0];
                this.userCartNum =  this.selectData[0].userCartNum;
                this.num  = 1;
                this.show2 = true;  
             });

      },
       closePopus(){
          this.show2 = false; 
       },
       /*选择型号*/
      choiceStand(index){
        this.thisStand = index;
        this.selectVule = this.selectData[index];
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
            this.action,{"searchKey":initP(this.$route.query.word),"storeId":initP(this.$route.query.storeId),"cateId":initP(this.$route.query.cate),"sort":this.sort,"pageIndex":this.page,"pageSize":5}
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
           this.action,{"searchKey":initP(this.$route.query.word),"storeId":initP(this.$route.query.storeId),"cateId":initP(this.$route.query.cate),"sort":20,"pageIndex":this.page,"pageSize":5}
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
      
      onItemClickPic(index){
          this.page = 1;
          this.isAcive = true;
          this.isBottom = false;
         if(this.index == 2){
           this.upOrDown = !this.upOrDown;
          if(this.upOrDown){
             this.sort = 30;
              api.ajax('',
           this.action,{"searchKey":initP(this.$route.query.word),"storeId":initP(this.$route.query.storeId),"cateId":initP(this.$route.query.cate),"sort":30,"pageIndex":this.page,"pageSize":5}
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
          }
          if(!this.upOrDown){
            this.sort = 40;
             api.ajax('',
          this.action,{"searchKey":initP(this.$route.query.word),"storeId":initP(this.$route.query.storeId),"cateId":initP(this.$route.query.cate),"sort":40,"pageIndex":this.page,"pageSize":5}
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
          }
        }else {
          this.index = index;
           if(this.upOrDown){
            this.sort = 30;
                api.ajax('',
            this.action,{"searchKey":initP(this.$route.query.word),"storeId":initP(this.$route.query.storeId),"cateId":initP(this.$route.query.cate),"sort":30,"pageIndex":this.page,"pageSize":5}
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

          }
          if(!this.upOrDown){
              this.sort = 40;
               api.ajax('',
           this.action,{"searchKey":initP(this.$route.query.word),"storeId":initP(this.$route.query.storeId),"cateId":initP(this.$route.query.cate),"sort":40,"pageIndex":this.page,"pageSize":5}
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
          }
        }
      },
      onItemClickUpDonw(){
         if(this.index == 2){
            this.page = 1;
           this.upOrDown = !this.upOrDown;
           this.isBottom = false;
            if(this.upOrDown){
               this.sort = 30;
                  api.ajaxLaoding('',
            this.action,{"searchKey":initP(this.$route.query.word),"storeId":initP(this.$route.query.storeId),"cateId":initP(this.$route.query.cate),"sort":30,"pageIndex":this.page,"pageSize":5}
                ).then(res=>{
                  var data = res.data.result.data;
                   this.hasnext = res.data.result.hasNext;
                  console.log(res);
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
          }
          if(!this.upOrDown){
            this.sort = 40;
              api.ajaxLaoding('',
             this.action,{"searchKey":initP(this.$route.query.word),"storeId":initP(this.$route.query.storeId),"cateId":initP(this.$route.query.cate),"sort":40,"pageIndex":this.page,"pageSize":5}
                ).then(res=>{
                  var data = res.data.result.data;
                  this.hasnext = res.data.result.hasNext;
                  console.log(res);
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
          }
        }
      },
      loadMore() {
      if(this.scroll == false){
           return;
      }
        console.log("进入更多");
        this.loading = true; 
        api.ajax('',
            this.action,{"searchKey":initP(this.$route.query.word),"storeId":initP(this.$route.query.storeId),"cateId":initP(this.$route.query.cate),"sort":this.sort,"pageIndex":this.page,"pageSize":5}
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
      },
     
    },

  computed:{
    maxNmb(){
      return this.selectVule.storage;
    },
     storeNmb(){
      return "库存 "+ this.selectVule.storage;
    },
   /* 总价*/
    totPic(){
      return this.selectVule.price * this.num;
    }
   },

   components: {
    Tab,
    TabItem,
    Checker,
    CheckerItem,
    XNumber,
    Group,
    XButton,
    Spinner,
    Popup
  }

  }
</script>
<style lang="less" src="../../../static/style/search.less" scoped></style>
<style lang="less" src="../../../static/style/popup.less" scoped></style>
<style lang="less" scoped>
@rem: 23.45rem;
.tabWrap {
    position:fixed;
    z-index: 500;
    width: 100%;
    top:43/@rem;
    border-bottom: 1px solid #eee;
    .up {
       position: absolute;
       right: 18/@rem;
      top:10/@rem;
    }
    .up.active i{
       color: #04BE02;
    }
} 
/*店铺页面修改定位*/
.tabfix {
    position:relative;
    top:0;
    margin-bottom: 8/@rem;
}
.tabfixUl {
  margin-top: 50/@rem;
}


.listWrap {
    padding:0/@rem 8/@rem 0 8/@rem;
    li {
      margin-bottom:8/@rem; 
      background-color: #fff;
      a {
         height: 120/@rem;
         position: relative;
         .imgWrap {
          width: 120/@rem;
          padding: 10/@rem;
          height: 100%;
          .imgbox {
             width: 100%;
             height: 100%;
             background-repeat: no-repeat;
             background-position: center;
             background-size: contain;
             background-color: #eee;
          }
         }
         .right {
           width: 237/@rem;
           height: 100%;
           
           padding: 12/@rem;
           padding-left: 0/@rem;
           h5{
              margin-bottom: 8/@rem;
              height: 38/@rem;
              
              overflow: hidden;
              text-overflow:ellipsis;
             /* font-weight: normal;*/
              font-weight: 600;
              line-height: 19/@rem;
           }
           p {
              font-size: 13/@rem;
              margin-bottom: 5/@rem;
           }
         }
        .addCartBt {
          position: absolute;
          right: 15/@rem;
          bottom: 15/@rem;
          font-size: 20/@rem;
        }
      }
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
           margin-bottom:2/@rem;
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
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          margin-bottom: 5/@rem;
          color: #545352;
          font-weight: bold;
          padding: 0 10/@rem;
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
 
</style>