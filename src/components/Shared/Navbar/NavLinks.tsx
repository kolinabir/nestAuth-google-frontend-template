import Link from "next/link";
import { Star, Users, UserPlus, Clipboard } from "lucide-react";

const NavLinks = () => (
  <div className="hidden md:flex items-center space-x-4">
    <NavLink href="/latest-reviews" icon={Star}>
      Latest Reviews
    </NavLink>
    <NavLink href="/all-teachers" icon={Users}>
      All Teachers
    </NavLink>
    <NavLink href="/coordination-officer" icon={UserPlus}>
      Coordination Officer
    </NavLink>
    <NavLink href="/feedback" icon={Clipboard}>
      Feedback
    </NavLink>
  </div>
);

const NavLink = ({ href, icon: Icon, children }) => (
  <Link
    href={href}
    className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
  >
    <Icon className="w-5 h-5 mr-2" />
    <span className="hidden lg:inline">{children}</span>
  </Link>
);

export default NavLinks;
