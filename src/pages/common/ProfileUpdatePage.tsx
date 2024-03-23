import PasswordEditForm from "@/components/profile/PasswordEditForm";
import ProfileDeleteForm from "@/components/profile/ProfileDeleteForm";
import ProfileEditForm from "@/components/profile/ProfileEditForm";
import ProfileSettingsNavSection from "@/components/profile/ProfileSettingsNavSection";
import { useSearchParams } from "react-router-dom";

function ProfileUpdatePage() {
  const [searchParams] = useSearchParams();

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <ProfileSettingsNavSection />

      {!searchParams.get("tab") && <ProfileEditForm />}

      {searchParams.get("tab") === "password" && <PasswordEditForm />}

      {searchParams.get("tab") === "delete" && <ProfileDeleteForm />}
    </div>
  );
}

export default ProfileUpdatePage;
