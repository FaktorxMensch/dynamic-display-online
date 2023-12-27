<script setup lang="ts">
const user = useSupabaseUser()
watch(user, () => {
  if (user.value) {
    return navigateTo('/')
  }
}, {immediate: true})

const signOut = async () => {
  const supabase = useSupabaseClient()
  await supabase.auth.signOut()
  navigateTo('/')
}

definePageMeta({layout: 'login'})
</script>
<template>
  <div>Waiting for login...</div>
  <v-btn @click="signOut">Sign Out</v-btn>
</template>
