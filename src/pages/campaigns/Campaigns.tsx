import CampaignRow from "../../components/campaigns/CampaignRow"

const Campaigns = ({ campaigns }: { campaigns: Campaign[] }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-blue-950 p-8">
      <div className="w-full max-w-6xl p-8 rounded-xl shadow-lg bg-gray-800/90 flex flex-col overflow-y-hidden">
        <h1 className="text-3xl font-bold text-center text-blue-300 mb-2">
          Campaigns
        </h1>

        <p className="text-center text-gray-300 mb-6">
          Browse and manage all campaigns below.
        </p>

        <div className="mt-4 overflow-y-auto flex-1">
          {campaigns?.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-400 bg-gray-700">
              <thead className="bg-gray-700 text-gray-300">
                <tr>
                  <th scope="col" className="px-4 py-3 w-1/4">Name</th>
                  <th scope="col" className="px-4 py-3 w-1/2">Description</th>
                  <th scope="col" className="px-4 py-3 w-28">Status</th>
                  <th scope="col" className="px-4 py-3 w-28 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {campaigns.map((campaign) => (
                  <CampaignRow
                    key={campaign.id}
                    id={campaign.id}
                    name={campaign.name}
                    description={campaign.description}
                    status={campaign.status}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400">No campaigns found</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Campaigns
