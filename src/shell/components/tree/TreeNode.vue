<template>
  <div class="tree-node" :class="inputValue.selected ? 'selected' :''"

  >
    <div class="node-title" 
      @click="click"  
      @contextmenu.prevent = 'onContextMenu'
      ref="nodTitle"
      :class="inputValue.locked ? 'locked' : ''"
    >
      <div  class="node-icon" @click="iconClick">
        <i v-show="icon" :class="icon"></i>
      </div>
      <input v-if="inputValue.isEditing" 
        v-model="inputValue.title" 
        @blur="inputBlur" 
        @keyup.13 = "inputBlur"
        @click="inputClick"
        autofocus="autofocus"/>
      <template v-else>{{inputValue.title}}</template>
    </div>
    <div v-if="showChild" class="children-nodes">
      <TreeNode v-for="(child, i) in inputValue.children" 
        :openIcon = "openIcon"
        :closeIcon = "closeIcon"
        :leafIcon = "leafIcon"
        :key="i" 
        :folderCanbeSelected = "folderCanbeSelected"
        :editable = "editable"
        v-model="inputValue.children[i]"
        @nodeSelected = "nodeSelected"
        @removeSelf = "removeChild"
      ></TreeNode>
    </div>
    <div v-if='showContextMenu' 
      class="node-context-menu"
      :style="{'top':contextMenuTop, 'left':contextMenuLeft}"
      >
      <div v-if="inputValue.isFolder" class="menu-item" 
        @click = "newChild">
        <i class="fas fa-file"></i> {{$t('widgets.new')}}
      </div>
      <div v-if="!inputValue.isFolder" class="menu-item"
        @click = "rename">
        <i class="fas fa-pen"></i> {{$t('widgets.rename')}}
      </div>
      <div v-if="!inputValue.isFolder" class="menu-item"
        @click = "remove">
        <i class="fas fa-trash-alt"></i> {{$t('widgets.delete')}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeNode',
  props: {
    value: { default: {}},
    openIcon:{ default: 'fas fa-folder-open'},
    closeIcon:{ default: 'fas fa-folder'},
    leafIcon:{ default: 'fas fa-file' },
    folderCanbeSelected:{ default: false },
    editable: { default:false },
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
      return this.contextMenuPoped && this.editable
    },

    icon(){
      if(this.hasChildren || this.inputValue.isFolder){
        return this.inputValue.opened ? this.openIcon : this.closeIcon
      }
      return this.inputValue.icon !== undefined ? this.inputValue.icon : this.leafIcon
    },

    showChild(){
      return this.hasChildren && this.inputValue.opened
    },

    hasChildren(){
      return this.inputValue.children
         &&this.inputValue.children.length > 0
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
      if((this.hasChildren && this.folderCanbeSelected) || !this.hasChildren && !this.inputValue.isFolder){
        if(!this.inputValue.locked){
          this.inputValue.selected = true
          this.$emit('nodeSelected', this.inputValue)
        }
      }
      else {
        this.inputValue.opened = !this.inputValue.opened
      }
    },

    iconClick(event){
      if(this.hasChildren && this.folderCanbeSelected){
        event.stopPropagation()
        this.inputValue.opened = !this.inputValue.opened
      }
    },

    nodeSelected(node){
      this.$emit('nodeSelected', node)
    },

    onContextMenu(event){
      this.contextMenuTop = event.clientY + 'px'
      this.contextMenuLeft = event.clientX + 'px'
      this.contextMenuPoped = true
    },

    hideContextMenu(event){
      if(event.target !== this.$refs.nodTitle){
        this.contextMenuPoped = false
      }
    },

    clearEditingThings(){
      this.contextMenuPoped = false
      this.inputValue.isEditing = false
    },

    newChild(event){
      this.inputValue.opened = true
      this.inputValue.children.push(
        {
          title:'new...',
          selected:false,
          opened:false,
          isEditing:true,
          icon: this.inputValue.leafIcon,
        }
      )
      this.contextMenuPoped = false
      event.stopPropagation()
    },

    rename(event){
      this.inputValue.isEditing = true
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
      this.inputValue.isEditing = false
    },

    removeChild(child){
      for(var i in this.inputValue.children){
        if(this.inputValue.children[i] === child){
          this.inputValue.children.splice(i,1)
          return
        }
      }
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

  .tree-node .node-title{
    height: 30px;
    display: flex;
    flex-flow: row;
    flex-wrap: nowrap;
    align-items: center;
    padding-left: 0px;
    flex-shrink: 0;
  }

  .tree-node .node-title.locked{
    color: #999;
  }

  .tree-node .node-icon{
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: center;
  }

  .tree-node .node-title:hover{
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
</style>
