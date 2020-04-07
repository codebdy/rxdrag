<template>
  <div class="page-tabs">
    <ul  class="tab-heads">
      <li 
        v-for="(file, i) in files" 
        class="head-item" 
        :class="{ 'active': file === activedFile }" 
        @click="selectFile(file)"
      >
          {{ files[i].name }} 
          <span class="close"
            @click="closeFile($event, file)"
          >×</span>
      </li>
    </ul>
    <div class="tab-body">
      <div class="tab"
        v-for = "(file, i) in files" 
        v-show = "file === activedFile"
        :key = "file.name + file.fileType + $store.state.project.id"
      >
        <HtmlPage 
          v-if="file.fileType === 'page'"
          v-model = "files[i]" 
        ></HtmlPage>
        <CodePage 
          v-else
          v-model = "files[i]" 
        ></CodePage>
      </div>
    </div>
  </div>
</template>

<script>
import HtmlPage from './HtmlPage.vue'
import CodePage from './CodePage.vue'

export default {
  name: 'PagesArea',
  components:{
    HtmlPage,
    CodePage,
  },
  props:{
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
    $rxbus.$on('fileSelected', this.onFileSelected)
    $rxbus.$on('projectChanged', ()=>{
      this.files = []
    })
    //$rxbus.$on('draggingFromToolbox', this.fileSelected)
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

  .code-editor{
    width: calc(100% - 20px);
    background: #272727;
    height: calc(100% - 26px);
    color:#75b325;
    outline: 0;
    border:0;
    padding:10px;
    resize: none;
  }

</style>