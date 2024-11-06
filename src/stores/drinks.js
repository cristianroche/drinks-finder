import { defineStore } from "pinia";
import { computed, onMounted, reactive, ref } from "vue";
import ApiService from "@/services/ApiService";
import { useModalStore } from "./modal";

const useDrinksStore = defineStore("drinks", () => {
  const modalStore = useModalStore();
  const categories = ref([]);
  const search = reactive({
    category: "",
    ingredient: "",
  });
  const recipes = ref([]);
  const selectedRecipe = ref({});

  onMounted(async () => {
    const response = await ApiService.getCategories();

    categories.value = response.data.drinks;
  });

  async function searchRecipes() {
    const response = await ApiService.searchRecipes(search);

    recipes.value = response.data.drinks;
  }

  async function selectRecipe(id) {
    const response = await ApiService.getRecipeById(id);

    selectedRecipe.value = response.data.drinks[0];
    modalStore.handleClickModal();
  }

  const noDrinks = computed(() => recipes.value.length === 0);

  return {
    categories,
    search,
    recipes,
    selectedRecipe,
    searchRecipes,
    selectRecipe,
    noDrinks,
  };
});

export { useDrinksStore };
