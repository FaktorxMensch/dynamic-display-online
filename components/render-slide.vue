<script lang="ts" setup>
const props = defineProps(['slide'])
</script>

<template>
  <div class="render-slide" :style="{background: slide.background}">
    <img :src="slide.source" v-if="slide.type === 'image'"
         :class="{'object-cover': slide.imageMode === 'cover', 'object-contain': slide.imageMode === 'contain'}"
    />
    <video :src="slide.source" v-else-if="slide.type === 'video'"/>
    <iframe :src="slide.source" v-else-if="slide.type === 'iframe'"/>
    <div class="html" v-html="slide.source" v-else-if="slide.type === 'html'"/>
  </div>
</template>

<style>
.render-slide > * {
  @apply w-full h-full fixed inset-0 overflow-hidden;
}
</style>
