<template>
  <div>
    <rh-alert
      v-if="errorMessage"
      state="danger"
      variant="alternate"
    >
      <h3>{{ errorMessage }}</h3>
    </rh-alert>
  </div>
</template>

<script setup>
import "@rhds/elements/rh-alert/rh-alert.js";
defineProps({
  errorMessage: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>

</style>
