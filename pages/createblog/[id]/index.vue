<template>
  <BlogComponent :id="id" />
</template>

<script setup>
import BlogComponent from "~/components/BlogComponent.vue";
const route = useRoute();
const id = route.params.id;
</script>
