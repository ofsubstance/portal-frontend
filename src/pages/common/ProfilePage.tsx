import PasswordEditForm from "@/components/profile/PasswordEditForm";
import ProfileEditForm from "@/components/profile/ProfileEditForm";
import ProfileNavSection from "@/components/profile/ProfileNavSection";
import { useSearchParams } from "react-router-dom";

function ProfilePage() {
  const [searchParams] = useSearchParams();

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <ProfileNavSection />

      {!searchParams.get("tab") && <ProfileEditForm />}

      {searchParams.get("tab") === "password" && <PasswordEditForm />}
    </div>
  );
}

export default ProfilePage;
