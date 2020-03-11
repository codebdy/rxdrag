<template>
  <PageTabs>
    <Tab name="Untitled *" :selected="true">
      <HtmlPage></HtmlPage>
    </Tab>
    <Tab name="Untitled2 *">
      <div class="page-toolbar">
        <div class="left">
        </div>
        <div class="center"></div>
        <div class="right">
        </div>
      </div>
      <div>page2</div>
    </Tab>
  </PageTabs>
</template>

<script>
import Tab from '../tabs/Tab.vue'
import PageTabs from '../tabs/PageTabs.vue'
import HtmlPage from './HtmlPage.vue'

export default {
  name: 'PagesArea',
  components:{
    PageTabs,
    Tab,
    HtmlPage,
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
  .vular-studio .page-tabs .page-toolbar{
    height: 35px;
    background: #494c45;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
  }

  .vular-studio .page-toolbar .left{
    margin-left:10px;
    display: flex;
    flex-flow: row;
  }

  .vular-studio .page-toolbar .right{
    margin-right:10px;
    display: flex;
    flex-flow: row;
  }

  .vular-studio .page-toolbar .icon-button{
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin:1px;
    border-radius: 2px;
  }

  .vular-studio .page-toolbar .icon-button:hover{
    background: rgba(0,0,0,0.5);
  }

  .vular-studio .page-toolbar .icon-button.active{
    background: rgba(0,0,0,0.5);
  }

  .vular-studio .page-toolbar .icon-button.big i{
    font-size: 14px;
  }

  .vular-studio .center-area .page-content{
    display: flex;
    flex: 1;
    flex-flow: row;
    padding: 10px;
  }
</style>