<template>
  <div class="name-value-box">
    <div class="name-value-row"
      v-for="(item, i) in valueArray"
    >
      <div class="name-input">
        <input v-model="item[0]"
          @blur = "nameBlur(i)"  @change="onchange"
        >
      </div>
      <div class="separator">:</div>
      <div class="value-input">
        <input v-model="item[1]" @change="onchange">
      </div>
      <div class="clear-button"
        @click="remove(i)"
      >×</div>
    </div>
    <div class="name-value-row">
      <div class="name-input">
        <input 
          v-model="newName"
          @keyup.13 = "addNew"
          @blur = "newBlur"
          ref="newName"
        >
      </div>
      <div class="separator">:</div>
      <div class="value-input">
        <input 
          v-model="newValue"
          @keyup.13 = "addNew"
          @blur = "newBlur"
        >
      </div>
      <div class="button-placeholder"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    value:{ default:{} }, 
  },
  /*computed:{
    inputValue: {
      get:function() {
        return this.value;
      },
      set:function(val) {
        this.$emit('input', val);
      },
    },
  },*/
  data () {
    return {
      valueArray : [],
      newName : '',
      newValue : '',
      inputValue : {}
    }
  },
  mounted () {
    this.inputValue = this.value
    for(var name in this.inputValue){
      this.valueArray.push([name, this.inputValue[name]])
    }
  },
  methods: {
    nameBlur(i){
      this.valueArray[i][0] = this.valueArray[i][0].trim()
      if(!this.valueArray[i][0]){
        this.remove(i)
      }
    },

    onchange(){
      this.toInputValue()
      this.$emit('changed', this.inputValue)
      //console.log(this.inputValue, this.valueArray)
    },

    remove(i){
      this.valueArray.splice(i, 1)
      this.onchange()
    },

    addNew(){
      this.newName = this.newName.trim()
      if(this.newName && !this.exist(this.newName)){
        this.valueArray.push([this.newName, this.newValue])
        this.newName = ''
        this.newValue = ''
        this.$refs.newName.focus()
        this.onchange()
      } 
    },

    newBlur(){
      this.newName = this.newName.trim()
      this.newValue = this.newValue.trim()
      if(this.newName && this.newValue){
        this.addNew()
      }
    },

    exist(name){
      for(var i = 0; i < this.valueArray.length; i++){
        if(this.valueArray[i][0] === name){
          return true
        }
      }
      return false
    },

    toInputValue(){
      this.inputValue = {}
      for(var i = 0; i < this.valueArray.length; i++){
        let name = this.valueArray[i][0]
        let value = this.valueArray[i][1]
        this.inputValue[name] = value
      }
    }
  },

}
</script>

<style>
 .name-value-box{
    background: rgba(0,0,0, 0.15);
    display: flex;
    flex-flow: column;
    padding:10px;
  }

  .name-value-box .add-button{
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

  .name-value-row{
    width: 100%;
    display: flex;
    flex-flow: row;
    height: 24px;
    align-items: center;
    font-size: 11px;
  }

  .name-value-row .name-input input, .name-value-row .value-input input{
    width: 100%;
    background: transparent;
    color:#bababa;
    outline: 0;
    border: 0;
  }

  .name-value-row .separator{
    width: 5px;
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    color: #bababa;
  }

  .name-value-row .name-input{
    flex: 1;
  }

  .name-value-row .value-input{
    flex: 1.5;
    padding-left:3px;
  }

  .name-value-row .clear-button{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 17px;
    background: rgba(255,255,255,0.1);
    border-radius: 3px;
    margin:1px;
    font-size: 12px;
    padding-bottom: 3px;
    cursor: pointer;
  }

  .name-value-row .button-placeholder{
    width: 20px;
    height: 20px;
    background: transparent;
  }

</style>