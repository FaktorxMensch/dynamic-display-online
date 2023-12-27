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

const currentSlide = ref(0)
const currentSlideData = computed(() => {
  if (!slideshow) {
    return null
  }
  return slideshow.slides[currentSlide.value]
})
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slideshow.slides.length
  // set timeout for next slide
  console.log('setting timeout for next slide in', currentSlideData.value.displayTime)
  setTimeout(nextSlide, currentSlideData.value.displayTime)
}

const started = ref(false)
watch(currentSlideData, () => {
  if (!started.value && currentSlideData.value) {
    started.value = true
    nextSlide()
  }
}, {immediate: true})

// refresh the whole page after 30 minutes
setTimeout(() => {
  window.location.reload()
}, 30 * 60 * 1000)
</script>
<template>
  <template v-if="slideshow?.title">
    <title>{{slideshow?.title}} (Dynamic Display)</title>
    <render-slide class="inset-0 fixed" v-if="currentSlideData" :slide="currentSlideData"/>
  </template>
  <div v-else>
    <title>Dynamic Display</title>
    <div class="h-screen w-screen bg-black flex justify-center items-center">
      <v-progress-circular indeterminate/>
    </div>
  </div>
</template>
