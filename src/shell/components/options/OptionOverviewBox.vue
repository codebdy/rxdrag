<template>
  <div class="option-overview-box">
    <div 
      class="overview-box-content"
      v-if="inputValue"
    >
      <div class="tag-row">
        <div class="label">{{$t('overview-box.tag')}}</div> 
        <input v-model="inputValue.meta.tag" 
          @change="tagChanged"
        />
      </div>
      <div class="class-area">
        <div class="label"> {{$t('overview-box.classes')}}</div>
        <RxLabelInput v-model="inputValue.meta.classList" @changed="classListChange"></RxLabelInput> 
      </div>
      <div>
        <div class="label">{{$t('overview-box.attributes')}}</div>
        <RxNameValueInput 
          :value="inputValue.meta.attributes"
          @changed = "attributesChanged"
        ></RxNameValueInput>
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
    value:{default : null}
  },
  data () {
    return {
      //node:null,
      //pageId:'',
      //classList:[],
      //attributes:{},
      //inited:true,
    }
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
  mounted () {
    //$rxbus.$on('focusNode', this.focusNode)
    //$rxbus.$on('unFocusNode', this.unFocusNode)
    //$rxbus.$on('optionBoxChangedNode', this.nodeChanged)
  },

  beforeDestroyed() {
   // $rxbus.$off('focusNode', this.focusNode)
    //$rxbus.$off('unFocusNode', this.unFocusNode)
    //$rxbus.$off('optionBoxChangedNode', this.nodeChanged)
  },
  methods: {

    //focusNode(node, pageId){
      //console.log(node)
    //  this.node = node
    //  this.pageId = pageId
    //  this.tag = node.meta.tag
      //this.classList = node.meta.classList
      //this.attributes = node.meta.attributes
    //},

    //unFocusNode(){
    //  this.node = null
    //  this.pageId = ''
    //},

    //nodeChanged(node, pageId){
    //  this.node = node
    //  this.pageId = pageId
    //},

    classListChange(val){
      //$rxbus.$emit('overViewBoxChangedClassList', val)
      $rxbus.$emit('overViewValueChange', this.inputValue)
    },

    tagChanged(){
      $rxbus.$emit('overViewValueChange', this.inputValue)
    },

    attributesChanged(value){
      this.inputValue.meta.attributes = value
      $rxbus.$emit('overViewValueChange', this.inputValue)
    }
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
