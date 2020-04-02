<template>
  <div class="code-page">
    <div class="page-content">
      <textarea class="code-editor"
        v-model = "inputValue.htmlCode"
        :readonly="inputValue.locked ? 'readonly' : false"
      ></textarea>
    </div>
  </div>
</template> 

<script>
export default {
  name: 'CodePage',
  props:{
    value:{ default:()=>{return{}} },
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

  mounted () {
  },

  beforeDestroyed() {
  },


  methods: {
  },
}
</script>

<style>
 .code-page{
    flex: 1;
    display: flex;
    flex-flow: column;
    height: 0;
  }

  .code-page .page-toolbar{
    height: 1px;
    background: #494c45;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
  }

  .code-page .page-content{
    flex: 1;
    height: 0;
    overflow: auto;
    display: block;
    border:#494c45 solid 1px;
  }
</style>