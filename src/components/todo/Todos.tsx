import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo } from "../../store/todo/todo-slice";
import { todoSelector } from "../../store/todo/todo-selector";
import { fetchTodos } from "./actions";
import { AppDispatch } from "../../store/type";

const Todo: React.FC = () => {
  const todos = useSelector(todoSelector);
  const dispatch: AppDispatch = useDispatch();
  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (text.trim() !== "") {
      dispatch(addTodo(text));
      setText("");
    }
  };

  return (
    <div>
      <h1>Todos</h1>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => dispatch(toggleTodo(todo.id))}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
