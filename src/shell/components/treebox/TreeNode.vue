<template>
  <div class="tree-node" :class="inputValue.selected ? 'selected' :''"

  >
    <div class="node-title" 
      @click="click"  
      @contextmenu.prevent = 'onContextMenu'
      ref="nodTitle"
    >
      <div  class="node-icon" @click="iconClick">
        <i v-show="icon" :class="icon"></i>
      </div>
      {{inputValue.label}}
    </div>
    <div v-if="showChild" class="children-nodes">
      <TreeNode v-for="(child, i) in inputValue.children" 
        :openIcon = "openIcon"
        :closeIcon = "closeIcon"
        :leafIcon = "leafIcon"
        :key="i" 
        v-model="inputValue.children[i]"
        @nodeSelected = "nodeSelected"
      ></TreeNode>
    </div>
    <div v-if='showContextMenu' 
      class="node-context-menu"
      :style="{'top':contextMenuTop, 'left':contextMenuLeft}"
      >
      <div class="menu-item"
        @click = "duplicate">
        <i class="far fa-clone"></i> {{$t('widgets.duplicate')}}
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
  name: 'TreeNode',
  props: {
    value: { default: {}},
    openIcon:{ default: 'fas fa-caret-down'},
    closeIcon:{ default: 'fas fa-caret-right'},
    leafIcon:{ default: '' },
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
    document.addEventListener('click', this.hideContextMenu)
    document.addEventListener('contextmenu', this.hideContextMenu)
  },

  beforeDestroyed() {
    document.removeEventListener('click', this.hideContextMenu)
    document.removeEventListener('contextmenu', this.hideContextMenu)
  },

  methods: {
    click(){
      if(this.hasChildren || !this.hasChildren && !this.inputValue.isFolder){
        this.inputValue.selected = true
        this.$emit('nodeSelected', this.inputValue)
      }
      else {
        this.inputValue.opened = !this.inputValue.opened
      }
    },

    iconClick(event){
      if(this.hasChildren){
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

    duplicate(){
      $rxbus.$emit('duplicateNode', this.inputValue.id)
    },

    remove(){
      $rxbus.$emit('removeNode', this.inputValue.id)
    },

  },

}
</script>

<style>
  .tree-node.selected{
    background: rgba(117,179,37, 0.2);
    color:#fff;
  }

  .children-nodes{
    padding-left:15px;
  }

  .tree-node .node-title{
    height: 20px;
    display: flex;
    flex-flow: row;
    flex-wrap: nowrap;
    align-items: center;
    padding-left: 0px;
    flex-shrink: 0;
    font-size: 12px;
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

</style>
