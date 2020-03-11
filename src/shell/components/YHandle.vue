<template>
  <div class="y-handle" 
    @mousedown="mouseDown" 
  ></div>
</template>

<script>
export default {
  name: 'YHandle',
  data () {
    return {
      lastY:''
    }
  },

  mounted () {
    document.addEventListener('mouseup', this.mouseUp)
  },

  beforeDestroyed() {
    document.removeEventListener('mouseup', this.mouseUp)
  },


  methods: {
    mouseDown(event){
      document.addEventListener('mousemove', this.mouseMove)
      this.lastY = event.screenY
    },
    mouseMove(event){
      this.$emit('heightChange', this.lastY - event.screenY)
      this.lastY = event.screenY
    },
    mouseUp(event){
      this.lastY = ''
      document.removeEventListener('mousemove', this.mouseMove)
    },
  },
}
</script>

<style>
</style>