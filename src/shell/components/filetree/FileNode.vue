<template>
  <div class="tree-node" :class="inputValue.selected ? 'selected' :''"
  >
    <div class="tree-node-title" 
      @click="click"  
      @contextmenu.prevent = 'onContextMenu'
      ref="nodTitle"
      :class="inputValue.locked ? 'locked' : ''"
    >
      <div  class="node-icon">
        <i class="fas fa-file-code"></i>
      </div>
      <input v-if="inputValue.isEditing" 
        v-model="inputValue.name" 
        @blur="inputBlur" 
        @keyup.13 = "inputBlur"
        @click="inputClick"
      />
      <template v-else>{{inputValue.name}}</template>

      <i v-if="inputValue.locked" class="fas fa-lock lock-icon"></i>
    </div>
    <div v-if='showContextMenu' 
      class="node-context-menu"
      :style="{'top':contextMenuTop, 'left':contextMenuLeft}"
      >
      <div class="menu-item"
        @click = "rename">
        <i class="fas fa-pen"></i> {{$t('widgets.rename')}}
      </div>
      <div class="menu-item"
        @click = "remove">
        <i class="fas fa-trash-alt"></i> {{$t('widgets.delete')}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileNode',
  props: {
    value: { default: ()=>{return{}}},
    fileType:{ default: '' },
  },
  data() {
    return {
      contextMenuPoped: false,
      contextMenuTop: '0',
      contextMenuLeft: '0',
    }
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

    showContextMenu(){
      return this.contextMenuPoped
    },


  },
  mounted () {
    document.addEventListener('click', this.clearEditingThings)
    document.addEventListener('contextmenu', this.hideContextMenu)
  },

  beforeDestroyed() {
    document.removeEventListener('click', this.clearEditingThings)
    document.removeEventListener('contextmenu', this.hideContextMenu)
  },

  methods: {
    click(){
      if(!this.inputValue.locked){
        this.inputValue.selected = true
        this.$emit('nodeSelected', this.inputValue)
      }
    },

    onContextMenu(event){
      if(!this.inputValue.locked){
        this.contextMenuTop = event.clientY + 'px'
        this.contextMenuLeft = event.clientX + 'px'
        this.contextMenuPoped = true
      }
    },

    hideContextMenu(event){
      if(event.target !== this.$refs.nodTitle){
        this.contextMenuPoped = false
      }
    },

    clearEditingThings(){
      this.contextMenuPoped = false
      this.$set(this.inputValue, 'isEditing', false)
    },

    rename(event){
      this.$set(this.inputValue, 'isEditing', true)
      this.contextMenuPoped = false
      event.stopPropagation()
    },

    remove(){
      this.$emit('removeSelf',this.inputValue)
    },

    inputClick(event){
      event.stopPropagation()
    },

    inputBlur(event){
      this.$set(this.inputValue, 'isEditing', false)
    },
  },

}
</script>

<style>
  .tree-node.selected{
    background: rgba(0,123,255, 0.1)
  }

  .children-nodes{
    padding-left:15px;
  }

  .tree-node .tree-node-title{
    height: 30px;
    display: flex;
    flex-flow: row;
    flex-wrap: nowrap;
    align-items: center;
    padding-left: 0px;
    flex-shrink: 0;
    position: relative;
  }

  .tree-node-title.locked{
    color: #999;
  }


  .tree-node .tree-node-title:hover{
    background: rgba(255,255,255, 0.05);
  }

  .node-context-menu{
    position: fixed;
    display: flex;
    flex-flow: column;
    min-width: 80px;
    background: #fff;
    color: #000;
    box-shadow: 1px 0px 5px 0px rgba(0, 0, 0, 0.5); 
    z-index: 1;
  }

  .node-context-menu .menu-item{
    flex: 1;
    padding: 10px;
    border-bottom: 1px solid #ebebeb;
  }

  .node-context-menu .menu-item i{
    color:#75b325;
    width: 20px;
  }


  .node-context-menu .menu-item:hover{
    background: #ebebeb;
  }

  .node-title input{
    border: 0;
    outline: 0;
    background: rgba(0,0,0,0.2);
    padding:4px;
    border:#555 solid 1px;
    color: #fff;
  }

  .lock-icon{
    position: absolute;
    right:10px;
    font-size: 10px;
    top:12px;
  }
</style>
