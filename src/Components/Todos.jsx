import React, { useEffect, useState } from "react";

const Todos = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const saveInfo = () => {
    fetch("http://localhost:3004/todos", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
        isComplited: false,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setTodos([...todos, res]);
        setNewTodo("");
        console.log(todos);
      });
  };

  useEffect(() => {
    fetch("http://localhost:3004/todos")
      .then((res) => res.json())
      .then((res) => {
        setTodos(res);
        console.log(res);
      });
  }, []);
  return (
    <div>
      Todos
      <div>
        <div>
          <input type="text" onChange={(e) => setNewTodo(e.target.value)} />
          <button onClick={saveInfo}>+</button>
        </div>
        {
            todos.map((todo)=>(
                <div key={todo.id}>{todo.text}</div>
            ))
        }
      </div>
    </div>
  );
};

export default Todos;
