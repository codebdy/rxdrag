<template>
  <div class="html-page">
    <div class="page-toolbar">
      <div class="left">
        <div class="icon-button big">
          <i class="fas fa-tv"></i>
        </div>
        <div class="icon-button">
          <i class="fas fa-desktop"></i>
        </div>
        <div class="icon-button active">
          <i class="fas fa-laptop"></i>
        </div>
        <div class="icon-button">
          <i class="fas fa-tablet-alt"></i>
        </div>
        <div class="icon-button">
          <i class="fas fa-mobile-alt"></i>
        </div>
      </div>
      <div class="center"></div>
      <div class="right">
        <div class="icon-button">
          <i class="far fa-square"></i>
        </div>
        <div class="icon-button">
          <i class="fas fa-arrows-alt-h"></i>
        </div>
        <div class="icon-button">
          <i class="fas fa-arrows-alt-v"></i>
        </div>
        <div class="icon-button">
          <i class="fas fa-eye"></i>
        </div>
        <div class="icon-button">
          <i class="fas fa-undo"></i>
        </div>
        <div class="icon-button">
          <i class="fas fa-redo"></i>
        </div>
        <div class="icon-button">
          <i class="fas fa-trash-alt"></i>
        </div>
      </div>
    </div>
    <div class="page-content">
      <div class="canvars">
      </div>
    </div>
  </div>
</template>

<script>
import Tab from '../tabs/Tab.vue'
import PageTabs from '../tabs/PageTabs.vue'

export default {
  name: 'HtmlPage',
  components:{
    PageTabs,
    Tab,
  },
  props:{
    //value:{ default:[] }, 
  },
  data () {
    return {
    }
  },

  methods: {
  },
}
</script>

<style>
 .html-page{
    flex: 1;
    display: flex;
    flex-flow: column;
    height: 0;
  }

  .page-content{
    padding: 10px;
    flex: 1;
    height: 0;
    overflow: auto;
  }

  .vular-studio .content-scroll{
      overflow: auto;
      flex-grow: 1;
      width: 0;
    }

  .canvars{
    background: #fff;
    width: 1200px;
    height: 1000px;
    display: flex;
    flex-flow: column;
  }
</style>