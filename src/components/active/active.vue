<template>
  <div>
   active
   <foot></foot>
  </div>
</template>

<script>
import foot from '@/components/aashare/foot';
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
   components: {
      foot
  }
}
</script>


<style scoped>

</style>
