import { useState } from "react"
import TaskRow from "../../components/tasks/TaskRow"

const Tasks = ({ tasks: initialTasks }: { tasks: Task[] }) => {
  const [tasks, setTasks] = useState(initialTasks)

  const onTaskUpdate = (updatedTask: Task) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t))
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-blue-950 p-8">
      <div className="w-full max-w-6xl p-8 rounded-xl shadow-lg bg-gray-800/90 flex flex-col overflow-y-hidden">
        <h1 className="text-3xl font-bold text-center text-blue-300 mb-2">
          Tasks
        </h1>

        <p className="text-center text-gray-300 mb-6">
          Browse and manage all tasks below.
        </p>

        <div className="mt-4 overflow-y-auto flex-1">
          {tasks?.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-400 bg-gray-700">
              <thead className="bg-gray-700 text-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <div>Title</div>
                    <div className="font-light text-xs">Description</div>
                  </th>
                  <th scope="col" className="px-6 py-3 w-36">Status</th>
                  <th scope="col" className="px-6 py-3 w-36">Priority</th>
                  <th scope="col" className="px-6 py-3 w-32">Due Date</th>
                  <th scope="col" className="px-6 py-3 w-28">Actions</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((task) => (
                  <TaskRow key={task.id} task={task} onTaskUpdate={onTaskUpdate} />
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400">No tasks available</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Tasks
