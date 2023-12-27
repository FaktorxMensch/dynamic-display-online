<template>
  <h1 class="text-4xl">Dynamic Display</h1>
  <p class="text-lg">Verwalten Sie die Inhalte Ihres Displays.</p>
  <!--  <create-slideshow @created="fetchSlideshows"/>-->

  <v-select
      v-model="currentSlideshow"
      :items="slideshows"
      item-text="title"
      item-value="id"
      label="Slideshow"
      outlined
  />
  <slides-editor :slideshow="slideshow"/>
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

