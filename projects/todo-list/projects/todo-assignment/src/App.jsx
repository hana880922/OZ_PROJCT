import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    if (!text.trim()) return;
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
    setText("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editText } : todo
      )
    );
    setEditingId(null);
    setEditText("");
  };

  return (
    <div style={{ width: "400px", margin: "50px auto" }}>
      <h1> Todo App</h1>

      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        <input
          value={text}
          placeholder="할 일을 입력하세요"
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addTodo}>추가</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />

            {editingId === todo.id ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <span
                style={{
                  flex: 1,
                  textDecoration: todo.completed ? "line-through" : "none"
                }}
              >
                {todo.text}
              </span>
            )}

            {editingId === todo.id ? (
              <button onClick={saveEdit}>저장</button>
            ) : (
              <button onClick={() => startEdit(todo)}>수정</button>
            )}

            <button onClick={() => deleteTodo(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
