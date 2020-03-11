<template>
  <div class="node-tree">
    <TreeNode v-for = "(node, i) in inputValue" 
      :key = "i" 
      v-model = "inputValue[i]"
      :openIcon = "openIcon"
      :closeIcon = "closeIcon"
      :leafIcon = "leafIcon"
      :folderCanbeSelected = "folderCanbeSelected"
      :editable = "editable"
      @nodeSelected = "nodeSelected"
      ></TreeNode>
  </div>
</template>

<script>
import TreeNode from "./TreeNode.vue"

export default {
  name: 'FileTree',
  props: {
    value: { default: []},
    openIcon:{ default: 'fas fa-folder-open'},
    closeIcon:{ default: 'fas fa-folder'},
    leafIcon:{ default: 'fas fa-file' },
    folderCanbeSelected:{ default:false },
    editable: { default:false },
  },
  components:{
    TreeNode
  },
  data() {
    return {
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
  },

  methods: {
    nodeSelected(selectedNode){
      this.inputValue.forEach(child=>{
        this.resetSelected(selectedNode, child)
      })
      this.$emit('nodeSelected', selectedNode)
    },

    //递归充置选择状态
    resetSelected(selectedNode, node){
      node.selected = (node === selectedNode)
      if(node.children){
        node.children.forEach(child=>{
          this.resetSelected(selectedNode, child)
        })
      }
    }
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

</style>