import type { TaskListProps } from '../types/Task'
import { TaskItem } from './TaskItem'
import styles from '../styles/TaskList.module.css'

export function TaskList({ tasks, onCheck, onEdit, onDelete }: TaskListProps) {
  return (
    <ul className={styles.tasks}>
      {tasks
        .sort((first, second) => second.id - first.id)
        .sort((first, second) => Number(first.checked) - Number(second.checked))
        .map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onCheck={onCheck}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
    </ul>
  )
}
