<template>
  <v-app-bar>
    <template v-if="currentSlideshow?.title">
      <v-app-bar-title>
        <v-btn @click="currentSlideshow = null" density="compact" variant="flat" class="me-2" icon="mdi-chevron-left"/>
        {{ currentSlideshow.title }}
      </v-app-bar-title>
      <v-spacer/>
      <v-btn @click="openSlideshow" variant="flat" prepend-icon="mdi-open-in-new">Vorschau</v-btn>
    </template>
    <template v-else>
      <v-app-bar-title>
        Dynamic Display
      </v-app-bar-title>
      <v-spacer/>
      <v-select v-model="currentSlideshow" :items="slideshows" item-text="title" label="Präsentation auswählen"
                item-value="*"
                clearable="true"
                return-object=""
                prepend-inner-icon="mdi-playlist-play" variant="outlined" density="compact"/>
      <v-btn v-if="user" color="primary" class="ms-2" variant="outlined" icon="mdi-power" @click="signOut"/>
    </template>
  </v-app-bar>
</template>
<script setup lang="ts">
import {useEditorStore} from "~/stores/editor";

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const editorStore = useEditorStore()
const {slideshows, currentSlideshow, currentSlide} = storeToRefs(editorStore)
const generatedUrl = computed(() => {
  if (currentSlideshow.value === null) return null
  // and append currentSlide no
  return `${window.location.origin}/slideshow/${currentSlideshow.value.id}?slide=${currentSlide.value}`
})

const openSlideshow = () => window.open(generatedUrl.value, '_preview')

// bind cmd shift p
window.addEventListener('keydown', (e) => {
  if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) && e.shiftKey && e.key === 'p') {
    e.preventDefault();
    openSlideshow()
  }
}, false);

const signOut = async () => {
  await supabase.auth.signOut()
  window.location.reload()
}
</script>
