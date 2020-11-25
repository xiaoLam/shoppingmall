<template>
  <div class="toast" v-show="isShow">{{ message }}</div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    /* message: {
      type: String,
      default: "",
    },
    isShow: {
      type: Boolean,
      default: false,
    }, */
  },
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(message, delay = 2000) {
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, delay);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;

  padding: 8px 10px;
  border-radius: 8px;

  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);

  white-space: nowrap;
}
</style>

