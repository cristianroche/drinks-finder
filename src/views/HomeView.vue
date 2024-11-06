<script setup>
import { useDrinksStore } from "@/stores/drinks";
import Recipe from "@/components/Recipe.vue";

const drinks = useDrinksStore();
</script>

<template>
  <h1 class="text-6xl font-extrabold">Recipes</h1>

  <p v-if="drinks.noDrinks" class="text-2xl my-10 text-center">
    There are no results yet, use the form to search for recipes.
  </p>

  <div
    v-else
    class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-10 my-10 gap-10"
  >
    <Recipe
      v-for="recipe in drinks.recipes"
      :key="recipe.idDrink"
      :recipe="recipe"
    />
  </div>
</template>
