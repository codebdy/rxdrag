<template>
  <div class="label-list">
    <div 
      class="label-item"
      v-for = "val in inputValue"
    >
      {{val}} 
      <span 
        class="remove-button"
        @click="remove(val)"
      >×</span>
    </div>
    <div style="width: 100%"></div>
    <div class="add-button"
      @click="addClick"
    >+</div>
    <div style="width: 100%"></div>
    <input 
      v-show="isAdding" 
      v-model="newValue" 
      :placeholder="$t('widgets.enter-message')"
      @keyup.13 = "finishAdd"
      ref="inputControl"
    />
  </div>
</template>

<script>
import {addToArray, removeFromArray} from './valueOperate'

export default {
  props:{
    value:{ default:[] }, 
  },
  computed:{
    inputValue: {
      get:function() {
        return this.value;
      },
      set:function(val) {
        this.$emit('input', val)
        this.$emit('changed', val)
      },
    },
  },
  data () {
    return {
      isAdding : false,
      newValue : '',
    }
  },
  methods: {
    addClick(){
      this.isAdding = true; 
      this.$refs.inputControl.style.display = 'block'
      this.$refs.inputControl.focus()
    },
    finishAdd(){
      if(this.newValue){
        this.newValue.split(' ').forEach((val)=>{
          if(val){
            addToArray(val, this.inputValue)
          }
        })
        this.$emit('changed', this.inputValue)
        this.newValue = ''
      }

      this.isAdding = false
    },
    remove(val){
      removeFromArray(val, this.inputValue)
      this.$emit('changed', this.inputValue)
    }

  },
}
</script>

<style>
 .label-list{
    background: rgba(0,0,0, 0.15);
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    padding:10px;
  }

  .label-list .label-item{
    padding:0 3px;
    background: rgba(255,255,255, 0.15);
    margin:1px;
    border-radius: 3px;
    height: 24px;
    display: flex;
    align-items: center;
  }

  .label-list .remove-button{
    cursor: pointer;
    margin-left: 2px;
  }

  .label-list .add-button{
    background: rgba(255,255,255, 0.15);
    width: 24px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    margin: 1px;
    margin-top:3px;
    font-size: 16px;
    padding-bottom:3px;
    cursor: pointer;
  }

  .label-list input{
    outline: 0;
    border: 0;
    background: transparent;
    color: #fff;
    margin-top:4px;
  }
</style>