import styles from "./page.module.css";
import TodoApp from "./TodoApp";


export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Todo App</h1>
      <TodoApp/>
    </div>
  );
}
