<template>
  <div class="rx-toolbox"
    :style="{
      top : top + 'px',
      right : right + 'px',
      height : height + 'px',
      width : width + 'px'
    }"
  >
    <div class="toolbox-handle"
      @mousedown = "startMove"
    >
      <div></div>
      <span class="toolbox-close">×</span>
    </div>
    <div>Toolbox Body</div>

    <div class="top-handle"
      @mousedown = "startChangeHeightAndTop"
    >
    </div>
    <div class="bottom-handle"
      @mousedown = 'startChangeHeightAndBottom'
    >
    </div>
    <div class="left-handle"
      @mousedown = "startChangeWidthAndLeft"
    >
    </div>
    <div class="right-handle"
    @mousedown = "startChangeWidthAndRight"
    >
    </div>
    <div class="left-top-handle"
      @mousedown = "startChangeLeftTop"
    >
    </div>
    <div class="right-top-handle"
      @mousedown = "startChangeRightTop"
    >
    </div>
    <div class="left-bottom-handle"
      @mousedown = "startChangeLeftBottom"
    >
    </div>
    <div class="right-bottom-handle"
      @mousedown = "startChangeRightBottom"
    >
    </div>
  </div>
</template>

<script>
export default {
  name: 'XHandle',
  data () {
    return {
      //dragging : false,
      lastX:'',
      lastY:'',
      top:50,
      right:10,
      height:400,
      width:280,
    }
  },

  mounted () {
    document.addEventListener('mouseup', this.onMouseUp)
   // $bus.$on('canvasMouseup', this.mouseUp)
  },

  beforeDestroyed() {
    document.removeEventListener('mouseup', this.onMouseUp)
    //$bus.$off('canvasMouseup', this.mouseUp)
  },


  methods: {
    startMove(event){
      document.addEventListener('mousemove', this.onMove)
      //$bus.$on('canvasMouseMove', this.mouseMove)
      this.lastX = event.screenX
      this.lastY = event.screenY
      this.forbidSelect()
    },

    startChangeHeightAndTop(event){
      document.addEventListener('mousemove', this.onExpandTop)
      this.lastX = event.screenX
      this.lastY = event.screenY
      this.forbidSelect()
    },

    startChangeHeightAndBottom(event){
      document.addEventListener('mousemove', this.onExpandBottom)
      this.lastX = event.screenX
      this.lastY = event.screenY
      this.forbidSelect()
    },

    startChangeWidthAndLeft(event){
      document.addEventListener('mousemove', this.onExpandLeft)
      this.lastX = event.screenX
      this.forbidSelect()
    },

    startChangeWidthAndRight(event){
      document.addEventListener('mousemove', this.onExpandRight)
      this.lastX = event.screenX
      this.forbidSelect()
    },

    startChangeLeftTop(event){
      document.addEventListener('mousemove', this.onExpandLeftTop)
      this.lastX = event.screenX
      this.lastY = event.screenY
      this.forbidSelect()
    },

    startChangeRightTop(event){
      document.addEventListener('mousemove', this.onExpandRightTop)
      this.lastX = event.screenX
      this.lastY = event.screenY
      this.forbidSelect()
    },

    startChangeLeftBottom(event){
      document.addEventListener('mousemove', this.onExpandLeftBottom)
      this.lastX = event.screenX
      this.lastY = event.screenY
      this.forbidSelect()
    },

    startChangeRightBottom(event){
      document.addEventListener('mousemove', this.onExpandRightBottom)
      this.lastX = event.screenX
      this.lastY = event.screenY
      this.forbidSelect()
    },

    onMove(event){
      this.right = this.right - (event.screenX - this.lastX)
      this.top = this.top + (event.screenY - this.lastY)

      this.lastX = event.screenX
      this.lastY = event.screenY
    },

    onExpandTop(event){
      this.top = this.top + (event.screenY - this.lastY)
      this.height = this.height - (event.screenY - this.lastY)
      this.lastY = event.screenY
    },

    onExpandBottom(event){
      //this.bottom = this.bottom + (event.screenY - this.lastY)
      this.height = this.height + (event.screenY - this.lastY)
      this.lastY = event.screenY
    },

    onExpandLeft(event){
      this.width = this.width - (event.screenX - this.lastX)
      this.lastX = event.screenX
    },

    onExpandRight(event){
      this.right = this.right - (event.screenX - this.lastX)
      this.width = this.width - (this.lastX - event.screenX)
      this.lastX = event.screenX
    },

    onExpandLeftTop(event){
      this.width = this.width - (event.screenX - this.lastX)
      this.top = this.top + (event.screenY - this.lastY)
      this.height = this.height - (event.screenY - this.lastY)
      this.lastX = event.screenX
      this.lastY = event.screenY
    },

    onExpandRightTop(event){
      this.right = this.right - (event.screenX - this.lastX)
      this.width = this.width - (this.lastX - event.screenX)
      this.top = this.top + (event.screenY - this.lastY)
      this.height = this.height - (event.screenY - this.lastY)
      this.lastX = event.screenX
      this.lastY = event.screenY
    },

    onExpandLeftBottom(event){
      this.width = this.width - (event.screenX - this.lastX)
      this.height = this.height + (event.screenY - this.lastY)
      this.lastX = event.screenX
      this.lastY = event.screenY
    },

    onExpandRightBottom(event){
      this.right = this.right - (event.screenX - this.lastX)
      this.width = this.width - (this.lastX - event.screenX)
      this.height = this.height + (event.screenY - this.lastY)
      this.lastX = event.screenX
      this.lastY = event.screenY
    },

    onMouseUp(event){
      this.lastX = ''
      document.removeEventListener('mousemove', this.onMove)
      document.removeEventListener('mousemove', this.onExpandTop)
      document.removeEventListener('mousemove', this.onExpandBottom)
      document.removeEventListener('mousemove', this.onExpandLeft)
      document.removeEventListener('mousemove', this.onExpandRight)
      document.removeEventListener('mousemove', this.onExpandLeftTop)
      document.removeEventListener('mousemove', this.onExpandRightTop)
      document.removeEventListener('mousemove', this.onExpandLeftBottom)
      document.removeEventListener('mousemove', this.onExpandRightBottom)
      document.body.classList.remove('can-not-be-selected')
    },

    forbidSelect(){
      document.body.classList.add('can-not-be-selected')
    }
  },
}
</script>

