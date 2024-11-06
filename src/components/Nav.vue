<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="flex justify-between items-center">
    <div>
      <RouterLink :to="{ name: 'home' }">
        <img src="/img/logo.svg" alt="logo" class="w-32" />
      </RouterLink>
    </div>
    <nav class="flex gap-4 text-white">
      <RouterLink
        :to="{ name: 'home' }"
        class="uppercase font-bold hover:text-orange-400"
        active-class="text-orange-500"
        >Home</RouterLink
      >
      <RouterLink
        :to="{ name: 'favorites' }"
        class="uppercase font-bold hover:text-orange-400"
        active-class="text-orange-500"
        >Favorites</RouterLink
      >
    </nav>
  </div>
</template>
