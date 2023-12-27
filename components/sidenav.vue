<script lang="ts" setup>
const props = defineProps(['slideshow'])
</script>

<template>
  <div>
    <h5 class="text-h5">Übersicht</h5>
    <div class="flex gap-2 flex-col my-2">
      <div class="w-full bg-neutral-400 border aspect-video rounded shadow "
           v-for="slide in slideshow.slides"
           :key="slide.id"
      >
        <render-slide :slide="slide"/>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
