import { Typography, Paper } from '@mui/material';
import paymentsSubscriptionsImg from '@/assets/paymentsSubscriptions.svg';

function PaymentsSubscriptionsPage() {
  return (
    <div className="flex flex-col gap-5">
      <Paper className="md:flex-row flex-col-reverse flex items-center justify-between gap-5 px-4 py-6">
        <div className="space-y-4">
          <Typography variant="h5" fontWeight={600}>
            Payments & Subscriptions
          </Typography>
          <Typography variant="subtitle1">
            Manage payment transactions and user subscriptions
          </Typography>
        </div>
        <object
          role="img"
          type="image/svg+xml"
          data={paymentsSubscriptionsImg}
          className="max-h-48"
        />
      </Paper>

      {/* Content will go here */}
      <Paper className="p-4">
        <Typography variant="body1">
          Payment and subscription management content will be displayed here.
        </Typography>
      </Paper>
    </div>
  );
}

export default PaymentsSubscriptionsPage;
