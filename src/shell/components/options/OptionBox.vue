<template>
  <SimpleAccordion
    v-if="options.length > 0"
  >
    <OptionGroup 
      v-for="(optionGroup, i) in options" 
      :key="i" 
      v-model="options[i]"
    >
    </OptionGroup>
  </SimpleAccordion>
  <div v-else style="padding:20px;">
    {{$t('optionbox.no-selected')}}
  </div>
</template>

<script>
import SimpleAccordion from '../accordion/SimpleAccordion.vue'
import OptionGroup from './OptionGroup.vue'
import {contains} from '../../../basic/rxarray'

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
      node:null,
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
      this.node = node
      for(var optionGroupName in node.optionsSchema){
        let optionGroup = {
          label:this.$t('optionbox.' + optionGroupName),
          rows:[]
        }
        let groupRows= node.optionsSchema[optionGroupName]

        groupRows.forEach(row=>{
          row.label = this.$t('optionbox.' + row.label)
          //v-model全部传入classList
          let value = row.isMultiple ? this.extractMultipleValue(row.valueScope) : this.extractValue(row.valueScope)
          this.$set(row, 'value',value)
          optionGroup.rows.push(row)
        })

        if(this.options.length ===0){
          optionGroup.selected = true
        }
        this.options.push(optionGroup)
      }
    },

    unFocusNode(id){
      this.options = []
    },

    extractValue(valueScope){
      for(var i = 0; i < valueScope.length; i ++){
        let value = valueScope[i]
        if(contains(value, this.node.meta.classList)){
          return value
        }
      }

      return ''
    },

    extractMultipleValue(valueScope){
      let values = []
      for(var i = 0; i < valueScope.length; i ++){
        let value = valueScope[i]
        if(contains(value, this.node.meta.classList)){
          values.push(value)
        }
      }
      return values
    }
  },

  //focusNode
}
</script>

