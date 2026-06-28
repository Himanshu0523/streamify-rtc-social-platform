import { Link, useLocation } from "react-router-dom";
import { BellIcon, LogOutIcon, ShipWheelIcon, UsersIcon } from "lucide-react";

import useAuthUser from "../hooks/useAuthUser";
import useLogout from "../hooks/useLogout";
import ThemeSelector from "./ThemeSelector";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const { logoutMutation } = useLogout();

  const location = useLocation();
  const isChatPage = location.pathname.startsWith("/chat");

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* Logo (only on chat page) */}
          {isChatPage ? (
            <Link to="/" className="flex items-center gap-2.5">
              <ShipWheelIcon className="size-9 text-primary" />
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                Streamify
              </span>
            </Link>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Friends */}
            <Link to="/friends">
              <button className="btn btn-ghost btn-circle">
                <UsersIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>

            {/* Notifications */}
            <Link to="/notifications">
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>

            {/* Theme */}
            <ThemeSelector />

            {/* Avatar */}
            <div className="avatar">
              <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={authUser?.profilePic}
                  alt="User Avatar"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(authUser?.fullName || "User");
                  }}
                />
              </div>
            </div>

            {/* Logout */}
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
            >
              <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
