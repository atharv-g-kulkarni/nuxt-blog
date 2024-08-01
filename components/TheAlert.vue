<template>
  <div>
    <rh-alert
      v-if="errorMessage"
      state="info"
      variant="alternate"
      class="alert"
    >
      <h3>{{ errorMessage }}</h3>
    </rh-alert>
  </div>
</template>

<script setup>
import "@rhds/elements/rh-alert/rh-alert.js";
const props = defineProps({
  errorMessage: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.alert {
  margin-top: 15px;
}
</style>
