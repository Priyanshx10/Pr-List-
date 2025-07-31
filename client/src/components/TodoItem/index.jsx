import React, { useState } from "react";
import "./styles.css";

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(todo.text);

  const handleUpdate = () => {
    onUpdate(todo._id, { ...todo, text: updatedText });
    setIsEditing(false);
  };

  const toggleComplete = () => {
    onUpdate(todo._id, { ...todo, completed: !todo.completed });
  };

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {isEditing ? (
        <>
          <input
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
            autoFocus
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={toggleComplete}
          />
          <span>{todo.text}</span>
          <div className="actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(todo._id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
