<template>
  <div class="bottom-area" :style="{height:height + 'px'}">
    <YHandle @heightChange="heightChange"></YHandle>
    <div class="bottom-inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import YHandle from './YHandle.vue'
export default {
  name: 'BottomArea',
  components:{
    YHandle,
  },
  data () {
    return {
      height:220,
    }
  },
  methods: {
    heightChange(movement){
      this.height += movement
      if(this.height < 60){
        this.height = 60
      }
      if(this.height > 600){
        this.height = 600
      }
    },
  },
}
</script>

<style>
</style>