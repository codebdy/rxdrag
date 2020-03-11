<template>
  <Modal v-model="inputValue" 
    width='600px'
    height='400px'
    top ="calc(50% - 200px)"
    left ="calc(50% - 300px)"
  >
    <div class="dialog-head">
      <div><i class="fas fa-question-circle"></i> {{$t('about.about-title')}} </div>
      <span 
        class="close-button"
        @click="inputValue = false"
      >×</span>
    </div>
    <div class="dialog-body about-content">
      本程序是RXEditor第二版的界面原型。<br/>
      基于VUE实现，代码已转入RXeditor项目。<br />
      本原型不再维护，仅供学习参考。<br />
      RXEditor是一个开源的，可视化的，HTML编辑工具，基于Bootstrap实现。<br />
      RXEditor 代码地址：<a href="https://github.com/vularsoft/rxeditor" target="_blank">https://github.com/vularsoft/rxeditor</a>
      演示地址：<a href="https://vular.cn/rxeditor/" target="_blank" >https://vular.cn/rxeditor</a>
    </div>
    <div class="dialog-footer">
      <div class="dialog-button confirm-btn"
        @click="inputValue = false"
      >{{$t('about.close')}}</div>
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal.vue'
export default {
  name: 'AboutDialog',
  components:{
    Modal,
  },
  props:{
    value:{ default:'' }, 
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
}
</script>

<style>
.about-content{
  display: flex;
  justify-content: center;
  align-items:flex-start;
  font-size:14px;
  line-height: 32px;
  padding-left: 40px;
}

.about-content a{
  color: #75b325;
}

.about-content a:hover{
  color: #60921e;
  text-decoration: underline;
}
</style>