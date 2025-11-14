import { createFileRoute } from '@tanstack/react-router'
import Tasks from '../../pages/tasks/Tasks'

export const Route = createFileRoute('/tasks/')({
  loader: async () => {
    return fetch('http://localhost:3000/api/v1/tasks').then(res => res.json())
  },
  component: TasksPage,
})

function TasksPage() {
  const { tasks } = Route.useLoaderData()

  return <Tasks tasks={tasks} />
}