import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { categoryList } from "../atoms";
interface ICategoryForm {
  newCategory: string;
}
function CreateCategory() {
  const [categories, setCategories] = useRecoilState(categoryList);
  const { register, handleSubmit, setValue } = useForm<ICategoryForm>();
  const onValid = ({ newCategory }: ICategoryForm) => {
    setCategories((oldCategories) => {
      return [...oldCategories, newCategory];
    });
    setValue("newCategory", "");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input {...register("newCategory")}></input>
      <button>카테고리 추가</button>
    </form>
  );
}

export default CreateCategory;
