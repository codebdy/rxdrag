<template>
  <div class="tree-node">
    <div class="tree-node-title" 
      @click="onClick"  
      @contextmenu.prevent = 'onContextMenu'
      ref="nodTitle"
    >
      <div  class="node-icon" @click="onIconClick">
        <i v-show="icon" :class="icon"></i>
      </div>

      {{label}}
    </div>
    <div v-if="opened" class="children-nodes">
      <FileNode v-for="(child, i) in inputValue" 
        :key="i" 
        v-model="inputValue[i]"
        @nodeSelected = "nodeSelected"
      ></FileNode>
    </div>
    <div v-if='contextMenuPoped' 
      class="node-context-menu"
      :style="{'top':contextMenuTop, 'left':contextMenuLeft}"
      >
      <div class="menu-item" 
        @click = "newChild">
        <i class="fas fa-file"></i> {{$t('widgets.new')}}
      </div>
    </div>
  </div>
</template>

<script>
import FileNode from "./FileNode.vue"

export default {
  name: 'FileBox',
  props: {
    value: { default: ()=>{return []}},
    label: { default: ''},
    fileType:{ default: '' },
  },
  components:{
    FileNode
  },
  data() {
    return {
      opened:false,
      contextMenuPoped: false,
    };
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

    icon(){
        return this.opened ? 'fas fa-folder-open' : 'fas fa-folder'
    },
  },

  methods: {
    onClick(){
      this.opened = !this.opened
    },

    onIconClick(){

    },

    newChild(event){
      this.inputValue.opened = true
      this.inputValue.children.push(
        {
          title:'new...',
          selected:false,
          opened:false,
          isEditing:true,
          fileType:this.inputValue.fileType,
          icon: this.inputValue.leafIcon,
        }
      )
      this.contextMenuPoped = false
      event.stopPropagation()
    },

    removeChild(child){
      for(var i in this.inputValue.children){
        if(this.inputValue.children[i] === child){
          this.inputValue.children.splice(i,1)
          return
        }
      }
    },

    nodeSelected(selectedNode){
      /*this.inputValue.forEach(child=>{
        this.resetSelected(selectedNode, child)
      })*/
      this.$emit('nodeSelected', selectedNode)
    },

    //递归充置选择状态
    /*resetSelected(selectedNode, node){
      node.selected = (node === selectedNode)
      if(node.children){
        node.children.forEach(child=>{
          this.resetSelected(selectedNode, child)
        })
      }
    }*/
  },
}
</script>

<style>
  .node-tree{
    flex: 1;
    width: 100%;
    overflow: auto;
    height: 0;
    display: flex;
    flex-flow: column;
  }

  .tree-node .node-icon{
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: center;
  }

</style>