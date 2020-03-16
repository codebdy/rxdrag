<template>
  <SimpleAccordion
    v-if="inputValue.length > 0"
  >
    <OptionGroup 
      v-for="(optionGroup, i) in inputValue" 
      :key="i" 
      v-model="inputValue[i]"
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

export default {
  name: 'OptionBox',
  components:{
    SimpleAccordion,
    OptionGroup
  },
  props:{
    value:{ default:[] }, 
  },
  data () {
    return {
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
  },

  beforeDestroyed() {
  },
  methods: {
  },

  //focusNode
}
</script>

