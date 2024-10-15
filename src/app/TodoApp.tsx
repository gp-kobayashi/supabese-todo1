'use client'

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import TodoList from "./TodoList";
import { addTodo, getAllTodos } from "@/utils/supabese_functions";

export default function TodoApp() {

  interface Todo {
    id: number;
    title: string;
    completed:boolean;
}
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");
    
    useEffect(() => {
      const getTodos = async () => {
      const todos = await getAllTodos();
        setTodos(todos || []);
        console.log(todos);
      }
      getTodos();
    }, []);

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (title === "") return

      await addTodo(title);
      let todos = await getAllTodos();
      setTodos(todos || []);

      setTitle("");
  };

    return (
      <div>
        <form className={styles.todo_form} onSubmit={(e) => handleSubmit(e)}>
          <input type="text" className={styles.todo_input}
          onChange={(e) => setTitle(e.target.value)}
          value={title}/>
          <button className={styles.add_btn}>記入</button>
        </form>
        <TodoList/>
      </div>
    );
  }