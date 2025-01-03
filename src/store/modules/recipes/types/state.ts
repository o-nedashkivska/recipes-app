import type { Recipe } from "@/types";
import type { DataStatus } from "@/enums";

type State = {
  recipes: Recipe[];
  error: string;
  dataStatus: (typeof DataStatus)[keyof typeof DataStatus];
  categories: string[];
  tags: string[];
};

export type { State };
