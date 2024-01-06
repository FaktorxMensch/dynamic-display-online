<script lang="ts" setup>
const props = defineProps(['slideshow', 'currentSlide'])
const emit = defineEmits(['addSlide', 'set-current-slide'])


let movingSlideIndex = null;
let placeholderIndex = null;

const handleDragStart = (index) => {
  movingSlideIndex = index;
  placeholderIndex = index;
}

const handleDragEnd = () => {
  movingSlideIndex = null;
  placeholderIndex = null;
}

const handleDragOver = (event) => {
  const targetIndex = Number(event.dataTransfer.getData("text/plain"));
  if (targetIndex !== placeholderIndex) {
    placeholderIndex = targetIndex;
  }
}

const handleDrop = (event) => {
  event.preventDefault();
  const targetIndex = Number(event.dataTransfer.getData("text/plain"));
  if (targetIndex !== movingSlideIndex) {
    const draggedItem = props.slideshow.slides.splice(movingSlideIndex, 1)[0];
    props.slideshow.slides.splice(targetIndex, 0, draggedItem);
  }
  handleDragEnd();
}

</script>

<template>
  <div>
    <h5 class="text-h5">Übersicht</h5>
    <div class="flex gap-2 flex-col my-2" @drop="handleDrop" @dragover.prevent>
      <div class="w-full bg-neutral-400 aspect-video rounded overflow-hidden cursor-pointer border-2"
           :class="{'border-blue-500': currentSlide === index, 'border-white': currentSlide !== index}"
           @click="emit('set-current-slide', index)"
           v-for="(slide,index) in slideshow.slides"
           :key="slide.id"

           draggable="true"
           @dragend="handleDragEnd"
           @dragstart="handleDragStart(index)"
      >
        <render-slide :slide="slide"
                      style="width:1920px;height:1080px; transform: scale(0.12);transform-origin: top left; "/>
        <div
            v-if="placeholderIndex !== null"
            class="slide-placeholder"
        ></div>
      </div>

      <v-btn
          @click="emit('addSlide')"
          variant="flat"
          color="#eee"
          prepend-icon="mdi-plus"
      >Folie hinzufügen
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.slide-placeholder {
  border: 2px dashed #ccc;
  /* Weitere Stile für den Platzhalter */
}

.slide-preview {
  transition: transform 0.3s ease;
}
</style>
