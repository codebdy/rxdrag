<template>
  <div v-if="inputValue" class="node-tree" style="margin-left: 5px;">
    <FolderNode   
      v-model = "inputValue.pages"
      :label = "$t('widgets.pages')"
      :fileType = "'page'" 
      @nodeSelected = "nodeSelected"
      :isFolder = "true"
      ></FolderNode>
    <FolderNode   
      v-model = "inputValue.styles"
      :label = "$t('widgets.styles')"
      :fileType = "'style'" 
      @nodeSelected = "nodeSelected"
      :isFolder = "true"
      ></FolderNode>
    <FolderNode   
      v-model = "inputValue.javascript"
      :label = "$t('widgets.javascript')"
      :fileType = "'javascript'" 
      @nodeSelected = "nodeSelected"
      :isFolder = "true"
      ></FolderNode>
  </div>
</template>

<script>
import FolderNode from "./FolderNode.vue"

export default {
  name: 'FileBox',
  props: {
    value: { default: {}},
  },
  components:{
    FolderNode
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

</style>