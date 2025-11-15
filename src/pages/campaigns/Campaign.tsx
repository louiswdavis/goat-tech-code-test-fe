import { useState } from "react"
import { ArrowUpDownIcon, ArrowUp02Icon, ArrowDown02Icon } from "hugeicons-react"
import TaskRow from "../../components/campaigns/tasks/TaskRow"
import TaskNew from "../../components/campaigns/tasks/TaskNew"

type SortField = 'status' | 'priority' | 'due_date' | null
type SortOrder = 'asc' | 'desc'

interface CampaignProps {
  tasks: Task[]
}

const Campaign = ({ id, name, description, status, tasks: initialTasks }: CampaignProps) => {
  const [showModal, setShowModal] = useState(false)
  const [tasks, setTasks] = useState(initialTasks)
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const onTaskCreate = (newTask: Task) => {
    setTasks([...tasks, newTask])
  }

  const onTaskUpdate = (updatedTask: Task) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t))
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const getSortedTasks = () => {
    if (!sortField) return tasks

    return [...tasks].sort((a, b) => {
      let aVal: any
      let bVal: any

      if (sortField === 'status') {
        const statusOrder = { 'todo': 0, 'in_progress': 1, 'done': 2 }
        aVal = statusOrder[a.status]
        bVal = statusOrder[b.status]
      } else if (sortField === 'priority') {
        const priorityOrder = { 'low': 0, 'medium': 1, 'high': 2 }
        aVal = priorityOrder[a.priority]
        bVal = priorityOrder[b.priority]
      } else if (sortField === 'due_date') {
        aVal = a.due_date ? new Date(a.due_date).getTime() : Infinity
        bVal = b.due_date ? new Date(b.due_date).getTime() : Infinity
      }

      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
    })
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDownIcon size={16} className="ml-2 mt-px" />
    }
    return sortOrder === 'asc'
      ? <ArrowUp02Icon size={16} className="ml-2 mt-px" />
      : <ArrowDown02Icon size={16} className="ml-2 mt-px" />
  }

  const sortedTasks = getSortedTasks()

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-blue-950 p-8">
      <div className="w-full max-w-6xl p-8 rounded-xl shadow-lg bg-gray-800/90 flex flex-col overflow-y-hidden">
        <h1 className="text-3xl font-bold text-center text-blue-300 mb-2">
          {name} Management
        </h1>

        <div className="mt-2">
          <p className="text-gray-300 mb-2">{description}</p>
          <p className="text-gray-400">Status: {status}</p>
        </div>

        <div className="flex items-center justify-between gap-4 mt-4">
          <h2 className="font-bold text-blue-200">Campaign Tasks</h2>
          <button onClick={() => setShowModal(true)}>Add Task</button>
        </div>

        <TaskNew
          isOpen={showModal}
          campaignId={id}
          onSuccess={onTaskCreate}
          onClose={() => setShowModal(false)}
        />

        <div className="mt-4 overflow-y-auto flex-1">
          {tasks?.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-400 bg-gray-700">
              <thead className="bg-gray-700 text-gray-300">
                <tr>
                  <th scope="col" className="px-4 py-3 w-1/4">
                    <div>Title</div>
                    <div className="font-light text-xs">Description</div>
                  </th>
                  <th scope="col" className="px-4 py-3 w-40">
                    <div>Assigned To</div>
                    <div className="font-light text-xs">Created By</div>
                  </th>
                  <th scope="col" className="px-4 py-3 w-36 cursor-pointer hover:text-blue-300" onClick={() => handleSort('status')}>
                    <span className="flex flex-row items-center">Status {getSortIcon('status')}</span>
                  </th>
                  <th scope="col" className="px-4 py-3 w-36 cursor-pointer hover:text-blue-300" onClick={() => handleSort('priority')}>
                    <span className="flex flex-row items-center">Priority {getSortIcon('priority')}</span>
                  </th>
                  <th scope="col" className="px-4 py-3 w-36 cursor-pointer hover:text-blue-300" onClick={() => handleSort('due_date')}>
                    <span className="flex flex-row items-center">Due Date {getSortIcon('due_date')}</span>
                  </th>
                  <th scope="col" className="px-4 py-3 w-28 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {sortedTasks.map((task) => (
                  <TaskRow key={task.id} task={task} onTaskUpdate={onTaskUpdate} />
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400">No tasks found. Try creating a new one.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Campaign
