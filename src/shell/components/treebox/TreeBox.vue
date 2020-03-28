<template>
  <div class="node-tree">
    <TreeNode v-for = "(node, i) in inputValue" 
      :key = "i" 
      v-model = "inputValue[i]"
      @nodeSelected = "nodeSelected"
      ></TreeNode>
  </div>
</template>

<script>
import TreeNode from "./TreeNode.vue"

export default {
  name: 'TreeBox',
  props: {
    value: { default: []},
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
      this.$emit('nodeSelected', selectedNode.schema)
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