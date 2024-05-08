import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

interface AppLogoProps {
  type?: "compact" | "full";
}

function AppLogo({ type = "full" }: AppLogoProps) {
  return (
    <Typography
      fontSize={"2rem"}
      color="black"
      fontFamily={"Pistilli-Roman"}
      component={Link}
      to={"/"}
    >
      {type === "compact" ? "O|S" : "Of Substance."}
    </Typography>
  );
}

export default AppLogo;
