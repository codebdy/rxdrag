<template>
  <CollapsibleItem class="option-item" @itemClick = "itemClick" :selected = 'inputValue.selected'>
    <template #heading>
      {{inputValue.label}} 
      <div v-if="changed" class="reset-button" @click="resetAll">{{$t('widgets.reset')}}</div>
    </template>
    <template #body>
      <RxInputRowGroup 
        v-for="(row, i) in inputValue.rows" 
        v-if="row.isRowGroup"
        :key="i" 
        :label = "row.label"
        v-model = "row.rows"
      >
        <RxInputRow 
          v-for="(subRow, j) in row.rows" 
          :key="j" 
          :label = "subRow.label"
          :inputName = "subRow.inputName"
          :inputProps = "subRow.props"
          :defaultValue = "subRow.defaultValue"
          v-model = "subRow.value"
        >
        </RxInputRow>

      </RxInputRowGroup>
      <RxInputRow 
        v-else="row.isRowGroup"
        :key="i" 
        :label = "row.label"
        :inputName = "row.inputName"
        :inputProps = "row.props"
        :defaultValue = "row.defaultValue"
        v-model = "row.value"
      >
      </RxInputRow>
    </template>
  </CollapsibleItem>
</template>

<script>
import CollapsibleItem from '../accordion/CollapsibleItem.vue'
import RxInputRow from '../inputs/RxInputRow.vue'
import RxInputRowGroup from '../inputs/RxInputRowGroup.vue'
import {valueEqual, cloneValue} from '../inputs/valueOperate'

export default {
  name: 'OptionGroup',
  components:{
    CollapsibleItem,
    RxInputRow,
    RxInputRowGroup
  },
  props:{
    value:{ default:{} }, 
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

    changed(){
      for(var i in this.inputValue.rows){
        let row = this.inputValue.rows[i]
        if(!valueEqual(row.value, row.defaultValue)){
          return true
        }

        if(row.isRowGroup){
          for(var j in row.rows){
            if(!valueEqual(row.rows[j].value, row.rows[j].defaultValue)){
              return true
            }
          }
        }
      }
      return false
    }
  },
  methods: {
    itemClick(item){
      //console.log('itemClick')
      this.$emit('itemClick', item)
    },

    resetAll(event){
      this.inputValue.rows.forEach(row=>{
        if(row.isRowGroup){
          row.rows.forEach(subRow =>{
            subRow.value = cloneValue(subRow.defaultValue)
          })
        }
        else{
          row.value = cloneValue(row.defaultValue)
        }
      })
      $rxbus.$emit('optionValueChange')
      event.stopPropagation()
    }
  },

}
</script>

<style>
.option-item{
  font-size: 12px;
}
.option-item.collapsible-item .item-heading{
  display: flex;
  flex-flow: row;
  justify-content: space-between;
}

.reset-button{
  margin-right:20px;
  color: #bbb;
  cursor: pointer;
}
</style>