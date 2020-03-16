<template>
  <div class="rx-select">
    <div class="value-view">
      <div class="clear-button"
        @click="clear"
      >×</div>
      <div class="value"
        @click="click"
      >
        {{value ? list[value] : $t('widgets.select')}} <span class="right-icon">▾</span>
        <ul v-if="showList" class="list">
          <li 
            v-for="(name, value) in list"
            @click="itemClick(value)"
          >
            {{name}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RxSelect',
  props:{
    value:{ default:'' }, 
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
      showList : false,
    }
  },
  mounted () {
    document.addEventListener('click', this.documentClick)
  },

  beforeDestroyed() {
    document.removeEventListener('click', this.documentClick)
  },

  methods: {
    clear(){
      this.inputValue = ''
      this.$emit('changed', this.inputValue)
    },
    click(event){
      event.stopPropagation()
      this.showList = !this.showList
    },

    documentClick(event){
      this.showList = false
    },

    itemClick(value){
      this.inputValue = value
      this.$emit('changed', this.inputValue)
    },
  },
}
</script>

<style>
.rx-select{
  display: flex;
  flex-flow: column;
  align-items: center;
}

.rx-select .clear-button{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: rgba(255,255,255,0.15);
  border-radius: 3px;
  margin-right:2px;
  font-size: 16px;
}

.rx-select .value-view{
  display: flex;
  flex-flow: row;
  align-items: center;
  cursor: pointer;
}

.rx-select .value-view .value{
  position: relative;
  display: flex;
  flex-flow: row;
  padding: 0 10px;
  height: 24px;
  align-items: center;
  justify-content: space-between;
  background: rgba(255,255,255,0.15);
  border-radius: 3px;
}

.rx-select .value-view .value span{
  margin-left:5px;
  font-size: 16px;
}

.rx-select .list{
  position: absolute;
  display: block;
  padding: 0;
  margin: 0;
  list-style: none;
  left: 0;
  top: 100%;
  z-index: 1;
}

.rx-select .list li{
  min-width: 100%;
  height: 26px;
  display: flex;
  align-items: center;
  padding-left:10px;
  background: #515151;
  cursor: pointer;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.3); 
  white-space:nowrap;
}

.rx-select .list li:hover{
  background: #75b325;
}
</style>