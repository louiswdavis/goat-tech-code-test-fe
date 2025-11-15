import TaskCard from "../../components/tasks/TaskCard"

const Tasks = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-blue-950 p-8">
      <div className="w-full max-w-4xl p-8 rounded-xl shadow-lg bg-gray-800/90 flex flex-col overflow-y-hidden">
        <h1 className="text-3xl font-bold text-center text-blue-300 mb-2">
          Tasks
        </h1>

        <p className="text-center text-gray-300 mb-6">
          Browse and manage all tasks below.
        </p>

        <div className="grid grid-cols-1 gap-4 mt-2 overflow-y-scroll">
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

export default Tasks
