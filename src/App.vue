<script setup>
import { RouterView } from 'vue-router';
import { NLoadingBarProvider } from 'naive-ui'; // Ensure this is also imported if not globally registered
</script>

<template>
  <n-loading-bar-provider>
    <RouterView />
  </n-loading-bar-provider>
</template>


<style scoped>

</style>
