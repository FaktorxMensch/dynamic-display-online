<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const loading = ref(false)

const signInWithOtp = async () => {
  loading.value = true
  const {error} = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: window.location.origin + '/confirm',
    }
  })
  loading.value = false
  if (error) {
    console.log(error)
    alert(error.message)
  } else {
    console.log('success')
    alert('Bitte prüfen Sie Ihre E-Mails')
  }
}

definePageMeta({layout: 'login'})
</script>
<template>
  <v-container>
    <v-card class="border pt-3">
      <v-card-title
          class="text-h4"
      >
        Dynamic Display
      </v-card-title>
      <v-card-subtitle>
        Verwalten Sie die Inhalte Ihres Displays.
      </v-card-subtitle>
      <v-card-text>
        <v-progress-circular
            v-if="loading"
            indeterminate
            size="64"
        />
        <v-form @submit.prevent="signInWithOtp" v-else>
          <v-text-field
              v-model="email"
              type="email"
              variant="outlined"
              placeholder="E-Mail Adresse"
          />
          <v-btn
              :disabled="!email"
              class="w-full"
              color="primary"
              @click="signInWithOtp"> Mit E-Mail anmelden
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
