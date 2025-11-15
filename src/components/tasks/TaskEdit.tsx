import { useEffect, useState } from "react"
import TextInput from "../generic/forms/TextInput"
import TextArea from "../generic/forms/TextArea"
import Select from "../generic/forms/Select"
import DateInput from "../generic/forms/DateInput"

interface TaskEditProps {
  isOpen: boolean
  task: Task
  onSuccess: (task: Task) => void
  onClose: () => void
}

const TaskEdit = ({ isOpen, task, onSuccess, onClose }: TaskEditProps) => {
  const [formData, setFormData] = useState<Partial<Task>>(task)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isOpen) {
      loadForm()
    }
  }, [isOpen])

  const loadForm = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/tasks/${task.id}/edit`)
      const data = await res.json()

      if (res.ok) {
        setUsers(data.users)
        setFormData(data.task)
      }
    } catch (err) {
      console.error('Failed to fetch users:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      const res = await fetch(`http://localhost:3000/api/v1/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: formData })
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors)
        } else {
          setErrors({ overall: data.error || 'Failed to create task' })
        }
        return
      }

      setFormData(data.task)
      onSuccess(data.task)
      onClose()
    } catch (err) {
      setErrors({ general: err instanceof Error ? err.message : 'An error occurred' })
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  const userOptions = users.map(u => ({ value: u.id.toString(), label: u.name }))

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold text-blue-300 mb-4">Edit {task.title || 'Task'}</h2>

        {errors.overall && <p className="text-red-400 mb-4">{errors.overall}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <TextInput
              label="Title"
              type="text"
              placeholder="Enter task title"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              error={errors.title}
              required
            />
          </div>

          <div className="col-span-2">
            <TextArea
              label="Description"
              placeholder="Enter task description"
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              error={errors.description}
            />
          </div>

          <div className="col-span-1">
            <Select
              label="Status"
              value={formData.status || 'todo'}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
              error={errors.status}
              options={[
                { value: 'todo', label: 'To Do' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'done', label: 'Done' }
              ]}
            />
          </div>

          <div className="col-span-1">
            <Select
              label="Priority"
              value={formData.priority || 'medium'}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
              error={errors.priority}
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' }
              ]}
            />
          </div>

          <div className="col-span-2">
            <DateInput
              label="Due Date"
              value={formData.due_date || ''}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              error={errors.due_date}
            />
          </div>

          <div className="col-span-2">
            <Select
              label="Created By"
              value={formData.created_by_id?.toString() || ''}
              onChange={(e) => setFormData({ ...formData, created_by_id: e.target.value ? Number(e.target.value) : undefined })}
              error={errors.created_by_id}
              options={[{ value: '', label: 'Select user' }, ...userOptions]}
            />
          </div>

          <div className="col-span-2">
            <Select
              label="Assigned To"
              value={formData.assigned_to_id?.toString() || ''}
              onChange={(e) => setFormData({ ...formData, assigned_to_id: e.target.value ? Number(e.target.value) : undefined })}
              error={errors.assigned_to_id}
              options={[{ value: '', label: 'Select user' }, ...userOptions]}
            />
          </div>

          <div className="col-span-2 flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white disabled:opacity-50 transition"
            >
              {loading ? 'Editing...' : 'Edit Task'}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded text-white transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskEdit