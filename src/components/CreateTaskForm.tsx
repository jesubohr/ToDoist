import type { TaskProps } from '../types/Task'
import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'

export function CreateTaskForm ({ addTask }: { addTask: (task: TaskProps) => void }) {
  const [task, setTask] = useState("")

  function submitHandler(event: React.FormEvent) {
    event.preventDefault()
    addTask({
      id: Date.now(),
      name: task,
      checked: false
    })
    setTask("")
  }

  return (
    <form className="todo" onSubmit={submitHandler}>
      <div className="wrapper">
        <input
          type="text"
          name="task"
          id="task"
          className="input"
          value={task}
          onInput={(ev: React.FormEvent) => setTask((ev.target as HTMLInputElement).value)}
          required
          autoFocus
          maxLength={100}
          placeholder="Enter a Task"
        />
        <label htmlFor="task" className="label">Enter a Task</label>
      </div>
      <button
        type="submit"
        className="btn"
        aria-label="Add Task"
      >
        <PlusIcon />
      </button>
    </form>
  )
}
