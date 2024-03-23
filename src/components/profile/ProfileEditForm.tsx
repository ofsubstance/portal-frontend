import {
  Avatar,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { RiCameraLine as CameraIcon } from "react-icons/ri";
import { DatePicker } from "@mui/x-date-pickers";

function ProfileEditForm() {
  return (
    <Paper className="flex-1">
      <Typography variant="body1" fontWeight={600} p={3}>
        Edit Your Account Information
      </Typography>

      <Divider />

      <div className="p-6 space-y-6">
        <div className="flex gap-6 items-center justify-between w-full md:flex-row flex-col-reverse">
          <div className="relative">
            <Avatar
              sx={{ width: 100, height: 100 }}
              src="https://uko-react.vercel.app/static/avatar/001-man.svg"
            />

            <label
              htmlFor="avatar"
              className="absolute bottom-0 right-0 bg-primary text-white rounded-full cursor-pointer p-1.5 bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 ease-in-out"
            >
              <input
                type="file"
                id="avatar"
                className="hidden"
                accept="image/*"
              />

              <CameraIcon color="white" size={20} />
            </label>
          </div>

          <div className="md:flex gap-6 hidden">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            className="md:col-span-2"
          />
        </div>

        <Button
          variant="outlined"
          color="ghost"
          size="large"
          fullWidth
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          Save
        </Button>
      </div>
    </Paper>
  );
}

export default ProfileEditForm;
