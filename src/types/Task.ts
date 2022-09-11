export type TaskProps = {
  id: number
  name: string
  checked: boolean
}

export type TaskListProps = {
  tasks: TaskProps[]
  onUpdate: (task: TaskProps) => void
  onDelete: (id: number) => void
}

export type TaskItemProps = {
  task: TaskProps
  onUpdate: (task: TaskProps) => void
  onDelete: (id: number) => void
}
