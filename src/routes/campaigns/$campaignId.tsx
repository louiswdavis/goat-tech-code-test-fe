import { createFileRoute } from '@tanstack/react-router'
import Campaign from '../../pages/campaigns/Campaign'

export const Route = createFileRoute('/campaigns/$campaignId')({
  loader: async ({ params: { campaignId } }) => {
    const campaignRes = await fetch(`http://localhost:3000/api/v1/campaigns/${campaignId}`)
    const campaignData = await campaignRes.json()

    const tasksRes = await fetch(`http://localhost:3000/api/v1/campaigns/${campaignId}/tasks`)
    const tasksData = await tasksRes.json()

    return {
      campaign: campaignData.campaign,
      tasks: tasksData.tasks
    }
  },
  component: CampaignComponent,
})

function CampaignComponent() {
  const { campaign, tasks } = Route.useLoaderData()

  if (!campaign) {
    return <div>Campaign not found.</div>;
  }
  return <Campaign id={campaign.id} name={campaign.name} description={campaign.description} status={campaign.status} tasks={tasks} />
}