<template>
  <SimpleAccordion>
    <OptionGroup v-for="(optionGroup, i) in inputValue" :key="i" v-model="inputValue[i]">
    </OptionGroup>
  </SimpleAccordion>
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
    value:{ default:[] }, 
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
  methods: {
  },
}
</script>
