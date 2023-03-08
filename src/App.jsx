import sunIcon from "./assets/icon-sun.svg";
import moonIcon from "./assets/icon-moon.svg";
import crossIcon from "./assets/icon-cross.svg";
import checkIcon from "./assets/icon-check.svg";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Add Task
  function AddTask() {
    if (!newTask) {
      return alert("You must fill out the input field!");
    }

    setTodos([...todos, newTask]);
    setNewTask("");
  }

  // Remove Task
  function DeleteTask(index) {
    const newTodos = [...todos];

    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  // Active Check Button
  function ActiveCheckButton(e) {
    e.target.classList.toggle("active");
    e.target.innerHTML =
      e.target.innerHTML == "" ? `<img src=${checkIcon} />` : "";
  }

  // Change Theme
  function ChangeTheme(e) {
    document.body.classList.toggle("dark-body");
    e.target.src = e.target.src.includes("sun") ? moonIcon : sunIcon;
  }

  // Show Only Completed Tasks
  function CompletedTasks() {
    const tasks = document.querySelectorAll(".task");

    tasks.forEach((item) => {
      item.classList.remove("hidden-task");
      if (!item.innerHTML.includes("active")) {
        item.classList.add("hidden-task");
      }
    });
  }

  // Show Only Active Tasks
  function ActiveTasks() {
    const tasks = document.querySelectorAll(".task");

    tasks.forEach((item) => {
      item.classList.remove("hidden-task");
      if (item.innerHTML.includes("active")) {
        item.classList.add("hidden-task");
      }
    });
  }

  // Show All Tasks
  function AllTasks() {
    const tasks = document.querySelectorAll(".task");

    tasks.forEach((item) => {
      item.classList.remove("hidden-task");
    });
  }

  // Clear Completed Tasks
  function ClearCompleted() {
    const tasks = document.querySelectorAll(".task");
    const checkBtns = document.querySelectorAll(".check-btn");
    const newTodos = [];

    tasks.forEach((item, index) => {
      if (!item.innerHTML.includes("active")) {
        newTodos.push(todos[index]);
      }
    });

    checkBtns.forEach((item) => {
      item.innerHTML = "";
      item.classList.remove("active");
    });

    setTodos(newTodos);
  }

  return (
    <>
      <div className="banner"></div>
      <div className="container">
        <header className="header">
          <h1 className="title">TODO</h1>
          <img
            src={moonIcon}
            alt="theme icon"
            className="theme-icon"
            onClick={ChangeTheme}
          />
        </header>
        <div className="add-section">
          <button className="add-btn" onClick={AddTask}>
            +
          </button>
          <input
            type="text"
            className="main-input"
            placeholder="Create a new todo..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </div>
        <div className="tasks-section">
          <div className="tasks">
            {todos.map((todo, index) => (
              <div className="task" key={index}>
                <div className="check-btn" onClick={ActiveCheckButton}></div>
                <input
                  className="task-text"
                  type="text"
                  value={todo}
                  readOnly="readonly"
                />
                <img
                  src={crossIcon}
                  className="cross-btn"
                  onClick={() => DeleteTask(index)}
                />
              </div>
            ))}
          </div>

          <div className="about-tasks">
            <h3 className="left-items">{todos.length} items left</h3>
            <div className="search-section">
              <h3 className="all-btn" onClick={AllTasks}>
                All
              </h3>
              <h3 className="active-btn" onClick={ActiveTasks}>
                Active
              </h3>
              <h3 className="completed-btn" onClick={CompletedTasks}>
                Completed
              </h3>
            </div>
            <h3 className="clear-btn" onClick={ClearCompleted}>
              Clear Completed
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
