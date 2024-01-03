<script lang="ts" setup>
const props = defineProps(['slide'])
const emit = defineEmits(['delete'])
</script>

<template>
  <v-card class="mb-4"
          variant="outlined"
  >
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
</template>

<style>
.v-input__details {
  display: none;
}
</style>
