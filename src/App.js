import React from "react";
import styled from "styled-components";
import useTodos from "./useTodos";
import Todo from "./Todo";

const Title = styled.h1`
  color: #333;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 4px;
`;

const Button = styled.button`
  font-size: 16px;
  background: ${(props) =>
    props.$isActive ? "rgba(70, 0, 0, 0.3)" : "rgba(0, 0, 70, 0.3)"};
`;

const TodoList = styled.div`
  border: 1px solid #ccc;
  border-radius: 16px;
  margin-top: 16px;
`;

const FilterList = styled.div`
  display: flex;
  margin-top: 24px;
`;

export default function App() {
  const {
    todos,
    value,
    filter,

    addTodo,
    deleteTodo,
    updateTodo,
    clearTodos,
    handleChange,
    updateFilter
  } = useTodos();

  return (
    <div>
      <Title>Todo List(雙擊 todo 可編輯)</Title>
      <InputWrapper>
        <Input placeholder="todo" value={value} onChange={handleChange} />
        <Button onClick={addTodo}>新增</Button>
      </InputWrapper>
      <FilterList>
        <Button
          onClick={() => updateFilter("all")}
          $isActive={filter === "all"}
        >
          全部
        </Button>
        <Button
          onClick={() => updateFilter("undone")}
          $isActive={filter === "undone"}
        >
          未完成
        </Button>
        <Button
          onClick={() => updateFilter("done")}
          $isActive={filter === "done"}
        >
          已完成
        </Button>
        <Button onClick={clearTodos}>清空</Button>
      </FilterList>
      <TodoList>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        ))}
      </TodoList>
    </div>
  );
}