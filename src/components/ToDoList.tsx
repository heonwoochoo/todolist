import { useRecoilState } from "recoil";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";
import { useRecoilValue } from "recoil";
import { categoryList, focusState, selectTodos } from "../atoms";
import styled from "styled-components";
import CreateCategory from "./CreateCategory";
import { BsPencilSquare } from "react-icons/bs";
import CategoryList from "./CategoryList";
const Title = styled.h1`
  text-align: center;
  padding: 30px;
  font-size: 36px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 50px;
`;
const ModifyIcon = styled.div`
  position: absolute;
  right: 10px;
  :hover {
    cursor: pointer;
  }
`;
const TodoList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 350px;
`;
const Layer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
`;

function ToDoList() {
  const todos = useRecoilValue(selectTodos);
  const [isFocus, setIsFocus] = useRecoilState(focusState);
  const categories = useRecoilValue(categoryList);
  return (
    <div>
      <Title>What are you doing today?</Title>
      <hr />
      <ModifyIcon
        onClick={() => {
          setIsFocus("MODIFY");
        }}
      >
        <BsPencilSquare fill="#FA9494" size="30px" />
      </ModifyIcon>
      <Container>
        <CreateCategory />
        {categories.length ? <CreateTodo /> : null}
        <CategoryList />
        <TodoList>
          {todos.map((todo) => (
            <Todo key={todo.id} {...todo} />
          ))}
        </TodoList>
      </Container>
      {isFocus === "MODIFY" && <Layer onClick={() => setIsFocus(null)}></Layer>}
    </div>
  );
}

export default ToDoList;
