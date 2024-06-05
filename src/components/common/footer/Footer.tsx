import { Grid, Paper, Typography } from "@mui/material";
import {
  RiFacebookCircleFill as FacebookIcon,
  RiTelegramFill as TelegramIcon,
  RiTwitterFill as TwitterIcon,
} from "react-icons/ri";

import AppLogo from "../logo/AppLogo";

export default function Footer() {
  return (
    <Paper variant="outlined" className="p-10 m-10 md:m-20 space-y-6">
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid item xs={12} md={4} className="space-y-4">
          <AppLogo type="compact" />
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            euismod bibendum laoreet. Proin gravida dolor sit amet lacus
            accumsan et viverra justo commodo.
          </Typography>
          <Typography variant="body1">
            © 2024 Of Substance. All rights reserved.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} className="space-y-2">
          <Typography variant="h6">Quick Links</Typography>
          <Typography variant="body1">Home</Typography>
          <Typography variant="body1">About</Typography>
          <Typography variant="body1">Contact</Typography>
        </Grid>
        <Grid item xs={12} md={4} className="space-y-2">
          <Typography variant="h6">Contact Us</Typography>
          <Typography variant="body1">123, Main Street, Your City</Typography>
          <Typography variant="body1">
            <a href="mailto: [email protected]">of.substance@gmail.com</a>
          </Typography>
          <Typography variant="body1">
            <a href="tel:1234567890">123-456-7890</a>
          </Typography>
          <div className="flex gap-4">
            <span className="p-2 rounded-full text-white bg-blue-500 aspect-square">
              <FacebookIcon size={24} />
            </span>

            <span className="p-2 rounded-full text-white bg-sky-500 aspect-square">
              <TwitterIcon size={24} />
            </span>

            <span className="p-2 rounded-full text-white bg-cyan-500 aspect-square">
              <TelegramIcon size={24} />
            </span>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
