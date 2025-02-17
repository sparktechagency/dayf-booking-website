"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import logo from "/public/logos/logo.svg";
import Image from "next/image";
import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import NavLink from "./NavLink";
import {
  navbarLinks,
  supportedCurrencies,
  supportedLanguages,
} from "./navbar.constant";
import NavDropdown from "./NavDropdown";
import AnimatedArrow from "@/components/AnimatedArrow/AnimatedArrow";
import { useState } from "react";
import { House } from "lucide-react";
import userAvatar from "/public/images/navbar/dummy-user.jpg";
import CustomAvatar from "@/components/CustomAvatar/CustomAvatar";
import { MessageCircleIcon } from "@/utils/svgLibrary";
import { getFromSessionStorage } from "@/utils/sessionStorage";
import { useRouter } from "next/navigation";
import MobileNavbar from "./MobileNavbar";
import { Icon } from "@iconify/react";

export default function Navbar() {
  const router = useRouter();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Navbar dropdown states: Currency & Language
  const [selectedCurrency, setSelectedCurrency] = useState(
    supportedCurrencies[1],
  ); // euro
  const [selectedLanguage, setSelectedLanguage] = useState(
    supportedLanguages[1],
  ); // es

  // TODO: Use actual user data
  const userId = getFromSessionStorage("dayf-user");

  return (
    <header className="sticky top-0 z-50 w-full bg-light-sky-blue dark:bg-gray-950">
      <ResponsiveContainer className="flex-center-between h-[85px] px-2 lg:px-0">
        <div className="flex-center-start gap-x-16">
          {/* Logo */}
          <div className="flex-center-start gap-x-2">
            {/* Mobile NavMenubar Trigger */}
            <button
              className="block rounded-lg border-[1.7px] border-p1 p-1 text-p1 transition-all duration-300 ease-in-out hover:bg-p1 hover:text-white lg:hidden"
              onClick={() => setShowMobileSidebar(true)}
            >
              <Icon icon="ri:menu-2-line" width="18px" height="18px" />
              <span className="sr-only">Toggle navigation menu</span>
            </button>

            <Link href="/">
              <Image
                src={logo}
                alt="Logo of DAYF Booking"
                height={110}
                width={110}
                className="h-[30px] w-auto object-cover"
              />
            </Link>
          </div>

          {/* NavLinks */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navbarLinks.map((link) => (
              <NavLink key={link.id} label={link.label} href={link.route} />
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-x-2 lg:gap-x-4">
          <NavDropdown
            values={supportedCurrencies}
            selectedValue={selectedCurrency}
            setSelectedValue={setSelectedCurrency}
          />

          <NavDropdown
            values={supportedLanguages}
            selectedValue={selectedLanguage}
            setSelectedValue={setSelectedLanguage}
          />

          <Button
            variant="outline"
            className="group hidden h-10 gap-x-2 rounded-full border border-[#A5D3F1] bg-transparent px-4 text-p1 shadow-none transition-all duration-300 ease-in-out hover:bg-p1 hover:text-white lg:inline-flex"
            onClick={() => router.push("/list-property")}
          >
            <span className="hidden xl:flex xl:items-center xl:gap-x-2">
              List your property <AnimatedArrow variant="vertical" />
            </span>

            <House className="block xl:hidden" />
          </Button>

          {!userId ? (
            <Button
              variant="primary"
              className="h-9 rounded-3xl px-5 lg:h-10 lg:rounded-full"
              asChild
            >
              <Link href="/login">Log In</Link>
            </Button>
          ) : (
            <>
              <Link
                href="/messages"
                className="flex-center aspect-square h-10 rounded-full bg-white/50"
              >
                <MessageCircleIcon />
              </Link>

              <Link
                href="/dashboard/profile"
                className="flex-center h-10 gap-x-2 rounded-full bg-white/50 pl-2 pr-3 text-p1 hover:text-p1/80"
              >
                <CustomAvatar
                  img={userAvatar?.src}
                  name="Uzzal Bhowmik"
                  className="size-8"
                />
                <h5 className="text-base">Uzzal</h5>
              </Link>
            </>
          )}
        </div>
      </ResponsiveContainer>

      {/* Mobile NavSidebar */}
      <MobileNavbar open={showMobileSidebar} setOpen={setShowMobileSidebar} />
    </header>
  );
}
