import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { categoryState, todoState } from "../atoms";
interface IForm {
  todo: string;
}
function CreateTodo() {
  const setTodos = useSetRecoilState(todoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ todo }: IForm) => {
    setTodos((oldTodos) => {
      return [{ text: todo, id: Date.now(), category }, ...oldTodos];
    });
    setValue("todo", "");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("todo", { required: "Please write a todo" })}
        placeholder="Write a todo..."
      />
      <button>Add</button>
    </form>
  );
}

export default CreateTodo;
