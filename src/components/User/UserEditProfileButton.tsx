"use client";
"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";

const UserEditProfileButton = ({ userId }: { userId: string }) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  // Check if the authenticated user is viewing their own profile
  const isOwnProfile = isAuthenticated && user && user.data.userId === userId;

  if (!isOwnProfile) {
    return null;
  }

  return (
    <Link href={`/user/profile`}>
      <Button variant="outline" className="mt-4">
        <Edit className="mr-2 h-4 w-4" /> Edit Profile
      </Button>
    </Link>
  );
};

export default UserEditProfileButton;
