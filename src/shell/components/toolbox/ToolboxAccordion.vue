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
            <div class="element-title"
              @mousedown = "onDrag($event, item)"
            >
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
    <div v-show="draggedItem && showMouseFollower" 
      class="mouse-follower element-title" ref="mouseFollower"> 
      <i class="fas fa-file"></i> {{draggedItem ? draggedItem.title : ''}} 
    </div>
  </div>
</template>

<script>
import SimpleAccordion from '../accordion/SimpleAccordion.vue'
import CollapsibleItem from '../accordion/CollapsibleItem.vue'
import MouseOverPop from './MouseOverPop.vue'
export default {
  name: 'ToolboxAccordion',
  extends: SimpleAccordion,
  components:{
    CollapsibleItem,
    MouseOverPop,
  },
  props:{
    groups:{ default:[] }, 
  },

  data () {
    return {
      draggedItem : null,
      offsetX : 0,
      offsetY : 0,
      showMouseFollower : false,
    }
    
  },

  mounted () {
    document.addEventListener('mousemove', this.followMouse)
    document.addEventListener('mouseup', this.endFollowMouse)
    $rxbus.$on('endFollowMouse', this.endFollowMouse)
  },
  beforeDestroyed() {
    document.removeEventListener('mousemove', this.followMouse)
    document.removeEventListener('mouseup', this.endFollowMouse)
  },

  methods: {
    onDrag(event, item){
      this.beginFollowMouse(event, item)
      $rxbus.$emit('draggingFromToolbox', item)
    },

    followMouse(event){
      if(this.draggedItem){
        let mouseFollower = this.$refs.mouseFollower
        this.showMouseFollower = true
        mouseFollower.style.left =  this.followX(event)
        mouseFollower.style.top = this.followY(event)
      }
    },

    followX(event){
      return (event.clientX - this.offsetX - 2) + 'px'
    },

    followY(event){
      return (event.clientY - this.offsetY - 2) + 'px'
    },

    beginFollowMouse(event, item){
      this.draggedItem = item
      let mouseFollower = this.$refs.mouseFollower
      let target = event.target||event.srcElement
      let rect = target.getBoundingClientRect()

      mouseFollower.style.width = rect.width -30 + 'px'
      mouseFollower.style.height = rect.height -10 + 'px'
      this.offsetX = event.offsetX
      this.offsetY = event.offsetY
    },

    endFollowMouse(){
      this.showMouseFollower = false
      this.draggedItem = null
    },
  },
  
}
</script>

<style>
  .mouse-follower{
    position: fixed;
    background: #555555;
    opacity: 0.7;
    pointer-events: none;
  }

  .mouse-follower i{

  }
</style>
