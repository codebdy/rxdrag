<template>
  <div class="widget-tabs" :class="stateClass" ref="widget">
    <ul  class="heads">
      <li v-for="tab in tabs" class="item" :class="{ 'active': tab.isShow }" 
        @click="click(tab)">
        <div v-show="showIcon" class="tab-icon"><i :class="tab.icon"></i></div> 
        <span v-show="showTitle"> {{ tab.name }}</span>
      </li>
    </ul>
    <div v-show="showTabBody" class="tab-body" :class="dockLeft?'dock-left':''">
      <div v-show="showTabTitle" class="tab-title">
        <div>{{selectedTab ? selectedTab.name : ''}}</div>
        <div class="tab-close" @click="close">×</div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
class State{
  constructor(context){
    this.context = context
  } 

  widthChange(width){
    if(width <=90){
      this.toState(this.context.miniState)
    }
    else if(width <=160){
      this.toState(this.context.middleState)
    }
    else{
      this.toState(this.context.normalState)
    }
  }

  showTabBody(){
    return true
  }

  showTabTitle(){
    return false
  }

  showIcon(){
    return false
  }

  showTitle(){
    return true
  }

  close(){}

  toState(state){
    if(this.context.state !== state){
      if(this.context.state === this.context.normalState){
        this.context.selectedTab.isShow = false
      }
      if(state === this.context.normalState){
        this.context.selectedTab.isShow = true
      }
      this.context.state = state
    }
  }

  stateClass(){
    return ''
  }

}
class NormalState extends State{
  constructor(context){
    super(context)
  }

  clickTab(clickedTab){
    this.context.tabs.forEach(tab => {
      tab.isShow = (tab.name == clickedTab.name)
        this.context.selectedTab = clickedTab
    });
  }
}

//需要弹出式显示标签内容
class ListState extends State{
  constructor(context){
    super(context)
  }

  showTabBody(){
    return this.context.selectedTab.isShow
  }

  showTabTitle(){
    return true
  }

  showIcon(){
    return true
  }

  showTitle(){
    return true
  }

  close(){
    this.context.selectedTab.isShow = false
  }

  clickTab(clickedTab){
    this.context.tabs.forEach(tab => {
      if(tab === clickedTab){
        tab.isShow = !tab.isShow
        this.context.selectedTab = clickedTab
      }
      else{
        tab.isShow = false
      }
    });
  }
}

//该状态显示图标跟标题
class MiddleState extends ListState{
  constructor(context){
    super(context)
  }

  stateClass(){
    return 'middle-size'
  }
}

//该状态只显示图标
class MiniState extends ListState{
  constructor(context){
    super(context)
  }

  showTitle(){
    return false
  }

  stateClass(){
    return 'mini-size'
  }
}

export default {
  name: 'WidgetTabs',
  data() {
    return {
      tabs: [],
      state: null,
      selectedTab :null,
      dockLeft:false,
    }
  },
  
  created() {
    this.tabs = this.$children;
    this.normalState = new NormalState(this)
    this.middleState = new MiddleState(this)
    this.miniState = new MiniState(this)
    this.state = this.normalState
  },

  computed: {
    stateClass(){
      return this.state.stateClass()
    },

    showIcon(){
      return this.state.showIcon()
    },

    showTitle(){
      return this.state.showTitle()
    },

    showTabBody(){
      return this.state.showTabBody()
    },
    showTabTitle(){
      return this.state.showTabTitle()
    },
  },

  methods: {
    click(clickTab) {
      this.state.clickTab(clickTab)
    },

    mouseMove(){
      if(this.$refs.widget){
        this.dockLeft = this.$refs.widget.offsetLeft < 50
        this.state.widthChange(this.$refs.widget.offsetWidth)
      }
    },

    mouseDown(event){
      document.addEventListener('mousemove', this.mouseMove)
    },

    mouseUp(event){
      document.removeEventListener('mousemove', this.mouseMove)
    },

    close(){
      this.state.close()
    }
  },


  mounted () {
    document.addEventListener('mousedown', this.mouseDown)
    document.addEventListener('mouseup', this.mouseUp)
    this.tabs.forEach(tab => {
      if(tab.isShow){
        this.selectedTab = tab
      }
    });
  },

  beforeDestroyed() {
    document.removeEventListener('mousedown', this.mouseDown)
    document.removeEventListener('mouseup', this.mouseUp)
  },
}
</script>

<style>
  .widget-tabs{
    flex:1;
    display: flex;
    flex-flow: column;
    position: relative;
  }

  .widget-tabs .heads{
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    justify-content:flex-start;
    font-size: 12px;
    font-weight: bold;
    height: 30px;
    align-items: flex-end;
    list-style: none;
    padding:0;
    margin:0;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .widget-tabs .heads .item{
    padding: 0 10px;
    height: 30px;
    display: flex;
    align-items: center;
    cursor: default;
    border-radius: 3px 3px 0 0;
    border-top:solid #222 1px;
  }

  .widget-tabs .heads .item.active{
    color: #fff;
    background: #323332;
    border-right:solid #222 1px;
    border-left:solid #222 1px;
    border-top:solid #222 1px;
  }

  .widget-tabs .tab{
    flex: 1;
    height: 0;
    display: flex;
    flex-flow: column;
    padding:5px;
  }

  .widget-tabs .tab-body{
    flex: 1;
    background: #323332;
    border-radius: 2px;
    border-right:solid #222 1px;
    border-bottom:solid #222 1px;
    border-left:solid #222 1px;
    display: flex;
    flex-flow: column;
  }

  .widget-tabs .tab-body-inner{
    flex: 1;
    padding:5px;
    display: flex;
    flex-flow: column;
    height: 0;
  }

  .widget-tabs .tab-title{
    display: none;
  }

/*============ middle size===========================>*/
.middle-size.widget-tabs,
.mini-size.widget-tabs{
  position: relative;
}

.widget-tabs .tab-title{
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  padding:3px 3px 3px 10px;
}

.widget-tabs .tab-close{
  font-size: 14px;
  display: flex;
  height: 16px;
  width: 16px;
  background: #444;
  justify-content: center;
  align-items: center;
  color:#ccc;
  cursor: pointer;
}

.widget-tabs .tab-close:hover{
  color:#fff;
}

.widget-tabs .heads .tab-icon{
  margin-right: 10px;
  font-size: 18px; 
}

.middle-size.widget-tabs .heads .item,
.mini-size.widget-tabs .heads .item{
  display: block;
  width: 100%;
  display: flex;
  padding: 0 0 0 20px;
  margin: 0;
  height: 42px;
  border-radius: 0;
  border:0;
  color:#fff;
}

.middle-size.widget-tabs .heads .item.active,
.mini-size.widget-tabs .heads .item.active{
  background: #649920;
}

.middle-size.widget-tabs .tab-body,
.mini-size.widget-tabs .tab-body{
  position: absolute;
  right:100%;
  top: -3px;
  z-index: 1000;
  min-width: 280px;
  min-height: 300px;
  border-radius: 0;
}
.middle-size.widget-tabs .tab-body.dock-left,
.mini-size.widget-tabs .tab-body.dock-left{
  left:100%;
}

.middle-size.widget-tabs .tab-body-inner{
}

/*<============*/


</style>