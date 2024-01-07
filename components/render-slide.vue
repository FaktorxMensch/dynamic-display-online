<script lang="ts" setup>
const props = defineProps(['slide', 'css'])
const id = Math.random().toString(36).substring(7)
const cssNotScoped = props.css

const cssScoped = computed(() => {
  // convert cssNotScoped to cssScoped
  let css = cssNotScoped
  console.log('css', props.css)
  if (!css) return ''
  // css has a selector followed by a { until the next }, sometimes we have commas in the selector, then each selector needs a #slide-{{slide.id}} prefix
  // eexplode rules by }
  const rules = css.split('}')
  // iterate over rules
  rules.forEach((rule, index) => {
    // split by {
    const parts = rule.split('{')
    // if we have a selector
    if (parts.length > 1) {
      // split by ,
      const selectors = parts[0].split(',')
      // iterate over selectors
      selectors.forEach((selector, index) => {
        // add #slide-{{slide.id}} to each selector
        selectors[index] = `#slide-${id} ${selector}`
      })
      // join selectors by ,
      parts[0] = selectors.join(',')
    }
    // join parts by {
    rules[index] = parts.join('{')
  })
  // join rules by }
  css = rules.join('}')
  return css
})

// add a style inside to #slide-{{slide.id}}-style
onMounted(() => {
  const style = document.getElementById(`slide-${id}-style`)
  // create style element
  const styleElement = document.createElement('style')
  // add cssScoped to style element
  styleElement.innerHTML = cssScoped.value
  // append style element to style
  style.appendChild(styleElement)
})
</script>

<template>
  <div class="render-slide slide" :style="{background: slide.background}" :id="`slide-${id}`">
    <img :src="slide.source" v-if="slide.type === 'image'"
         :class="{'object-cover': slide.imageMode === 'cover', 'object-contain': slide.imageMode === 'contain'}"
    />
    <video :src="slide.source" v-else-if="slide.type === 'video'" autoplay :muted="slide.muted"/>
    <iframe :src="slide.source" v-else-if="slide.type === 'iframe'"/>
    <div class="html" v-html="slide.source" v-else-if="slide.type === 'html'"/>
    <slidetype-event v-else-if="slide.type === 'event'"/>
  </div>
  <div :id="`slide-${id}-style`"/>
</template>

<style>
.render-slide, .render-slide > * {
  @apply w-full h-full overflow-hidden min-h-full;
}
</style>
