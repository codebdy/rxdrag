<template>
  <div class="style-box">
    <RxNameValueInput v-model="inputValue"></RxNameValueInput>
  </div>
</template>

<script>
import RxNameValueInput from '../inputs/RxNameValueInput.vue'
export default {
  name: 'StyleBox',
  components:{
    RxNameValueInput,
  },
  props:{
    value:{ default:{} }, 
  },
  computed:{
    inputValue: {
      get:function() {
        return this.value;
      },
      set:function(val) {
        this.$emit('input', val);
      },
    },
  },
  data () {
    return {
    }
  },
  methods: {
  },
}
</script>
<style type="text/css">
  .style-box{
    flex: 1;
    overflow: auto;
    height: 0;
    display: flex;
    flex-flow: column;
    padding: 5px;
  }

</style>
