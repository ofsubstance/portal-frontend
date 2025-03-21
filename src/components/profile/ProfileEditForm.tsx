import { UserDto, UserUpdateDto } from '@/dtos/user.dto';
import {
  Avatar,
  Button,
  Divider,
  Fab,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import { userUpdateValidation } from '@/validators/user.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { DatePicker } from '@mui/x-date-pickers';
import { useForm } from 'react-hook-form';
import { RiCameraLine as CameraIcon } from 'react-icons/ri';

interface ProfileEditFormProps {
  defaultValues?: UserDto;
}

function ProfileEditForm({ defaultValues }: ProfileEditFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserUpdateDto>({
    resolver: zodResolver(userUpdateValidation),
    defaultValues: {
      name: defaultValues?.firstname,
      email: defaultValues?.email,
      phone: defaultValues?.phone,
      birthDate: defaultValues?.birthDate,
      gender: defaultValues?.gender,
      language: defaultValues?.language,
      location: defaultValues?.location,
    },
  });

  const onSubmit = (data: UserUpdateDto) => {
    console.log(data);
  };

  return (
    <Paper className="flex-1">
      <Typography variant="body1" fontWeight={600} p={3}>
        Edit Your Account Information
      </Typography>

      <Divider />

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        <div className="flex gap-6 items-center justify-between w-full md:flex-row flex-col-reverse">
          <div className="relative">
            <Avatar
              sx={{ width: 100, height: 100 }}
              src="https://uko-react.vercel.app/static/avatar/001-man.svg"
            />

            <Fab
              component="label"
              color="primary"
              size="small"
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
            >
              <CameraIcon color="white" size={22} />
              <input type="file" hidden accept="image/*" />
            </Fab>
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
          <TextField
            {...register('name')}
            label="Name"
            variant="outlined"
            fullWidth
            className="md:col-span-2"
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
          <TextField
            {...register('email')}
            label="Email"
            variant="outlined"
            fullWidth
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
          <TextField
            {...register('phone')}
            label="Phone"
            variant="outlined"
            fullWidth
            error={!!errors.phone}
            helperText={errors?.phone?.message}
          />
          <DatePicker
            {...register('birthDate')}
            label="Date of Birth"
            onChange={(date: Date | null) => setValue('birthDate', date as any)}
          />
          <TextField
            {...register('gender')}
            label="Gender"
            variant="outlined"
            fullWidth
            error={!!errors.gender}
            helperText={errors?.gender?.message}
          />
          <TextField
            {...register('language')}
            label="Language"
            variant="outlined"
            fullWidth
            error={!!errors.language}
            helperText={errors?.language?.message}
          />
          <TextField
            {...register('location')}
            label="Address"
            variant="outlined"
            fullWidth
            error={!!errors.location}
            helperText={errors?.location?.message}
          />

          <TextField
            {...register('bio')}
            label="About you / Bio"
            variant="outlined"
            fullWidth
            multiline
            rows={6}
            className="md:col-span-2"
            error={!!errors.bio}
            helperText={errors?.bio?.message}
          />
        </div>

        <Button
          variant="outlined"
          color="ghost"
          size="large"
          fullWidth
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          Save
        </Button>
      </form>
    </Paper>
  );
}

export default ProfileEditForm;
