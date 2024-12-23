import type { Recipe, RecipeVersion } from "@/types";

const requiredFields = [
  "title",
  "category",
  "image",
  "instructions",
] as (keyof RecipeVersion)[];

const getRecipeVersion = (recipe: Recipe, index: number) => {
  if (index < 0) {
    index += recipe.versions.length;
  }

  if (index === 0) {
    return recipe.versions[0];
  }

  const currentVersion = { ...recipe.versions[index] } as RecipeVersion;

  requiredFields.forEach((field) => {
    if (!(field in currentVersion)) {
      let currentIndex = index - 1;

      do {
        const value = recipe.versions[currentIndex][field];

        if (value) {
          currentVersion[field] = value;
          break;
        }

        currentIndex--;
      } while (currentIndex >= 0);
    }
  });

  return currentVersion;
};

export { getRecipeVersion };
