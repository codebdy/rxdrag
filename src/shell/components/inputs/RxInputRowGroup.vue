<template>
  <div class="row-group">
    <div class="rx-input-row group-header" :class = "changed ? 'changed' :''">
      <div class="label" 
        :class="collapsed? 'collapsed' :''"
        @click="click"
      >
      {{label}}
      <div 
        v-if="changed"
        class="reset-button"
        @click="resetAll"
      >
        {{$t('widgets.reset')}}
      </div>
      </div>
      <div v-if="collapsed" class="group-value">
        <template 
          v-for="row in inputValue"
        >
          <div class="value-label"
          v-if="row.value && !row.isMultiple"
          >
            {{row.value}}
            <span class="remove-button" @click="remove(row.value)">×</span>
          </div>
          <div
            v-if="row.isMultiple"
            v-for="subValue in row.value"
            class="value-label"
          >
            {{subValue}}
            <span class="remove-button" @click="removeSubValue(row, subValue)">×</span>
          </div>
        </template>
      </div>
    </div>
    <div v-if="!collapsed" class="row-group-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {valueEqual, cloneValue} from './valueOperate'
import {remove} from '../../../basic/rxarray'

export default {
  name: 'RxInputRowGroup',
  props:{
    label:{ default:'' }, 
    value:{ default:[] }, 
  },
  data () {
    return {
      collapsed: true,
    }
  },
  computed:{
    changed(){
      for(var i in this.inputValue){
        let row = this.inputValue[i]
        if(!valueEqual(row.value, row.defaultValue)){
          return true
        }
      }
      return false
    },

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
    click(){
      this.collapsed = !this.collapsed
    },

    resetAll(event){
      for(var i in this.inputValue){
        this.inputValue[i].value = cloneValue(this.inputValue[i].defaultValue)
      }
      event.stopPropagation()
      $rxbus.$emit('optionValueChange')
    },

    remove(value){
      for(var i in this.inputValue){
        if(this.inputValue[i].value === value){
          this.inputValue[i].value = ''
        }
      }
      $rxbus.$emit('optionValueChange')
    },

    removeSubValue(row, subValue){
      remove(subValue, row.value)
      $rxbus.$emit('optionValueChange')
    }
  },
}
</script>

<style>
.row-group .group-header .label{
  justify-content: space-between;
}

.row-group-body .rx-input-row .label{
  justify-content: center;
}
.row-group .group-header .label{
  position: relative;
}

.row-group .group-header .label::after{
  position: absolute;
  content: '';
  width: 0; 
  height: 0;
  top: 13px;
  right: 7px;
  border-width: 4px;
  border-style: solid;
  border-color: #c2c2c2 transparent transparent  transparent;
}

.row-group .group-header .label.collapsed::after{
  position: absolute;
  content: '';
  width: 0; 
  height: 0;
  top: 11px;
  right: 7px;
  border-width: 4px;
  border-style: solid;
  border-color:transparent transparent  transparent #c2c2c2;
}

.group-value{
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
}

.group-value .value-label{
  display: flex;
  flex-flow: row;
  padding: 0 4px;
  height: 24px;
  align-items: center;
  justify-content: space-between;
  background: rgba(255,255,255,0.1);
  border-radius: 3px;
  margin: 1px;
}

.group-value .value-label .remove-button{
  margin-left:2px;
  cursor: pointer;
}

</style>