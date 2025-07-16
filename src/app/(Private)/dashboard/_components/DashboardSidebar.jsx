"use client";

import Link from "next/link";
import userAvatar from "/public/images/navbar/dummy-user.jpg";
import CustomAvatar from "@/components/CustomAvatar/CustomAvatar";
import BgIcon from "@/components/PropertySearchPanel/BgIcon";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { removeFromSessionStorage } from "@/utils/sessionStorage";
import { SuccessModal } from "@/utils/customModal";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import { useGetProfileQuery } from "@/redux/api/userApi";

// Constants
const sidebarLinks = [
  {
    id: "profile",
    label: "My Profile",
    desc: "Update your profile details",
    route: "/dashboard/profile",
    icon: "ix:user-profile"
  },
  {
    id: "booking",
    label: "My Booking",
    desc: "Access your booking record",
    route: "/dashboard/booking-history",
    icon: "iconoir:calendar"
  },
  {
    id: "change-password",
    label: "Change Password",
    desc: "Update your password",
    route: "/dashboard/change-password",
    icon: "ic:round-password"
  }
  // {
  //   id: "feedback",
  //   label: "Share Feedback",
  //   desc: "Help us improve your experience",
  //   route: "/dashboard/share-feedback",
  //   icon: "material-symbols:rate-review-outline-sharp"
  // }
];

export default function DashboardSidebar() {
  const currentPath = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: profile, isLoading, isError, error } = useGetProfileQuery();

  const handleLogout = () => {
    dispatch(logout());
    SuccessModal("Logout Successful");
    router.push("/");
  };

  console.log({ profile });
  return (
    <div className="w-full lg:w-1/4">
      {/* Profile Picture */}
      <div className="flex-center-start mb-8 gap-x-3">
        <CustomAvatar
          img={profile?.profile || ""}
          name={profile?.name}
          className="size-20 text-2xl"
        />

        <div>
          <h5 className="text-h5 font-semibold text-p1">{profile?.name}</h5>
          <p className="text-gray-600">{profile?.email}</p>
        </div>
      </div>

      {/* Sidebar Links */}
      <div className="space-y-4">
        {sidebarLinks.map((link) => (
          <Link
            href={link.route}
            key={link.id}
            className={cn(
              "flex-center-start gap-x-3 rounded-full border border-transparent p-2 transition-all duration-300 ease-in-out",
              currentPath === link.route && "border border-p1 p-2"
            )}
          >
            <BgIcon className="size-12 bg-p1 text-white">
              <Icon icon={link.icon} height={24} width={24} />
            </BgIcon>

            <div>
              <p className="text-h6 font-semibold">{link.label}</p>
              <p className="text-sm text-gray-500">{link.desc}</p>
            </div>
          </Link>
        ))}

        <Button
          className={cn(
            "flex-center-start w-full gap-x-3 rounded-full border-none bg-transparent p-2 text-black shadow-none transition-all duration-300 ease-in-out hover:bg-transparent"
          )}
          onClick={handleLogout}
        >
          <BgIcon className="size-12 bg-p1 text-white">
            <Icon icon={"ri:logout-circle-line"} className="!size-5" />
          </BgIcon>

          <p className="text-h6 font-semibold">Logout</p>
        </Button>
      </div>
    </div>
  );
}
