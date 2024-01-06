<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const loading = ref(false)

const signInWithPassword = async () => {
  loading.value = true
  const {error} = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  loading.value = false
  if (error) {
    console.log(error)
    alert(error.message)
  } else {
    console.log('success')
    window.location.href = '/confirm'
  }
}

definePageMeta({layout: 'login'})
</script>
<template>
  <v-container>
    <v-card class="border pt-3" style="box-shadow: 0 20px 20px -10px #0003">
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
        <v-form @submit.prevent="signInWithPassword" v-else>
          <v-text-field
              v-model="email"
              type="email"
              variant="outlined"
              placeholder="E-Mail Adresse"
          />
          <v-text-field
              v-model="password"
              type="password"
              variant="outlined"
              placeholder="Passwort"
          />
          <v-btn
              :disabled="!email"
              class="w-full"
              color="primary"
              @click="signInWithPassword"
          >Anmelden
          </v-btn>

          <!--register button -->
          <v-btn
              class="w-full mt-4"
              variant="flat"
              to="/register"
          >
            Registrieren
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
