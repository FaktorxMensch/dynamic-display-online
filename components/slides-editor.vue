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

const save = async () => {
  const {data, error} = await supabase
      .from('slideshows')
      .update({
        slides: props.slideshow.slides,
      })
      .eq('id', props.slideshow.id)
      .select()
  if (error) {
    console.error('Error inserting data:', error);
    return;
  } else {
    alert('Folien gespeichert')
    console.log('Data inserted successfully:', data);
  }
  console.log('Data inserted successfully:', data);
}
const generatedUrl = computed(() => {
  if (!props.slideshow) {
    return null
  }
  return `${window.location.origin}/slideshow/${props.slideshow.id}`
})

const openSlideshow = () => {
  window.open(generatedUrl.value, '_blank')
}
</script>

<template>
  <div v-if="user && slideshow">
    <h1 class="text-4xl py-4">Folien</h1>
    <div class="flex items-center justify-center mb-4">
      <v-text-field
          v-model="generatedUrl"
          variant="outlined"
          density="compact"
          label="URL"
          readonly
      />
      <v-btn @click="openSlideshow"
             variant="flat"
             class="ms-2"
             prepend-icon="mdi-open-in-new"
      >Öffnen
      </v-btn>
    </div>
    <!--    {{ slideshow }}-->
    <v-alert type="info" v-if="slideshow.slides.length === 0">Diese Slideshow hat noch keine Folien.</v-alert>
    <slide v-for="slide in slideshow.slides" :key="slide.id" :slide="slide"
           v-else
           @delete="slideshow.slides.splice(slideshow.slides.indexOf(slide), 1)"/>
    <div class="flex mb-8">
      <v-btn @click="addSlide"
             variant="flat"
             class="mt-4"
             prepend-icon="mdi-plus"
      >Folie hinzufügen
      </v-btn>
      <v-spacer/>
      <!-- save button -->
      <v-btn @click="save"
             color="primary"
             variant="flat"
             class="mt-4"
             prepend-icon="mdi-content-save"
      >Speichern
      </v-btn>
    </div>
  </div>
  <div v-else-if="user">Bitte wählen Sie eine Slideshow aus.</div>
  <v-progress-circular indeterminate v-else/>
</template>
