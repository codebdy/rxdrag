<template>
  <div class="simple-accordion">
    <CollapsibleItem 
      v-for="(group, i) in groups"
      :selected = 'i == 0 ? true : false'
      :key = "i"
      @itemClick = "itemClick"
    >
      <template #heading>
        <span>{{group.title}}</span>
        <small v-if="group.smallTitle">{{group.smallTitle}}</small>
      </template>
      <template #body>
        <MouseOverPop 
          class = "toolbox-element"
          v-for = "(item,j) in group.items"
          :key = "j"
        >
          <template #heading>
            <div class="element-title">
              <i class="fas fa-file"></i> {{item.title}}
            </div>
          </template>
          <template #body>
            <div v-if="item.thumbnail" class="pop-content">
              <img style="width: 100%;" :src="item.thumbnail" />
            </div>
          </template>
        </MouseOverPop>
      </template>
    </CollapsibleItem>
  </div>
</template>

<script>
import CollapsibleItem from '../accordion/CollapsibleItem.vue'
import MouseOverPop from './MouseOverPop.vue'
export default {
  name: 'ToolboxAccordion',
  components:{
    CollapsibleItem,
    MouseOverPop,
  },
  props:{
    groups:{ default:[] }, 
  },
  data() {
    return {items: [] }
  },
  
  created() {
    this.items = this.$children
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

}
</script>
