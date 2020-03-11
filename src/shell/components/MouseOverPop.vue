<template>
  <div class="mouse-over-pop" @mouseenter="mouseEnter" @mouseout="mouseOut">
    <slot name="heading"></slot>
    <div v-show="isActive" class="pop-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MouseOverPop',
  data() {
    return {
      isActive: false
    };
  },

  methods: {
    mouseEnter() {
      this.isActive = true
    },
    mouseOut() {
      this.isActive = false
    },
  },
}
</script>
