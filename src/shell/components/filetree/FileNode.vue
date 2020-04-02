<template>
  <div class="tree-node" :class="inputValue === activedFile ? 'selected' :''"
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

    activedFile () {
      return this.$store.state.activedFile
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
      this.$emit('nodeSelected', this.inputValue)
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

  watch:{
    'inputValue.isEditing':function(isEditing){
      if(!isEditing){
        this.$emit('nameChanged', this.inputValue)
      }
    }
  }

}
</script>

<style>

  .lock-icon{
    position: absolute;
    right:10px;
    font-size: 10px;
    top:12px;
  }
</style>
