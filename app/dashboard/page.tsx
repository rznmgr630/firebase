import NewNote from "./components/NewNote";
import NoteList from "./components/NoteList";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  return (
    <div className={styles.columns}>
      <div className={styles.leftPanel}>
        <NoteList />
      </div>
      <div className={styles.rightPanel}>
        <NewNote />
      </div>
    </div>
  );
}
