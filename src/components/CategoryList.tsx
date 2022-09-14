import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryList, categoryState, focusState } from "../atoms";

const Container = styled.div`
  display: flex;
  gap: 10px;
`;
const Category = styled.span`
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  margin: 5px;
  display: flex;
  align-items: center;
  background-color: #fa9494;
  color: white;
  :hover {
    background-color: #fa9494 rgba(0, 0, 0, 0.1);
    transition: 0.3s linear;
    cursor: pointer;
  }
  :active {
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
`;
const Check = styled.span`
  display: flex;
  align-items: center;
  margin-right: 5px;
`;
const DeleteBtn = styled.button`
  background: none;
  border: none;
  :hover {
    color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
  position: relative;
  z-index: 1;
`;
function CategoryList() {
  const [categories, setCategories] = useRecoilState(categoryList);
  const setCategory = useSetRecoilState(categoryState);
  const [isFocus, setIsFocus] = useRecoilState(focusState);
  const onClick = (event: any) => {
    if (event === "ALL") {
      setCategory("ALL");
      setIsFocus("ALL");
    } else {
      setCategory(event);
      setIsFocus(event);
    }
  };
  const deleteList = (target: string) => {
    setCategories((oldCategories) => {
      return [...oldCategories.filter((category) => category !== target)];
    });
  };
  return (
    <Container>
      <Category onClick={() => onClick("ALL")}>
        {isFocus === "ALL" ? <Check>👉</Check> : null} All
      </Category>
      {categories.map((cate) => (
        <Category onClick={() => onClick(cate)} key={cate}>
          {isFocus === cate ? <Check>👉</Check> : null}
          {cate}
          <DeleteBtn
            hidden={isFocus === "MODIFY" ? false : true}
            onClick={() => deleteList(cate)}
          >
            ❌
          </DeleteBtn>
        </Category>
      ))}
    </Container>
  );
}

export default CategoryList;
