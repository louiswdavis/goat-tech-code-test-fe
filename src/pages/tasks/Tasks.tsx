import TaskCard from "../../components/tasks/TaskCard"

const Tasks = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-blue-950">
      <div className="w-full max-w-2xl p-8 rounded-xl shadow-lg bg-gray-800/90 flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-center text-blue-300 mb-2">
          Tasks
        </h1>
        <p className="text-center text-gray-300 mb-6">
          Browse and manage all tasks below.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
