import React from 'react'

export interface Task {
  task: {
    id?: string
    title?: string
    state?: string
    updatedAt?: Date
  }
  onArchiveTask: (id?: string) => void
  onPinTask: (id?: string) => void
}
const Task: React.FC<Task> = ({
  task: { id, title, state },
  onArchiveTask,
  onPinTask,
}) => {
  return (
    <div>
      <input type="text" value={title} readOnly={true} />
    </div>
  )
}

export default Task
