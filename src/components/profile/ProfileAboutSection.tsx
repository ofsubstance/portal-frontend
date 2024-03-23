import { Button, Typography } from "@mui/material";
import {
  RiPhoneFill as ContactNumIcon,
  RiCakeFill as DobIcon,
  RiUser3Fill as GenderIcon,
  RiSpeakFill as LanguageIcon,
  RiMapPin2Fill as LocationIcon,
  RiMailFill as MailIcon,
} from "react-icons/ri";

import { IconType } from "react-icons/lib";
import { useNavigate } from "react-router-dom";

function AboutItem({ Icon, text }: { Icon: IconType; text: string }) {
  return (
    <Typography variant="body1" className="flex gap-4 items-center">
      <Icon size={24} />
      {text}
    </Typography>
  );
}

function ProfileAboutSection() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Typography variant="h6" fontWeight={600}>
        About
      </Typography>

      <AboutItem Icon={MailIcon} text="john.doe@email.com" />

      <AboutItem Icon={ContactNumIcon} text="+91 1234567890" />

      <AboutItem Icon={DobIcon} text="December 31, 2000" />

      <AboutItem Icon={GenderIcon} text="Male" />

      <AboutItem Icon={LanguageIcon} text="English" />

      <AboutItem
        Icon={LocationIcon}
        text="123/A, Lorem Ipsum, Dolor Sit, Amet"
      />

      <Button
        variant="outlined"
        fullWidth
        onClick={() => navigate("/profile/settings")}
      >
        Edit Profile
      </Button>
    </div>
  );
}

export default ProfileAboutSection;
