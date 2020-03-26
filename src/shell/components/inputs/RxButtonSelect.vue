<template>
  <div class="rx-button-select">
    <div class="clear-button"
      v-if="canClear"
      @click="clear"
    >×</div>
    <div class="select-button"
      v-for = "(name, value) in list"
      :class = "inputValue === value ? 'selected' : ''"
      @click = "itemClick(value)"
      v-html = "name"
    >
    </div>
  </div>
</template>

<script>
export default {
  name: 'RxButtonSelect',
  props:{
    value:{ default:'' }, 
    canClear:{ default:false }, 
    list:{ default:{} },
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

  data () {
    return {
    }
  },

  methods: {
    clear(event){
      this.inputValue = ''
      this.$emit('changed', this.inputValue)
    },

    itemClick(value){
      this.inputValue = value
      this.$emit('changed', this.inputValue)
    },
  },
}
</script>

<style>
.rx-button-select{
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  align-items: center;
}

.rx-button-select .clear-button{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: rgba(255,255,255,0.1);
  border-radius: 3px;
  margin:1px;
  font-size: 16px;
  cursor: pointer;
}

.rx-button-select .select-button{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  padding: 0 5px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 3px;
  margin:1px;
  font-size: 12px;
  cursor: pointer;
}

.rx-button-select .select-button.selected{
  background: rgba(255, 255, 255, 0.07);
}
</style>