<script lang="ts" setup>
import Draggable from 'vuedraggable';
const drag = ref(false);
const editorStore = useEditorStore()
const { currentSlideshow, currentSlide} = storeToRefs(editorStore)
</script>

<template>
  <div>
    <div class="flex gap-2 flex-col my-3">
      <Draggable v-model="currentSlideshow.slides" class="slides-container" @start="drag=true" @end="drag=false"
                 tag="transition-group" :animation="200">
        <template #item="{element: slide, index}"
                  v-for="(slide,index) in currentSlideshow.slides"
                  :key="slide.id">
          <div class="flex gap-2 items-end p-2 rounded"
               :class="{'bg-blue-500': currentSlide === index, '': currentSlide !== index}"
          >
            <div class="opacity-50">
              {{ index + 1 }}
            </div>
            <div
                class="w-full relative bg-neutral-500 aspect-video rounded overflow-hidden cursor-pointer transition-all"
                :class="{'h-5 opacity-50 grayscale': !slide.enabled}"
                @click="currentSlide = index"
            >
              <render-slide style="width:1920px;height:1080px; transform: scale(0.100);transform-origin: top left; "
                            :css="currentSlideshow.style"
                            :slide="slide"/>
            </div>
          </div>
        </template>
      </Draggable>

    </div>
  </div>
</template>

<style scoped>
.slide-preview {
  transition: transform 0.3s ease;
  margin-bottom: 1rem;
}

.slides-container > .slide-preview {
  transition: all 0.2s ease;
}

/* Spezifische Stile für das Ein- und Ausblenden */
.slides-container-enter-active, .slides-container-leave-active {
  transition: opacity 0.2s ease;
}

.slides-container-enter, .slides-container-leave-to {
  opacity: 0;
}

</style>
