<template>
  <div class="code-box">
    <textarea class="code-editor" 
      v-model="inputValue"
      @focus = "onFocus"
      @blur = "onBlur"
    ></textarea> 
  </div>
</template>

<script>
export default {
  name: 'CodeBox',
  components:{
  },
  props:{
    value:{ default:'' }, 
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
      isChanged:false,
      oldHtml : '',
    }
  },
  methods: {
    onFocus(){
      this.oldHtml = this.inputValue
    },

    onBlur(){
      if(this.inputValue != this.oldHtml){
        $rxbus.$emit('nodeHtmlChanged', this.inputValue)
      }
    }
  },
}
</script>
<style type="text/css">
  .code-box{
    flex: 1;
    overflow: auto;
    height: 0;
    display: flex;
    flex-flow: column;
    padding: 5px;
  }

  .code-editor{
    flex: 1;
    overflow: auto;
    outline: 0;
    background: rgba(0,0,0, 0.15);
    padding: 5px;
    font-size: 12px;
    resize: none;
    color:#75b325;
    outline: 0;
    border:0;
  }

</style>
