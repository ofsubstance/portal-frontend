import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { Interests, Utilization } from "@/constants/enums";

import React from "react";
import { SignupReq } from "@/dtos/auth.dto";
import { useFormContext } from "react-hook-form";

export default function SignupStep3() {
  const {
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<SignupReq>();

  // Convert enums to arrays of strings
  const utilizationOptions = Object.values(Utilization);
  const interestsOptions = Object.values(Interests);

  const handleUtilizationPurposeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue("profile.utilizationPurpose", e.target.value);
  };

  const handleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInterests = getValues("profile.interests") || [];

    const updatedInterests = e.target.checked
      ? [...currentInterests, e.target.value]
      : currentInterests.filter((interest) => interest !== e.target.value);

    setValue("profile.interests", updatedInterests);
  };

  return (
    <div className="flex flex-col gap-6">
      <FormControl error={!!errors.profile?.utilizationPurpose} required>
        <FormLabel
          sx={{
            fontSize: "1.15rem",
            fontWeight: 500,
            color: "text.primary",
          }}
        >
          How will you utilize content on Of Substance?
        </FormLabel>
        <FormGroup>
          {utilizationOptions.map((option) => (
            <FormControlLabel
              key={option}
              label={option}
              control={
                <Checkbox
                  checked={watch("profile.utilizationPurpose") === option}
                  onChange={handleUtilizationPurposeChange}
                  value={option}
                />
              }
            />
          ))}
        </FormGroup>
      </FormControl>

      <FormControl error={!!errors.profile?.interests} required>
        <FormLabel
          sx={{
            fontSize: "1.15rem",
            fontWeight: 500,
            color: "text.primary",
          }}
        >
          What content categories are you most interested in (select all that
          apply)?
        </FormLabel>
        <FormGroup>
          {interestsOptions.map((category) => (
            <FormControlLabel
              key={category}
              label={category}
              control={
                <Checkbox
                  checked={watch("profile.interests", [])?.includes(category)}
                  onChange={handleInterestsChange}
                  value={category}
                />
              }
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
}
