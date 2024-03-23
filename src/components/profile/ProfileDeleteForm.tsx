import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import PasswordField from "@/components/common/input/PasswordField";

function ProfileDeleteForm() {
  return (
    <Paper className="flex-1">
      <Stack spacing={1} p={3}>
        <Typography variant="body1" fontWeight={600}>
          Delete Your Account
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Once you delete your account, there is no going back. Please be
          certain. But if you are certain, then type in your password and click
          the button below.
        </Typography>
      </Stack>
      <Divider />

      <div className="p-6 flex flex-col gap-4">
        <PasswordField
          label="Password"
          variant="outlined"
          fullWidth
          color="warning"
        />

        <FormControlLabel
          control={<Checkbox color="warning" />}
          label="Confirm that I want to delete my account."
        />

        <Button
          variant="contained"
          color="error"
          size="large"
          sx={{
            width: 200,
          }}
        >
          Delete Account
        </Button>
      </div>
    </Paper>
  );
}

export default ProfileDeleteForm;
