import type { TaskItemProps } from "../types/Task";
import { useState } from "react";
import { CheckIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import styles from '../styles/TaskItem.module.css';

export function TaskItem({ task, onDelete, onUpdate }: TaskItemProps) {
  const [isChecked, setIsChecked] = useState(task.checked);

  function handleUpdate() {
    onUpdate({
      ...task,
      checked: !isChecked
    });
  }

  return (
    <li className={styles.task}>
      <div className={styles["task-group"]}>
        <input
          type="checkbox"
          id={task.id.toString()}
          name={task.name}
          className={styles.checkbox}
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <label
          htmlFor={task.id.toString()}
          className={styles.label}
        >
          {task.name}
          <span className={styles.checkmark}>
            <CheckIcon strokeWidth={2} width={24} height={24} />
          </span>
        </label>
      </div>
      <div className={styles["task-group"]}>
        <button
          type="button"
          className="btn"
          aria-label={`Update ${task.name} Task`}
          onClick={handleUpdate}
        >
          <PencilSquareIcon width={24} height={24} />
        </button>
        <button
          type="button"
          className={`btn ${styles["delete"]}`}
          aria-label={`Delete ${task.name} Task`}
          onClick={() => onDelete(task.id)}
        >
          <TrashIcon width={24} height={24} />
        </button>
      </div>
    </li>
  )
}