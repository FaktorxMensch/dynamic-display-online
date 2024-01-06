<script setup>
const supabase = useSupabaseClient()
const route = useRoute()
const slideshow_id = route.params.slideshow

// fetcrh slideshow from parameter
const {data: slideshow, error} = await supabase
    .from('slideshows')
    .select()
    .eq('id', slideshow_id)
    .single()

definePageMeta({layout: ''})

const shouldDisplaySlide = (slide) => {
  if (!slide.enabled) return false;

  try {
    const conditionFunction = new Function(slide.condition);
    return conditionFunction();
  } catch (error) {
    console.error("Error evaluating condition: ", error);
    return false;
  }
}

const currentSlide = ref(0)
const currentSlideData = computed(() => {
  if (!slideshow) {
    return null
  }
  return slideshow.slides[currentSlide.value]
})
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slideshow.slides.length

  // Setze Timeout für die nächste Folie, wenn diese angezeigt werden soll
  if (shouldDisplaySlide(currentSlideData.value)) {
    setTimeout(nextSlide, currentSlideData.value.displayTime * 1000);
  } else {
    // Sofort zur nächsten Folie, wenn die aktuelle übersprungen werden soll
    nextSlide();
  }
}

const started = ref(false)
watch(currentSlideData, () => {
  if (!started.value && currentSlideData.value) {
    started.value = true

    // only continue if more than 1 slide
    if (slideshow.slides.length <= 1) return

    nextSlide()
  }
}, {immediate: true})

// refresh the whole page
setTimeout(() => {
  window.location.reload()
}, 60 * 60 * 1000) // 1 hour

</script>
<template>
  <template v-if="slideshow?.title">
    <title>{{slideshow?.title}} (Dynamic Display)</title>
    <render-slide class="inset-0 fixed" v-if="currentSlideData" :slide="currentSlideData"
                  @click="nextSlide"/>
    />
  </template>
  <div v-else>
    <title>Dynamic Display</title>
    <div class="h-screen w-screen bg-black flex justify-center items-center">
      <v-progress-circular indeterminate/>
    </div>
  </div>
</template>