<style>

  .rx-toolbox{
    position: fixed;
    box-shadow: 1px 1px 5px rgba(0,0,0, 0.5);
    font-size: 13px;
    display: flex;
    flex-flow: column;
    z-index: 100;
    padding:5px;
  }

  .rx-toolbox{
    background: #424242;
    color:#c2c2c2; 
    border-radius: 3px;
  }

  .toolbox-handle{
    width: 100%;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: move;
    font-size: 16px;
    color:#999;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border-bottom: #363636 solid 1px;
  }

  .toolbox-close{
    margin-right: -2px;
    margin-top:-5px;
    cursor: pointer;
  }

  .top-handle{
    position: absolute;
    left:5px;
    top:0;
    width: calc(100% - 10px);
    height: 3px;
    cursor: n-resize;
  }

  .bottom-handle{
    position: absolute;
    left:5px;
    bottom:0;
    width: calc(100% - 10px);
    height: 5px;
    cursor: s-resize;
  }

  .left-handle{
    position: absolute;
    left:0;
    top:5px;
    height: calc(100% - 10px);
    width: 5px;
    cursor: w-resize;
  }

  .right-handle{
    position: absolute;
    right:0;
    top:5px;
    height: calc(100% - 10px);
    width: 5px;
    cursor: e-resize;
  }

  .left-top-handle{
    position: absolute;
    left:0;
    top:0;
    height: 6px;
    width: 6px;
    cursor: nw-resize;
  }

  .right-top-handle{
    position: absolute;
    right:0;
    top:0;
    height: 6px;
    width: 6px;
    cursor: ne-resize;
  }

  .left-bottom-handle{
    position: absolute;
    left:0;
    bottom:0;
    height: 6px;
    width: 6px;
    cursor: sw-resize;
  }

  .right-bottom-handle{
    position: absolute;
    right:0;
    bottom:0;
    height: 6px;
    width: 6px;
    cursor: se-resize;
  }

</style>