import { Button, Divider, Paper, TextField, Typography } from "@mui/material";

function PasswordEditForm() {
  return (
    <Paper className="flex-1">
      <Typography variant="body1" fontWeight={600} p={3}>
        Update you password:
      </Typography>

      <Divider />

      <div className="p-6 space-y-6">
        <div className="flex gap-8 flex-col md:flex-row">
          <div className="flex flex-col gap-6 flex-1">
            <TextField label="Current Password" variant="outlined" fullWidth />
            <TextField label="New Password" variant="outlined" fullWidth />
            <TextField
              label="Confirm New Password"
              variant="outlined"
              fullWidth
            />
          </div>

          <div className="flex flex-col gap-4 flex-1">
            <Typography
              variant="body1"
              fontWeight={600}
              color={"text.secondary"}
            >
              Password Requirements:
            </Typography>

            <Typography variant="body2">
              Ensure that these requirements are met:
            </Typography>

            <ul className="list-disc list-inside opacity-75 text-sm">
              <li>Minimum 8 characters long - the more</li>
              <li>At least one lowercase character</li>
              <li>At least one uppercase character</li>
              <li>At least one number</li>
              <li>At least one symbol or whitespace character</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-6">
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              width: 150,
            }}
          >
            Confirm
          </Button>
          <Button
            variant="outlined"
            color="ghost"
            size="large"
            sx={{
              width: 150,
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Paper>
  );
}

export default PasswordEditForm;
