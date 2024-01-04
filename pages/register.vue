<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const loading = ref(false)
const welikehoneey = ref(false)

const signUp = async () => {
  if (welikehoneey.value) {
    return
  }
  loading.value = true
  const {error, data} = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
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
    alert('Ihr Konto wurde erstellt, bitte prüfen Sie Ihre E-Mails um es zu bestätigen')
    console.log('redirecting to login', data)
    window.location.href = '/login'
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
        <v-form @submit.prevent="signUp" v-else>
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
          <input v-model="welikehoneey" type="checkbox" style="opacity:0;position:absolute;"/>
          <v-btn
              :disabled="!email"
              class="w-full"
              color="primary"
              @click="signUp"> Registrieren
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
