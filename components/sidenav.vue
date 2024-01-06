<script lang="ts" setup>
const props = defineProps(['slideshow', 'currentSlide'])
const emit = defineEmits(['addSlide', 'set-current-slide'])
</script>

<template>
  <div>
    <h5 class="text-h5">Übersicht</h5>
    <div class="flex gap-2 flex-col my-2">
      <div class="w-full bg-neutral-400 aspect-video rounded overflow-hidden cursor-pointer border-2"
           :class="{'border-blue-500': currentSlide === index, 'border-white': currentSlide !== index}"
           @click="emit('set-current-slide', index)"
           v-for="(slide,index) in slideshow.slides"
           :key="slide.id"
      >
        <render-slide :slide="slide" style="width:1920px;height:1080px;
        transform: scale(0.12);transform-origin: top left;
"/>
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
