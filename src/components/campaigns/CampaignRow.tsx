import { Link } from '@tanstack/react-router'
import { ViewIcon } from 'hugeicons-react'

const CampaignRow = ({ id, name, description, status }: Campaign) => {
  const getStatus = (status: Campaign['status']) => {
    switch (status) {
      case 'active':
        return { label: 'Active', colour: 'bg-blue-600' }
      case 'completed':
        return { label: 'Completed', colour: 'bg-green-600' }
      case 'archived':
        return { label: 'Archived', colour: 'bg-gray-600' }
    }
  }

  return (
    <tr className="border-b bg-gray-800/70 border-gray-700 hover:bg-gray-750">
      <td className="px-4 py-3">
        <p className="font-semibold text-white">{name}</p>
      </td>

      <td className="px-4 py-3">
        <p className="text-gray-400 text-xs mt-1">{description}</p>
      </td>

      <td className="px-4 py-3">
        <div className="flex flex-row items-center gap-2">
          <div className={`${getStatus(status).colour} w-3 h-3 rounded-full`}></div>
          <span className="text-gray-300">{getStatus(status).label}</span>
        </div>
      </td>

      <td className="px-4 py-3">
        <div className="flex justify-center gap-3">
          <Link to={`/campaigns/${id}`} className="button button--square button--link">
            <ViewIcon size={16} strokeWidth={2.5} className="mt-px" />
          </Link>
        </div>
      </td>
    </tr>
  )
}

export default CampaignRow
