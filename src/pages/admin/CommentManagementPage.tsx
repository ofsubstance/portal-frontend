import { Typography, Paper } from '@mui/material';
import CommentManagementTable from '@/components/admin/comments/CommentManagementTable';
import commentManagementImg from '@/assets/playlistManagement.svg';

export default function CommentManagementPage() {
  return (
    <div className="flex flex-col gap-5">
      <Paper className="md:flex-row flex-col-reverse flex items-center justify-between gap-5 px-4 py-6">
        <div className="space-y-4">
          <Typography variant="h5" fontWeight={600}>
            Comment Management
          </Typography>
          <Typography variant="subtitle1">
            Review and manage user comments across the platform
          </Typography>
        </div>
        <object
          role="img"
          type="image/svg+xml"
          data={commentManagementImg}
          className="max-h-48"
        />
      </Paper>

      <div className="space-y-4">
        <CommentManagementTable />
      </div>
    </div>
  );
}
