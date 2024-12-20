type RecipeVersion = {
  title?: string;
  category?: string;
  instructions?: string;
  image?: string;
  tags?: string | null;
  createdAt: number;
};

type Recipe = {
  id: string;
  versions: RecipeVersion[];
};

export type { Recipe };
