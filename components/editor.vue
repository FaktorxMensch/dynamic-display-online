<script lang="ts" setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const editorStore = useEditorStore()
const {slideshows, currentSlideshow, currentSlide} = storeToRefs(editorStore)


const addSlide = () => {
  currentSlideshow.value.slides.push({
    "id": Math.random().toString(36).substring(7),
    "type": "image",
    "source": "https://cdn.faktorxmensch.com/dynamicdisplay/emily/bild1.jpg",
    "displayTime": 5,
    "background": "#000000",
    "imageMode": "cover",
    "enabled": true,
    "condition": 'return true;',
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
        title: currentSlideshow.value.title,
        style: currentSlideshow.value.style
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

const slide = computed(() => {
  if (!currentSlideshow.value) return null
  return currentSlideshow.value.slides[currentSlide.value]
})

// sobald sich currentSlideshow ändert einfach als currentSlide die erste Folie auswählen
watch(currentSlideshow, () => {
  // die erste Folie auswählen, die enabled ist
  currentSlide.value = currentSlideshow.value.slides.findIndex(slide => slide.enabled)
  // faoostr die erste Folie auswählen, wenn keine enabled ist
  if (currentSlide.value === -1) {
    currentSlide.value = 0
  }
}, {immediate: true})
</script>

<template>
  <template v-if="user && currentSlideshow">
    <v-navigation-drawer location="left">
      <sidenav class="w-56 mx-4"/>

      <v-btn
          @click="addSlide"
          variant="flat"
          class="w-full"
          style="height:5em"
          prepend-icon="mdi-plus"
      >Folie hinzufügen
      </v-btn>
    </v-navigation-drawer>

    <v-main class="overflow-y-auto mt-4" style="height: calc( 100vh - 64px )">
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

    <v-navigation-drawer location="right">
      <v-text-field v-model="currentSlideshow.title" label="Titel" type="text"/>
      <textarea v-model="currentSlideshow.style" placeholder="Globales CSS" type="text"
                class="w-full h-full p-4 text-sm font-mono"/>

    </v-navigation-drawer>

  </template>
  <div v-else-if="user">Bitte wählen Sie eine Slideshow aus.</div>
  <v-progress-circular indeterminate v-else/>

  <v-snackbar v-model="savingSuccess" color="success" location="top">
    <v-icon left>mdi-check</v-icon>
    Gespeichert
  </v-snackbar>
</template>
