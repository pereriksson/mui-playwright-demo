import {Dessert} from "@/app/types";

function createDessert(id: number, name: string, calories: number, fat: number, carbs: number, protein: number, priority: string) {
  return { id, name, calories, fat, carbs, protein, priority };
}

export const initialDesserts: Dessert[] = [
  createDessert(1, 'Frozen yoghurt', 159, 6.0, 24, 4.0, "high"),
  createDessert(2, 'Ice cream sandwich', 237, 9.0, 37, 4.3, "medium"),
  createDessert(3, 'Eclair', 262, 16.0, 24, 6.0, "medium"),
  createDessert(4, 'Cupcake', 305, 3.7, 67, 4.3, "medium"),
  createDessert(5, 'Gingerbread', 356, 16.0, 49, 3.9, "low")
];
