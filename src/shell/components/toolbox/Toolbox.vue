<template>
  <ToolboxAccordion :groups = "groups">
  </ToolboxAccordion>
</template>

<script>
import ToolboxAccordion from './ToolboxAccordion.vue'

export default {
  name: 'Toolbox',
  components:{
    ToolboxAccordion,
  },
  props:{
    groups:{ default:[] }, 
  },
  data () {
    return {
    }
  },

}
</script>

<style>
  .element-title{
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: default;
    color: #c2c2c2;
    font-size: 13px;
    padding:5px 10px;
    padding-left:20px;
    margin:3px;
    display: flex;
    flex-flow: row;
    align-items: center;
  }

  .element-title i{
    margin-right: 5px;
    margin-top:1px;
  }

  .toolbox-element .element-title:hover{
    background: rgba(255,255,255,0.05)

  }

  .toolbox-element{
    padding-left: 0;
    line-height: 20px;
}

  .toolbox-element .pop-content{
    position: absolute;
    top:70px;
    left: -340px;
    width: 320px;
    padding:10px;
    background: #eee;
    z-index: 1;
  }
  .toolbox-element .pop-content img{
    width: 100%;
  }
</style>