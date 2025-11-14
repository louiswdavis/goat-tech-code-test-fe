import { useState } from "react"
import TaskCard from "../../components/campaigns/tasks/TaskCard"
import TaskNew from "../../components/campaigns/tasks/TaskNew"

interface CampaignProps {
  tasks: Task[]
}

const Campaign = ({ id, name, description, status, tasks: initialTasks }: CampaignProps) => {
  const [showModal, setShowModal] = useState(false)
  const [tasks, setTasks] = useState(initialTasks)

  const onTaskCreate = (newTask: Task) => {
    setTasks([...tasks, newTask])
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-blue-950">
      <div className="w-full max-w-2xl p-8 rounded-xl shadow-lg bg-gray-800/90 flex flex-col">
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

        <div className="grid grid-cols-1 gap-4 mt-2">
          {tasks?.length > 0 ? (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <p className="text-gray-400">No tasks for this campaign</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Campaign
