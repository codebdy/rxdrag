<template>
  <div class="tree-node">
    <div class="tree-node-title" 
      @click="onClick"  
      @contextmenu.prevent = 'onContextMenu'
      ref="nodTitle"
    >
      <div  class="node-icon">
        <i v-show="icon" :class="icon"></i>
      </div>

      {{label}}
    </div>
    <div v-if="opened" class="children-nodes">
      <FileNode v-for="(child, i) in inputValue" 
        :key="i" 
        v-model="inputValue[i]"
        @nodeSelected = "nodeSelected"
        @nameChanged = "onNameChanged"
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
    onContextMenu(event){
      this.contextMenuTop = event.clientY + 'px'
      this.contextMenuLeft = event.clientX + 'px'
      this.contextMenuPoped = true
    },

    onClick(){
      this.opened = !this.opened
    },

    onNameChanged(file){
      for(var i in this.inputValue){
        let child = this.inputValue[i]
        if(child !== file && child.name === file.name && !file.isEditing){
          alert(this.$t('widgets.same-warning'))
          file.isEditing = true
          return
        }
      }
    },

    newChild(event){
      this.opened = true
      let ext = ".html"
      if(this.fileType === "style"){
        ext = ".css"
      }
      if(this.fileType === "javascript"){
        ext = ".js"
      }

      this.inputValue.push(
        {
          name:'new file' + ext,
          selected:false,
          isEditing:true,
          code: "",
          fileType:this.fileType,
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
      this.$emit('nodeSelected', selectedNode)
    },

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

</style>