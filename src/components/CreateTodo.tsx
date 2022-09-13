import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { todoState } from "../atoms";
interface IForm {
  todo: string;
}
function CreateTodo() {
  const setTodos = useSetRecoilState(todoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ todo }: IForm) => {
    setTodos((oldTodos) => {
      return [{ text: todo, id: Date.now(), category: "TO_DO" }, ...oldTodos];
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
