import {
  RiDeleteBin2Line as DeleteIcon,
  RiLock2Line as PasswordIcon,
  RiAccountCircleLine as ProfileIcon,
} from "react-icons/ri";
import {
  List,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";

import { twMerge } from "tailwind-merge";
import { useSearchParams } from "react-router-dom";

const items = [
  {
    text: "Profile",
    tab: "",
    icon: ProfileIcon,
  },
  {
    text: "Password",
    tab: "password",
    icon: PasswordIcon,
  },
  {
    text: "Delete Account",
    tab: "delete",
    icon: DeleteIcon,
  },
];

function ProfileNavSection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useTheme();

  const isActiveLink = (itemLink: string) =>
    (searchParams.get("tab") || "") === itemLink;

  return (
    <Paper className="flex flex-col py-6 md:max-w-72 w-full">
      <Typography variant="body1" fontWeight={600} px={2.5}>
        User Profile
      </Typography>
      <List dense component="nav">
        {items.map((item) => (
          <ListItem
            disablePadding
            key={item.text}
            onClick={() =>
              setSearchParams({ tab: item.tab }, { replace: true })
            }
          >
            <ListItemButton
              selected={isActiveLink(item.tab)}
              sx={{
                paddingX: 2,
                paddingY: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 2,
                borderRight: `4px solid ${
                  isActiveLink(item.tab)
                    ? theme.palette.primary.main
                    : "transparent"
                }`,
              }}
            >
              <item.icon
                size={20}
                color={
                  isActiveLink(item.tab)
                    ? theme.palette.primary.main
                    : undefined
                }
                className={twMerge(!isActiveLink(item.tab) && "text-slate-500")}
              />
              <Typography
                variant="body2"
                fontWeight={500}
                color={
                  isActiveLink(item.tab)
                    ? theme.palette.primary.main
                    : undefined
                }
                className={twMerge(!isActiveLink(item.tab) && "text-slate-500")}
              >
                {item.text}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default ProfileNavSection;
