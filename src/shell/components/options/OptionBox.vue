<template>
  <SimpleAccordion
    v-if="options.length > 0"
  >
    <OptionGroup v-for="(optionGroup, i) in options" :key="i" v-model="options[i]">
    </OptionGroup>
  </SimpleAccordion>
  <div v-else style="padding:20px;">
    {{$t('optionbox.no-selected')}}
  </div>
</template>

<script>
import SimpleAccordion from '../accordion/SimpleAccordion.vue'
import OptionGroup from './OptionGroup.vue'

export default {
  name: 'OptionBox',
  components:{
    SimpleAccordion,
    OptionGroup
  },
  props:{
    //value:{ default:[] }, 
  },
  data () {
    return {
      options:[],
    }
  },
  mounted () {
    $bus.$on('focusNode', this.focusNode)
    $bus.$on('unFocusNode', this.unFocusNode)
  },

  beforeDestroyed() {
    $bus.$off('focusNode', this.focusNode)
    $bus.$off('unFocusNode', this.unFocusNode)
  },
  methods: {
    focusNode(node){
      for(var optionGroupName in node.optionsSchema){
        let optionGroup = {
          label:this.$t('optionbox.' + optionGroupName)
        }
        this.options.push(optionGroup)
      }
    },

    unFocusNode(id){
      this.options = []
    }
  },

  //focusNode
}
</script>

