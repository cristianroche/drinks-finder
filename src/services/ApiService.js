import api from "@/lib/axios";

export default {
  async getCategories() {
    return api.get("/list.php?c=list");
  },
  async searchRecipes({ category, ingredient }) {
    return await api.get(`/filter.php?c=${category}&i=${ingredient}`);
  },
  async getRecipeById(id) {
    return await api.get(`/lookup.php?i=${id}`);
  },
};
