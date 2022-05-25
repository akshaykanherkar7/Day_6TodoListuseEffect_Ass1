import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../Components/Todos.module.css";

const Todos = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [totoalCount, setTotoalCount] = useState(0);
  const [limit, setLimit] = useState(5);

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
    axios
      .get(`http://localhost:3004/todos?_page=${page}&_limit=${limit}`)
      .then((res) => {
        setTodos(res.data);
        setTotoalCount(Number(res.headers["x-total-count"]));
      });
  }, [page, limit]);

  return (
    <div>
      <h1>Todos</h1>
      <div>
        <div>
          <input
            className={styles.inp}
            type="text"
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button className={styles.btnadd} onClick={saveInfo}>
            +
          </button>
        </div>
        {todos.map((todo) => (
          <div className={styles.mapbox} key={todo.id}>
            {todo.text}
          </div>
        ))}
      </div>
      <div className={styles.btnParentBox}>
        <button
          className={styles.prevbtn}
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >{`<`}</button>
        <select onChange={(e) => setLimit(Number(e.target.value))}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        <button
          className={styles.prevbtn}
          disabled={totoalCount < page * 5}
          onClick={() => setPage(page + 1)}
        >{`>`}</button>
      </div>
    </div>
  );
};

export default Todos;
