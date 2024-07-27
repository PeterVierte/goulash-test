<template>
  <footer class="footer">
   <div class="container">
     <div class="footer-content">
       <div class="footer-logo">Very interesting tail</div>
     </div>
   </div>
  </footer>
</template>

<script setup lang="ts">

</script>

<style scoped>
.footer {
  background: var(--black);

  height: 220px;
  margin-top: auto;
}

.footer-content {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  padding-bottom: 25px;
}

.footer-logo {
  color: var(--white);
  font-weight: 400;
}
</style>