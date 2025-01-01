import Link from "next/link";
import { Home } from "lucide-react";

const NavbarBrand = () => (
  <Link
    href="/"
    className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors flex items-center"
  >
    <Home className="w-5 h-5 mr-2" />
    <span className="hidden sm:inline">Diu Academia Review</span>
    <span className="sm:hidden">DAR</span>
  </Link>
);

export default NavbarBrand;
