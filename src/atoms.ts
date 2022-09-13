import { atom, selector } from "recoil";

export enum categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface ITodo {
  text: string;
  id: number;
  category: categories.TO_DO | categories.DOING | categories.DONE;
}
export const todoState = atom<ITodo[]>({
  key: "todos",
  default: [],
});

export const categoryState = atom<ITodo["category"]>({
  key: "category",
  default: categories.TO_DO,
});

export const selectTodos = selector({
  key: "selectTodos",
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);
    return todos.filter((todo) => todo.category === category);
  },
});
