<template>
  <div class="rx-mini-widget"
    v-if="inputValue"
    :style="{
      top : realTop + 'px',
      right : realRight + 'px',
      height : realHeight + 'px',
      width : realWidth + 'px',
      left : realLeft + 'px'
    }"
  >
    <div class="mini-widget-handle"
      @mousedown = "startMove"
    >
      <div></div>
      <span class="mini-widget-close"
        @click="close"
      >×</span>
    </div>
    <div class="widget-body">
      <slot></slot>
    </div>

    <div class="realTop-handle"
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
    <div class="realRight-handle"
    @mousedown = "startChangeWidthAndRight"
    >
    </div>
    <div class="left-realTop-handle"
      @mousedown = "startChangeLeftTop"
    >
    </div>
    <div class="realRight-realTop-handle"
      @mousedown = "startChangeRightTop"
    >
    </div>
    <div class="left-bottom-handle"
      @mousedown = "startChangeLeftBottom"
    >
    </div>
    <div class="realRight-bottom-handle"
      @mousedown = "startChangeRightBottom"
    >
    </div>
  </div>
</template>

<script>
export default {
  name: 'MiniWidget',
  props:{
    value : { default:true }, 
    top : { default:50 },
    right : { default:10 },
    height : { default:400 },
    width : { default:280 },
    left : { default:'' },
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
  data () {
    return {
      //dragging : false,
      lastX:'',
      lastY:'',
      realTop:50,
      realRight:10,
      realHeight:400,
      realWidth:280,
      realLeft: '',
    }
  },

  mounted () {
    document.addEventListener('mouseup', this.onMouseUp)
    this.realTop = this.top
    this.realRight = this.right
    this.realHeight = this.height
    this.realWidth = this.width
    this.realLeft = this.left
  },

  beforeDestroyed() {
    document.removeEventListener('mouseup', this.onMouseUp)
    //$rxbus.$off('canvasMouseup', this.mouseUp)
  },


  methods: {
    close(){
      this.inputValue = false
    },
    startMove(event){
      document.addEventListener('mousemove', this.onMove)
      //$rxbus.$on('canvasMouseMove', this.mouseMove)
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
      if(this.realLeft !== ''){
        this.realLeft = this.realLeft + (event.screenX - this.lastX)
      }
      else{
        this.realRight = this.realRight - (event.screenX - this.lastX)
      }
      this.realTop = this.realTop + (event.screenY - this.lastY)

      this.lastX = event.screenX
      this.lastY = event.screenY
    },

    onExpandTop(event){
      this.realTop = this.realTop + (event.screenY - this.lastY)
      this.realHeight = this.realHeight - (event.screenY - this.lastY)
      this.lastY = event.screenY
    },

    onExpandBottom(event){
      //this.bottom = this.bottom + (event.screenY - this.lastY)
      this.realHeight = this.realHeight + (event.screenY - this.lastY)
      this.lastY = event.screenY
    },

    onExpandLeft(event){
      if(this.realLeft){
        this.realLeft = this.realLeft + (event.screenX - this.lastX)
        this.realWidth = this.realWidth - (event.screenX - this.lastX)
      }
      else{
        this.realWidth = this.realWidth - (event.screenX - this.lastX)
      }
      this.lastX = event.screenX
    },

    onExpandRight(event){
      this.realRight = this.realRight - (event.screenX - this.lastX)
      this.realWidth = this.realWidth - (this.lastX - event.screenX)
      this.lastX = event.screenX
    },

    onExpandLeftTop(event){
      if(this.realLeft){
        this.realLeft = this.realLeft + (event.screenX - this.lastX)
        this.realWidth = this.realWidth - (event.screenX - this.lastX)
      }
      else{
        this.realWidth = this.realWidth - (event.screenX - this.lastX)
      }
      this.realTop = this.realTop + (event.screenY - this.lastY)
      this.realHeight = this.realHeight - (event.screenY - this.lastY)
      this.lastX = event.screenX
      this.lastY = event.screenY
    },

    onExpandRightTop(event){
      this.realRight = this.realRight - (event.screenX - this.lastX)
      this.realWidth = this.realWidth - (this.lastX - event.screenX)
      this.realTop = this.realTop + (event.screenY - this.lastY)
      this.realHeight = this.realHeight - (event.screenY - this.lastY)
      this.lastX = event.screenX
      this.lastY = event.screenY
    },

    onExpandLeftBottom(event){
      if(this.realLeft){
        this.realLeft = this.realLeft + (event.screenX - this.lastX)
        this.realWidth = this.realWidth - (event.screenX - this.lastX)
      }
      else{
        this.realWidth = this.realWidth - (event.screenX - this.lastX)
      }
      this.realHeight = this.realHeight + (event.screenY - this.lastY)
      this.lastX = event.screenX
      this.lastY = event.screenY
    },

    onExpandRightBottom(event){
      this.realRight = this.realRight - (event.screenX - this.lastX)
      this.realWidth = this.realWidth - (this.lastX - event.screenX)
      this.realHeight = this.realHeight + (event.screenY - this.lastY)
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
  .rx-mini-widget ::-webkit-scrollbar {
    width: 0.3rem;
    height: 0.3rem;
    background: #232323;
  }
  .rx-mini-widget ::-webkit-scrollbar-track {
    border-radius: 0;
  }
  .rx-mini-widget ::-webkit-scrollbar-thumb {
    border-radius: 0;
    background: #535353;
    transition: all .2s;
  }
  .rx-mini-widget ::-webkit-scrollbar-thumb:hover {
    background-color: #606060;
  }

  .rx-mini-widget ::-webkit-scrollbar-corner{
    background: #232323;
  }

  .rx-mini-widget{
    position: fixed;
    box-shadow: 1px 1px 5px rgba(0,0,0, 0.5);
    font-size: 13px;
    display: flex;
    flex-flow: column;
    z-index: 100;
    padding:5px;
  }

  .rx-mini-widget{
    background: #26282a;
    color:#c2c2c2; 
    border-radius: 3px;
  }

  .mini-widget-handle{
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

  .mini-widget-close{
    margin-right: -2px;
    margin-top:-5px;
    cursor: pointer;
  }

  .realTop-handle{
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

  .realRight-handle{
    position: absolute;
    right:0;
    top:5px;
    height: calc(100% - 10px);
    width: 5px;
    cursor: e-resize;
  }

  .left-realTop-handle{
    position: absolute;
    left:0;
    top:0;
    height: 6px;
    width: 6px;
    cursor: nw-resize;
  }

  .realRight-realTop-handle{
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

  .realRight-bottom-handle{
    position: absolute;
    right:0;
    bottom:0;
    height: 6px;
    width: 6px;
    cursor: se-resize;
  }

  .widget-body{
    flex: 1;
    display: flex;
  }

</style>