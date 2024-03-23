import {
  Avatar,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";

function ProfileEditForm() {
  return (
    <Paper className="flex-1">
      <Typography variant="body1" fontWeight={600} p={3}>
        Edit your account information:
      </Typography>

      <Divider />

      <div className="p-6 space-y-6">
        <div className="flex gap-2 items-center justify-between w-full">
          <Avatar sx={{ width: 100, height: 100 }} />

          <div className="flex gap-6">
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
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                width: 150,
              }}
            >
              Save
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <TextField label="First Name" variant="outlined" fullWidth />
          <TextField label="Last Name" variant="outlined" fullWidth />
          <TextField label="Email" variant="outlined" fullWidth />
          <TextField label="Phone" variant="outlined" fullWidth />
          <DatePicker label="Date of Birth" />
          <TextField label="Gender" variant="outlined" fullWidth />
          <TextField label="Language" variant="outlined" fullWidth />
          <TextField label="Address" variant="outlined" fullWidth />

          <TextField
            label="About you / Bio"
            variant="outlined"
            fullWidth
            multiline
            rows={6}
            className="col-span-2"
          />
        </div>
      </div>
    </Paper>
  );
}

export default ProfileEditForm;
