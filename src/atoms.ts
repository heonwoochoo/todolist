import { atom, selector } from "recoil";
export interface ITodo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}
export const todoState = atom<ITodo[]>({
  key: "todos",
  default: [],
});

export const selectTodos = selector({
  key: "selectTodos",
  get: ({ get }) => {
    const todos = get(todoState);
    return [
      todos.filter((todo) => todo.category === "DOING"),
      todos.filter((todo) => todo.category === "TO_DO"),
      todos.filter((todo) => todo.category === "DONE"),
    ];
  },
});
