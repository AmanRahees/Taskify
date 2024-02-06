/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import AuthContext from "../contexts/AuthContext";
import axiosInstance from "../services/axios";

function Home() {
  const navigate = useNavigate();
  let { logoutUser, user, authTokens } = useContext(AuthContext);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const addTodo = (newTodo) => {
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };
  const handleTodoChange = (e) => {
    const { value } = e.target;
    setTodo(value);
  };
  const handleTodoSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(
        "todos/create/",
        {
          user: user.user_id,
          body: todo,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      )
      .then((response) => {
        addTodo(response.data);
        setTodo("");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleStatus = (id) => {
    axiosInstance
      .put(`todos/status/${id}/`, null, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((response) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, status: true } : todo
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const deleteTodo = (id) => {
    axiosInstance
      .delete(`todos/status/${id}/`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((response) => {
        console.log(response);
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      });
  };
  useEffect(() => {
    axiosInstance
      .get("todos/", {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setTodos(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          logoutUser();
          toast.error("Token Expired!");
          navigate("/");
        } else {
          toast.error("Server Out. Try Again!");
        }
      });
  }, []);
  return (
    <div>
      <Header onLogout={logoutUser} user={user} />
      <div className="px-10 py-24 bg-slate-800 text-white h-screen overflow-hidden">
        <form
          onSubmit={handleTodoSubmit}
          className="flex lg:w-1/2 mx-auto mb-10"
        >
          <input
            className="w-full outline-none p-2 bg-transparent border border-teal-700 focus:border-teal-500 hover:border-teal-500"
            type="text"
            placeholder="Enter Task"
            name="todo"
            value={todo}
            onChange={handleTodoChange}
          />
          <button
            type="submit"
            className="px-6 py-1 bg-teal-500 border border-teal-500 text-sm"
          >
            Add
          </button>
        </form>
        <div className="relative shadow-sm sm:rounded-lg lg:w-1/2 mx-auto">
          <div className="table-container max-h-[500px] overflow-y-auto custom-scrollbar">
            <table className="w-full text-sm text-left">
              <tbody>
                {todos.map((todo) => (
                  <tr key={todo.id} className="bg-white dark:bg-transparent">
                    <th
                      scope="row"
                      className="px-6 py-6 font-medium text-gray-900 whitespace-normal dark:text-white"
                    >
                      <i className="fa-solid fa-thumbtack transform rotate-45 text-teal-600"></i>{" "}
                      &nbsp;{todo.body}
                    </th>
                    <td className="px-6 py-4 text-right">
                      {!todo.status ? (
                        <button
                          onClick={() => handleStatus(todo.id)}
                          className="text-green-500 hover:text-white hover:bg-green-500 border border-green-500 rounded-full px-1 mr-5"
                        >
                          <i className="fa-solid fa-check"></i>
                        </button>
                      ) : null}
                      {!todo.status ? (
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="text-red-500 hover:text-white hover:bg-red-500 border border-red-500 rounded-full px-1"
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      ) : (
                        <p className="text-green-600 font-mono text-sm cursor-pointer">
                          completed <i className="fa-solid fa-thumbs-up"></i>
                        </p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
