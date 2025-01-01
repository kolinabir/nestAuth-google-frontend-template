"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  useLazyGetCurrentUserQuery,
  useLogoutMutation,
} from "@/store/api/authApi";
import { RootState } from "@/store/store";
import { logOutLocal, setUser } from "@/store/features/auth/authSlice";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BriefcaseIcon,
  SearchIcon,
  BellIcon,
  UserIcon,
  LogOutIcon,
  Menu,
  X,
  Briefcase,
} from "lucide-react";
import Image from "next/image";
import { UserNav } from "./UserNav";
const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [getCurrentUser, { data: queryData, isLoading: isUserLoading }] =
    useLazyGetCurrentUserQuery();
  const { user: userData } = useSelector((state: RootState) => state.auth);
  const [logout] = useLogoutMutation();

  useEffect(() => {
    if (!userData) {
      getCurrentUser();
    }
  }, [userData, getCurrentUser]);

  useEffect(() => {
    if (queryData?.user) {
      dispatch(setUser(queryData.user));
    }
  }, [queryData, dispatch]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/auth/google-login";
  };

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(setUser(null));
      dispatch(logOutLocal());
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/latest-reviews", label: "Latest Reviews" },
    { href: "/all-teachers", label: "All Teachers" },
    { href: "/coordination-officer", label: "Coordination Officer" },
    { href: "/feedback", label: "Feedback" },
  ];

  const user = typeof window !== "undefined" ? userData : null;

  if (isUserLoading) {
    return (
      <nav className="w-full bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </nav>
    );
  }

  return (
    <div className="bg-white py-2 sticky top-0 z-50">
      <nav className="max-w-[1440px] mx-auto bg-white border-gray-200 px-4 py-2.5 flex items-center justify-between gap-6">
        {/* Mobile menu button */}
        <div className="-mr-2 -my-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded="false"
          >
            <span className="sr-only">Open menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>

        <div className="flex flex-1 items-center space-x-4">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <BriefcaseIcon className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800 ml-2">
                JobPortal
              </h1>
            </div>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-10 ml-auto mr-3 lg:mr-5">
          <Link
            href="/"
            className={`before:w-0 before:bg-dark-gray before:h-[2px] before:  before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] transition-all duration-300 before:left-0 cursor-pointer text-base font-medium text-dark-gray ${
              pathname == "/" && " before:w-full "
            }`}
          >
            Find Jobs
          </Link>
          {user && (
            <Link
              href="/post-job"
              className={`before:w-0 before:bg-dark-gray before:h-[2px] before:  before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] transition-all duration-300 before:left-0 cursor-pointer text-base font-medium text-dark-gray ${
                pathname == "/post-job" && " before:w-full "
              }`}
            >
              Post Job
            </Link>
          )}
          <Link
            href="/user"
            className={`before:w-0 before:bg-dark-gray before:h-[2px] before:  before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] transition-all duration-300 before:left-0 cursor-pointer text-base font-medium text-dark-gray hidden lg:inline-block ${
              pathname == "/user" && " before:w-full "
            }`}
          >
            Dashboard
          </Link>
        </nav>

        {/* Desktop search, notifications, and profile */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex relative w-60">
            <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search jobs..."
              className=" pl-8"
            />
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="relative rounded-full px-2 py-5"
              >
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-0.5 right-2 inline-flex items-center justify-center px-1.5 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  3
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={
                        user.profileImage
                          ? user.profileImage
                          : "https://github.com/shadcn.png"
                      }
                      alt={user.name || "User"}
                    />
                    <AvatarFallback>
                      <UserIcon className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex flex-col">
                    <Avatar className="cursor-pointer mx-auto w-16 h-16">
                      <AvatarImage
                        src={
                          user.profileImage
                            ? user.profileImage
                            : "https://github.com/shadcn.png"
                        }
                        alt={user.name || "User"}
                      />
                      <AvatarFallback>
                        <UserIcon className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center text-dark-gray mt-2">
                      <span className=" text-base font-medium">
                        {user.name || "User"}
                      </span>
                      <span className="text-sm font-medium">{user.email}</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="border-t mt-2">
                    <Link href="/user" className="text-dark-gray font-medium">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="border-t">
                    <Link
                      href="/user/jobs"
                      className="text-dark-gray font-medium"
                    >
                      My jobs
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="border-t">
                    <Link
                      href="/user/profile"
                      className="text-dark-gray font-medium"
                    >
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem> */}
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-dark-gray cursor-pointer border-t"
                  >
                    <LogOutIcon className="h-4 w-4 mr-2" />
                    <span className="text-base font-medium py-1">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="space-x-2">
              {!user ? (
                <Button
                  onClick={handleGoogleLogin}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Image
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              ) : (
                <UserNav user={user} onLogout={handleLogout} />
              )}
              <Link href="/auth/register" className="hidden md:inline-block">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="bg-white absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50">
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <Briefcase size="40px" className="text-primary" />
                  </div>
                  <div className="-mr-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    <Link
                      href="/"
                      className={`before:w-0 before:bg-dark-gray before:h-[2px] before:  before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] transition-all duration-300 before:left-0 cursor-pointer text-base font-medium text-dark-gray ${
                        pathname == "/" && " before:w-fit "
                      }`}
                    >
                      Find Jobs
                    </Link>
                    {user && (
                      <Link
                        href="/post-job"
                        className={`before:w-0 before:bg-dark-gray before:h-[2px] before:  before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] transition-all duration-300 before:left-0 cursor-pointer text-base font-medium text-dark-gray ${
                          pathname == "/post-job" && " before:w-fit "
                        }`}
                      >
                        Post Job
                      </Link>
                    )}
                    <Link
                      href="/user"
                      className={`before:w-0 before:bg-dark-gray before:h-[2px] before:  before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] transition-all duration-300 before:left-0 cursor-pointer text-base font-medium text-dark-gray ${
                        pathname == "/user" && " before:w-fit "
                      }`}
                    >
                      Dashboard
                    </Link>
                  </nav>
                </div>
              </div>
              <div className="py-6 px-5 space-y-6">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search jobs..."
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
