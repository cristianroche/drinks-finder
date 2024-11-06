import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useFavoritesStore } from "./favorites";
import { useDrinksStore } from "./drinks";

const useModalStore = defineStore("modal", () => {
  const favoritesStore = useFavoritesStore();
  const drinksStore = useDrinksStore();
  const show = ref(false);

  function handleClickModal() {
    show.value = !show.value;
  }

  const buttonText = computed(() => {
    return favoritesStore.existInFavorites(drinksStore.selectedRecipe.idDrink)
      ? "Remove from favorites"
      : "Add to favorites";
  });

  return {
    show,
    handleClickModal,
    buttonText,
  };
});

export { useModalStore };
