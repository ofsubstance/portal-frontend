import { IconButton, TextField, TextFieldProps } from "@mui/material";
import { forwardRef, useState } from "react";

import InvisibleIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibleIcon from "@mui/icons-material/RemoveRedEyeOutlined";

const PasswordField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ type = "password", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <TextField
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleTogglePassword} edge="end">
              {showPassword ? <VisibleIcon /> : <InvisibleIcon />}
            </IconButton>
          ),
        }}
        {...props}
        ref={ref}
      />
    );
  }
);

export default PasswordField;
