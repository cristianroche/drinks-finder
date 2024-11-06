import { ref, watch } from "vue";
import { defineStore } from "pinia";

const useNotificationStore = defineStore("notifications", () => {
  const show = ref(false);
  const text = ref("");
  const error = ref(false);

  watch(show, (value) => {
    if (value) {
      setTimeout(() => {
        show.value = false;
      }, 3000);
    }
  });

  function $reset() {
    show.value = false;
    text.value = "";
    error.value = false;
  }

  return {
    show,
    text,
    error,
  };
});

export { useNotificationStore };
