import { categoryList, ITodo, todoState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import React from "react";

const DeleteBtn = styled.button`
  background: none;
  border: none;
  :hover {
    color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
`;
function Todo({ text, id, category }: ITodo) {
  const setTodos = useSetRecoilState(todoState);
  const categories = useRecoilValue(categoryList);
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
    <>
      <li>
        <span>{text}</span>
        {categories.map(
          (cate) =>
            category !== cate && (
              <button key={cate} name={cate} onClick={moveCategory}>
                {cate}
              </button>
            )
        )}
        <DeleteBtn value={id} onClick={deleteList}>
          ❌
        </DeleteBtn>
      </li>
    </>
  );
}

export default Todo;
