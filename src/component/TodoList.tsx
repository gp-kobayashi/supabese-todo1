import { SetStateAction, useCallback } from "react";
import styles from "./styles/todo_list.module.css"
import { Todo } from "@/utils/interface";
import { deleteTodo, isCompletedTodo } from "@/utils/supabase_functions";

type Props = {
  todos:Todo[];
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
}

const TodoList = (props:Props) => {
  
  const { todos, setTodos } = props;

  const handleDelete = useCallback( async (id: number) => {
    const updateTodo = await deleteTodo(id);
    if(updateTodo){
      setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
    }
  },[setTodos]);

  const handleIsCompleted = useCallback(async (id: number, isCompleted:boolean) => {
    const updatedTodo = await isCompletedTodo(id,!isCompleted);
    const newTodos = todos.map(todo => {
      if (todo.id === updatedTodo.id) { 
          return { ...todo, isCompleted: updatedTodo.isCompleted };
      }
      return todo;
    });
    setTodos(newTodos);
  },[todos,setTodos]);

    return <div>
      <ul className={styles.todo_list}>
        {todos.map((todo) => (
          <li className={styles.todo_item} 
            key={todo.id} >
            <div className={todo.isCompleted ? styles.todo_title_complete : styles.todo_title}>
              {todo.title}
            </div>
            <div>
              <button className={styles.Completed_btn}
                onClick={() => handleIsCompleted(todo.id, todo.isCompleted)}>
                  済
              </button>
              <span className={styles.delete_btn} 
                 onClick={() => handleDelete(todo.id)}>
                  削除
              </span>                
            </div>
          </li>
        ))}
      </ul>
    </div>
  };

  export default TodoList;