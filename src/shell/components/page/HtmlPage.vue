<template>
  <div class="html-page">
    <div class="page-toolbar">
      <div class="left">
        <div class="icon-button big" 
          :class="size === 'xl' ? 'active' :''"
          @click="size = 'xl'"
        >
          <i class="fas fa-tv"></i>
        </div>
        <div class="icon-button"
          :class="size === 'lg' ? 'active' :''"
          @click="size = 'lg'"
        >
          <i class="fas fa-desktop"></i>
        </div>
        <div class="icon-button"
          :class="size === 'md' ? 'active' :''"
          @click="size = 'md'"
        >
          <i class="fas fa-laptop"></i>
        </div>
        <div class="icon-button"
          :class="size === 'sm' ? 'active' :''"
          @click="size = 'sm'"
        >
          <i class="fas fa-tablet-alt"></i>
        </div>
        <div class="icon-button"
          :class="size === 'xs' ? 'active' :''"
          @click="size = 'xs'"
        >
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
      <!-- 需要动态设定高度，当内容有变化时设定 -->
      <div class="canvars"
        :style = "{width:width}"
      >
        <iframe src="agency.html" 
          scrolling="no" 
          frame-border ="0"
          border = "0"
          allow-transparency = "no"
        ></iframe>
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
    breakpoints : {
      default : ()=>{ 
        this.xs = '490'
        this.sm = '576'
        this.md = '768'
        this.lg = '992'
        this.xl = '1200'
        return this
      }
    }, 
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
    width(){
      return this.breakpoints[this.size] + 'px'
    }
  },
  data () {
    return {
      size : 'md',
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
    flex: 1;
    height: 0;
    overflow: auto;
    display: block;
  }

  .canvars{
    margin:0 auto ; 
    transition: all 0.5s
  }

  .canvars iframe{
    width: 100%;
    min-height: 1200px;
    border:0;
  }
</style>