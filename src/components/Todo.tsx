import { ITodo, todoState } from "../atoms";
import { useSetRecoilState } from "recoil";
function Todo({ text, id, category }: ITodo) {
  const setTodos = useSetRecoilState(todoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setTodos((oldTodos) => {
      const index = oldTodos.findIndex((todo) => todo.id === id);
      const newTodo = {
        ...oldTodos[index],
        category: name,
      };
      const copyTodos = [...oldTodos];
      copyTodos.splice(index, 1, newTodo as any);
      return copyTodos;
    });
  };
  return (
    <>
      <li>
        <span>{text}</span>
        {category !== "DOING" && (
          <button name="DOING" onClick={onClick}>
            Doing
          </button>
        )}
        {category !== "TO_DO" && (
          <button name="TO_DO" onClick={onClick}>
            To Do
          </button>
        )}
        {category !== "DONE" && (
          <button name="DONE" onClick={onClick}>
            Done
          </button>
        )}
      </li>
    </>
  );
}

export default Todo;
