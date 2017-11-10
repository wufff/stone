<template>
     <div class="goods_hot">
           <div class="hot_title"><divider v-show="hotData">{{params.title}}</divider></div>
           <div class="forat" 
              v-infinite-scroll="loadMore"
              infinite-scroll-disabled="loading"
               infinite-scroll-distance="10" id="forat">
                <div class="clearfix">
                      <div class="itemWrap" v-for="(item,index) in hotData">
                         <div style="position:relative;">
                           <router-link :to ="{ path: '/detail',query:{ id: item.id }}">
                             <div class="goodImgwarp">
                                   <!-- <img v-lazy="item.pic" forat="item.pic"> -->
                                   <img v-lazy="item.image">
                              </div>
                              <p class="name">
                                <span class="tag">{{item.tags[0]}}</span>{{item.name}}
                             </p>
                            </router-link>
                             <div class="priceWarp">
                                 <span v-show="item.hasLike">
                                    <span class="icon-点赞空心" style="color:red;"></span>
                                    <span class="num">{{item.likeCount}}</span>
                                 </span>
                                 <span v-show="!item.hasLike" @click.prevnet="like(index,item.id)">
                                    <span class="icon-点赞空心"></span>
                                    <span class="num">{{item.likeCount}}</span>
                                 </span>
                                         &nbsp&nbsp 
                                 <span><span class="icon-浏览 liulan"></span> <span class="num">{{item.pv}}</span></span>
                             </div>
                        </div>
                    </div>           
                </div>
           </div>
           <div class="spinnerWap" v-show="!isBottom" v-if="hotData">
                    <spinner type="spiral" size="20px"></spinner><span class="jz">努力加载中...</span>
           </div>
     </div>
   
</template>

<script type="ecmascript-6">
import { Divider } from 'vux';
import api from '@/api';
import { Spinner } from 'vux';
    export default {
    name: '',
    props:['params'],
    data(){
      return {
      	title:"",
      	hotData:"",
      	isBottom:false,
      	loading:false,
      	scroll:false,
      	page:1
      }
    },

    created:function(){
  api.ajaxLaodingN('',
     this.params.action,{"pageIndex":this.page,"pageSize":6}
    ).then(res=>{
    	 console.log(res);
       this.hotData = res.data.result.products;
       this.scroll = true;
       this.page ++;
     if(!res.data.result.hasNext){
            this.isBottom = true;
            this.scroll = false ;
         }
    }).catch(()=>{
      console.log("失败");
    })
    },

    methods:{
      like(index,id){
        api.ajax('',
         "Goods/Like",{"id":id}
        ).then(res=>{
          console.log(res);
         if(res.data.result){
             this.$vux.toast.show({
                          text: '点赞成功',
                          type:"text",
                          time:1000
                     });
              this.hotData[index].hasLike = true;
                }else {
             this.$vux.toast.show({
                          text: '已经点过赞',
                          type:"text",
                          time:1000
                });
            }
        }).catch(()=>{
          console.log("失败");
        });
      },

    	loadMore(){
	        if(this.scroll == false){
	           return;
	          };
	       console.log("进入更多");
	       this.loading = true; 
           api.ajaxN('',
			      this.params.action,{"pageIndex":this.page,"pageSize":6}
			    ).then(res=>{
			     var data = res.data.result.products;
			       this.page ++;
			       this.hotData.push(...data);
			       this.loading = false;
			    if(!res.data.result.hasNext){
				     this.isBottom = true;
				     this.scroll = false ;
				   }
			    }).catch(()=>{
			      console.log("失败");
			    })
    	}
    },

    components: {
        Divider,
        Spinner
    }
  }
</script>

<style lang="less" scoped>
@rem: 23.45rem;
.hot_title {
   background-color: #fff;
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
           
           background-color: #fff;
           position: relative;
         }
         .goodImgwarp {
           margin-bottom:10/@rem;
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
          color: #545352;
          padding: 0 10/@rem;
          font-size: 14/@rem;
          height: 36/@rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
         -webkit-line-clamp: 2;
          overflow: hidden;
          padding: 0 5/@rem;
          padding-bottom: 15/@rem;
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
         background-color: #fff;
         padding-bottom: 10/@rem;
         padding-top: 8/@rem;
         .liulan {
           font-size: 18/@rem;
           position: relative;
           top:3/@rem;
         }
         .num {
           font-size: 12/@rem;
         }
      }
      .itemWrap:nth-of-type(1){
        padding-top: 2/@rem;
      }
      .itemWrap:nth-of-type(2){
        padding-top:  2/@rem;
      }
    }
    .spinnerWap {
    margin: 0 auto;
    text-align:  center;
    background-color: #eee;
    padding: 0 3/@rem;
    color: #fff;
    height: 35/@rem;
    padding-top: 7/@rem;
    .jz{
      margin-left: 10/@rem;
      color: #999;
    }
 }
 .spinnerWap  {
   color: #fff;
 }
</style>