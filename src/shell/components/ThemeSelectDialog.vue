<template>
  <Modal v-model="inputValue" :size="'large'">
    <div class="dialog-head">
      <div><i class="fas fa-layer-group"></i> {{$t('theme.theme-select')}} </div>
      <span 
        class="close-button"
        @click="inputValue = false"
      >×</span></div>
    <div class="dialog-body">
      <div class="tab-header">
        <div class="tab-label active">{{$t('theme.websites')}}</div>
        <div class="tab-label">{{$t('theme.h5pages')}}</div>
        <div class="tab-label">{{$t('theme.forms')}}</div>
      </div>
      <div class="tab-body">
        <div class="theme-item">
          <img src="images/theme-agency.jpg" />
          <div class="theme-title">Agency</div>
        </div>
        <div class="theme-item">
          <img src="images/theme-testpools.jpg" />
          <div class="theme-title">Testpools</div>
        </div>
        <div class="theme-item">
          <img src="images/theme-sunvision.jpg" />
          <div class="theme-title">Sucralose</div>
        </div>
        <div class="theme-item">
          <img src="images/theme-warmy.jpg" />
          <div class="theme-title">Warmy Candle</div>
        </div>
        <div class="theme-item">
          <img src="images/theme-agency.jpg" />
          <div class="theme-title">Agency</div>
        </div>
        <div class="theme-item">
          <img src="images/theme-agency.jpg" />
          <div class="theme-title">Agency</div>
        </div>
        <div class="theme-item">
          <img src="images/theme-testpools.jpg" />
          <div class="theme-title">Testpools</div>
        </div>
        <div class="theme-item">
          <img src="images/theme-sunvision.jpg" />
          <div class="theme-title">Sucralose</div>
        </div>
        <div class="theme-item">
          <img src="images/theme-warmy.jpg" />
          <div class="theme-title">Warmy Candle</div>
        </div>
        <div class="theme-item">
          <img src="images/theme-agency.jpg" />
          <div class="theme-title">Agency</div>
        </div>
        <div class="theme-item">
          <img src="images/theme-agency.jpg" />
          <div class="theme-title">Agency</div>
        </div>
        <div class="theme-item">
          <img src="images/theme-testpools.jpg" />
          <div class="theme-title">Testpools</div>
        </div>
        <div class="theme-item">
          <img src="images/theme-sunvision.jpg" />
          <div class="theme-title">Sucralose</div>
        </div>
        <div class="theme-item">
          <img src="images/theme-warmy.jpg" />
          <div class="theme-title">Warmy Candle</div>
        </div>
        <div class="theme-item">
          <img src="images/theme-agency.jpg" />
          <div class="theme-title">Agency</div>
        </div>
      </div>
    </div>
    <div class="dialog-footer">
      <div class="dialog-button cancel-btn"
        @click="inputValue = false"
      >{{$t('theme.cancel')}}</div>
      <div class="dialog-button confirm-btn"
        @click="inputValue = false"
      >{{$t('theme.select')}}</div>
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal.vue'
export default {
  name: 'ThemeSelectDialog',
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
  data () {
    return {
    }
  },

  methods: {
  },
}
</script>

<style>
.dialog-head{
  height: 50px;
  border-bottom:#ddd solid 1px;
  display: flex;
  flex: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  font-size: 18px;
  flex-shrink: 0;
}

.dialog-head .close-button{
  color: #999;
  margin-right: 10px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}

.dialog-head .close-button:hover{
  color:#000;
}

.dialog-body{
  flex: 1;
  display:flex;
  height: 0;
  flex-flow: column;
}

.dialog-body .tab-header{
  height: 30px;
  display: flex;
  flex-flow: row;
  flex-shrink: 0;
  margin:5px;
}

.dialog-body .tab-header .tab-label{
  height: 30px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  margin-right:5px;
  cursor: pointer;
}

.dialog-body .tab-header .tab-label:hover{
  background: #f5f5f5;
  color: #000;
}

.dialog-body .tab-header .tab-label.active{
  border-radius: 3px;
  background: #75b325;
  color: #fff;
}

.dialog-body .tab-body{
  flex: 1;
  margin-top:10px;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  overflow: auto;
}

.tab-body::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.5rem;
  background: #ddd;
}
.tab-body::-webkit-scrollbar-track {
  border-radius: 0;
}
.tab-body::-webkit-scrollbar-thumb {
  border-radius: 0;
  background: #aaa;
  transition: all .2s;
}
.tab-body::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
}

.tab-body::-webkit-scrollbar-corner{
  background: transparent;
}

.theme-item{
  width: 186px;
  outline:#eee solid 1px;
  margin:5px;
}

.theme-item:hover{
  outline: #75b325 solid 2px;
}


.theme-item img{
  width: 100%;
}

.theme-item .theme-title{
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top:#eee solid 1px;
  font-size: 16px;
}

.dialog-footer{
  height: 60px;
  border-top:#ddd solid 1px;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 50px;
}

.dialog-footer .dialog-button{
  font-size: 14px;
  padding: 0 30px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 3px;
  height: 36px;
  display: flex;
  align-items: center;
  border-radius: 18px;
}

.dialog-footer .dialog-button.confirm-btn{
  color: #fff;
  background: #75b325;
}

.dialog-footer .dialog-button.confirm-btn:hover{
  background: #649a1f;
}

.dialog-footer .dialog-button.cancel-btn{
  color: #6c757d;
  background: #fff;
  border:#95a0aa solid 1px;
}

.dialog-footer .dialog-button.cancel-btn:hover{
  background: #f9f9f9;
}
</style>