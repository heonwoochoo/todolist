import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, focusState, todoState } from "../atoms";
interface IForm {
  todo: string;
}

const FormContainer = styled.form`
  border: 2px #fa9494 solid;
  height: 40px;
  width: 250px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Input = styled.input`
  height: 100%;
  padding: 0;
  padding-left: 10px;
  border: none;
  border-radius: 20px;
  outline: none;
`;
const Button = styled.button`
  background-color: #fa9494;
  border-radius: 19px;
  border: none;
  color: white;
  width: 38px;
  height: 38px;
`;
const ErrorMessage = styled.h3`
  position: absolute;
  top: 130px;
`;
function CreateTodo() {
  const setTodos = useSetRecoilState(todoState);
  const category = useRecoilValue(categoryState);
  const isFocus = useRecoilValue(focusState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const onValid = ({ todo }: IForm) => {
    setTodos((oldTodos) => {
      return [{ text: todo, id: Date.now(), category }, ...oldTodos];
    });
    setValue("todo", "");
  };
  return (
    <>
      <FormContainer onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("todo", {
            required: "Write a todo",
            validate: () => isFocus !== "ALL" || "Please set category !",
          })}
          placeholder="Write a todo..."
        />
        <Button>Add</Button>
      </FormContainer>
      <ErrorMessage>
        {errors.todo ? <h1>{errors.todo.message}</h1> : null}
      </ErrorMessage>
    </>
  );
}

export default CreateTodo;
