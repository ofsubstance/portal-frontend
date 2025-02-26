import { Typography } from '@mui/material';
import CommentManagementTable from '@/components/admin/comments/CommentManagementTable';
import PageHeader from '@/components/common/PageHeader';

export default function CommentManagementPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Comment Management"
        description="Review and manage user comments across the platform"
      />

      <div className="space-y-4">
        <Typography variant="h6">All Comments</Typography>
        <Typography variant="body2" color="text.secondary" className="mb-4">
          View all comments and moderate them. Pending comments require approval
          before they appear on videos.
        </Typography>

        <CommentManagementTable />
      </div>
    </div>
  );
}
