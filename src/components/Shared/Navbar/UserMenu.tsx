import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { UserPlus, Mail, LogOut } from "lucide-react";

const UserMenu = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <HoverCard open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <HoverCardTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center space-x-2 hover:bg-gray-100 transition-colors"
        >
          <Image
            src={user.profileImage}
            alt="Profile"
            width={24}
            height={24}
            className="rounded-full border-2 border-gray-200"
          />
          <span className="hidden md:inline max-w-[100px] truncate">
            {user.name}
          </span>
          <Mail className="w-4 h-4" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-56 p-2">
        <MenuLink href="/profile" icon={UserPlus}>
          Profile
        </MenuLink>
        <MenuLink href="/messages" icon={Mail}>
          Messages
        </MenuLink>
        <button
          onClick={onLogout}
          className="flex items-center space-x-2 w-full text-left px-2 py-1 rounded hover:bg-gray-100"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </HoverCardContent>
    </HoverCard>
  );
};

const MenuLink = ({ href, icon: Icon, children }) => (
  <Link
    href={href}
    className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-100"
  >
    <Icon className="w-4 h-4" />
    <span>{children}</span>
  </Link>
);

export default UserMenu;
