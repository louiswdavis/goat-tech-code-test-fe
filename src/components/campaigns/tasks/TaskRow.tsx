import { useState } from "react"
import TaskEdit from "../../tasks/TaskEdit"

interface TaskRowProps {
  task: Task
  onTaskUpdate?: (updatedTask: Task) => void
}

const TaskRow = ({ task: initialTask, onTaskUpdate }: TaskRowProps) => {
  const [showModal, setShowModal] = useState(false)
  const [task, setTask] = useState(initialTask)

  const onTaskEdit = (updatedTask: Task) => {
    setTask(updatedTask)
    onTaskUpdate?.(updatedTask)
  }

  const getStatus = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return { label: 'To Do', colour: 'bg-orange-600' }
      case 'in_progress':
        return { label: 'In Progress', colour: 'bg-blue-600' }
      case 'done':
        return { label: 'Done', colour: 'bg-green-600' }
    }
  }

  const getPriority = (priority: Task['priority']) => {
    switch (priority) {
      case 'low':
        return { label: 'Low', colour: 'bg-blue-600' }
      case 'medium':
        return { label: 'Medium', colour: 'bg-yellow-600' }
      case 'high':
        return { label: 'High', colour: 'bg-red-600' }
    }
  }

  const formatDate = (date: string) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  return (
    <>
      <tr className="border-b bg-gray-800/70 border-gray-700 hover:bg-gray-750">
        <td className="px-6 py-4">
          <div>
            <p className="font-semibold text-white">{task.title}</p>
            <p className="text-gray-400 text-xs mt-1">{task.description}</p>
          </div>
        </td>

        <td className="px-6 py-4">
          <div className="flex flex-row items-center gap-2">
            <div className={`${getStatus(task.status).colour} w-3 h-3 rounded-full`}></div>
            <span className="text-gray-300">{getStatus(task.status).label}</span>
          </div>
        </td>

        <td className="px-6 py-4">
          <div className="flex flex-row items-center gap-2">
            <div className={`${getPriority(task.priority).colour} w-3 h-3 rounded-full`}></div>
            <span className="text-gray-300">{getPriority(task.priority).label}</span>
          </div>
        </td>

        <td className="px-6 py-4">
          <span className="text-gray-300">{formatDate(task.due_date)}</span>
        </td>

        <td className="px-6 py-4">
          <div className="flex gap-3">
            <button onClick={() => setShowModal(true)}>Edit</button>
          </div>
        </td>
      </tr>

      {showModal && (
        <TaskEdit
          isOpen={showModal}
          task={task}
          onSuccess={onTaskEdit}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}

export default TaskRow
