<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Nav from "./Nav.vue";
import { useDrinksStore } from "@/stores/drinks";
import { useNotificationStore } from "@/stores/notifications";

const drinksStore = useDrinksStore();
const notificationStore = useNotificationStore();
const route = useRoute();
const isHome = computed(() => route.name === "home");

const handleSubmit = () => {
  if (Object.values(drinksStore.search).includes("")) {
    notificationStore.$patch({
      show: true,
      text: "All fields are required",
      error: true,
    });

    return;
  }
  drinksStore.searchRecipes();
};
</script>

<template>
  <header
    class="bg-slate-800"
    :class="{
      header: isHome,
    }"
  >
    <div class="mx-auto container px-5 py-16">
      <Nav />
      <form
        class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
        v-if="isHome"
        @submit.prevent="handleSubmit"
      >
        <div class="space-y-4">
          <label
            for="ingredient"
            class="block text-white uppercase font-extrabold text-lg"
            >Name or ingredients</label
          >
          <input
            id="ingredient"
            type="text"
            class="p-3 w-full rounded-lg focus:outline-none"
            placeholder="Name or Ingredients: e.g. vodka, gin, rum"
            v-model="drinksStore.search.ingredient"
          />
        </div>

        <div class="space-y-4">
          <label
            for="category"
            class="block text-white uppercase font-extrabold text-lg"
            >category</label
          >
          <select
            id="category"
            class="p-3 w-full rounded-lg focus:outline-none"
            v-model="drinksStore.search.category"
          >
            <option value="">-- Select a category --</option>
            <option
              v-for="category in drinksStore.categories"
              :key="category.strCategory"
              :value="category.strCategory"
            >
              {{ category.strCategory }}
            </option>
          </select>
        </div>

        <input
          type="submit"
          value="Search Recipes"
          class="bg-orange-800 hover:bg-orange-900 text-white font-extrabold p-2 w-full rounded-lg uppercase cursor-pointer"
        />
      </form>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-image: url("/img/bg.jpg");
  background-size: cover;
  background-position: center;
}
</style>
