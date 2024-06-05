import { Button, Typography } from "@mui/material";
import {
  RiPhoneFill as ContactNumIcon,
  RiCakeFill as DobIcon,
  RiUser3Fill as GenderIcon,
  RiSpeakFill as LanguageIcon,
  RiMapPin2Fill as LocationIcon,
  RiMailFill as MailIcon,
} from "react-icons/ri";

import { UserDto } from "@/dtos/user.dto";
import dayjs from "dayjs";
import { IconType } from "react-icons/lib";

function AboutItem({
  Icon,
  text = "Not Set",
}: {
  Icon: IconType;
  text?: string;
}) {
  return (
    <Typography variant="body1" className="flex gap-4 items-center">
      <Icon size={24} />
      {text}
    </Typography>
  );
}

interface ProfileAboutSectionProps {
  data: UserDto;
  onEditClick: () => void;
}

function ProfileAboutSection({ data, onEditClick }: ProfileAboutSectionProps) {
  return (
    <div className="space-y-6">
      <Typography variant="h6" fontWeight={600}>
        About
      </Typography>

      <AboutItem Icon={MailIcon} text={data.email} />

      <AboutItem Icon={ContactNumIcon} text={data.phone} />

      <AboutItem
        Icon={DobIcon}
        text={dayjs(data.birthDate).format("DD MMM YYYY")}
      />

      <AboutItem Icon={GenderIcon} text={data.gender} />

      <AboutItem Icon={LanguageIcon} text={data.language} />

      <AboutItem Icon={LocationIcon} text={data.location} />

      <Button variant="outlined" fullWidth onClick={onEditClick}>
        Edit Profile
      </Button>
    </div>
  );
}

export default ProfileAboutSection;
