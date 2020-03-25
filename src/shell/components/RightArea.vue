<template>
  <div class="right-area" :style="{width:(width <= 90 ? 60 : width) + 'px'}">
    <XHandle @widthChange="widthChange"></XHandle>
    <div class="right-inner">
      <div class="top-area">
        <slot name="top"></slot>
      </div>
      <BottomArea>
        <slot name="bottom"></slot>
      </BottomArea>
    </div>
  </div>
</template>

<script>
import XHandle from './XHandle.vue'
import BottomArea from './BottomArea.vue'
export default {
  name: 'RightArea',
  components:{
    XHandle,
    BottomArea,
  },
  data () {
    return {
      width:220,
    }
  },
  methods: {
    widthChange(movement){
      this.width -= movement
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