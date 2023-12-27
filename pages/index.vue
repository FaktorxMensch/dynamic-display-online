<template>
  <v-app-bar>
    <v-app-bar-title>
      Dynamic Display
    </v-app-bar-title>
    <v-select
        v-model="currentSlideshow"
        :items="slideshows"
        item-text="title"
        item-value="id"
        label="Slideshow"
        prepend-icon="mdi-playlist-play"
        variant="outlined"
        density="compact"
    />
    <v-btn
        v-if="user"
        color="primary"
        class="ms-2"
        variant="outlined"
        prepend-icon="mdi-power"
        @click="currentSlideshow = null"
    >Logout
    </v-btn>
  </v-app-bar>
  <v-main>
    <slides-editor :slideshow="slideshow" v-if="slideshow"/>
    <create-slideshow @created="fetchSlideshows" v-else/>
  </v-main>
</template>
<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const slideshows = ref([])
const currentSlideshow = ref(null)
const slideshow = computed(() => {
  if (!currentSlideshow.value) {
    return null
  }
  return slideshows.value.find((slideshow) => slideshow.id === currentSlideshow.value)
})

async function fetchSlideshows() {
  const {data, error} = await supabase
      .from('slideshows')
      .select()

  if (error) {
    console.error('Error fetching data:', error);
    return;
  }

  slideshows.value = data
}

onMounted(fetchSlideshows)
</script>

