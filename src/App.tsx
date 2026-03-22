import type { TaskProps, SharedListInfo } from './types/Task'
import { useState, useEffect, useCallback } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useSharedLists } from './hooks/useSharedLists'
import { CreateTaskForm } from './components/CreateTaskForm'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import { EditTaskForm } from './components/EditTaskForm'
import { ReloadPrompt } from './components/ReloadPrompt'
import { TaskList } from './components/TaskList'
import { SharedListView } from './components/SharedListView'
import { ShareButton } from './components/ShareButton'
import { SavedSharedLists } from './components/SavedSharedLists'
import { parseSharedHash, decodeTasks, encodeTasks } from './utils/shareUtils'

function App() {
  const [tasks, setTasks] = useLocalStorage<TaskProps[]>('todoist.tasks', [])
  const [editTask, setEditTask] = useState<TaskProps | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [prevFocusElement, setPrevFocusElement] = useState<HTMLElement | null>(
    null
  )
  const [sharedTasks, setSharedTasks] = useState<TaskProps[] | null>(null)
  const [sharedHash, setSharedHash] = useState<string | null>(null)

  const { savedLists, addSavedList, removeSavedList, isListSaved } =
    useSharedLists()

  useEffect(() => {
    const encoded = parseSharedHash()
    if (encoded) {
      const decoded = decodeTasks(encoded)
      if (decoded) {
        setSharedTasks(decoded)
        setSharedHash(encoded)
      }
    }
  }, [])

  const goHome = useCallback(() => {
    setSharedTasks(null)
    setSharedHash(null)
    window.location.hash = ''
  }, [])

  const handleOpenSavedList = useCallback((list: SharedListInfo) => {
    setSharedTasks(list.tasks)
    setSharedHash(encodeTasks(list.tasks))
    window.location.hash = `shared=${encodeTasks(list.tasks)}`
  }, [])

  function addTask(task: TaskProps) {
    setTasks([...tasks, task])
  }

  function checkTask(id: number) {
    setTasks(
      tasks.map(task => {
        if (task.id === id) {
          task.checked = !task.checked
        }
        return task
      })
    )
  }

  function editMode(task: TaskProps) {
    setEditTask(task)
    setIsEditMode(true)
    setPrevFocusElement(document.activeElement as HTMLElement)
  }

  function closeEditMode() {
    setIsEditMode(false)
    setEditTask(null)
    prevFocusElement?.focus()
  }

  function updateTask(task: TaskProps) {
    setTasks(
      tasks.map(t => {
        if (t.id === task.id) {
          t.name = task.name
        }
        return t
      })
    )
    closeEditMode()
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter(t => t.id !== id))
  }

  function handleShare() {
    // URL is not modified on sharer's side
  }

  if (sharedTasks) {
    return (
      <div className='container'>
        <SharedListView
          tasks={sharedTasks}
          isSaved={isListSaved(sharedTasks)}
          onGoHome={goHome}
          onSave={() => addSavedList(sharedTasks)}
        />
        <ThemeSwitcher>
          <SavedSharedLists
            savedLists={savedLists}
            onOpenList={handleOpenSavedList}
            onRemoveList={removeSavedList}
          />
        </ThemeSwitcher>
        <ReloadPrompt />
      </div>
    )
  }

  return (
    <div className='container'>
      <header>
        <h1>My Todo List</h1>
      </header>
      {isEditMode && (
        <EditTaskForm
          editTask={editTask}
          onUpdate={updateTask}
          onEscape={closeEditMode}
        />
      )}
      <CreateTaskForm addTask={addTask} />
      {tasks.length > 0 && (
        <TaskList
          tasks={tasks}
          onCheck={checkTask}
          onEdit={editMode}
          onDelete={deleteTask}
        />
      )}
      <ThemeSwitcher>
        <ShareButton tasks={tasks} onShare={handleShare} />
        <SavedSharedLists
          savedLists={savedLists}
          onOpenList={handleOpenSavedList}
          onRemoveList={removeSavedList}
        />
      </ThemeSwitcher>
      <ReloadPrompt />
    </div>
  )
}

export default App
