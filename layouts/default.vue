<template>
  <v-theme-provider theme="dark">
    <v-app>
      <v-layout>
        <v-container>
          <slot/>
        </v-container>
      </v-layout>
    </v-app>
  </v-theme-provider>
</template>
