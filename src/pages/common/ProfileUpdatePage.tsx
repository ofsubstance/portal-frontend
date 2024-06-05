import { useParams, useSearchParams } from "react-router-dom";

import PasswordEditForm from "@/components/profile/PasswordEditForm";
import ProfileDeleteForm from "@/components/profile/ProfileDeleteForm";
import ProfileEditForm from "@/components/profile/ProfileEditForm";
import ProfileSettingsNavSection from "@/components/profile/ProfileSettingsNavSection";
import useUserActions from "@/hooks/useUserAction";

function ProfileUpdatePage() {
  const [searchParams] = useSearchParams();
  const { userId } = useParams();

  const { useUserQuery } = useUserActions();

  const { data: user } = useUserQuery(userId);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <ProfileSettingsNavSection />

      {!searchParams.get("tab") && <ProfileEditForm defaultValues={user} />}

      {searchParams.get("tab") === "password" && <PasswordEditForm />}

      {searchParams.get("tab") === "delete" && <ProfileDeleteForm />}
    </div>
  );
}

export default ProfileUpdatePage;
