import type { TaskProps } from './types/Task'
import { useState } from 'react'
import { CreateTaskForm } from './components/CreateTaskForm'
import { EditTaskForm } from './components/EditTaskForm'
import { TaskList } from './components/TaskList'

function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([])
  const [editTask, setEditTask] = useState<TaskProps | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [prevFocusElement, setPrevFocusElement] = useState<HTMLElement | null>(null)

  function addTask(task: TaskProps) {
    setTasks([...tasks, task])
  }

  function checkTask(id: number) {
    setTasks(tasks.map(task => {
      if(task.id === id) {
        task.checked = !task.checked
      }
      return task
    }))
  }

  function editMode(task: TaskProps) {
    setEditTask(task)
    setIsEditMode(true)
    setPrevFocusElement(document.activeElement as HTMLElement)
  }

  function closeEditMode () {
    setIsEditMode(false)
    setEditTask(null)
    prevFocusElement?.focus()
  }

  function updateTask(task: TaskProps) {
    setTasks(tasks.map(t => {
      if(t.id === task.id) {
        t.name = task.name
      }
      return t
    }))
    closeEditMode()
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <div className="container">
      <header>
        <h1>My Todo List</h1>
      </header>
      {
        isEditMode && (
          <EditTaskForm
            editTask={editTask}
            onUpdate={updateTask}
            onEscape={closeEditMode}
          />
        )
      }
      <CreateTaskForm addTask={addTask} />
      {
        tasks.length > 0 && (
          <TaskList
            tasks={tasks}
            onCheck={checkTask}
            onEdit={editMode}
            onDelete={deleteTask}
          />
        )
      }
    </div>
  )
}

export default App
