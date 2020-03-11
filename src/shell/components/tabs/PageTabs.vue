<template>
  <div class="page-tabs">
    <ul  class="tab-heads">
      <li v-for="tab in tabs" class="head-item" :class="{ 'active': tab.isShow }" 
        @click="selectTab(tab)">
          {{ tab.name }} <span class="close">×</span>
      </li>
    </ul>
    <div class="tab-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageTabs',
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

