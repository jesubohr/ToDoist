import type { EditTaskProps } from '../types/Task'
import { useState, useEffect } from 'react'
import { CheckIcon } from '@heroicons/react/24/outline'

export function EditTaskForm({ editTask, onUpdate, onEscape }: EditTaskProps) {
  const [updatedTaskName, setUpdatedTaskName] = useState(editTask?.name || "")

  function submitHandler(event: React.FormEvent) {
    event.preventDefault()
    onUpdate({
      id: editTask?.id || 0,
      checked: editTask?.checked || false,
      name: updatedTaskName
    })
  }

  useEffect(() => {
    function closeModalOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onEscape()
    }

    window.addEventListener("keydown", closeModalOnEscape)
    return () => window.removeEventListener("keydown", closeModalOnEscape)
  }, [onEscape])

  return (
    <div
      role="dialog"
      aria-labelledby="editTask"
      onClick={(ev) => {ev.target === ev.currentTarget && onEscape()}}
    >
      <form className="todo" onSubmit={submitHandler}>
        <div className="wrapper">
          <input
            type="text"
            id="editTask"
            className="input"
            value={updatedTaskName}
            onInput={(ev: React.FormEvent) => setUpdatedTaskName((ev.target as HTMLInputElement).value)}
            required
            autoFocus
            maxLength={60}
            placeholder="Update Task"
          />
          <label htmlFor="editTask" className="label">Update Task</label>
        </div>
        <button
          type="submit"
          className="btn"
          aria-label={`Confirm edit task to read ${updatedTaskName}`}
        >
          <CheckIcon strokeWidth={2} width={24} height={24} />
        </button>
      </form>
    </div>
  )
}
