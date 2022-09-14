import { categoryList, focusState, ITodo, todoState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import React from "react";
const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: whitesmoke;
  width: 100%;
  margin: 5px 0;
  padding: 10px 5px;
`;
const Text = styled.h3`
  width: 70%;
`;
const ButtonContainer = styled.span`
  display: flex;
  gap: 5px;
  width: 40%;
  flex-wrap: wrap;
  justify-content: end;
`;
const Button = styled.button`
  font-size: 5px;
  background-color: white;
  border: none;
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
function Todo({ text, id, category }: ITodo) {
  const setTodos = useSetRecoilState(todoState);
  const categories = useRecoilValue(categoryList);
  const isFocus = useRecoilValue(focusState);
  const moveCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
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
  const deleteList = (event: React.FormEvent<HTMLButtonElement>) => {
    const id = Number(event.currentTarget.value);
    setTodos((oldTodos) => {
      return [...oldTodos.filter((todo) => todo.id !== id)];
    });
  };
  return (
    <Container>
      <Text>{text}</Text>
      <ButtonContainer>
        {isFocus === "ALL" &&
          categories.map((cate) => (
            <Button
              key={cate}
              name={cate}
              onClick={moveCategory}
              style={{
                backgroundColor: category === cate ? "#FA9494" : "white",
                color: category === cate ? "white" : "black",
              }}
            >
              {cate}
            </Button>
          ))}
        {isFocus !== "ALL" &&
          categories.map(
            (cate) =>
              category !== cate && (
                <Button key={cate} name={cate} onClick={moveCategory}>
                  {cate}
                </Button>
              )
          )}
      </ButtonContainer>
      {isFocus === "MODIFY" ? (
        <DeleteBtn value={id} onClick={deleteList}>
          ❌
        </DeleteBtn>
      ) : null}
    </Container>
  );
}

export default Todo;
