import { Link } from '@tanstack/react-router'

const TaskCard = ({ id, title, description, status }: Partial<Task>) => {
  return (
    <Link
      to={`/tasks/${id}`}
      className="border p-4 rounded-sm border-gray-500 hover:shadow-lg hover:bg-gray-700 transition-all duration-200"
    >
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Status: {status}</p>
    </Link>
  )
}

export default TaskCard
