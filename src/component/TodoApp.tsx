'use client'

import { useEffect, useState } from "react";
import styles from "./todo_app.module.css"
import TodoList from "./TodoList";
import { addTodo, getAllTodos } from "@/utils/supabese_functions";
import { Todo } from "@/utils/interface";

const TodoApp = () => {

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
    const newId:number = await addTodo(title);
    setTodos((prevTodos) =>{
      const newTodos = [...prevTodos,{id:newId ,title:title,isCompleted:false}]
      console.log(newTodos);
      return newTodos;
    });
    setTitle("");
  };

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