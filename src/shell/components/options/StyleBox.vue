<template>
  <div class="style-box" v-if="inputValue">
    <RxNameValueInput 
      :value="inputValue.meta.styles"
      @changed = "stylesChanged"
    ></RxNameValueInput>
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
    stylesChanged(value){
      this.inputValue.meta.styles = value
      $rxbus.$emit('styleValueChange', this.inputValue)
    }
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
