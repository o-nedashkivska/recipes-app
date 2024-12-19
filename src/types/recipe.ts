type Recipe = {
  id: string;
  title: string;
  category: string;
  instructions: string;
  image: string;
  tags: string | null;
  updatedAt: number;
};

export type { Recipe };
