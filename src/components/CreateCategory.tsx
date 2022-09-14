import { useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { categoryList } from "../atoms";
import styled from "styled-components";
interface ICategoryForm {
  newCategory: string;
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
function CreateCategory() {
  const setCategories = useSetRecoilState(categoryList);
  const { register, handleSubmit, setValue } = useForm<ICategoryForm>();
  const onValid = ({ newCategory }: ICategoryForm) => {
    setCategories((oldCategories) => {
      return [...oldCategories, newCategory];
    });
    setValue("newCategory", "");
  };
  return (
    <FormContainer onSubmit={handleSubmit(onValid)}>
      <Input
        {...register("newCategory")}
        placeholder="Write a category..."
      ></Input>
      <Button>Add</Button>
    </FormContainer>
  );
}

export default CreateCategory;
