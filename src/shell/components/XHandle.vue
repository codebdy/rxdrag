<template>
  <div class="x-handle" 
    @mousedown="mouseDown" 
  ></div>
</template>

<script>
export default {
  name: 'XHandle',
  data () {
    return {
      //dragging : false,
      lastX:''
    }
  },

  mounted () {
    document.addEventListener('mouseup', this.mouseUp)
    $rxbus.$on('canvasMouseup', this.mouseUp)
  },

  beforeDestroyed() {
    document.removeEventListener('mouseup', this.mouseUp)
    $rxbus.$off('canvasMouseup', this.mouseUp)
  },


  methods: {
    mouseDown(event){
      document.addEventListener('mousemove', this.mouseMove)
      $rxbus.$on('canvasMouseMove', this.mouseMove)
      this.lastX = event.screenX
    },
    mouseMove(event){
      this.$emit('widthChange', event.screenX - this.lastX)
      this.lastX = event.screenX
    },
    mouseUp(event){
      this.lastX = ''
      document.removeEventListener('mousemove', this.mouseMove)
      $rxbus.$off('canvasMouseMove', this.mouseMove)
    },
  },
}
</script>

<style>
</style>