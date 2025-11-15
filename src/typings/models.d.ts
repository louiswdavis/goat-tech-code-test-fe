interface Campaign {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  due_date: string;
  campaign_id: number;
  campaign_name: string;
  created_by_name: string;
  assigned_to_name: string;
}
