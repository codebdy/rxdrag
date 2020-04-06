<template>
  <div class="rxpage-editor">
    <div class="toolbar">
      <div class="left">
        <div class="icon-button big" 
          title = "XL"
        >
          <i class="fas fa-tv"></i>
        </div>
        <div class="icon-button"
          title = "LG"
        >
          <i class="fas fa-desktop"></i>
        </div>
        <div class="icon-button"
          title = "MD"
        >
          <i class="fas fa-laptop"></i>
        </div>
        <div class="icon-button"
          title = "SM"
        >
          <i class="fas fa-tablet-alt"></i>
        </div>
        <div class="icon-button"
           title = "XS"
        >
          <i class="fas fa-mobile-alt"></i>
        </div>

      </div>
      <div class="right ">
        <div class="icon-button" title = "">
          <i class="fas fa-tools"></i>
        </div>
        <div class="icon-button" title = "">
          <i class="fas fa-paint-brush"></i>
        </div>
        <div class="icon-button small" title = "">
          <i class="fas fa-project-diagram"></i>
        </div>
        <div class="icon-button" title = "">
          <i class="far fa-square"></i>
        </div>
        <div class="icon-button" title = "">
          <i class="fas fa-arrows-alt-h"></i>
        </div>
        <div class="icon-button" title = "">
          <i class="fas fa-arrows-alt-v"></i>
        </div>
        <div class="icon-button" title = "">
          <i class="fas fa-eye"></i>
        </div>
        <div class="icon-button" title = "">
          <i class="fas fa-code"></i>
        </div>
        <div class="icon-button small" title = "">
          <i class="fas fa-undo"></i>
        </div>
        <div class="icon-button small" title = "">
          <i class="fas fa-redo"></i>
        </div>
        <div class="icon-button ex-big" title = "">
          <i class="fas fa-arrows-alt" style="transform:rotate(45deg);font-size:18px;"></i>
        </div>
        <div class="icon-button ex-big" title = "">
          <i class="fas fa-question-circle" ></i>
        </div>
        <div class="icon-button big" title = "">
          <i class="fas fa-layer-group" ></i>
        </div>
      </div>
    </div>
    <div class="canvas"></div>
  </div>
</template>

<script>
export default {
  name: 'rxpage',
  components:{
  },
  data () {
    return {
    }
  },
  computed:{
  },

  methods:{
  },

  mounted () {
  },

  beforeDestroyed() {
  },

}
</script>

<style>
  .rxpage-editor{
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column;
  }

  .toolbar{
    height: 40px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    box-shadow: 1px 1px 5px #ccc;
    background: #75b325;
    color: #d1e3b9;
    font-size: 13px;
  }

  .toolbar .left{
    display: flex;
    flex-flow: row;
  }

  .logo{
    font-size:18px;
    font-weight: bold;
  }

  .toolbar .icon-button{
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin:1px;
    border-radius: 2px;
  }

  .toolbar .right{
    display: flex;
    flex-flow: row;
  }
  .toolbar .right .icon-button{
    font-size: 14px;
  }

  .toolbar .icon-button:hover{
    background: rgba(0,0,0,0.3);
  }

  .toolbar .icon-button.active{
    background: rgba(0,0,0,0.5);
  }

  .toolbar .icon-button.big i{
    font-size: 14px;
  }

  .toolbar .icon-button.small i{
    font-size: 12px;
  }

  .toolbar .icon-button.ex-big i{
    font-size: 16px;
  }


  .toolbar .icon-button.disabled{
    pointer-events: none;
    position: relative;
  }

  .toolbar .icon-button.disabled::after{
    content: "";
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(73,76,69,0.7);
    z-index: 1;
  }

</style>
