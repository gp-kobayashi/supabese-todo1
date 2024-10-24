import { SetStateAction } from "react";
import styles from "./todo.module.css";
import { Todo } from "@/utils/interface";
import { deleteTodo, getAllTodos, isCompletedTodo } from "@/utils/supabese_functions";

type Props = {
  todos:Todo[];
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
}

const TodoList = (props:Props) => {

  const { todos, setTodos } = props;

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
  };

const handleIsCompleted = async (id: number, isCompleted:boolean) => {
  const newIsCompleted = !isCompleted;
  const updatedTodo = await isCompletedTodo(id,newIsCompleted);
  const newTodos = todos.map(todo => {
    if (todo.id === updatedTodo.id) { 
        return { ...todo, isCompleted: updatedTodo.isCompleted };
    }
    return todo;
});
setTodos(newTodos);
}

    return <div>
        <ul className={styles.todo_list}>
          {todos.map((todo) => (
            <div className={styles.todo_item} 
            key={todo.id} >
              <li className={todo.isCompleted ? styles.todo_title_active : styles.todo_title}>
                {todo.title}
                </li>
              <div className={styles.todo_btn}>
                <button className={styles.Completed_btn}
                 onClick={() => handleIsCompleted(todo.id, todo.isCompleted)}>
                  済
                  </button>
                <span className={styles.delete_btn} 
                 onClick={() => handleDelete(todo.id)}>
                  削除
                  </span>                
              </div>
            </div>
          ))}
        </ul>
      </div>
  };

  export default TodoList;