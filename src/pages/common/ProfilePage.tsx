import { Avatar, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import coverImagePlaceholder from "@/assets/coverImagePlaceholder.svg";
import BookmarkedVideoSection from "@/components/profile/BookmarkedVideoSection";
import ProfileAboutSection from "@/components/profile/ProfileAboutSection";
import SubmittedFeedbackSection from "@/components/profile/SubmittedFeedbackSection";
import WatchedVideoSection from "@/components/profile/WatchedVideoSection";
import { UserRole } from "@/constants/enums";
import useUserActions from "@/hooks/useUserAction";
import { useState } from "react";

function ProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const { useUserQuery } = useUserActions();

  const { data: user } = useUserQuery(userId);

  const handleEditClick = () => {
    if (user?.role === UserRole.Admin)
      navigate(`/admin/profile/${userId}settings`);
    else navigate(`/profile/${userId}settings`);
  };

  return (
    <div className="space-y-6">
      <Paper>
        <div className="relative">
          <object
            data={coverImagePlaceholder}
            type="image/svg+xml"
            className="w-full h-40 rounded-t-lg"
          />

          <Avatar
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            src="https://uko-react.vercel.app/static/avatar/001-man.svg"
            sx={{
              width: 100,
              height: 100,
            }}
          />
        </div>

        <div className="-mt-8 px-4 flex flex-col gap-6 items-center justify-center">
          <Typography variant="h6" fontWeight={600}>
            {user?.name}
          </Typography>
          <Typography variant="subtitle1" color={"text.secondary"}>
            {user?.bio}
          </Typography>

          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            <Tab label="Bookmarked Videos" value={0} />
            <Tab label="Watched Videos" value={1} />
            <Tab label="Submitted Feedbacks" value={2} />
          </Tabs>
        </div>
      </Paper>

      <div className="flex gap-6 relative flex-col md:flex-row">
        <Paper className="p-6 flex-1 h-fit md:sticky top-20">
          {user && (
            <ProfileAboutSection data={user} onEditClick={handleEditClick} />
          )}
        </Paper>

        <Paper className="p-6 flex-[2]">
          {tabValue !== 0 && <BookmarkedVideoSection />}

          {tabValue === 1 && <WatchedVideoSection />}

          {tabValue === 2 && <SubmittedFeedbackSection />}
        </Paper>
      </div>
    </div>
  );
}

export default ProfilePage;
