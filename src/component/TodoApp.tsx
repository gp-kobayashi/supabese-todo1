'use client'

import { useCallback, useEffect, useState } from "react";
import styles from "./styles/todo_app.module.css"
import TodoList from "./TodoList";
import { addTodo, getAllTodos } from "@/utils/supabase_functions";
import { Todo } from "@/utils/interface";

const TodoApp = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const getTodos = async () => {
    const todos = await getAllTodos();
      setTodos(todos || []);
    }
    getTodos();
  }, []);

  const handleSubmit = useCallback(async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === "") return
    const updateTodo :Todo = await addTodo(title);
    setTodos((prevTodos) => [...prevTodos, { ...updateTodo, title, isCompleted: false }]);
    setTitle("");
  },[title, addTodo]);

  return (
    <div>
      <form className={styles.todo_form} onSubmit={(e) => handleSubmit(e)}>
        <input type="text"
          placeholder="やること…"
          className={styles.input}
          onChange={(e) => setTitle(e.target.value)}
          value={title}/>
        <button className={styles.add_btn}>
            記入
        </button>
      </form>
      <TodoList todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default TodoApp