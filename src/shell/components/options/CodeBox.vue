<template>
  <div class="code-box">
    <div class="code-editor" contenteditable="true">
      {{inputValue}}
    </div>
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
    }
  },
  methods: {
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
  }

</style>
