type RecipeVersion = {
  title?: string;
  category?: string;
  instructions?: string;
  image?: string;
  parent: string | null;
  tags?: string | null;
  createdAt: number;
};

type Recipe = {
  id: string;
  versions: RecipeVersion[];
};

export type { Recipe, RecipeVersion };
