<template>
  <Modal v-model="inputValue" 
    width='500px'
    left ="calc(50% - 300px)"
  >
    <div class="dialog-head">
      <div><i class="fas fa-folder-open"></i> {{$t('open.open-title')}} </div>
      <span 
        class="close-button"
        @click="inputValue = false"
      >×</span>
    </div>
    <div class="dialog-body open-content light-scrollbar">
      <div class="project-item"
        v-for="(project, i) in projects"
        :key = "i"
        @click = "select(project)"
        :class = "selectedPorject === project ? 'selected' : ''"
      >
        <i class="fas fa-file-alt"></i>
        {{project.title}}
      </div>
    </div>
    <div class="dialog-footer">
      <div class="dialog-button cancel-btn"
        @click="inputValue = false"
      >{{$t('open.cancel')}}</div>
      <div class="dialog-button confirm-btn"
        @click="inputValue = false"
      >{{$t('open.open')}}</div>
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal.vue'
export default {
  name: 'OpenDialog',
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
      projects: [],
      selectedPorject: null,
    }
  },

  methods: {
    select(project){
      this.selectedPorject = project
    },
  },

  mounted () {
    this.selectedPorject = null
    this.$axios.get('api/projects')
    .then((res)=>{
      this.projects = res.data
    })
  },
}
</script>

<style>
.open-content{
  flex: 1;
  display: flex;
  flex-flow: column;
  font-size:14px;
  line-height: 32px;
  overflow: auto;
  padding:10px;
}

.project-item{
  padding: 5px;
  margin: 3px;
  color: #666;
}

.project-item i{
  color: #82b640;
}

.project-item:hover{
  outline: #75b325 solid 2px;
  background: #fbfbfb;
}

.project-item:selected{
  outline: #75b325 solid 3px;
  background: #fbfbfb;
}

</style>