import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo } from "../../store/todo/todo-slice";
import { todoSelector } from "../../store/todo/todo-selector";
import { fetchTodos } from "./actions";
import { AppDispatch } from "../../store/type";

import { Button, ListGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";

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
      <h2>Todos</h2>
      <div style={{ display: "flex", margin: "10px" }}>
        <Form.Control
          type="text"
          value={text}
          placeholder="Add todo"
          style={{ width: "50%", marginRight: "5px" }}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={handleAddTodo} variant="success">
          Add
        </Button>
      </div>

      <ListGroup as="ol" numbered>
        {todos.map((todo) => (
          <ListGroup.Item
            key={todo.id}
            onClick={() => dispatch(toggleTodo(todo.id))}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {todo.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Todo;
