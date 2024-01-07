<script lang="ts" setup>
const props = defineProps(['slide'])
const emit = defineEmits(['delete'])
const conditions = [
  {
    title: "Immer",
    expression: "true"
  },
  {
    title: "Zufälligkeit von 30%",
    expression: "Math.random() < 0.3"
  },
  {
    title: "Immer an Wochentagen",
    expression: "new Date().getDay() >= 1 && new Date().getDay() <= 5"
  },
  {
    title: "Immer am Wochenende",
    expression: "new Date().getDay() === 0 || new Date().getDay() === 6"
  },
  {
    title: "Immer von 8 bis 20 Uhr",
    expression: "new Date().getHours() >= 8 && new Date().getHours() < 20"
  },
  {
    title: "Immer von 20 bis 8 Uhr",
    expression: "new Date().getHours() >= 20 || new Date().getHours() < 8"
  },
  {
    title: "An einem ganz bestimmten Tag (z.B. 15. Januar 2024)",
    expression: "new Date().toDateString() === new Date('2024-01-15').toDateString()"
  },
  {
    title: "Ab einem ganz bestimmten Tag (z.B. ab dem 15. Januar 2024)",
    expression: "new Date() >= new Date('2024-01-15')"
  },
  {
    title: "Bis zu einem ganz bestimmten Tag (z.B. bis zum 15. Januar 2024)",
    expression: "new Date() <= new Date('2024-01-15')"
  },
  {
    title: "An geraden Tagen des Monats",
    expression: "new Date().getDate() % 2 === 0"
  },
  {
    title: "An ungeraden Tagen des Monats",
    expression: "new Date().getDate() % 2 !== 0"
  },
  {
    title: "Nur im Sommer (Juni bis August)",
    expression: "new Date().getMonth() >= 5 && new Date().getMonth() <= 7"
  },
  {
    title: "Nur im Winter (Dezember bis Februar)",
    expression: "new Date().getMonth() === 11 || new Date().getMonth() === 0 || new Date().getMonth() === 1"
  }
];
const selectedCondition = ref(null);
watch(selectedCondition, (newValue) => {
  if (newValue) {
    props.slide.condition = 'return ' + selectedCondition.value;
  }
})

const editorStore = useEditorStore()
const  {currentSlideshow} = storeToRefs(editorStore)
</script>

<template>
  <div class="aspect-video w-full h-auto relative bg-neutral-500 rounded-md mb-5 overflow-hidden max-w-4xl">
    <render-slide :slide="props.slide"
                  class="absolute inset-0"
                  :css="currentSlideshow.css"
                  style="transform: scale(0.467);transform-origin: top left;width: 1920px;height: 1080px;"/>
  </div>
  <v-card class="mb-4">
    <v-card-title>
      <div class="flex justify-between items-center">
        {{ props.slide.type.charAt(0).toUpperCase() + props.slide.type.slice(1) }} -
        Folie
        <v-spacer/>
        <v-select v-model="props.slide.type"
                  :items="['image', 'video', 'iframe', 'html']"
                  variant="outlined"
                  class="w-4 me-2"
                  density="compact"
        />
        <v-btn @click="$emit('delete')"
               color="error"
               variant="outlined"
               density="comfortable"
               icon="mdi-delete"
        />
      </div>
    </v-card-title>
    <v-card-text class="flex flex-col gap-2">
      <v-textarea
          v-if="props.slide.type === 'html'"
          v-model="props.slide.source"
          label="HTML"
      />
      <v-text-field
          v-model="props.slide.source"
          v-else
          label="Quelle"
          type="text"
      />
      <v-text-field
          v-model="props.slide.displayTime"
          label="Anzeigedauer (s)"
          type="number"
      />
      <v-select
          v-if="props.slide.type === 'image'"
          v-model="props.slide.imageMode"
          label="Bildmodus"
          :items="['cover', 'contain']"
      />
      <v-checkbox
          v-if="props.slide.type === 'video'"
          v-model="props.slide.muted"
          label="Ton aus"
      />
      <div class="flex">
        <v-text-field
            v-model="props.slide.background"
            label="Hintergrundfarbe"
        />
        <v-text-field
            v-model="props.slide.background"
            label="Hintergrundfarbe"
            type="color"
        />
      </div>
    </v-card-text>
  </v-card>
  <!-- nächste card, diese bestimmt, ob die folie angezeigt jetzt werden soll (mit konditionaler anzeige als javascript function die einen boolean zurückgibt, ja=folie anzeigen, nein=folie nicht anzeigen) -->
  <v-card class="mb-4">
    <v-card-title>
      <div class="flex justify-between items-center">
        Folie anzeigen
        <v-spacer/>
        <v-checkbox v-model="props.slide.enabled"/>
      </div>
    </v-card-title>
    <v-card-text>
      <label for="condition"></label>
      <v-select label="Vorlage anwenden"
                item-value="expression"
                :items="conditions" v-model="selectedCondition" @change="setPredefinedCondition"/>
      <v-textarea
          v-model="props.slide.condition"
          label="Bedingung (JS Ausdruck, der einen boolean zurückgibt, standard ist `return true;`)"
      />
    </v-card-text>
  </v-card>

</template>

<style>
.v-input__details {
  display: none;
}
</style>
