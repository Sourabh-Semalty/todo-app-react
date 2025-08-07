import "./App.css";
import { IoMdAddCircleOutline } from "react-icons/io";
import {
  RiDeleteBin6Line,
  RiCheckboxCircleFill,
  RiCheckboxBlankCircleLine,
} from "react-icons/ri";
import RockerLogo from "./assets/rocket.png";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTask = (id) => {
    setTasks((prev) => {
      const newTasks = prev.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      return newTasks;
    });
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast.success("Task deleted successfully!");
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    if (task.trim().length === 0) {
      toast.error("Please add a task!");
      return;
    }

    if (task.length <= 3) {
      toast.error("Task must be at least 3 characters long");
      return;
    }

    const newTask = {
      id: Math.random(),
      description: task,
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setTask("");
    toast.success("Task added successfully!");
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <header>
        <img src={RockerLogo} className="logo" alt="Vite logo" />
        <div className="header_name">
          <span className="logo_initial_name">to</span>
          <span className="logo_initial_end">do</span>
        </div>
      </header>
      <main>
        <form onSubmit={(e) => handleAddTask(e)} className="input_container">
          <input
            className="input_box"
            placeholder="Add a new task"
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
          <button className="add_task_btn">
            <span className="add_task_btn_name" typeof="submit">
              Add Task
            </span>
            <span className="add_task_btn_icon">
              <IoMdAddCircleOutline />
            </span>
          </button>
        </form>

        <div className="todo_list_container">
          <div className="todo_list_info">
            <div className="tood_list_left_info">
              <span className="task_created_label">Task created </span>
              <span className="task_created_count">{tasks.length}</span>
            </div>
            <div className="tood_list_right_info">
              <span className="task_created_label">Completed </span>
              <span className="task_created_count">
                {tasks.filter((task) => task.completed).length} out of{" "}
                {tasks.length}
              </span>
            </div>
          </div>

          <div className="todo_list_items">
            {tasks.length > 0 ? (
              tasks.map((task) => {
                return (
                  <div className="todo_item">
                    <span
                      className="todo_item_icon"
                      onClick={() => handleTask(task.id)}
                    >
                      {task.completed ? (
                        <RiCheckboxCircleFill />
                      ) : (
                        <RiCheckboxBlankCircleLine />
                      )}
                    </span>
                    <span
                      className={
                        task.completed
                          ? "todo_item_desciption line-through"
                          : "todo_item_desciption"
                      }
                    >
                      {task.description}
                    </span>
                    <span
                      className="todo_item_delete_icon"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <RiDeleteBin6Line />
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="todo_list_empty">No Task available</div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
