<script lang="ts" setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const emit = defineEmits(['created'])
const title = ref('')
// create a slideshow
// Function to insert data into the database
const createSlideshow = async () => {
  const {data, error} = await supabase
      .from('slideshows')
      .insert({
        title: title.value,
        user_id: user.value.id,
      })
      .select()

  if (error) {
    console.error('Error inserting data:', error);
    return;
  } else {
    alert('Slideshow erstellt, bitte wählen Sie diese nun aus der Liste aus')
  }

  console.log('Data inserted successfully:', data);
  emit('created', data[0])
}
</script>

<template>
  <v-card>
    <v-card-title
        class="text-h4"
    >
      Slideshow erstellen
    </v-card-title>
    <v-card-subtitle>
      Erstellen Sie eine neue Slideshow.
    </v-card-subtitle>
    <v-card-text>
      <v-form @submit.prevent="createSlideshow">
        <v-text-field
            v-model="title"
            label="Titel"
            type="text"
        />
        <v-btn
            variant="tonal"
            class="w-full mt-4"
            prepend-icon="mdi-playlist-plus"
            color="primary"
            @click="createSlideshow"> Slideshow erstellen
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
