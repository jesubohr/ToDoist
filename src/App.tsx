import type { TaskProps } from './types/Task'
import { useState } from 'react'
import { CreateTaskForm } from './components/CreateTaskForm'
import { TaskList } from './components/TaskList'

function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([])

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

  function updateTask(task: TaskProps) {
    setTasks(tasks.map(t => t.id === task.id ? task : t))
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <div className="container">
      <header>
        <h1>My Todo List</h1>
      </header>
      <CreateTaskForm addTask={addTask} />
      {
        tasks.length > 0 && (
          <TaskList
            tasks={tasks}
            onCheck={checkTask}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        )
      }
    </div>
  )
}

export default App
