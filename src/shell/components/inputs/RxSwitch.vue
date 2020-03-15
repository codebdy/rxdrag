<template>
  <div class="rx-switch" 
    :class="onValue === inputValue? 'on' : ''"
    @click="click">
  </div>
</template>

<script>
//传入所有类列表，从列表中挑选
export default {
  name: 'RxSwitch',
  props:{
    value:{ default:'' }, 
    onValue:{ default:'on' },
    offValue:{ default:'off' },
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
    click(){
      this.inputValue = this.inputValue === this.onValue 
                        ? this.offValue 
                        : this.onValue
      this.$emit('changed', this.inputValue)
    },
  },
}
</script>

<style>
.rx-switch{
  position: relative;
  width: 26px;
  height: 14px;
  background: #424242;
  margin-top:4px;
  border-radius:6px;
  cursor: pointer;
}

.rx-switch::after{
  content: '';
  position: absolute;
  top:-1px;
  left:-1px;
  height: 16px;
  width: 16px;
  background: #e0e0e0;
  border-radius: 50%;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.4); 
}

.rx-switch.on{
  background: #75b325;
}

.rx-switch.on::after{
  content: '';
  position: absolute;
  top:-1px;
  left:auto;
  right: -1px;
  height: 16px;
  width: 16px;
  background: #e0e0e0;
  border-radius: 50%;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.4); 
}
</style>