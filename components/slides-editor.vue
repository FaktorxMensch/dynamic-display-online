<script lang="ts" setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const props = defineProps(['slideshow'])
const addSlide = () => {
  props.slideshow.slides.push({
    "type": "image",
    "source": "bild1.jpg",
    "displayTime": 1000,
    "background": "#000000",
    "imageMode": "cover"
  })
  // props.slideshow.slides.push({
  //   "type": "video",
  //   "source": "bild1.mov",
  //   "displayTime": 42000,
  //   "muted": true,
  // })
  // props.slideshow.slides.push({
  //   "type": "iframe",
  //   "source": "https://www.youtube.com/embed/9XaS93WMRQQ",
  //   "displayTime": 10000,
  //   "background": "#000000",
  // })
  // props.slideshow.slides.push({
  //   "type": "html",
  //   "source": "<h1>HTML</h1>",
  //   "displayTime": 10000,
  //   "background": "#000000",
  // })
}
</script>

<template>
  <div v-if="user && slideshow">
    <h1 class="text-4xl py-4">Folien</h1>
    <!--    {{ slideshow }}-->
    <v-alert type="info" v-if="slideshow.slides.length === 0">Diese Slideshow hat noch keine Folien.</v-alert>
    <slide v-for="slide in slideshow.slides" :key="slide.id" :slide="slide"
           v-else
           @delete="slideshow.slides.splice(slideshow.slides.indexOf(slide), 1)"/>
    <v-btn @click="addSlide"
           color="primary"
           variant="flat"
           class="mt-4"
           prepend-icon="mdi-plus"
    >Folie hinzufügen
    </v-btn>
  </div>
  <div v-else-if="user">Bitte wählen Sie eine Slideshow aus.</div>
  <v-progress-circular indeterminate v-else/>
</template>
