import styles from "./page.module.css";

export default function TodoList() {
    return (
      <div>
        <ul>
            <div className={styles.todo_item}>
                <li className={styles.todo_title}>プログラミング</li>
                <span className={styles.delete_btn}>削除</span>
            </div>
            <div className={styles.todo_item}>
                <li className={styles.todo_title}>プログラミング</li>
                <span className={styles.delete_btn}>削除</span>
            </div>
        </ul>
      </div>
    );
  }