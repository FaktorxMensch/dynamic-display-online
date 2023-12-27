<script lang="ts" setup>
const props = defineProps(['slideshow'])
const emit = defineEmits(['addSlide'])
</script>

<template>
  <div>
    <h5 class="text-h5">Übersicht</h5>
    <div class="flex gap-2 flex-col my-2">
      <div class="w-full bg-neutral-400 aspect-video rounded shadow overflow-hidden"
           v-for="slide in slideshow.slides"
           :key="slide.id"
      >
        <render-slide :slide="slide"/>
      </div>

      <v-btn
          @click="$emit('addSlide')"
          variant="flat"
          color="#eee"
          prepend-icon="mdi-plus"
      >Folie hinzufügen
      </v-btn>
    </div>
  </div>
</template>

<style scoped></style>
