import TaskCard from "../../components/campaigns/tasks/TaskCard"

interface CampaignProps extends Campaign {
  tasks: Task[]
}

const Campaign = ({ name, description, status, tasks }: CampaignProps) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-blue-950">
      <div className="w-full max-w-2xl p-8 rounded-xl shadow-lg bg-gray-800/90 flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-center text-blue-300 mb-2">
          Campaign and Task Management
        </h1>

        <div className="mt-8">
          <h2 className="text-2xl text-center text-blue-200 mb-4">{name}</h2>
          <p className="text-gray-300 mb-2">{description}</p>
          <p className="text-gray-400">Status: {status}</p>
        </div>

        <div className="flex items-center justify-between gap-4 mt-12">
          <h2 className="font-bold text-blue-200">Campaign Tasks</h2>
          <button>Add Task</button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {tasks?.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                status={task.status}
              />
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
