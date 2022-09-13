import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";
import { useRecoilValue } from "recoil";
import { selectTodos, todoState } from "../atoms";
function ToDoList() {
  const [doing, todo, done] = useRecoilValue(selectTodos);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateTodo />
      <h1>doing</h1>
      <ul>
        {doing.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
      <hr />
      <h1>todo</h1>
      <ul>
        {todo.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
      <hr />
      <h1>done</h1>
      <ul>
        {done.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
      <hr />
    </div>
  );
}

export default ToDoList;
