<template>
  <Modal v-model="inputValue" 
    width='500px'
    height = "460px"
    left ="calc(50% - 300px)"
    top ="calc(50% - 230px)"
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
        v-if="this.selectedPorject"
        @click="confirmSelect"
      >{{$t('open.open')}}</div>
      <div class="dialog-button disabled-label"
        v-else
      >
        {{$t('open.open')}}
      </div>
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

    confirmSelect(){
      this.$emit('selectProject', this.selectedPorject)
      this.selectedPorject = null
      this.inputValue = false
    }
  },

  mounted () {
    this.selectedPorject = null
    $axios.get('api/projects')
    .then((res)=>{
      this.projects = res.data
    })
  },

  watch:{
    inputValue(val){
      if(!val){
        this.selectedPorject = null
      }
    }
  }
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

.project-item.selected{
  outline: #75b325 solid 3px;
  background: #fbfbfb;
}

</style>