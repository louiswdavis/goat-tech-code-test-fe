interface TaskCardProps {
  task: Task
}

const TaskCard = ({ task }: TaskCardProps) => {
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
    if (!date) return 'No due date'
    return new Date(date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="border border-gray-600 p-4 rounded-lg bg-gray-700">
      <div className="flex items-start justify-between flex-1 text-white">
        <h3 className="text-left text-lg font-semibold">{task.title}</h3>
      </div>

      <p className="text-left text-gray-300 text-sm mb-3 line-clamp-2">{task.description}</p>

      <div className="flex gap-2 flex-wrap">
        <div className="flex items-center gap-2 px-2 py-1 border border-gray-600 rounded">
          {task.due_date && (<span className="text-gray-300 text-xs">{formatDate(task.due_date)}</span>)}
        </div>

        <div className="flex items-center gap-2 px-2 py-1 border border-gray-600 rounded">
          <div className={`${getStatus(task.status).colour} w-2 h-2 rounded-full`}></div>
          <span className="text-gray-300 text-xs">{getStatus(task.status).label}</span>
        </div>

        <div className="flex items-center gap-2 px-2 py-1 border border-gray-600 rounded">
          <div className={`${getPriority(task.priority).colour} w-2 h-2 rounded-full`}></div>
          <span className="text-gray-300 text-xs">{getPriority(task.priority).label}</span>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
