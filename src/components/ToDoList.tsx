import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";
import { useRecoilValue } from "recoil";
import { categories, categoryState, selectTodos, todoState } from "../atoms";
function ToDoList() {
  const todos = useRecoilValue(selectTodos);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateTodo />
      <select value={category} onInput={onInput}>
        <option value={categories.DOING}>Doing</option>
        <option value={categories.TO_DO}>To Do</option>
        <option value={categories.DONE}>Done</option>
      </select>
      <ul>
        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
