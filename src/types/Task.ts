export type TaskProps = {
  id: number
  name: string
  checked: boolean
}

export type TaskListProps = {
  tasks: TaskProps[]
  onCheck: (id: number) => void
  onEdit: (task: TaskProps) => void
  onDelete: (id: number) => void
}

export type TaskItemProps = {
  task: TaskProps
  onCheck: (id: number) => void
  onEdit: (task: TaskProps) => void
  onDelete: (id: number) => void
}

export type EditTaskProps = {
  editTask: TaskProps | null,
  onUpdate: (task: TaskProps) => void
}
