<script lang="ts" setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const editorStore = useEditorStore()
const {slideshows, currentSlideshow} = storeToRefs(editorStore)


const addSlide = () => {
  currentSlideshow.value.slides.push({
    "type": "image",
    "source": "https://cdn.faktorxmensch.com/dynamicdisplay/emily/bild1.jpg",
    "displayTime": 5,
    "background": "#000000",
    "imageMode": "cover",
    "enabled": true,
    "condition": 'return true;'
  })
}

// bind ctrl + m to create new slide
window.addEventListener('keydown', (e) => {
  if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) && e.key === 'm') {
    e.preventDefault();
    addSlide()
  }
}, false);

const savingSuccess = ref(false)

const save = async () => {
  const {data, error} = await supabase
      .from('slideshows')
      .update({
        slides: currentSlideshow.value.slides,
      })
      .eq('id', currentSlideshow.value.id)
  if (error) {
    console.error('Error inserting data:', error);
    return;
  } else {
    savingSuccess.value = true
    setTimeout(() => {
      savingSuccess.value = false
    }, 2000)
  }
}
// bind ctrl s and cmd s to save
window.addEventListener('keydown', (e) => {
  if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) && e.key === 's') {
    e.preventDefault();
    save()
  }
}, false);

const currentSlide = ref(0)
const slide = computed(() => {
  if (!currentSlideshow.value) return null
  return currentSlideshow.value.slides[currentSlide.value]
})
</script>

<template>
  <template v-if="user && currentSlideshow">
    <v-navigation-drawer >
      <sidenav @add-slide="addSlide" class="w-56 mx-4" :slideshow="currentSlideshow" :current-slide="currentSlide"
               @set-current-slide="currentSlide = $event"/>
    </v-navigation-drawer>

    <v-main>
      <v-alert type="info" v-if="currentSlideshow.slides.length === 0">Diese Slideshow hat noch keine Folien.</v-alert>
      <slide-edit :key="slide.id" :slide="slide" v-else
                  @delete="currentSlideshow.slides.splice(currentSlideshow.slides.indexOf(slide), 1)"/>
      <div class="flex mb-8">
        <v-spacer/>
        <!-- save button -->
        <v-btn @click="save"
               :color="savingSuccess ? 'success' : 'primary'"
               variant="flat"
               class="mt-4"
               :prepend-icon="savingSuccess ? 'mdi-check' : 'mdi-content-save'"
        >{{ savingSuccess ? 'Gespeichert' : 'Speichern' }}
        </v-btn>
      </div>
    </v-main>
  </template>
  <div v-else-if="user">Bitte wählen Sie eine Slideshow aus.</div>
  <v-progress-circular indeterminate v-else/>

  <v-snackbar v-model="savingSuccess" color="success" position="top">
    <v-icon left>mdi-check</v-icon>
    Gespeichert
  </v-snackbar>
</template>