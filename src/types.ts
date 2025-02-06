export type RecipeTypes = {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  mealType: string[];
  tags: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  caloriesPerServing: number;
  ingredients: string[];
  instructions: string[];
  rating: number;
  reviewCount: number;
  userId: number;
};
