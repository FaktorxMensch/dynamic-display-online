<script setup>
const supabase = useSupabaseClient()
const route = useRoute()
const slideshow_id = route.params.slideshow

// fetcrh slideshow from parameter
const {data: slideshow, error} = await supabase
    .from('slideshows')
    .select()
    .eq('id', slideshow_id)
    .single()
</script>
<template>
  hiiiii
  {{slideshow}}
</template>
