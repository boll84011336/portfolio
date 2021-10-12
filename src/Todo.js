import React, { useCallback, memo, useState, useRef } from "react";
import styled from "styled-components";

const Button = styled.button`
  font-size: 16px;
  background: rgba(0, 0, 70, 0.3);
`;

const ButtonWrapper = styled.div`
  opacity: 0;
  transition: opacity 0.1s ease-in;
`;

const TodoItem = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover ${ButtonWrapper} {
    opacity: 1;
  }

  & + & {
    border-top: 1px solid #ccc;
  }
`;

const TodoContent = styled.div`
  ${(props) =>
    props.$isDone &&
    `
    text-decoration: line-through;
    opacity: 0.5;
  `}
`;

const EditInput = styled.input`
  font-size: 16px;
  padding: 4px;
`;

function Todo({ todo, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  // 對於編輯 input 我採用 uncontrolled component，避免更新狀態
  // 這樣比較方便一點
  const inputRef = useRef();

  const handleDeleteCLick = useCallback(() => {
    onDelete(todo.id);
  }, [onDelete, todo]);

  const handleToggleStatusClick = useCallback(() => {
    onUpdate({
      ...todo,
      isDone: !todo.isDone
    });
  }, [todo, onUpdate]);

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key !== "Enter") return;

      // 如果是空的代表取消 update
      if (!e.target.value) {
        return setIsEditing(false);
      }
      onUpdate({
        ...todo,
        content: e.target.value
      });
      setIsEditing(false);
    },
    [onUpdate, todo]
  );

  return (
    <TodoItem>
      {isEditing ? (
        <EditInput ref={inputRef} onKeyDown={handleKeyDown} />
      ) : (
        <TodoContent onDoubleClick={handleDoubleClick} $isDone={todo.isDone}>
          {todo.content}
        </TodoContent>
      )}
      <ButtonWrapper>
        <Button onClick={handleToggleStatusClick}>
          {todo.isDone ? "未完成" : "已完成"}
        </Button>
        <Button onClick={handleDeleteCLick}>刪除</Button>
      </ButtonWrapper>
    </TodoItem>
  );
}

export default memo(Todo);
