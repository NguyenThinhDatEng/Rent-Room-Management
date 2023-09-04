<template>
  <router-link :to="{ name: 'route-test', params: { id: 1810 } }"
    >Router Demo</router-link
  >
</template>

<script>
export default {
  name: "HomeTest",
  setup() {
    return {};
  },
};
</script>

<style scoped>
</style>