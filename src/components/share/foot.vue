<template>
  <div class="foot" id="foot">
       <router-link to="/discory">
              <div><span class="icon-首页"></span></div>
              <div>发现</div>
      </router-link>
      <router-link to="/active">
              <div><span class="icon-分类"></span></div>
              <div>活动</div>
      </router-link>
      <router-link to="/about">
              <div><span class="icon-购物车"></span></div>
              <div class="cartText">关于我们</div>
              <!-- <div class="ft">1</div> -->
      </router-link>
      <router-link to="/seek">
               <div><span class="icon-个人"></span></div>
               <div>咨询</div> 
      </router-link>
  </div>
</template>

<script type="ecmascript-6">
    export default {
    name: '',
    data(){
      return {
      	title:"" 
      }
    },
    created:function(){
      
    },
    methods:{
    	
    },

    components: {
   
  }

  }
</script>

<style lang="less">
@rem: 23.45rem;
.foot{ position: fixed;
       z-index: 500;
       bottom: 0;
       width: 100%;
       background-color: #F7F7FA; display: flex;}
.foot  a{
     display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    color: #999999;
    text-align: center;
    height: 50/@rem;
    padding-top: 7/@rem;
    border-top: 1px solid #eee;
    font-size: 12/@rem;
    position: relative;
    span {
       font-size: 22/@rem;
    }
}
.foot  a.router-link-active {
     color: red;
}
.cartText {
   position: relative;
   left:3/@rem;
}
.ft {
           position: absolute;
           right: 12/@rem;
            top:4/@rem;
           line-height: 20/@rem;
           background-color: red;
           color: #fff;
           z-index: 100;
           border-radius:100%;
          text-align: center;
          min-width: 20/@rem;
          height: 20/@rem;
           padding: 0 /@rem;
}
</style>