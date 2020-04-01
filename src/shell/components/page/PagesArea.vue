<template>
  <div class="page-tabs">
    <ul  class="tab-heads">
      <li 
        v-for="(file, i) in files" 
        class="head-item" 
        :class="{ 'active': file === activedFile }" 
        @click="selectFile(file)"
      >
          {{ file.name }} 
          <span class="close"
            @click="closeFile($event, file)"
          >×</span>
      </li>
    </ul>
    <div class="tab-body">
      <div class="tab"
        v-for = "(file, i) in files" 
        v-show = "file === activedFile"
        :key = "i"

      >
        <HtmlPage 
          v-show="file.fileType === 'page'"
          v-model = "files[i]" 
        ></HtmlPage>
      </div>
    </div>
  </div>
</template>

<script>
import HtmlPage from './HtmlPage.vue'

export default {
  name: 'PagesArea',
  components:{
    HtmlPage,
  },
  props:{
    //value:{ default:[] }, 
  },
  data () {
    return {
      files: [],
    }
  },
  computed: {
    activedFile () {
      return this.$store.state.activedFile
    }
  },

  mounted () {
    $bus.$on('fileSelected', this.onFileSelected)
    $bus.$on('themeChanged', ()=>{
      this.files = []
    })
    //$bus.$on('draggingFromToolbox', this.fileSelected)
  },

  methods: {
    onFileSelected(file){
      this.selectFile(file)
      this.addFile(file)
    },

    selectFile(file){
      this.$store.commit('activeFile', file)
    },

    addFile(file){
      if(!this.containsFile(file)){
        this.files.push(file)
      }
    },

    containsFile(file){
      for (var i = 0; i < this.files.length; i++) {
        if(this.files[i] === file){
          return true
        }
      }
      return false
    },

    closeFile(event, file){
      event.stopPropagation()
      var activedFile = null
      for (var i = 0; i < this.files.length; i++) {
        //如果被关闭的文件被选中，则切换选中
        if(this.files[i] === file){
          if(file === this.activedFile){
            if(i > 0){
              activedFile = this.files[i - 1]
            }
            else if(i < this.files.length - 1){
              activedFile = this.files[i + 1]
            }
            this.$store.commit('activeFile', activedFile)
          }
          this.files.splice(i, 1)
          break
        }
      }

    },
  },
}
</script>

<style>
.vular-studio .page-tabs .tab-heads{
  height: 33px;
  display: flex;
  align-items: flex-end;

  list-style: none;
  margin:0;
  padding:0;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.vular-studio .page-tabs .tab-heads .head-item{
  height: 30px;
  font-size: 12px;
  color:#FFF;
  padding-left:10px;
  padding-right: 5px;
  display: flex;
  align-items: center;
  cursor: default;
}

.vular-studio .page-tabs .tab-heads .head-item.active{
  background: #494c45;
  border-radius: 3px 3px 0 0;
}

.vular-studio .page-tabs .tab-heads .head-item .close{
  margin-left: 10px;
  width: 16px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding-bottom: 2px;
  cursor: default;
  font-weight: bold;
}

.vular-studio .page-tabs .tab-heads .head-item .close:hover{
  background: #e62121;
}

.vular-studio .page-tabs .tab-body{
  flex: 1;
  display: flex;
  flex-flow: column;
}

  .vular-studio .page-tabs .page-toolbar{
    height: 35px;
    background: #494c45;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
  }

  .vular-studio .page-toolbar .left{
    margin-left:10px;
    display: flex;
    flex-flow: row;
  }

  .vular-studio .page-toolbar .right{
    margin-right:10px;
    display: flex;
    flex-flow: row;
  }

  .vular-studio .page-toolbar .icon-button{
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin:1px;
    border-radius: 2px;
  }

  .vular-studio .page-toolbar .icon-button:hover{
    background: rgba(0,0,0,0.3);
  }

  .vular-studio .page-toolbar .icon-button.active{
    background: rgba(0,0,0,0.5);
  }

  .vular-studio .page-toolbar .icon-button.big i{
    font-size: 14px;
  }

  .vular-studio .page-toolbar .icon-button.disabled{
    pointer-events: none;
    position: relative;
  }

  .vular-studio .page-toolbar .icon-button.disabled::after{
    content: "";
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(73,76,69,0.7);
    z-index: 1;
  }

  .page-tabs{
  }
  .page-tabs .tab{
    flex: 1;
    height: 0;
    display: flex;
    flex-flow: column;
  }

  .page-tabs .tab-body{
    flex: 1;
    display: flex;
    flex-flow: column;
  }

</style>