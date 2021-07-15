<template>
  <mt-popup
    v-model="popupVisible"
    :closeOnClickModal="closeOnClickModal"
    :position="position"
    popup-transition="popup-fade"
  >
    <slot></slot>
  </mt-popup>
</template>

<script>
export default {
  props: {
    pv: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: "center",
    },
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      popupVisible: false,
    };
  },

  watch: {
    pv() {
      this.popupVisible = this.pv;
    },
  },
};
</script>

<style>
</style>