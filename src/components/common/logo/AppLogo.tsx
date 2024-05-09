import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

interface AppLogoProps {
  type?: "compact" | "full";
  color?: string;
}

function AppLogo({ type = "full", color = "black" }: AppLogoProps) {
  return (
    <Typography
      fontSize={"2rem"}
      color={color}
      fontFamily={"Pistilli-Roman"}
      component={Link}
      to={"/"}
    >
      {type === "compact" ? "O|S" : "Of Substance."}
    </Typography>
  );
}

export default AppLogo;
