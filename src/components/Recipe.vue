<script setup>
import { useDrinksStore } from "@/stores/drinks";

const drinks = useDrinksStore();

defineProps({
  recipe: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="border shadow-lg">
    <div class="overflow-hidden">
      <img
        :src="recipe.strDrinkThumb"
        :alt="'image of ' + recipe.strDrink"
        class="hover:scale-125 hover:rotate-2 transition-transform"
      />
    </div>
    <div class="p-5">
      <h2 class="text-2xl truncate font-extrabold">{{ recipe.strDrink }}</h2>
      <button
        class="bg-orange-400 hover:bg-orange-500 text-white text-lg font-bold p-3 mt-5 w-full rounded-lg uppercase cursor-pointer"
        @click="drinks.selectRecipe(recipe.idDrink)"
      >
        View Recipe
      </button>
    </div>
  </div>
</template>
