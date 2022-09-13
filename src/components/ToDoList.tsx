import { useRecoilState } from "recoil";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";
import { useRecoilValue } from "recoil";
import { categoryList, categoryState, selectTodos } from "../atoms";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import React from "react";
import CreateCategory from "./CreateCategory";

const Title = styled.h1`
  text-align: center;
  padding: 30px;
  font-size: 48px;
`;
const CategoryBox = styled.div`
  display: flex;
  gap: 10px;
`;
const Category = styled.span`
  padding: 10px;
  border: 1px red solid;
  border-radius: 10px;
  margin: 5px;
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
    transition: 0.1s linear;
  }
  :active {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

function ToDoList() {
  const todos = useRecoilValue(selectTodos);
  const [categories, setCategories] = useRecoilState(categoryList);
  const [category, setCategory] = useRecoilState(categoryState);
  const onClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    setCategory(event.currentTarget.innerText);
  };
  return (
    <div>
      <Title>To Dos</Title>
      <hr />
      <CreateCategory />
      <CreateTodo />
      <CategoryBox>
        {categories.map((cate) => (
          <Category onClick={onClick} key={cate}>
            {cate}
          </Category>
        ))}
      </CategoryBox>
      <ul>
        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
