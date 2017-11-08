<template>
  <div>
   active
   <foot></foot>
  </div>
</template>

<script>
import foot from '@/components/share/foot';
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
