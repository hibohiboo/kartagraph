import React from 'react'

interface Task {
  task: {
    id?: string
    title?: string
    state?: string
    updatedAt?: Date
  }
  onArchiveTask: () => void
  onPinTask: () => void
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
