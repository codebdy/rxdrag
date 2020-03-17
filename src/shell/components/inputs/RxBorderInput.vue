<template>
  <div class="border-input" 
    :class="{
      'add-border' : addBorder,
      'remove-border': !addBorder,
      'select-top':topSelected,
      'select-right':rightSelected,
      'select-bottom':bottomSelected,
      'select-left':leftSelected,
    }"
  >
    <div class="view">
      <div>
        <div class="view-button top"
          @click="topClick"
        ></div>
      </div>
      <div>
        <div class="view-button right"
          @click="rightClick"
        ></div>
      </div>
      <div>
        <div class="view-button bottom"
          @click="bottomClick"
        ></div>
      </div>
      <div>
        <div class="view-button left"
          @click="leftClick"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RxBorderInput',
  props:{
    value:{ default:[] }, 
    addBorder:{ default : true},
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
      topSelected:false,
      rightSelected:false,
      bottomSelected:false,
      leftSelected:false,
    }
  },

  methods: {
    topClick(){
      this.topSelected = !this.topSelected
      this.changeInput()
    },

    rightClick(){
      this.rightSelected = !this.rightSelected
      this.changeInput()
    },

    bottomClick(){
      this.bottomSelected = !this.bottomSelected
      this.changeInput()
    },

    leftClick(){
      this.leftSelected = !this.leftSelected
      this.changeInput()
    },

    changeInput(){
      this.inputValue.length = 0;
      if(this.topSelected 
         && this.rightSelected
         && this.bottomSelected
         && this.leftSelected ){
        this.inputValue.push(this.list.all)
        this.$emit('changed', this.inputValue)
        return
      }
      if(this.topSelected){
        this.inputValue.push(this.list.top)
      }
      if(this.rightSelected){
        this.inputValue.push(this.list.right)
      }
      if(this.bottomSelected){
        this.inputValue.push(this.list.bottom)
      }
      if(this.leftSelected){
        this.inputValue.push(this.list.left)
      }
      this.$emit('changed', this.inputValue)
    },

    showValue(){
      this.topSelected = false
      this.rightSelected = false
      this.bottomSelected = false
      this.leftSelected = false

      this.value.forEach(val=>{
        if(val === this.list.all){
          this.topSelected = true
          this.rightSelected = true
          this.bottomSelected = true
          this.leftSelected = true
        }

        if(val === this.list.top){
          this.topSelected = true
        }
        if(val === this.list.right){
          this.rightSelected = true
        }
        if(val === this.list.bottom){
          this.bottomSelected = true
        }
        if(val === this.list.left){
          this.leftSelected = true
        }
      })
    }
  },
  mounted () {
    this.showValue()
  },

  watch: {
    value() {
      this.showValue()
    }
  }

}
</script>

<style>
  .border-input{
    padding:5px;
  }

  .border-input .view{
    width:30px; 
    height:30px; 
    position:relative;
    border: dotted rgba(255,255,255,0.2) 1px;
  }

  .border-input .view .view-button{
    position:absolute;
    background:rgba(255,255,255,0);
    cursor: pointer;
  }

  .border-input .view .top{
    height:8px; 
    width:20px;
    left:5px;
    top:-5px;
  }

  .border-input .view .right{
    height:20px; 
    width:8px;
    right:-5px;
    top:5px;
  }

  .border-input .view .bottom{
    height:8px; 
    width:20px; 
    right:5px;
    bottom:-5px;
  }

  .border-input .view .left{
    height:20px; 
    width:8px;  
    left:-5px;
    top:5px;
  }


  .select-all .view{
    border:solid rgba(255,255,255,0.6) 1px;
  }

  .select-top .view{
    border-top:solid rgba(255,255,255,0.6) 1px;
  }

  .select-right .view{
    border-right:solid rgba(255,255,255,0.6) 1px;
  }

  .select-bottom .view{
    border-bottom:solid rgba(255,255,255,0.6) 1px;
  }

  .select-left .view{
    border-left:solid rgba(255,255,255,0.6) 1px;
  }

  .border-input.remove-border .view{
    width:30px; 
    height:30px; 
    position:relative;
    border: solid rgba(255,255,255,0.6) 1px;
  }

  .remove-border.select-all .view{
    border:dotted rgba(255,255,255,0.2) 1px;
  }

  .remove-border.select-top .view{
    border-top:dotted rgba(255,255,255,0.2) 1px;
  }

  .remove-border.select-right .view{
    border-right:dotted rgba(255,255,255,0.2) 1px;
  }

  .remove-border.select-bottom .view{
    border-bottom:dotted rgba(255,255,255,0.2) 1px;
  }

  .remove-border.select-left .view{
    border-left:dotted rgba(255,255,255,0.2) 1px;
  }

</style>