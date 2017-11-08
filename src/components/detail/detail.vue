<template>
    <div>
    <div class="backBt"  @click.prenvet="goBack">
         <i class="fa fa-angle-left"></i>
      </div>
    <ul>
        <li class="page-lazyload-listitem" v-for="item in list">
         <img v-lazy="item" class="page-lazyload-image">
      </li>
    </ul>
    </div>
</template>

<script type="ecmascript-6">
import { Lazyload } from 'mint-ui';
    export default {
    name: '',
    data(){
      return {
         list: [
          'http://fuss10.elemecdn.com/b/18/0678e57cb1b226c04888e7f244c20jpeg.jpeg',
          'http://fuss10.elemecdn.com/3/1e/42634e29812e6594c98a89e922c60jpeg.jpeg',
          'http://fuss10.elemecdn.com/1/c5/95c37272d3e554317dcec1e17a9f5jpeg.jpeg',
          'http://fuss10.elemecdn.com/7/85/e478e4b26af74f4539c79f31fde80jpeg.jpeg',
          'http://fuss10.elemecdn.com/b/df/b630636b444346e38cef6c59f6457jpeg.jpeg',
          'http://fuss10.elemecdn.com/7/a5/596ab03934612236f807b92906fd8jpeg.jpeg'
        ]
      }
    },
    created:function(){
      
    },
    methods:{
      goBack(){
         window.history.go(-1);
      }
    }
  }
</script>

<style lang="less" scoped>
@rem: 23.45rem;
  img {
    display: block;
    width: 100%;
  }
  .backBt {
     width: 35px;
     height:35px;
     border-radius: 50%;
     background-color: rgba(0,0,0,0.2);
     color: #fff;
     line-height: 35px;
     text-align: center;
     position: fixed;
     left: 20/@rem;
     top:18/@rem;
     i {
      font-size: 20px;
     }
  }  
</style>