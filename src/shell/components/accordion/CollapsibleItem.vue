<template>
  <div class="collapsible-item" :class="!isActive ? 'item-collapse' : ''">
    <div class="item-heading" @click="click">
      <slot name="heading"></slot>
    </div>
    <div class="item-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollapsibleItem',
  props: {
    selected: { default: false}
  },
  data() {
    return {
      isActive: false
    };
  },

  methods: {
    click() {
      this.$emit('itemClick', this)
    }
  },
    
  mounted() {
    this.isActive = this.selected;
  }
}
</script>
