import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export interface ITodo {
  text: string;
  id: number;
  category: string;
}

export const todoState = atom<ITodo[]>({
  key: "todos",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const categoryState = atom<ITodo["category"]>({
  key: "category",
  default: "",
});

export const categoryList = atom<string[]>({
  key: "categories",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const selectTodos = selector({
  key: "selectTodos",
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);
    return todos.filter((todo) => todo.category === category);
  },
});
