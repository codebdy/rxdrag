<template>
  <div class="option-overview-box">
    <div class="overview-box-content">
      <div class="tag-row">
        <div class="label">Tag</div> <input value="div" />
      </div>
      <div class="class-area">
        <div class="label"> Classes</div>
        <RxLabelInput v-model="model"></RxLabelInput> 
      </div>
      <div>
        <div class="label">Attributes</div>
        <RxNameValueInput v-model="attributes"></RxNameValueInput>
      </div>
    </div>
  </div>
</template>

<script>
import RxLabelInput from '../inputs/RxLabelInput.vue'
import RxNameValueInput from '../inputs/RxNameValueInput.vue'

export default {
  name: 'OptionOverviewBox',
  components:{
    RxLabelInput,
    RxNameValueInput
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
      model:[],
      attributes:{},
    }
  },
  methods: {
  },
}
</script>
<style type="text/css">
  .option-overview-box{
    flex: 1;
    width: 100%;
    overflow: auto;
    height: 0;
    display: flex;
    flex-flow: column;
  }

  .overview-box-content{
    padding: 10px;
    flex: 1;
    display: flex;
    flex-flow: column;
  }

  .tag-row{
    display: flex;
    flex-flow: row;
    width:100%;
  }

  .option-overview-box .label{
    display: flex;
    height: 30px;
    align-items: center;
    justify-content: flex-start;
    color:#c2c2c2;
    font-size: 12px;
    width: 70px;
    flex-shrink: 0;
  }

  .tag-row input{
    background: rgba(0,0,0, 0.15);
    color: #d3d3d3;
    outline: transparent;
    border: 0;
    padding: 3px;
    width: 100px;
  }

  .class-area{
    display: flex;
    flex-flow: column;
  }

</style>
