<template>
  <div class="theme-tabs">
    <ul  class="tab-heads">
      <li v-for="tab in tabs" class="tab-label" :class="{ 'active': tab.isShow }" 
        @click="selectTab(tab)">
          {{ tab.name }}
      </li>
    </ul>
    <div class="tab-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemeTabs',
  data() {
    return {tabs: [] };
  },
  
  created() {
    this.tabs = this.$children;
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isShow = (tab.name == selectedTab.name);
      });
    }
  }
}
</script>

<style>
.theme-tabs{
  flex:1;
  display: flex;
  flex-flow: column;
}

.theme-tabs .tab-body{
  flex: 1;
  display: flex;
  flex-flow: column;
  height: 0;
}
.theme-tabs .tab-heads{
  height: 30px;
  display: flex;
  flex-flow: row;
  flex-shrink: 0;
  margin:5px;
  list-style: none;
  padding:0;
}

.theme-tabs .tab-heads .tab-label{
  height: 30px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  margin-right:5px;
  cursor: pointer;
}

.theme-tabs .tab-heads .tab-label:hover{
  background: #f5f5f5;
  color: #000;
}

.theme-tabs .tab-heads .tab-label.active{
  border-radius: 3px;
  background: #75b325;
  color: #fff;
}

</style>