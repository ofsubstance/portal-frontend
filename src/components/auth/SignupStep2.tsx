import { Grid, TextField } from "@mui/material";

import { SignupReq } from "@/dtos/auth.dto";
import { useFormContext } from "react-hook-form";

export default function SignupStep2() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignupReq>();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          {...register("firstname")}
          fullWidth
          label="First Name*"
          variant="outlined"
          error={!!errors.firstname}
          helperText={errors.firstname?.message}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          {...register("lastname")}
          fullWidth
          label="Last Name*"
          variant="outlined"
          error={!!errors.lastname}
          helperText={errors.lastname?.message}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...register("profile.businessName")}
          fullWidth
          label="Business Name*"
          variant="outlined"
          error={!!errors.profile?.businessName}
          helperText={errors.profile?.businessName?.message}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...register("profile.website")}
          fullWidth
          label="Website*"
          variant="outlined"
          error={!!errors.profile?.website}
          helperText={errors.profile?.website?.message}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          {...register("profile.stateRegion")}
          fullWidth
          label="State/Region*"
          variant="outlined"
          error={!!errors.profile?.stateRegion}
          helperText={errors.profile?.stateRegion?.message}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          {...register("profile.country")}
          fullWidth
          label="Country*"
          variant="outlined"
          error={!!errors.profile?.country}
          helperText={errors.profile?.country?.message}
        />
      </Grid>
    </Grid>
  );
}
