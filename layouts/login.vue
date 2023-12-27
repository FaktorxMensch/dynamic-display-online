<template>
  <v-app>
    <v-layout>
      <v-container>
        <div class="max-w-xl py-5 mx-auto">
          <img src="/icon.jpeg" alt="Logo" class="w-32 mx-auto"/>
          <slot/>
        </div>
      </v-container>
    </v-layout>
  </v-app>
</template>
