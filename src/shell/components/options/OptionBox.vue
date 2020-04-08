<template>
  <div class="simple-accordion"
    v-if="inputValue.length > 0"
  >
    <OptionGroup 
      v-for="(optionGroup, i) in inputValue" 
      :key="i" 
      v-model="inputValue[i]"
      @itemClick = "itemClick"
    >
    </OptionGroup>
  </div>
  <div v-else style="padding:20px;">
    {{$t('optionbox.no-selected')}}
  </div>
</template>

<script>
import SimpleAccordion from '../accordion/SimpleAccordion.vue'
import OptionGroup from './OptionGroup.vue'

export default {
  name: 'OptionBox',
  extends: SimpleAccordion,
  components:{
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
    itemClick(clickedItem) {
      clickedItem.isActive = !clickedItem.isActive
      this.items.forEach(item => {
        if(item !== clickedItem){
          item.isActive = false
        }
      })
    }
  },

  //focusNode
}
</script>

