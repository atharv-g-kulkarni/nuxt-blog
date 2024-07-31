<template>
  <div>
    <rh-alert v-if="errorMessage" class="alert">
      <h3>{{ errorMessage }}</h3>
    </rh-alert>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import "@rhds/elements/rh-alert/rh-alert.js";
const props = defineProps({
  errorMessage: {
    type: String,
    default: '',
  },
});

const message = ref(props.errorMessage)
watch(() =>props.errorMessage, (newValue) => {
  if(newValue){
    message.value = newValue;
    setTimeout(() => {
      message.value = '';
    }, 3000)
  }
})
</script>

<style scoped>
.alert {
  margin-top: 15px;
}
</style>
