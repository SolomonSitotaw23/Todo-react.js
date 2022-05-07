import React, { useState, useEffect } from "react";
import "./App.css";

//importing components
import Form from "./components/Forms";
import TodoList from "./components/TodoList";
function App() {
  //States
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filterdTodos, setFilterdTodos] = useState([]);
  //only run once
  useEffect(() => {
    getLocalTodos();
  }, []);

  //use Effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);
  //filter Hnadler
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilterdTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilterdTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilterdTodos(todos);
        break;
    }
  };
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      console.log("sfljakf");
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      console.log("Heloo");
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
      console.log(todoLocal);
    }
  };
  return (
    <div className="App">
      <h1>
        Todo List
        <span>Get things done, one item at a time.</span>
      </h1>
      <Form
        todos={todos}
        inputText={inputText}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filterdTodos}
      />
    </div>
  );
}

export default App;
