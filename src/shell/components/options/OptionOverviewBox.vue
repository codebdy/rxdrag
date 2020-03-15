<template>
  <div class="option-overview-box">
    <div 
      class="overview-box-content"
      v-if="node"
    >
      <div class="tag-row">
        <div class="label">{{$t('overview-box.tag')}}</div> <input :value="node.meta.tag" />
      </div>
      <div class="class-area">
        <div class="label"> {{$t('overview-box.classes')}}</div>
        <RxLabelInput v-model="node.meta.classList"></RxLabelInput> 
      </div>
      <div>
        <div class="label">{{$t('overview-box.attributes')}}</div>
        <RxNameValueInput v-model="node.meta.attributes"></RxNameValueInput>
      </div>
    </div>
    <div v-else style="padding:20px;">
      {{$t('optionbox.no-selected')}}
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
    value:{ default:()=> {return {}} }, 
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
      node:null,
      pageId:'',
      //classList:[],
      //attributes:{},
    }
  },
  mounted () {
    $bus.$on('focusNode', this.focusNode)
    $bus.$on('unFocusNode', this.unFocusNode)
    $bus.$on('optionBoxChangedNode', this.nodeChanged)
  },

  beforeDestroyed() {
    $bus.$off('focusNode', this.focusNode)
    $bus.$off('unFocusNode', this.unFocusNode)
    $bus.$off('optionBoxChangedNode', this.nodeChanged)
  },
  methods: {

    focusNode(node, pageId){
      //console.log(node)
      this.node = node
      this.pageId = pageId
    },

    unFocusNode(){
      this.node = null
      this.pageId = ''
    },

    nodeChanged(node, pageId){
      this.node = node
      this.pageId = pageId
    },
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
