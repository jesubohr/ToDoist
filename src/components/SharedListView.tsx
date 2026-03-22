import type { TaskProps } from '../types/Task'
import { HomeIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import styles from '../styles/SharedListView.module.css'

type SharedListViewProps = {
  tasks: TaskProps[]
  isSaved: boolean
  onGoHome: () => void
  onSave: () => void
}

export function SharedListView({
  tasks,
  isSaved,
  onGoHome,
  onSave
}: SharedListViewProps) {
  const completedCount = tasks.filter(t => t.checked).length
  const totalCount = tasks.length

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Shared Todo List</h1>
        <div className={styles.stats}>
          {completedCount} of {totalCount} completed
        </div>
      </header>

      <div className={styles.actions}>
        <button
          type='button'
          className={`btn ${styles['home-btn']}`}
          onClick={onGoHome}
        >
          <HomeIcon width={20} height={20} />
          <span>Home</span>
        </button>

        <button
          type='button'
          className={`btn ${
            isSaved ? styles['saved-btn'] : styles['save-btn']
          }`}
          onClick={onSave}
          disabled={isSaved}
        >
          <BookmarkIcon width={20} height={20} />
          <span>{isSaved ? 'Saved' : 'Save List'}</span>
        </button>
      </div>

      <p className={styles['task-list']}>
        {tasks.map((task, index) => (
          <span key={task.id}>
            <span
              className={task.checked ? styles['task-done'] : styles['task']}
            >
              {task.name}
            </span>
            {index < tasks.length - 1 && ', '}
          </span>
        ))}
      </p>
    </div>
  )
}
