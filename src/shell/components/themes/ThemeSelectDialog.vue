<template>
  <Modal v-model="inputValue" :size="'large'">
    <div class="dialog-head">
      <div><i class="fas fa-layer-group"></i> {{$t('theme.theme-select')}} </div>
      <span 
        class="close-button"
        @click="inputValue = false"
      >×</span></div>
    <div class="dialog-body">
      <ThemeTabs>
        <ThemeSelectTab
          v-for="(themeCategory, i) in themes"
          :name = "themeCategory.title"
          :key = "i"
          :selected = "i === 0"
          :api = "themeCategory.themes"
          @selectTheme = "selectTheme"
        >
        </ThemeSelectTab>
      </ThemeTabs>
    </div>
    <div class="dialog-footer">
      <div class="dialog-button cancel-btn"
        @click="inputValue = false"
      >{{$t('theme.cancel')}}</div>
      <div class="dialog-button confirm-btn"
        v-if="this.selectedTheme"
        @click="confirmSelect"
      >{{$t('theme.select')}}</div>
      <div class="dialog-button disabled-label"
        v-else
      >
        {{$t('theme.select')}}
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '../Modal.vue'
import ThemeTabs from '../tabs/ThemeTabs.vue'
import ThemeSelectTab from './ThemeSelectTab.vue'

export default {
  name: 'ThemeSelectDialog',
  components:{
    Modal,
    ThemeTabs,
    ThemeSelectTab,
  },
  props:{
    value:{ default:false }, 
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
      themes: [],
      selectedTheme: null,
    }
  },

  mounted () {
    this.selectedTheme = null
    $axios.get('api/themes')
    .then((res)=>{
      this.themes = res.data
    })//.catch(function (error) {
     // console.log(error)
    //})
  },

  methods: {
    selectTheme(theme){
      this.selectedTheme = theme
    },

    confirmSelect(){
      this.$emit('changeTheme', this.selectedTheme)
      this.inputValue = false
    }
  },

  watch:{
    inputValue(val){
      if(!val){
        this.selectedTheme = null
      }
    }
  }
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
  flex-flow: column;
}

.dialog-body .tab-body{
  flex: 1;
  margin-top:10px;
  display: flex;
  flex-flow: column;
  flex-wrap: wrap;
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

.dialog-button.disabled-label{
  background: #bbb;
  color: #eee;
  cursor: default;
}

</style>