import { categories, ITodo, todoState } from "../atoms";
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
        {category !== categories.DOING && (
          <button name={categories.DOING} onClick={onClick}>
            Doing
          </button>
        )}
        {category !== categories.TO_DO && (
          <button name={categories.TO_DO} onClick={onClick}>
            To Do
          </button>
        )}
        {category !== categories.DONE && (
          <button name={categories.DONE} onClick={onClick}>
            Done
          </button>
        )}
      </li>
    </>
  );
}

export default Todo;
