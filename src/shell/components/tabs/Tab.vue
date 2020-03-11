<template>
  <div v-show="isShow" class="tab">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  props: {
    name: { required: true },
    icon:'',
    selected: { default: false}
  },
  data() {
    return {
      isShow: false
    };
  },
    
  mounted() {
    this.isShow = this.selected;
  }
}
</script>
