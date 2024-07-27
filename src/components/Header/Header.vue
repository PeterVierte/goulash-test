<template>
  <header class="header">
   <div class="container">
     <div class="logo">sf</div>
   </div>
  </header>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.header {
  padding: 16px 0;
  background: var(--brown);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}
.logo {
  color: var(--white);
  text-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  font-weight: 400;
}
</style>