import type { TaskListProps } from "../types/Task";
import { TaskItem } from "./TaskItem";
import styles from '../styles/TaskList.module.css';

export function TaskList({ tasks, onCheck, onUpdate, onDelete }: TaskListProps) {
  return (
    <ul className={styles.tasks}>
      {
        tasks
          .sort((first, second) => second.id - first.id)
          .map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onCheck={onCheck}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))
      }
    </ul>
  )
}
