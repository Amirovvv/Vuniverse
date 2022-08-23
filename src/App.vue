<script setup lang="ts">
import Sidebar from '@/components/Sidebar/Sidebar.vue'
</script>

<template>
  <div class="wrapper">
    <Sidebar />
    <main><router-view></router-view></main>
  </div>
</template>

<style scoped></style>
