import { useState, useRef, useCallback, useMemo } from "react";

export default function useTodos() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      content: "Hello",
      isDone: false
    }
  ]);
  const [filter, setFilter] = useState("all");
  const [value, setValue] = useState("");
  const id = useRef(2);

  const addTodo = useCallback(() => {
    if (!value) return;
    setTodos([
      ...todos,
      {
        id: id.current++,
        content: value,
        isDone: false
      }
    ]);
    setValue("");
  }, [value, todos]);

  const deleteTodo = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  const updateTodo = useCallback(
    (newTodo) => {
      setTodos(todos.map((todo) => (todo.id === newTodo.id ? newTodo : todo)));
    },
    [todos]
  );

  const updateFilter = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const clearTodos = useCallback(() => {
    setTodos([]);
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "all") return true;
      return filter === "undone" ? !todo.isDone : todo.isDone;
    });
  }, [todos, filter]);

  return {
    todos: filteredTodos,
    value,
    filter,

    addTodo,
    deleteTodo,
    updateTodo,
    clearTodos,
    updateFilter,
    handleChange
  };
}