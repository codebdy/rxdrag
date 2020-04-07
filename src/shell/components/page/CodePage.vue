<template>
  <div class="code-page">
    <div class="page-content">
      <textarea class="code-editor"
        v-model = "inputValue.code"
        :readonly="inputValue.locked ? 'readonly' : false"
        @focus = "onFocus"
        @blur = "onBlur"
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
  data() {
    return {
    }
  },

  mounted() {
    if(!this.inputValue.code && this.inputValue.path){
      $axios.get(this.inputValue.path)
      .then((res)=>{
        this.$set(this.inputValue, 'code', res.data)
      })
    }
  },

  methods: {
    onFocus(){
      this.oldCode = this.inputValue.code
    },

    onBlur(){
      if(this.oldCode !== this.inputValue.code){
        $rxbus.$emit('codeFileChange', this.inputValue)
      }
    }
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