<template>
  <div class="left-area" :class="sizeClass" :style="{width:(width <= 90 ? 60 : width) + 'px'}">
    <div class="left-inner">
      <div class="top-area">
        <slot name="top"></slot>
      </div>
      <BottomArea>
        <slot name="bottom"></slot>
      </BottomArea>
    </div>
    <XHandle @widthChange="widthChange"></XHandle>
  </div>
</template>

<script>
import XHandle from './XHandle.vue'
import BottomArea from './BottomArea.vue'
export default {
  name: 'LeftArea',
  components:{
    XHandle,
    BottomArea,
  },
  data () {
    return {
      width:280,
      sizeClass:"",
    }
  },
  created () {
  },
  methods: {
    widthChange(movement){
      this.width += movement
      if(this.width <= 60){
        this.width = 60
      }
      if(this.width >= 600){
        this.width = 600
      }
    },
  },
}
</script>

<style>
</style>