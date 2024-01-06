<template>
  <actionbar/>
  <editor v-if="currentSlideshow"/>
  <create-slideshow @created="fetchSlideshows" v-else/>
</template>
<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const editorStore = useEditorStore()
const {slideshows, currentSlideshow} = storeToRefs(editorStore)

async function fetchSlideshows() {
  // wait for user to be logged in
  if (!user.value) {
    setTimeout(fetchSlideshows, 100)
    console.log('waiting for user to be logged in')
    return
  }
  const {data, error} = await supabase
      .from('slideshows')
      .select()
      .eq('user_id', user.value.id)

  if (error) {
    console.error('Error fetching data:', error);
    return;
  }

  slideshows.value = data
  // wähle die erste Präsentation aus, wenn keine ausgewählt ist
  if (!currentSlideshow.value) {
    currentSlideshow.value = slideshows.value[0]
  }
}

onMounted(fetchSlideshows)
</script>

