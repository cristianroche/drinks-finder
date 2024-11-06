import { computed, onMounted, ref, watch } from "vue";
import { defineStore } from "pinia";
import { useDrinksStore } from "./drinks";
import { useModalStore } from "./modal";
import { useNotificationStore } from "./notifications";

const useFavoritesStore = defineStore("favorites", () => {
  const drinksStore = useDrinksStore();
  const modalStore = useModalStore();
  const notificationStore = useNotificationStore();
  const favorites = ref([]);

  watch(favorites, syncLocalStorage, { deep: true });

  onMounted(() => {
    const localStorageFavorites = localStorage.getItem("favorites");

    if (localStorageFavorites) {
      favorites.value = JSON.parse(localStorageFavorites);
    }
  });

  function syncLocalStorage() {
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  }

  function removeFavorite() {
    favorites.value = favorites.value.filter(
      (favorite) => favorite.idDrink !== drinksStore.selectedRecipe.idDrink
    );

    notificationStore.$patch({
      show: true,
      error: true,
      text: "Removed from favorites",
    });
  }

  function addFavorite() {
    favorites.value.push(drinksStore.selectedRecipe);

    notificationStore.$patch({
      show: true,
      error: true,
      text: "Added to favorites",
    });
  }

  function handleClickFavorites() {
    if (existInFavorites(drinksStore.selectedRecipe.idDrink)) {
      removeFavorite();
    } else {
      addFavorite();
    }

    modalStore.show = false;
  }

  function existInFavorites(id) {
    const favoritesLocalStorage =
      JSON.parse(localStorage.getItem("favorites")) ?? [];

    return favoritesLocalStorage.some((favorite) => favorite.idDrink === id);
  }

  const noFavorites = computed(() => favorites.value.length === 0);

  return {
    favorites,
    handleClickFavorites,
    existInFavorites,
    noFavorites,
  };
});

export { useFavoritesStore };
