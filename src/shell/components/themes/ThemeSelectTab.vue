<template>
  <div v-show="isShow" class="tab themes-tab light-scrollbar">
    <div class="theme-item"
      v-for="(theme, i) in themes"
      :key = "i"
      @click = "click(theme)"
      :class = "selectedTheme === theme ? 'selected' : ''"
    >
      <img :src="theme.thumbnail" />
      <div class="theme-title">{{theme.title}}</div>
    </div>
  </div>
</template>

<script>
import Tab from '../tabs/Tab.vue'

export default {
  name: 'ThemeSelectTab',
  extends: Tab,
  props: {
    name: { required: true },
    icon:'',
    selected: { default: false},
    api:{ default : ''}
  },
  data () {
    return {
      themes:[],
      selectedTheme:null,
    }
  },

  mounted () {
    if(!this.api) return

    $axios.get(this.api)
    .then((res)=>{
      //console.log(res.data)
      this.themes = res.data
    })//.catch(function (error) {
     // console.log(error)
    //})
  },

  methods: {
    click(theme){
      this.selectedTheme = theme
      this.$emit('selectTheme', theme)
    }
  },

  watch:{
    isShow(){
      this.selectedTheme = null
      this.$emit('selectTheme', null)
    }
  }
}
</script>

<style>
.theme-item{
  width: 186px;
  outline:#eee solid 1px;
  margin:5px;
}

.theme-item:hover{
  outline: #75b325 solid 2px;
}

.theme-item.selected{
  outline: #75b325 solid 3px;
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

.themes-tab{
  flex: 1;
  margin-top:10px;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  overflow: auto;
  height: 0;
  align-items: flex-start;
}

</style>