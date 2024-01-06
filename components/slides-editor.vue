<script lang="ts" setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const props = defineProps(['slideshow'])
const addSlide = () => {
  props.slideshow.slides.push({
    "type": "image",
    "source": "https://cdn.faktorxmensch.com/dynamicdisplay/emily/bild1.jpg",
    "displayTime": 5,
    "background": "#000000",
    "imageMode": "cover",
    "enabled": true,
    "condition": 'return true;'
  })
  // props.slideshow.slides.push({
  //   "type": "video",
  //   "source": "bild1.mov",
  //   "displayTime": 42,
  //   "muted": true,
  // })
  // props.slideshow.slides.push({
  //   "type": "iframe",
  //   "source": "https://www.youtube.com/embed/9XaS93WMRQQ",
  //   "displayTime": 10,
  //   "background": "#000000",
  // })
  // props.slideshow.slides.push({
  //   "type": "html",
  //   "source": "<h1>HTML</h1>",
  //   "displayTime": 10,
  //   "background": "#000000",
  // })
}

const save = async () => {
  console.log('saving slides', props.slideshow.id)
  const {data, error} = await supabase
      .from('slideshows')
      .update({
        slides: props.slideshow.slides,
      })
      .eq('id', props.slideshow.id)
  // .select()
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

const generatedControlUrl = computed(() => {
  if (!props.slideshow) {
    return null
  }
  return `${window.location.origin}/control/${props.slideshow.id}`
})

const openSlideshow = () => {
  window.open(generatedUrl.value, '_blank')
}

const currentSlide = ref(0)
const slide = computed(() => {
  if (!props.slideshow) {
    return null
  }
  return props.slideshow.slides[currentSlide.value]
})
</script>

<template>
  <div v-if="user && slideshow">

    <h1 class="text-4xl py-4">Slideshow bearbeiten</h1>
    <div class="flex items-center justify-center mb-4 gap-2">
      <v-text-field v-model="generatedUrl" variant="outlined" density="compact" label="Presentation URL" readonly/>
      <v-text-field v-model="generatedControlUrl" variant="outlined" density="compact" label="Control URL"
                    readonly/>
      <v-btn @click="openSlideshow"
             variant="flat"
             prepend-icon="mdi-open-in-new"
      >Öffnen
      </v-btn>
    </div>

    <div class="flex gap-4">
      <sidenav @add-slide="addSlide" class="w-56" :slideshow="slideshow"
               :current-slide="currentSlide" @set-current-slide="currentSlide = $event"/>
      <div class="flex-1">

        <h5 class="text-h5 mb-2">Aktuelle Folie</h5>

        <v-alert type="info" v-if="slideshow.slides.length === 0">Diese Slideshow hat noch keine Folien.</v-alert>
        <slide-edit :key="slide.id" :slide="slide" v-else
                    @delete="slideshow.slides.splice(slideshow.slides.indexOf(slide), 1)"/>
        <div class="flex mb-8">
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
    </div>
  </div>
  <div v-else-if="user">Bitte wählen Sie eine Slideshow aus.</div>
  <v-progress-circular indeterminate v-else/>
</template>
